---
title: "Dispose all Lucene"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: lucene-net, dotnet, data, full-text-search-indexing-and-querying, faceted-search, autocomplete-and-suggestion-systems
---

## Dispose all Lucene

Dispose all Lucene.NET resources (`IndexWriter`, `DirectoryReader`, `FSDirectory`, analyzers) in the correct order during application shutdown to prevent index corruption.
