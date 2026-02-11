---
title: "Avoid `.Humanize()` on untrusted user input strings"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: humanizer, dotnet, general, human-readable-datetime-formatting, pluralization, number-to-words-conversion
---

## Avoid `.Humanize()` on untrusted user input strings

Humanizer assumes well-formed PascalCase or snake_case identifiers and may produce unexpected output on arbitrary text.
