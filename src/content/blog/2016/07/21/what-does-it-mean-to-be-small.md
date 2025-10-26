---
title: What does it mean to be small?
description: 'Exploring the relationship between the Single Responsibility Principle and small classes - they may actually be the same thing.'
pubDate: 'Jul 21 2016'
date: 2016-07-21 17:01 UTC
tags: SRP, small classes
archived: true
---


What is the relationship between the Single Responsibility Principle and small(er) classes?

First, what makes a class small?

* The number of methods?
* The size of the interface (i.e. number of public methods)?
* The lines of code?
* The number of responsibilities?

It is hard to quantify what makes a class small. I would argue that the size of a class correlates to the number of responsibilities it has. As it happens, when the number of responsibilities decrease, the size of the interface tends to decrease, which means the number of methods decrease, which means the lines of code decrease.

This is not to say that aiming for a small interface will get you a class with a single responsibility. A class could have a small interface, but not a cohesive interface. For example, what if a class had two methods, `saveToDatabase()` and `printToScreen()`. Small interface, but multiple responsibilities.

The problem with using the number of responsibilities to determine the size of class is that responsibilities are not usually something we can see from a quick glance at the code. We have to dig into the innards of the class to find that information. Furthermore, identifying responsibilities is not always the easiest task, even when a class only has a few methods.

Perhaps, in light of this, we can use factors like lines of code and number of methods to quickly quantify the size of class, knowing that a better test of size is in the number of responsibilities.

For awhile, I thought that small classes were a side effect of adhering to SRP. I thought this was something that we got for free when we followed it. I am not sure that is really the case. Rather, I think that SRP and small classes are actually the same thing. Of course, this is only true if we are quantifying the size of our classes based on the number of responsibilities.

---

I have written quite a bit about SRP in the past month. It has been insightful. Interestingly, it has also led to me to gain a better understanding of some of the other SOLID principles, specifically the Interface-Segregation Principle, and the Dependency Inversion Principle. It has also highlighted some of the not-so-apparent relationships that are present between the principles, and how they push and pull on each other.

This will likely be the last SRP post for awhile, but I am hoping to cover some of the principles that I have given less attention to -- the Open/Closed Principle and the Liskov Substitution Principle.
