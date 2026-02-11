---
title: "Register custom filters in a startup path"
impact: MEDIUM
impactDescription: "general best practice"
tags: dotliquid, dotnet, general, safe-user-generated-templates, email-templates, cms-content-rendering
---

## Register custom filters in a startup path

(e.g., application initialization) rather than per-request, since `Template.RegisterFilter` is a global static operation.
