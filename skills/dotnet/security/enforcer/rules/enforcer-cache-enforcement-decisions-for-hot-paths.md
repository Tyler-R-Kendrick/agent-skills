---
title: "Cache enforcement decisions for hot paths"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: enforcer, dotnet, security, access-control-list-acl-enforcement, role-based-access-control-rbac, attribute-based-access-control-abac
---

## Cache enforcement decisions for hot paths

Cache enforcement decisions for hot paths: use `IDistributedCache` to cache frequently checked permission results with short TTLs (30-60 seconds) to reduce evaluation overhead.
