---
title: "Use `Akka.Persistence` for actors whose state must survive..."
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: akka-net, dotnet, eventing, actor-based-concurrency, distributed-systems, supervision-hierarchies
---

## Use `Akka.Persistence` for actors whose state must survive...

Use `Akka.Persistence` for actors whose state must survive restarts; snapshot periodically (e.g., every 100 events) to keep recovery fast.
