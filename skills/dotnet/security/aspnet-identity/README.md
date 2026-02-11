# ASP.NET Core Identity

Guidance for ASP.NET Core Identity authentication and user management. USE FOR: user registration, login/logout flows, password management, two-factor authentication, role-based authorization, external login providers, account confirmation, token generation. DO NOT USE FOR: fine-grained policy-based authorization (use Enforcer/Casbin), API key management, OAuth2 server implementation (use Duende IdentityServer), or cryptographic operations (use CryptoNet).

## Structure

| File | Purpose |
|------|---------|
| `SKILL.md` | Agent skill definition (frontmatter + instructions) |
| `metadata.json` | Machine-readable metadata and versioning |
| `AGENTS.md` | Agent-optimized quick reference (generated) |
| `README.md` | This file |
| `rules/` | 10 individual best practice rules |

## Usage

```bash
npx agentskills add Tyler-R-Kendrick/agent-skills/skills/dotnet/security/aspnet-identity
```

## License

MIT
