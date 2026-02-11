---
title: "Never inject a scoped service into a singleton service --..."
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: extensions-dependency-injection, dotnet, dependency-injection, registering-and-resolving-services-in-the-built-in-net-di-container, configuring-service-lifetimes-singleton, scoped
---

## Never inject a scoped service into a singleton service --...

Never inject a scoped service into a singleton service -- this causes the scoped service to act as a singleton (captive dependency); enable `ValidateScopes` in development to detect this.
