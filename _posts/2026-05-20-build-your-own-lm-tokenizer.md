---
title: 'Build-Your-Own-LM: Part 2 - BPE Tokenizer'
collection: posts
date: 2026-05-20
permalink: /posts/build-your-own-lm-tokenizer
tags:
  - machine-learning
  - NLP
katex: true
---

In the [previous post](/posts/build-your-own-lm), I introduced the plan for building a custom Language Model. The first step of this journey is implementing a tokenizer to map text into discrete token IDs that the neural network can ingest.

For this project, I chose to implement a **Byte-Pair Encoding (BPE)** tokenizer from scratch. BPE is a subword tokenization algorithm that strikes a balance between character-level tokenization (very small vocabulary, but long sequences) and word-level tokenization (massive vocabulary, unable to handle Out-Of-Vocabulary (OOV) words).

---

## 1. Why Pre-Tokenization Matters

A naive BPE algorithm would simply run merges over the entire raw text corpus. However, this has a major issue: it allows merges to span across word boundaries or punctuation. For example, the sequence `the.` (word + period) or `dog,` could be merged into a single token, which is highly inefficient.

To prevent this, we use a pre-tokenization regex to split the text into candidate words and punctuation tokens before running the BPE merge logic. The regex pattern used in our implementation is:

```python
PRETOK_PATTERN = re.compile(r"""'s|'t|'re|'ve|'m|'ll|'d| ?\w+| ?\d+| ?[^\s\w\d]+|\s+""")
```

This pattern matches contractions, words (with optional leading space), numbers, punctuation, and whitespace groups. By treating each match as an atomic group, we ensure that merges only happen *within* these sub-word boundaries.

---

## 2. Representation: The End-of-Word Marker

To preserve word boundary information during tokenization, we suffix each pre-tokenized word with an end-of-word tag: `</w>`. 

For example, the sentence `"the dog"` is pre-tokenized and initialized as:
- `t h e </w>`
- `d o g </w>`

---

## 3. Training the Tokenizer

Training is the process of learning the vocabulary merges from a corpus. The core loop consists of:

1. **Vocabulary Initialization**: Start with all individual characters present in the corpus as the initial vocabulary, plus the end-of-word marker.
2. **Frequency Statistics**: Count the frequency of all adjacent symbol pairs in the corpus.
3. **Merge**: Find the most frequent pair, record it as a merge rule, and replace all occurrences of that pair with the merged version.
4. **Repeat**: Repeat this process until we reach our target `vocab_size`.

Here is the implementation of `train_bpe` inside `BPETokenizer`:

```python
def train_bpe(
    self, corpus: List[str]
) -> Tuple[Dict[str, int], List[Tuple[str, str]], Dict[str, int]]:
    merge_rules = []
    vocab = self.get_vocab(corpus)
    initial_vocab = vocab.copy()
    initial_vocab_size = len(set(sym for word in vocab for sym in word.split()))
    num_merges = self.vocab_size - initial_vocab_size
    for _ in range(num_merges):
        stats = self.get_pair_stats(vocab)
        if not stats:
            break
        vocab, merge_rule = self.merge_vocab(vocab, stats)
        merge_rules.append(merge_rule)
    return vocab, merge_rules, initial_vocab
```

Every time we merge a pair, we append it to `merge_rules`. The order in which rules are created determines their **rank** (priority).

---

## 4. Encoding: Mapping Text to IDs

When encoding a new string, we first pre-tokenize it. For each word (plus its `</w>` suffix), we start with individual characters and iteratively merge them. 

The key detail is **rank-based merging**: we must apply the merges in the exact order they were learned during training. We look up all adjacent pairs in the word, find the one with the lowest merge rank (highest priority), merge it, and repeat until no more learned merges can be applied.

```python
while len(ids) > 1:
    best_rank = float("inf")
    best_idx = None
    for i in range(len(ids) - 1):
        rank = self.merge_rank.get((ids[i], ids[i + 1]), float("inf"))
        if rank < best_rank:
            best_rank = rank
            best_idx = i

    if best_idx is None:
        break

    merged_id = self.token_ids[(ids[best_idx], ids[best_idx + 1])]
    ids = ids[:best_idx] + [merged_id] + ids[best_idx + 2 :]
```

We also reserve `<unk>` for any unseen characters at encoding time, and `<pad>` for padding sequences.

---

## 5. Decoding: Mapping IDs back to Text

Decoding is straightforward. We map each token ID back to its string representation using `self.vocabulary`, concatenate them all, replace `</w>` with a space, and strip any leading/trailing spaces:

```python
def decode(self, tokens: List[int]) -> str:
    text = "".join(self.vocabulary.get(i, "<unk>") for i in tokens)
    return text.replace("</w>", " ").strip()
```

---

## 6. Unit Testing & Verification

To verify that the tokenizer works as expected, I wrote a set of unit tests in [test_tokenizer.py](file:///Users/sidkannan/Code/mini_gpt/src/tests/test_tokenizer.py) targeting:
- Vocabulary constraints (ensuring vocabulary size does not exceed the limit).
- Special token presence (`<unk>` and `<pad>`).
- Character retention (ensuring all base characters from the training corpus are mapped).
- Round-trip consistency (ensuring that `decode(encode(text)) == text` holds true for any text).

```python
def test_encode_decode_corpus():
    tokenizer = tkn.BPETokenizer(vocab_size=100)
    tokenizer.train(CORPUS)
    for sentence in CORPUS:
        assert tokenizer.decode(tokenizer.encode(sentence)) == sentence
```

## Summary & Next Steps

Our current BPE tokenizer is functional, but many improvements can be made to make it more efficient for larger corpuses. In the next post, we will take a look at some of these.
