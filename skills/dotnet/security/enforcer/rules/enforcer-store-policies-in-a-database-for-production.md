---
title: "Store policies in a database for production"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: enforcer, dotnet, security, access-control-list-acl-enforcement, role-based-access-control-rbac, attribute-based-access-control-abac
---

## Store policies in a database for production

Store policies in a database for production: use `Casbin.Adapter.EFCore` or a Redis adapter instead of CSV files to support dynamic policy management and horizontal scaling.
