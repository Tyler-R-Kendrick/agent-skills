---
title: "Use a reverse-domain naming convention for custom switches..."
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: appcontext, dotnet, configuration, toggling-runtime-compatibility-switches, enabling-or-disabling-breaking-change-mitigations-between-framework-versions, gating-legacy-code-paths-at-startup
---

## Use a reverse-domain naming convention for custom switches...

Use a reverse-domain naming convention for custom switches (e.g., `MyCompany.MyLib.SwitchName`) to avoid collisions with framework or third-party switches.
