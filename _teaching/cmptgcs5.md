---
title: "CMPTG CS 5 - Spring 2025"
collection: teaching
type: "Seminar"
permalink: /teaching/cmptg-cs-5-s25
venue: "University of California, Santa Barbara, College of Creative Studies"
date: 2025-04-01
location: "Santa Barbara, California"
---

I had the privelege of teaching a 10 week seminar course on statistical mechanics and its connections to machine learning theory. We covered the following topics: 1] Boltzmann statistics, 2] the Ising model and mean field theories, 3] Energy based models and Boltzmann machines, 4] Diffusion Models, 5] Fokker-Planck equations and the probability flow ODE, 6] Effective field theories of neural networks, and 7] Neural tangent kernels.

You can find my lecture notes at below. Finding typos is left as an exercise for the reader :).

<h2>Lecture Notes</h2>
<ul>
  {% assign notes = site.static_files | where_exp:"f","f.path contains 'files/cmptgcs5/lectures'" %}
  {% for file in notes %}
    <li>
      <a href="{{ file.path }}">{{ file.name | replace: '.pdf', '' | replace: 'Lecture', 'Lecture ' }}</a>
    </li>
  {% endfor %}
</ul>

<h2>Assigned Problems</h2>
<ul>
  {% assign notes = site.static_files | where_exp:"f","f.path contains 'files/cmptgcs5/hw'" %}
  {% for file in notes %}
    <li>
      <a href="{{ file.path }}">{{ file.name | replace: '.pdf', '' | replace: 'cs5_hw', 'Problem Set ' }}</a>
    </li>
  {% endfor %}
</ul>

References
======
Parts of these lecture notes are indebted to the following resources
- Peter Holdierrieth's (https://www.peterholderrieth.com/blog/2023/The-Fokker-Planck-Equation-and-Diffusion-Models/) and Yang Song's (https://yang-song.net/blog/2021/score/) blog posts on diffusion 
- Principles of Deep Learning Theory by Roberts, Yaida and Hanin 