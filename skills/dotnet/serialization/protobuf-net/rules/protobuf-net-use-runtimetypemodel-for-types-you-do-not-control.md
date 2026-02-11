---
title: "Use `RuntimeTypeModel` for types you do not control"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: protobuf-net, dotnet, serialization, high-performance-binary-serialization, grpc-service-contracts, cross-language-data-interchange
---

## Use `RuntimeTypeModel` for types you do not control

Use `RuntimeTypeModel` for types you do not control: configure serialization for third-party DTOs at startup rather than requiring attribute annotations on external types.
