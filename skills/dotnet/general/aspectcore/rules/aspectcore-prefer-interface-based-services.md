---
title: "Prefer interface-based services"
impact: LOW
impactDescription: "recommended but situational"
tags: aspectcore, dotnet, general, cross-cutting-concerns-via-interceptors, method-level-aop, dynamic-proxies
---

## Prefer interface-based services

Prefer interface-based services: over class-based services because AspectCore can proxy all interface methods but only virtual methods on classes.
