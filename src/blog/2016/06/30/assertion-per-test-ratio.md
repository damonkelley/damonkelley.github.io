---
title: "1 Test, 1 Assertion?"
description: 'Exploring when to use single versus multiple assertions in tests - being pragmatic about testing stateful behavior.'
date: 2016-06-30
status: archived
---

Should each of our tests have a single assertion, or is it OK for a test to contain multiple assertions?


Ever since I started made a priority of testing, I have flipped back and forth between these two camps. What I have come to realize is that there is a time an place for both!

Here are some guidelines I tend to follow.

### Aim for a single assertion per test

The key word here is _aim_. Sometimes this is easy, sometimes it is more difficult. The single assertion tests are great because the tests can be very clear. When such a test fails, it is usually easier to spot the problem because you don't need to figure out _which_ assertion failed.


### State is difficult to test

In OOP, objects are data + behaviour, and it is common for an object's behaviour to mutate its data. So how do we test this?

In certain cases you can benefit from multiple assertions here. If you are familiar with "Arrange Act Assert", then this might be called "Arrange Assert Act Assert".

Lets look at an example

```java
class IncrementalServer {

    private int current = 0;

    public void increment()
        current++;
    }

    public int poll() {
        return current;
    }
}

class IncrementalServerTest {
    @Test
    public void itIncrements() {
        IncrementalServer server = new IncrementalServer();
        assertEquals(0, server.poll());
        server.increment();
        assertEquals(1, server.poll());
    }
}
```

This is a trivial example, and here I would probably add an additional test that server starts at 0, but it demonstrates making an assertion about the initial state. This pattern is useful when the system under test modifies the state of some other object.


### The setup is not worth duplicating

Sometimes there is some setup or arranging that needs to take place to test some behaviour, but it wouldn't be fitting to put the setup in the `setUp` method.

You could move such tests into their own test class where you could put all of that setup into the `setUp` method, but most of the time that will cost more that it is worth.


### One assertion per test can be overkill

Take this `equals` method on the fictional Foo class.


```java
class Foo {
    Foo(Baz baz, Quux quux) {
        this.baz = baz;
        this.quux = quux;
    }

    public boolean equals(Object o) {
        if (this == o) return true;
        if (o != null && getClass() != o.getClass) return false;

        Foo foo = (Foo) o;

        if (bar != foo.bar) return false;
        return quux == foo.quux;
    }
}
```

Should we use a single test with multiple assertions here? I think so.

```java
@Test
public void equalityIsBasedOnBarAndQuux() {
    assertEquals(new Foo("a", "b"), new Foo("a", "b"));
    assertNotEquals(new Foo("a", "b"), new Foo("a", "d"));
    assertNotEquals(new Foo("a", "b"), new Foo("e", "b"));
    assertNotEquals(new Foo("a", "b"), new Foo("c", "d"));
}
```


You could split these into multiple tests, but you would end up with a test name that like `itIsNotEqualWhenBarIsTheSameAndQuuxIsDifferent` and `itIsNotEqualWhenBarIsDifferentAndQuuxIsTheSame`. I think `equalityIsBasedOnBarAndQuux` is good enough here.


## Tips for using multiple assertions in a single test

_Be mindful of the test output_

### Reach for an assertion that gives you a diff

In JUnit, the `assertEquals` method will report the expected and actual parameters passed to it.

```java
assertEquals(1, 2);
```
```error
java.lang.AssertionError:
Expected :1
Actual   :2
```

### Add an assertion message

Using an assertion that accepts a message can also make a potential failure clear.

```java
assertTrue("It is greater than 2", 1 > 2);
```

```console
java.langAssertionError: It is greater than 2
```

This is will depend on the test framework that you use, but in my experience, most frameworks will offer a way to specify an assertion message.


## The moral of the story

Be pragmatic. Sometimes a single assertion per test is the right way to go. Other times multiple assertions can be more effective.
