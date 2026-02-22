---
title: "Liskov Substitution Principle: An Overview"
description: 'Introduction to the Liskov Substitution Principle - subtypes must be substitutable for their base types to maintain expected behavior.'
date: 2016-07-27
status: archived
---

The Liskov Substitution Principle (LSP) is the `L` in the 5 SOLID Object Oriented Design principles.

READMORE

Paraphrased, LSP says,

> Subtypes must be substitutable for their base types

This principle is all about maintaining behavior.


### Example

To illustrate, let's pretend we have a `Bird` class, and `Pigeon` class which subclasses the `Bird` class. We will design the `Pigeon` class so that it violates LSP.

All Birds have a generic implementation of `chirp`, and each subclass is able to override the `chirp` method in order to provide their own onomatopoeia. I do not know a generic verb to describe a bird making a sound, so we will use _chirp_, knowing that some birds might _caw_, _coo_, _quack_, or _hoot_ instead.

```java
class Bird {
    public void fly() { /* ... */}

    public void chirp() {
        System.out.println("Chirp!!!");
    }
}
```

The author of the `Pigeon` class decided that a `Pigeon` does not _chirp_ so he/she overrode the `chirp` method to do nothing and added a new `squawk` method.

```java
class Pigeon extends Bird {
    public void chirp() {
        // Isn't it ridiculous to think that a pigeon chirps?!!??
    }

    public void squawk() {
        System.out.println("Squawk!!!");
    }
}
```

The `BirdCall` class uses birds to determine what kind of bird it should emulate.

```java
class BirdCall {
    public void call(Bird bird) {
        bird.chirp();
    }
}
```

The `BirdCall` depends on `Bird`, and it expects that by calling the `chirp` method, it will get the bird sound. However, if we passed a `Pigeon` object to `call` we would not get the behavior we expected.

LSP helps us to prevent this scenario from occurring. If we can expect the same behavior from a subclass as we do from the base class, then we can avoid code that needs to act based on the type of the object it received.

An example of such code is below.

```java
class BirdCall {
    public void call(Bird bird) {
        if (bird instanceof Pigeon) {
            bird.squawk();
        } else {
            bird.chirp();
        }
    }
}
```

This supports another SOLID principle -- the Open/Closed Principle (OCP). When we violated LSP we also violated OCP. We shouldn't need to modify the `call` method when a new `Bird` is added. When all birds exhibit the same behavior, we are setup of to leave our code open to extension, and closed to modification.
