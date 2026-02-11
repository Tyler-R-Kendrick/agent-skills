---
title: "Use branded types"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: typescript, typescript-language-features, choosing-build-tools, package-managers
---

## Use branded types

Use branded types: for domain identifiers to prevent mixing: ```typescript type UserId = string & { __brand: "UserId" }; type OrderId = string & { __brand: "OrderId" };
