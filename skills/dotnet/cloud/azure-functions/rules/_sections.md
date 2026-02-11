# Azure Functions Rules

Best practices and rules for Azure Functions.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Use the isolated worker model... | MEDIUM | [`azure-functions-use-the-isolated-worker-model.md`](azure-functions-use-the-isolated-worker-model.md) |
| 2 | Register services in `ConfigureServices` and use... | CRITICAL | [`azure-functions-register-services-in-configureservices-and-use.md`](azure-functions-register-services-in-configureservices-and-use.md) |
| 3 | Use `AuthorizationLevel | MEDIUM | [`azure-functions-use-authorizationlevel.md`](azure-functions-use-authorizationlevel.md) |
| 4 | Set `Route = "orders/{id | MEDIUM | [`azure-functions-set-route-orders-id.md`](azure-functions-set-route-orders-id.md) |
| 5 | Use Durable Functions (`OrchestrationTrigger` +... | MEDIUM | [`azure-functions-use-durable-functions-orchestrationtrigger.md`](azure-functions-use-durable-functions-orchestrationtrigger.md) |
| 6 | Keep function execution time under 5 minutes on the... | MEDIUM | [`azure-functions-keep-function-execution-time-under-5-minutes-on-the.md`](azure-functions-keep-function-execution-time-under-5-minutes-on-the.md) |
| 7 | Store connection strings and secrets in `local | CRITICAL | [`azure-functions-store-connection-strings-and-secrets-in-local.md`](azure-functions-store-connection-strings-and-secrets-in-local.md) |
| 8 | Use `[QueueOutput]` and `[BlobOutput]` attributes for... | MEDIUM | [`azure-functions-use-queueoutput-and-bloboutput-attributes-for.md`](azure-functions-use-queueoutput-and-bloboutput-attributes-for.md) |
| 9 | Add Application Insights with... | MEDIUM | [`azure-functions-add-application-insights-with.md`](azure-functions-add-application-insights-with.md) |
| 10 | Test functions by creating instances of your function class... | CRITICAL | [`azure-functions-test-functions-by-creating-instances-of-your-function-class.md`](azure-functions-test-functions-by-creating-instances-of-your-function-class.md) |
