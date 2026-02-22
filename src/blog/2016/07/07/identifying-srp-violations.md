---
title: "The Single Responsibility Principle: Identifying Violators"
description: 'Techniques for identifying Single Responsibility Principle violations - summaries, method prefixes, and abstraction levels.'
date: 2016-07-07
archived: true
---

Realizing that a class is violating The Single Responsibility Principle tends to be much more difficult that resolving the violations.

Here are a few techniques that you can use to help.

READMORE

### 1. Simple summaries

Use a single sentence to summarize the responsibility of your class. If your summary contains a conjunction like "and" or "or", then it is likely the class is violating SRP.


### 2. Use the comments/documentation

This is the same as #1, but apply it to the summaries in the documentation or comments.


### 3. List reasons that may cause change

For an example, see my previous post where I made a list of reasons that the `BoardGame` implementation could change. These reasons do not need to be 100% realistic either.

Imagine you have implemented a game of Tic-tac-toe in your favorite language. Let's say you have built a `Game` abstraction, a `Board` abstraction, and a `Player` abstraction. The rules are exercised within the `Game`. Everything is working working great, and you don't know of any bugs in your implementation.

Now, what would need to change about your `Game` if the rules of Tic-tac-toe suddenly changed, and it was now played with 3 players instead of 2?

What needs to change? What would be unaffected?

If there is a group of methods that need to change, or do not need to change, it may indicate that the class has an additional responsibility.


### 4. Look for method prefixes

Another indication that you might be violating SRP is if you find multiple methods that have a common prefix.

Take this `CardGame` example.

```java
interface CardGame {
    int scoreHighestCard();
    int scoreLowestCard();
    Hand deal();
    void shuffle();
}
```

Two of the methods have a prefix of `score`. Classes with with a single responsibility, with high cohesion, do not tend to require a common prefix to communicate behaviour.

This is our clue that our class may have multiple responsibilities, or more optimistically, a clue that a new class is ready to be born!

What we can do here is break off the "score" methods on to a new `Scorer` class.

```java
interface Scorer {
    int getHighest();
    int getLowest();
}
```

And we might also rename the original now that its role in the system is much more clear.

```java
interface Dealer {
    Hand deal();
    void shuffle();
}
```



### 5. Audit the abstraction level of your methods

A class with a single responsibility should have all methods at the same level of abstraction.

Here is another example of an SRP violation.

```java
interface UI {
    String read();
    void write(String);
    void update()
    String prompt(String);
    void message(String);
}
```

The `read` and `write` methods are reading and writing raw text to and from the screen, where the other three methods are responsible for interacting with the user.

Reading and writing is a lower level of abstraction. These are operations that the `UI` class will use to implement its other methods, but reading and writing don't match the abstraction level of the surrounding methods.

This mismatch in abstraction level could indicate an SRP violation.


### Wrap up

These are some techniques that I have used to audit the responsibilities of a class. None of these are absolute. Having a group of methods with a common prefix is not going to illuminate an additional responsibility 100% of the time, but hopefully these techniques are more helpful than not the majority of the time.
