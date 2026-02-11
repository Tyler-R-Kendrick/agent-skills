---
title: "Use `cache.Edit(innerCache => { ... })` for bulk mutations"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: dynamic-data, dotnet, reactive, reactive-collection-management-using-observable-caches-and-lists-with-linq-style-operators-for-filtering, sorting, grouping
---

## Use `cache.Edit(innerCache => { ... })` for bulk mutations

Use `cache.Edit(innerCache => { ... })` for bulk mutations: to batch multiple adds, removes, and updates into a single change set notification, preventing N separate UI updates when loading N items.
