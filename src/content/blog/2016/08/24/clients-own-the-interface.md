---
title: Clients Own the Interface
description: 'A deeper look at the Dependency Inversion Principle - understanding that clients should own the interfaces they depend on.'
pubDate: 'Aug 24 2016'
date: 2016-08-24 01:26 UTC
tags: DIP
archived: true
---

<style>
img {
  display: block;
  margin: auto;
  padding-top: 1.3em;
  padding-bottom: 1.3em;
  height: auto;
  width: 100%;
  max-width: 35em;
}
</style>


Last week, if you asked me to define the Dependency Inversion Principle, I would have given you a simple answer.

*"Depend on abstractions!<sup>1</sup>"*

However, just as Uncle Bob points out in _PPP_<sup>2</sup>, this heuristic can miss some of the finer details of DIP.

### Low-level details

When we think about our tools for creating abstractions, we often think of those abstractions as being owned by the concretions the implement/extend them. That type of ownership looks like this<sup>3</sup>.

![naive ownership](/images/2016-08-24-clients-own-the-interface/naive-ownership.svg)

This does not seem out of the ordinary. Actually, to me, it seems perfectly normal. We have the concretion and the interface at the same abstraction level.

However, observe the nature of our dependencies when we introduce the client of the `Utility Layer` into the system.

![not inverted](/images/assets/2016-08-24-clients-own-the-interface/not-inverted.svg)


This reveals a flaw in the heuristic mentioned earlier.

Yes, it is true that the layers of the system are depending on abstractions, and the buffer between the different layers is present. Our software flexible.

However, in this design, the high level is depending on the low level. This is exactly the inverse of DIP.

### High-level details

How do we invert the dependency so that the low level depends on the high level?

**We let the client own the interface**

![inverted ownership](/images/assets/2016-08-24-clients-own-the-interface/inverted-ownership.svg)

This might seem trivial. All we did is rename the interface and "move" it into the higher level.


Still, this gives any class the ability to interact with the Mechanism Layer without necessarily becoming a `Utility`. Furthermore, when we consider where changes to an interface come from, they are usually from the clients of the interface, not the implementers.

### Conclusion

_Depending on abstractions_ is a useful heuristic, and it gets us pretty far. Not to mention, this is much easier for someone new to SOLID to grapple with at first. But, it doesn't get us all of the way to DIP.

Inversion of ownership is partly responsible for the "inversion" in the Dependency Inversion Principle. It might feel natural to keep interfaces with those classes that implement them, but with DIP, we want to invert the direction of the dependencies to that low level details depend on higher level details. Inverting ownership of interfaces does that for us.

---
<sub>1. And depending on who I am speaking with, I might still respond with this simplification.</sub>

<sub>2. _Agile Software Development, Principles, Practices, and Patterns_</sub>

<sub>3. Examples are derived from Chapter 11 of  _Agile Software Development, Principles, Practices, and Patterns_</sub>
