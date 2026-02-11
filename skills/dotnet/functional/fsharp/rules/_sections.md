# F# Rules

Best practices and rules for F#.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Use discriminated unions instead of class hierarchies for... | HIGH | [`fsharp-use-discriminated-unions-instead-of-class-hierarchies-for.md`](fsharp-use-discriminated-unions-instead-of-class-hierarchies-for.md) |
| 2 | Prefer the pipe operator `|>` for data transformation... | LOW | [`fsharp-prefer-the-pipe-operator-for-data-transformation.md`](fsharp-prefer-the-pipe-operator-for-data-transformation.md) |
| 3 | Use `Result<'T, 'Error>` for operations that can fail with... | MEDIUM | [`fsharp-use-result-t-error-for-operations-that-can-fail-with.md`](fsharp-use-result-t-error-for-operations-that-can-fail-with.md) |
| 4 | Make types and functions immutable by default; use... | MEDIUM | [`fsharp-make-types-and-functions-immutable-by-default-use.md`](fsharp-make-types-and-functions-immutable-by-default-use.md) |
| 5 | Use computation expressions (`async { }`, `task { }`,... | MEDIUM | [`fsharp-use-computation-expressions-async-task.md`](fsharp-use-computation-expressions-async-task.md) |
| 6 | Add `[<CLIMutable>]` to record types used in ASP | HIGH | [`fsharp-add-climutable-to-record-types-used-in-asp.md`](fsharp-add-climutable-to-record-types-used-in-asp.md) |
| 7 | Use active patterns to create reusable, composable... | MEDIUM | [`fsharp-use-active-patterns-to-create-reusable-composable.md`](fsharp-use-active-patterns-to-create-reusable-composable.md) |
| 8 | Place F# files in dependency order within ` | MEDIUM | [`fsharp-place-f-files-in-dependency-order-within.md`](fsharp-place-f-files-in-dependency-order-within.md) |
| 9 | Write public API functions with explicit type annotations... | MEDIUM | [`fsharp-write-public-api-functions-with-explicit-type-annotations.md`](fsharp-write-public-api-functions-with-explicit-type-annotations.md) |
| 10 | Use `Seq` for lazy evaluation of large or infinite data... | CRITICAL | [`fsharp-use-seq-for-lazy-evaluation-of-large-or-infinite-data.md`](fsharp-use-seq-for-lazy-evaluation-of-large-or-infinite-data.md) |
