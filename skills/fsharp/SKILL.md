---
description: Guidance for F# functional-first programming language.
metadata:
  displayName: F#
---

# F#

## Overview
F# is a functional-first programming language for .NET that emphasizes immutability, type inference, and expressive syntax.

## Key Features
- **Type Inference**: Minimal type annotations
- **Pattern Matching**: Powerful destructuring
- **Discriminated Unions**: Type-safe modeling
- **Computation Expressions**: Custom control flow

## Example
```fsharp
type Order = 
    | Pending of OrderId
    | Confirmed of OrderId * DateTime
    | Shipped of OrderId * TrackingNumber

let processOrder order =
    match order with
    | Pending id -> confirmOrder id
    | Confirmed (id, date) -> shipOrder id
    | Shipped (id, tracking) -> printfn "Already shipped: %s" tracking
```

## Best Practices
- Prefer immutable data structures
- Use discriminated unions for domain modeling
- Leverage type inference but add annotations for public APIs
- Use pipe operator for readable data transformations
- Keep functions pure when possible
