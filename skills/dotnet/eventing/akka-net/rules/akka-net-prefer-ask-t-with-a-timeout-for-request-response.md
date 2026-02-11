---
title: "Prefer `Ask<T>` with a timeout for request-response..."
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: akka-net, dotnet, eventing, actor-based-concurrency, distributed-systems, supervision-hierarchies
---

## Prefer `Ask<T>` with a timeout for request-response...

Prefer `Ask<T>` with a timeout for request-response interactions; use `Tell` for fire-and-forget to avoid unnecessary blocking.
