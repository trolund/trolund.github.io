---
title: 'Building a React + Vite Sand/Water Sandbox'
excerpt: 'A lightweight 2D particle simulation built with React, Vite, and a canvas-based cellular grid. It supports sand, water, viscous fluids, sources, sinks, pipes, walls, heat zones, and moveable flow meters for a playful fluid toy that doubles as a teaching aid.'
coverImage: '/assets/blog/sand-box/one.png'
date: '2026-01-10T21:45:00.000Z'
author:
  name: 'Troels Lund'
  picture: '/assets/blog/authors/troels.png'
ogImage:
  url: '/assets/one.png'
tags: ["project"]
technologies: ["React", "TypeScript", "Vite", "Canvas", "HTML", "CSS"]
language: "en"
isDraft: false
---

## Introduction

Particle sandboxes are a delightful intersection of physics intuition and playful experimentation. This one was built in roughly 30 minutes of 100% vibe coding—a fun pace for a toy, but not the process to copy for anything serious. It riffs on a flash game I remember playing during school breaks, now rebuilt with a React + Vite stack that runs entirely on an HTML canvas. A grid-based cellular update loop models sand piling, water flow, viscous drift, heat-driven pressure, and pipe-constrained transport. Tools like sources, sinks, walls, pipes, and moveable flow meters let you sketch small fluid circuits and observe emergent behaviors.

## Implementation Details

### Framework and rendering
Built with React + TypeScript (bundled by Vite), the simulation renders to a low-resolution canvas (150×100 grid, scaled up for a chunky pixel look). A pre-allocated `ImageData` buffer keeps per-frame work minimal before blitting to the visible canvas.

### Simulation engine
- **Grid + types:** Each cell tracks a base tile (none, wall, pipe, source, sink, heat) and a particle (empty, sand, water, viscous). Temperature and simple velocity fields support heat/pressure effects.
- **Update loop:** A requestAnimationFrame loop advances the simulation. Sand falls straight down then diagonally; water/viscous flow downward with lateral slip controlled by a viscosity slider. Heated cells boost speed and add a small upward probability to mimic pressure.
- **Sources & sinks:** Sources accumulate fractional spawn amounts (`rate * dt`) and emit the selected particle type. Sinks remove particles on contact.
- **Pipes:** Once a particle enters a pipe, movement is constrained to pipe-friendly cells (pipe/source/sink/heat), keeping flow inside channels. Walls around pipes help shape proper conduits.
- **Heat:** Heat cells hold temperature at 1; surrounding cells cool over time. Higher temperature increases fluid mobility and upward push.
- **Flow meters:** A flow meter attached to a pipe cell counts particles passing through per second. Meters are moveable—click to pick up, click another pipe to drop, or drop off-pipe to remove.

### Tooling and controls
- **Tools:** Brush (paint particles), Source, Sink, Wall, Pipe, Flow Meter, Heat, Eraser.
- **Sliders:** Brush size, source spawn rate (particles/sec), viscosity.
- **Transport:** Pipes act as guided channels; walls block; sinks drain. Heat accelerates and lifts fluids, making compact chambers build pressure-like behavior.
- **Performance:** The fixed grid and single pass per frame keep it responsive in the browser without external physics libs.

### Build notes
- This was built in about half an hour of pure vibe coding—great for a playful sandbox, but not the best approach for a production-grade simulator.
- The quick iteration keeps the code approachable and easy to tweak if you want to add new particle types or tweak movement rules.

## Screenshots

![Particles flowing through pipes (animated)](/assets/blog/sand-box/ani.gif)

## Conclusion

This React + Vite sandbox blends cellular automata simplicity with hands-on fluid play. Pipes, meters, and heat let you prototype tiny circuits—waterfalls, siphons, or pressure chambers—while the UI stays approachable. The vibe-coded, 30-minute build works for a small fun project; in a serious context, a more deliberate design, testing, and performance pass would be the better path.

See the code in this repo and run locally with `npm install && npm run dev`. 

Source code: [github.com/trolund/sand-box](https://github.com/trolund/sand-box)

Live demo: [troelslund.dk/sand-box](https://www.troelslund.dk/sand-box/)

<hr>

### References

- Canvas rendering optimizations: Mozilla Developer Network. (n.d.). `ImageData` and canvas 2D context.
