---
title: "Set `RigidBody3D.Mass` to physically plausible values"
impact: MEDIUM
impactDescription: "general best practice"
tags: wave-engine, dotnet, ui, building-2d-and-3d-games, simulations, and-interactive-3d-applications-using-the-wave-engine-evergine-with-c-use-when-you-need-a-component-based-game-engine-with-net-integration
---

## Set `RigidBody3D.Mass` to physically plausible values

(e.g., 1-100 kg for game objects) and configure `Restitution` and `Friction` per material rather than per object, because unrealistic mass ratios (0.001 vs 10000) cause physics solver instability, tunneling, and jittering.
