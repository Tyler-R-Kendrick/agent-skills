---
title: "Mark methods as `virtual` when using AOP proxies, because..."
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: spring-net, dotnet, dependency-injection, xml-based-dependency-injection-in-legacy-net-framework-applications, aspect-oriented-programming-aop-with-method-interception, declarative-transaction-management
---

## Mark methods as `virtual` when using AOP proxies, because...

Mark methods as `virtual` when using AOP proxies, because Spring.NET's proxy mechanism requires virtual methods to intercept calls on class-based proxies.
