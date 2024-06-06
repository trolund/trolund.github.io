---
title: 'Genetic algorithm used for path-finding'
excerpt: 'The project employs a genetic algorithm to discover a path from a starting point to a goal, both identified by black spots.'
coverImage: '/assets/blog/ga-path-finding/UI.png'
date: '2024-05-04T05:35:07.322Z'
author:
  name: 'Troels Lund'
  picture: '/assets/blog/authors/troels.png'
ogImage:
  url: '/assets/blog/ga-path-finding/UI.png'
tags: ["post", "project"]
technologies: ["Blazor", "Genetic algorithms", "C#", "JavaScript", "CSS", "HTML"]
language: "en"
isDraft: false
---

The project employs a genetic algorithm to discover a path from a starting point to a goal, both identified by black spots.

A genetic algorithm is a computational technique inspired by the process of natural selection and evolution. It's often used to solve optimization and search problems. In this case optimizing for the correct set of movement that will lead to the goal. Another example could be to find a sequence of characters as seen in this precursor to this project: [demo link](https://trolund.github.io/Simple-Genetic-algorithm/).

The candidate solutions, represented by colored circles, begin by moving somewhat randomly. In each generation, a fitness function evaluates their performance, rewarding progress towards the goal while penalizing deviations or collisions with obstacles.

Each candidate solution is represented by a sequence of movements, described as two-dimensional vectors. One point crossover is used to combine candidate solutions.

The mutation rate determines how frequently these movements will undergo changes, crucially introducing a randomizing factor.

The top candidate solutions from the population are chosen through Tournament or Rank selection methods.

## First generation

Initially, the candidate solutions move somewhat randomly, with a tendency towards upward movement. This deliberate choice accelerates the demonstration, showcasing the improvement of candidate solutions more rapidly.

![alt text](/assets/blog/ga-path-finding/gif1.gif)

## After multiple generations

Typically, after 12-15 generations, a stable solution is commonly reached. At this point, several candidate solutions successfully navigate around obstacles and reach the goal.

![alt text](/assets/blog/ga-path-finding/gif2.gif)

The project is developed as a Blazor WebAssembly application, with visualization rendered on an HTML5 canvas. A demonstration of the project can be accessed [here](https://trolund.github.io/Genetic-algorithm-path-finding/).