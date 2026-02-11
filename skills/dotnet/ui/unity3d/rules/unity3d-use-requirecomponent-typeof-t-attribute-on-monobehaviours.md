---
title: "Use `[RequireComponent(typeof(T))]` attribute on MonoBehaviours that depend on specific components"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: unity3d, dotnet, ui, building-2d-and-3d-games, simulations, arvr-experiences
---

## Use `[RequireComponent(typeof(T))]` attribute on MonoBehaviours that depend on specific components

(e.g., `Rigidbody`, `Collider`, `AudioSource`) so Unity automatically adds the required component when the script is attached and prevents accidental removal in the Inspector.
