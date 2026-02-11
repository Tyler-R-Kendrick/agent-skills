# Compliance

Guidance for Microsoft.Extensions.Compliance data classification and redaction. USE FOR: classifying sensitive data (PII, EUII, financial), redacting log output, enforcing data handling policies, compliance-aware telemetry, audit-safe logging pipelines. DO NOT USE FOR: encryption at rest (use Data Protection APIs), access control/authorization (use ASP.NET Identity), GDPR consent management, full DLP solutions.

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
npx agentskills add Tyler-R-Kendrick/agent-skills/skills/dotnet/general/extensions-compliance
```

## License

MIT
