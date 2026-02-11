---
title: "Set enum zero values to meaningful defaults"
impact: MEDIUM
impactDescription: "general best practice"
tags: protobuf-net, dotnet, serialization, high-performance-binary-serialization, grpc-service-contracts, cross-language-data-interchange
---

## Set enum zero values to meaningful defaults

Set enum zero values to meaningful defaults: protobuf treats zero as the default; name your zero enum member `Unknown` or `Unspecified` so missing values are clearly identifiable.
