---
title: "When migrating from Spring"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: spring-net, dotnet, dependency-injection, xml-based-dependency-injection-in-legacy-net-framework-applications, aspect-oriented-programming-aop-with-method-interception, declarative-transaction-management
---

## When migrating from Spring

When migrating from Spring.NET to Microsoft.Extensions.DependencyInjection, replace XML object definitions with `IServiceCollection` registrations incrementally, module by module.
