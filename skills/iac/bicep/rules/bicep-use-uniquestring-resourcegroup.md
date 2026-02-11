---
title: "Use `uniqueString(resourceGroup()"
impact: MEDIUM
impactDescription: "general best practice"
tags: bicep, iac, azure-resource-deployment, bicep-dsl-modules, what-if-previews
---

## Use `uniqueString(resourceGroup()

Use `uniqueString(resourceGroup().id)` for globally unique names (storage accounts, web apps).
