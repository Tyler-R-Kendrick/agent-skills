---
title: "Cache compiled templates or precomputed humanized values"
impact: MEDIUM
impactDescription: "general best practice"
tags: humanizer, dotnet, general, human-readable-datetime-formatting, pluralization, number-to-words-conversion
---

## Cache compiled templates or precomputed humanized values

Cache compiled templates or precomputed humanized values: when rendering lists, since calling `.Humanize()` in tight loops on thousands of items adds measurable overhead.
