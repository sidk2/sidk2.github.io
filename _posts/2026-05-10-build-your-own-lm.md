---
title: 'Build-Your-Own-LM: A Journey into Language Modeling'
date: 2026-05-10
permalink: /posts/build-your-own-lm
tags:
  - machine-learning
katex: true
---

*Last updated: 6/1/2026, with the tokenizer optimizations and transformer description.*

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

Having implemented all of this, we have a working, albeit naive, tokenizer. There are a plethora of optimizations that one can apply to such a tokenizer, which we will discuss next. 

# BPE Optimizations

My naive implementation of a BPE tokenizer is attached below. Unfortunately, it's rather slow. Even tokenizing the first 50,000 stories in the TinyStories dataset (with a vocab size of 50k) takes around 20 minutes. Fortunately, we can do much better.

The bottleneck is the training loop. Every merge iteration does three expensive things: it recomputes pair statistics by scanning the entire vocabulary, it finds the best pair by scanning all statistics with `max()`, and it rebuilds the vocabulary by scanning every word. All three are O(V) in the vocabulary size, and they repeat for every one of the tens of thousands of merges. The cumulative cost is O(M × V) where M is the number of merges.

Two optimizations eliminate most of that cost.

## Incremental pair statistics

The key observation is that merging pair `(a, b) → ab` only affects words that actually contain that pair. For every other word in the vocabulary, the pair statistics are unchanged. Instead of recomputing statistics from scratch after each merge, we can update them surgically.

For each word containing the target pair, we:

1. Snapshot the set of adjacent pairs before the merge.
2. Apply the merge to produce the new symbol sequence.
3. Snapshot the set of adjacent pairs after the merge.
4. Diff the two sets and apply the deltas to the running statistics.

This means we only visit words that contain the merged pair, and within each word we only touch the pairs immediately adjacent to each merge site. The cost per iteration drops from O(V) to O(W) where W is the number of word occurrences that contain the pair, which is typically a small fraction of the full vocabulary.

It happens to be easier to implement this optimization when the works are stored as lists instead of space separated strings, so I switched from the `{"t h e </w>": 3}` representation to `{"the": (["t", "h", "e", "</w>"], 3)}`.

```python
def merge_and_update(self, vocab, pair_stats, heap, best_pair):
    a, b = best_pair
    merged = a + b

    for word, (symbols, freq) in vocab.items():
        if a not in symbols:
            continue
        if not any(symbols[i] == a and symbols[i+1] == b for i in range(len(symbols) - 1)):
            continue

        old_pairs = [(symbols[i], symbols[i+1]) for i in range(len(symbols) - 1)]

        new_symbols = []
        i = 0
        while i < len(symbols):
            if i < len(symbols) - 1 and symbols[i] == a and symbols[i+1] == b:
                new_symbols.append(merged)
                i += 2
            else:
                new_symbols.append(symbols[i])
                i += 1

        new_pairs = [(new_symbols[i], new_symbols[i+1]) for i in range(len(new_symbols) - 1)]

        old_counts = defaultdict(int)
        new_counts = defaultdict(int)
        for p in old_pairs:
            old_counts[p] += 1
        for p in new_pairs:
            new_counts[p] += 1

        for p in set(old_counts) | set(new_counts):
            delta = (new_counts[p] - old_counts[p]) * freq
            if delta != 0:
                pair_stats[p] += delta
                heapq.heappush(heap, (-pair_stats[p], p))

        vocab[word] = (new_symbols, freq)

    return vocab, pair_stats
```

## Heap-based best-pair selection

Even with incremental statistics, finding the best pair by scanning the entire statistics dict with `max()` is still O(P) per iteration, where P is the number of unique pairs. We can do significantly better than this with a max heap.

Python's `heapq` is a min-heap, so we store negative frequencies:

```python
def build_heap(self, pair_stats):
    heap = [(-freq, pair) for pair, freq in pair_stats.items()]
    heapq.heapify(heap)
    return heap
```

Popping the best pair is now O(log P) instead of O(P). The complication is that heap entries go stale: when a pair's count changes during an incremental update, we push a new entry rather than modifying the old one (which would require an O(P) search). The old entry remains in the heap but carries the wrong count. We discard stale entries on pop:

```python
def pop_best(self, heap, pair_stats):
    while heap:
        neg_freq, pair = heapq.heappop(heap)
        if pair_stats.get(pair, 0) == -neg_freq:
            return pair, -neg_freq
    return None, 0
```

This is called lazy deletion. The heap can accumulate stale entries over time, but in practice the heap stays manageable because entries are invalidated and replaced rather than duplicated unboundedly. Each incremental update pushes at most a handful of new entries per affected word.

## Combined complexity

| Operation | Naive | Optimized |
|---|---|---|
| Pair statistics | O(V) full recompute | O(W) affected words only |
| Best pair selection | O(P) linear scan | O(log P) heap pop |
| Per-merge total | O(P + V) | O(W · log P) |

Where V is the vocabulary size, P is the number of unique pairs, and W is the number of words containing the merged pair. On a large corpus, W ≪ V for most pairs, so the savings compound across all M merges.

In practice this brings TinyStories training from ~20 minutes down to under a minute at vocab_size=50k. Better yet, this implementation scales far better as we increase the number of stories. It takes under 4 minutes to run, even when we increase the number of stories to 500k.

# The Transformer

## Attention is Most of What You Need

The transformer architecture, introduced in the seminal paper *Attention is All You Need* [Vaswani et al.](https://arxiv.org/abs/1706.03762), is the cornerstone of modern LLMs. At its heart is the *attention* mechanism, which takes a sequence of vectors as input and returns a new sequence of vectors, where each output vector is a weighted sum of the input vectors. In the context of language modeling, the sequence is the sequence of token embeddings from the previous layer. Let's say we have input vectors $X \in \mathbb{R}^{n \times d}$, where $n$ is the sequence length and $d$ is the embedding dimension. 

Self-attention allows the model to weigh the importance of different tokens in the sequence when generating the next token. To do this, we project the input matrix $X$ into three different matrices: the **query** matrix $Q$, the **key** matrix $K$, and the **value** matrix $V$. These are calculated by multiplying $X$ by learnable weight matrices $W^Q, W^K, W^V \in \mathbb{R}^{d \times d}$.

To be continued...