# Dapr Rules

Best practices and rules for Dapr.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Use the Dapr sidecar architecture exclusively; never embed... | CRITICAL | [`dapr-use-the-dapr-sidecar-architecture-exclusively-never-embed.md`](dapr-use-the-dapr-sidecar-architecture-exclusively-never-embed.md) |
| 2 | Inject `DaprClient` from DI via `builder | HIGH | [`dapr-inject-daprclient-from-di-via-builder.md`](dapr-inject-daprclient-from-di-via-builder.md) |
| 3 | Configure state stores, pub/sub brokers, and bindings via... | MEDIUM | [`dapr-configure-state-stores-pub-sub-brokers-and-bindings-via.md`](dapr-configure-state-stores-pub-sub-brokers-and-bindings-via.md) |
| 4 | Use `GetStateAndETagAsync` with `TrySaveStateAsync` for... | MEDIUM | [`dapr-use-getstateandetagasync-with-trysavestateasync-for.md`](dapr-use-getstateandetagasync-with-trysavestateasync-for.md) |
| 5 | Prefer the `[Topic("pubsub", "topic-name")]` attribute on... | LOW | [`dapr-prefer-the-topic-pubsub-topic-name-attribute-on.md`](dapr-prefer-the-topic-pubsub-topic-name-attribute-on.md) |
| 6 | Keep actors lightweight and focused on single-entity state... | HIGH | [`dapr-keep-actors-lightweight-and-focused-on-single-entity-state.md`](dapr-keep-actors-lightweight-and-focused-on-single-entity-state.md) |
| 7 | Use Dapr's built-in resiliency policies (retries, timeouts,... | MEDIUM | [`dapr-use-dapr-s-built-in-resiliency-policies-retries-timeouts.md`](dapr-use-dapr-s-built-in-resiliency-policies-retries-timeouts.md) |
| 8 | Test service invocation locally with `dapr run -- dotnet... | MEDIUM | [`dapr-test-service-invocation-locally-with-dapr-run-dotnet.md`](dapr-test-service-invocation-locally-with-dapr-run-dotnet.md) |
| 9 | Use `InvokeMethodAsync<TRequest, TResponse>` with... | MEDIUM | [`dapr-use-invokemethodasync-trequest-tresponse-with.md`](dapr-use-invokemethodasync-trequest-tresponse-with.md) |
| 10 | Store secrets in a Dapr secret store component (Azure Key... | CRITICAL | [`dapr-store-secrets-in-a-dapr-secret-store-component-azure-key.md`](dapr-store-secrets-in-a-dapr-secret-store-component-azure-key.md) |
