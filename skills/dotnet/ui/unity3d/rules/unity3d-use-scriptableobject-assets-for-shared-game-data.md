---
title: "Use `ScriptableObject` assets for shared game data"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: unity3d, dotnet, ui, building-2d-and-3d-games, simulations, arvr-experiences
---

## Use `ScriptableObject` assets for shared game data

(weapon stats, enemy configurations, dialog trees) instead of hardcoding values in MonoBehaviour fields or static variables, because ScriptableObjects are editable in the Inspector, shareable across prefabs, and do not require scene references.
