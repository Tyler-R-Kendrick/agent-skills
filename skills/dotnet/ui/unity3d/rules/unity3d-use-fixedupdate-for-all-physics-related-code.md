---
title: "Use `FixedUpdate()` for all physics-related code"
impact: MEDIUM
impactDescription: "general best practice"
tags: unity3d, dotnet, ui, building-2d-and-3d-games, simulations, arvr-experiences
---

## Use `FixedUpdate()` for all physics-related code

(Rigidbody forces, raycasts for physics queries, collision checks) because `FixedUpdate` runs at a deterministic timestep synchronized with the physics engine; physics code in `Update()` produces frame-rate-dependent behavior that varies across devices.
