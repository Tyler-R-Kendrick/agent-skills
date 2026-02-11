# Lucene.NET Rules

Best practices and rules for Lucene.NET.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Use `StandardAnalyzer` for general-purpose text search and... | MEDIUM | [`lucene-net-use-standardanalyzer-for-general-purpose-text-search-and.md`](lucene-net-use-standardanalyzer-for-general-purpose-text-search-and.md) |
| 2 | Use `StringField` for exact-match fields like IDs and... | HIGH | [`lucene-net-use-stringfield-for-exact-match-fields-like-ids-and.md`](lucene-net-use-stringfield-for-exact-match-fields-like-ids-and.md) |
| 3 | Call `IndexWriter | MEDIUM | [`lucene-net-call-indexwriter.md`](lucene-net-call-indexwriter.md) |
| 4 | Use `SearcherManager` with `MaybeRefresh()` for... | HIGH | [`lucene-net-use-searchermanager-with-mayberefresh-for.md`](lucene-net-use-searchermanager-with-mayberefresh-for.md) |
| 5 | Acquire and release `IndexSearcher` through... | HIGH | [`lucene-net-acquire-and-release-indexsearcher-through.md`](lucene-net-acquire-and-release-indexsearcher-through.md) |
| 6 | Implement pagination with `TopDocs | MEDIUM | [`lucene-net-implement-pagination-with-topdocs.md`](lucene-net-implement-pagination-with-topdocs.md) |
| 7 | Store only fields you need to display in search results... | MEDIUM | [`lucene-net-store-only-fields-you-need-to-display-in-search-results.md`](lucene-net-store-only-fields-you-need-to-display-in-search-results.md) |
| 8 | Use `FuzzyQuery` with a maximum edit distance of 1 or 2 for... | HIGH | [`lucene-net-use-fuzzyquery-with-a-maximum-edit-distance-of-1-or-2-for.md`](lucene-net-use-fuzzyquery-with-a-maximum-edit-distance-of-1-or-2-for.md) |
| 9 | Run `IndexWriter | MEDIUM | [`lucene-net-run-indexwriter.md`](lucene-net-run-indexwriter.md) |
| 10 | Dispose all Lucene | HIGH | [`lucene-net-dispose-all-lucene.md`](lucene-net-dispose-all-lucene.md) |
