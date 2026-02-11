---
title: "Use nullable annotations (`string?`) to control NullGuard behavior"
impact: MEDIUM
impactDescription: "general best practice"
tags: fody, dotnet, project-system, il-weaving-at-build-time-to-inject-cross-cutting-concerns-such-as-inotifypropertychanged-implementation, null-guard-checks, method-timing
---

## Use nullable annotations (`string?`) to control NullGuard behavior

Use nullable annotations (`string?`) to control NullGuard behavior: rather than `[AllowNull]` attributes; NullGuard.Fody respects the nullable annotation context and skips parameters annotated as nullable.
