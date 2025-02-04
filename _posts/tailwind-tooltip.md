---
title: 'Animated SVG Car Component'
excerpt: 'This project provides a very simple example of how SVG animation can be done in React.'
coverImage: '/assets/blog/svg-car-animation/img.png'
date: '2023-08-06T05:35:07.322Z'
author:
  name: Troels Lund
  picture: '/assets/blog/authors/troels.png'
ogImage:
  url: '/assets/blog/svg-car-animation/img.png'
tags: ["project"]
technologies: ["React", "SVG", "CSS animation"]
language: "en"
isDraft: true
---



```html 
<div class="group relative inline-flex gap-2 text-nowrap text-xs">
    <span>Element to hover</span>
    <div class="border-gray-300 pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 transform rounded-md border p-2.5 text-white opacity-0 shadow-md shadow-black transition-all duration-200 ease-in-out group-hover:opacity-100">
        Tooltip content
    </div>
</div>
```