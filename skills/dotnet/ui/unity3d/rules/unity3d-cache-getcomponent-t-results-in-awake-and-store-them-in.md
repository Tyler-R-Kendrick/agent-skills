---
title: "Cache `GetComponent<T>()` results in `Awake()` and store them in private fields"
impact: MEDIUM
impactDescription: "general best practice"
tags: unity3d, dotnet, ui, building-2d-and-3d-games, simulations, arvr-experiences
---

## Cache `GetComponent<T>()` results in `Awake()` and store them in private fields

Cache `GetComponent<T>()` results in `Awake()` and store them in private fields: rather than calling `GetComponent` every frame in `Update()`; each `GetComponent` call performs a runtime type lookup on the GameObject's component list, and calling it 60+ times per second across hundreds of objects creates measurable CPU overhead.
