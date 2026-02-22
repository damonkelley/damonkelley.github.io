---
title: "How Not to Kata: Part 2"
description: 'Understanding the distinction between rehearsing and practicing katas, and the benefits of preparing for a kata performance.'
date: 2016-06-20
status: archived
---

In my most [recent post](https://blog.damonkelley.me/2016/06/17/how-not-to-kata/), I discussed some of the revelations I had about doing katas, but I failed to communicate the effectiveness of **performing** a kata.


**tldr;** Rehearsing is different from practicing and yields a different set of outcomes.

---

So what is the benefit of performing a kata? (For the best answer, stop reading my measly article and continue [here](http://blog.8thlight.com/micah-martin/2013/05/28/performing-code-katas.html))

Here is what I think. The answer lies in the distinction between rehearsing and practicing. When you practice, you can try new things and experiment. It is OK if you go down a rabbit hole and never manage to make it out. The stakes are low because it is just you.

Rehearsing is a bit different, because the goal is different. The point of rehearsing is to prepare for a public performance. Here the stakes are probably much higher, but it depends on the person.

If you are performing a kata, then you want it to rehearsed. Ideally, you  have  every step planned out ahead of time. You may disagree, but even a well executed kata may not be the most engaging piece of entertainment, so you can imagine how dull it would be to watch someone struggle through an off-by-one error during a kata performance.

A lot can be gained from preparing a kata in this way. Maybe there is a language feature that you are not very familiar with, but it fits nicely into the kata. Or perhaps there is some editor function that is very useful at a certain moment in the kata. By preparing a kata, you can internalize that editor function or language feature, and turn it into a part of your vocabulary.

### Preparing prime factors

#### JUnit Parameterized Tests

This is exactly what happened for me. While I was preparing the prime factors kata, I noticed that my tests were starting to look very duplicative. Something along the lines of

```java
@Test
public twoIsItsOwnFactor() {
    assertEquals(Arrays.asList(2), PrimeFactors.of(2));
}

@Test
public threeIsItsOwnFactor() {
    assertEquals(Arrays.asList(3), PrimeFactors.of(3));
}

@Test
public fourFactorsToTwoAndTwo() {
    assertEquals(Arrays.asList(2, 2), PrimeFactors.of(4));
}kj
```

Each test was basically the same, but I am sending in different input, and expecting a different output. That also means I have to think of a good name for each input and output pair.

The [parameterization feature of JUnit](https://github.com/junit-team/junit4/wiki/Parameterized-tests) is excellent at handling this sort of testing, but there is quite a bit of boilerplate that is involved to get it set up . I don't tend to reach for parameterization extremely often, so I usually have to consult the documentation the first dozen times.

Fortunately, because I rehearsed the kata repeatedly, I was able to internalize most of the setup, so the next time I need it, I am already be fairly familiar with how to set it up, so it might save me a trip to the JUnit docs.

#### Vim Regex

At one point in the kata, I needed to convert all of the integer literals inside of the test class to long literals<sup>1</sup>. I knew that the Vim search & replace mechanism would work great here, but I have always had trouble remembering the regex flavor specific to Vim.

<sup>1.</sup><sub>Since I was TDDing the kata, I did not introduce longs until I had reached a point in my testing when they were necessary.</sub>

The command I used was

```
:%s/\d\+/\0L/g
```

It looks like gibberish at first glance, but it is fairly simple. Find all words that are composed of only digits and append an `L` to them. The `\0` in the replacement pattern (after the second `/`) drops in the matching text from the search pattern (between the first and second `/`).

So what I ended up picking up was the `\0` special character in the substitution command. Another tool for the tool belt!

### Conclusion


I picked up these new tools because I repeatedly practiced the same set of steps, until my approach to the kata was reproducible at a level that would not bore my audience. (At least I hope they didn't get bored!)

Rehearsing is different from practicing, and the outcome is not the same. Even if you do not actually perform in public for anyone, I think it is a worthy challenge to spend time rehearsing katas, in addition to practicing them.
