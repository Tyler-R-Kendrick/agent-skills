---
title: "Exclude build artifacts with source modifiers"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: sidewaffle, dotnet, project-system, creating, packaging, and-distributing-custom-dotnet-new-project-and-item-templates-using-the-template-engine
---

## Exclude build artifacts with source modifiers

(`"exclude": ["**/bin/**", "**/obj/**"]`) in `template.json` to prevent compiled output from being included in the template package.
