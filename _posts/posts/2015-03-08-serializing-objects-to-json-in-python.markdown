---
layout: post
title: "Serializing Objects to JSON in Python"
modified: 
categories: posts
excerpt: I was recently working on a side project where I wanted to recursively serialize an object that contained a number objects stored in instance variables. While perusing Stack Overflow, I came across this [elegant solution](http://stackoverflow.com/questions/3768895/python-how-to-make-a-class-json-serializable)
tags: [python, json, serialize]
image:
  feature:
date: 2015-03-08T20:36:23-05:00
---
I was recently working on a side project where I wanted to recursively serialize an object that contained a number objects stored in instance variables. While perusing Stack Overflow, I came across this [elegant solution](http://stackoverflow.com/questions/3768895/python-how-to-make-a-class-json-serializable) posted by [Onur Yildirim](http://stackoverflow.com/users/112731/onur-yildirim).

{% highlight python %}
import json

class SomeClass(object):
    def to_json(self):
        return json.dumps(self, default=lambda o: o.__dict__,
                          sort_keys=True, indent=4)
{% endhighlight %}

During my quest for said elegant solution, I found that many people have asked this same question on SO, and very few of the answers, even the _accepted_ ones, came close to being concise as the one above. This won't work in every situation, but it has proved to be a flexible solution for me thus far.

