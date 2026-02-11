---
name: python
description: |
    Use when configuring dev containers for Python projects. Covers the Python feature, virtual environments, tool installation, JupyterLab, and linter/formatter setup.
    USE FOR: Python dev container setup, Python feature configuration, virtual environments, JupyterLab, pip/uv/poetry tooling
    DO NOT USE FOR: .NET dev containers (use dotnet), TypeScript dev containers (use typescript), general devcontainer.json (use devcontainer)
license: MIT
metadata:
  displayName: "Dev Container — Python"
  author: "Tyler-R-Kendrick"
compatibility: claude, copilot, cursor
references:
  - title: "Dev Containers Specification"
    url: "https://containers.dev/"
  - title: "Python Official Documentation"
    url: "https://docs.python.org/3/"
---

# Dev Container — Python

## Overview
Configure a dev container for Python development using the official Python feature or base image. Supports version selection, tool installation via pipx, virtual environments, and JupyterLab.

## Python Feature
```jsonc
{
  "features": {
    "ghcr.io/devcontainers/features/python:1": {
      "version": "3.12"
    }
  }
}
```

### Feature Options
| Option | Default | Description |
|--------|---------|-------------|
| `version` | `latest` | Python version (`3.12`, `3.11`, `latest`, `os-provided`, `none`) |
| `installTools` | `true` | Install tools listed in `toolsToInstall` via pipx |
| `toolsToInstall` | `flake8,autopep8,black,yapf,mypy,pydocstyle,pycodestyle,bandit,pipenv,virtualenv,pytest,pylint` | Comma-separated tools |
| `installJupyterlab` | `false` | Install JupyterLab |
| `optimize` | `false` | Compile Python with optimizations (slower build) |
| `installPath` | `/usr/local/python` | Installation directory |

## Full Example
```jsonc
{
  "name": "Python 3.12 Development",
  "image": "mcr.microsoft.com/devcontainers/python:3.12",
  "features": {
    "ghcr.io/devcontainers/features/github-cli:1": {}
  },
  "forwardPorts": [8000],
  "portsAttributes": {
    "8000": { "label": "App", "onAutoForward": "notify" },
    "8888": { "label": "Jupyter", "onAutoForward": "notify" }
  },
  "postCreateCommand": "pip install -r requirements.txt",
  "customizations": {
    "vscode": {
      "extensions": [
        "ms-python.python",
        "ms-python.vscode-pylance",
        "ms-python.black-formatter",
        "charliermarsh.ruff"
      ],
      "settings": {
        "python.defaultInterpreterPath": "/usr/local/bin/python",
        "[python]": {
          "editor.defaultFormatter": "charliermarsh.ruff",
          "editor.formatOnSave": true
        }
      }
    }
  }
}
```

## Using the Base Image vs Feature
| Approach | When to Use |
|----------|-------------|
| `"image": "mcr.microsoft.com/devcontainers/python:3.12"` | Python-only projects |
| Base image + `ghcr.io/devcontainers/features/python:1` | Multi-language projects |

## Virtual Environments
```jsonc
{
  "postCreateCommand": "python -m venv .venv && . .venv/bin/activate && pip install -r requirements.txt",
  "containerEnv": {
    "VIRTUAL_ENV": "/workspace/.venv",
    "PATH": "/workspace/.venv/bin:${containerEnv:PATH}"
  }
}
```

## JupyterLab
```jsonc
{
  "features": {
    "ghcr.io/devcontainers/features/python:1": {
      "version": "3.12",
      "installJupyterlab": true
    }
  },
  "forwardPorts": [8888],
  "postStartCommand": "jupyter lab --ip=0.0.0.0 --no-browser --NotebookApp.token=''"
}
```

## Poetry / uv / PDM
For modern package managers, install them in `postCreateCommand`:
```jsonc
{
  "postCreateCommand": "pip install uv && uv sync",
  "containerEnv": {
    "UV_LINK_MODE": "copy"
  }
}
```

## Best Practices
- Use the dedicated `mcr.microsoft.com/devcontainers/python` image for Python-only projects.
- Pin the Python version to a minor release (`3.12`, `3.11`) for reproducibility.
- Prefer Ruff over separate flake8/black installs — it replaces multiple tools with a single fast one.
- Use `postCreateCommand` for `pip install` so dependencies are cached in Codespaces prebuilds.
- Set `python.defaultInterpreterPath` in VS Code settings to avoid interpreter selection prompts.
- For data science projects, enable `installJupyterlab` in the feature and forward port 8888.
- Use `containerEnv` to configure `VIRTUAL_ENV` if your project expects a venv.
