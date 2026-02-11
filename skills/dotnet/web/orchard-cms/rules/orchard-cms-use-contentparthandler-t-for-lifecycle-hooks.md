---
title: "Use `ContentPartHandler<T>` for lifecycle hooks"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: orchard-cms, dotnet, web, building-modular-content-managed-web-applications-with-orchard-core-use-when-you-need-a-multi-tenant-cms-with-content-types, custom-modules, workflows
---

## Use `ContentPartHandler<T>` for lifecycle hooks

(Published, Created, Validated) rather than subscribing to generic content events, because typed handlers receive the strongly-typed part and only execute for content items that contain that part, reducing unnecessary processing.
