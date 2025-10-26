---
title: breaking-down-minimax
description: 'Breaking down the minimax algorithm for creating an unbeatable Tic-Tac-Toe computer player by minimizing maximum loss.'
pubDate: 'Jun 28 2016'
published: false
date: 2016-06-28 03:40 UTC
tags:
archived: true
---


The Minimax algorithm is algorithm for _minimizing_ the _maximum_ loss of a scenario. This is the algorithm I am using to power my unbeatable computer player for the Tic Tac Toe project.

First, let me go break down the definition a little further.

In context of a game of Tic Tac Toe, a scenario is a single possible future state of the game. For example, let's assume the `O` player will make the first move. There are 9 available spaces on the board for the `O` player to move on, which means there are 9 possible future states that could occur in the next turn.


(a diagram here)


Let's say that the `O` player chose the top left corner, now it is the `X` players turn. There are 8 possible spaces for it to move one, which means there are 8 possible futures left for the current state of the board.

(another diagram)


So that explains the what a "scenario" in terms of the definition of minimax. Next let's break down what it means to "minimize the maximum loss"

There is a good chance that you know (or at least you knew at some point) how to to play a game of tic tac toe and cause a draw every single time. How are we able to do that? It is fairly simple for us as humans, we choose which space to play based on how it will affect the opponent in his/her next turn.

Let's look at another example, given this game state

     0 |   | O
    ---|---|---
       | X |
    ---|---|---
       |   |


`X` must take the top middle space to prevent `O` from winning.

     0 | X | O
    ---|---|---
       | X |
    ---|---|---
       |   |

This is an example of `X` minimizing the maximum loss. The maximum loss here is that `O` would win the game.


If we take a step back, we can see an example of minimizing the maximum loss when a win is not possible in a single move.

     0 |   |
    ---|---|---
       |   |
    ---|---|---
       |   |


In this state of the game, `X` can move on any of the 8 available spaces, but in order to minimize the maximum future loss, it will choose the middle space. If it cannot win, or prevent a loss in single move, how does it determine that the middle space minimizes the maximum future loss?

It must be able to _look ahead_ beyond the current turn.

     0 |   |
    ---|---|---
       | X |
    ---|---|---
       |   |


     O | O |     O |   | O   O |   |     O |   |     O |   |     O |   |     O |   |    
    ---|---|--- ---|---|--- ---|---|--- ---|---|--- ---|---|--- ---|---|--- ---|---|--- 
       | X |       | X |     O | X |       | X | O     | X |       | X |       | X |    
    ---|---|--- ---|---|--- ---|---|--- ---|---|--- ---|---|--- ---|---|--- ---|---|--- 
       |   |       |   |       |   |       |   |     O |   |       | O |       |   | O  



### How It Works

Here is my implementation of minimax in Java.

```java
class ArtificialIntelligence implements Finder {
    private Marker marker;

    public ArtificialIntelligence(Marker marker) {
        this.marker = marker;
    }

    public int minimax(Game game, int depth, boolean maximizingPlayer) {
        if (game.isOver() || depth == 0) return scoreFor(game, depth);

        HashMap<Integer, Space> scores = new HashMap<>();

        for (Space space : game.getBoard().getAvailableSpaces()) {
            game futuregame = game.copy();
            futuregame.move(space, futuregame.getNextMarker());

            scores.put(minimax(futuregame, depth - 1, !maximizingPlayer), space);
        }

        if (maximizingPlayer) {
            return scores.keySet().stream()
                    .reduce(Integer.MIN_VALUE, Integer::max);
        } else {
            return scores.keySet().stream()
                    .reduce(Integer.MAX_VALUE, Integer::min);
        }

        return bestScore;
    }

    private int scoreFor(Game game, int depth) {
        if (game.getWinningMarker() == marker) {
            return 10 + depth;
        } else if (game.isOver() && !game.isDraw()) {
            return -10 - depth;
        }
        return 0;
    }
}
```

That is a alot of code, but I am not going to dive into the details. I am going to attempt to explain how it works.

### Step 1: Branch Out

The first thing that this algorithm does is it builds out a tree of the possible future game states with the  maximum height being the value of the specifed depth.


Starting from the leaves of the tree, each node then scores the node's game state. My scoring method looked like this:

```java
private int scoreFor(Game game, int depth) {
    if (game.getWinningMarker() == marker) {
        return 10 + depth;
    } else if (game.isOver() && !game.isDraw()) {
        return -10 - depth;
    }
    return 0;
}
```

If the player is the winner in the game instance passed to the method, then the score is calculated as `10 + depth`. If the other player won the game, the game instance is scored as `-10 + depth`.

The use of depth here helps allows us to give a winning or losing game state closer to the root of the tree a higher of lower score respectively. This means that the move that will lead to the quickest win, or prevent a loss the fastet will always score higher.

If there is no winner, the intance gets a score of `0`.


The score of each move is added to a hashmap associates the score with a space. At every node of the tree, every available space is scored and added to the map.


### Minimaxing and Maximining

Up to this point in the algorithm, we have built out a a tree of every possible future game state, and scored each available space at each node in the tree.

(a diagram could be useful here)


Now we apply the attempt to minimize the maximum loss.

Starting at the root of our tree, as you move down each level, the player's turn alternates. This resembles the alterating turns in the game. In other words, at level 1 of the tree is all of the `X`'s possible turns, and at level 2 is all of `O`'s possible turns, given the turn that `X` previously took in the parent.


So how do we represent this in code.

If you recall the signature of the algorithm, we had the `maximizingPlayer` boolean argument. When this is true, we want to choose the highest scoring space. When it is the opponents turn to move, `maximizingPlayer ` is `false`, so we look for the highest score from the opponents point of view. In that context, highest scoring space for the opponent, is also the lowest scoring space for us.

Every time we make the recursive call to `minimax` we not the `maximizingPlayer` value, which simimlates the affect of alternating turns.


So, when it is our turn, we want to look for the "minimax" value. We do that by looking up the maximum score 
