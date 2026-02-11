---
title: "Set `IncludeDebugAssert=\"false\"` on NullGuard in production builds"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: fody, dotnet, project-system, il-weaving-at-build-time-to-inject-cross-cutting-concerns-such-as-inotifypropertychanged-implementation, null-guard-checks, method-timing
---

## Set `IncludeDebugAssert="false"` on NullGuard in production builds

Set `IncludeDebugAssert="false"` on NullGuard in production builds: to avoid Debug.Assert calls that behave differently between Debug and Release configurations and can mask runtime exceptions.
