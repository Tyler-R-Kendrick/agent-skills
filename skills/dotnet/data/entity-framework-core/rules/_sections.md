# Entity Framework Core Rules

Best practices and rules for Entity Framework Core.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Use `AsNoTracking()` on all read-only queries to avoid the... | HIGH | [`entity-framework-core-use-asnotracking-on-all-read-only-queries-to-avoid-the.md`](entity-framework-core-use-asnotracking-on-all-read-only-queries-to-avoid-the.md) |
| 2 | Keep `DbContext` lifetime scoped to the request (the... | CRITICAL | [`entity-framework-core-keep-dbcontext-lifetime-scoped-to-the-request-the.md`](entity-framework-core-keep-dbcontext-lifetime-scoped-to-the-request-the.md) |
| 3 | Use `ExecuteUpdateAsync` and `ExecuteDeleteAsync` for bulk... | MEDIUM | [`entity-framework-core-use-executeupdateasync-and-executedeleteasync-for-bulk.md`](entity-framework-core-use-executeupdateasync-and-executedeleteasync-for-bulk.md) |
| 4 | Always use `Include` or projection (`Select`) to load... | CRITICAL | [`entity-framework-core-always-use-include-or-projection-select-to-load.md`](entity-framework-core-always-use-include-or-projection-select-to-load.md) |
| 5 | Generate idempotent SQL scripts with `dotnet ef migrations... | CRITICAL | [`entity-framework-core-generate-idempotent-sql-scripts-with-dotnet-ef-migrations.md`](entity-framework-core-generate-idempotent-sql-scripts-with-dotnet-ef-migrations.md) |
| 6 | Configure connection resiliency with `EnableRetryOnFailure`... | MEDIUM | [`entity-framework-core-configure-connection-resiliency-with-enableretryonfailure.md`](entity-framework-core-configure-connection-resiliency-with-enableretryonfailure.md) |
| 7 | Use `HasPrecision(18, 2)` on all `decimal` properties in... | HIGH | [`entity-framework-core-use-hasprecision-18-2-on-all-decimal-properties-in.md`](entity-framework-core-use-hasprecision-18-2-on-all-decimal-properties-in.md) |
| 8 | Add interceptors for cross-cutting concerns like audit... | MEDIUM | [`entity-framework-core-add-interceptors-for-cross-cutting-concerns-like-audit.md`](entity-framework-core-add-interceptors-for-cross-cutting-concerns-like-audit.md) |
| 9 | Use `IEntityTypeConfiguration<T>` in separate files per... | MEDIUM | [`entity-framework-core-use-ientitytypeconfiguration-t-in-separate-files-per.md`](entity-framework-core-use-ientitytypeconfiguration-t-in-separate-files-per.md) |
| 10 | Add explicit indexes with `HasIndex` on columns used in... | HIGH | [`entity-framework-core-add-explicit-indexes-with-hasindex-on-columns-used-in.md`](entity-framework-core-add-explicit-indexes-with-hasindex-on-columns-used-in.md) |
