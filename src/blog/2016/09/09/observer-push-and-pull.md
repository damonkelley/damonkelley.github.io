---
title: The Spectrum of the Observer Pattern
description: 'Understanding the Observer pattern spectrum - comparing push and pull models for notifying observers of changes.'
date: 2016-09-09
archived: true
---

The Observer pattern can be implemented on a spectrum. At one end of the spectrum is the pull model, on the other end is the push model.

### Pull Model

In the push model, the observer is notified by the subject, but it is up to the observer to get that new data. The notification at this end of the spectrum is nothing more than a _ping_.

In the example below, we have a `Counter` which can be observed. Every time `tick` is called, it will notify all of its observers.

It exposes the `getCount` method so that observers can get the new data after they have been notified.

This model also implies that the observer has to hold on to a reference of the subject.

```java
class Counter {
    private List<Observer> observers = new ArrayList<>();

    private int count = 0;

    public void tick() {
        count++;
        notify();
    }

    public int getCount() {
        return count;
    }

    public void registerObserver(Observer observer) {
        observers.add(observer);
    }

    public void notify() {
        observers.forEach(observer -> observer.update());
    }
}
```

```java
class CounterObserver implements Observer {
    private Counter counter;

    public CounterObserver(Counter counter) {
        counter.registerObserver(this); // The observer registers itself
        this.counter = counter;         // and holds on to a reference of the subject
    }

    public void update() {
        System.out.println("Current count is " + counter.getCount()); // pull in the count
    }
}
```

```java
class Main {
    public static void main(String[] args) {
        Counter counter = new Counter();
        new CounterObserver(counter);

        counter.tick();
        counter.tick();
        counter.tick();
        counter.tick();
        counter.tick();
    }
}
```

Output:

```console
Current count is 1
Current count is 2
Current count is 3
Current count is 4
Current count is 5
```


### Push model

The push model will send the data to the observer via the `notify` method. Since the data is being pushed to the observer, observer does not need to hold a reference to the subject. Notice that the `CounterObserver` implementation here is much simpler.

```java
class Counter {
    private List<Observer> observers = new ArrayList<>();

    private int count = 0

    public void tick() {
        count++;
        notify();
    }

    public void registerObserver(Observer observer) {
        observers.add(observer);
    }

    public void notify() {
        observers.forEach(observer -> observer.update(count)); // pushing count to the observer
    }
}
```

```java
class ConterObserver implements Observer {
    public void update(count) {
        System.out.println("Current count is " + count);
    }
}
```

```java
class Main {
    public static void main(String[] args) {
        Counter counter = new Counter();
        counter.registerObserver(new Observer());

        counter.tick();
        counter.tick();
        counter.tick();
        counter.tick();
        counter.tick();
    }
}
```

Output:

```console
Current count is 1
Current count is 2
Current count is 3
Current count is 4
Current count is 5
```

### When to move toward a particular model

#### Pull

The pull model is might be appropriate when it is more convenient to have the observers get the data than to send it as an argument.

This model also has the advantage that it can be more reusable. It is possible that not all observers will require the same data from the subject. In this case, it might be better to leave it up to the observer to query for what it needs.

#### Push

Push is useful when the observer does not need to know about the subject. It is also handy when the observer requires little or no data from the subject.
