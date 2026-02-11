---
title: "Avoid registering services with both a concrete type and an..."
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: extensions-dependency-injection, dotnet, dependency-injection, registering-and-resolving-services-in-the-built-in-net-di-container, configuring-service-lifetimes-singleton, scoped
---

## Avoid registering services with both a concrete type and an...

Avoid registering services with both a concrete type and an interface separately if they should share the same instance; use a forwarding registration pattern instead.
