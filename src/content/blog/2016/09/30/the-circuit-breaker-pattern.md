---
title: The Circuit Breaker
description: 'Implementing the Circuit Breaker stability pattern to protect against failures from unavailable services or resources.'
pubDate: 'Sep 30 2016'
layout: post
date: 2016-09-30 03:24 UTC
tags: stability pattern, pattern, failure handling
---

The Circuit Breaker is one of the stability patterns discussed in Michael Nygard's _Release It!_. This pattern is pattern designed to emulate a circuit breaker found in any residential home.

The idea is to use a this pattern to protect against failures due to some service or resource being unavailable. The circuit breaker will will prevent the call to the resource or service until it can determine that it is safe to continue using it.

The circuit breaker is typically implemented as a state machine. Nygard recommends using three states inside of the machine.

1. **Closed** - this is the "normal" state. This is the state when it expects everything to work correctly most of the time. The circuit breaker remains in this state until the number of fails reaches a designated threshold.

2. **Open** - this is the state that is entered when the fail threshold is exceeded. It remains in this state for a designated period of time.

3. **Half-open** - after the time period in the fail state has passed, the Circuit breaker transitions to this state, which will call through to the resource. If the call fails, it will transition back to Open. If it succeeds, it will transition back to Closed.

Here is a Circuit Breaker that I hacked together<sup>1</sup> in Python. The idea here is that `RequestsCircuitBreaker` would receive function that makes an HTTP request. This circuit breaker is designed to prevent HTTP requests. Two examples where the breaker might be tripped is if a request is made to a server if it is not behaving as expected, or if the request can't be made due to a local networking issue.

```python
class RequestsCircuitBreaker(object):
    def __init__(self, request, timeout=20000, threshold=10):
        self.state = Closed(self, request, timeout, threshold)

    def call(self):
        self.state.call()


class State(object):
    def __init__(self, machine, request, timeout=20000, threshold=10):
        self.machine = machine
        self.request = request
        self.timeout = timeout
        self.threshold = threshold

    def call(self):
        raise NotImplemented()


class HalfOpen(State):
    def call(self):
        try:
            self.request()
        except HTTPException:
            self.trip()
        else:
            self.reset()

    def reset(self):
        self.machine.state = Closed(**vars(self))

    def trip(self):
        self.machine.state = Open(**vars(self))


class Open(State):
    def call(self):
        if self.timeout_expired():
            self.attempt_reset()

    def timeout_expired(self):
        return (self.start_time - time.now()) > self.timeout

    def attempt_reset(self):
        self.machine.state = HalfOpen(**vars(self))


class Closed(State):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.count = 0

    def call(self, circuit_breaker):
        try:
            self.request()
        except HTTPException:
            self.failed(circuit_breaker)

    def failed(self):
        if self.count > self.threshold:
            self.trip()

    def trip(self):
        self.machine.state = Open(self.machine, self.request, self.timeout, self.threshold)
```

---

<sub>1. I make no guarantees about its runability or correctness.</sub>
