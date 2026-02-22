---
title: Rethinking Find and Till
description: "Why Vim's find and till motions are hard to adopt, and how rethinking their use can make them more practical and less about precision."
date: 2016-07-28
archived: true
---


_Find_ (`f` & `F`) and _till_ (`t` and `T`) are hard motions to adopt into your Vim vocabulary (At least, they were hard for me). I think there are two main reasons for this.

#### 1. Muscle Memory

The first comes down to muscle memory. Acquiring fluency with `f` and `t`, requires that you are able to type some key combinations that you may not be familiar with. This is particularly true when you need to do something find the previous `S` in the line. `Shift-f Shift-s` is likely not a sequence of motions that our hands are familiar with. How often have you had to type `FS` in the past?

This can be solved with some practice.


#### 2. The Perception of Precision

I think the other reason is that these two motions are perceived as being reserved for precision. I frequently see examples of `f` and `t` usage with a count argument supplied.

* `d3tA` - _delete up to the third A in the line_
* `4fN` - _find the fourth next N in the line_

Who has time for that kind of precision? What is even the point? In the time it takes me to count how many `N`s there are between where I am, and where I want go, I could have covered that distance by simply holding down `l` multiple times over!

While the _find_ and _till_ motions **can** be used for precision, they don't **have** to be.


### Rethinking Precision

#### Repeat

Frequently considered one of the best features of the Vim, the _dot_ operator can be used to great effectiveness in combination with your `f` and `t`  motions.

Here is what the first command from above looks like if we use the dot operator instead

* `dtA..`

There is the downside that this is has one extra keystroke, but from my experience, the benefit is far greater. Using the dot operator decreases the amount of time before we get feedback from our command. The feedback here is seeing the text being edited on the screen. Typically, when we supply a count argument, we end up increasing the time to feedback since we have to calculate the count to supply.


#### Repeat-_lite_

The dot operator will only repeat the last change, so it cannot be used to repeat a motion. However, the `;` and `,` commands are designed specifically to repeat the last _find_ or _till_ motion.

Thus, the second example from above, `4FN`, can be achieved with

* `fN;;;`

Again, the movement is less precise, but by simply repeating the `fN`, we can shorten the feedback cycle considerably.

I should add that, if you over-shoot, use the `,` command to repeat the _find_/_till_ in the opposite direction.

This work flow is similar to searching, where we use `n` and `N` to move between matches, except we are limited to single characters on a one line.


#### Finding anchor points

The last part of the equation is to learn to identify anchor points. At first, it might be difficult to quickly see that you need to remove all the text up to an `A`, or that you need to move the cursor back to a particular `c`. Just like with muscle memory, with practice this becomes easier.


### Conclusion

_Find_ and _till_ can be used for precision, but they don't have to be. We can use them quite effectively to get us _close enough_. We can do this by using the dot operator, and the `,` and `;` operators to repeat that last change, or repeat the last `f`, `F`, `t` or `T` movement.

This isn't as precise as providing a count argument, and it may lead to more keystrokes than if that count argument were supplied, but we are able to shorten the feedback cycle considerably. At the same time, using _find_ and _till_ in this manner is often still more precise than using motions such as `w`, `b`, `e`, `h`, or `l`.

So next time, before you reach for the `w` key, or the `h` or `l` keys, see if you can accomplish your goal a little more easily with `f` or `t`. It will be slow at first, but that is fixed some practice.

### Resources

* [Habit breaking, habit making](http://vimcasts.org/blog/2013/02/habit-breaking-habit-making/)
* `:h f` and `:h t`
* `:h ;` and `:h ,`
