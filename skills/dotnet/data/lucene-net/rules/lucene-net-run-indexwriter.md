---
title: "Run `IndexWriter"
impact: MEDIUM
impactDescription: "general best practice"
tags: lucene-net, dotnet, data, full-text-search-indexing-and-querying, faceted-search, autocomplete-and-suggestion-systems
---

## Run `IndexWriter

Run `IndexWriter.ForceMerge(1)` during off-peak maintenance windows to optimize the index into a single segment, improving query performance at the cost of a one-time I/O spike.
