---
title: "Use `CheckPermission` instead of `CheckRelation`"
impact: MEDIUM
impactDescription: "general best practice"
tags: topaz, dotnet, security, fine-grained-permissions, relationship-based-access-control-rebac, google-zanzibar-style-authorization
---

## Use `CheckPermission` instead of `CheckRelation`

Use `CheckPermission` instead of `CheckRelation`: permissions resolve the full inheritance graph (owner implies editor implies viewer), while relation checks only match direct assignments.
