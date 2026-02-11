---
title: "Write integration tests that build the real..."
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: extensions-dependency-injection, dotnet, dependency-injection, registering-and-resolving-services-in-the-built-in-net-di-container, configuring-service-lifetimes-singleton, scoped
---

## Write integration tests that build the real...

Write integration tests that build the real `IServiceProvider` from your registration code and call `GetRequiredService<T>` for critical services to verify the container is wired correctly.
