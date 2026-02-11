# Moq Rules

Best practices and rules for Moq.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Mock interfaces, not concrete classes | MEDIUM | [`moq-mock-interfaces-not-concrete-classes.md`](moq-mock-interfaces-not-concrete-classes.md) |
| 2 | Use `MockBehavior.Strict` for critical business logic | CRITICAL | [`moq-use-mockbehavior-strict-for-critical-business-logic.md`](moq-use-mockbehavior-strict-for-critical-business-logic.md) |
| 3 | Verify only meaningful interactions | CRITICAL | [`moq-verify-only-meaningful-interactions.md`](moq-verify-only-meaningful-interactions.md) |
| 4 | Use `It.Is<T>()` with predicates for complex argument validation | HIGH | [`moq-use-it-is-t-with-predicates-for-complex-argument-validation.md`](moq-use-it-is-t-with-predicates-for-complex-argument-validation.md) |
| 5 | Prefer `ReturnsAsync` over `Returns(Task.FromResult(...))` for async methods | HIGH | [`moq-prefer-returnsasync-over-returns-task-fromresult-for-async.md`](moq-prefer-returnsasync-over-returns-task-fromresult-for-async.md) |
| 6 | Use `Callback` to capture arguments for later assertions | MEDIUM | [`moq-use-callback-to-capture-arguments-for-later-assertions.md`](moq-use-callback-to-capture-arguments-for-later-assertions.md) |
| 7 | Create one mock per dependency, one SUT per test class | MEDIUM | [`moq-create-one-mock-per-dependency-one-sut-per-test-class.md`](moq-create-one-mock-per-dependency-one-sut-per-test-class.md) |
| 8 | Avoid mocking data structures and DTOs | HIGH | [`moq-avoid-mocking-data-structures-and-dtos.md`](moq-avoid-mocking-data-structures-and-dtos.md) |
| 9 | Use `Times.Once` or `Times.Never` for explicit call verification | CRITICAL | [`moq-use-times-once-or-times-never-for-explicit-call-verification.md`](moq-use-times-once-or-times-never-for-explicit-call-verification.md) |
| 10 | Combine with AutoFixture AutoMoq for zero-boilerplate tests | MEDIUM | [`moq-combine-with-autofixture-automoq-for-zero-boilerplate-tests.md`](moq-combine-with-autofixture-automoq-for-zero-boilerplate-tests.md) |
