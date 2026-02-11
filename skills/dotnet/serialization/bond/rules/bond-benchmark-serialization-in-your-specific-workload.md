---
title: "Benchmark serialization in your specific workload"
impact: MEDIUM
impactDescription: "general best practice"
tags: bond, dotnet, serialization, cross-platform-schema-first-serialization, compact-binary-and-fast-binary-wire-formats, schema-evolution-with-backwardforward-compatibility
---

## Benchmark serialization in your specific workload

Benchmark serialization in your specific workload: use BenchmarkDotNet to compare Compact vs. Fast vs. Simple Binary for your actual data shapes, as performance varies by schema complexity.
