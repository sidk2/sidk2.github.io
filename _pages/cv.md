---
layout: archive
title: "CV"
permalink: /cv/
author_profile: true
description: "Curriculum vitae for Sidharth Kannan, Research Engineer at ChipAgents."
redirect_from:
  - /resume
---

<div class="cv-page">
  <header class="cv-intro">
    <p>Machine learning researcher focusing on agents for science and engineering.</p>
    <div class="cv-actions">
      <a class="btn btn--primary" href="{{ '/files/cv.pdf' | relative_url }}">Download CV (PDF)</a>
      <a class="btn btn--inverse" href="https://scholar.google.com/citations?user=EJWSbKUAAAAJ&hl=en">Google Scholar</a>
      <a class="btn btn--inverse" href="https://github.com/sidk2">GitHub</a>
    </div>
  </header>

  <section class="cv-section" aria-labelledby="cv-skills">
    <h2 id="cv-skills">Technical Skills</h2>
    <dl class="cv-skills-list">
      <div><dt>Machine Learning</dt><dd>PyTorch, JAX, Slime, harness engineering, flow matching, Weights &amp; Biases</dd></div>
      <div><dt>Scientific Computing</dt><dd>NumPy, SciPy, distributed training (DDP), SLURM</dd></div>
      <div><dt>Chip Design</dt><dd>FPGA, Vivado, SystemVerilog, SPICE, agents for chip design</dd></div>
    </dl>
  </section>

  <section class="cv-section" aria-labelledby="cv-education">
    <h2 id="cv-education">Education</h2>
    <article class="cv-entry">
      <div class="cv-entry__header">
        <h3>University of California, Santa Barbara</h3>
        <span class="cv-entry__date">Sep. 2022 - Mar. 2026</span>
      </div>
      <p class="cv-entry__meta">B.S. in Computer Science and B.S. in Physics · GPA: 3.94 · High Honors</p>
    </article>
  </section>

  <section class="cv-section" aria-labelledby="cv-experience">
    <h2 id="cv-experience">Work &amp; Research Experience</h2>

    <article class="cv-entry">
      <div class="cv-entry__header">
        <h3>Research Engineer</h3>
        <span class="cv-entry__date">Mar. 2026 - Present</span>
      </div>
      <p class="cv-entry__meta">ChipAgents · Santa Clara, CA</p>
      <ul>
        <li>Built domain-specific datasets for semiconductor tapeout and post-training (SFT and RLVR) of GLM 5.2.</li>
        <li>Shipped an agentic analog mixed-signal design verification toolchain used by Broadcom, Micron, and other tier-one semiconductor companies.</li>
        <li>Implemented model routing, programmatic tool calling, and caching optimizations that reduced token use by 40%.</li>
      </ul>
    </article>

    <article class="cv-entry">
      <div class="cv-entry__header">
        <h3>Computational Physics Fellow</h3>
        <span class="cv-entry__date">Jun. 2025 - Mar. 2026</span>
      </div>
      <p class="cv-entry__meta"><a href="https://www.lanl.gov">Los Alamos National Laboratory</a> · Los Alamos, NM</p>
      <ul>
        <li>Developed codes for modeling relativistic electron scattering in dilute gases for nuclear-weapons physics applications.</li>
        <li>Built flow-based models to super-resolve observables in particle-in-cell simulations of fusion reactors, jointly with the Jeong Lab at UCSB.</li>
      </ul>
    </article>

    <article class="cv-entry">
      <div class="cv-entry__header">
        <h3>Undergraduate Research Assistant</h3>
        <span class="cv-entry__date">Oct. 2022 - Present</span>
      </div>
      <p class="cv-entry__meta">University of California, Santa Barbara · Santa Barbara, CA</p>

      <div class="cv-subentry">
        <div class="cv-entry__header">
          <h4>Machine Learning Researcher</h4>
          <span class="cv-entry__date">Jun. 2024 - May 2025</span>
        </div>
        <ul>
          <li>Built flow-based generative models for representation learning of early-universe dark-matter density fields.</li>
          <li>Built flow-based models to super-resolve observables in particle-in-cell simulations of fusion reactors, jointly with Los Alamos National Laboratory.</li>
        </ul>
      </div>

      <div class="cv-subentry">
        <div class="cv-entry__header">
          <h4>Physics-Based Computation Researcher</h4>
          <span class="cv-entry__date">Oct. 2022 - May 2024</span>
        </div>
        <ul>
          <li>Built the first hardware implementation of a higher-order Ising machine, achieving state-of-the-art performance on XOR-satisfiability problems.</li>
          <li>Implemented graph-clustering algorithms to optimize device layouts and enable efficient hardware resource sharing, increasing device capacity by 20%.</li>
        </ul>
      </div>
    </article>

    <article class="cv-entry">
      <div class="cv-entry__header">
        <h3>Research Intern</h3>
        <span class="cv-entry__date">Jun. 2024 - Dec. 2024</span>
      </div>
      <p class="cv-entry__meta"><a href="https://www.ligo.caltech.edu">LIGO Laboratory</a> · Riverside, CA</p>
      <ul>
        <li>Built graph-neural-network surrogate models for accelerating LIGO interferometer simulations.</li>
        <li>Achieved up to 800x speedups over traditional numerical methods with minimal loss of fidelity.</li>
        <li>Compared frequency- and spatial-domain laser-cavity simulations, improving the simulation of thermal aberrations.</li>
      </ul>
    </article>

    <article class="cv-entry">
      <div class="cv-entry__header">
        <h3>Flight Software Intern</h3>
        <span class="cv-entry__date">Jun. 2023 - Sep. 2023</span>
      </div>
      <p class="cv-entry__meta"><a href="https://www.astranis.com">Astranis Space Technologies</a> · San Francisco, CA</p>
      <ul>
        <li>Built data-analysis tooling for disk-space allocation on Astranis satellites.</li>
        <li>Wrote a Global Navigation Satellite System receiver interface for satellite localization during orbit raise.</li>
      </ul>
    </article>

    <article class="cv-entry">
      <div class="cv-entry__header">
        <h3>Firmware Engineering Intern</h3>
        <span class="cv-entry__date">Jun. 2022 - Sep. 2022</span>
      </div>
      <p class="cv-entry__meta">TenaFe, Inc. · Campbell, CA</p>
      <ul>
        <li>Designed, tested, and documented a lightweight software framework for verification of TenaFe's SSD controller.</li>
        <li>Wrote core modules for simulating error correction, buffers, flash memory, and read, write, and erase operations.</li>
      </ul>
    </article>
  </section>

  <section class="cv-section" aria-labelledby="cv-projects">
    <h2 id="cv-projects">Selected Projects</h2>
    <article class="cv-entry cv-entry--compact">
      <div class="cv-entry__header">
        <h3><a href="https://github.com/sidk2/build-your-own-lm">Mini-GPT</a></h3>
        <span class="cv-entry__date">May 2026 - Present</span>
      </div>
      <p>Implemented a GPT-2-style language model trained on TinyStories, including a BPE tokenizer, RoPE, multi-head attention, and mixture-of-experts layers.</p>
    </article>
    <article class="cv-entry cv-entry--compact">
      <div class="cv-entry__header">
        <h3>Fermiacc</h3>
        <span class="cv-entry__date">May 2026 - Present</span>
      </div>
      <p>Building AI agents for autonomous theory generation and validation in high-energy physics, in collaboration with UCSB physicists.</p>
    </article>
  </section>

  <section class="cv-section" aria-labelledby="cv-publications">
    <h2 id="cv-publications">Publications</h2>
    <ol class="cv-publications">
      <li><strong>Kannan, S.</strong>, Qiu, T., Cuesta-Lazaro, C., and Jeong, H. (2025). <a href="https://arxiv.org/abs/2507.11842">Lambda-CFM: Scale-Aware Representation Learning for Cosmology with Flow Matching</a>. <em>Machine Learning: Science and Technology</em>, in press.</li>
      <li><strong>Kannan, S.</strong>, Goodarzi, P., Papalexakis, E., and Richardson, J. (2025). <a href="https://arxiv.org/abs/2512.16051">Graph Neural Networks for Interferometer Simulation</a>. <em>NeurIPS 2025 Workshop on AI for Science</em>.</li>
      <li>Nikhar, S.*, <strong>Kannan, S.*</strong>, Aadit, N. A.*, Chowdhury, S., and Camsari, K. Y. (2024). <a href="https://www.nature.com/articles/s41467-024-53270-w">All-to-all reconfigurability with sparse and higher-order Ising machines</a>. <em>Nature Communications</em>, 15, 8977. *Equal contribution.</li>
      <li>López-Paradís, G., Hair, I. M., <strong>Kannan, S.</strong>, et al. (2024). <a href="https://doi.org/10.1109/ISCA59077.2024.00026">The Case for Data Centre Hyperloops</a>. <em>Proceedings of the 51st ACM/IEEE International Symposium on Computer Architecture</em>, 230-244.</li>
    </ol>
  </section>

  <section class="cv-section" aria-labelledby="cv-teaching">
    <h2 id="cv-teaching">Teaching Experience</h2>
    <article class="cv-entry">
      <div class="cv-entry__header">
        <h3>Undergraduate Learning Assistant</h3>
        <span class="cv-entry__date">Sep. 2023 - Present</span>
      </div>
      <p class="cv-entry__meta">University of California, Santa Barbara · Santa Barbara, CA</p>
      <ul>
        <li>Assisted with Intro to Scientific Computing, Electrostatics, Data Structures and Algorithms I &amp; II, and Discrete Mathematics.</li>
        <li>Held office hours and graded assignments.</li>
      </ul>
    </article>
    <article class="cv-entry">
      <div class="cv-entry__header"><h3>Course Instructor</h3></div>
      <p class="cv-entry__meta">University of California, Santa Barbara · Santa Barbara, CA</p>
      <ul>
        <li><a href="{{ '/teaching/cmptg-cs-5-s25/' | relative_url }}">CMPTG CS 5: Statistical Physics and Neural Networks</a> - Taught a ten-week course connecting neural-network theory and statistical physics, including energy-based and diffusion models and neural tangent kernels.</li>
        <li><a href="{{ '/teaching/phys-cs-5-winter-2026/' | relative_url }}">PHYS CS 5: Non-equilibrium Statistical Mechanics</a> - Taught a ten-week course covering stochastic processes, Brownian motion, kinetic theory, and open quantum systems.</li>
      </ul>
    </article>
  </section>

  <section class="cv-section" aria-labelledby="cv-talks">
    <h2 id="cv-talks">Selected Talks</h2>
    <ul class="cv-talks">
      <li><em>Lambda-CFM: Scale-Aware Representation Learning for Cosmology with Conditional Flow Matching</em>, Simons Foundation, Learning the Universe Collaboration invited talk, Dec. 2025.</li>
      <li><em>Self-Consistent Relativistic Electron Scattering for X-Ray Diagnostics</em>, Kavli Institute for Theoretical Physics, UC Santa Barbara Undergraduate Research Symposium, Sep. 2025.</li>
      <li><em>Statistical Mechanics of Machine Learning</em>, NSF Institute for Artificial Intelligence and Fundamental Interactions reading group, Mar. 2025.</li>
      <li><em>Graph Neural Networks for Interferometer Simulations</em>, Kavli Institute for Theoretical Physics, UC Santa Barbara Undergraduate Research Symposium, Sep. 2024.</li>
    </ul>
  </section>

  <section class="cv-section" aria-labelledby="cv-awards">
    <h2 id="cv-awards">Awards &amp; Honors</h2>
    <ul class="cv-awards">
      <li><strong>NSF Graduate Research Fellowship Program Honorable Mention</strong></li>
      <li><strong>Regents' Scholar</strong> - Merit scholarship awarded to approximately 2% of incoming UC Santa Barbara undergraduates.</li>
      <li><strong>Semiconductor Research Corporation Research Scholar</strong> - One-year undergraduate fellowship sponsored by IBM supporting research on probabilistic computers.</li>
    </ul>
  </section>
</div>
