---
title: "Use `IContentManager.GetAsync(id, VersionOptions.Published)` for public-facing queries"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: orchard-cms, dotnet, web, building-modular-content-managed-web-applications-with-orchard-core-use-when-you-need-a-multi-tenant-cms-with-content-types, custom-modules, workflows
---

## Use `IContentManager.GetAsync(id, VersionOptions.Published)` for public-facing queries

Use `IContentManager.GetAsync(id, VersionOptions.Published)` for public-facing queries: and `VersionOptions.DraftRequired` for editing workflows, ensuring that published content is served to end users while editors work on draft versions that do not affect the live site until published.
