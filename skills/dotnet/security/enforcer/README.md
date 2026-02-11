# Enforcer (Casbin.NET)

Guidance for Casbin.NET authorization library (Enforcer). USE FOR: access control list (ACL) enforcement, role-based access control (RBAC), attribute-based access control (ABAC), policy management, multi-tenant authorization, API endpoint protection. DO NOT USE FOR: authentication or login flows (use ASP.NET Core Identity), encryption (use CryptoNet), relationship-based access control with graph traversal (use Topaz), or input sanitization (use Hygiene).

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
npx agentskills add Tyler-R-Kendrick/agent-skills/skills/dotnet/security/enforcer
```

## License

MIT
