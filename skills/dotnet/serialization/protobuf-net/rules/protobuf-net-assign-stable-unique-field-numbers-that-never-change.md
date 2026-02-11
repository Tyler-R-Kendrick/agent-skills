---
title: "Assign stable, unique field numbers that never change"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: protobuf-net, dotnet, serialization, high-performance-binary-serialization, grpc-service-contracts, cross-language-data-interchange
---

## Assign stable, unique field numbers that never change

Assign stable, unique field numbers that never change: once a `[ProtoMember(N)]` number is assigned and data is serialized, that number is permanently bound to that field; never reuse numbers from removed fields.
