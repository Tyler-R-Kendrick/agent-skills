# Microsoft.Extensions.Resilience Rules

Best practices and rules for Microsoft.Extensions.Resilience.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Use `AddStandardResilienceHandler` for HttpClient resilience as the default | MEDIUM | [`extensions-resilience-use-addstandardresiliencehandler-for-httpclient-resilience.md`](extensions-resilience-use-addstandardresiliencehandler-for-httpclient-resilience.md) |
| 2 | Always add `UseJitter = true` to retry strategies | CRITICAL | [`extensions-resilience-always-add-usejitter-true-to-retry-strategies.md`](extensions-resilience-always-add-usejitter-true-to-retry-strategies.md) |
| 3 | Order strategies from outermost (total timeout) to innermost (attempt timeout) | MEDIUM | [`extensions-resilience-order-strategies-from-outermost-total-timeout-to-innermost.md`](extensions-resilience-order-strategies-from-outermost-total-timeout-to-innermost.md) |
| 4 | Set `MinimumThroughput` on circuit breakers to at least 10-20 requests | HIGH | [`extensions-resilience-set-minimumthroughput-on-circuit-breakers-to-at-least-10-20.md`](extensions-resilience-set-minimumthroughput-on-circuit-breakers-to-at-least-10-20.md) |
| 5 | Use `AddStandardHedgingHandler` for latency-critical read operations | CRITICAL | [`extensions-resilience-use-addstandardhedginghandler-for-latency-critical-read.md`](extensions-resilience-use-addstandardhedginghandler-for-latency-critical-read.md) |
| 6 | Configure resilience options through `appsettings.json` rather than hardcoding values | MEDIUM | [`extensions-resilience-configure-resilience-options-through-appsettings-json.md`](extensions-resilience-configure-resilience-options-through-appsettings-json.md) |
| 7 | Use typed pipeline keys (enums or strongly-typed classes) with `AddResiliencePipeline<TKey>` | HIGH | [`extensions-resilience-use-typed-pipeline-keys-enums-or-strongly-typed-classes.md`](extensions-resilience-use-typed-pipeline-keys-enums-or-strongly-typed-classes.md) |
| 8 | Monitor resilience events using the built-in OpenTelemetry integration | MEDIUM | [`extensions-resilience-monitor-resilience-events-using-the-built-in-opentelemetry.md`](extensions-resilience-monitor-resilience-events-using-the-built-in-opentelemetry.md) |
| 9 | Set the attempt timeout shorter than the total timeout divided by (retry count + 1) | HIGH | [`extensions-resilience-set-the-attempt-timeout-shorter-than-the-total-timeout.md`](extensions-resilience-set-the-attempt-timeout-shorter-than-the-total-timeout.md) |
| 10 | Do not wrap non-transient exceptions (ArgumentException, ValidationException) in retry strategies | CRITICAL | [`extensions-resilience-do-not-wrap-non-transient-exceptions-argumentexception.md`](extensions-resilience-do-not-wrap-non-transient-exceptions-argumentexception.md) |
