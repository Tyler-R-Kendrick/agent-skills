# .NET Aspire Rules

Best practices and rules for .NET Aspire.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Use the AppHost project solely for orchestration (defining... | CRITICAL | [`aspire-use-the-apphost-project-solely-for-orchestration-defining.md`](aspire-use-the-apphost-project-solely-for-orchestration-defining.md) |
| 2 | Call `builder | HIGH | [`aspire-call-builder.md`](aspire-call-builder.md) |
| 3 | Use `WithDataVolume()` on database resources (PostgreSQL,... | MEDIUM | [`aspire-use-withdatavolume-on-database-resources-postgresql.md`](aspire-use-withdatavolume-on-database-resources-postgresql.md) |
| 4 | Prefer Aspire's `AddNpgsqlDbContext<T>("name")` over manual... | LOW | [`aspire-prefer-aspire-s-addnpgsqldbcontext-t-name-over-manual.md`](aspire-prefer-aspire-s-addnpgsqldbcontext-t-name-over-manual.md) |
| 5 | Use `WithExternalHttpEndpoints()` only on services that... | MEDIUM | [`aspire-use-withexternalhttpendpoints-only-on-services-that.md`](aspire-use-withexternalhttpendpoints-only-on-services-that.md) |
| 6 | Reference services by name (`https+http | MEDIUM | [`aspire-reference-services-by-name-https-http.md`](aspire-reference-services-by-name-https-http.md) |
| 7 | Use `builder | CRITICAL | [`aspire-use-builder.md`](aspire-use-builder.md) |
| 8 | Add `WithManagementPlugin()`, `WithPgAdmin()`, or... | CRITICAL | [`aspire-add-withmanagementplugin-withpgadmin-or.md`](aspire-add-withmanagementplugin-withpgadmin-or.md) |
| 9 | Run `azd init` and `azd up` for deploying to Azure... | MEDIUM | [`aspire-run-azd-init-and-azd-up-for-deploying-to-azure.md`](aspire-run-azd-init-and-azd-up-for-deploying-to-azure.md) |
| 10 | Open the Aspire Dashboard (automatically launched during... | MEDIUM | [`aspire-open-the-aspire-dashboard-automatically-launched-during.md`](aspire-open-the-aspire-dashboard-automatically-launched-during.md) |
