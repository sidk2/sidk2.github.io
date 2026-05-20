---
title: 'Build-Your-Own-LM: Part 1 - The NanoGPT'
date: 2026-05-10
permalink: /posts/build-your-own-lm
tags:
  - machine-learning
katex: true
---

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

I want to emphasize that the goal of this project is not to write the optimal implementation of any of these, or to achieve any particularly notable performance metrics. As such, the advanced techniques are a somewhat arbitrary collection of topics that I am just interested in building. I have some more ambitious research projects in mind for the next few months, and so I'm treating this effort as a bit of a warmup.

Links to the specific writeups for each stage will be posted here as they are written. For the tokenizer implementation, see [Part 2: BPE Tokenizer](/posts/build-your-own-lm-tokenizer).