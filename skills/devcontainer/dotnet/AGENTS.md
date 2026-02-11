# Dev Container — .NET

## Overview
Configure a dev container for .NET development using the official dotnet feature. Supports multiple SDK versions, workloads, and integration with C# Dev Kit.

## Dotnet Feature
```jsonc
{
  "features": {
    "ghcr.io/devcontainers/features/dotnet:2": {
      "version": "9.0",
      "additionalVersions": "8.0"
    }
  }
}
```

### Feature Options
| Option | Default | Description |
|--------|---------|-------------|
| `version` | `latest` | Primary .NET SDK version (`9.0`, `8.0`, `latest`, `none`) |
| `additionalVersions` | | Comma-separated extra SDK versions to install |
| `workloads` | | Comma-separated .NET workloads (e.g., `aspire`, `wasm-tools`, `maui`) |
| `installUsingApt` | `true` | Use apt package manager when available |

## Install Workloads
```jsonc
{
  "features": {
    "ghcr.io/devcontainers/features/dotnet:2": {
      "version": "9.0",
      "workloads": "aspire, wasm-tools"
    }
  }
}
```

## Full Example
```jsonc
{
  "name": ".NET 9 Development",
  "image": "mcr.microsoft.com/devcontainers/dotnet:9.0",
  "features": {
    "ghcr.io/devcontainers/features/github-cli:1": {}
  },
  "forwardPorts": [5000, 5001],
  "portsAttributes": {
    "5000": { "label": "HTTP", "onAutoForward": "notify" },
    "5001": { "label": "HTTPS", "onAutoForward": "notify" }
  },
  "postCreateCommand": "dotnet restore",
  "customizations": {
    "vscode": {
      "extensions": [
        "ms-dotnettools.csdevkit",
        "ms-dotnettools.csharp"
      ],
      "settings": {
        "dotnet.defaultSolution": "MyApp.sln"
      }
    }
  }
}
```

## Using the Base Image vs Feature
| Approach | When to Use |
|----------|-------------|
| `"image": "mcr.microsoft.com/devcontainers/dotnet:9.0"` | .NET-only projects; comes preconfigured |
| Base image + `ghcr.io/devcontainers/features/dotnet:2` | Multi-language projects; compose with other features |

## NuGet Configuration
Mount a local NuGet config or set package sources via environment variables:
```jsonc
{
  "containerEnv": {
    "NUGET_PACKAGES": "/home/vscode/.nuget/packages",
    "DOTNET_CLI_TELEMETRY_OPTOUT": "1"
  },
  "mounts": [
    "source=${localEnv:HOME}/.nuget,target=/home/vscode/.nuget,type=bind,consistency=cached"
  ]
}
```

## Multi-Project Solutions
For solutions with multiple projects, set the workspace folder and default solution:
```jsonc
{
  "workspaceFolder": "/workspace",
  "customizations": {
    "vscode": {
      "settings": {
        "dotnet.defaultSolution": "src/MyApp.sln",
        "omnisharp.enableMsBuildLoadProjectsOnDemand": true
      }
    }
  },
  "postCreateCommand": "dotnet restore src/MyApp.sln"
}
```

## Best Practices
- Use the dedicated `mcr.microsoft.com/devcontainers/dotnet` image for .NET-only projects — it includes the SDK, runtime, and common tools.
- Use the dotnet feature on a base image when you need .NET alongside other languages.
- Pin to a major SDK version (`9.0`, `8.0`) rather than `latest` for reproducibility.
- Install workloads via the feature's `workloads` option rather than in `postCreateCommand` so they are cached in prebuilds.
- Add `ms-dotnettools.csdevkit` for full IDE experience (solution explorer, test explorer, refactoring).
- Set `DOTNET_CLI_TELEMETRY_OPTOUT=1` in `containerEnv` for CI-like environments.
- Forward ports 5000/5001 for Kestrel HTTP/HTTPS and use `portsAttributes` for auto-open behavior.
