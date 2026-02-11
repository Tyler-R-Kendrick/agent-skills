---
title: "Prefer `ChangeToken.OnChange` over manual `IChangeToken` polling"
impact: LOW
impactDescription: "recommended but situational"
tags: file-provider, dotnet, general, abstracting-file-access-over-physical-files, embedded-resources, and-composite-sources
---

## Prefer `ChangeToken.OnChange` over manual `IChangeToken` polling

Prefer `ChangeToken.OnChange` over manual `IChangeToken` polling: because it handles re-registration automatically when a token is consumed.
