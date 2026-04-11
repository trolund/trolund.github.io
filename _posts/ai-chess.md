---
title: 'Reviving a 5-Year-Old Chess Project With Agentic Coding ♟️'
excerpt: 'I started this project five years ago, left it at around 90% complete, and recently came back to finish it with the help of agentic coding, adding major improvements in under two hours.'
coverImage: '/assets/blog/next-chess/cover.png'
date: '2026-04-09T10:00:00.000Z'
author:
  name: Troels Lund
  picture: '/assets/blog/authors/troels.png'
ogImage:
  url: '/assets/blog/next-chess/cover.png'
tags: ["post", "project", "AI", "Chess", "Agentic Coding"]
technologies: ["Next.js", "React", "TypeScript", "Stockfish", "Web Workers", "PWA", "WASM"]
language: "en"
---

Five years ago, I started building this chess project.

At the time, it was probably 90% done. The core idea was there, a lot of the game logic was already in place, and the project had real potential. But like a lot of side projects, it slowly lost momentum. I lost interest, moved on to other things, and never came back to finish the final stretch.

That changed recently. 🦾🤖⚡️

With the help of agentic coding, I was able to come back to this old codebase, understand it quickly (or the LLM did), and push it all the way into a working state. Not only did I get the project running properly again, However, I ended up adding far more functionality than I originally planned. Simply because the effort required is so minimal.

That is the part that really stands out to me. This was not starting from scratch. It was reopening an old project, with old decisions, old structure, and the usual “I’ll remember how this works later” assumptions baked into it. Normally, getting back into something like that takes a lot of time. With agentic coding, the process was dramatically faster. Instead of spending hours reloading context into my own brain before making progress, I could move almost immediately into improving the project.

The downside, though, is that even though I think the final project is cool, I definitely learned less than when I coded everything myself. I also feel that the reward of doing side projects like this is much lower now that I can’t pat myself on the back and say, “I did this.”

## What the Project Does

At its core, this is a web-based chess application built with Next.js and TypeScript.

It supports human play as well as multiple AI opponents, which makes it much more than a simple chessboard UI. The project includes a full game engine, move validation, game-state tracking, AI integrations, rankings, and match telemetry. It has turned into a small chess platform rather than just a basic demo.

## Technical Breakdown

The technical side is what makes this project especially satisfying.

The frontend is built with Next.js, React, and TypeScript. The board UI renders the game state visually, tracks moves, handles piece interactions, displays captured pieces, and shows live match status. The app also stores player settings and leaderboard data locally, which makes the experience persistent between sessions.

Under the UI, there is a custom chess engine that handles the actual rules of the game. That includes:

- Legal move generation
- Check and checkmate detection
- Stalemate detection
- Castling
- En passant
- Pawn promotion
- Threefold repetition
- Fifty-move rule
- Insufficient material draws

That part matters, because chess is deceptively deep from an engineering perspective. Getting pieces to move is easy. Getting the rules right, especially all the edge cases, is the real work.

On top of that, the project supports multiple AI player types. Instead of locking the app to a single engine, it exposes a range of approaches, including:

- Minimax
- Alpha-Beta
- Ordered Alpha-Beta
- Heuristic Alpha-Beta
- Monte Carlo Tree Search
- Stockfish integration

Stockfish runs as a worker, which means the project can offer a much stronger engine without freezing the main UI thread. The Stockfish logic itself is embedded in a WASM module and runs on the WebAssembly VM. That makes the app more practical and also more interesting from a technical point of view, because it combines a custom chess engine with external engine support. I have not implemented the Stockfish WASM agent - that one was fetch from the big internet. 

There is also a leaderboard system that tracks match outcomes and ratings, plus an activity log that shows AI search and move events. That adds a layer of observability to the project. It is not just about making a move on a board, it is about seeing how the different agents behave and compare over time.

## Features in the Current Version

The project now includes a much more complete feature set than the version I originally left behind:

- Playable chess board in the browser
- Human players and AI players
- Multiple AI algorithms to choose from
- Stockfish support
- Configurable AI depth or think-time presets
- Move tracking and match state indicators
- Captured piece display
- Match timers and AI think-time tracking
- Animated piece movement
- Promotion handling
- Draw detection for major official draw conditions
- Local leaderboard and ranking view
- Importable leaderboard reports
- PWA support with manifest and service worker setup
- Debug and testing utilities for validating edge cases

A screenshot of the current UI can be seen below. 

![UI screenshot](/assets/blog/next-chess/ui.png)

## Why This Was Different

The most interesting part of this whole experience was not just finishing the project. It was how fast I could move with agentic coding.

This is exactly the kind of project that usually gets stuck in the “too annoying to resume” category. The code is familiar enough that you do not want to throw it away, but old enough that working on it feels expensive. Agentic coding changes that equation. It helps bridge the gap between an old unfinished prototype and a finished, working application.

For me, that was the real win here. ✌️

I started this project five years ago, got it to about 90% of an MVP, then let it sit. Now, with the power of agentic coding, I not only got it into a working state, but added a lot more on top in under two hours. That is a pretty compelling glimpse of what modern development can feel like when the friction of re-entry is removed.

## Final Thoughts

This project is a reminder that old code is not dead code. Sometimes it is just waiting for the right moment, and the right tools, to become interesting again.

What used to feel like a half-finished abandoned idea now feels like a complete, technically rich project with a solid foundation for future improvements. And honestly, that is one of the most exciting things about agentic coding: it does not just help build new things faster, it helps recover momentum on the things you thought you had already left behind and is excellent for small hobby project and prototypes!🔥

The project is deployed on Vercel and can be found here: 
<a href="http://next-chess-ten.vercel.app" target="_blank" rel="noopener noreferrer">
  next-chess-ten.vercel.app
</a>
