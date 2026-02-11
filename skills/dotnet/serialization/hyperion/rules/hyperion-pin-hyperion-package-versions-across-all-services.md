---
title: "Pin Hyperion package versions across all services"
impact: MEDIUM
impactDescription: "general best practice"
tags: hyperion, dotnet, serialization, akkanet-actor-message-serialization, polymorphic-type-handling, object-graph-serialization-with-circular-references
---

## Pin Hyperion package versions across all services

Pin Hyperion package versions across all services: mismatched Hyperion versions between producer and consumer can cause deserialization failures due to wire format differences.
