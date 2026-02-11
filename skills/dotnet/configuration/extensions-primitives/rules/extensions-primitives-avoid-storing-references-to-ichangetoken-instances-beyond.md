---
title: "Avoid storing references to `IChangeToken` instances beyond..."
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: extensions-primitives, dotnet, configuration, reacting-to-configuration-or-file-changes-with-ichangetoken, building-custom-change-notification-providers, efficient-string-segmentation-with-stringsegment-and-stringtokenizer
---

## Avoid storing references to `IChangeToken` instances beyond...

Avoid storing references to `IChangeToken` instances beyond their useful lifetime; tokens are single-use and become inert after `HasChanged` returns `true`.
