# CryptoNet

Guidance for CryptoNet cryptography library in .NET. USE FOR: RSA encryption/decryption, symmetric AES encryption, X.509 certificate-based crypto, self-signed certificate generation, key pair management, encrypting sensitive data at rest. DO NOT USE FOR: password hashing (use ASP.NET Core Identity), TLS/HTTPS configuration, JWT token signing (use Microsoft.IdentityModel), or authorization (use Casbin/Enforcer).

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
npx agentskills add Tyler-R-Kendrick/agent-skills/skills/dotnet/security/cryptonet
```

## License

MIT
