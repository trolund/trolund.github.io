---
title: 'Autonom drone'
coverImage: '/assets/blog/old/openCV-QR.png'
date: '2018-02-18T05:35:07.322Z'
author:
  name: Troels Lund
  picture: '/assets/blog/authors/troels.png'
ogImage:
  url: '/assets/blog/old/drone.svg'
tags: ["project", "DTU"]
technologies: ["OpenCV", "Java"]
language: "da"
---

Opgaven var at lave noget softeware til en drone som skulle gøre den istand til autonomt kunne flyve gennem seks røde ringe med QR-koder under. Vi anvendte Java bibliotektet YaDrone, samt computer vision bibliotektet OpenCV til at analysere videofeedet fra dronens front kamera. 

Video streamen bliver sent over WIFI til en computer (General purpose) som køre controller softwaren. Ud fra de data som modtages, vurderes det hvad handling som skal ske, disse komandoer er så sent til dronen.


### System design
![Alt text](/assets/blog/old/image8.jpg)

### Ruteplanlægning

Dronen skulle gennem 6 ringe som dronen skulle flyve igennem. Ringene stod med skæve vinker, banen var overordtnet formet som en hestesko. Ringene have forskelling størrelser men havde alle en QR-Kode af samme størrelse under sig. Hver QR-Kode representeret et nummber som angav rækkefælgen ringene skulle. Siden QR-Koderne var ens brugte vi disse til at vudere vinkel og afstand til målet. 

![Alt text](/assets/blog/old/image3.jpg)

Nedenfor ses et eksemple på hvordan programmet behandlet billede for at finde selve QR-Kodens omris. 

![Alt text](/assets/blog/old/openCV-QR.png)

Projektet er udarbjedet i en gruppe på 8, som en del a et kursus på DTU.

projektet kode kan findes [her](https://github.com/tMascagni/CDIO_3)

