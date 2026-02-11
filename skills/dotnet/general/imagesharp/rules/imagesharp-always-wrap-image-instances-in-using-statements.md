---
title: "Always wrap `Image` instances in `using` statements"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: imagesharp, dotnet, general, image-resizing, cropping, format-conversion
---

## Always wrap `Image` instances in `using` statements

Always wrap `Image` instances in `using` statements: because they allocate large pixel buffers that must be returned to the memory pool on dispose.
