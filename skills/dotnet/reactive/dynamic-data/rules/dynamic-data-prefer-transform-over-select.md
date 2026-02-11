---
title: "Prefer `Transform` over `Select`"
impact: LOW
impactDescription: "recommended but situational"
tags: dynamic-data, dotnet, reactive, reactive-collection-management-using-observable-caches-and-lists-with-linq-style-operators-for-filtering, sorting, grouping
---

## Prefer `Transform` over `Select`

Prefer `Transform` over `Select`: because `Transform` produces a change set that tracks the relationship between source and transformed items, enabling efficient removal of transformed items when the source item is removed.
