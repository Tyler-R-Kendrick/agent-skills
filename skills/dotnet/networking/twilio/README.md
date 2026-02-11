# Twilio

Guidance for Twilio .NET SDK for communications APIs. USE FOR: sending SMS and MMS, making voice calls, Twilio Verify for phone verification, WhatsApp messaging, webhook handling for incoming messages/calls, Twilio programmable video. DO NOT USE FOR: email sending (use mimekit), HTTP APIs (use ASP.NET Core), gRPC services (use grpc-dotnet), custom socket protocols (use dotnetty).

## Structure

| File | Purpose |
|------|---------|
| `SKILL.md` | Agent skill definition (frontmatter + instructions) |
| `metadata.json` | Machine-readable metadata and versioning |
| `AGENTS.md` | Agent-optimized quick reference (generated) |
| `README.md` | This file |
| `rules/` | 15 individual best practice rules |

## Usage

```bash
npx agentskills add Tyler-R-Kendrick/agent-skills/skills/dotnet/networking/twilio
```

## License

MIT
