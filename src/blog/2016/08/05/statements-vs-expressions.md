---
title: Statements & Expressions
description: 'Clarifying the difference between statements and expressions in programming languages - actions versus values.'
date: 2016-08-05
archived: true
---

Ever been confused about the difference between and expression and a statement? Maybe you used them interchangeably?

I have.

It wasn't until I had been programming for a few years that I began to grasped the difference. My delay was largely due the set of languages I started out with, Python and PHP, both of which are imperative.

First, let's define statement and expression

_statement_

> the smallest standalone element of an imperative programming language that expresses some action to be carried out<sup>1</sup>.

In Java, Python, PHP, and other imperative languages, these are some common statements:

* return statement
* if statement
* assignment statement
* for-loop
* while-loop
* do-while


_expression_

> a combination of one or more explicit values, constants, variables, operators, and functions that the programming language interprets [...] and computes to produce [...] another value<sup>2</sup>. 

This can be paraphrased as _anything that can be evaluated to a single value_

### Making the distinction

I like to use this "rule" to help me identify if something is an expression or a statement.

>An expression is anything that can be assigned to a variable, and conversely, a statement is anything that cannot be assigned to a variable.


Let's look at an some examples of expressions, and statements.

### Expressions

I like to look at statements through the lens of expressions, so to get some context, let's look at a few expressions.

```python
1 + 1
```
```python
", ".join(["Hello", "world!"])
```
```java
objectA.equals(objectB)
```

Each of the above evaluate to a single value. Each of which can be assigned to a variable.

### Statements

Now let's look at some statements, and then try to coerce them into an expression.

#### assignment statement

```python
x = 1 + 1
```

If it were an expression, you could do this.

```python
z = (x = 1 + 1)
```

#### if statement

```python
if True:
    foo()
else:
    bar()
```
An if statement does not return a value, it only controls the flow of execution. If it were an expresssion, we could do something like this.

```python
result = if True:
             foo()
         else:
             bar()
```
Note: Some languages have if _expressions_ where this is possible. Ruby is one such language. Also Elixir and Clojure. This example is in Python, which only has if _statements_.

#### return statement

```java
return myVar;
```

Similar to the assignment statement, if it were an expression, we could do something like

```java
Object myNewVar = return myVar;
```

#### for loop

```javascript
for (var i = 0; i < 10; i++) {
    i *= 2;
}
```

Similar to the if statement, for loops only control the flow of execution. Though, if it were an expression...

```javascript
var foo = for (var i = 0; i < 10; i++) {
    i *= 2;
}
```

Some of these might be hard to reason about. For instance, what would a for loop evaluate to? It might be easy to say that our example would evaluate to 14, but what if that for loop was iterating over a list of objects and mutating them? What would it evaluate to then?


### It isn't always statements and expressions

Not every language has statements. There are languages where **everything** is an expression, such language may not have imperative constructs like for-loops and while-loops though. Many functional languages will be absent of statements, and only contain expressions.


### Conclusion

Expressions and statements can be easy to mix up, especially for newcomers. As a programmers, we have a wealth of terminology, which can be overwhelming.

Learning a functional programming language such as Elixir or Clojure, where everything is an expression, may help illuminate the differences between statements and expressions in imperative languages, like Java and Python.


### Addendum

I omitted the definition of an imperative language, because there is probably enough to fill a post of its own.

---

#### Sources

1. Statement (computer science). (2016, August 3). In Wikipedia, The Free Encyclopedia. Retrieved 14:20, August 5, 2016, from [https://en.wikipedia.org/w/index.php?title=Statement_(computer_science)&oldid=732881180](https://en.wikipedia.org/w/index.php?title=Statement_(computer_science)&oldid=732881180)

2. Expression (computer science). (2016, March 31). In Wikipedia, The Free Encyclopedia. Retrieved 14:08, August 5, 2016, from [https://en.wikipedia.org/w/index.php?title=Expression_(computer_science)&oldid=712921965](https://en.wikipedia.org/w/index.php?title=Expression_(computer_science)&oldid=712921965)
