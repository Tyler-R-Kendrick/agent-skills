# Polly Rules

Best practices and rules for Polly.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Use Polly v8's `ResiliencePipelineBuilder` API exclusively | CRITICAL | [`polly-use-polly-v8-s-resiliencepipelinebuilder-api-exclusively.md`](polly-use-polly-v8-s-resiliencepipelinebuilder-api-exclusively.md) |
| 2 | Always enable `UseJitter = true` on retry strategies | CRITICAL | [`polly-always-enable-usejitter-true-on-retry-strategies.md`](polly-always-enable-usejitter-true-on-retry-strategies.md) |
| 3 | Add strategies in order from outermost to innermost: total timeout, retry, circuit breaker, attempt timeout | MEDIUM | [`polly-add-strategies-in-order-from-outermost-to-innermost-total.md`](polly-add-strategies-in-order-from-outermost-to-innermost-total.md) |
| 4 | Use `PredicateBuilder` with `Handle<TException>()` and `HandleResult()` to explicitly define which failures trigger resilience strategies | MEDIUM | [`polly-use-predicatebuilder-with-handle-texception-and.md`](polly-use-predicatebuilder-with-handle-texception-and.md) |
| 5 | Set `MinimumThroughput` on circuit breakers to at least 10 | HIGH | [`polly-set-minimumthroughput-on-circuit-breakers-to-at-least-10.md`](polly-set-minimumthroughput-on-circuit-breakers-to-at-least-10.md) |
| 6 | Build pipelines once and reuse them | MEDIUM | [`polly-build-pipelines-once-and-reuse-them.md`](polly-build-pipelines-once-and-reuse-them.md) |
| 7 | Use the `OnRetry`, `OnOpened`, `OnClosed` lifecycle callbacks for logging and metrics | MEDIUM | [`polly-use-the-onretry-onopened-onclosed-lifecycle-callbacks-for.md`](polly-use-the-onretry-onopened-onclosed-lifecycle-callbacks-for.md) |
| 8 | Handle `BrokenCircuitException` and `TimeoutRejectedException` at the caller level | MEDIUM | [`polly-handle-brokencircuitexception-and-timeoutrejectedexception.md`](polly-handle-brokencircuitexception-and-timeoutrejectedexception.md) |
| 9 | Prefer `Microsoft.Extensions.Http.Resilience` with `AddStandardResilienceHandler` for HttpClient resilience | LOW | [`polly-prefer-microsoft-extensions-http-resilience-with.md`](polly-prefer-microsoft-extensions-http-resilience-with.md) |
| 10 | Test resilience pipelines by injecting controlled failures | MEDIUM | [`polly-test-resilience-pipelines-by-injecting-controlled-failures.md`](polly-test-resilience-pipelines-by-injecting-controlled-failures.md) |
