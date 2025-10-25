---
title: Deliberate Programming with Autotests
description: 'Using auto-test runners more deliberately with Vim settings to improve TDD workflow and avoid programming by coincidence.'
pubDate: 'Aug 26 2016'
layout: post
date: 2016-08-26 03:48 UTC
tags: speclj, clojure, tdd, vim
---

One thing I am trying to improve on lately is being more deliberate with TDD and refactoring. In that past, it would not be out of the ordinary for me to make a change in a test and blindly make changes in my app code until the tests passed. I would make these changes without calculating what kind of work was ahead of me. I suppose this is a form of programming by coincidence<sup>1</sup>.

Surprisingly to me, one of the things that has driven change in my approach has been an auto-test runner.

My latest project is in Clojure, and the test framework I have chosen, Speclj, comes with an auto-test runner, which alleviates the pain of starting up the JVM every time I want to run the tests. (i.e. keeps the feedback cycle short)

Whenever a file changes on disk, the auto-test runner will rerun the tests for all namespaces that depend on that file.

Before I decided to take a more deliberate approach, I found that my workflow with the auto-test runner amplified this feeling of programming coincidentally. What I found is that I needed to alter my workflow inside of Vim to accommodate the auto-test runner, and so far the results have been good.

Below is one setting and one tool I have started using to improve my workflow in Vim.

### 1. `:set hidden`

Say we add new spec, or we change an existing one and we write the file. Speclj automatically picks up on this change and runs our test(s).

This is great. We were going to do that anyway.

But now, we need to change application code, and it looks like we are going to have make a change to more than one file.

This is fine. We could change the first file and write it, let the tests continue to file, and then do the same change to the second file. We would let the tests guide the change.

However, in my pursuit to be more deliberate, I would like to make *all* of the necessary changes before I run the tests again.

The `hidden` setting allows us to remove a buffer from display without writing it. If you have ever tried to open a new file while there are unsaved changes, you may have seen this message:

```
E37: No write since last change (add ! to override)
```

`:set hidden` removes this restriction. Rest assured, Vim will still prevent us from ending the session without dealing with the unsaved changes.


### 2. `:bufdo update`

So now we have made changes in two buffers/files and we are ready to run the tests again. The trouble is, if we write them one at a time, the tests will run after each save, and we don't want to run until all of our changes have been committed to disk.

This is where `:bufdo update` comes in handy.

`bufdo` will execute the provided command on each buffer in the buffer list. `update` is similar to `write` but it will only write the buffer if it has been modified. Putting them together, `:bufdo update` will write each of the buffers in the buffer list if they contain modifications.

It is worth noting that Vim will write the buffers sequentially, so it is possible for Speclj to pick up on changes to one file and start the tests again before the other file or files have been written. Though, on my machine, I haven't noticed this happen, even when I am writing three or four files at once.

---

#### Resources

* `:h 'hidden'`
* `:h :bufdo`
* `:h :update`

---

<sub>1. This is something discussed in _The Pragmatic Programmer_. An extract of this section is available [here](https://pragprog.com/the-pragmatic-programmer/extracts/coincidence)

