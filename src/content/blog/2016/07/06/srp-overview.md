---
title: "The Single Responsibility Principle: Overview"
description: 'Introduction to the Single Responsibility Principle - a class should have only one reason to change.'
pubDate: 'Jul 06 2016'
date: 2016-07-06 03:23 UTC
tags: SRP, SOLID
archived: true
---

The Single Responsibility Principle states that a class must have only one reason to change.

To demonstrate this principle, let's take a look at the `BoardGame` example:

READMORE

```java
interface BoardGame {
    public void move(Player, Space);
    public Player determinWinner();
    public boolean isOver();
    public void clear();
}
```

Here is what each of these is intended to do.

* `move` will move a player to a space on the board.
* `calculateWinner` will calculate the winner of the game.
* `isOver` is false until there is a winner.
* `clear` will reset the game state.

What are some reasons that would necessitate a change in a class that implemented this interface?

1. The rules for what a valid move is change.
2. The rules for how a player can win change.
3. A new rule is introduced that enables the game to have multiple winners.
4. The player configuration should remain intact when the game is cleared.

Listing some of the possible reasons that we may need to change our implementation of the `BoardGame` reveals something. The responsibility of the class is to enforce the rules of the game *and* manage the game state.

Often, the difficulty doesn't lie in resolving the SRP violations, but rather in identifying them. The fix is usually rather simple. For our `BoardGame` example, we would simply introduce another abstraction which was only responsibile for the game state.

```java
interface BoardGame {
    public void move(Player, Space);
    public Player determinWinnkr();
    public boolean isOver();
}

interface State {
    public void clear();
}
```

Why we should bother with SRP and techniques for identifying violations will be covered in upcoming posts.
