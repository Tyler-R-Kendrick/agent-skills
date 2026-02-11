---
title: "Separate read models from write models."
impact: MEDIUM
impactDescription: "general best practice"
tags: erd, specs, diagramming, database-schema-design, data-modeling, entity-relationship-diagrams
---

## Separate read models from write models.

In CQRS or event-sourced systems, the write-side schema should be normalized, while the read-side can be denormalized for query performance.
