---
title: "Pass `CultureInfo` explicitly"
impact: MEDIUM
impactDescription: "general best practice"
tags: humanizer, dotnet, general, human-readable-datetime-formatting, pluralization, number-to-words-conversion
---

## Pass `CultureInfo` explicitly

Pass `CultureInfo` explicitly: when localizing output rather than relying on `Thread.CurrentThread.CurrentCulture`, which can change unexpectedly in async code.
