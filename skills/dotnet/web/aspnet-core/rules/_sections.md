# ASP.NET Core Rules

Best practices and rules for ASP.NET Core.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Use `TypedResults` return types (e.g., `Task<Results<Ok<T>, NotFound>>`) on minimal API endpoints | MEDIUM | [`aspnet-core-use-typedresults-return-types-e-g-task-results-ok-t.md`](aspnet-core-use-typedresults-return-types-e-g-task-results-ok-t.md) |
| 2 | Register `DbContext` as `Scoped` (the default for `AddDbContext`) and never inject it into `Singleton` services | CRITICAL | [`aspnet-core-register-dbcontext-as-scoped-the-default-for-adddbcontext.md`](aspnet-core-register-dbcontext-as-scoped-the-default-for-adddbcontext.md) |
| 3 | Order middleware in the pipeline according to the official ASP.NET Core documentation | MEDIUM | [`aspnet-core-order-middleware-in-the-pipeline-according-to-the-official.md`](aspnet-core-order-middleware-in-the-pipeline-according-to-the-official.md) |
| 4 | Use the `IOptions<T>` / `IOptionsSnapshot<T>` / `IOptionsMonitor<T>` pattern for configuration | HIGH | [`aspnet-core-use-the-ioptions-t-ioptionssnapshot-t-ioptionsmonitor-t.md`](aspnet-core-use-the-ioptions-t-ioptionssnapshot-t-ioptionsmonitor-t.md) |
| 5 | Configure `AddProblemDetails()` and `UseExceptionHandler()` to return RFC 7807 problem details for all error responses | MEDIUM | [`aspnet-core-configure-addproblemdetails-and-useexceptionhandler-to.md`](aspnet-core-configure-addproblemdetails-and-useexceptionhandler-to.md) |
| 6 | Use `AddHttpClient<T>()` with `AddStandardResilienceHandler()` from `Microsoft.Extensions.Http.Resilience` | HIGH | [`aspnet-core-use-addhttpclient-t-with-addstandardresiliencehandler-from.md`](aspnet-core-use-addhttpclient-t-with-addstandardresiliencehandler-from.md) |
| 7 | Apply rate limiting using `AddRateLimiter()` with named policies | HIGH | [`aspnet-core-apply-rate-limiting-using-addratelimiter-with-named-policies.md`](aspnet-core-apply-rate-limiting-using-addratelimiter-with-named-policies.md) |
| 8 | Use `MapGroup()` to organize related endpoints under a shared prefix, tag, and filter set | HIGH | [`aspnet-core-use-mapgroup-to-organize-related-endpoints-under-a-shared.md`](aspnet-core-use-mapgroup-to-organize-related-endpoints-under-a-shared.md) |
| 9 | Register health checks using `AddHealthChecks().AddDbContextCheck<T>()` and `.AddCheck<CustomCheck>()` | MEDIUM | [`aspnet-core-register-health-checks-using-addhealthchecks.md`](aspnet-core-register-health-checks-using-addhealthchecks.md) |
| 10 | Set `builder.Configuration.GetConnectionString()` values from environment variables or Azure Key Vault in production | CRITICAL | [`aspnet-core-set-builder-configuration-getconnectionstring-values-from.md`](aspnet-core-set-builder-configuration-getconnectionstring-values-from.md) |
