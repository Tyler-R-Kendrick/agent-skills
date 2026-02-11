# Docker & Containers Rules

Best practices and rules for Docker & Containers.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Use multi-stage builds | CRITICAL | [`docker-use-multi-stage-builds.md`](docker-use-multi-stage-builds.md) |
| 2 | Pin base image versions with SHA | MEDIUM | [`docker-pin-base-image-versions-with-sha.md`](docker-pin-base-image-versions-with-sha.md) |
| 3 | Run as non-root | CRITICAL | [`docker-run-as-non-root.md`](docker-run-as-non-root.md) |
| 4 | Use .dockerignore | CRITICAL | [`docker-use-dockerignore.md`](docker-use-dockerignore.md) |
| 5 | Scan images in CI | MEDIUM | [`docker-scan-images-in-ci.md`](docker-scan-images-in-ci.md) |
| 6 | Use health checks | MEDIUM | [`docker-use-health-checks.md`](docker-use-health-checks.md) |
| 7 | Prefer COPY over ADD | LOW | [`docker-prefer-copy-over-add.md`](docker-prefer-copy-over-add.md) |
| 8 | Keep images small | HIGH | [`docker-keep-images-small.md`](docker-keep-images-small.md) |
