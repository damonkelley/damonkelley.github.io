---
title: Defining Named Functions with a List Comprehension
description: 'A cool pattern in Elixir - using list comprehensions to generate multiple named function definitions at compile time.'
pubDate: 'Aug 19 2016'
date: 2016-08-19 13:59 UTC
tags: macros, elixir
archived: true
---

I was perusing an Elixir project<sup>1</sup> a few months ago, and I came across a really cool pattern. In Elixir, you can define named functions using a list comprehension.

```elixir
defmodule MyModule do
  for n <- 1..5 do
    def match_me(unquote(n)), do: "I matched to #{unquote(n)}"
  end

  def match_me(_n) do
    "I did not match"
  end
end
```

In the example above, for each number between `1` and `5` (inclusive), a function is generated with the current value of `n` as the argument. If we were to expand this out, we would have a module that looks like this.

```elixir
defmodule MyModule do
  def match_me(1), do: "I matched to 1"
  def match_me(2), do: "I matched to 2"
  def match_me(3), do: "I matched to 3"
  def match_me(4), do: "I matched to 4"
  def match_me(5), do: "I matched to 5"

  def match_me(_n) do
    "I did not match"
  end
end
```

In this context the `for` macro is working like `defmacro` and operating on the code as data. Notice, that `n` had to be unquoted within the function definition. Had `n` not been unquoted, we would have been left with this.

```elixir
defmodule MyModule do
  def match_me(n), do: "I matched to #{n}"
  def match_me(n), do: "I matched to #{n}"
  def match_me(n), do: "I matched to #{n}"
  def match_me(n), do: "I matched to #{n}"
  def match_me(n), do: "I matched to #{n}"

  def match_me(_n) do
    "I did not match"
  end
end
```

Of course this would always match to the first version of `match_me` and always return `"I match to <insert value of n>"`, leaving the last clause of `match_me` to never be matched.

### Application

Examples are fine for demonstration, but it is good to see where this pattern might be useful in the wild. One particular place I like to use this pattern is when I am testing a function with a range of inputs and outputs. This comes up in the prime factors kata and the roman numerals kata.

Here is an example of this pattern used for the roman numerals kata<sup>2</sup>.

```elixir
defmodule RomanNumeralsTest do
  use ExUnit.Case
  doctest RomanNumerals

  import RomanNumerals

  @roman_to_arabic [
    {"I", 1},
    {"II", 2},
    {"III", 3},
    {"IV", 4},
    {"V",  5},
    {"VI", 6},
    {"VII", 7},
    {"VIII", 8},
    {"IX", 9},
    {"X", 10},
    {"XI", 11},
    {"XIV", 14},
    {"XIX", 19},
    {"XXVIII", 28},
    {"XXXXIV", 44},
    {"L", 50},
  ]

  for {roman, arabic} <- @roman_to_arabic do
    test "it returns #{roman} when given #{arabic}" do
      assert convert(unquote(arabic)) == unquote(roman)
    end
  end
end
```

### Drawbacks

I think this is a pretty cool feature of the language, but might be best to use with caution. The pattern has the potential introduce opacity to your code.

In my opinion, the test example above is clear enough. The `@roman_to_arabic` map expresses most of what the tests needs to communicate.

My pair and I also attempted to use this pattern within the `RomanNumerals` module to a handful of the function clauses in the name of removing duplication.

Here is that module.

```elixir
defmodule RomanNumerals do
  @numerals_map [
    {"M", 1000},
    {"D", 500},
    {"C", 100},
    {"L", 50},
    {"X", 10},
    {"V", 5},
    {"I", 1}
  ]

  def convert(0), do: ""
  def convert(4), do: "IV"
  def convert(9), do: "IX"

  for {roman_numeral, arabic} <- @numerals_map do
    def convert(number) when number >= unquote(arabic) do
      unquote(roman_numeral) <> convert(number - unquote(arabic))
    end
  end
end
```

I find that this does not do as great of job of communicating intent. Not terrible, but not great either.


### Wrap up

Use with care.

---
<sub>1. Unfortunately the name of the project has escaped me</sub>

<sub>2. We stopped at 50</sub>
