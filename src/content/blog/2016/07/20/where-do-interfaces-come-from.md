---
title: Where do interfaces come from?
description: "Two patterns for introducing interfaces - replacing subclasses with injection and creating dependencies that don't exist yet."
pubDate: 'Jul 20 2016'
layout: post
date: 2016-07-20 03:36 UTC
tags: interfaces, patterns, abstractions, java
---

As I am working more with Java and thinking about interfaces, I am starting to see some patterns in where and how interfaces can be introduced. Here are two patterns that I have seen.

READMORE

### Replacing subclasses with injection

Interfaces can be introduced when we have multiple concrete classes that can be merged into a single class, and behavior, that once constituted separate classes, is then injected.

As an example, we can look at the `CommandA` and `CommandB` classes, which both extend the `Command` class.

```java
class CommandA extends Command {
    public void run() {
        System.out.println("foo");
    }
}

class CommandB extends Command {
    public void run() {
        System.out.println("bar");
    }
}
```

One way to inject the different behavior is introduce a new interface.

```java
interface Runner {
    void run();
}
```

And the different behavior can be put into new classes that implement this interface.

```java
class Foo implements Runner {
    public void run() {
        System.out.println("foo");
    }
}

class Bar implements Runner {
    public void run() {
        System.out.println("bar");
    }
}
```

Now any Runner can be injected into the `Command` class directly, and there is no longer a need to subclass in order to provide a different implementation of `run`.

```java
class Command {
    private Runner runner;

    Command(Runner runner) {
        this.runner = runner;
    }

    public void run() {
        runner.run();
    }
    // ...
}
```

### Dependencies that do not exist yet

Another great to time introduce interfaces is when you have a dependency that doesn't exist yet.

Pretend that when we originally introduced the `Command` class, we knew we would need to inject different behavior.

Also pretend that we are TDDing this, so we will have a `CommandTest`, which will drive out a `Command` class.


1. Starting out with our test, we can see that we are going to want to inject behavior into the `Command`. For now, we will mock the injected class that doesn't exist yet.

    ```java
    class CommandTest {
        @Test
        public void itCallsTheRunner() {
            MockRunner runner = new MockRunner();
            Command command = new Command(runner);
            assertEquals(true, runner.called);
        }

        private class MockRunner {
            public boolean called = false;

            public void run() {
                called = true;
            }
        }
    }
    ```

2. We arrive at this implementation of `Command`, but until the real dependency is created, we have to keep a dependency on the `MockRunner`.

    ```java
    class Command {
        private MockRunner runner;

        public Command(MockRunner runner) {
            this.runner = runner;
        }

        public void run() {
            runner.run();
        }
    }
    ```

Instead, we could start by introducing an interface.

1. If we backed out of the changes and started over, we could introduce the interface first.

    ```java
    interface Runner {
        void run();
    }
    ```

2. Then it can be used to create the mock.

    ```java
    class CommandTest {
        @Test
        public void itCallsTheRunner() {
            MockRunner runner = new MockRunner();
            Command command = new Command(runner);
            assertEquals(true, runner.called);
        }

        private class MockRunner implements Runner {
            public boolean called = false;

            public void run() {
                called = true;
            }
        }
    }
    ```

3. Now the dependency is in place. `Runner`s can be added now or later, and the `Command` class is none the wiser.

    ```java
    class Command {
        private Runner runner;

        public Command(Runner runner) {
            this.runner = runner;
        }

        public void run() {
            runner.run();
        }
    }
    ```

### Wrap up

These are two of the patterns that I have started to notice. I am certain there are more. I began noticing these patterns after I started thinking more about how to apply the Dependency Inversion Principle. Hopefully, as I see more of these patterns emerge, there will be subsequent posts about them.
