# CliWrap Rules

Best practices and rules for CliWrap.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Use `WithArguments(string[])` (array overload) instead of... | MEDIUM | [`cliwrap-use-witharguments-string-array-overload-instead-of.md`](cliwrap-use-witharguments-string-array-overload-instead-of.md) |
| 2 | Use `ExecuteBufferedAsync` only for commands with bounded... | HIGH | [`cliwrap-use-executebufferedasync-only-for-commands-with-bounded.md`](cliwrap-use-executebufferedasync-only-for-commands-with-bounded.md) |
| 3 | Set `WithValidation(CommandResultValidation | MEDIUM | [`cliwrap-set-withvalidation-commandresultvalidation.md`](cliwrap-set-withvalidation-commandresultvalidation.md) |
| 4 | Always pass `CancellationToken` to `ExecuteAsync` and... | CRITICAL | [`cliwrap-always-pass-cancellationtoken-to-executeasync-and.md`](cliwrap-always-pass-cancellationtoken-to-executeasync-and.md) |
| 5 | Use `WithWorkingDirectory` to set the process working... | MEDIUM | [`cliwrap-use-withworkingdirectory-to-set-the-process-working.md`](cliwrap-use-withworkingdirectory-to-set-the-process-working.md) |
| 6 | Create typed wrapper classes (e | MEDIUM | [`cliwrap-create-typed-wrapper-classes-e.md`](cliwrap-create-typed-wrapper-classes-e.md) |
| 7 | Use `PipeTarget | MEDIUM | [`cliwrap-use-pipetarget.md`](cliwrap-use-pipetarget.md) |
| 8 | Handle `CommandExecutionException` specifically (not just... | MEDIUM | [`cliwrap-handle-commandexecutionexception-specifically-not-just.md`](cliwrap-handle-commandexecutionexception-specifically-not-just.md) |
| 9 | Use the `|` pipe operator between `Command` instances... | MEDIUM | [`cliwrap-use-the-pipe-operator-between-command-instances.md`](cliwrap-use-the-pipe-operator-between-command-instances.md) |
| 10 | Set environment variables with `WithEnvironmentVariables`... | MEDIUM | [`cliwrap-set-environment-variables-with-withenvironmentvariables.md`](cliwrap-set-environment-variables-with-withenvironmentvariables.md) |
