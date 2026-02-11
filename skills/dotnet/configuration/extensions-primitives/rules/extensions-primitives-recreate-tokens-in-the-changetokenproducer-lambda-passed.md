---
title: "Recreate tokens in the `changeTokenProducer` lambda passed..."
impact: MEDIUM
impactDescription: "general best practice"
tags: extensions-primitives, dotnet, configuration, reacting-to-configuration-or-file-changes-with-ichangetoken, building-custom-change-notification-providers, efficient-string-segmentation-with-stringsegment-and-stringtokenizer
---

## Recreate tokens in the `changeTokenProducer` lambda passed...

Recreate tokens in the `changeTokenProducer` lambda passed to `ChangeToken.OnChange` rather than capturing a single token, because each token fires only once.
