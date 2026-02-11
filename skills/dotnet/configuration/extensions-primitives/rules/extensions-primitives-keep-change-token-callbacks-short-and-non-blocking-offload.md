---
title: "Keep change-token callbacks short and non-blocking; offload..."
impact: MEDIUM
impactDescription: "general best practice"
tags: extensions-primitives, dotnet, configuration, reacting-to-configuration-or-file-changes-with-ichangetoken, building-custom-change-notification-providers, efficient-string-segmentation-with-stringsegment-and-stringtokenizer
---

## Keep change-token callbacks short and non-blocking; offload...

Keep change-token callbacks short and non-blocking; offload expensive work to a background task or channel rather than doing I/O inside the callback itself.
