---
title: Thread Safety with Inner Classes
description: 'Understanding how implicit "this" references can escape inner classes and cause thread safety issues in Java.'
date: 2016-08-04
archived: true
---

In chapter 3 of _Java Concurrency in Practice_, there is a particular example that I had some trouble understanding.

READMORE

```java
public class ThisEscape {
    public ThisEscape(EventSource source) {
        source.registerListener(
            new EventListener() {
                public void onEvent(Event e) {
                    doSomething(e);
                }
            }
        )
    }
}
```

This is an example of code that is not thread safe. What exactly is not thread safe about this example?

### Premature Publication

`ThisEscape` isn't thread safe because a reference to `this` will escape and be published before that it is fully constructed.

How can that be? `this` is not used at all in the example!

It happens implicitly. The inner class contains a reference to the enclosing class, just like it has access to the enclosing class' members.

### Safety

The issue not that we don't want a reference to publish `ThisEscape`, but rather that it is not ready to be published.

The `EventListener` is being constructed and published inside of the constructor of `ThisEscape`. That means that there is point in time when the published `EventListener` has a reference to a **partially constructed** `ThisEscape`. That is why `ThisEscape` is not thread safe.

### Protection

How can we remedy this?

There are multiple options. If we don't need access to the enclosing scope of `ThisEscape`, we could make the `EventListener` an outer class.

```java
class MyEventListener implements EventListener {
    public onEvent(Event e) {
        doSomething(e);
    }
}

public class ThisEscape {
    public ThisEscape(EventSource source) {
        source.registerListener(new MyEventListener())
    }
}
```

Or we could defer registration until after construction has completed.

```java
public class ThisEscape {
    private EventSource source;

    public ThisEscape(EventSource source) {
        this.source = source;
    }

    public register() {
        source.registerListener(
            new EventListener() {
                public void onEvent(Event e) {
                    doSomething(e);
                }
            }
        )
    }
}
```

Note that an reference to the enclosing class is still being published in the latter example, but not until it has been fully constructed. We would not want to do this if we do not want the enclosing class to be published.
