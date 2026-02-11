# OpenFeature Rules

Best practices and rules for OpenFeature.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Set the provider asynchronously at startup using `await Api | HIGH | [`openfeature-set-the-provider-asynchronously-at-startup-using-await-api.md`](openfeature-set-the-provider-asynchronously-at-startup-using-await-api.md) |
| 2 | Always provide a meaningful default value as the second... | CRITICAL | [`openfeature-always-provide-a-meaningful-default-value-as-the-second.md`](openfeature-always-provide-a-meaningful-default-value-as-the-second.md) |
| 3 | Use `EvaluationContext` with a `targetingKey` field set to... | MEDIUM | [`openfeature-use-evaluationcontext-with-a-targetingkey-field-set-to.md`](openfeature-use-evaluationcontext-with-a-targetingkey-field-set-to.md) |
| 4 | Register a logging hook globally via `Api | MEDIUM | [`openfeature-register-a-logging-hook-globally-via-api.md`](openfeature-register-a-logging-hook-globally-via-api.md) |
| 5 | Use `GetBooleanDetailsAsync` instead of... | MEDIUM | [`openfeature-use-getbooleandetailsasync-instead-of.md`](openfeature-use-getbooleandetailsasync-instead-of.md) |
| 6 | Keep provider initialization separate from flag evaluation;... | MEDIUM | [`openfeature-keep-provider-initialization-separate-from-flag-evaluation.md`](openfeature-keep-provider-initialization-separate-from-flag-evaluation.md) |
| 7 | Use `InMemoryProvider` in unit tests and integration tests... | MEDIUM | [`openfeature-use-inmemoryprovider-in-unit-tests-and-integration-tests.md`](openfeature-use-inmemoryprovider-in-unit-tests-and-integration-tests.md) |
| 8 | Define flag key constants in a shared static class and... | HIGH | [`openfeature-define-flag-key-constants-in-a-shared-static-class-and.md`](openfeature-define-flag-key-constants-in-a-shared-static-class-and.md) |
| 9 | Plan for provider migration by coding exclusively against... | CRITICAL | [`openfeature-plan-for-provider-migration-by-coding-exclusively-against.md`](openfeature-plan-for-provider-migration-by-coding-exclusively-against.md) |
| 10 | Monitor the `ProviderError` and `ProviderStale` events to... | MEDIUM | [`openfeature-monitor-the-providererror-and-providerstale-events-to.md`](openfeature-monitor-the-providererror-and-providerstale-events-to.md) |
