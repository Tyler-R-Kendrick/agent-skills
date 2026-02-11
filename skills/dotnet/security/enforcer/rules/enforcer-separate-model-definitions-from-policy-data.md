---
title: "Separate model definitions from policy data"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: enforcer, dotnet, security, access-control-list-acl-enforcement, role-based-access-control-rbac, attribute-based-access-control-abac
---

## Separate model definitions from policy data

Separate model definitions from policy data: keep `model.conf` in source control and policies in a database; never mix model logic with policy rules.
