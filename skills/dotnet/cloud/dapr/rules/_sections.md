# Dapr Rules

Best practices and rules for Dapr.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Use the sidecar architecture | CRITICAL | [`dapr-use-the-sidecar-architecture.md`](dapr-use-the-sidecar-architecture.md) |
| 2 | Rely on component YAML files to configure state stores,... | MEDIUM | [`dapr-rely-on-component-yaml-files-to-configure-state-stores.md`](dapr-rely-on-component-yaml-files-to-configure-state-stores.md) |
| 3 | Use `DaprClient` from DI (`builder | MEDIUM | [`dapr-use-daprclient-from-di-builder.md`](dapr-use-daprclient-from-di-builder.md) |
| 4 | Prefer the `[Topic]` attribute on ASP | LOW | [`dapr-prefer-the-topic-attribute-on-asp.md`](dapr-prefer-the-topic-attribute-on-asp.md) |
| 5 | Keep actors lightweight; use them for per-entity stateful... | MEDIUM | [`dapr-keep-actors-lightweight-use-them-for-per-entity-stateful.md`](dapr-keep-actors-lightweight-use-them-for-per-entity-stateful.md) |
| 6 | Use Dapr's built-in resiliency policies (retries, timeouts,... | MEDIUM | [`dapr-use-dapr-s-built-in-resiliency-policies-retries-timeouts.md`](dapr-use-dapr-s-built-in-resiliency-policies-retries-timeouts.md) |
| 7 | Test locally with `dapr run -- dotnet run` and the Dapr CLI | MEDIUM | [`dapr-test-locally-with-dapr-run-dotnet-run-and-the-dapr-cli.md`](dapr-test-locally-with-dapr-run-dotnet-run-and-the-dapr-cli.md) |
