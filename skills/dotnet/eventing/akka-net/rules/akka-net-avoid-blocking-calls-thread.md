---
title: "Avoid blocking calls (`Thread"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: akka-net, dotnet, eventing, actor-based-concurrency, distributed-systems, supervision-hierarchies
---

## Avoid blocking calls (`Thread

Avoid blocking calls (`Thread.Sleep`, synchronous I/O) inside actors; use `async`/`await` with `ReceiveAsync` or pipe results with `PipeTo`.
