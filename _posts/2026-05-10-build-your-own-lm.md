---
title: 'Build-Your-Own-LM: A Journey into Language Modeling'
date: 2026-05-10
permalink: /posts/build-your-own-lm
tags:
  - machine-learning
katex: true
---

*Last updated: 5/31/2026, with the tokenizer implementation description.*

This project is an attempt to fix a few issues that I have been having recently. The first is that I have a lot to learn when it comes to language modeling. Somehow, despite working in ML for years now, I have generally managed to avoid language models, and when I have worked with LLMs, it has primarily been at the agent layer. I suspect that this is a fairly common occurence for people coming to ML from a more hard science background, and so I'm putting out this series so that someone else might find it useful.

The second issue is one that I suspect is far more common. Despite being an ML researcher and working in software, the amount of code that I have been writing by hand in recent months has plummeted. While in general this may be more a sign of the times than a serious problem, I feel that it genuinely does impact my learning and my general software understanding ability. So, for this project, no agents. Just me, a laptop, and the internet. Like the good old days.

The plan for the project is to build a fairly barebones language model, and then incorporate some of the more advanced techniques that are being used in frontier models. In particular, we will implement 

- The base model, including
  - [Byte-pair encoding (BPE) tokenizer](/posts/build-your-own-lm-tokenizer)
  - Attention / the transformer block
  - Rotary positional encoding (RoPE)
- Some more advanced techniques
  - KV-caching
  - Quantization + quantization-aware training
  - Mixture of experts

I want to emphasize that the goal of this project is not to write the optimal implementation of any of these, or to achieve any particularly notable performance metrics. As such, the advanced techniques are a somewhat arbitrary collection of topics that I am just interested in building. I have some more ambitious research projects in mind for the next few months, and so I'm treating this effort as a bit of a warmup. There are also a near infinite number of things that you can experiment with when building a language model, so for the sake of keeping this project to a scope where I will actually have the time to complete it, I will be limiting the scope of experiments to a few things that I have a particular interest in.

# The Tokenizer

The first step in building a language model is the tokenizer. This is the part of the model that takes a string of text and maps it into a sequence of tokens (in principle, an atom of semantic meaning), each of which is a part of the vocabulary of the model. The most popular algorithm for tokenization is the **Byte-Pair Encoding (BPE)** algorithm. It works like this. We take the full training corpus, and we start by considering every character to be its own token. For example, if our corpus was 'the cat ran carefully', we would start with the tokens 't', 'h', 'e', 'c', 'a', 'r', 'n', 'f', 'u', 'l', and 'y'. We then iterate over the corpus and find which pair of tokens occurs most frequently. In our example, this would be 'ca', which occurs twice. These two tokens would then be merged into a new token, 'ca', and we would add it to our vocabulary. This repeats until we have reached the desired vocabulary size. 

The intuition behind breaking the corpus down in this way is that doing this naturally leads to a structure in which common subwords, like 'ing' or 'the' get broken out into a single token, which the model then would learn through training to associate with its semantic meaning, instead of if we just tried to autoregressively predict one character at a time, in which case, the model would have to learn 'i', 'n', and 'g' as three distinct characters, and then learn that if they follow some verb, it indicates continuity.

## Pretokenization

A naive BPE algorithm would simply run merges over the entire raw text corpus. However, this has an issue: it allows merges to span across word boundaries or punctuation. For example, the sequence `the.` (word + period) could be merged into a single token, distinct from the token `the`. This is undesirable. 

What is done instead is to 'pre-tokenize' the corpus with a regex that splits the text into words and punctuation. Then, BPE is run on these words. We use the regex from the GPT-2 paper: 

```python
PRETOK_PATTERN = re.compile(r"""'s|'t|'re|'ve|'m|'ll|'d| ?\w+| ?\d+| ?[^\s\w\d]+|\s+""")
```


To preserve word boundary information during tokenization, we suffix each pre-tokenized word with an end-of-word tag: `</w>`. 

For example, the sentence `"the dog"` is pre-tokenized and initialized as:
- `t h e </w>`
- `d o g </w>`

---

## Training

Next, we have to train the tokenizer. This consists of a few steps, which get repeated in a loop.

1. **Vocabulary Initialization**: Start with all individual characters present in the corpus as the initial vocabulary, plus the end-of-word marker.
2. **Frequency Statistics**: Count the frequency of all adjacent symbol pairs in the corpus.
3. **Merge**: Find the most frequent pair, record it as a merge rule, and replace all occurrences of that pair with the merged version.
4. **Repeat**: Repeat this process until we reach our target `vocab_size`.

## Encoding

When encoding a new string, we first pre-tokenize it. For each word (plus its `</w>` suffix), we start with individual characters and iteratively merge them. 

The key detail is **rank-based merging**: we must apply the merges in the exact order they were learned during training. We look up all adjacent pairs in the word, find the one with the lowest merge rank (highest priority), merge it, and repeat until no more learned merges can be applied.

We also reserve `<unk>` for any unseen characters at encoding time, and `<pad>` for padding sequences.

Having implemented all of this, we have a working, albeit naive, tokenizer. There are a plethora of optimizations that one can apply to such a tokenizer, which we will discuss later on, once the model implementation is concluded.