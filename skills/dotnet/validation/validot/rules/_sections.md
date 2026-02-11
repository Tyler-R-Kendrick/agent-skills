# Validot Rules

Best practices and rules for Validot.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Create `Validator<T>` instances once and register them as singletons | MEDIUM | [`validot-create-validator-t-instances-once-and-register-them-as.md`](validot-create-validator-t-instances-once-and-register-them-as.md) |
| 2 | Define specifications as `static readonly` fields in dedicated specification classes | MEDIUM | [`validot-define-specifications-as-static-readonly-fields-in.md`](validot-define-specifications-as-static-readonly-fields-in.md) |
| 3 | Use `.Member()` with nested specifications for object graph validation | HIGH | [`validot-use-member-with-nested-specifications-for-object-graph.md`](validot-use-member-with-nested-specifications-for-object-graph.md) |
| 4 | Use `.WithMessage()` on every rule to provide context-specific error messages | CRITICAL | [`validot-use-withmessage-on-every-rule-to-provide-context-specific.md`](validot-use-withmessage-on-every-rule-to-provide-context-specific.md) |
| 5 | Use `.Optional()` on nullable or optional members | MEDIUM | [`validot-use-optional-on-nullable-or-optional-members.md`](validot-use-optional-on-nullable-or-optional-members.md) |
| 6 | Check `result.AnyErrors` before accessing `result.MessageMap` | HIGH | [`validot-check-result-anyerrors-before-accessing-result-messagemap.md`](validot-check-result-anyerrors-before-accessing-result-messagemap.md) |
| 7 | Map `result.MessageMap` to ASP.NET Core's `Results.ValidationProblem(IDictionary<string, string[]>)` format | MEDIUM | [`validot-map-result-messagemap-to-asp-net-core-s-results.md`](validot-map-result-messagemap-to-asp-net-core-s-results.md) |
| 8 | Use `.Rule(predicate)` for custom validation logic | CRITICAL | [`validot-use-rule-predicate-for-custom-validation-logic.md`](validot-use-rule-predicate-for-custom-validation-logic.md) |
| 9 | Do not use Validot for validation that requires database lookups or external API calls | CRITICAL | [`validot-do-not-use-validot-for-validation-that-requires-database.md`](validot-do-not-use-validot-for-validation-that-requires-database.md) |
| 10 | Write unit tests that instantiate the validator, pass both valid and invalid objects, and assert on `result.AnyErrors` and specific paths in `result.MessageMap` | CRITICAL | [`validot-write-unit-tests-that-instantiate-the-validator-pass-both.md`](validot-write-unit-tests-that-instantiate-the-validator-pass-both.md) |
