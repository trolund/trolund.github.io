---
title: 'GPA for DTU students - PWA'
coverImage: '/assets/blog/grade-dtu-pwa/main.jpg'
date: '2020-02-02T05:35:07.322Z'
author:
  name: 'Troels Lund'
  picture: '/assets/blog/authors/troels.png'
ogImage:
  url: '/assets/blog/grade-dtu-pwa/main.jpg'
tags: ["project", "DTU"]
technologies: ["TypeScript"]
language: "en"
---

This PWA will let every DTU student login with there student number and there inside password. No information is logged.  

<img src="/assets/blog/grade-dtu-pwa/login.png" alt="login" style="height:400px !important;" />

The app is a easy way of keeping track of grades, the app will even let you choose which program that you what you what the GPA of.

<div class="grid lg:grid-cols-2 md:grid-cols-2 xs:grid-cols-1">
  <div class="p-2">
    <img src="/assets/blog/grade-dtu-pwa/grades.png" alt="grades" style="height:400px !important;" />
  </div>
  <div class="p-2">
    <img src="/assets/blog/grade-dtu-pwa/select.png" alt="select" style="height:400px !important;" />
  </div>
</div>

Futhermore a view with details about each grade can be open.

<img src="/assets/blog/grade-dtu-pwa/detail.png" alt="detail" style="height:400px !important;" />

The overview screen show the lowest grade received, the avg grade and the highest grade received. 

<img src="/assets/blog/grade-dtu-pwa/overview.png" alt="overview" style="height: 400px !important;" />

The app can be fund <a href="https://dtu-grade-viewer-pwa.herokuapp.com/" target="_blank">here</a>, the server will spin up when someone goes to the page, this also means that it will be quite slow when opening the app, i am looking for at better solution that is not too expensive.  

Since it is a PWA it can be installed in the browser and on both IOS and Android. 