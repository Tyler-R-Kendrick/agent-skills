---
title: "Use `SourceCache<TObject, TKey>` for collections with a natural unique key (database IDs, GUIDs)"
impact: MEDIUM
impactDescription: "general best practice"
tags: dynamic-data, dotnet, reactive, reactive-collection-management-using-observable-caches-and-lists-with-linq-style-operators-for-filtering, sorting, grouping
---

## Use `SourceCache<TObject, TKey>` for collections with a natural unique key (database IDs, GUIDs)

Use `SourceCache<TObject, TKey>` for collections with a natural unique key (database IDs, GUIDs): and `SourceList<T>` for ordered collections without keys, because the cache provides O(1) lookup and deduplication.
