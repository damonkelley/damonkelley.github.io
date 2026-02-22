---
title: Parallel Change with Multimethods
description: 'Applying the expand-contract refactoring pattern in Clojure using multimethods to safely migrate function interfaces.'
date: 2016-08-30
laytout: post
archived: true
---

Parallel Change is a refactoring pattern that is outlined [here](http://martinfowler.com/bliki/ParallelChange.html). Essentially the idea is that we can extend an existing interface to support new functionality, migrate all of the clients to use the new methods, and then kill the old methods once all of the clients are using the new methods. Another name for this pattern is *expand and contract*.

So how can we apply this to Clojure? One answer is multimethods.

There are a variety of whys that we could use mulitmethods to achieve this refactoring, but I am going to demonstrate one particular scenario where a function is operating on a collection, but we would like to modify the structure of this collection.

The function that we want to refactor is `sum`.

```clojure
(defn sum [nums]
  (apply + nums))
```

Currently it takes a list of integers, and sums them up. However, it has become apparent that this list need to be a list of strings instead of a list of integers.

```clojure
[1 2 3 4 5]
["1" "2" "3" "4" "5"]
```

We use this function in a few different places in our application, and we don't want break all of the clients if we modify `sum` to operate on a list of strings. But one thing is for sure, eventually all clients will send a list of strings instead of a list of integers.

We can use multimethods to start building an alternate version of `sum`.

### Refactoring

First we run the tests.

```console
..
2 passed 0 failed 0 error
```

These two tests are the tests we have already written for `sum`

We know that `sum` is working, let's convert it into a multi-method that has a single method defined.

```clojure
(defmulti sum
  (fn [args] (type (first args))))

(defmethod sum java.lang.Long
  [nums]
  (apply + nums))
```

The tests still pass.

```console
..
2 passed 0 failed 0 error
```

This steps allows us to verify that we have introduced the multimethod correctly and that the dispatch function is working the way we expect.

Now we can start test driving the new and improved version that operates on list of strings.

After a while we have our new method

```clojure
(defmulti sum
  (fn [args] (type (first args))))

(defmethod sum java.lang.Long
  [nums]
  (apply + nums))

(defmethod sum String
  [strings]
  (->> strings
    (map #(Integer/parseInt %))
    (apply +)
    .toString))
```

```console
.....
5 passed 0 failed 0 error
```

Awesome. The new version of our function is ready. We can migrate each client of `sum` to use the new version of while keeping our tests passing.

Eventually, none of the clients are using the old version of `sum` and we can remove it. Now we are left with only the new version.

```clojure
(defn sum [strings]
  (->> strings
    (map #(Integer/parseInt %))
    (apply +)
    .toString))
```

```console
.....
3 passed 0 failed 0 error
```

### Conclusion

This is a silly example that I cooked up. I can't think of a good reason why we would choose a list of strings over a list of numbers. However, it demonstrates how we can use multimethods to provide multiple implementations during a refactoring. We want to keep the function. The naming is accurate, and it is used in the all right places. We just want to alter what we send through it. We can use multimethods as bridge from the old implementation to the new implementation.
