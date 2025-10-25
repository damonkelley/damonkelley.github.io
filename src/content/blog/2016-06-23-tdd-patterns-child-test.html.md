---
title: "TDD Patterns: Child Test"
description: 'Exploring the Child Test pattern from Kent Beck - knowing when to back out of a test and write supporting tests first.'
pubDate: 'Jun 23 2016'
layout: post
date: 2016-06-23 02:20 UTC
tags: tdd, patterns, child test, apprenticeship
---


As I work on completing my first iteration of my Tic Tac Toe project, there have been a few times where I have come up on some tough spots. Kent Beck's _Test Driven Development By Example_ has a couple sections on some useful patterns. The "Child Test" and "Triangulation", which I will talk about in my next post, are two of those patterns.


### What is a child test?

It is just a normal test, but the context is really important for this pattern.

Sometimes you write a test, but once you start writing the code to make it pass you find that the test was premature! You need to add a piece of functionality in a supporting class before you can get the original test to pass. So what do you do? You write a (child) test for the supporting class and make it pass.

The recipe here is to back out of the change you were trying to make, and make the supporting change(s) first. (Your TODO list is really handy here. Make sure you keep it updated.) Then, you can go back to the original test.

I tend to be reluctant to back of a change when I need to write a child test, and that is usually for one of two reasons:

1. I haven't been keeping up with a TODO list, and I am nervous I will forget to go back and write the test after I get the child tests passing!

2. I was so invested in that complicated test! I don't want have to switch contexts and throw away **all of that test code I just wrote**

The solution to the first point is easy. Keep up with a TODO list!

Regarding the second point, this is probably a warning sign that the steps you are taking are a bit too big. If you are feeling this pain likely that the complex test is a clue that something about the design isn't quite right yet.

### Handling Child Test Situations

Of course there will be plenty of times where you don't have insight about what kind of supporting behavior you will need until you actually need it. There is nothing wrong with being in a situation where a child test is necessary.

However, lately, I have noticed that when I am facing the need for a child test, often it is because I am going a little too fast. My advice (to myself) is to step back, slow down a bit, and start at it again with some smaller steps.
