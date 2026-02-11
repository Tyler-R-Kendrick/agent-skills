# Dev Container — Aspire

## Overview
.NET Aspire orchestrates multi-service distributed applications and launches containers for dependencies (Redis, PostgreSQL, RabbitMQ, etc.) at runtime. Running Aspire in a dev container requires Docker-in-Docker because the Aspire app host starts containers via the Docker API.

## Minimal Configuration
```jsonc
{
  "name": "Aspire",
  "image": "mcr.microsoft.com/devcontainers/dotnet:9.0",
  "features": {
    "ghcr.io/devcontainers/features/docker-in-docker:2": {
      "version": "latest",
      "dockerDashComposeVersion": "v2"
    }
  },
  "postCreateCommand": "dotnet workload install aspire && dotnet restore",
  "forwardPorts": [15888, 18888],
  "portsAttributes": {
    "15888": { "label": "Aspire Dashboard (HTTP)", "onAutoForward": "notify" },
    "18888": { "label": "Aspire Dashboard (HTTPS)", "onAutoForward": "notify" }
  },
  "customizations": {
    "vscode": {
      "extensions": [
        "ms-dotnettools.csdevkit",
        "ms-dotnettools.csharp",
        "ms-azuretools.vscode-docker"
      ]
    }
  }
}
```

## Using the Dotnet Feature with Aspire Workload
If you need a base image with other features:
```jsonc
{
  "image": "mcr.microsoft.com/devcontainers/base:ubuntu",
  "features": {
    "ghcr.io/devcontainers/features/dotnet:2": {
      "version": "9.0",
      "workloads": "aspire"
    },
    "ghcr.io/devcontainers/features/docker-in-docker:2": {}
  }
}
```

## Why Docker-in-Docker Is Required
Aspire's app host uses the Docker API to:
- Pull and run container images for resources (Redis, PostgreSQL, RabbitMQ, Kafka, etc.)
- Manage container lifecycle and networking
- Wire up service discovery between containers and .NET projects

Without DinD, `docker` commands inside the dev container will fail. Always include the `docker-in-docker` feature.

## Port Forwarding
Aspire uses several ports. Forward them so the dashboard and services are accessible:

| Port | Service |
|------|---------|
| 15888 | Aspire Dashboard (HTTP) |
| 18888 | Aspire Dashboard (HTTPS) |
| 5000–5010 | Application HTTP endpoints (varies) |
| 5432 | PostgreSQL (if used) |
| 6379 | Redis (if used) |
| 5672 | RabbitMQ (if used) |

Use a port range or `"onAutoForward": "notify"` for dynamic ports:
```jsonc
{
  "forwardPorts": [15888, 18888, "5000-5010"],
  "portsAttributes": {
    "5000-5010": { "onAutoForward": "notify" }
  }
}
```

## Full Example with App Host
```jsonc
{
  "name": "Aspire Distributed App",
  "image": "mcr.microsoft.com/devcontainers/dotnet:9.0",
  "features": {
    "ghcr.io/devcontainers/features/docker-in-docker:2": {
      "version": "latest",
      "dockerDashComposeVersion": "v2"
    },
    "ghcr.io/devcontainers/features/node:1": {
      "version": "22"
    },
    "ghcr.io/devcontainers/features/github-cli:1": {}
  },
  "forwardPorts": [15888, 18888, 5000, 5001, 5173],
  "postCreateCommand": {
    "workloads": "dotnet workload install aspire",
    "restore": "dotnet restore",
    "frontend": "cd src/Web && npm ci"
  },
  "containerEnv": {
    "ASPNETCORE_ENVIRONMENT": "Development",
    "DOTNET_CLI_TELEMETRY_OPTOUT": "1"
  },
  "customizations": {
    "vscode": {
      "extensions": [
        "ms-dotnettools.csdevkit",
        "ms-dotnettools.csharp",
        "ms-azuretools.vscode-docker"
      ],
      "settings": {
        "dotnet.defaultSolution": "MyApp.sln"
      }
    }
  }
}
```

## Running Aspire
After the container is created:
```bash
# Run the Aspire app host
dotnet run --project src/MyApp.AppHost

# The dashboard opens at http://localhost:15888
# Aspire automatically pulls and starts container dependencies
```

## Best Practices
- Always include `docker-in-docker:2` — Aspire cannot function without Docker access.
- Install the Aspire workload via the dotnet feature's `workloads` option (cached in prebuilds) rather than `postCreateCommand` when possible.
- Forward the dashboard ports (15888/18888) and set `"onAutoForward": "notify"` for service ports.
- Set `ASPNETCORE_ENVIRONMENT=Development` in `containerEnv` for development-time behavior.
- Add the Node feature if your Aspire solution includes a frontend project (React, Angular, etc.).
- Use Codespaces prebuilds to cache the Aspire workload install and `dotnet restore` — these can be slow.
- Pin the .NET SDK version to match your `global.json` for consistency across the team.
