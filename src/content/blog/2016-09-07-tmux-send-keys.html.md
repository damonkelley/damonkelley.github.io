---
title: "tmux: send-keys"
description: 'Using tmux send-keys to emulate keyboard input and automate workflows across panes and windows.'
pubDate: 'Sep 07 2016'
layout: post
date: 2016-09-07 03:01 UTC
tags: tmux
---

<style>
div[id^="asciicast-"] {
	text-align: center;
}
</style>

`send-keys` is a tmux subcommand that allows you to send emulated keyboard key presses to a designated target, via the `-t` flag.

A basic invocation of `send-keys` would be

```shell
$ tmux send-keys -t 1 ls Enter
# $ ls<Enter>
```
<script type="text/javascript" src="https://asciinema.org/a/38ke05b0h2otl3r2tolrdeg7r.js" id="asciicast-38ke05b0h2otl3r2tolrdeg7r" async data-speed=2 data-autoplay="true" data-loop="true"></script>

This will emulate pressing `l-s-<Enter>` inside of pane with index 0 in current window. You may notice that Enter is a reserved keyword for tmux. It recognizes this sequence of characters as corresponding to the return key.

There is a collection of these reserved words that tmux understands. A mostly complete list is [here](#list-of-keys). If a reserved word is not matched, then tmux sends the word as a series of characters. In our example above, `ls` is sent as a sequence of characters, and `Enter` is sent as a single key.

If there are multiple words which must be interpreted as characters, they can be enclosed in double quotes.

```shell
$ tmux send-keys -t 1 "ls -1" Enter
# $ ls -1<Enter>
```

If the words are not quoted, tmux will remove the delimiting space.

```shell
$ tmux send-keys -t 1 ls -1 Enter
# $ ls-1<Enter>
```
<script type="text/javascript" src="https://asciinema.org/a/4l1evpvhk1ddo4lw268mcqfl0.js" id="asciicast-4l1evpvhk1ddo4lw268mcqfl0" async data-speed=2 data-autoplay="true" data-loop="true"></script>


### Specifying a target

A target pane can specified as an and index

```shell
$ tmux send-keys -t 1 "echo Hello, world!" Enter
```

Or to a relative to the window layout

```shell
$ tmux send-keys -t top-right "echo Hello, world!" Enter
```

You can also target the last active pane

```shell
$ tmux send-keys -t ! "echo Hello, world!" Enter
```

Further, you can send keys to pane in another window

```shell
# server is the name of the window `tmux rename-window server`
$ tmux send-keys -t server.top "echo Hello, world!" Enter
```

You can even send keys to a pane in a window in a different session!

```shell
$ tmux send-keys -t other-session:server.top "echo Hello, world!" Enter
```

### Other options

This command also has 3 other options.

`-l` disables the key name lookup. If this options is enabled `Enter` will be sent as the characters `E-n-t-e-r` instead of `<Enter>`.

<script type="text/javascript" src="https://asciinema.org/a/91148d97u8zoo2w5wldkj6mdk.js" id="asciicast-91148d97u8zoo2w5wldkj6mdk" async data-speed=2 data-autoplay="true" data-loop="true"></script>


`-R` will reset the terminal before sending the keys. This is useful if you don't want to keep your focus on the output of the last command.

<script type="text/javascript" src="https://asciinema.org/a/ao3zpsh9t4abqgb2va2mrqvpb.js" id="asciicast-ao3zpsh9t4abqgb2va2mrqvpb" async data-speed=2 data-autoplay="true" data-loop="true"></script>

`-M` is for mouse events.

<span id="list-of-keys"></span>
### List of Keys

Collected from [this source file](https://github.com/tmux/tmux/blob/ec7f5305b1a6e5548f0769f988e76b01ec293dcc/key-string.c#L33-L100)

```console
C-<key>       Hold Control + Key
M-<key>       Hold Meta + Key

F1            F1
F2            F2
F3            F3
F4            F4
F5            F5
F6            F6
F7            F7
F8            F8
F9            F9
F10           F10
F11           F11
F12           F12

IC            Insert
DC            Delete
Home          Home
End           End
NPage         Next Page / Page Down
PageDown      Next Page / Page Down
PgDn          Next Page / Page Down
PPage         Previous Page / Page Up
PageUp        Previous Page / Page Up
PgUp          Previous Page / Page Up

BSpace        Backspace
BTab          Back Tab
Enter         Enter
Escape        Escape
Space         Space
Tab           Tab

Up            Up
Down          Down
Left          Left
Right         Right

KP*           Keypad *
KP+           Keypad +
KP-           Keypad -
KP.           Keypad .
KP/           Keypad /
KP0           Keypad 0
KP1           Keypad 1
KP2           Keypad 2
KP3           Keypad 3
KP4           Keypad 4
KP5           Keypad 5
KP6           Keypad 6
KP7           Keypad 7
KP8           Keypad 8
KP9           Keypad 9
KPEnter       Keypad Enter

MouseDown1    Mouse Down 1
MouseDown2    Mouse Down 2
MouseDown3    Mouse Down 3
MouseUp1      Mouse Up 1
MouseUp2      Mouse Up 2
MouseUp3      Mouse Up 3
MouseDrag1    Mouse Drag 1
MouseDrag2    Mouse Drag 2
MouseDrag3    Mouse Drag 3
MouseDragEnd1 Mouse Drag End 1
MouseDragEnd2 Mouse Drag End 2
MouseDragEnd3 Mouse Drag End 3
WheelUp       Mouse Wheel Up
WheelDown     Mouse Wheel Down
```
