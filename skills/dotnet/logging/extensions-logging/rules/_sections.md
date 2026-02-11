# Microsoft.Extensions.Logging Rules

Best practices and rules for Microsoft.Extensions.Logging.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Use `LoggerMessage` source generators | CRITICAL | [`extensions-logging-use-loggermessage-source-generators.md`](extensions-logging-use-loggermessage-source-generators.md) |
| 2 | Assign unique `EventId` values | MEDIUM | [`extensions-logging-assign-unique-eventid-values.md`](extensions-logging-assign-unique-eventid-values.md) |
| 3 | Use structured log templates | MEDIUM | [`extensions-logging-use-structured-log-templates.md`](extensions-logging-use-structured-log-templates.md) |
| 4 | Configure log levels per category | MEDIUM | [`extensions-logging-configure-log-levels-per-category.md`](extensions-logging-configure-log-levels-per-category.md) |
| 5 | Use `BeginScope` | MEDIUM | [`extensions-logging-use-beginscope.md`](extensions-logging-use-beginscope.md) |
| 6 | Never log sensitive data | CRITICAL | [`extensions-logging-never-log-sensitive-data.md`](extensions-logging-never-log-sensitive-data.md) |
| 7 | Set `Microsoft.AspNetCore` and `Microsoft.EntityFrameworkCore` | CRITICAL | [`extensions-logging-set-microsoft-aspnetcore-and-microsoft-entityframeworkcore.md`](extensions-logging-set-microsoft-aspnetcore-and-microsoft-entityframeworkcore.md) |
| 8 | Organize `LoggerMessage` methods | MEDIUM | [`extensions-logging-organize-loggermessage-methods.md`](extensions-logging-organize-loggermessage-methods.md) |
| 9 | Test that critical error paths produce the expected log entries | CRITICAL | [`extensions-logging-test-that-critical-error-paths-produce-the-expected-log.md`](extensions-logging-test-that-critical-error-paths-produce-the-expected-log.md) |
| 10 | Prefer `ILogger<T>` over `ILogger` | CRITICAL | [`extensions-logging-prefer-ilogger-t-over-ilogger.md`](extensions-logging-prefer-ilogger-t-over-ilogger.md) |
