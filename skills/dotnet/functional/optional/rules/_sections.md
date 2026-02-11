# Optional Pattern Rules

Best practices and rules for Optional Pattern.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Return `Optional<T>` from methods that may not find a value... | MEDIUM | [`optional-return-optional-t-from-methods-that-may-not-find-a-value.md`](optional-return-optional-t-from-methods-that-may-not-find-a-value.md) |
| 2 | Implement `Optional<T>` as a `readonly struct` to avoid... | HIGH | [`optional-implement-optional-t-as-a-readonly-struct-to-avoid.md`](optional-implement-optional-t-as-a-readonly-struct-to-avoid.md) |
| 3 | Use `Match` with both `some` and `none` handlers as the... | CRITICAL | [`optional-use-match-with-both-some-and-none-handlers-as-the.md`](optional-use-match-with-both-some-and-none-handlers-as-the.md) |
| 4 | Use `Map` for transforming the inner value and `Bind` (or... | CRITICAL | [`optional-use-map-for-transforming-the-inner-value-and-bind-or.md`](optional-use-map-for-transforming-the-inner-value-and-bind-or.md) |
| 5 | Use `Filter` to convert Some to None based on a condition,... | MEDIUM | [`optional-use-filter-to-convert-some-to-none-based-on-a-condition.md`](optional-use-filter-to-convert-some-to-none-based-on-a-condition.md) |
| 6 | Convert nullable types to Optional at system boundaries... | MEDIUM | [`optional-convert-nullable-types-to-optional-at-system-boundaries.md`](optional-convert-nullable-types-to-optional-at-system-boundaries.md) |
| 7 | Use LINQ query syntax for chains of more than two Bind... | MEDIUM | [`optional-use-linq-query-syntax-for-chains-of-more-than-two-bind.md`](optional-use-linq-query-syntax-for-chains-of-more-than-two-bind.md) |
| 8 | Use `OrElse` with a default value only at the edges of the... | MEDIUM | [`optional-use-orelse-with-a-default-value-only-at-the-edges-of-the.md`](optional-use-orelse-with-a-default-value-only-at-the-edges-of-the.md) |
| 9 | Avoid calling ` | CRITICAL | [`optional-avoid-calling.md`](optional-avoid-calling.md) |
| 10 | Choose between `Optional` (self-implemented or NuGet),... | MEDIUM | [`optional-choose-between-optional-self-implemented-or-nuget.md`](optional-choose-between-optional-self-implemented-or-nuget.md) |
