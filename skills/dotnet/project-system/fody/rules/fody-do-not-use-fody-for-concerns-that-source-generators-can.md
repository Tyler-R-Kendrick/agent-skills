---
title: "Do not use Fody for concerns that source generators can handle transparently"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: fody, dotnet, project-system, il-weaving-at-build-time-to-inject-cross-cutting-concerns-such-as-inotifypropertychanged-implementation, null-guard-checks, method-timing
---

## Do not use Fody for concerns that source generators can handle transparently

Do not use Fody for concerns that source generators can handle transparently: because source generators produce inspectable C# code that is easier to debug, test, and understand than IL-level modifications.
