---
title: 'Motion detection camera'
coverImage: '/assets/blog/old/motionD.jpg'
date: '2018-02-18T05:35:07.322Z'
author:
  name: Troels Lund
  picture: '/assets/blog/authors/troels.png'
ogImage:
  url: '/assets/blog/old/motionD.jpg'
tags: ["project", "DTU"]
technologies: ["C", "OpenCV"]
language: "da"
---

En opgave som blev stillet i faget C Programmering. Koden anvender det kamera som er default det det system som koden køre på. de billeder som kameraet opfage sammenligner vi i par og med openCV identificere hvor der er sket ændringer i billedet og derved bevægesle, hvis der er sket tilstrækkelig meget bevægelse inden for et interval på 5sek, gemmes et billede med tidsstempel på enheden.


Koden kan findes [her.](https://github.com/trolund/MotionDetectionOpenCV-C)