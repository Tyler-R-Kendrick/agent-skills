# Docker-in-Docker Rules

Best practices and rules for Docker-in-Docker.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Prefer DinD in Codespaces | LOW | [`docker-in-docker-prefer-dind-in-codespaces.md`](docker-in-docker-prefer-dind-in-codespaces.md) |
| 2 | Use `postStartCommand` (not `postCreateCommand`) to launch... | MEDIUM | [`docker-in-docker-use-poststartcommand-not-postcreatecommand-to-launch.md`](docker-in-docker-use-poststartcommand-not-postcreatecommand-to-launch.md) |
| 3 | Add `"installDockerBuildx" | MEDIUM | [`docker-in-docker-add-installdockerbuildx.md`](docker-in-docker-add-installdockerbuildx.md) |
| 4 | Set resource limits on inner containers to avoid exhausting... | HIGH | [`docker-in-docker-set-resource-limits-on-inner-containers-to-avoid-exhausting.md`](docker-in-docker-set-resource-limits-on-inner-containers-to-avoid-exhausting.md) |
| 5 | Use named volumes in Compose files so data persists across... | MEDIUM | [`docker-in-docker-use-named-volumes-in-compose-files-so-data-persists-across.md`](docker-in-docker-use-named-volumes-in-compose-files-so-data-persists-across.md) |
