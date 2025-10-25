---
title: Learning Testing Tools First
description: 'Why learning testing tools before diving into a new language or framework can accelerate learning and improve TDD practice.'
pubDate: 'Oct 07 2016'
layout: post
date: 2016-10-07 14:15 UTC
tags: programming languages, testing, learning, learning tests
---

Learning a new language or framework can be tough. It can be especially tough when you practice TDD. You need to write tests for code you don't know how to write using testing tools that you don't know how to use yet!

Naturally, this suggests that perhaps the first thing we should do when we encounter a new language or framework is to spend some quality time getting familiar with the testing tools.

Once we have some grasp on the testing tools, this facilitates the ability to experiment and learn about the language or framework via learning tests<sup>1</sup>.

For me, I find that I learn quicker by doing this sort of experimentation versus simply reading documentation.

I was recently pairing on the beginnings of a frontend web project. I had never used the JavaScript framework chosen for the project before, and my pair was relatively new to it as well. As we were building out the beginnings of this project, it felt like testing was the bottleneck. We would spend just enough time to get a test written, which would often mean digging through the documentation, looking for the API we needed. It was taking us anywhere from 5 minutes to 15 minutes to flesh out a test.

My theory is that by spending some time focused on learning the testing tools first is that load required to start TDDing some production code can be reduced. This should shorten the time to getting a failing test that can be made green, and reduce the likelihood of writing the wrong test or an utterly incorrect test.

This is an approach that I would like to test out. I am planning to employ this technique the next I am faced with a new language or framework.

---

<sub>1. Learning Test is a pattern described in _Test Driven Development: By Example_
