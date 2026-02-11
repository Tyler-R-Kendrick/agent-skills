---
title: "Register value resolvers and type converters in DI"
impact: MEDIUM
impactDescription: "general best practice"
tags: automapper, dotnet, mapping, convention-based-object-to-object-mapping, profile-based-mapping-configuration, flatteningunflattening
---

## Register value resolvers and type converters in DI

Register value resolvers and type converters in DI: so they can access services like `IHttpContextAccessor` or `ICurrentUser` for context-dependent mapping.
