---
title: "Use MessageFormat for any string that contains a count"
impact: MEDIUM
impactDescription: "general best practice"
tags: messageformat-net, dotnet, localization, icu-messageformat-pluralization, genderselect-patterns, complex-parameterized-localization-messages
---

## Use MessageFormat for any string that contains a count

Use MessageFormat for any string that contains a count: rather than conditional logic in code; the plural rules are language-specific and cannot be replicated with simple `if/else`.
