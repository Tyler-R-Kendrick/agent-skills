---
title: "Choose lifetimes based on state"
impact: MEDIUM
impactDescription: "general best practice"
tags: extensions-dependency-injection, dotnet, dependency-injection, registering-and-resolving-services-in-the-built-in-net-di-container, configuring-service-lifetimes-singleton, scoped
---

## Choose lifetimes based on state

Choose lifetimes based on state: use singleton for stateless or thread-safe services, scoped for request-specific state like `DbContext`, and transient only for lightweight, no-state objects.
