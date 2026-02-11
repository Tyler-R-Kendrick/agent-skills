---
title: "Enable `versionTolerance` in production systems"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: hyperion, dotnet, serialization, akkanet-actor-message-serialization, polymorphic-type-handling, object-graph-serialization-with-circular-references
---

## Enable `versionTolerance` in production systems

Enable `versionTolerance` in production systems: this allows you to add new fields to message types without breaking deserialization of data serialized with the previous version.
