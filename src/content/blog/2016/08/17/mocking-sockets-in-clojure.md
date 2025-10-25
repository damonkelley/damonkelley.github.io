---
title: Mocking Sockets in Clojure
description: 'Creating test doubles for Java Socket objects in Clojure using proxy and closures for testing socket-based applications.'
pubDate: 'Aug 17 2016'
layout: post
date: 2016-08-17 13:07 UTC
tags: clojure, java, mocking, sockets
---

In Clojure-land we have access to a vast number of libraries via Java interop. We are free to create Java objects, and call methods on those objects, methods that might mutate the state of those objects.

For the project I have been working on, I needed to use Java's `Socket` API. One problem I faced was figuring out how create a suitable test double for the live socket object. As a relative newcomer to Clojure, it was not immediately apparent to me how I could accomplish this. This post goes over the approach that I took.

#### Creating a mock<sup>1</sup> Socket

First things first. How do we create a fake `Socket` object?

We can use `proxy`<sup>2</sup> to wrap up the `Socket` to provide an alternative implementation for some or all of the `Socket` class' methods.

```clojure
(ns blog-example.mock
  (:import java.net.Socket))

(defn socket []
    (proxy [Socket] []))
```

We want simulate that the `Socket` begins open, and closes when it receives the `close` message. This means that we need to introduce some state.

We can close over the proxy with a `let` statement and bind an atom. Here we have bound `disconnected?` to an atom set to `false`.

```clojure
(ns blog-example.mock
  (:import java.net.Socket))

(defn socket []
  (let [disconnected? (atom false)]
    (proxy [Socket] [])))
```

Then we can add implementations for `close` and `isClosed` to simulate this behaviour without actually creating a connection on the host.

```clojure
(ns blog-example.mock
  (:import java.net.Socket))

(defn socket []
  (let [disconnected? (atom false)]
    (proxy [Socket] []
      (close []
        (reset! disconnected? true))
      (isClosed []
        @disconnected?))))
```

Now our methods can modify the atom for as long as the proxy is available. Every time a new proxy is created, `disconnected?` is false until `.close` is called on it.

And here is the function that operates on the socket and its test.

```clojure
(ns blog-example.socket-io-test
  (:require [clojure.test :refer :all]
            [blog-example.mock :as mock]))

(defn close [socket]
  (doto socket (.close)))

(deftest the-closer
  (let [socket (socket "" nil)]
    (is (not (.isClosed socket)))
    (is (.isClosed (close socket)))))
```

### Reading and writing

This works fine as long as we are only creating sockets and closing them. What about when we want to read from it and write to it?

We can overload the `getInputStream` and `getOutputStream` and use the `ByteArrayInputStream` and `ByteArrayOutputStream` instead.

```clojure
(defn socket [input output]
  (let [connected? (atom true)]
    (proxy [java.net.Socket] []
      (close []
        (reset! connected? false))
      (isClosed []
        (not @connected?))
      (getOutputStream []
        output)
      (getInputStream []
        (ByteArrayInputStream.
          (.getBytes input))))))
```

`input` is will be a string that the mock will use to create a `ByteArrayInputStream`. `output` will be a `ByteArrayOutputStream`, which we can hold on to to check that our function writes to the socket.

```clojure
(ns blog-example.socket-io-test
  (:require [clojure.test :refer :all]
            [blog-example.mock :as mock]))

(defn close [socket]
  (doto socket (.close)))

(defn read-from [socket]
  (.readLine (io/reader socket)))

(defn write-to [socket string]
  (let [writer (io/writer socket)]
    (.write writer string)
    (.flush writer)
    socket))

(deftest the-closer
  (let [socket (socket "" nil)]
    (is (not (.isClosed socket)))
    (is (.isClosed (close socket)))))

(deftest the-reader
  (let [socket (socket "Data to read" nil)]
    (is (= "Data to read" (read-from socket)))))

(deftest the-writer
  (let [output (ByteArrayOutputStream.)
        socket (socket "" output)]
    (write-to socket "Data to write")
    (is (= "Data to write"(.toString output)))))
```

### Wrap up

That's it. Now we have mocked all of the behavior that we will need from the `Socket`. Inside of my project I made sure hide the `Socket` objects behind a Clojure abstraction for multiple reasons, one of which being that I wanted to be sure that this type of side-effect code did not seep into other parts of the project.

---
<sub>1. I am using _mock_ to refer a general purpose test double, and not a proper mock.</sub>

<sub>2. Subclassing can also be done with `gen-class` and `reify`. Both have there own set of trade-offs.</sub>
