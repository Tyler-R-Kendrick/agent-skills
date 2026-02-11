---
title: "Use `Handlebars.Create()` for isolated environments"
impact: MEDIUM
impactDescription: "general best practice"
tags: handlebars-net, dotnet, general, logic-less-html-templating, email-template-rendering, code-generation-templates
---

## Use `Handlebars.Create()` for isolated environments

Use `Handlebars.Create()` for isolated environments: instead of the global `Handlebars` static when different parts of your application need different helpers or partials.
