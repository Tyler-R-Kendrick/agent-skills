---
title: "Keep `MessageFormatter` as a singleton"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: messageformat-net, dotnet, localization, icu-messageformat-pluralization, genderselect-patterns, complex-parameterized-localization-messages
---

## Keep `MessageFormatter` as a singleton

Keep `MessageFormatter` as a singleton: in the DI container because it is stateless and thread-safe, avoiding unnecessary allocations.
