# Security Hygiene & Sanitization

Guidance for input sanitization, output encoding, and security hygiene in .NET. USE FOR: preventing XSS attacks, SQL injection prevention, HTML/URL/JavaScript encoding, input validation, Content Security Policy headers, CSRF protection, secure HTTP headers. DO NOT USE FOR: authentication flows (use ASP.NET Core Identity), encryption at rest (use CryptoNet), authorization policies (use Casbin/Enforcer), or certificate management.

## Structure

| File | Purpose |
|------|---------|
| `SKILL.md` | Agent skill definition (frontmatter + instructions) |
| `metadata.json` | Machine-readable metadata and versioning |
| `AGENTS.md` | Agent-optimized quick reference (generated) |
| `README.md` | This file |
| `rules/` | 16 individual best practice rules |

## Usage

```bash
npx agentskills add Tyler-R-Kendrick/agent-skills/skills/dotnet/security/hygiene
```

## License

MIT
