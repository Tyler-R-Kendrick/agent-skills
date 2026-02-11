---
title: "Store only fields you need to display in search results..."
impact: MEDIUM
impactDescription: "general best practice"
tags: lucene-net, dotnet, data, full-text-search-indexing-and-querying, faceted-search, autocomplete-and-suggestion-systems
---

## Store only fields you need to display in search results...

Store only fields you need to display in search results (with `Field.Store.YES`); for fields only used for filtering or sorting, use `Field.Store.NO` to reduce index size.
