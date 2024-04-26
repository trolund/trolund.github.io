---
title: 'Simulating - Package Delivery using Drones in urban areas'
excerpt: 'This article describes the implementation of a simulator that was done as part of the course 02223 Model-Based Systems Engineering at DTU.'
coverImage: '/assets/blog/drones/clustersv2.png'
date: '2023-01-17T05:35:07.322Z'
author:
  name: 'Troels Lund'
  picture: '/assets/blog/authors/troels.png'
ogImage:
  url: '/assets/blog/drones/clustersv2.png'
tags: ["post", "project", "DTU"]
technologies: ["Python", "Simulation", "PyGame"]
language: "en"
---

Model-Based Systems Engineering - Simulating a futuristic package delivery service using drones. This project have been done as a part of the course 02223 - Model-Based Systems Engineering at DTU in the Fall of 2022

A video of the running simulator can be found [here.](https://youtu.be/Zj8hlKBSeCk)

The simulation environments consist of randomly generated neighborhoods containing lands with houses and their designated, randomly generated, delivery addresses. Futhermore the the environments consist of a number of drones delivering the packages from a truck. The truck have a que of packages there are sorted based on distances from the truck to the distinction addresses.
Each drone can carry one package at a time. The drones will follow the pattern of:

1. Fetching a package from the truck.
2. Fly to the distinction address of the package.
3. Drop the package at arrival.
4. Return to the truck. 

In the implementation, the layout of the environment is represented
by a 𝑁 × 𝑀 matrix with different environment parts defined by
characters. 

* Road : "R"
* Ground: “.”
* Delivery spot: "S"
* Truck: "T"

The characters are then translated to a graphical representation to render the items on the
screen. This means that every object in the world has its coordinates
translated to match positions in the matrix.

The environment can be changed by using the main config file **config.ini** contains all the global parameters. The configuration file offers a great amount of flexibility to customize the simulation scenario. 

For instance will the input (world_size=15, ground_size=5, road_size=1, customer_density=0.5) result in the neighborhood
below. This representation is called a layout in the code.

     R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R 
     R  .  .  .  .  R  .  S  .  .  R  .  .  .  .  R 
     R  .  .  .  .  R  .  .  .  .  R  .  .  .  .  R 
     R  .  .  .  .  T  .  .  .  .  R  .  .  .  .  R 
     R  S  .  .  .  R  .  .  .  .  R  .  .  S  .  R 
     R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R 
     R  .  .  S  .  R  .  .  .  .  R  .  .  .  .  R 
     R  .  .  .  .  R  .  .  .  .  R  .  .  .  .  R 
     R  .  .  .  .  R  .  .  .  .  R  .  .  .  .  R 
     R  .  .  .  .  R  .  .  .  .  R  .  .  .  .  R 
     R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R 
     R  .  .  .  .  R  .  .  S  .  R  .  .  .  .  R 
     R  .  .  .  .  R  .  .  .  .  R  .  .  .  .  R 
     R  .  .  .  .  R  .  .  .  .  R  .  .  .  .  R 
     R  .  .  .  .  R  .  .  .  .  R  .  .  .  .  R 
     R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R 

The truck kan be configured to move around the neighborhood by applying the path-finder to the layout. This means that a route will be added to the layout above. The route is marked with the character "M". When the route is then started the truck will follow this route. 

     M  M  M  M  M  M  R  R  R  R  R  R  R  R  R  R 
     R  .  .  .  .  M  .  .  .  .  R  .  .  .  .  R 
     R  .  .  .  .  M  .  .  .  .  R  .  .  .  .  R 
     R  .  .  .  S  M  .  .  .  .  R  S  .  .  .  R 
     R  .  .  .  .  M  .  .  .  .  R  .  .  .  .  R 
     R  R  R  R  R  M  M  M  M  M  M  R  R  R  R  R 
     R  .  .  .  .  R  .  .  .  .  M  .  .  .  .  R 
     R  .  .  .  .  R  .  .  .  .  M  .  .  .  .  R 
     R  .  .  .  .  R  .  .  .  .  M  .  .  .  .  R 
     R  .  .  .  .  R  .  .  S  .  M  .  .  .  S  R 
     R  R  R  R  R  R  R  R  R  R  M  M  M  M  M  M 
     R  .  .  .  .  R  .  S  .  .  R  .  .  .  .  M 
     R  .  .  .  .  R  .  .  .  .  R  .  .  .  .  M 
     R  .  .  .  .  R  .  .  .  .  R  .  .  .  .  M 
     R  .  .  .  .  R  .  .  .  .  R  .  .  .  .  M 
     R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  M 

When moving the drones will deliver packages from the truck based on pre-computed clusters. Starting with delivering all packages of cluster **A** then cluster **C** and so on. 

The simulation do extensive logging where the most important is *fly times* of the drones and *distance traveled of the drones*.

The UI can be controlled by using the following input keys. 

* By pressing "U" will zoom in
* by pressing "D" will zoom out
* The arrow keys can be used to explore the environment.

### Video

The video below show a version of the simulator as was 2 weeks before hand-in.
  
<iframe width="100%" height="315" src="https://www.youtube.com/embed/Zj8hlKBSeCk" title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

### Contributors of the project 

* Oda Byskov Aggerholm
* Indre Aruodziute
* Anders Skrøvseth Haugen
* Troels Lund
* Jens Dieter Kjær Modvig
* William Wulff