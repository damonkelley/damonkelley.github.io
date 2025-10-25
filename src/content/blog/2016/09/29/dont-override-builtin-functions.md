---
title: Don't override built-ins
description: 'Learning why overriding built-in function names can cause confusion and how to make better naming decisions.'
pubDate: 'Sep 29 2016'
layout: post
date: 2016-09-29 04:33 UTC
tags: naming, programming
---

Recently, I was working on a Clojure project, and I came across a naming decision. The name I wanted, `resolve`, was taken by `clojure.core/resolve`.

On the one hand, someone might encounter this function in the code and expect the `clojure.core/resolve`. One the other hand, I didn't want to have to sacrifice the right name just because of the language. Additionally, I named the function with the expectation that it would be called through it's namespace, `file/resolve`, which differentiates it from `clojure.core/resolve`, except for inside the `file` namespace, or if a client chose to refer the function into another namespace.

I chose to use the name.

A few weeks later, I found myself on the other end of that same decision someone else made. I was reading through a namespace, and perplexed by a particular call to `update`. After spinning my wheels for a bit, I finally realized that `update` was refering to a locally defined function, not `clojure.core/update`.

Two things contributed to my confusion.

1. I use `clojure.core/update` fairly often, thus I have expectations about its behavior.

2. My editor colorscheme highlights core functions differently than other functions. So a local version of `update` is colored the same way as `clojure.core/update`. Naturally, I have become dependent on the way my editor highlights the code.

### Takeaways

Now that I have been bitten by this, I expect I will be less likely to use a name already used in `clojure.core`, or a built-in in any language. Perhaps the prevalence of the function will play into the decision. I use `clojure.core/update` all the time. I have expectations about behavior when I encounter that function. I use `clojure.core/resolve` much less frequently. In fact, I have never used it!
