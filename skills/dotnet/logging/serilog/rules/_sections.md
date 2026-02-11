# Serilog Rules

Best practices and rules for Serilog.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Use message templates instead of string interpolation | MEDIUM | [`serilog-use-message-templates-instead-of-string-interpolation.md`](serilog-use-message-templates-instead-of-string-interpolation.md) |
| 2 | Use the `@` destructuring operator | MEDIUM | [`serilog-use-the-destructuring-operator.md`](serilog-use-the-destructuring-operator.md) |
| 3 | Call `Log.CloseAndFlush()` | HIGH | [`serilog-call-log-closeandflush.md`](serilog-call-log-closeandflush.md) |
| 4 | Override framework log levels | CRITICAL | [`serilog-override-framework-log-levels.md`](serilog-override-framework-log-levels.md) |
| 5 | Use `Serilog.AspNetCore`'s `UseSerilogRequestLogging()` | MEDIUM | [`serilog-use-serilog-aspnetcore-s-useserilogrequestlogging.md`](serilog-use-serilog-aspnetcore-s-useserilogrequestlogging.md) |
| 6 | Enrich globally with `FromLogContext` | MEDIUM | [`serilog-enrich-globally-with-fromlogcontext.md`](serilog-enrich-globally-with-fromlogcontext.md) |
| 7 | Configure sinks in `appsettings.json` | MEDIUM | [`serilog-configure-sinks-in-appsettings-json.md`](serilog-configure-sinks-in-appsettings-json.md) |
| 8 | Wrap high-latency sinks | HIGH | [`serilog-wrap-high-latency-sinks.md`](serilog-wrap-high-latency-sinks.md) |
| 9 | Avoid logging sensitive data | HIGH | [`serilog-avoid-logging-sensitive-data.md`](serilog-avoid-logging-sensitive-data.md) |
| 10 | Use the two-stage initialization pattern | MEDIUM | [`serilog-use-the-two-stage-initialization-pattern.md`](serilog-use-the-two-stage-initialization-pattern.md) |
