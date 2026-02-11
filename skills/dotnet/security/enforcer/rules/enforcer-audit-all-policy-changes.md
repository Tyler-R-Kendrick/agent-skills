---
title: "Audit all policy changes"
impact: MEDIUM
impactDescription: "general best practice"
tags: enforcer, dotnet, security, access-control-list-acl-enforcement, role-based-access-control-rbac, attribute-based-access-control-abac
---

## Audit all policy changes

Audit all policy changes: log every `AddPolicyAsync`, `RemovePolicyAsync`, and `UpdatePolicyAsync` call with the actor, timestamp, and old/new values for compliance.
