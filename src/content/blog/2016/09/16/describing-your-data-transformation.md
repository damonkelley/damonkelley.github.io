---
title: Describe Your Data Transformation
description: "Using Clojure's thread macro to create readable data transformations that clearly describe the flow of operations."
pubDate: 'Sep 16 2016'
date: 2016-09-16 03:46 UTC
tags: ->, ->>, thread macro, clojure, FP
archived: true
---

One of my favorite features of Clojure is the thread macro. I think there are two reasons I continue to reach for it over and over again.

1. It promotes the idea of "data transformation".
2. I find it can be extremely readable.

This post is focused on #2.

Let's look at an example. Below is a function that transforms a string into a slugified keyword.

```clojure
(defn slugify-title [title]
  (keyword
    (string-lower-case
      (string/replace
        (string/replace title #"[^\w\s]" "")
        #"\s+" "-"))))

```

I find this to be quite difficult to decipher. I have to search for the inner most function call and then work my way out while keeping the track of the context.

A more intuitive way to represent this is with using the thread macro.

```clojure
(defn slugify-title [title]
  (-> title
      (string/replace #"[^\w\s]" "")
      (string/replace #"\s+" "-")
      string/lower-case
      keyword))
```

While the function is semantically equivalent, the implication is different. The visual representation here implies a data transformation. When we reorganize our function to use the thread macro, our data transformation becomes obvious.

However, we can still do more to describe our transformation.

```clojure
(defn strip-punctuation [title]
  (string/replace title #"[^\w\s]"))

(defn delimit-words-with-dashes [title]
  (string/replace title #"\s+" "-"))

(defn slugify-title [title]
  (-> title
      strip-punctuation
      delimit-words-with-dashes
      string/lower-case
      keyword))
```

This is much more descriptive. Each function describes its own roll in the transformation, and the overall transformation become much more transparent.


My own rule of thumb is that if a function call in a thread macro is not totally obvious, then it should be wrapped in a named function.

Thread macro can make your data transformations extremely readable, especially when the extra step is taken to give the transformations a meaningful name.
