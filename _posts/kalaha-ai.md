---
title: 'Exploring AI Strategies in Kalaha'
excerpt: 'A AI for the classic board game Kalaha, also known as Mancala in some regions. This project delved into the game rules, state space, game elements, methods and algorithms, heuristics, parameter adjustments, and benchmarking results.'
coverImage: '/assets/blog/kalaha-ai/Board_Game_Assignment_Kalaha.pdf-image-003.png'
date: '2020-04-28T05:35:07.322Z'
author:
  name: Troels Lund
  picture: '/assets/blog/authors/troels.png'
ogImage:
  url: '/assets/blog/kalaha-ai/Board_Game_Assignment_Kalaha.pdf-image-003.png'
tags: ["project"]
technologies: ["Python", "AI"]
language: "da"
---

## Introduction

As part of the course *introduction to artificial intelligence* at DTU we should create a AI for a game.

we choose to a AI for the classic board game Kalaha, also known as Mancala. Our work examined the game rules, state space, game elements, methods and algorithms, heuristics, parameter adjustments, and benchmarking results.

## Game Rules and Chosen Game

Kalaha is a deterministic, turn-based game where both players have complete visibility of the game's current state. The game starts with a (6,4) setup, meaning each of the two players has six pits, each containing four stones. The goal is to accumulate the most stones in your Kalaha (store) by the end of the game. The game's deterministic nature allows players to foresee the outcomes of their moves, making it an excellent candidate for AI strategy development.

![alt text](/assets/blog/kalaha-ai/Board_Game_Assignment_Kalaha.pdf-image-003.png)

The start state is shown in the console like shown below:
![alt text](/assets/blog/kalaha-ai/Board_Game_Assignment_Kalaha.pdf-image-005.png)

## State Space Complexity

The state space of Kalaha is vast due to the numerous possible configurations of stones in pits and Kalahas. For the standard version with 48 stones and 14 pits (including Kalahas), the state space complexity is approximately \(1.7 \times 10^{20}\) possible states. However, many of these states are unreachable due to the game's rules, reducing the practical complexity to around \(1.31 \times 10^{13}\) reachable states.

![alt text](/assets/blog/kalaha-ai/Board_Game_Assignment_Kalaha.pdf-image-009.png)

## Game Elements

The game elements include:
- **Initial state (s0)**: The starting configuration with four stones in each pit.
- **Player(s)**: Indicates which player's turn it is.
- **Actions(s)**: Possible moves for the current player.
- **Results(s, a)**: The game state resulting from a player's action.
- **Terminal-Test(s)**: Checks if the game has ended.
- **Eval_win_loss(s, p)**: Evaluates the state for a win, loss, or draw for a player.
- **Eval_max_dif(s, p)**: Measures how favorable the current state is for a player based on score difference.
- **Eval_sum(s, p)**: Assesses the board state by comparing one player's side to the other.

## Methods and Algorithms

The project implemented a Minimax-based algorithm with alpha-beta pruning to navigate the game tree efficiently. Alpha-beta pruning helps reduce the number of nodes evaluated, speeding up the decision-making process. The Minimax algorithm was chosen for its ability to evaluate the best possible move by exploring potential future states of the game.

## Heuristics

Several heuristics were tested to determine the most effective strategy for the AI:
- **Winner or Loser Heuristic**: Simplistic, focusing on whether the player is winning or losing.
- **Maximize Point Difference Heuristic**: Evaluates moves based on the score difference, aiming to maximize the player's score advantage.
- **Sum Difference Heuristic**: Considers the sum of stones on each side of the board to predict potential losses and gains.

In testing, the Maximize Point Difference heuristic proved the most effective, winning 97.5% of games against a random agent.

## Parameter Adjustments

The AI's performance can be tweaked through various parameters:
- **Algorithm Variation**: Alpha-beta pruning significantly reduces computation time compared to the standard Minimax algorithm.
- **Search Depth**: Deeper searches allow the AI to evaluate moves more thoroughly, improving decision-making.
- **Initial Turn**: The player who starts has a significant advantage, often leading to a win if playing optimally.
- **Value of Paths**: Different paths can be evaluated based on their outcomes, with the AI choosing the path that maximizes its score.

## Benchmarking Results

Benchmarks showed that alpha-beta pruning drastically reduced computation time at deeper search levels, making it a more efficient choice for AI implementation. Deeper search depths consistently improved the AI's performance, ensuring it rarely, if ever, lost a game when set to a depth of four or more.

## Conclusion

This project demonstrated the application of AI techniques in solving a deterministic, turn-based game like Kalaha. The combination of Minimax with alpha-beta pruning and effective heuristics resulted in a highly competent AI capable of making optimal moves. These findings not only contribute to the understanding of game theory and AI but also provide a solid foundation for further research and development in AI-based game strategies.

For more details and to view the complete project, visit the [GitHub Repository](https://github.com/trolund/KalahaAI).

The full report can be found [here.](/assets/blog/kalaha-ai/Board_Game_Assignment_Kalaha.pdf)

## Contributors

Troels Lund, Mads Stege, and Niklas Thielemann.