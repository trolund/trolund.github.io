---
title: 'Real-time feedback - Application for optimizing meetings and teaching'
excerpt: 'The project delivered a prototype real-time feedback system comprised of a .NET Core REST API backend and a Next.js frontend as a PWA.'
coverImage: '/assets/blog/ba-thesis/1675346501495.pdf-image-001.png'
date: '2020-06-25T05:35:07.322Z'
author:
  name: Troels Lund
  picture: '/assets/blog/authors/troels.png'
ogImage:
  url: '/assets/blog/ba-thesis/1675346501495.pdf-image-001.png'
tags: ["project", "DTU"]
technologies: ["C#", ".NET", "Azure", "SignalR", "Next.js", "CI/CD", "PWA"]
language: "en"
---

I recently completed my bachelor and handed-in by bachelor thesis. This post gives a overview of what the thesis was about. The project was proposed by the company Spinoff.

Spinoff, a consulting firm specializing in organizational, leadership, employee, and team development, has commissioned a project to create a performance evaluation tool for public speaking. This tool allows spectators to provide immediate feedback to speakers after events, aiding Spinoff consultants in offering improved advice and guidance.

<img src="/assets/blog/ba-thesis/1675346501495.pdf-image-078.jpg" alt="give-feedback" style="maxWidth:200px;"/>

The project delivered a prototype system comprising a .NET Core REST API backend and a Next.js (React) frontend, utilizing progressive web application (PWA) technology for a near-native mobile application experience. The system focuses on managing events, collecting feedback, and presenting it concisely to speakers. Key features include a login system with user privileges, user administration, real-time feedback using SignalR, and a feedback dashboard.

A diagram of the flow in the app can be seen below:

![alt text](/assets/blog/ba-thesis/1675346501495.pdf-image-050.png)

Continuous integration and deployment (CI/CD) techniques were employed to simplify system management, and the system was deployed on Azure for testing a production version during development.Spinoff, a consulting firm specializing in organizational, leadership, employee, and team development, has commissioned a project to create a performance evaluation tool for public speaking. This tool allows spectators to provide immediate feedback to speakers after events, aiding Spinoff consultants in offering improved advice and guidance. The project delivered a prototype system comprising a .NET Core REST API backend and a Next.js (React) frontend, utilizing progressive web application (PWA) technology for a near-native mobile application experience. The system focuses on managing events, collecting feedback, and presenting it concisely to speakers. Key features include a login system with user privileges, user administration, real-time feedback using SignalR, and a feedback dashboard. Continuous integration and deployment (CI/CD) techniques were employed to simplify system management, and the system was deployed on Azure for testing a production version during development.

### Links

The entire thesis can be found [here.](/assets/docs/beng-thesis.pdf) The source code of the back-end can be found [here](https://github.com/trolund/Feedback-Backendv2) and the front-end [here.](https://github.com/trolund/Feedback-PWA)