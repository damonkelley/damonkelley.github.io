---
title: Homoiconicity
description: 'Exploring homoiconicity in programming languages - when code structure matches its internal representation, enabling "code as data".'
pubDate: 'Aug 16 2016'
layout: post
date: 2016-08-16 03:49 UTC
tags: homoiconicity
---

Homoiconic literally means _same representation_. In regards to programming languages, a language is homoiconic if the syntax matches the abstract syntax tree. More plainly, the external representation matches the internal representation. Often, this gets boiled down to "code as data" or "data as code". I think this simplification is fine once the we have a grasp of homoiconicity, but before we get to that point, I find the simplification can be opaque.


To help us understand what it means for a language to be homoiconic, let's look at an example of a heteroiconic language. We will use Python.


### Heteroiconicity

Take this simple expression

```console
>>> 2 * 2
4
```

How does the Python interpreter know how to evaluate this sequence of characters?

The interpreter *parses* this code and creates an abstract syntax tree (AST) to represent it.

CPython creates the AST using C, but Python ships with an `ast` library<sup>1</sup>. We can use that library to demonstrate the difference between the external representation, or the version we typed into the REPL, and the AST, the representation the interpreter uses to evaluate the expression.

```console
>>> 2 * 2
4
>>> ast.dump(ast.parse('2 * 2'))
'Module(body=[Expr(value=BinOp(left=Num(n=2), op=Mult(), right=Num(n=2)))])'
```

The important part here is the `Expr(value=BinOp(left=Num(n=2), op=Mult(), righ=Num(n=2)))`. This is the AST of our expression `2 * 2`.

Let's break it down a little.

```python
Expr(                   # The expression
    value=BinOp(        # The object that knows how to evaluate a binary operation
        op=Mult(),      # The operator (or function)
        left=Num(n=2),  # The first operand
        right=Num(n=2)  # The second operand
    )
)
```

The takeaway here is that in order for the Python interpreter to evaluate `2 * 2` it has to take code we gave it, and transform it into a different representation (the AST) so that it can do the evaluation. Python is heteroiconic because it has more than one representation.

### Homoiconicity

On the flip side, a language that is homoiconic only has one representation. The canonical homoiconic language is Lisp.

Going back to the expression above, this is what it would look like in Lisp

```clojure
(* 2 2)
```

Now lets look at the Abstract Syntax Tree of this expression

```clojure
(* 2 2)
```

They are the same.

The implication here is when you write code in a homoiconic language, you are writing exactly what will be evaluated.

This property of a language gives rise to the idea of first-class code. Just like we have first-class functions in some languages, where we can pass functions into function into functions, in a homoiconic language, we can pass code into code into code.

This is where the "code as data; data as code" comes into play. We can operate on our code with code. This is exactly what a macro does<sup>2</sup>, and it is one of the most prominent features of homoiconic languages.

---
#### Additional Reading

* [HomoiconicLanguages - C2 Wiki](http://c2.com/cgi/wiki?HomoiconicLanguages)

---
1. CPython does not actually use the `ast` module to evaluate code, It uses the code [here](https://github.com/python/cpython/tree/master/Parser). The `ast` library has many applications, one of which is to provide the same type of code manipulation that homoiconic languages facilitate.

2. Macros are a topic of a future blog post.
