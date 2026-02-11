---
title: "Review switches set by the"
impact: MEDIUM
impactDescription: "general best practice"
tags: appcontext, dotnet, configuration, toggling-runtime-compatibility-switches, enabling-or-disabling-breaking-change-mitigations-between-framework-versions, gating-legacy-code-paths-at-startup
---

## Review switches set by the

Review switches set by the .NET runtime itself when upgrading target frameworks, as new switches may be introduced that affect networking, globalization, or serialization behavior.
