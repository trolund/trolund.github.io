---
title: 'RC Car'
coverImage: '/assets/blog/rc-car/car.jpg'
date: '2018-02-18T05:35:07.322Z'
author:
  name: Troels Lund
  picture: '/assets/blog/authors/troels.png'
ogImage:
  url: '/assets/blog/rc-car/car.jpg'
tags: ["project"]
technologies: ["C", "Arduino"]
language: "en"
---

The project was done as a hobby project in my spare time. The 3D printed parts was found on [Thingiverse](https://www.thingiverse.com/).

The brain of the rc-car is a arduino nano. Since i had bluetooth modules on hand i used and a old android smartphone, i choose to use bluetooth to control the car. This is definitely not a good fit for a fast moving RC-car like this, the range of the of i is not great. 

To control the car i created a Android app. Below you can see a video demo.

## video of the working prototype

<iframe width="100%" height="315" src="https://www.youtube.com/embed/w4m84X1jRR4" title="Youtube rc-car" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Code

Both the app and the Arduino code can be found [here](https://github.com/trolund/RC_car_and_Controller).
