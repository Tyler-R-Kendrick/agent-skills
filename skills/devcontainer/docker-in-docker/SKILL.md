---
name: docker-in-docker
description: |
    Use when configuring Docker-in-Docker inside a dev container or Codespace. Covers the DinD feature, Docker Compose, building images, and running containers from within the dev environment.
    USE FOR: running Docker inside dev containers, DinD feature configuration, building images in Codespaces, Compose inside containers
    DO NOT USE FOR: general devcontainer.json schema (use devcontainer), sidecar services via Compose (use multi-container-workspaces), production Docker builds (use iac/docker)
license: MIT
metadata:
  displayName: "Docker-in-Docker"
  author: "Tyler-R-Kendrick"
compatibility: claude, copilot, cursor
---

# Docker-in-Docker

## Overview
Docker-in-Docker (DinD) lets you build images, run containers, and use Docker Compose from inside a dev container. This is essential for projects that build container images as part of their workflow or run integration tests against containers.

## Enable the Feature
```jsonc
{
  "features": {
    "ghcr.io/devcontainers/features/docker-in-docker:2": {
      "version": "latest",
      "dockerDashComposeVersion": "v2"
    }
  }
}
```

### Feature Options
| Option | Default | Description |
|--------|---------|-------------|
| `version` | `latest` | Docker Engine version |
| `dockerDashComposeVersion` | `v2` | Compose version (`v2`, `none`) |
| `moby` | `true` | Use Moby (open-source Docker Engine) |
| `installDockerBuildx` | `true` | Install Docker Buildx plugin |
| `installDockerComposeSwitch` | `true` | Install `docker-compose` v1 compatibility shim |

## Docker-in-Docker vs Docker-outside-of-Docker
| Approach | Feature ID | How It Works |
|----------|-----------|-------------|
| DinD | `docker-in-docker:2` | Runs a full Docker daemon inside the container |
| DooD | `docker-outside-of-docker:1` | Mounts the host Docker socket into the container |

Use **DinD** when:
- You need full isolation (CI, untrusted builds)
- Building images that should not affect the host
- Running in Codespaces (no host socket available)

Use **DooD** when:
- You want to share the host's image cache
- Running locally and want faster builds

## Full Example
```jsonc
{
  "name": "Container Build Environment",
  "image": "mcr.microsoft.com/devcontainers/base:ubuntu",
  "features": {
    "ghcr.io/devcontainers/features/docker-in-docker:2": {
      "version": "latest",
      "dockerDashComposeVersion": "v2",
      "installDockerBuildx": true
    }
  },
  "postCreateCommand": "docker compose version",
  "customizations": {
    "vscode": {
      "extensions": ["ms-azuretools.vscode-docker"]
    }
  }
}
```

## Running Containers Inside the Dev Container
Once DinD is enabled, `docker` and `docker compose` work normally:
```bash
# Build an image
docker build -t my-app .

# Run a service stack
docker compose up -d

# Run integration tests against a container
docker run --rm -d -p 5432:5432 postgres:16
```

## Compose for Dev Dependencies
Create a `docker-compose.test.yml` for containers needed during development:
```yaml
services:
  postgres:
    image: postgres:16
    environment:
      POSTGRES_PASSWORD: devpass
    ports:
      - "5432:5432"
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
```
Then start them in `postStartCommand`:
```jsonc
{
  "postStartCommand": "docker compose -f docker-compose.test.yml up -d"
}
```

## Best Practices
- Prefer DinD in Codespaces — there is no host Docker socket to mount.
- Use `postStartCommand` (not `postCreateCommand`) to launch containers so they restart on every Codespace resume.
- Add `"installDockerBuildx": true` if you use multi-stage or multi-platform builds.
- Set resource limits on inner containers to avoid exhausting the Codespace machine.
- Use named volumes in Compose files so data persists across container restarts.
