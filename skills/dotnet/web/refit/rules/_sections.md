# Refit Rules

Best practices and rules for Refit.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Define one Refit interface per API domain | MEDIUM | [`refit-define-one-refit-interface-per-api-domain.md`](refit-define-one-refit-interface-per-api-domain.md) |
| 2 | Use `AddRefitClient<T>()` with `ConfigureHttpClient()` instead of `RestService.For<T>()` | HIGH | [`refit-use-addrefitclient-t-with-configurehttpclient-instead-of.md`](refit-use-addrefitclient-t-with-configurehttpclient-instead-of.md) |
| 3 | Return `Task<ApiResponse<T>>` instead of `Task<T>` on interface methods | MEDIUM | [`refit-return-task-apiresponse-t-instead-of-task-t-on-interface.md`](refit-return-task-apiresponse-t-instead-of-task-t-on-interface.md) |
| 4 | Add resilience with `.AddStandardResilienceHandler()` from `Microsoft.Extensions.Http.Resilience` | HIGH | [`refit-add-resilience-with-addstandardresiliencehandler-from.md`](refit-add-resilience-with-addstandardresiliencehandler-from.md) |
| 5 | Use `[Query]` on complex type parameters | MEDIUM | [`refit-use-query-on-complex-type-parameters.md`](refit-use-query-on-complex-type-parameters.md) |
| 6 | Implement `DelegatingHandler` for cross-cutting concerns | HIGH | [`refit-implement-delegatinghandler-for-cross-cutting-concerns.md`](refit-implement-delegatinghandler-for-cross-cutting-concerns.md) |
| 7 | Use `[Authorize("Bearer")]` on a string parameter for per-request token injection | CRITICAL | [`refit-use-authorize-bearer-on-a-string-parameter-for-per-request.md`](refit-use-authorize-bearer-on-a-string-parameter-for-per-request.md) |
| 8 | Configure `RefitSettings` with `SystemTextJsonContentSerializer` | HIGH | [`refit-configure-refitsettings-with-systemtextjsoncontentserializer.md`](refit-configure-refitsettings-with-systemtextjsoncontentserializer.md) |
| 9 | Dispose `ApiResponse<T>` objects | MEDIUM | [`refit-dispose-apiresponse-t-objects.md`](refit-dispose-apiresponse-t-objects.md) |
| 10 | Use `[AliasAs("name")]` on parameters and properties | MEDIUM | [`refit-use-aliasas-name-on-parameters-and-properties.md`](refit-use-aliasas-name-on-parameters-and-properties.md) |
