---
title: "Enable `ValidateOnBuild` in development environments to..."
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: extensions-dependency-injection, dotnet, dependency-injection, registering-and-resolving-services-in-the-built-in-net-di-container, configuring-service-lifetimes-singleton, scoped
---

## Enable `ValidateOnBuild` in development environments to...

Enable `ValidateOnBuild` in development environments to catch missing registrations at startup rather than discovering them at runtime through `InvalidOperationException`.
