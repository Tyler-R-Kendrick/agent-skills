---
title: "When building a custom `ConfigurationProvider`, call..."
impact: MEDIUM
impactDescription: "general best practice"
tags: extensions-primitives, dotnet, configuration, reacting-to-configuration-or-file-changes-with-ichangetoken, building-custom-change-notification-providers, efficient-string-segmentation-with-stringsegment-and-stringtokenizer
---

## When building a custom `ConfigurationProvider`, call...

When building a custom `ConfigurationProvider`, call `OnReload()` to fire the provider's change token rather than managing your own `CancellationTokenSource` externally.
