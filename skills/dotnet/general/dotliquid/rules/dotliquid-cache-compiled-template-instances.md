---
title: "Cache compiled `Template` instances"
impact: MEDIUM
impactDescription: "general best practice"
tags: dotliquid, dotnet, general, safe-user-generated-templates, email-templates, cms-content-rendering
---

## Cache compiled `Template` instances

Cache compiled `Template` instances: by calling `Template.Parse` once and reusing the result across renders, since parsing is the most expensive step.
