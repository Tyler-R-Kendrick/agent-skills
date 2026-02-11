# Topshelf Rules

Best practices and rules for Topshelf.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Use Topshelf only for .NET Framework services or legacy maintenance | LOW | [`topshelf-use-topshelf-only-for-net-framework-services-or-legacy.md`](topshelf-use-topshelf-only-for-net-framework-services-or-legacy.md) |
| 2 | Always return `true` from `Start` and `Stop` | CRITICAL | [`topshelf-always-return-true-from-start-and-stop.md`](topshelf-always-return-true-from-start-and-stop.md) |
| 3 | Configure service recovery | MEDIUM | [`topshelf-configure-service-recovery.md`](topshelf-configure-service-recovery.md) |
| 4 | Test as a console application first | MEDIUM | [`topshelf-test-as-a-console-application-first.md`](topshelf-test-as-a-console-application-first.md) |
| 5 | Use `RunAsLocalSystem()` for services that do not need network access | CRITICAL | [`topshelf-use-runaslocalsystem-for-services-that-do-not-need-network.md`](topshelf-use-runaslocalsystem-for-services-that-do-not-need-network.md) |
| 6 | Set `StartAutomatically()` | CRITICAL | [`topshelf-set-startautomatically.md`](topshelf-set-startautomatically.md) |
| 7 | Enable `EnableShutdown()` | MEDIUM | [`topshelf-enable-enableshutdown.md`](topshelf-enable-enableshutdown.md) |
| 8 | Use the `HostControl` parameter in `Start`/`Stop` | MEDIUM | [`topshelf-use-the-hostcontrol-parameter-in-start-stop.md`](topshelf-use-the-hostcontrol-parameter-in-start-stop.md) |
| 9 | Integrate a DI container | MEDIUM | [`topshelf-integrate-a-di-container.md`](topshelf-integrate-a-di-container.md) |
| 10 | Plan migration to BackgroundService | MEDIUM | [`topshelf-plan-migration-to-backgroundservice.md`](topshelf-plan-migration-to-backgroundservice.md) |
