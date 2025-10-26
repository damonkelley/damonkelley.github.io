---
title: NoClassDefFoundError
description: "Understanding Android's Java compilation process and debugging a NoClassDefFoundError caused by missing runtime dependencies."
pubDate: 'Jul 15 2016'
date: 2016-07-15 05:47 UTC
tags: android
archived: true
---

I have started working on a Android app to fit around my tictactoe project. This is my first endeavor into Android, and mobile application development as a whole. I have had to pick a part a new set of vocabulary, such as Activities, Intents, Fragments, etc., as well as familiarize myself with a more complex project structure. It has been quite a bit to digest in a short amount of time.

Once I had familiarized myself enough with the Android ecosystem to start building, I encountered an error that was quite perplexing.

```console
FATAL EXCEPTION: main
Process: me.damonkelley.tictactoe_app, PID: 2586
java.lang.NoClassDefFoundError: Failed resolution of: Lme/damonkelley/tictactoe/Space;
```

I found this error perplexing because it was a runtime error. The tictactoe library was successfully compiled, including the `Space` class, and included in the APK that was sent the emulator.

So why couldn't it find the class definition?

### How the Android platform uses Java

I discovered is that I did not have a complete understanding of how the Android ecosystem converts Java source into something the Android runtime can understand.

The Android build process has evolved over the years, and it is currently transitioning to a new compilation technique, but here is a high level summary of how Java source files are converted into Android bytecode.

#### Bird's Eye View

1. Compile the `.java` files into JVM bytecode via `javac`
2. Take the `.class` files from step 1, and any additional jars that are needed and compile them into Dalvik bytecode (`.dex` files).
3. Package the Dalvik bytecode into an APK file .

Once the APK file is created it can be deployed to a device and executed.


### Understanding the root of the issue

It turns out the issue was caused by the `Space` class' dependency on the `java.awt` package, and that package is not available in the Android runtime. I was perplexed because I did not understand how the compiler was able to compile the source files with no issue, but the runtime could not find the dependency.

With a better understanding of the compilation process, it is easier to see how I came upon the `NoClassDefFoundError`.  `javac` could compile with no issue, and the build could successfully convert `.class` files into `.dex` files. Once executed though, it looked for dependency in `java.awt` and found that it did not exist in the ART (Android Runtime).

