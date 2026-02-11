---
title: "Write unit tests for change-token producers by asserting..."
impact: MEDIUM
impactDescription: "general best practice"
tags: extensions-primitives, dotnet, configuration, reacting-to-configuration-or-file-changes-with-ichangetoken, building-custom-change-notification-providers, efficient-string-segmentation-with-stringsegment-and-stringtokenizer
---

## Write unit tests for change-token producers by asserting...

Write unit tests for change-token producers by asserting `HasChanged` transitions from `false` to `true` and that registered callbacks execute exactly once per signal.
