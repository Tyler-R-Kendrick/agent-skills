---
title: "Call `IndexWriter"
impact: MEDIUM
impactDescription: "general best practice"
tags: lucene-net, dotnet, data, full-text-search-indexing-and-querying, faceted-search, autocomplete-and-suggestion-systems
---

## Call `IndexWriter

Call `IndexWriter.Commit()` after batch indexing operations rather than after every document to amortize the cost of flushing segments to disk.
