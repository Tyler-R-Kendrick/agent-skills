# Dev Containers

Use when configuring dev containers or GitHub Codespaces. Covers devcontainer.json schema, features, lifecycle hooks, port forwarding, and customizations.

## Structure

| File | Purpose |
|------|---------|
| `SKILL.md` | Agent skill definition (frontmatter + instructions) |
| `metadata.json` | Machine-readable metadata and versioning |
| `AGENTS.md` | Agent-optimized quick reference (generated) |
| `README.md` | This file |
| `rules/` | 7 individual best practice rules |

## Sub-skills

| Skill | Description |
|-------|-------------|
| [`aspire/`](aspire/) | Use when configuring dev containers for .NET Aspire projects. Covers the Aspire workload, Docker-in-Docker requirement, ... |
| [`docker-in-docker/`](docker-in-docker/) | Use when configuring Docker-in-Docker inside a dev container or Codespace. Covers the DinD feature, Docker Compose, buil... |
| [`dotnet/`](dotnet/) | Use when configuring dev containers for .NET projects. Covers the dotnet feature, SDK versions, workloads, C# Dev Kit ex... |
| [`multi-container-workspaces/`](multi-container-workspaces/) | Use when setting up dev containers with sidecar services like databases, caches, or message brokers. Covers Docker Compo... |
| [`python/`](python/) | Use when configuring dev containers for Python projects. Covers the Python feature, virtual environments, tool installat... |
| [`typescript/`](typescript/) | Use when configuring dev containers for TypeScript or Node.js projects. Covers the Node feature, package managers, ESLin... |

## Usage

```bash
npx agentskills add Tyler-R-Kendrick/agent-skills/skills/devcontainer
```

## License

MIT
