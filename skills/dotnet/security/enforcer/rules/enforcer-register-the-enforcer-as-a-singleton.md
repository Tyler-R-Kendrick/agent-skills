---
title: "Register the Enforcer as a singleton"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: enforcer, dotnet, security, access-control-list-acl-enforcement, role-based-access-control-rbac, attribute-based-access-control-abac
---

## Register the Enforcer as a singleton

Register the Enforcer as a singleton: the Casbin `Enforcer` is thread-safe for reads and should be shared across requests; reload policies when they change using `LoadPolicyAsync()`.
