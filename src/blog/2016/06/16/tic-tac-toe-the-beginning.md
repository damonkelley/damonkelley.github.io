---
title: "Tic-Tac-Toe: The Beginning"
description: 'Starting my first apprenticeship project: building an unbeatable Tic-Tac-Toe game using TDD and the minimax algorithm.'
date: 2016-06-16
status: archived
---

### A bit of background
As mentioned in the previous post, the first project as part of my apprenticeship is to implement an unbeatable game of Tic-Tac-Toe.

For the first iteration, my assignment was laid out as follows:

1. Strictly adhere to Uncle Bob's [Three Rules of TDD](http://butunclebob.com/ArticleS.UncleBob.TheThreeRulesOfTdd).
2. Use the [minimax](https://en.wikipedia.org/wiki/Minimax) algorithm to implement the unbeatable opponent.

---

Today, I started to make some headway on this project. This is after I made one or two false starts. For me, getting started is always the hardest part. (See ["First Post"](https://blog.damonkelley.me/2016/06/13/first-post/))


At first I thought it might be a good idea to start by test driving out the minimax code. Then, I would have what I thought to be the most difficult bit of code out of the way. Perhaps, I could write the rest of the game around that bit.

This approach did not yield results for me, though I am sure a programmer more seasoned with OO principles and TDD would have no problem tackling the problem from this angle.

Colin, one of my two mentors, had some great advice -- Instead of starting at a low level and building up the application, start at the application level and ease into the details.

Thus instead of starting with an minimax implementation, and building a Tic-Tac-Toe game around it, I should start with a Tic-Tac-Toe game work my way down to the minimax implementation.


Kent Beck outlined this approach when he described the "Starter Test" pattern in _Test-Driven-Development By Example_. His example is a socket-based server.

```console
StartServer
Socket= new Socket
Message= "hello"
Socket.write(message)
AssertEquals(message, socket.read)
```

When I adapted this for Tic-Tac-Toe, it looked somewhat similar

```java
StringBuffer output = new StringBuffer();

Game game = new Game("\0\n", output);
game.play();

String expected = " X |   |   \n---+---+---\n   |   |   \n---+---+---\n   |   |   \n";
assertEquals(expected, output.toString());
```

This test outlines a very naive `Game` class but it turned out to be a great starting point. Many of the details of the test are not important, but the general idea is that the game needs to take in some input, and return some output.

After a few application-level tests like the one above, I had some quick-and-dirty Tic-Tac-Toe functionality. With that functionality in place, I was able to start thinking at a lower level of abstraction, and start building out the game components and refactoring what I already had in place.
