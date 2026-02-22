---
title: Creating Event Listeners in Java
description: 'Demystifying event listeners in Java by building a custom event system for publishing notifications.'
date: 2016-08-03
status: archived
---


Events and event listeners have always seemed opaque to me. GUI programming and front-web programming will often use these mechanisms heavily. I recently had the need to create my own event and event listener in Java, and it shed a light on how it works.

In order to demonstrate this, let's will pretend that we have a digital magazine call _EZine_. There is a web app for it, and we want to extend it so we can hook into when our issues are published to let our followers on Twitter know a new issue is out.

Inside of our app, we have a class called `EZinePublisher` that is responsible for publishing the issue.

```java
class EZinePublisher {
    private EZine eZine;

    EZinePublisher(EZine eZine) {
        this.eZine = eZine;
    }

    public void publish() {
        eZine.setPublished(true);
    }
}
```

Let's modify this to register an event listener and emit an event. How do we do that? Let's make a TODO list.

### What we need

1. A way to allow anyone to register a listener.
2. Hooking into the _publish_ event
3. Register an event

### Registration

We need some way to register a listener<sup>1</sup>. Lets start by adding a method to the `EZinePublisher`. We will call it `registerListener`.

<sub>1. A listener is just an object which the registrar will invoke one or more methods on.</sub>

```java
class EZinePublisher {
    // ...
    public void registerListener(Object listener) {

    }
}
```

The `EZinePublisher` will need a way to keep track of these listeners, so we will add a `listeners` field, and we will append each listener to it when it is registered.

```java
class EZinePublisher {
    private List<Object> listeners = new ArrayList<Object>();
    // ...
    public void registerListener(Object listener) {
        listeners.add(listener);
    }
}
```

We have one problem though. With mere `Object`s, there isn't much for our listeners do once our event is occurs. We are limited to the API of `Object` when it comes to the code we want to run when our event occurs.

Wouldn't it be nice if we could have some new type that we could inject whatever code we want to run into? That sounds like a job for an interface.

```java
class EZinePublisher {
    private List<OnPublishEventListener> listeners = new ArrayList<OnPublishEventListener>();
    // ...
    public interface OnPublishEventListener {
        void onPublish();
    }
    public void registerListener(OnPublishEventListener listener) {
        listeners.add(listener);
    }
}
```

We have added a new public `OnPublishEventListener` interface inside the `EZinePublisher` class, and we modified our registration method and `listeners` collection to accept instances of `OnPublishEventListener`, instead of a plain `Object`.

Now any class who would like to subscribe to the _publish_ event only needs to implement the `OnPublishEventListener` interface, and register it with the `EZinePublisher`.

That was the last step. The `EZinePublisher` has everything it needs to start registering event listeners. Now we need to hook into our _publish_ event.

### Hooking into _publish_

Our event occurs whenever we publish the EZine to our readers. What we need to do now is call the `onPublish` method of each of our registered listeners.

That might look something like this

```java
class EZinePublisher {
    // ...
    public void publish() {
        eZine.setPublished(true);
        listeners.forEach(listener -> listener.onPublish());
    }
}
```

Simple. Now we are "emitting" an event, and the listeners are reacting to it.


### One Last Look

Let's take a look at the `EZinePublisher` including all of the new event listening mechanisms, before we move on to creating and registering an event listener with the `EZinePublisher`.

```java
class EZinePublisher {
    private EZine eZine;
    private List<OnPublishEventListener> listeners = new ArrayList<OnPublishEventListener>();

    EZinePublisher(EZine eZine) {
        this.eZine = eZine;
    }

    public interface OnPublishEventListener {
        void onPublish();
    }

    public void registerListener(OnPublishEventListener listener) {
        listeners.add(listener);
    }

    public void publish() {
        eZine.setPublished(true);
        listeners.forEach(listener -> listener.onPublish());
    }
}
```

### An Outsiders Perspective


Let's look at this from the perspective of the listener. We need to create a listener that will tweet when an issue is published.

```java
class TweetOnPublishListener implements EZinePublisher.OnPublishEventListener {
    public void onPublish() {
        new TwitterClient("APIKEY").tweet("A new issue of the EZine is out!\n" + 
                                          "https://ezine.pub");
    }
}
```

And then we simply register it with the publisher.

```java
EZinePublisher publisher = new EZinePublisher(eZine);

publisher.registerListener(new TweetOnPublishListener());
publisher.publish();
```

Now, every time the `publish` method is invoke, we will also notify the `TweetOnPublishListener` that it should tweet.

### Open/Closed

Events and event listeners support the Open/Closed Principle. By supporting events and listeners in our `EZinePublisher` we have closed the class for modification, and opened it up to be extended through the _publish_ hook.

In other words, if we wanted to also post to Facebook when a new issue is published, we don't have to change any of the code in `EZinePublisher` -- we simply add another listener.

```java
EZinePublisher publisher = new EZinePublisher(eZine);

publisher.registerListener(new TweetOnPublishListener());
publisher.registerListener(new PostToFacebookOnPublishListener());
publisher.publish();
```

And if we also wanted to send and email.

```java
EZinePublisher publisher = new EZinePublisher(eZine);

publisher.registerListener(new TweetOnPublishListener());
publisher.registerListener(new PostToFacebookOnPublishListener());
publisher.registerListener(new SendEmailOnPublishListener());
publisher.publish();
```

### Wrap up

Events and listeners can be hard to understand at first. There is a handful of terms that are used to describe it, and those terms can obfuscate what is really going under the hood. (They did for me.) Terms like _emit_, and _event_, and _listening_. These terms can suggest that there is some sort of "magic". Hopefully, these are less magical walking through an implementation.
