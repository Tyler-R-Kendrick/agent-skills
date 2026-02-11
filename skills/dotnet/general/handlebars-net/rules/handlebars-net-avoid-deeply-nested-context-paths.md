---
title: "Avoid deeply nested context paths"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: handlebars-net, dotnet, general, logic-less-html-templating, email-template-rendering, code-generation-templates
---

## Avoid deeply nested context paths

Avoid deeply nested context paths: like `{{../../parent.child.value}}` -- flatten the data model or use helpers to simplify access.
