# language-ext Rules

Best practices and rules for language-ext.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Use `Option<T>` instead of nullable returns for all methods... | MEDIUM | [`language-ext-use-option-t-instead-of-nullable-returns-for-all-methods.md`](language-ext-use-option-t-instead-of-nullable-returns-for-all-methods.md) |
| 2 | Use `Either<L, R>` for operations that can fail with... | MEDIUM | [`language-ext-use-either-l-r-for-operations-that-can-fail-with.md`](language-ext-use-either-l-r-for-operations-that-can-fail-with.md) |
| 3 | Use `Validation<F, S>` when you need to accumulate all... | MEDIUM | [`language-ext-use-validation-f-s-when-you-need-to-accumulate-all.md`](language-ext-use-validation-f-s-when-you-need-to-accumulate-all.md) |
| 4 | Prefer LINQ query syntax (`from | LOW | [`language-ext-prefer-linq-query-syntax-from.md`](language-ext-prefer-linq-query-syntax-from.md) |
| 5 | Use `Prelude` static imports (`using static LanguageExt | MEDIUM | [`language-ext-use-prelude-static-imports-using-static-languageext.md`](language-ext-use-prelude-static-imports-using-static-languageext.md) |
| 6 | Use language-ext immutable collections (`Lst<T>`,... | CRITICAL | [`language-ext-use-language-ext-immutable-collections-lst-t.md`](language-ext-use-language-ext-immutable-collections-lst-t.md) |
| 7 | Convert between `Option` and `Either` at service boundaries... | MEDIUM | [`language-ext-convert-between-option-and-either-at-service-boundaries.md`](language-ext-convert-between-option-and-either-at-service-boundaries.md) |
| 8 | Use `Try<T>` and `TryAsync<T>` at infrastructure boundaries... | MEDIUM | [`language-ext-use-try-t-and-tryasync-t-at-infrastructure-boundaries.md`](language-ext-use-try-t-and-tryasync-t-at-infrastructure-boundaries.md) |
| 9 | Avoid mixing null-returning APIs with language-ext types in... | HIGH | [`language-ext-avoid-mixing-null-returning-apis-with-language-ext-types-in.md`](language-ext-avoid-mixing-null-returning-apis-with-language-ext-types-in.md) |
| 10 | Use `Match` with explicit handlers for all cases to ensure... | HIGH | [`language-ext-use-match-with-explicit-handlers-for-all-cases-to-ensure.md`](language-ext-use-match-with-explicit-handlers-for-all-cases-to-ensure.md) |
