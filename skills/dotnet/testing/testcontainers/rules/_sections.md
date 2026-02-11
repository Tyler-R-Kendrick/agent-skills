# Testcontainers Rules

Best practices and rules for Testcontainers.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Implement `IAsyncLifetime` for container lifecycle management | HIGH | [`testcontainers-implement-iasynclifetime-for-container-lifecycle-management.md`](testcontainers-implement-iasynclifetime-for-container-lifecycle-management.md) |
| 2 | Use xUnit collection fixtures to share containers across test classes | HIGH | [`testcontainers-use-xunit-collection-fixtures-to-share-containers-across.md`](testcontainers-use-xunit-collection-fixtures-to-share-containers-across.md) |
| 3 | Pin container image versions explicitly | HIGH | [`testcontainers-pin-container-image-versions-explicitly.md`](testcontainers-pin-container-image-versions-explicitly.md) |
| 4 | Use `EnsureCreatedAsync` or `MigrateAsync` to set up the schema | HIGH | [`testcontainers-use-ensurecreatedasync-or-migrateasync-to-set-up-the-schema.md`](testcontainers-use-ensurecreatedasync-or-migrateasync-to-set-up-the-schema.md) |
| 5 | Clean up data between tests when sharing containers | MEDIUM | [`testcontainers-clean-up-data-between-tests-when-sharing-containers.md`](testcontainers-clean-up-data-between-tests-when-sharing-containers.md) |
| 6 | Configure appropriate container startup timeouts | HIGH | [`testcontainers-configure-appropriate-container-startup-timeouts.md`](testcontainers-configure-appropriate-container-startup-timeouts.md) |
| 7 | Replace the real database in `WebApplicationFactory` | CRITICAL | [`testcontainers-replace-the-real-database-in-webapplicationfactory.md`](testcontainers-replace-the-real-database-in-webapplicationfactory.md) |
| 8 | Use lightweight Alpine-based images where available | MEDIUM | [`testcontainers-use-lightweight-alpine-based-images-where-available.md`](testcontainers-use-lightweight-alpine-based-images-where-available.md) |
| 9 | Ensure Docker is available in your CI/CD environment | HIGH | [`testcontainers-ensure-docker-is-available-in-your-ci-cd-environment.md`](testcontainers-ensure-docker-is-available-in-your-ci-cd-environment.md) |
| 10 | Test real database behavior, not ORM abstractions | MEDIUM | [`testcontainers-test-real-database-behavior-not-orm-abstractions.md`](testcontainers-test-real-database-behavior-not-orm-abstractions.md) |
