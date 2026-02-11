# OTLP Logging and Observability Rules

Best practices and rules for OTLP Logging and Observability.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Configure all three signals (traces, metrics, logs) together | MEDIUM | [`otlp-logging-configure-all-three-signals-traces-metrics-logs-together.md`](otlp-logging-configure-all-three-signals-traces-metrics-logs-together.md) |
| 2 | Use semantic conventions | MEDIUM | [`otlp-logging-use-semantic-conventions.md`](otlp-logging-use-semantic-conventions.md) |
| 3 | Set an appropriate sampling rate | CRITICAL | [`otlp-logging-set-an-appropriate-sampling-rate.md`](otlp-logging-set-an-appropriate-sampling-rate.md) |
| 4 | Add `ActivitySource.StartActivity` for business-critical operations | CRITICAL | [`otlp-logging-add-activitysource-startactivity-for-business-critical.md`](otlp-logging-add-activitysource-startactivity-for-business-critical.md) |
| 5 | Use the `OTEL_*` environment variables | MEDIUM | [`otlp-logging-use-the-otel-environment-variables.md`](otlp-logging-use-the-otel-environment-variables.md) |
| 6 | Include `IncludeFormattedMessage = true` | MEDIUM | [`otlp-logging-include-includeformattedmessage-true.md`](otlp-logging-include-includeformattedmessage-true.md) |
| 7 | Register custom `Meter` names | MEDIUM | [`otlp-logging-register-custom-meter-names.md`](otlp-logging-register-custom-meter-names.md) |
| 8 | Export to an OpenTelemetry Collector | MEDIUM | [`otlp-logging-export-to-an-opentelemetry-collector.md`](otlp-logging-export-to-an-opentelemetry-collector.md) |
| 9 | Check `activity is not null` | MEDIUM | [`otlp-logging-check-activity-is-not-null.md`](otlp-logging-check-activity-is-not-null.md) |
| 10 | Record error details on spans | MEDIUM | [`otlp-logging-record-error-details-on-spans.md`](otlp-logging-record-error-details-on-spans.md) |
