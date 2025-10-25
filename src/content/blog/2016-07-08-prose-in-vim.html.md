---
title: "Prose in Vim"
description: 'Useful Vim features for writing prose - sentence motions, spell checking, and display line navigation.'
pubDate: 'Jul 08 2016'
layout: post
date: 2016-07-08 05:31 UTC
tags: vim, prose, blogging
---

As I have been writing more prose as of late, I have begun to get more use out of a few features that are built-in to Vim.

READMORE

### `(` and `)` motions

The sentence motion is often left by the wayside when we are hard at work coding. It doesn't seem to have much application. However, in prose, moving by sentence can be really convenient. Need to delete a sentence? Try reaching for a `d)` instead of `df.` the next time you have a sentence that isn't pulling its weight.

### `:setlocal spell`

Vim has a built-in spell checker! (Which I am using as I write this post.)

`:setlocal spell` will enable it. The first time it is enabled it will download some spell files. In my experience accepting the default download location has worked just fine.

With `spell` enabled, Vim will load the appropriate spell file into memory and continuously check the buffer for misspellings.

`]s` and `[s` will jump to the next or previous spelling error respectively. With the cursor on the violating word, `z=` will list the possible corrections. This tends to be fairly accurate at detecting what I intended. I typically end up accepting the first option.

There are quite a few features, so checkout `:h spell` for a more complete list of features.


### `gj` and `gk`

Use `gj` and `gk` to move to the _display_ line above or below the current position. If you have wrapping (`:h wrap`) enabled, you have probably issued a `j` in the middle of a paragraph to find that Vim has moved the cursor much further down. Basically, `gj` and `gk` allow you to move the cursor between wrapped lines, which are different from _real_ lines.


### Bonus: Plugin Recommendations

#### Distraction Free Mode

If you prefer fewer distractions when writing, take a look at [Goyo](https://github.com/junegunn/goyo.vim).

#### Markdown

I do a lot my writing in markdown. I have found that Vim's built-in markdown syntax to be sufficient most of the time. If you want to take it a step further checkout [vim-markdown](https://github.com/plasticboy/vim-markdown).

One of the cool things about this plugin is that it offers syntax highlighting for fenced code blocks.
