# Peasy Rules

Best practices and rules for Peasy.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Encode exactly one business invariant per rule class | CRITICAL | [`peasy-encode-exactly-one-business-invariant-per-rule-class.md`](peasy-encode-exactly-one-business-invariant-per-rule-class.md) |
| 2 | Use `IfValidThenValidate` to chain dependent rules | HIGH | [`peasy-use-ifvalidthenvalidate-to-chain-dependent-rules.md`](peasy-use-ifvalidthenvalidate-to-chain-dependent-rules.md) |
| 3 | Inject repository or service dependencies through the rule's constructor | MEDIUM | [`peasy-inject-repository-or-service-dependencies-through-the-rule.md`](peasy-inject-repository-or-service-dependencies-through-the-rule.md) |
| 4 | Return `ExecutionResult<T>` from service methods instead of throwing exceptions on business rule failures | MEDIUM | [`peasy-return-executionresult-t-from-service-methods-instead-of.md`](peasy-return-executionresult-t-from-service-methods-instead-of.md) |
| 5 | Collect all rule errors before returning to the caller | MEDIUM | [`peasy-collect-all-rule-errors-before-returning-to-the-caller.md`](peasy-collect-all-rule-errors-before-returning-to-the-caller.md) |
| 6 | Create a `RuleSet` class (e.g., `CanPlaceOrderRuleSet`) that encapsulates related rules for a use case | MEDIUM | [`peasy-create-a-ruleset-class-e-g-canplaceorderruleset-that.md`](peasy-create-a-ruleset-class-e-g-canplaceorderruleset-that.md) |
| 7 | Name rule classes as assertions starting with the condition | MEDIUM | [`peasy-name-rule-classes-as-assertions-starting-with-the-condition.md`](peasy-name-rule-classes-as-assertions-starting-with-the-condition.md) |
| 8 | Write unit tests for each rule in isolation | HIGH | [`peasy-write-unit-tests-for-each-rule-in-isolation.md`](peasy-write-unit-tests-for-each-rule-in-isolation.md) |
| 9 | Use Peasy rules for cross-aggregate business invariants | MEDIUM | [`peasy-use-peasy-rules-for-cross-aggregate-business-invariants.md`](peasy-use-peasy-rules-for-cross-aggregate-business-invariants.md) |
| 10 | Map `ExecutionResult.Errors` to HTTP `400 BadRequest` with a structured JSON body | MEDIUM | [`peasy-map-executionresult-errors-to-http-400-badrequest-with-a.md`](peasy-map-executionresult-errors-to-http-400-badrequest-with-a.md) |
