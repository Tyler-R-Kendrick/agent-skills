---
title: "Compile templates once and cache the resulting delegate"
impact: MEDIUM
impactDescription: "general best practice"
tags: handlebars-net, dotnet, general, logic-less-html-templating, email-template-rendering, code-generation-templates
---

## Compile templates once and cache the resulting delegate

`Handlebars.Compile` parses and compiles the template, so repeated compilation wastes CPU.
