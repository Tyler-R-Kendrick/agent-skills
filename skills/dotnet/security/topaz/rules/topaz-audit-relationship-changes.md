---
title: "Audit relationship changes"
impact: MEDIUM
impactDescription: "general best practice"
tags: topaz, dotnet, security, fine-grained-permissions, relationship-based-access-control-rebac, google-zanzibar-style-authorization
---

## Audit relationship changes

Audit relationship changes: log all `SetRelation` and `DeleteRelation` calls with the actor, timestamp, and affected subject/object for compliance and debugging.
