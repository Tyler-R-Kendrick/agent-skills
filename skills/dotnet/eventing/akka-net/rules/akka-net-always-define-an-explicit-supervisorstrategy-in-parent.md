---
title: "Always define an explicit `SupervisorStrategy` in parent..."
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: akka-net, dotnet, eventing, actor-based-concurrency, distributed-systems, supervision-hierarchies
---

## Always define an explicit `SupervisorStrategy` in parent...

Always define an explicit `SupervisorStrategy` in parent actors so failure handling is intentional, not default.
