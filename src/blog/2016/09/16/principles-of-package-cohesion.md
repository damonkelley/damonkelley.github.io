---
title: The Principles of Package Cohesion
description: 'Exploring the three principles of package cohesion - REP, CRP, and CCP - for allocating classes to packages effectively.'
date: 2016-09-16
archived: true
---

The Principles of Package Design are principles to help us design packages. The Principles of Package Cohesion are a subset of the Principles of Package Design that deal with how to allocate classes to packages.

The subset is made up of three principles.

1. The Reuse-Release Equivalence Principle
2. The Common-Reuse Principle
3. The Common-Closure Principle


### Reuse-Release Equivalence Principle (REP)

This principle basically states that if a package is to be reusable, it must be released. Releasing a package entails version tracking, support, bug fixes, etc.

This principle also states that if a package contains classes that are to be reused, then all of the classes in the package should be reusable. Either all of them are reusable or none of them are.

### Common-Reuse Principle (CRP)

This principle is pretty simple. A package should contain classes that are to be used together.

It does not make much sense to package two classes up that are unrelated. Most likely, it would not make much sense to package up a `Bird` class with a `WebSocket` class.

This principle is similar to the Interface-Segregation Principle except for packages.


### Common-Closure Principle (CCP)

If CRP is like ISP for packages, then this principle is like the Single Responsibility Principle for packages.

CCP states that a package should have a single reason to change. If a change occurs in one class of the package, it affects all of the classes in the package.

This principle aimed at isolating the necessary changes to a minimal number of packages. If classes that change for a common reason are spread out into multiple packages, when the time comes to make a change that affects all of them, each package will have to be revalidated and redistributed.
