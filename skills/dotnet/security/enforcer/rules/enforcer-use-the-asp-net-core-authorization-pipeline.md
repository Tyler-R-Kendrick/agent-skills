---
title: "Use the ASP.NET Core authorization pipeline"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: enforcer, dotnet, security, access-control-list-acl-enforcement, role-based-access-control-rbac, attribute-based-access-control-abac
---

## Use the ASP.NET Core authorization pipeline

Use the ASP.NET Core authorization pipeline: implement `IAuthorizationHandler` with a custom `IAuthorizationRequirement` rather than calling `EnforceAsync` directly in controllers.
