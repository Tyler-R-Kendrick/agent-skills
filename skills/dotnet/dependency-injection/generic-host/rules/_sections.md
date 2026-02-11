# Generic Host Rules

Best practices and rules for Generic Host.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Use `Host.CreateApplicationBuilder(args)` over the older... | MEDIUM | [`generic-host-use-host-createapplicationbuilder-args-over-the-older.md`](generic-host-use-host-createapplicationbuilder-args-over-the-older.md) |
| 2 | Inject `IServiceScopeFactory` in `BackgroundService` and... | MEDIUM | [`generic-host-inject-iservicescopefactory-in-backgroundservice-and.md`](generic-host-inject-iservicescopefactory-in-backgroundservice-and.md) |
| 3 | Use `PeriodicTimer` (introduced in | MEDIUM | [`generic-host-use-periodictimer-introduced-in.md`](generic-host-use-periodictimer-introduced-in.md) |
| 4 | Always catch and log exceptions inside `ExecuteAsync`... | CRITICAL | [`generic-host-always-catch-and-log-exceptions-inside-executeasync.md`](generic-host-always-catch-and-log-exceptions-inside-executeasync.md) |
| 5 | Keep `Program | MEDIUM | [`generic-host-keep-program.md`](generic-host-keep-program.md) |
| 6 | Configure `HostOptions | HIGH | [`generic-host-configure-hostoptions.md`](generic-host-configure-hostoptions.md) |
| 7 | Use `IHostApplicationLifetime | MEDIUM | [`generic-host-use-ihostapplicationlifetime.md`](generic-host-use-ihostapplicationlifetime.md) |
| 8 | Call `AddWindowsService()` and `AddSystemd()` to integrate... | CRITICAL | [`generic-host-call-addwindowsservice-and-addsystemd-to-integrate.md`](generic-host-call-addwindowsservice-and-addsystemd-to-integrate.md) |
| 9 | Register startup tasks as `IHostedService` (not... | MEDIUM | [`generic-host-register-startup-tasks-as-ihostedservice-not.md`](generic-host-register-startup-tasks-as-ihostedservice-not.md) |
| 10 | Set the `DOTNET_ENVIRONMENT` (or `ASPNETCORE_ENVIRONMENT`)... | CRITICAL | [`generic-host-set-the-dotnet-environment-or-aspnetcore-environment.md`](generic-host-set-the-dotnet-environment-or-aspnetcore-environment.md) |
