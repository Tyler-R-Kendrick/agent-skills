---
title: "Use `StandardAnalyzer` for general-purpose text search and..."
impact: MEDIUM
impactDescription: "general best practice"
tags: lucene-net, dotnet, data, full-text-search-indexing-and-querying, faceted-search, autocomplete-and-suggestion-systems
---

## Use `StandardAnalyzer` for general-purpose text search and...

Use `StandardAnalyzer` for general-purpose text search and switch to a language-specific analyzer (e.g., `EnglishAnalyzer`) when stemming and language-aware stop words improve relevance.
