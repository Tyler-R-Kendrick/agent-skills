---
title: "Validate template syntax before storing user templates"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: dotliquid, dotnet, general, safe-user-generated-templates, email-templates, cms-content-rendering
---

## Validate template syntax before storing user templates

Validate template syntax before storing user templates: by wrapping `Template.Parse` in a try/catch for `SyntaxException` and returning errors to the user.
