---
title: "Use `[SerializeField] private` instead of `public` fields for Inspector-exposed values"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: unity3d, dotnet, ui, building-2d-and-3d-games, simulations, arvr-experiences
---

## Use `[SerializeField] private` instead of `public` fields for Inspector-exposed values

Use `[SerializeField] private` instead of `public` fields for Inspector-exposed values: so that other scripts cannot directly modify the field, maintaining encapsulation; public fields bypass property setters, making it impossible to validate or react to changes at assignment time.
