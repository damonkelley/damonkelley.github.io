---
title: SRP & ISP - Part 2
description: 'How the Interface Segregation Principle applies SRP to dependencies - limiting coupling and improving cohesion.'
date: 2016-07-13
archived: true
---

In Part 1 we discussed the relationship between The Interface-Segregation Principle and The Single Responsibility Principle in terms of interfaces.

In this post, we will discuss how that same relationship affects dependencies.

READMORE

### ISP applies SRP to our dependencies

With segregated interfaces, we have a finer grain of control over what our clients depend on.

If we are depending on the concrete class instead an abstraction, then we are then implicitly depending on the combined interface of the class instead of the interface of the abstraction.

```java
class DimmerLight implements Toggle, Dimmer {
    public void on() { /* ... */ }
    public void off() { /* ... */ }
    public void increase() { /* ... */ }
    public void decrease() { /* ... */ }
}
```

Looking at the example above, if we depend on a concrete `DimmerLight` then we become dependent on all of the methods on the `DimmerLight` even if we only really need `Toggle`.

```java
class SomeDimmerLightClient {
    private DimmerLight light ;

    SomeDimmerLightClient(DimmerLight light) {
        this.light = light;
    }

    public void start() {
        light.on();
        // ...
        light.off();
    }
}
```

Instead, if we only require the interface that is provided through the `Toggle`, then we are only dependent on those methods. Furthermore, we are free to *change* the concrete class that is passed in, as long as it continues to implement `Toggle`.

```java
class SomeLightClient {
    private Toggle light ;

    SomelightClient(Toggle light) {
        this.light = light;
    }

    public void start() {
        light.on();
        // ...
        light.off();
    }
}
```

The idea here is that, just like our classes and modules, we want our dependencies to have a single responsibility. From the clients perspective, they do not know if they are receiving a `DimmerLight` or a `DumbLight`, and when we limit it to only accept a `Toggle`, we are free to swap out the `DimmerLight` for the `DumbLight`.

(Assume that a `DumbLight` implements the `Toggle` interface, and not the `DimmerLight` interface)

When we are free to make these sorts of changes, we have *reduced* the coupling of our system.

### Wrap up

At this point, we are a bit far from SRP. Much of what was discussed here has more to do with ISP and The Dependency Inversion Principle (DIP). However, the essence of SRP is there. By limiting the dependencies to the responsibilities that our clients require, the code is enabled to be less coupled and potentially more cohesive, which is the goal of The Single Responsibility Principle.
