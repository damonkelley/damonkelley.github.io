---
title: Closures
description: 'Explaining closures and free variables - how functions capture and retain access to variables from their enclosing scope.'
pubDate: 'Aug 10 2016'
date: 2016-08-10 14:07 UTC
tags: closures, lexical closures, free variables
archived: true
---


#### Prereqs

Before jumping into what a closures, we need to examine a supporting topic: _free variables_.

A free variable is a variable that is available to the function but is not defined locally nor is a parameter. It is probably best to lean on an example to explain this.


```python
def f(x):
    local_to_f = "local_to_f"

    def g(y):
        local_to_g = "local_to_g"
        print(local_to_g)
        print(local_to_f)
```

The function `f` has two bound variables, the parameter `x` and the local variable `local_to_f`. Similarly, `h` has the parameter `y` and the local variable `local_to_g`.

`g` also has a free variable, `local_to_f`. This is free variable because it is not defined locally (i.e. within the definition of `g`) and it is not a parameter to the function.

The name is a bit unfortunate. I imagine the term derives from the converse of a _bound variable_.


#### On to closures

A closure is a function that references free variables. That is it. The implementation of closures in a language is surely not as simple, but from the outside, this is all we really need to know.

Let's look at another example.

```clojure
(defn f [x]
  (fn [] (+ 10 x)))

(def a-closure (f 20))

(a-closure)
; => 30
```

The anonymous function created in `f` is a closure because it has a free variable `x`.

On the other hand, this would not be a closure because the function returned by `f` does not have any free variables.

```clojure
(defn f []
  (fn [x] (+ 10 x)))

(def not-a-closure (f))

(not-a-closure 20)
; => 30
```

### Conclusion

Once you understand [lexical scope](/2016/08/09/lexical-scope-dynamic-scope/), and free variables, closures become relatively simple. The term _free variables_ isn't the most intuitive name, which can cause some issues, especially when the definition of a closure relies on that confusing terminology. (This is the reason I covered it before going into to closures.)


---

#### Sources

* Free Variable. (2014, February 17). In WikiWikiWeb Retrieved August 10, 2016, from [http://c2.com/cgi/wiki?FreeVariable](http://c2.com/cgi/wiki?FreeVariable)

* Closure (computer programming). (2016, July 22). In Wikipedia, The Free Encyclopedia. Retrieved August 10, 2016, from [https://en.wikipedia.org/w/index.php?title=Closure_(computer_programming)&oldid=731035439](https://en.wikipedia.org/w/index.php?title=Closure_(computer_programming)&oldid=731035439)

* Lexical Closure. (2011, May 8). In WikiWikiWeb Retrieved August 10, 2016, from [http://c2.com/cgi/wiki?LexicalClosure](http://c2.com/cgi/wiki?LexicalClosure)
