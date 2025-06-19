---
layout: archive
title: "CV"
permalink: /cv/
author_profile: true
redirect_from:
  - /resume
---

{% include base_path %}

Education
======
* B.S in Computing, College of Creative Studies, University of California Santa Barbara. 2026 (expected)
* B.S in Physics, University of California Santa Barbara. 2026 (expected)

Work experience
======
* **Undergraduate Researcher**, UC Santa Barbara (Fall 2022-Present)
  * [Jeong Lab](https://haewonjeong.com)
    * Building flow matching models for unsupervised representation learning in cosmology. We focus on building models with physically meaningful and interpretable latent spaces
    * Skills: Generative ML (diffusion, flow matching, VAEs)
  * [OPUS Lab](https://opus.ece.ucsb.edu/)
    * Built first ever hardware implementation of higher order Ising machines for combinatorial optimization, demonstrated state-of-the-art performance, while enabling mapping multiple problem instances onto a single chip.
    * Skills: Optimization algorithms, Markov Chain Monte Carlo, SystemVerilog
  * [ARCHLab](https://www.arch.cs.ucsb.edu)
    * Proposed and simulated data transport mechanisms for petascale machine learning training
    * Skills: Network/hardware simulation
* **Computational Physics Fellow** (Summer 2025)
  * [Los Alamos National Laboratory](https://lanl.gov)
  * Developing codes for modelling relativistic electron scattering in plasmas
  * Skills: Numerical methods, Fortran, multiphysics simulation

* **Research Intern** (Summer 2024)
  * [LIGO Laboratory](https://www.ligo.caltech.edu)
  * Developed graph neural network based deep learning models for interferometer emulation.
  * Skills: Deep learning, graph neural networks, Pytorch

* **Undergraduate Teaching Assistant** (Fall 2023-Present)
  * Teaching assistant at UC Santa Barbara for: Intro to Scientific Computing, Data Structures and Algorithms 1 & 2, Introductory Electrostatics.
  * Wrote and graded assignments, held office hours, proctored exams.

* **Flight Software Intern** (Summer 2023)
  * [Astranis Space Technologies](https://www.astranis.com)
  * Developed data analysis pipelines for analyzing satellite telemetry data
  * Built driver interface for communication between Astranis and GNSS satellites
  * Skills: Data Analysis, CI/CD

* **Firmware Engineering Intern** (Summer 2022)
  * [TenaFe, Inc.](https://www.tenafe.com)
  * Developed high level simulation of SSD controller, including simulations of error correction, flash modules
  * Skills: C++, hardware simulation
  
Skills
======
* Physics: particularly numerical methods for physics, and methods of statistical physics
* Machine Learning: deep learning, generative (particularly diffusion, flow and energy based models)
* Computing: scientific and high performance computing, Markov Chain Monte Carlo methods

Publications
======
  <ul>{% for post in site.publications reversed %}
    {% include archive-single-cv.html %}
  {% endfor %}</ul>
  
Talks
======
  <ul>{% for post in site.talks reversed %}
    {% include archive-single-talk-cv.html  %}
  {% endfor %}</ul>
  
Teaching
======
  <ul>{% for post in site.teaching reversed %}
    {% include archive-single-cv.html %}
  {% endfor %}</ul>
