---
title: "Use `FuzzyQuery` with a maximum edit distance of 1 or 2 for..."
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: lucene-net, dotnet, data, full-text-search-indexing-and-querying, faceted-search, autocomplete-and-suggestion-systems
---

## Use `FuzzyQuery` with a maximum edit distance of 1 or 2 for...

Use `FuzzyQuery` with a maximum edit distance of 1 or 2 for typo tolerance, but avoid it on large indexes with short terms where it may produce too many matches.
