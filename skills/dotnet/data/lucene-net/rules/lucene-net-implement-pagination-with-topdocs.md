---
title: "Implement pagination with `TopDocs"
impact: MEDIUM
impactDescription: "general best practice"
tags: lucene-net, dotnet, data, full-text-search-indexing-and-querying, faceted-search, autocomplete-and-suggestion-systems
---

## Implement pagination with `TopDocs

Implement pagination with `TopDocs.ScoreDocs` array slicing rather than using `SearchAfter`, which is only needed for deep pagination beyond 10,000 results.
