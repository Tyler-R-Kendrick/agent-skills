---
title: "Always dispose the `IDisposable` returned by `ChangeToken"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: extensions-primitives, dotnet, configuration, reacting-to-configuration-or-file-changes-with-ichangetoken, building-custom-change-notification-providers, efficient-string-segmentation-with-stringsegment-and-stringtokenizer
---

## Always dispose the `IDisposable` returned by `ChangeToken

Always dispose the `IDisposable` returned by `ChangeToken.OnChange` when the subscribing object is no longer needed to prevent memory leaks from dangling callbacks.
