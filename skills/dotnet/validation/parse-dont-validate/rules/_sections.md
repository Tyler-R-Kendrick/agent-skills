# Parse Don't Validate Rules

Best practices and rules for Parse Don't Validate.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Make value object constructors private and expose a `Parse`, `TryCreate`, or `Create` factory method | MEDIUM | [`parse-dont-validate-make-value-object-constructors-private-and-expose-a-parse.md`](parse-dont-validate-make-value-object-constructors-private-and-expose-a-parse.md) |
| 2 | Return a `Result<T>` from `Parse` methods instead of throwing exceptions | MEDIUM | [`parse-dont-validate-return-a-result-t-from-parse-methods-instead-of-throwing.md`](parse-dont-validate-return-a-result-t-from-parse-methods-instead-of-throwing.md) |
| 3 | Implement `IEquatable<T>`, override `Equals`, and override `GetHashCode` on all value objects | LOW | [`parse-dont-validate-implement-iequatable-t-override-equals-and-override.md`](parse-dont-validate-implement-iequatable-t-override-equals-and-override.md) |
| 4 | Parse all inputs at the system boundary (API controller, message handler, CLI parser) | MEDIUM | [`parse-dont-validate-parse-all-inputs-at-the-system-boundary-api-controller.md`](parse-dont-validate-parse-all-inputs-at-the-system-boundary-api-controller.md) |
| 5 | Use `implicit operator` conversions from the value object to its primitive type | CRITICAL | [`parse-dont-validate-use-implicit-operator-conversions-from-the-value-object-to.md`](parse-dont-validate-use-implicit-operator-conversions-from-the-value-object-to.md) |
| 6 | Create a small set of reusable generic value objects | MEDIUM | [`parse-dont-validate-create-a-small-set-of-reusable-generic-value-objects.md`](parse-dont-validate-create-a-small-set-of-reusable-generic-value-objects.md) |
| 7 | Store parsed value objects in EF Core entities using `HasConversion` in `OnModelCreating` | HIGH | [`parse-dont-validate-store-parsed-value-objects-in-ef-core-entities-using.md`](parse-dont-validate-store-parsed-value-objects-in-ef-core-entities-using.md) |
| 8 | Collect all parse errors before returning to the client | MEDIUM | [`parse-dont-validate-collect-all-parse-errors-before-returning-to-the-client.md`](parse-dont-validate-collect-all-parse-errors-before-returning-to-the-client.md) |
| 9 | Write unit tests that verify both the happy path and each specific rejection case | MEDIUM | [`parse-dont-validate-write-unit-tests-that-verify-both-the-happy-path-and-each.md`](parse-dont-validate-write-unit-tests-that-verify-both-the-happy-path-and-each.md) |
| 10 | Use `[NotNullWhen(true)]` and `[NotNullWhen(false)]` attributes on `TryCreate` out parameters | MEDIUM | [`parse-dont-validate-use-notnullwhen-true-and-notnullwhen-false-attributes-on.md`](parse-dont-validate-use-notnullwhen-true-and-notnullwhen-false-attributes-on.md) |
