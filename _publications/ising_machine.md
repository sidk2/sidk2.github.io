---
title: "All-to-all Reconfigurability with Sparse and Higher Order Ising Machines"
collection: publications
category: manuscripts
permalink: /publication/ising/
date: 2024-09-01
venue: 'Nature Communications'
paperurl: 'https://www.nature.com/articles/s41467-024-53270-w'
summary: 'A reconfigurable probabilistic-bit Ising-machine architecture that emulates all-to-all connectivity while retaining highly parallel sampling for hard combinatorial optimization.'
---

Domain-specific hardware to solve computationally hard optimization problems has generated tremendous excitement. Here, we evaluate probabilistic bit (p-bit) based Ising Machines (IM) on the 3-Regular 3-Exclusive OR Satisfiability (3R3X), as a representative hard optimization problem. We first introduce a multiplexed architecture that emulates all-to-all network functionality while maintaining highly parallelized chromatic Gibbs sampling. We implement this architecture in a single Field-Programmable Gate Array (FPGA) and show that running the adaptive parallel tempering algorithm demonstrates competitive algorithmic and prefactor advantages over alternative IMs by D-Wave, Toshiba, and Fujitsu. We also implement higher-order interactions that lead to better prefactors without changing algorithmic scaling for the XORSAT problem. Even though FPGA implementations of p-bits are still not quite as fast as the best possible greedy algorithms accelerated on Graphics Processing Units (GPU), scaled magnetic versions of p-bit IMs could lead to orders of magnitude improvements over the state of the art for generic optimization.
