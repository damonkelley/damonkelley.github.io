---
title: "SRP & ISP - Part 1"
description: 'Exploring how the Interface Segregation Principle applies SRP to interfaces - making them smaller and more cohesive.'
pubDate: 'Jul 12 2016'
date: 2016-07-12 05:01 UTC
tags: SRP, ISP, SOLID
archived: true
---

The Interface-Segregation Principle states that _clients should not be forced to depend on methods that they do not use_.


This principle is related to the Single Responsibility Principle in a couple of ways.

1. ISP applies SRP to our interfaces.
2. ISP applies SRP to our dependencies.

Part 1 will look at #1.

### ISP applies SRP to our interfaces


This is an easy conclusion to arrive at. SRP says classes should only have one reason to change. A side effect of this prescription is that the interface to our classes get smaller and more cohesive. Thus, in a way, a by-product of abiding  SRP is ISP.

Let's take a look at a `Light` for an example.

```java
interface Light {
    void on();
    void off();
    void decrease();
    void increase();
}
```

Not all clients of the `Light` will need to use the dimmer methods `increase` and `decrease`. This is a potential violation of ISP, but considering a class that would provide an implementation for this interface, this would also be violation of SRP.

Let's summarize the responsibilities of a `Light`.

_Toggle the light off or on, and increase or decrease the intensity of the light_

The *and* in the summary is our clue to the SRP violation. Our cohesion is suffering because the interface is too "fat".

Listing the distinct responsibilities gives us insight into how we can segregate the interface. We have a toggling feature, and a dimming feature.

We have used SRP to identify that there is an issue with our interface, and to locate the distinct responsibilities. Now let's split this interface.

```java
interface Toggle {
    void on();
    void off();
}

interface Dimmer {
    void decrease();
    void increase();
}
```

So how does multiple inheritance and implementing multiple interfaces fit in to the picture? One would think that these approaches would violate both The Single Responsibility Principle and The Interface-Segregation Principle.

It is hard to see how that could possibly fit into a design that is online with SRP and ISP, but it turns out is fits in nicely in the context of all 5 of the SOLID principles, notably The Dependency Inversion Principle.

This posts loosely covered the relationship ISP has with SRP, and how we can use our techniques for identifying SRP violations to get ISP. The `Dimmer` and `Toggle` interfaces are an example of the relationship.

The Interface-Segregation Principle is not just about making the interfaces cohesive though, it is also about dependencies. Interestingly, SRP applies there too, and we will look at that in part 2.
