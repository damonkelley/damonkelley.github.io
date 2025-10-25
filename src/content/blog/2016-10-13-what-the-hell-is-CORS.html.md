---
title: What the hell is CORS
description: 'Demystifying Cross-Origin Resource Sharing (CORS) and the Same-origin Policy that protects web browsers from malicious sites.'
pubDate: 'Oct 13 2016'
layout: post
date: 2016-10-13 01:07 UTC
tags: browser, CORS, security
---

At some point you may have been going about your business coding up some JavaScript, and you encountered an error message regarding CORS or something about `Access-Control-Allow-Origin`. It seems that many developers do not fully understand CORS, which, historically, was the case for me as well.

CORS is an acronym that stands for Cross-origin Resource Sharing. This is a mechanism that allows resources to be shared between domains. CORS exists because of something called the Same-origin policy.

### Same-origin Policy

Web browsers enforce the Same-origin policy. This policy restricts a web page from getting or changing a resource from a domain that is not of the same origin as the requesting page. For example, if you open the JavaScript console on this page, and try to issue a GET request to `https://facebook.com`, you will probably see something alongs the lines of 

```console
XMLHttpRequest cannot load https://facebook.com/. No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'https://blog.damonkelley.me' is therefore not allowed access.
```

If such a policy were not in place, a malicious site would be able act like a user to another site. If you login to Facebook and then visit a malicious site, the malicious site could visit Facebook and masquerade as you via JavaScript. It would be capable of this by using the active session that was created when you logged in. 

It is worth noting that this policy only applies to executing JavaScript, notably XML HTTP requests (xhr). Browsers will happily load resources such as images, stylesheets, JavaScript files, iframes, and videos. These resources do not pose the same risk that executing JavaScript code does.

### Cross-origin Resource Sharing

CORS is a way through the Same-origin policy. There are many scenarios where it is legitimate for a page on a different domain to interact with a resource on another domain. This is likely to occur in a web application that has a separate frontend and backend that communicate with each other over an HTTP API. This might be `app.example.com` trying to request data from `api.example.com`.

In order to inform the browser that this channel of communication is OK, the server must respond with a `Access-Control-Allow-Origin` header that matches the origin of the request.

```console
Access-Control-Allow-Origin: app.example.com
```

### (Mostly) the respsonsibility of the browser

An important thing to understand is that both Same-origin policy and Cross-origin resource sharing are responsibilities of the browser. The browser is what enforces Same-origin policy as a security measure, thus it is the entity that allows for CORS. The server is only involved to the extent that it dictates which origins the browser should allow.

---
Sources:

[Wikipedia - Same-origin Policy](https://en.wikipedia.org/wiki/Same-origin_policy)

[Wikipedia - Cross-origin resource sharing](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
