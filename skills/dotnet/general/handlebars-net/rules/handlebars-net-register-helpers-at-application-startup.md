---
title: "Register helpers at application startup"
impact: MEDIUM
impactDescription: "general best practice"
tags: handlebars-net, dotnet, general, logic-less-html-templating, email-template-rendering, code-generation-templates
---

## Register helpers at application startup

Register helpers at application startup: rather than per-request, since helper registration modifies shared state.
