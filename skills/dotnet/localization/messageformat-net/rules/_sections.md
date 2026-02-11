# MessageFormat.NET Rules

Best practices and rules for MessageFormat.NET.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Use MessageFormat for any string that contains a count | MEDIUM | [`messageformat-net-use-messageformat-for-any-string-that-contains-a-count.md`](messageformat-net-use-messageformat-for-any-string-that-contains-a-count.md) |
| 2 | Store MessageFormat patterns in `.resx` files | MEDIUM | [`messageformat-net-store-messageformat-patterns-in-resx-files.md`](messageformat-net-store-messageformat-patterns-in-resx-files.md) |
| 3 | Use the `#` placeholder | HIGH | [`messageformat-net-use-the-placeholder.md`](messageformat-net-use-the-placeholder.md) |
| 4 | Always include the `other` category | CRITICAL | [`messageformat-net-always-include-the-other-category.md`](messageformat-net-always-include-the-other-category.md) |
| 5 | Keep `MessageFormatter` as a singleton | HIGH | [`messageformat-net-keep-messageformatter-as-a-singleton.md`](messageformat-net-keep-messageformatter-as-a-singleton.md) |
| 6 | Test patterns with boundary values | MEDIUM | [`messageformat-net-test-patterns-with-boundary-values.md`](messageformat-net-test-patterns-with-boundary-values.md) |
| 7 | Avoid embedding HTML in MessageFormat patterns | HIGH | [`messageformat-net-avoid-embedding-html-in-messageformat-patterns.md`](messageformat-net-avoid-embedding-html-in-messageformat-patterns.md) |
| 8 | Validate patterns at startup | CRITICAL | [`messageformat-net-validate-patterns-at-startup.md`](messageformat-net-validate-patterns-at-startup.md) |
| 9 | Prefer named arguments | LOW | [`messageformat-net-prefer-named-arguments.md`](messageformat-net-prefer-named-arguments.md) |
| 10 | Document the available variables | MEDIUM | [`messageformat-net-document-the-available-variables.md`](messageformat-net-document-the-available-variables.md) |
