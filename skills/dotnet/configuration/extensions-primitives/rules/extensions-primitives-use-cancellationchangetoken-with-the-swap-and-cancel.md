---
title: "Use `CancellationChangeToken` with the swap-and-cancel..."
impact: MEDIUM
impactDescription: "general best practice"
tags: extensions-primitives, dotnet, configuration, reacting-to-configuration-or-file-changes-with-ichangetoken, building-custom-change-notification-providers, efficient-string-segmentation-with-stringsegment-and-stringtokenizer
---

## Use `CancellationChangeToken` with the swap-and-cancel...

Use `CancellationChangeToken` with the swap-and-cancel pattern (via `Interlocked.Exchange`) to build re-usable change sources that can fire multiple times.
