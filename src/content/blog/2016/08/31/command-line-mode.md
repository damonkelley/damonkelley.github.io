---
title: "Command-line Mode"
description: "Exploring Vim's Command-line mode - one of the lesser-known modes that enables powerful command history features."
pubDate: 'Aug 31 2016'
date: 2016-08-31 02:49 UTC
tags: vim
archived: true
---

<style>
img {
  display: block;
  margin: auto;
  margin-top: 1.3em;
  margin-bottom: 1.3em;
  border: 1px solid #e7e7e7;
  height: auto;
  width: 100%;
}
</style>

If you have landed on this article, you are probably already aware of Vim. You are probably Vim user. You probably already know that Vim is a modal editor, and about the modes, Normal mode, Visual mode, and Insert mode.

Did you know there are more than just three modes? In fact, there are six "basic" modes, and an additional six "variant" modes, which are each a variant of a basic mode.<sup>1</sup>

In this post we are going to talk about the Command-line mode. This is a mode that you have more than likely already encountered.

Have you ever tried to quit Vim, but you accidentally typed `q:` instead of `:q`? You would have noticed that instead of quiting, a new window appeared and you probably thought it was strange.

That strange window is part of Command-line mode!

### A light introduction

Let's reintroduce ourselves to Command-line mode really quick. Perhaps you have been occasionally entering the mode for years, or maybe you are new to Vim and have yet to experience this foreign mode.

There are few ways that we can activate Command-line mode. The most basic is by pressing `q:` while in Normal mode. The combination should open a focus a window like the one below.

![command-line mode](/images/2016-08-31-command-line-mode/command-line-mode.png)

You will notice that we can navigate this buffer just like any other buffer. `j` and `k` will move us up and down. `gg` and `G` will take us to the beginning and end of the buffer. Essentially, we are in Normal mode, in a buffer that contains our command history.

One departure from Normal mode though, is that we can run any one of these command by moving the cursor to the appropriate line and pressing enter. This will also exit Command-line mode.

Additionally, if we decide that we do not want to run any of these commands, we can also leave the mode by quiting the Command-line mode window with `:q<enter>` or with `CTRL-W q`

Command-line mode is not merely a listing of historical commands though. We can also execute new commands from this mode. This can be done by going into insert mode and typing the new command on the last line of the buffer, which is left blank for you. This is also the default location of cursor upon entering Command-line mode.

Still though, I realize it might still be hard to see the real benefit of this mode.

### Where it shines

#### Operate/edit commands in Normal mode.

You may have found yourself wishing that you could use Normal mode motions and operations to edit a command that you are working on.

![complete-command](/images/2016-08-31-command-line-mode/edit-command.png)

With simple ex commands, we are limited to the mappings listed here `:h cmdline-editing`.

Luckily, we can use `CTRL-f` in the middle of typing an ex command to enter Command-line mode with the pending command.

![complete-command](/images/2016-08-31-command-line-mode/edit-command-mode.png)


#### Copy and paste your previous commands

Use Command-line mode to navigate your previous command and yank them on to any register you like. I used this myself to write this blog post.


#### Compose a command using completion from your other open buffers

Perhaps you would like to replace a particular word in a buffer, but you are a lazy programmer and don't want to type it out. Plus, if you type it out, you run the risk of mistyping it.

In Command-line mode you can use Vim's built-in completion to autocomplete a word.

![complete-command](/images/2016-08-31-command-line-mode/complete-command.png)

#### Navigate your recent searches

`q:` will list the previous commands, but `q/` and `q?` will provide you with a history of searches.

![searches](/images/2016-08-31-command-line-mode/searches.png)


### Wrap up

Command-line mode might seem like a nuisance, but I encourage you to spend some time and learn Command-line mode. Once you know how to enter and exit the mode, all of the normal Vim features/commands/mappings are available to you.

---

<sub>1. `:h vim-modes`
