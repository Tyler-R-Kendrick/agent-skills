---
title: "Use `.Dehumanize()` and `.DehumanizeTo<T>()`"
impact: MEDIUM
impactDescription: "general best practice"
tags: humanizer, dotnet, general, human-readable-datetime-formatting, pluralization, number-to-words-conversion
---

## Use `.Dehumanize()` and `.DehumanizeTo<T>()`

Use `.Dehumanize()` and `.DehumanizeTo<T>()`: only for round-tripping display strings back to enums or known values, not for parsing arbitrary user input.
