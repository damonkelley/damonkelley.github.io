---
title: Hygienic Macros
description: 'Understanding hygienic macro systems and why they matter - preventing unintended variable capture and binding issues.'
date: 2016-08-23
archived: true
---

Q: **What is a hygienic macro system and why do I should I care about it.**

A: _Without a hygienic macro system, it becomes possible to hide bindings from a macro. This can lead to unintended behaviour_

Macros are expanded into code at compile time. What this means is that unlike functions, macros do not come with their own scope. Since macros expand into code, they use the scope that they are expanded into. Take a look at this C example.

```c
#include <stdio.h>
#define MYMACRO(i) i++

int main() {
    int a = 0;
    MYMACRO(a);
    printf("%d\n" a);
}
```

This expands to

```c
int main() {
    int a = 0;
    a++;
    printf("a's value is %d\n" a);
}
```

And when evaluated

```
a's value is 1
```

What has happened here is that `MYMACRO` has (intentionally or unintentionally) altered the value of `a`.

`MYMACRO` is has consistent behavior. However, in C it is possible to write macros with inconsistent behavior.

Take a look at this C example<sup>1</sup> that was intended to exhibit the same behavior as `MYMACRO`.

```c
#include <stdio.h>
#define MYOTHERMACRO(i) do {int a=0; i++;} while(0)

int main() {
    int a=0;
    int b=0;

    MYOTHERMACRO(a);
    printf("MYOTHERMACRO with a %d\n", a);

    MYOTHERMACRO(a);
    printf("MYOTHERMACRO with a again %d\n", a);

    MYOTHERMACRO(b);
    printf("MYOTHERMACRO with b %d\n", b);

    MYOTHERMACRO(b);
    printf("MYOTHERMACRO with b again %d\n", b);
}
```

Output:

```console
MYOTHERMACRO with a 0
MYOTHERMACRO with a again 0
MYOTHERMACRO with b 1
MYOTHERMACRO with b again 2
```

What has happened is the macro declared a local variable inside of the do block, which has hidden `a` and prevents it from being incremented. Meanwhile, `b` is not hidden. Let's look at how this code was expanded.

```c
int main() {
    int a=0;
    int b=0;

    do {
        int a=0; // A new local variable in scope of do.
        a++;     // Increments the local variable but it's contained to this scope.
    } while(0);
    printf("MYOTHERMACRO with a %d\n", a);

    do {
        int a=0; // Same as above.
        a++;
    } while(0);
    printf("MYOTHERMACRO with a again %d\n", a);

    do {
        int a=0; // A new local variable in scope of do.
        b++;     // b is not local. This is the same b that was given as an argument.
    } while(0);
    printf("MYOTHERMACRO with b %d\n", b);

    do {
        int a=0;  // Same as above
        b++;
    } while(0);
    printf("MYOTHERMACRO with b again %d\n", b);
}
```

### Hygienic Macro Systems

Hygienic macro systems are aimed at preventing the problem above.

Unlike C, Elixir has a hygienic macro system. Here is an example from the Elixir docs.

```elixir
defmodule Hygiene do
  defmacro no_interference do
    quote do: a = 1
  end

  def go do
    a = 13
    no_interference
    a
  end
end

Hygiene.go # ==> 13
```

In language with a hygienic macro system, the default behavior is not allow macros to alter a binding in the scope. It is still possible to do if this is the intention though. In Elixir, to make `no_interference` alter `a` we would need to change the macro to this.

```elixir
defmacro now_has_interference do
  quote do: var!(a) = 1
end
```

In language like C or Common Lisp, where there is not a hygienic macro system, hygiene has to be managed manually.

---

<sub>1. This example was heavily based on the example from the [Hygienic Macros Wikipedia page](https://en.wikipedia.org/wiki/Hygienic_macro#The_hygiene_problem).</sub>
