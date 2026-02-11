---
title: "Profile with the Unity Profiler (`Window > Analysis > Profiler`) before optimizing"
impact: MEDIUM
impactDescription: "general best practice"
tags: unity3d, dotnet, ui, building-2d-and-3d-games, simulations, arvr-experiences
---

## Profile with the Unity Profiler (`Window > Analysis > Profiler`) before optimizing

Profile with the Unity Profiler (`Window > Analysis > Profiler`) before optimizing: and focus on the top three CPU or GPU bottlenecks per frame; premature optimization of code that consumes 0.1ms per frame wastes development time when the actual bottleneck is a 12ms shader or an unoptimized mesh.
