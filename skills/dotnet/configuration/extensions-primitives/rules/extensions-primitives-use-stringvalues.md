---
title: "Use `StringValues"
impact: MEDIUM
impactDescription: "general best practice"
tags: extensions-primitives, dotnet, configuration, reacting-to-configuration-or-file-changes-with-ichangetoken, building-custom-change-notification-providers, efficient-string-segmentation-with-stringsegment-and-stringtokenizer
---

## Use `StringValues

Use `StringValues.IsNullOrEmpty` to check for missing or empty header values instead of null-checking and length-checking separately.
