---
title: "Acquire and release `IndexSearcher` through..."
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: lucene-net, dotnet, data, full-text-search-indexing-and-querying, faceted-search, autocomplete-and-suggestion-systems
---

## Acquire and release `IndexSearcher` through...

Acquire and release `IndexSearcher` through `SearcherManager` in a try-finally block to ensure searchers are returned even when queries throw exceptions.
