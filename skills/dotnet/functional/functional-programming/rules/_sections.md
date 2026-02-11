# Functional Programming in C# Rules

Best practices and rules for Functional Programming in C#.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Use C# `record` types for domain models to get... | MEDIUM | [`functional-programming-use-c-record-types-for-domain-models-to-get.md`](functional-programming-use-c-record-types-for-domain-models-to-get.md) |
| 2 | Write pure functions wherever possible | MEDIUM | [`functional-programming-write-pure-functions-wherever-possible.md`](functional-programming-write-pure-functions-wherever-possible.md) |
| 3 | Use LINQ methods (`Select`, `Where`, `Aggregate`,... | MEDIUM | [`functional-programming-use-linq-methods-select-where-aggregate.md`](functional-programming-use-linq-methods-select-where-aggregate.md) |
| 4 | Implement `Result<T>` or use a library like language-ext... | MEDIUM | [`functional-programming-implement-result-t-or-use-a-library-like-language-ext.md`](functional-programming-implement-result-t-or-use-a-library-like-language-ext.md) |
| 5 | Use pattern matching (`switch` expressions) with exhaustive... | MEDIUM | [`functional-programming-use-pattern-matching-switch-expressions-with-exhaustive.md`](functional-programming-use-pattern-matching-switch-expressions-with-exhaustive.md) |
| 6 | Prefer expression-bodied members (`=>`) for small pure... | LOW | [`functional-programming-prefer-expression-bodied-members-for-small-pure.md`](functional-programming-prefer-expression-bodied-members-for-small-pure.md) |
| 7 | Separate pure business logic (easily testable) from impure... | MEDIUM | [`functional-programming-separate-pure-business-logic-easily-testable-from-impure.md`](functional-programming-separate-pure-business-logic-easily-testable-from-impure.md) |
| 8 | Use `IReadOnlyList<T>`, `IReadOnlyDictionary<K,V>`, and... | HIGH | [`functional-programming-use-ireadonlylist-t-ireadonlydictionary-k-v-and.md`](functional-programming-use-ireadonlylist-t-ireadonlydictionary-k-v-and.md) |
| 9 | Compose small, focused functions into pipelines rather than... | MEDIUM | [`functional-programming-compose-small-focused-functions-into-pipelines-rather-than.md`](functional-programming-compose-small-focused-functions-into-pipelines-rather-than.md) |
| 10 | Use `Option<T>` instead of null returns for methods that... | MEDIUM | [`functional-programming-use-option-t-instead-of-null-returns-for-methods-that.md`](functional-programming-use-option-t-instead-of-null-returns-for-methods-that.md) |
