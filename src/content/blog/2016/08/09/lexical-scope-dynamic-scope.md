---
title: Lexical & Dynamic Scope
description: 'Understanding the difference between lexical and dynamic scoping - how variable resolution differs based on code structure versus call stack.'
pubDate: 'Aug 09 2016'
layout: post
date: 2016-08-09 02:55 UTC
tags: scope, lexical scope, dynamic scope
---

Take this snippet of pseudo-code

```
var a = 1

defn g()
    print a

defn h
    var a = 10
    print a

defn f()
    var a = 2
    g()
```

If we were to call `g`, what value would print out? Would it print out at all? Would it raise an exception?

The answer to these questions depends on the scoping rules of this pseudo-language. Most of us would assume that calling `g` would print out 1, and there is a good reason for that assumption.

```
>>> g()
#=> 1
```

We are going to talk about two different scoping rules: lexical scope and dynamic scope.


### Lexical Scope

Lexical scope is where name resolution is based on the textual representation of the code. Put another way, name resolution is dependent on the context within the source code.

Let's go back to the pseudo-code and walk through a variable look-up as if the language was lexically scoped. The question we are trying to answer here is how did the language decide that `a` is `1`.

Here are the steps that are taken if the language is lexically scoped.

* First, we look to see if the name is defined locally, within the function (usually this means defined _prior_ to the reference, but not always. Search for "JavaScript variable hoisting")

* No such name exists, so we refer to the enclosing context where the function was defined in, which, in this case, is the global context.

* Within the global context, we find a name `a`, and we use that binding in our call to `print`.

```
>>> g()
#=> 1
```

What would the function `h` print?

```
>>> h()
#=> 10
```

`h` would print `10`, because `a` is defined locally. A local definition trumps all others.

What would print out if `f` was called?

```
>>> f()
#=> 1
```

It would still print out 1.

Even though `a` is defined inside of `f` before `g` is called, `g` resolves the name based on where the function was was **defined** (lexically), instead of where the function was **called**. Thus, the same resolution steps are taken as when we called `g` outside of `f`.

So our initial assumption was correct. This is because most moderns languages use lexical scoping.


### Dynamic Scope


In our last example, when we called `f`, what if, instead of looking for the variable `a` based on where the called function is defined, we looked for the variable based on where it is _called_?

What?

Put another way, what if we changed the scoping rules so that we when we called `f`, `g` used the version of the variable `a` that was defined in the body of `f`?

```
>>> f()
#=> 2
```

This is known as dynamic scoping. Instead of resolving names based on where the function is defined, names are resolved based on the invoking context.


### Conclusion

Likely, you are already comfortable with lexical scoping, even if you didn't know what it meant before reading this post. And in this example we only resolved variable names, but this applies to any other binding too, such as functions.

Dynamic scoping is not nearly as common. Some early Lisps used dynamic scoping, and one Lisp continues to use dynamic scoping, which is Emacs Lisp, the language used to script the Emacs editor<sup>1</sup>.

It should be also be noted that most shell languages also use dynamic scoping. Here is an example in bash<sup>2</sup>.

```bash
#!/bin/bash

a=1
function g() {
    echo $a;
}

function f() {
    local a=2;
    g
}

f
#=> 2

```
<sub>Example was derived this [snippet](https://en.wikipedia.org/w/index.php?title=Scope_(computer_science)&oldid=731014985#Lexical_scoping)</sub>

Knowing this could save you a headache the next time you need to write a shell script.

---

#### Sources

1. Lexical Scoping. (2011, May 8). In WikiWikiWeb Retrieved August 9, 2016, from [http://c2.com/cgi/wiki?LexicalScoping](http://c2.com/cgi/wiki?LexicalScoping)

2. Scope (computer science). (2016, July 22). In Wikipedia, The Free Encyclopedia. Retrieved August 9, 2016, from [https://en.wikipedia.org/w/index.php?title=Scope_(computer_science)&oldid=731014985](https://en.wikipedia.org/w/index.php?title=Scope_(computer_science)&oldid=731014985)
