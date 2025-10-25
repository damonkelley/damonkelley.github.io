---
title: Project Specific Vim Configuration
description: "Using Vim's built-in exrc setting to enable project-specific configurations without plugins."
pubDate: 'Sep 23 2016'
layout: post
date: 2016-09-23 02:38 UTC
tags: vim, ephemeral vim settings
---

Sometimes I come across a setting that I need, but only in a specific context. Perhaps the context is the language, or a particular type of buffer.

It is super easy to handle these types of configurations. Vim has autocommands for this. But what about when we need settings specific to our project?

There are plugins out there the solve this for us, like [EditorConfig](http://editorconfig.org/), but it turns out there is a mechanism built-in to Vim that can handle this for us.

`:set exrc`

With this settings enabled, Vim will look for a `.vimrc` (`.nvimrc` for Neovimmers) or `.exrc` in the current directory.This file can contain anything that you might see in `$MYVIMRC`. This file is loaded just after `$MYVIMRC` during Vim initialization, so it can also be used to override settings inside of you `vimrc`.

Perhaps you have one project that uses tabs instead of spaces, or maybe there is another project where you would like to have a particular mapping to run your tests. Both scenarios can be satisfied with `exrc`.

This setting is disabled by default. There is a risk involved in enabling it. See this [post](http://www.ilker.de/specific-vim-settings-per-project.html) for more information.

---
### Resources

`:h exrc`
