---
title: "Model your permission hierarchy carefully before writing code"
impact: MEDIUM
impactDescription: "general best practice"
tags: topaz, dotnet, security, fine-grained-permissions, relationship-based-access-control-rebac, google-zanzibar-style-authorization
---

## Model your permission hierarchy carefully before writing code

Model your permission hierarchy carefully before writing code: draw the object types, relations, and permission inheritance (`can_edit: owner | editor`) on paper or in a diagram before defining the manifest.
