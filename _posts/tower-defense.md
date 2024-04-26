---
title: 'Tower defense spil'
coverImage: '/assets/blog/old/tower2.png'
date: '2018-02-18T05:35:07.322Z'
author:
  name: Troels Lund
  picture: '/assets/blog/authors/troels.png'
ogImage:
  url: '/assets/blog/old/tower2.png'
tags: ["post", "project", "DTU"]
technologies: ["C#", "Unity"]
language: "da"
---

Spillet blev til et grundklægende "tower defence" spil, med tre typer af tårne samt 3 typer fjener.  
  
Baner blive modeller som et 2D array af karaktere.

*   “#” - En platform som tårne kan stå på.
*   " " - Et tomt rum hvor fjender kan bevæge sig. Tea
*   "s" - Start position/instansierings punkt for fjender.
*   "E" - Slut punkt/punkt hvor fjenden skader spilleren og forsvinder.

Selve instantieringen af banen foregår ved vi iterere gennem 2D array’et og med en switch, evaluere på hver enkelt karakter, og mappe dem til enten at instantiere et givent gameobject i vores 3D verden eller tilføje denne position til at være et område som kan betrædes af fjenderne.

Hver tårn har en rækkevide som helvist bestemes af tårntypen og af upgraderings nivuet. Tårnene har to møder at finde fejener. En hvor den skyder på den nærmeste og en hvor den skyder på den som er længest på banen.  
  
I spillet er der også lavet undertyper af fjender, som nedarver fra Enemy klassen. Det er blevet lavet med henblik på at lave forskellige typer af fjender, som har forskellige styrker/svagheder og som har forskellige ​evner​.  
  
For at fjender skal kunne navigere igennem en bane fra start til slut, anvender spillet Bredde-først søgnings algoritmen til at finde en vej som de kan gå.  

![](/assets/blog/old/tower1.png)
