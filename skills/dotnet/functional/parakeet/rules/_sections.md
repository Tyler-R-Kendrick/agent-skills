# Parakeet Rules

Best practices and rules for Parakeet.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Define grammars as classes inheriting from `Grammar` with... | MEDIUM | [`parakeet-define-grammars-as-classes-inheriting-from-grammar-with.md`](parakeet-define-grammars-as-classes-inheriting-from-grammar-with.md) |
| 2 | Use `Named()` to label important rules in the parse tree so... | HIGH | [`parakeet-use-named-to-label-important-rules-in-the-parse-tree-so.md`](parakeet-use-named-to-label-important-rules-in-the-parse-tree-so.md) |
| 3 | Handle whitespace explicitly by adding `+ WS` after token... | CRITICAL | [`parakeet-handle-whitespace-explicitly-by-adding-ws-after-token.md`](parakeet-handle-whitespace-explicitly-by-adding-ws-after-token.md) |
| 4 | Use `.Lookahead()` and ` | MEDIUM | [`parakeet-use-lookahead-and.md`](parakeet-use-lookahead-and.md) |
| 5 | Use `.Optional()` for optional elements rather than choice... | MEDIUM | [`parakeet-use-optional-for-optional-elements-rather-than-choice.md`](parakeet-use-optional-for-optional-elements-rather-than-choice.md) |
| 6 | Define the grammar entry point via `override Rule Start` so... | MEDIUM | [`parakeet-define-the-grammar-entry-point-via-override-rule-start-so.md`](parakeet-define-the-grammar-entry-point-via-override-rule-start-so.md) |
| 7 | Test grammars incrementally | MEDIUM | [`parakeet-test-grammars-incrementally.md`](parakeet-test-grammars-incrementally.md) |
| 8 | Use ordered choice (`|`) carefully in PEG grammars;... | HIGH | [`parakeet-use-ordered-choice-carefully-in-peg-grammars.md`](parakeet-use-ordered-choice-carefully-in-peg-grammars.md) |
| 9 | Traverse parse trees with pattern matching on `RuleName` to... | MEDIUM | [`parakeet-traverse-parse-trees-with-pattern-matching-on-rulename-to.md`](parakeet-traverse-parse-trees-with-pattern-matching-on-rulename-to.md) |
| 10 | For performance-critical parsing of large inputs, consider... | CRITICAL | [`parakeet-for-performance-critical-parsing-of-large-inputs-consider.md`](parakeet-for-performance-critical-parsing-of-large-inputs-consider.md) |
