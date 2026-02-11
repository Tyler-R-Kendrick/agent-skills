# Pidgin Rules

Best practices and rules for Pidgin.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Use `ExpressionParser | MEDIUM | [`pidgin-use-expressionparser.md`](pidgin-use-expressionparser.md) |
| 2 | Use `Try()` explicitly for parsers that may fail after... | HIGH | [`pidgin-use-try-explicitly-for-parsers-that-may-fail-after.md`](pidgin-use-try-explicitly-for-parsers-that-may-fail-after.md) |
| 3 | Define token parsers that skip trailing whitespace (e | MEDIUM | [`pidgin-define-token-parsers-that-skip-trailing-whitespace-e.md`](pidgin-define-token-parsers-that-skip-trailing-whitespace-e.md) |
| 4 | Use LINQ query syntax (`from | MEDIUM | [`pidgin-use-linq-query-syntax-from.md`](pidgin-use-linq-query-syntax-from.md) |
| 5 | Use `Rec(() => parser)` for recursive parser references to... | CRITICAL | [`pidgin-use-rec-parser-for-recursive-parser-references-to.md`](pidgin-use-rec-parser-for-recursive-parser-references-to.md) |
| 6 | Guard keyword parsers with `Lookahead(LetterOrDigit | HIGH | [`pidgin-guard-keyword-parsers-with-lookahead-letterordigit.md`](pidgin-guard-keyword-parsers-with-lookahead-letterordigit.md) |
| 7 | Use `Separated` and `SeparatedAtLeastOnce` for... | MEDIUM | [`pidgin-use-separated-and-separatedatleastonce-for.md`](pidgin-use-separated-and-separatedatleastonce-for.md) |
| 8 | Define AST types as sealed record hierarchies so pattern... | MEDIUM | [`pidgin-define-ast-types-as-sealed-record-hierarchies-so-pattern.md`](pidgin-define-ast-types-as-sealed-record-hierarchies-so-pattern.md) |
| 9 | Use `ParseOrThrow` in tests and `Parse` (which returns a... | CRITICAL | [`pidgin-use-parseorthrow-in-tests-and-parse-which-returns-a.md`](pidgin-use-parseorthrow-in-tests-and-parse-which-returns-a.md) |
| 10 | Test parsers with both valid inputs and intentionally... | MEDIUM | [`pidgin-test-parsers-with-both-valid-inputs-and-intentionally.md`](pidgin-test-parsers-with-both-valid-inputs-and-intentionally.md) |
