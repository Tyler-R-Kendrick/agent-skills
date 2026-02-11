---
title: "Avoid string-based APIs like `GameObject.Find(\"PlayerObject\")` and `SendMessage(\"TakeDamage\")`"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: unity3d, dotnet, ui, building-2d-and-3d-games, simulations, arvr-experiences
---

## Avoid string-based APIs like `GameObject.Find("PlayerObject")` and `SendMessage("TakeDamage")`

Avoid string-based APIs like `GameObject.Find("PlayerObject")` and `SendMessage("TakeDamage")`: because they perform runtime string comparisons, bypass compile-time type checking, and silently fail if the name changes; use direct references via `[SerializeField]`, events, or interfaces instead.
