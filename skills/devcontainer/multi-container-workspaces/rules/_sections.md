# Multi-Container Workspaces Rules

Best practices and rules for Multi-Container Workspaces.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Always use `"shutdownAction" | CRITICAL | [`multi-container-workspaces-always-use-shutdownaction.md`](multi-container-workspaces-always-use-shutdownaction.md) |
| 2 | Use named volumes for database data so it survives... | MEDIUM | [`multi-container-workspaces-use-named-volumes-for-database-data-so-it-survives.md`](multi-container-workspaces-use-named-volumes-for-database-data-so-it-survives.md) |
| 3 | Add health checks to sidecar services and `depends_on` with... | MEDIUM | [`multi-container-workspaces-add-health-checks-to-sidecar-services-and-depends-on-with.md`](multi-container-workspaces-add-health-checks-to-sidecar-services-and-depends-on-with.md) |
| 4 | Reference sidecars by service name, never `localhost` | CRITICAL | [`multi-container-workspaces-reference-sidecars-by-service-name-never-localhost.md`](multi-container-workspaces-reference-sidecars-by-service-name-never-localhost.md) |
| 5 | Keep sidecar images pinned to major versions (e | MEDIUM | [`multi-container-workspaces-keep-sidecar-images-pinned-to-major-versions-e.md`](multi-container-workspaces-keep-sidecar-images-pinned-to-major-versions-e.md) |
| 6 | Use `remoteEnv` for connection strings so they are... | MEDIUM | [`multi-container-workspaces-use-remoteenv-for-connection-strings-so-they-are.md`](multi-container-workspaces-use-remoteenv-for-connection-strings-so-they-are.md) |
| 7 | Separate dev-only configuration into a `docker-compose | CRITICAL | [`multi-container-workspaces-separate-dev-only-configuration-into-a-docker-compose.md`](multi-container-workspaces-separate-dev-only-configuration-into-a-docker-compose.md) |
