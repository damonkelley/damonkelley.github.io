---
title: From Workflow Inefficiency to an Ad Hoc Autotest
description: 'Creating an ad-hoc test runner in Vim using tmux send-keys to eliminate workflow friction when running tests.'
date: 2016-09-08
archived: true
---

I was pairing with a coworker last week on a throw-away Elixir project. We working on my pair's machine, using Vim inside of a tmux instance.

My pair was relatively new to Elixir, so he did not have any workflows setup for working with the language yet.

We started coding away. We had Vim and a shell in side by side tmux panes. Every time we wanted to run the tests, which was very often, we would type

```
Ctrl-b ; Ctrl-p Enter Ctrl-b ;
```
That translates to

1. `Ctrl-b ;` Go to the previous pane (the pane with the shell where the tests are being run)
2. `Ctrl-p Enter` Run the last command again. The last command being the command to run the tests.
3. `Ctrl-b ;` Go back to the pane with Vim.

That is 8 keystrokes every time we want to run the tests!

My pair and I are lazy. It didn't take much of this before we looking shorter way to run the tests.

I recalled that tmux had the ability to send keys to windows and panes, so I started looking into a way to run our test command in the other tmux pane without needed to leave Vim.<sup>1</sup>

The command we were looking for was `tmux send-keys`<sup>2</sup>

First we formulated the command to run the tests via an ex command.

```vimscript
:!tmux send-keys -t 1 "mix test" Enter
```

This worked, in that executed the command in the adjacent pane, but it required us to press enter twice every time we ran it.

The next version ran the command silently. This eliminated the redundant key press and some extra output inside of Vim.

```vimscript
:!tmux send-keys -t 1 "mix test" Enter
:silent exec "!tmux send-keys -t 1 \"mix test\" Enter"
```

After a while, there was quite a bit of output to sift through in the test pane. We had to look around a bit to find the most recent test output. We decided that we wanted to clear the screen before we execute the test command.

Initially, we sent a plain `C-l` via `send-keys`.

```vimscript
:silent exec "!tmux send-keys -t 1 C-l \"mix test\" Enter"
```

Later, I found that there is a option for this. The `-R` flag.

```vimscript
:silent exec "!tmux send-keys -Rt 1 \"mix test\" Enter"
```

The next challenge, was that the Vim UI looked a little funky every time we ran the command. It turned out we needed to tell Vim to redraw.

```vimscript
:silent exec "!tmux send-keys -Rt 1 \"mix test\" Enter" | redraw!
```

Great! Then we thought, "wouldn't it be great if we would bind this to a mapping?"

```vimscript
nnoremap <buffer> <leader>t :silent exec "!tmux send-keys -Rt 1 \"mix test\" Enter" <Bar> redraw!<CR>
```

Perfect! This was significantly better now. We are down from 8 keystrokes to 2!


We worked like this for a little while, and I began to notice another inefficiency. Every time we wanted to run the tests, we had to save the file (or files) first.

This means that at best, we were still at 6 keystrokes to run the tests.


Side note, if you are wondering where 6 keystrokes comes from.

```
Shift-; w Enter <leader> t
   2    1   1      1     1
```

We discussed our options briefly. We could remap `<leader>t` to write the file and then run the tests. The downside here is that it trips up our muscle memory. We are very accustom to `:w`, but not so much `<leader>t` yet.

The solution we arrived on was to create an autocommand that will run our tests every time the we write a buffer.

```
:au BufWrite * :silent exec "!tmux send-keys -Rt 1 \"mix test\" Enter" | redraw!
```

What we ended up with was a makeshift autotest. Now, we were getting constant feedback about the state of our code without needing to change our existing workflow.

---

<sub>1. There are plugins that do this for you. However, installing and configuring a new plugin for this specific pairing session seemed like overkill. Plus, we picked a few new tricks.</sub>

<sub>2. [tmux: send-keys](/2016/09/07/tmux-send-keys/)</sub>
