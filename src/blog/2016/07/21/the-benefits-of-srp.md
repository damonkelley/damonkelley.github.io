---
title: Benefits of The Single Responsibility Principle
description: 'Three key benefits of the Single Responsibility Principle - reduced coupling, increased testability, and reduced mental energy.'
date: 2016-07-21
status: archived
---

Lately, I have written quite a few posts about The Single Responsibility Principle, but I have yet to discuss the its benefits.

I have come with three benefits of adhering SRP.

1. Reduced coupling
3. Increase testability
4. Reduced mental energy

### Reduced coupling

The main goal of the of the SRP is reduce coupling.

Classes that have more than one reason to change, or have more than one responsibility, are guarded from the effects of unrelated change.

```java
class BowlingGame {
    public String presentScoreCard() {
        // ...
    }

    public int score() {
        // ...
    }
}
```

The `BowlingGame` above blatantly demonstrates an SRP violation. The class is responsible for scoring the game, and for presenting the score card. When these responsibilities are coupled, likelihood that change in one responsibility will affect the other responsibility is increased. If the scoring of the game changes, we don't want that to affect the way score card is presented.

### Testability

Classes with a single responsibility can be easier test. For this, it is easiest to look at an example.

Back to the `BowlingGame`, but we will modify it a little bit.

```java
class BowlingGame {
    public void roll(int pins) {
        // ...
    }
    public void score() {
        // ...
    }
    private int scoreStrike(int frame) {
        // ...
    }
    private int scoreSpare(int frame) {
        // ...
    }
    private int scoreFrame(int frame) {
        // ...
    }
}
```

There are 3 three private methods that are used by the `score` method. It would be nice if we could test these directly.

By auditing the responsibilities of this class, and extracting out the additional responsibility, we can make it possible to test those scoring methods.

```java
class BowlingGame {
    public void roll(int pins) {
        // ...
    }
    public void score() {
        // now uses FrameScorer
    }
}

class FrameScorer {
    public int scoreStrike(int frame, BowlingGame game) {
        // ...
    }
    public int scoreSpare(int frame, BowlingGame game) {
        // ...
    }
    public int scoreFrame(int frame, BowlingGame game) {
        // ...
    }
}
```

We extracted the responsibility of scoring a single frame from the `BowlingGame`, and consequently, we can test the `FrameScorer` methods directly, instead of testing them through the public API of `BowlingGame`

### Reduced mental energy

Classes with a single responsibility are easier to reason arout. If a class does A and B, it can be difficult to think about it in the context of the system. Contrastingly, if a class only does A, and another class only does B, we don't need to concern ourselves with B, if all we need to think about is A.

Often this becomes more apparent when the multiple responsibilities of a class are at differing abstraction levels.

As an example, pretend that we are trying to add validation our user input. Currently, we are getting user input from the prompting capabilities of the `ConsoleUI`.

```java
class ConsoleUI {
    public void update() { /* ... */ }
    public String prompt(String message) { /* ... */ }
    public String read() { /* ... */ }
    public void write() { /* ... */ }
}
```

This class is responsible for

* Reading from the screen
* Writing to the screen
* Updating the UI
* Prompting the user for input

That is a lot of responsibility, and some of those responsibilities are used by other responsibilities! Quite a lot to keep in our heads, and we haven't introduced any other relationships yet.

Instead, what if we broke this into four class, one for each responsibility?

1. `ConsoleUI`
2. `ConsoleReader`
3. `ConsoleWriter`
4. `ConsolePrompter`

Now we only have to consider the `ConsolePrompter` when we are thinking about how to validate user input. The `ConsolePrompter` will undoubtedly use the `ConsoleReader` and the `ConsoleWriter` but those are lower level details, and we don't need to concern ourselves with thinking about those details for the moment.


### Conclusion

Of the three of these effects, I believe that reducing coupling and reducing mental energy are going to the prevalent. Personally, I think those two are probably worth the most.

Don't get me wrong, increasing testability is great, but that benefit is not always present when we extract a class because of an SRP violation.

This isn't a complete list of benefits of SRP. Rather, they are just three of the benefits I know of.
