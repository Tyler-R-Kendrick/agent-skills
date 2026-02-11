# MimeKit and MailKit

Guidance for MimeKit and MailKit email libraries in .NET. USE FOR: creating and parsing MIME email messages, sending email via SMTP with MailKit, reading email via IMAP/POP3, attachments, HTML email, S/MIME and PGP signing/encryption. DO NOT USE FOR: SMS/voice messaging (use twilio), HTTP APIs (use ASP.NET Core), custom TCP protocols (use dotnetty), gRPC services (use grpc-dotnet).

## Structure

| File | Purpose |
|------|---------|
| `SKILL.md` | Agent skill definition (frontmatter + instructions) |
| `metadata.json` | Machine-readable metadata and versioning |
| `AGENTS.md` | Agent-optimized quick reference (generated) |
| `README.md` | This file |
| `rules/` | 13 individual best practice rules |

## Usage

```bash
npx agentskills add Tyler-R-Kendrick/agent-skills/skills/dotnet/networking/mimekit
```

## License

MIT
