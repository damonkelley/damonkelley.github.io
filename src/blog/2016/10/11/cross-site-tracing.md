---
title: Cross-site Tracing
description: 'Understanding Cross-site Tracing (XST) attacks and how the HTTP TRACE method can bypass HttpOnly cookie protection.'
date: 2016-10-11
status: archived
---

Cross-site Tracing or XST is a form of Cross-site Scripting (XSS). One of the ways that Cross-site Scripting is effective is by stealing sensitive information stored in a user's cookies. Access to cookies can be extremely easy with a piece of rogue JavaScript.

```html
<script>alert(document.cookie);</script>
```

Cookies are often used to store a session id or token that can be referenced server-side. This is one way that sites can maintain state, such as the authentication status of a user, or a session id that identifies a server-side session.

A measure was introduced into browsers to combat this vulnerability of JavaScript's access to cookie. Browsers started respecting the `HttpOnly` tag on a cookie, which prevents the cookie from being accessible through the `document` object. With this feature, servers can specify that a cookie, such as the session id, is to be used with HTTP only.

**What is Cross-site Tracing?**

One of the less used HTTP methods is TRACE, which sends the message received by the final recipient in the body of the response message. This method might be useful in a debugging scenario, particularly if there is some intermediary between the client the server, such as a load balancer.

Because it includes the request message in the body of the response, it is possible that it may contain cookies that were tagged with `HttpOnly` when they were originally received from the server. This gives a malicious guest script access to the `HttpOnly` cookies.


As an example, imagine that a response has already been received where the `user_session` cookie is set and is tagged as `HttpOnly`.

```
Set-Cookie: user_session=abe573ef; HttpOnly
```

Then, a TRACE request is sent from the browser, which includes the `user_session` cookie.

#### Request

```http
TRACE / HTTP/1.1
Host: www.example.com
Cookie: user_session=abe573ef;
```

#### Response
```http
HTTP/1.1 200 OK
Server: Apache
Date: Tue, 31 Oct 2016 08:01:48 GMT
Connection: close
Content-Type: message/http
Content-Length: 69

TRACE / HTTP/1.1
Host: www.example.com
Cookie: user_session=abe573ef;
```

The `user_session` is in the body of the response to the TRACE request, which means the JavaScript code that executed the request now has access to the `user_session`.

### Prevention

One way to protect against this vulnerability is to disable TRACE requests on your web server. From my research, it appears that most web servers either do not support TRACE, or disable it by default.

Further, modern browsers have disabled the ability to issue TRACE requests via JavaScript.


---
Sources:

[OWASP - Cross Site Tracing](https://www.owasp.org/index.php/Cross_Site_Tracing)
