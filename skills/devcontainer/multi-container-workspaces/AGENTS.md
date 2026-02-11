# Multi-Container Workspaces

## Overview
Multi-container workspaces use Docker Compose to run sidecar services (databases, caches, queues) alongside the main dev container. The dev container connects to sidecars over the Compose network, giving you a production-like topology in development.

## Basic Setup
### docker-compose.yml
```yaml
services:
  app:
    build:
      context: .
      dockerfile: .devcontainer/Dockerfile
    volumes:
      - ..:/workspace:cached
    command: sleep infinity

  db:
    image: postgres:16
    restart: unless-stopped
    environment:
      POSTGRES_USER: dev
      POSTGRES_PASSWORD: devpass
      POSTGRES_DB: myapp
    volumes:
      - pgdata:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    restart: unless-stopped

volumes:
  pgdata:
```

### devcontainer.json
```jsonc
{
  "name": "Full Stack App",
  "dockerComposeFile": "docker-compose.yml",
  "service": "app",
  "workspaceFolder": "/workspace",
  "runServices": ["app", "db", "redis"],
  "shutdownAction": "stopCompose",
  "forwardPorts": [3000, "db:5432", "redis:6379"],
  "postCreateCommand": "npm ci && npm run db:migrate",
  "remoteEnv": {
    "DATABASE_URL": "postgresql://dev:devpass@db:5432/myapp",
    "REDIS_URL": "redis://redis:6379"
  }
}
```

## Key Properties
| Property | Description |
|----------|-------------|
| `dockerComposeFile` | Path(s) to Compose file(s). Can be a string or array. |
| `service` | The service to attach the editor to (your dev container). |
| `workspaceFolder` | Path inside the container where the repo is mounted. |
| `runServices` | Which services to start. Omit to start all. |
| `shutdownAction` | `stopCompose` (stop all) or `none` (leave running). |
| `forwardPorts` | Forward ports; use `"service:port"` for sidecar ports. |

## Multiple Compose Files
Override the base Compose file with a dev-specific overlay:
```jsonc
{
  "dockerComposeFile": [
    "docker-compose.yml",
    "docker-compose.dev.yml"
  ],
  "service": "app"
}
```
The dev overlay can add volumes, environment variables, or features only needed in development.

## Compose Override Example
```yaml
# docker-compose.dev.yml
services:
  app:
    volumes:
      - ..:/workspace:cached
    environment:
      - ASPNETCORE_ENVIRONMENT=Development
    command: sleep infinity
```

## Service Networking
All services in the same Compose file share a network. Reference sidecars by their service name:
- `db:5432` — PostgreSQL
- `redis:6379` — Redis
- `rabbitmq:5672` — RabbitMQ
- `azurite:10000` — Azure Storage emulator

No `localhost` — always use the **service name** as the hostname.

## Health Checks and Dependencies
Ensure sidecars are ready before running setup commands:
```yaml
services:
  db:
    image: postgres:16
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U dev"]
      interval: 5s
      timeout: 3s
      retries: 5

  app:
    depends_on:
      db:
        condition: service_healthy
```

## Parallel postCreateCommand
Run multiple setup steps concurrently:
```jsonc
{
  "postCreateCommand": {
    "backend": "dotnet restore",
    "frontend": "npm ci",
    "migrations": "npm run db:migrate",
    "seed": "npm run db:seed"
  }
}
```

## Best Practices
- Always use `"shutdownAction": "stopCompose"` to clean up sidecar containers when the Codespace stops.
- Use named volumes for database data so it survives container rebuilds.
- Add health checks to sidecar services and `depends_on` with `condition: service_healthy` for the app service.
- Reference sidecars by service name, never `localhost` — they are separate containers on the Compose network.
- Keep sidecar images pinned to major versions (e.g., `postgres:16`, not `postgres:latest`) for reproducibility.
- Use `remoteEnv` for connection strings so they are available in the integrated terminal.
- Separate dev-only configuration into a `docker-compose.dev.yml` overlay to keep production Compose files clean.
