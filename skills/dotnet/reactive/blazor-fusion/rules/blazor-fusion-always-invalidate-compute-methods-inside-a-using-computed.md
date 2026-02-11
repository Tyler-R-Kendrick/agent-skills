---
title: "Always invalidate compute methods inside a `using (Computed.Invalidate())` block"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: blazor-fusion, dotnet, reactive, building-blazor-applications-with-real-time-state-synchronization-using-stlfusion-computed-observables, automatic-invalidation, and-server-to-client-state-replication
---

## Always invalidate compute methods inside a `using (Computed.Invalidate())` block

Always invalidate compute methods inside a `using (Computed.Invalidate())` block: and call the same method signatures that need to be refreshed; Fusion matches invalidation targets by method identity and argument values.
