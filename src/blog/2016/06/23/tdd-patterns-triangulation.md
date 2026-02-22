---
title: "TDD Patterns: Triangulation"
description: 'Using triangulation to drive out behavior by adding more assertions to tests, preventing naive implementations from passing.'
date: 2016-06-23
archived: true
---


Triangulation is another pattern in Kent's book. To explain it, let me provide a scenario.

Lets say you have a `Game` object, and you want to test that the `next_turn` method cycles between the two `Player` objects that are dependencies of the `Game`.

Perhaps that would look something like this.

```python
def test_next_turn():
    player1 = Player()
    player2 = Player()
    game = Game(player1, player2)

    assert player1 is game.next_turn()
```

The fastest way to get this failing test to green is with something like

```python
class Game(object):
    def __init__(self, player1, player2):
        self.player1 = player1
        self.player2 = player

    def next_turn(self):
        return self.player1
```

Awesome! Green bar!

But we can't add any more production code until we have a failing test, and I am not confident that this `next_turn` method is behaving the way I expect it to yet.

Here is where triangulation comes into play.

Our test is not communicating enough of our expectations. We need to add more information, so that we can drive out more behavior.

Let update the test so that our naive implementation of `next_turn` fails.

```python
def test_next_turn():
    player1 = Player()
    player2 = Player()
    game = Game(player1, player2)

    assert player1 is game.next_turn()
    assert player2 is game.next_turn()
```

Now it is failing, and we can add production code.

```python
from itertools import cycle

class Game(object):
    def __init__(self, player1, player2):
        self._players = cycle(player1, player2)

    def next_turn(self):
        return next(self._players)
```

This has been another pattern I have been leaning on a lot as I write my Tic Tac Toe game. I have found it is especially useful when the behavior of an object is dependent on its state.
