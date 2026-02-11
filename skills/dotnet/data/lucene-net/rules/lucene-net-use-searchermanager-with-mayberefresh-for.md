---
title: "Use `SearcherManager` with `MaybeRefresh()` for..."
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: lucene-net, dotnet, data, full-text-search-indexing-and-querying, faceted-search, autocomplete-and-suggestion-systems
---

## Use `SearcherManager` with `MaybeRefresh()` for...

Use `SearcherManager` with `MaybeRefresh()` for near-real-time search instead of reopening `DirectoryReader` manually, which avoids resource leaks and simplifies lifecycle management.
