---
title: Referential Transparency
description: 'Understanding referential transparency - when expressions can be replaced with their evaluated values without changing program behavior.'
date: 2016-08-12
status: archived
---

Referential transparency is a property of an expression, where an expression can be replaced with the value it evaluates to. (**Related**: _Pure functions_)

It can be expressed with the following equation.

```
f(x) = f(x)
```

Thus, if we have the expression `(* 10 10)`, it can be replaced with the value it evaluates to without changing any behaviour of the system.

If we put this expression into the equation, we see that the equation is satisfied.

```clojure
(= (* 10 10) (* 10 10))
;=> (= 100 100)
;=> true
```

Looking at another example, this implementation of `fib` is referentially transparent.

```clojure
(defn fib [n]
  (if (< n 2)
    n
    (+ (fib (- n 1)) (fib (- n 2)))))
```

Regardless of how many times we call `(fib 8)`, we always get `21`.

```clojure
(= (fib 8) (fib 8))
; => (= 21 21)
; => true
```

The implication here, however, is that a for an expression to be referentially transparent, it must be void of side effects or temporal coupling.


### Referential Opacity<sup>1</sup>

Let's look at some examples of functions that are not referentially transparent.

#### Side effects

First up, `count-up`.

```clojure
(def counter (atom 0))

(defn count-up []
   (swap! counter inc))
```

`count-up` is not referentially transparent because the value it evaluates to changes every time the function is called. The reason that it does not always evaluate to the same value is because it is affecting `counter` and returning `counter`'s current state.

```clojure
(= (count-up) (count-up))
; => (= 1 2)
; => false
```

#### Temporal Coupling
This next example demonstrates how temporal coupling violates referential transparency.

```clojure
(defn true-later []
  (if (< (date 2086 8 11) (now))
    true
    false))
```

If we evaluated this function now, and then waited 70 years to evaluate it again, would we get the same result? No, we would not.

```clojure
(= (evaluated-now true-later) (evaluated-in-70-years true-later))
;=> (= true false)
;=> false
```

#### Hidden side effects

Finally, we have an example that is a bit more opaque.

```clojure
(defn add [a b]
  (println "Adding " a " and " b)
  (+ a b))
```

It is true that the value that this function will always evaluate to the same value given the same set of inputs.

```clojure
(= (add 1 1) (add 1 1))
"Adding 1 and 1"
; => (= 2 2)
; => true
```

_Oh so this must be referentially transparent!_ Not quite.

If we replaced this function with the value it evaluates to, we would no longer be printing the message. Thus, we would be missing behaviour from the original implementation.


### Wrap up

This is just an explanation of *what* referential transparency is, but not *how* it can be useful. It is often claimed that referentially transparent programs are easier to reason about<sup>[HW]</sup>, but I am not qualified to talk about that yet.

Referential transparency is enforced by some functional programming languages<sup>[C2]</sup>. However, you don't need a language that enforces referential transparency in order to write referentially transparent code.


---

#### Additional Reading

* [What is referential transparency](http://stackoverflow.com/a/9859966)

---

#### Sources

**HW** Referential transparency. (2009, March 29). In HaskelWiki. Retrieved August 12, 2016, from [https://wiki.haskell.org/Referential_transparency](https://wiki.haskell.org/Referential_transparency)

**C2**. Referential Transparency. (2010, July 10). In WikiWikiWeb. Retrieved August 12, 2016, from [http://c2.com/cgi/wiki?ReferentialTransparency](http://c2.com/cgi/wiki?ReferentialTransparency)

---
#### Footnotes
1. No one seems to use this term to refer to expression that are not referential transparent. A quick Google search only yielded results relating to social sciences.
