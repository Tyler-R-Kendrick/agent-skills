---
title: "Exclude generated or third-party code from weaving using `[DoNotNotify]`, `[NullGuardIgnore]`, or assembly-level attributes"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: fody, dotnet, project-system, il-weaving-at-build-time-to-inject-cross-cutting-concerns-such-as-inotifypropertychanged-implementation, null-guard-checks, method-timing
---

## Exclude generated or third-party code from weaving using `[DoNotNotify]`, `[NullGuardIgnore]`, or assembly-level attributes

Exclude generated or third-party code from weaving using `[DoNotNotify]`, `[NullGuardIgnore]`, or assembly-level attributes: to prevent unexpected behavior in code you do not control.
