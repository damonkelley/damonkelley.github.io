---
title: The Three Rules and red/green/refactor
description: "Understanding the difference between Uncle Bob's Three Rules of TDD and the red/green/refactor cycle - they're not the same thing."
pubDate: 'Jul 01 2016'
date: 2016-07-01 04:11 UTC
tags: tdd, apprenticeship
archived: true
---

On my first day of my apprenticeship, one of my mentors asked me if I knew the Three Rules of TDD. I confidently responded, "red, green, refactor".

Not quite.

While my answer was correct in that those three words represent *a* set of three rules among TDDers, but these are not *the* [Three Rules of TDD](http://butunclebob.com/ArticleS.UncleBob.TheThreeRulesOfTdd).


(Along with _red/green/refactor_, there is also the three strategies for TDD. Kent Beck introduces both of these in his book, _Test Driven Development By Example_.)


Here are the Three Rules:

1. You are not allowed to write any production code unless it is to make a failing unit test pass.

2. You are not allowed to write any more of a unit test than is sufficient to fail; and compilation failures are failures.

3. You are not allowed to write any more production code than is sufficient to pass the one failing unit test.


## What is the difference?

### Obvious Implementation

_red/green/refactor_ are the broad strokes. When simply following _red/green/refactor_, you are not limited in how you make the failing test pass. You could fake it, use triangulation, or implement the obvious solution.

From my own reflection on the Three Rules of TDD, the idea is to confine you to much smaller steps. This means faking the implementation or using triangulation to drive out the behaviour.

When abiding by the Three Rules, there is less room for the obvious implementation. Why is that? I don't have the answer, but If I had to guess, it would be that with the obvious implementation, it is much easier to take steps that are too large.

This can be problematic when things start to get tough. Instead of backing out, doing some refactoring, and trying again from another angle, it might be tempting to take the easy way out and call it the "obvious implementation". This would lead to loss of confidence in your tests.

### Refactoring

Another difference is that there is not refactoring step. I struggled with this one for a little bit. If you take the rules literally then your refactoring needs to be driven out by tests. That seems really difficult to me. The way I have come to interpret this is that what rule 3 is really saying is "you are not allowed to write any more production *behaviour* than is sufficient ..."


## Conclusion

Please don't take this as a prescription to leave _red/green/refactor_ aside, and only use the Three Rules. I just wanted to put some observations on some subtle differences into writing.

I have been attempting to strictly follow the Three Rules for a few weeks now. Doing this has also made me more aware of the transformations outlined in the [Transformation Priority Premis](https://blog.8thlight.com/uncle-bob/2013/05/27/TheTransformationPriorityPremise.html), but I will write about those in another blog post.
