---
title: "Pool strings with `StringPool`"
impact: MEDIUM
impactDescription: "general best practice"
tags: community-toolkit, dotnet, general, mvvm-source-generated-view-models, observable-properties, relay-commands
---

## Pool strings with `StringPool`

Pool strings with `StringPool`: in parsing or deserialization code where the same string values recur frequently to reduce GC pressure.
