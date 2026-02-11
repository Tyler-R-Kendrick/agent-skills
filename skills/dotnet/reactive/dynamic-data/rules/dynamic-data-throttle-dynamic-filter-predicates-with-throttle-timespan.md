---
title: "Throttle dynamic filter predicates with `.Throttle(TimeSpan.FromMilliseconds(300))`"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: dynamic-data, dotnet, reactive, reactive-collection-management-using-observable-caches-and-lists-with-linq-style-operators-for-filtering, sorting, grouping
---

## Throttle dynamic filter predicates with `.Throttle(TimeSpan.FromMilliseconds(300))`

Throttle dynamic filter predicates with `.Throttle(TimeSpan.FromMilliseconds(300))`: when the predicate changes on every keystroke (search boxes) to avoid re-filtering the entire cache on every character typed.
