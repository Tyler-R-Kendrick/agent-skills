# .NET Worker Services Rules

Best practices and rules for .NET Worker Services.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Always respect the `stoppingToken` | CRITICAL | [`dotnet-worker-services-always-respect-the-stoppingtoken.md`](dotnet-worker-services-always-respect-the-stoppingtoken.md) |
| 2 | Use `IServiceScopeFactory` to create scoped services | MEDIUM | [`dotnet-worker-services-use-iservicescopefactory-to-create-scoped-services.md`](dotnet-worker-services-use-iservicescopefactory-to-create-scoped-services.md) |
| 3 | Catch `OperationCanceledException` separately | MEDIUM | [`dotnet-worker-services-catch-operationcanceledexception-separately.md`](dotnet-worker-services-catch-operationcanceledexception-separately.md) |
| 4 | Use `PeriodicTimer` instead of `Task.Delay` in a loop | MEDIUM | [`dotnet-worker-services-use-periodictimer-instead-of-task-delay-in-a-loop.md`](dotnet-worker-services-use-periodictimer-instead-of-task-delay-in-a-loop.md) |
| 5 | Configure `BackgroundServiceExceptionBehavior` | MEDIUM | [`dotnet-worker-services-configure-backgroundserviceexceptionbehavior.md`](dotnet-worker-services-configure-backgroundserviceexceptionbehavior.md) |
| 6 | Set the shutdown timeout | MEDIUM | [`dotnet-worker-services-set-the-shutdown-timeout.md`](dotnet-worker-services-set-the-shutdown-timeout.md) |
| 7 | Log at startup and shutdown boundaries | MEDIUM | [`dotnet-worker-services-log-at-startup-and-shutdown-boundaries.md`](dotnet-worker-services-log-at-startup-and-shutdown-boundaries.md) |
| 8 | Avoid blocking `StartAsync` | HIGH | [`dotnet-worker-services-avoid-blocking-startasync.md`](dotnet-worker-services-avoid-blocking-startasync.md) |
| 9 | Use `AddWindowsService()` or `AddSystemd()` | CRITICAL | [`dotnet-worker-services-use-addwindowsservice-or-addsystemd.md`](dotnet-worker-services-use-addwindowsservice-or-addsystemd.md) |
| 10 | Register multiple `BackgroundService` implementations | MEDIUM | [`dotnet-worker-services-register-multiple-backgroundservice-implementations.md`](dotnet-worker-services-register-multiple-backgroundservice-implementations.md) |
