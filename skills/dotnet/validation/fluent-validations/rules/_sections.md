# FluentValidation Rules

Best practices and rules for FluentValidation.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Create one validator class per request/command DTO | MEDIUM | [`fluent-validations-create-one-validator-class-per-request-command-dto.md`](fluent-validations-create-one-validator-class-per-request-command-dto.md) |
| 2 | Use `RuleForEach` with a child validator via `.SetValidator(new ChildValidator())` for collection properties | CRITICAL | [`fluent-validations-use-ruleforeach-with-a-child-validator-via-setvalidator-new.md`](fluent-validations-use-ruleforeach-with-a-child-validator-via-setvalidator-new.md) |
| 3 | Inject services (repositories, caches) into the validator constructor for async uniqueness checks | CRITICAL | [`fluent-validations-inject-services-repositories-caches-into-the-validator.md`](fluent-validations-inject-services-repositories-caches-into-the-validator.md) |
| 4 | Use `.When(condition)` and `.Unless(condition)` guards to skip rules for optional fields | HIGH | [`fluent-validations-use-when-condition-and-unless-condition-guards-to-skip.md`](fluent-validations-use-when-condition-and-unless-condition-guards-to-skip.md) |
| 5 | Call `validator.ValidateAsync()` instead of `Validate()` when any rule in the validator uses `MustAsync`, `WhenAsync`, or `CustomAsync` | CRITICAL | [`fluent-validations-call-validator-validateasync-instead-of-validate-when-any.md`](fluent-validations-call-validator-validateasync-instead-of-validate-when-any.md) |
| 6 | Map `ValidationResult.ToDictionary()` to `Results.ValidationProblem()` in minimal API endpoints | MEDIUM | [`fluent-validations-map-validationresult-todictionary-to-results.md`](fluent-validations-map-validationresult-todictionary-to-results.md) |
| 7 | Set `CascadeMode = CascadeMode.Stop` on rules where the first failure makes subsequent checks meaningless | HIGH | [`fluent-validations-set-cascademode-cascademode-stop-on-rules-where-the-first.md`](fluent-validations-set-cascademode-cascademode-stop-on-rules-where-the-first.md) |
| 8 | Write unit tests for each validator by instantiating it directly with mocked dependencies | CRITICAL | [`fluent-validations-write-unit-tests-for-each-validator-by-instantiating-it.md`](fluent-validations-write-unit-tests-for-each-validator-by-instantiating-it.md) |
| 9 | Avoid putting business logic that modifies state inside `Must` or `MustAsync` predicates | CRITICAL | [`fluent-validations-avoid-putting-business-logic-that-modifies-state-inside.md`](fluent-validations-avoid-putting-business-logic-that-modifies-state-inside.md) |
| 10 | Use `WithErrorCode("UNIQUE_EMAIL")` on rules that front-end clients need to handle programmatically | MEDIUM | [`fluent-validations-use-witherrorcode-unique-email-on-rules-that-front-end.md`](fluent-validations-use-witherrorcode-unique-email-on-rules-that-front-end.md) |
