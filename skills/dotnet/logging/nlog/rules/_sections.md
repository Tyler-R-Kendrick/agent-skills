# NLog Rules

Best practices and rules for NLog.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Wrap file and database targets with `AsyncWrapper` | HIGH | [`nlog-wrap-file-and-database-targets-with-asyncwrapper.md`](nlog-wrap-file-and-database-targets-with-asyncwrapper.md) |
| 2 | Use `autoReload="true"` | MEDIUM | [`nlog-use-autoreload-true.md`](nlog-use-autoreload-true.md) |
| 3 | Set `final="true"` on framework noise rules | HIGH | [`nlog-set-final-true-on-framework-noise-rules.md`](nlog-set-final-true-on-framework-noise-rules.md) |
| 4 | Use structured logging parameters | MEDIUM | [`nlog-use-structured-logging-parameters.md`](nlog-use-structured-logging-parameters.md) |
| 5 | Configure `archiveAboveSize` and `maxArchiveFiles` | HIGH | [`nlog-configure-archiveabovesize-and-maxarchivefiles.md`](nlog-configure-archiveabovesize-and-maxarchivefiles.md) |
| 6 | Use `MappedDiagnosticsLogicalContext` (MDLC) | MEDIUM | [`nlog-use-mappeddiagnosticslogicalcontext-mdlc.md`](nlog-use-mappeddiagnosticslogicalcontext-mdlc.md) |
| 7 | Call `LogManager.Shutdown()` | MEDIUM | [`nlog-call-logmanager-shutdown.md`](nlog-call-logmanager-shutdown.md) |
| 8 | Use `throwConfigExceptions="true"` | MEDIUM | [`nlog-use-throwconfigexceptions-true.md`](nlog-use-throwconfigexceptions-true.md) |
| 9 | Separate log rules by severity | CRITICAL | [`nlog-separate-log-rules-by-severity.md`](nlog-separate-log-rules-by-severity.md) |
| 10 | Prefer NLog's `ILogger` integration via `NLog.Extensions.Logging` | LOW | [`nlog-prefer-nlog-s-ilogger-integration-via-nlog-extensions.md`](nlog-prefer-nlog-s-ilogger-integration-via-nlog-extensions.md) |
