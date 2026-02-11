---
title: "Use Humanizer only at presentation boundaries"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: humanizer, dotnet, general, human-readable-datetime-formatting, pluralization, number-to-words-conversion
---

## Use Humanizer only at presentation boundaries

(UI, API responses, notifications) -- never store humanized strings in databases or use them for logic.
