---
title: "Keep Olive usage in application/service layers"
impact: MEDIUM
impactDescription: "general best practice"
tags: olive, dotnet, general, common-string-extensions-null-safe-operations, validation, collection-utilities
---

## Keep Olive usage in application/service layers

Keep Olive usage in application/service layers: rather than in domain entities, since domain types should be self-validating and not depend on utility extensions.
