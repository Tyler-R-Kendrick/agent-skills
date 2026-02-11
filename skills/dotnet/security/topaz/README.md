# Topaz

Guidance for Topaz fine-grained, relationship-based authorization. USE FOR: fine-grained permissions, relationship-based access control (ReBAC), Google Zanzibar-style authorization, directory-based identity resolution, policy-as-code with OPA/Rego, hierarchical permission models (owner > editor > viewer). DO NOT USE FOR: simple RBAC (use Casbin/Enforcer), authentication (use ASP.NET Core Identity), input sanitization (use Hygiene), or encryption (use CryptoNet).

## Structure

| File | Purpose |
|------|---------|
| `SKILL.md` | Agent skill definition (frontmatter + instructions) |
| `metadata.json` | Machine-readable metadata and versioning |
| `AGENTS.md` | Agent-optimized quick reference (generated) |
| `README.md` | This file |
| `rules/` | 14 individual best practice rules |

## Usage

```bash
npx agentskills add Tyler-R-Kendrick/agent-skills/skills/dotnet/security/topaz
```

## License

MIT
