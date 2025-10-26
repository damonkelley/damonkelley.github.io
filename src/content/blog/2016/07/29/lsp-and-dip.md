---
title: Briefly Exploring the Similarities Between LSP and DIP
description: 'Exploring the relationship between the Liskov Substitution Principle and Dependency Inversion Principle - both encourage flexibility in dependencies.'
pubDate: 'Jul 29 2016'
date: 2016-07-29 04:54 UTC
tags: SOLID, LSP, DIP
archived: true
---

What is the relationship between the Dependency Inversion Principle and the Liskov Substitution Principle?

One common thread is dependencies.

Obviously, DIP is about dependencies. It is in the name. The idea is to depend on abstractions instead of concretions. This allows us to _substitute_ any implementation of that abstraction for another. (There are hints of LSP in there.)

But how is LSP about dependencies?

When we adhere to the Liskov Substitution Principle, we set ourselves up to depend on our base class -- the abstraction, instead of a subclass -- the concretion. (This sounds a lot like DIP.)

Both of these principles encourage flexibility when it comes to the modules that we depend on.
