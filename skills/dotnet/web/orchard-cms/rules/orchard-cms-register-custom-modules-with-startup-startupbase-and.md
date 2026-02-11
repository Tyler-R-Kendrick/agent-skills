---
title: "Register custom modules with `Startup : StartupBase` and declare module dependencies in the module manifest"
impact: MEDIUM
impactDescription: "general best practice"
tags: orchard-cms, dotnet, web, building-modular-content-managed-web-applications-with-orchard-core-use-when-you-need-a-multi-tenant-cms-with-content-types, custom-modules, workflows
---

## Register custom modules with `Startup : StartupBase` and declare module dependencies in the module manifest

(`Module.cs` or `Manifest.cs`) so that Orchard Core resolves module initialization order correctly and enables/disables features with their dependencies.
