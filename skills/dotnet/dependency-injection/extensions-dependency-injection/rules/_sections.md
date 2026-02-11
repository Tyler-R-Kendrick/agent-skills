# Dependency Injection Rules

Best practices and rules for Dependency Injection.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Organize service registrations into focused... | MEDIUM | [`extensions-dependency-injection-organize-service-registrations-into-focused.md`](extensions-dependency-injection-organize-service-registrations-into-focused.md) |
| 2 | Choose lifetimes based on state | MEDIUM | [`extensions-dependency-injection-choose-lifetimes-based-on-state.md`](extensions-dependency-injection-choose-lifetimes-based-on-state.md) |
| 3 | Never inject a scoped service into a singleton service --... | CRITICAL | [`extensions-dependency-injection-never-inject-a-scoped-service-into-a-singleton-service.md`](extensions-dependency-injection-never-inject-a-scoped-service-into-a-singleton-service.md) |
| 4 | Enable `ValidateOnBuild` in development environments to... | HIGH | [`extensions-dependency-injection-enable-validateonbuild-in-development-environments-to.md`](extensions-dependency-injection-enable-validateonbuild-in-development-environments-to.md) |
| 5 | Prefer constructor injection over `IServiceProvider | CRITICAL | [`extensions-dependency-injection-prefer-constructor-injection-over-iserviceprovider.md`](extensions-dependency-injection-prefer-constructor-injection-over-iserviceprovider.md) |
| 6 | Use keyed services (` | MEDIUM | [`extensions-dependency-injection-use-keyed-services.md`](extensions-dependency-injection-use-keyed-services.md) |
| 7 | Register `IDisposable` and `IAsyncDisposable` services... | MEDIUM | [`extensions-dependency-injection-register-idisposable-and-iasyncdisposable-services.md`](extensions-dependency-injection-register-idisposable-and-iasyncdisposable-services.md) |
| 8 | Inject `IEnumerable<T>` to receive all registered... | MEDIUM | [`extensions-dependency-injection-inject-ienumerable-t-to-receive-all-registered.md`](extensions-dependency-injection-inject-ienumerable-t-to-receive-all-registered.md) |
| 9 | Avoid registering services with both a concrete type and an... | HIGH | [`extensions-dependency-injection-avoid-registering-services-with-both-a-concrete-type-and-an.md`](extensions-dependency-injection-avoid-registering-services-with-both-a-concrete-type-and-an.md) |
| 10 | Write integration tests that build the real... | CRITICAL | [`extensions-dependency-injection-write-integration-tests-that-build-the-real.md`](extensions-dependency-injection-write-integration-tests-that-build-the-real.md) |
