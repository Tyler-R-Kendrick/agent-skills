---
title: "Cache authorization decisions at the edge for read-heavy workloads"
impact: MEDIUM
impactDescription: "general best practice"
tags: topaz, dotnet, security, fine-grained-permissions, relationship-based-access-control-rebac, google-zanzibar-style-authorization
---

## Cache authorization decisions at the edge for read-heavy workloads

Cache authorization decisions at the edge for read-heavy workloads: use a short TTL cache (15-30 seconds) for permission checks on resources that change infrequently.
