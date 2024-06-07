---
title: 'Multiplayer Tank game'
excerpt: 'Client-server multiplayer game with tanks'
coverImage: '/assets/blog/old/TankGame.png'
date: '2019-02-18T05:35:07.322Z'
author:
  name: 'Troels Lund'
  picture: '/assets/blog/authors/troels.png'
ogImage:
  url: '/assets/blog/old/TankGame.png'
tags: ["project"]
technologies: ["Java", "Tuple Spaces"]
language: "en"
---

As part of the course **Introduction to Coordination in Distributed Applications** at DTU a distributed application using Tuple spaces should be implemented.

Our project, ’Battle Tank’, is an entirely Java-based game, inspired by the ongoing ’Tank
Trouble’-series. In all its simplicity, the game is a ”deathmatch”-style, where the players attempt to shoot each other with their ricocheting shells flying all over the place.

The game hosts a game for two to four individual players, each one starting at specified places
on the map. Using angles and corners, players can maneuver their position to angle their shells
to hit others hiding around the corner. Further more, if a player realises they can not dodge an
incoming shell, they can try shooting it out of the air as a last resort.

Each of the three maps currently implemented are a 25x25 tile 2D-map, with a desert theme.
While possible, we decided on using static maps, instead of procedurally generated ones. This
allowed us to create maps with a more fair distribution of obstacles, decorative foliage and
stones, as well as an overall themes.

All communication and data transfer is handled using Tuples and Tuple spaces. These are
implemented using the Java library, jSpace. The system utilises a server/client-based structure,
where one of the players runs the server. Each of the connected players transmits their current
action(s) to a server-based Space. The server simulates the ongoing map in real time, and sends
updates on the current state of the game into another Space. The players listens for updates
from this Space, and updates their local game accordingly.

Overall, the final product has only a few flaws, and functions very much the same as the original
inspiration. Player and shell positions and directions are received and transmitted accordingly,
leaving only very little jittering to be seen.

The official GitHub repository for the project is public for anyone interested. Do note that
the pSpace-dependencies for Maven needs to be installed and functioning in order to run the
project properly.

### Video
  
<iframe width="100%" height="315" src="https://www.youtube.com/embed/AF3yki_jiNg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Contributors of the project 

- Arvid K. Langsø
- Mads Stege
- Peter I. El-Habr
- Simon Engquist
- Troels Lund

**The code can be found [here](https://github.com/STAMP-Team19/BattleTank).**