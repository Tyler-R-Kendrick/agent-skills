---
title: "Cancel `CancellationTokenSource` in `OnDisable()` or `OnDestroy()` for all async operations"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: unity3d, dotnet, ui, building-2d-and-3d-games, simulations, arvr-experiences
---

## Cancel `CancellationTokenSource` in `OnDisable()` or `OnDestroy()` for all async operations

Cancel `CancellationTokenSource` in `OnDisable()` or `OnDestroy()` for all async operations: to prevent `MissingReferenceException` when a coroutine or Task completes after the GameObject has been destroyed; this is especially critical for scene transitions where objects are destroyed mid-operation.
