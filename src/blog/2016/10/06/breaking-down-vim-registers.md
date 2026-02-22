---
title: Breaking Down Vim Registers
description: 'A comprehensive guide to Vim registers - unnamed, numbered, named, and read-only registers for storing and retrieving text.'
date: 2016-10-06
status: archived
---

Registers is one of the places where Vim stores its states. Whenever you delete text, yank text, or run a command, a register is modified. Furthermore, registers are also where we, as users, can store any information that is worth persisting short term. You can inspect the state of your registers by running the `:reg` command.

### The Unnamed register

The `"` is unnamed register. This is the register that is written to when text is deleted, and the register that is read from when we paste with `p`.

### The Numbered Registers

There are 10 numbered registers, `0` through `9`. Each time the unnamed register is modified, the previous contents is shifted in to register `2`. The contents of `2` is shifted in to `3`. This continues up to `9`, where the previous contents of the register are discarded when new content is shifted to it.

`0` and `1` are reserved registers. `0` holds the last yanked text, and `1` holds the last removed text that is one line or greater.

### Small delete register

`-` is the register that stores the last text deleted or changed that is less than one line.

### Named registers

The named registers are reserved for users. They are only written to or read from if directed by the user. These are the registers `a-z` and `A-Z`.

### Read-only registers

There are three read-only registers.

* `.` contains the last inserted text
* `%` contains the current file name
* `:` contains the last ex command executed.

### Alternate file register

This is the counter part to the `%`. Vim keeps track of the last view viewed file. This what `Ctrl-^` uses to find the alternate file.

### Expression register

This is an interesting register. The Vim documentation actually suggests that this is not a true register. What this register is for is storing the result of an expression. If you attempt to paste from this register, Vim with prompt you with a `=` in the command line. You can give it an expression, such as `system("ls") <Enter>`, and the output of the expression is what is pasted in to the buffer.


### Selection and drop registers

`*`, `+`, and `~` are for accessing the system clipboard. On macOS, when you copy with `Command-c`, you can access that selection via one of these registers. This will vary based on your OS and the how Vim was installed. For me, it is `"+y` and `"+p` to yank and paste to my system clipboard.

### The Black Hole register

`_` is throws everything it is given away. This is useful when you want to delete text without modifying the current state of the registers.

### Last Search Pattern register

The last register is `/`. It contains... the last search pattern! Vim uses this for the `n` command and for highlighting search matches when `hlsearch` is enabled. When `hlsearch` is on, you can use

```
:let @/ = "<search term>"
```

This will highlight the search term with out moving the cursor. This is similar to `match`, but it can be turned of with `:noh`


---

#### Resources

* `:h registers`
