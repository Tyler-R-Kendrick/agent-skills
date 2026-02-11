---
title: "Prefer `WeakReferenceMessenger` over `StrongReferenceMessenger`"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: community-toolkit, dotnet, general, mvvm-source-generated-view-models, observable-properties, relay-commands
---

## Prefer `WeakReferenceMessenger` over `StrongReferenceMessenger`

Prefer `WeakReferenceMessenger` over `StrongReferenceMessenger`: to avoid memory leaks from subscribers that are never explicitly unregistered.
