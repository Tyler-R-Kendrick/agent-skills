# Security

Use when addressing cross-cutting security concerns that apply to all languages, frameworks, and platforms. Covers OWASP standards, threat modeling, authentication, cryptography, supply chain security, and AI security.

## Structure

| File | Purpose |
|------|---------|
| `SKILL.md` | Agent skill definition (frontmatter + instructions) |
| `metadata.json` | Machine-readable metadata and versioning |
| `AGENTS.md` | Agent-optimized quick reference (generated) |
| `README.md` | This file |
| `rules/` | 8 individual best practice rules |

## Sub-skills

| Skill | Description |
|-------|-------------|
| [`ai-security/`](ai-security/) | Use when addressing security risks specific to AI and LLM applications. Covers OWASP Top 10 for LLM Applications (2025),... |
| [`api-security/`](api-security/) | Use when securing APIs against common attack vectors. Covers rate limiting, CORS configuration, Content Security Policy,... |
| [`authentication/`](authentication/) | Use when designing or implementing authentication and authorization systems. Covers OAuth 2.0, OpenID Connect, RBAC, ABA... |
| [`cryptography/`](cryptography/) | Use when selecting or implementing cryptographic controls for data protection. Covers TLS configuration, password hashin... |
| [`data-protection/`](data-protection/) | Use when implementing data protection controls for compliance and privacy. Covers encryption at rest and in transit, PII... |
| [`hygiene/`](hygiene/) | Use when enforcing defensive coding practices that treat all data as untrusted — regardless of source. Covers sanitizati... |
| [`input-validation/`](input-validation/) | Use when implementing input validation and output encoding to prevent injection attacks. Covers validation strategies, c... |
| [`logging-monitoring/`](logging-monitoring/) | Use when designing security logging, monitoring, and incident detection capabilities. Covers SIEM architecture, audit tr... |
| [`owasp/`](owasp/) | Use when applying OWASP standards to identify and mitigate common security vulnerabilities. Covers OWASP Top 10 (2021), ... |
| [`penetration-testing/`](penetration-testing/) | Use when planning or conducting authorized penetration tests against web applications, APIs, networks, and mobile apps. ... |
| [`red-teaming/`](red-teaming/) | Use when planning or conducting adversarial red team engagements that test an organization's detection, response, and re... |
| [`secure-sdlc/`](secure-sdlc/) | Use when integrating security into the software development lifecycle. Covers security gates, shift-left security, DevSe... |
| [`security-testing/`](security-testing/) | Use when selecting and configuring security testing tools for your CI/CD pipeline. Covers SAST, DAST, SCA, container sca... |
| [`supply-chain/`](supply-chain/) | Use when securing the software supply chain — dependencies, build pipelines, and artifact integrity. Covers SBOMs, depen... |
| [`threat-modeling/`](threat-modeling/) | Use when identifying and prioritizing security threats during system design. Covers STRIDE and DREAD frameworks, threat ... |

## Usage

```bash
npx agentskills add Tyler-R-Kendrick/agent-skills/skills/security
```

## License

MIT
