---
title: 'Distribueret Galgeleg'
excerpt: 'Galgelegs-spil som en del af et studieprojekt om distribuerede systemer.'
coverImage: '/assets/blog/distribueret-galgeleg/ui.png'
date: '2018-01-05T05:35:07.322Z'
author:
  name: 'Troels Lund'
  picture: '/assets/blog/authors/troels.png'
ogImage:
  url: '/assets/blog/chess/board1.png'
tags: ["project"]
technologies: ["SOAP", "REST", "JQuery", "JavaScript", "CSS", "HTML", "Java"]
language: "da"
isDraft: false
---

Som en del a mit studie arbejdede jeg på et mindre projekt, hvor målet var at udvikle et Galgelegs-spil, også kendt som Hangman på engelsk. Projektet blev udført som en del af et kursus om distribuerede systemer. Vores underviser havde stillet en autentifikationsservice til rådighed, så vi kunne logge ind med vores studienummer. Der blev også stillet en service til rådighed, som returnerede en liste over ord, der kunne findes på forsiden af DR.dk.

![Alt text](/assets/blog/distribueret-galgeleg/system.png)

![Alt text](/assets/blog/distribueret-galgeleg/REST.png)

Kurset fokuserede på at give os praktisk erfaring med forskellige teknologier, så vi brugte blandt andet Java's RMI til at kommunikere med autentifikationsserveren. Vi skulle udvikle mindst to grænseflader til spilserveren, og jeg valgte at lave et REST-interface og et SOAP-interface. Der blev også udviklet en TUI (tekstbaseret brugergrænseflade), som benyttede SOAP-interfacet, samt en webgrænseflade, der brugte REST-interfacet og var skrevet med JQuery.

![Alt text](/assets/blog/distribueret-galgeleg/TUI.png)

![Alt text](/assets/blog/distribueret-galgeleg/login.png)

![Alt text](/assets/blog/distribueret-galgeleg/ui.png) 

Spilserveren håndterede aktive spil ved at have en HashMap over spillere og spilinstanser. Alle vundne spil blev logget og gemt, så de kunne vises i et score board i brugergrænsefladen.

![Alt text](/assets/blog/distribueret-galgeleg/log.png)