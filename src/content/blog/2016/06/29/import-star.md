---
title: import *
description: 'Why wildcard imports are problematic - they hide design flaws and obfuscate module dependencies that could reveal code smells.'
pubDate: 'Jun 29 2016'
layout: post
date: 2016-06-29 03:09 UTC
tags: smells
---

Many languages have the ability to import modules. The syntax for importing varies slightly, but a common convenience is the wildcard import. This allows you to import everything that is housed within a namespace. Lets at look two examples of this.


#### Java

```java
import java.io.*;
```

Translation: _Import every class or interface in the java.io package_

#### Python

```python
from functools import *
```

Translation: _Import every function, class, and module level variable from the functools module_


You might already be aware that this is an anti-pattern in many circles. The common argument against using wildcard imports is that it pollutes the namespace and can lead to ambiguity. I will leave it to some other articles to discuss that specific argument.

* [Import * Considered Harmful](http://seanmonstar.com/post/708954358/import-star-considered-harmful)
* [Code Like a Pythonista: Idomatic Python](http://python.net/~goodger/projects/pycon/2007/idiomatic/handout.html#importing)


There is another reason not to use wildcard imports. Wildcard imports obfuscate the dependencies of your modules and hide potential design flaws.

The list of imports at the top of a module can tell the reader a lot about what lays below. This can be a really great tool when auditing the design of a module or class.

When you see a long list of imports, this can be an indicator that the module is doing too much. When you use wildcard imports that indicator not present.

Here is an example:

```java
import java.io.*;
```

vs.

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
```

This is a real example of some imports in a test class I wrote. All of these `io` imports were being used to mock the behaviour of reading lines from `System.in`. Converting the wild card import to a list of explicit imports made some of the flaws in the my tests more concrete. I knew there were problems, but making the imports explicit encouraged me to deal with that problem.

In the end I did a little bit of refactoring, added a fake reader and writer, and passed the fakes in instead. This let me reduce the `io` dependencies by nearly half, but more importantly by being explicit with my dependencies, it encouraged me to deal with the flaws in my design.

