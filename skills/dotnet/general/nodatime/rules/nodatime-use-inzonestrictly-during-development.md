---
title: "Use `InZoneStrictly` during development"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: nodatime, dotnet, general, precise-datetime-handling, time-zone-conversions, period-and-duration-calculations
---

## Use `InZoneStrictly` during development

Use `InZoneStrictly` during development: to catch DST ambiguities as exceptions, and switch to `InZoneLeniently` or custom resolvers in production with logging.
