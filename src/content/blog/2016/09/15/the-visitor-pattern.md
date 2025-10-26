---
title: The Visitor Pattern
description: 'The Visitor pattern - extending object structure behavior without modifying classes through double dispatch.'
pubDate: 'Sep 15 2016'
date: 2016-09-15 03:18 UTC
tags: patterns, visitor
archived: true
---

The Visitor is a pattern designed to to extend an object structure's behavior with out opening the classes for modification.

In this pattern there are two objects that interact with each other.

* The object within a hierarchy that accepts a visitor -- This is the object which will be extended through visitation.
* The object that is visiting. -- This is the object that will extend the behavior.

As an example, lets look at a hierarchy of bird objects.

```java
interface Bird {
    void fly();
}

class BlueJay implements Bird {
    public void fly() {
        //
    }
}

class Cardinal implements Bird {
    public void fly() {
        //
    }

}

class Pigeon implements Bird {
    public void fly() {
        //
    }

}
```

We want to print these birds to the console, but we want to print each one differently. We could simply create a presenter for each bird.


```java
class BlueJayPresenter {
    public BlueJayPresenter(BlueJay bird) { /* ... */ }

    public present () { /* ... */ }
}

class CardinalPresenter {
    public CardinalPresenter(Cardinal bird) { /* ... */ }

    public present () { /* ... */ }
}

// ...
```

However, we may not know what kind of bird we have when it comes time to print inside of our application. We would prefer not to switch on the type of the bird.


The Visitor pattern offers a solution to our situation. With the Visitor pattern, we can create a single presenter that knows how to present each type of bird.

```java
interface BirdVisitor {
    void visit(Bird bird);
}

class BirdPresenter implements BirdVisitor {
    public void visit(BlueJay blueJay) {
        return String.format("A %s is blue", blueJay);
    }

    public void visit(Cardinal cardinal) {
        return String.format("A %s is red", cardinal);
    }

    public void visit(Pigeon pigeon) {
        return String.format("A %s is gray", pigeon);
    }
}
```

This will also require a modification to our bird structure.

```java
abstract class Bird {
    abstract void fly();

    public void accept(BirdVisitor visitor) {
        v.visit(this);
    }
}

class BlueJay extends Bird {
    // ..
}

class Cardinal extends Bird {
    // ..
}

class Pigeon extends Bird {
    // ..
}
```

Basically, what the Visitor pattern does is double dispatch. We want to present some bird that we don't know the type of. We pass the anonymous bird an instance of `BirdPresenter` via the `accept` method. This is the first dispatch. The second dispatch occurs when the bird, passes itself to the presenter's `visit` method.

This second dispatch is where the type of the bird comes into play. In Java, we overload the `visit` method, and provide an implementation for each type of bird. The language will use the type of the bird to determine which version of the method to run.

Here is how we might wire this up.

```java
class Main {
    public static void main(String[] args) {
        List<Bird> birds = BirdFactory.generateManyBirds();

        birds.forEach(bird -> {
            String output = bird.accept(new BirdPresenter()));
            System.out.println(output);
        }
    }
}
```

```console
A Blue Jay is blue
A Pigeon is gray
A Blue Jay is blue
A Pigeon is gray
A Cardinal is red
A Blue Jay is blue
A Pigeon is gray
A Cardinal is red
A Pigeon is gray
A Blue Jay is blue
A Cardinal is red
A Cardinal is red
```

This pattern is great for adhering to the Single Responsibility Principle. The `Bird`s do not need to be burdened with the responsibility of how they should be presented. The Visitor pattern allows us to psuedo-extend our objects to add new behavior while not adding additional responsibilities.

However, the drawback to this pattern can violate the Open/Closed Principle. Every time a new `Bird` is added to the system, we will need to open up modify our visitors and add another implementation of `visit`.
