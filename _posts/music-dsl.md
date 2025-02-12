---
title: 'Composing Music 🎵 with an F# Internal DSL'
coverImage: '/assets/blog/music-dsl/music-dsl.webp'
date: '2025-02-12T05:35:07.322Z'
author:
  name: 'Troels Lund'
  picture: '/assets/blog/authors/troels.png'
ogImage:
  url: '/assets/blog/music-dsl/music-dsl.webp'
excerpt: 'I have been working on an internal DSL in F# that makes it incredibly easy to compose simple music.'
tags: ["project"]
technologies: ["F#", "DSL"]
language: "en"
--- 

I've been working on an **internal DSL in F#** that makes it incredibly easy to compose simple music. The goal is to provide a declarative, expressive way to create melodies while handling the underlying sound generation.  

Here's an example of composing and playing the **Super Mario Bros. theme song** using the DSL:  

```fsharp
open DSL.Generator
open DSL.MusicBuilder
open DSL.Player

let music = MusicBuilder()

let song =
    music {
        note "E5" 0.5
        note "E5" 0.5
        rest 0.25
        note "E5" 0.5
        rest 0.25
        note "C5" 0.5
        note "E5" 0.5
        rest 0.25
        note "G5" 0.5
        rest 0.25
        note "G4" 0.5
        // ... more notes ...
    }


let songName = "mario_bros_theme.wav"
// Generate a WAV file and play the song
createWav songName song
// play the generated song
playSound songName
```

With just a few lines, you can define melodies using **note names and durations** while the DSL takes care of the rest. 🚀  

I'm considering extending it with **chords, loops, and instrument variations**.

The source code can be found [here.](https://github.com/trolund/music-dsl)
