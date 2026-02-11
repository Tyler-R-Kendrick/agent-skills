---
title: "Start field numbers at 1 and leave gaps for future fields"
impact: MEDIUM
impactDescription: "general best practice"
tags: protobuf-net, dotnet, serialization, high-performance-binary-serialization, grpc-service-contracts, cross-language-data-interchange
---

## Start field numbers at 1 and leave gaps for future fields

Start field numbers at 1 and leave gaps for future fields: use 1, 2, 3 for initial fields and reserve ranges (e.g., 10-19 for a logical group) to allow inserting related fields later.
