# Secure SDLC

## Overview

Security must be built in, not bolted on. The concept of "shift-left security" means moving security considerations earlier in the software development lifecycle rather than treating them as a late-stage afterthought. When security is integrated from the very beginning — during requirements gathering and design — vulnerabilities are caught sooner, remediation costs are lower, and the resulting software is fundamentally more resilient. A secure SDLC ensures that every phase of development includes deliberate security activities, reviews, and gates.

## Secure SDLC Phases

The following diagram illustrates how security activities map to each phase of the development lifecycle:

```
┌──────────────┐    ┌──────────────┐    ┌──────────────────┐
│ REQUIREMENTS │───>│    DESIGN    │───>│  IMPLEMENTATION  │
│              │    │              │    │                  │
│ - Security   │    │ - Threat     │    │ - Secure coding  │
│   requirements│   │   modeling   │    │   standards      │
│ - Abuse cases│    │ - Security   │    │ - SAST scans     │
│ - Risk       │    │   architecture│   │ - Code review    │
│   assessment │    │   review     │    │   with security  │
│              │    │              │    │   checklist      │
└──────────────┘    └──────────────┘    └──────────────────┘
        │                  │                      │
        v                  v                      v
┌──────────────┐    ┌──────────────┐    ┌──────────────────┐
│   TESTING    │───>│  DEPLOYMENT  │───>│   OPERATIONS     │
│              │    │              │    │                  │
│ - DAST scans │    │ - Security   │    │ - Runtime        │
│ - Penetration│    │   gates      │    │   monitoring     │
│   testing    │    │ - Artifact   │    │ - Incident       │
│ - SCA scans  │    │   signing    │    │   response       │
│ - Fuzz       │    │ - Config     │    │ - Vulnerability  │
│   testing    │    │   validation │    │   management     │
└──────────────┘    └──────────────┘    └──────────────────┘
```

| Phase | Security Activities | Key Artifacts |
|---|---|---|
| Requirements | Security requirements, abuse cases, risk assessment | Security requirements document, abuse case catalog |
| Design | Threat modeling, security architecture review | Threat model, architecture security review report |
| Implementation | Secure coding standards, SAST, peer code review | SAST reports, code review checklists |
| Testing | DAST, penetration testing, SCA | Test reports, vulnerability findings |
| Deployment | Security gates, artifact signing, configuration validation | Deployment approval records, signed artifacts |
| Operations | Runtime monitoring, incident response, vulnerability management | Monitoring dashboards, incident reports |

## Security Gates

Security gates are mandatory checkpoints that must be passed before work advances to the next phase. Each gate has defined criteria and responsible reviewers.

| Gate | Phase | What It Checks | Tools |
|---|---|---|---|
| Design Review | Design | Threat model sign-off, security architecture approval, compliance requirements mapped | Microsoft Threat Modeling Tool, OWASP Threat Dragon, draw.io |
| Code Review | Implementation | Security checklist completion, SAST findings resolved (critical/high), secrets scanning clean | SonarQube, Semgrep, Checkmarx, GitHub Advanced Security |
| Testing Gate | Testing | DAST scan results addressed, SCA vulnerabilities resolved, penetration test findings triaged | OWASP ZAP, Burp Suite, Snyk, Dependabot |
| Deployment Gate | Deployment | Artifact integrity verified, all prior gates passed, change approval obtained | Sigstore/Cosign, SLSA framework, Jira/ServiceNow |
| Runtime Gate | Operations | Anomaly detection configured, alerting thresholds set, incident response runbook in place | Falco, Datadog, PagerDuty, Splunk |

## DevSecOps Pipeline

The following diagram shows how security tools integrate into a CI/CD pipeline:

```
  ┌────────┐    ┌─────────────────────┐    ┌────────┐    ┌──────────────────────┐
  │ COMMIT │───>│  SAST + Secrets     │───>│ BUILD  │───>│  SCA + Container     │
  │        │    │  Scan               │    │        │    │  Scan                │
  │ git    │    │ - Semgrep           │    │ docker │    │ - Snyk / Trivy       │
  │ push   │    │ - TruffleHog        │    │ build  │    │ - Grype              │
  │        │    │ - GitLeaks          │    │        │    │ - Dependabot         │
  └────────┘    └─────────────────────┘    └────────┘    └──────────────────────┘
                                                                    │
                                                                    v
  ┌────────────────┐    ┌──────────┐    ┌───────────────────────────────────────┐
  │ RUNTIME        │<───│ DEPLOY   │<───│  DEPLOY TO STAGING                   │
  │ MONITORING     │    │ TO PROD  │    │  + DAST Scan                         │
  │                │    │          │    │                                       │
  │ - Falco        │    │ - Signed │    │ - OWASP ZAP                          │
  │ - SIEM alerts  │    │   artifacts  │ - Nuclei                              │
  │ - WAF logs     │    │ - Approvals  │ - API fuzzing                         │
  └────────────────┘    └──────────┘    └───────────────────────────────────────┘
```

Key integration points:

- **Pre-commit**: Secrets scanning and linting hooks run locally before code reaches the repository.
- **CI stage**: SAST and secrets detection run on every pull request; builds are blocked on critical findings.
- **Build stage**: Container images are scanned; SCA checks identify vulnerable dependencies.
- **Staging**: DAST tools run against the deployed application in a staging environment.
- **Production**: Runtime security monitoring, WAF rules, and anomaly detection provide continuous protection.

## Security Champions

Security champions are developers embedded within product teams who serve as the bridge between the security team and engineering.

**What They Are**

Security champions are not full-time security engineers. They are developers who have a passion for security, receive additional training, and dedicate a portion of their time (typically 10-20%) to security activities within their team.

**How to Build a Program**

1. Identify interested and motivated developers across teams — participation should be voluntary.
2. Provide formal training (e.g., OWASP, SANS, vendor-specific) and ongoing education.
3. Establish a regular cadence of meetings (biweekly or monthly) for knowledge sharing.
4. Recognize and reward participation through career advancement, certifications, and visibility.
5. Give champions access to security tools, threat intelligence, and the security team's communication channels.

**Responsibilities**

- Conduct initial security reviews of designs and code within their team.
- Triage and prioritize security findings from automated tools.
- Advocate for secure coding practices and mentor other developers.
- Escalate complex security issues to the central security team.
- Maintain team-specific security documentation and runbooks.
- Participate in incident response when their team's services are affected.

## Security Requirements

Security requirements should be derived systematically from threat models and regulatory obligations rather than applied as generic checklists.

**Deriving from Threat Models**

For each threat identified in the threat model, define a corresponding security requirement that mitigates or eliminates the risk. Map each requirement to a specific SDLC phase where it will be verified.

**Common Security Requirements**

| Category | Requirements |
|---|---|
| Authentication | Multi-factor authentication for privileged access, session timeout policies, credential storage using approved algorithms (bcrypt, Argon2), account lockout after failed attempts |
| Authorization | Role-based or attribute-based access control, principle of least privilege, resource-level permissions, authorization checks on every request |
| Input Validation | Server-side validation for all inputs, parameterized queries for database access, output encoding context-appropriate to rendering engine, file upload type and size restrictions |
| Logging | Security-relevant events logged (login, access denied, privilege changes), no sensitive data in logs, tamper-evident log storage, structured log format for SIEM ingestion |
| Encryption | TLS 1.2+ for all data in transit, AES-256 for data at rest, cryptographic key management with rotation, no custom cryptographic implementations |

## Best Practices

- **Automate security checks in CI/CD** — manual-only security processes do not scale and create bottlenecks; automate SAST, SCA, secrets scanning, and container scanning as pipeline stages.
- **Define clear severity thresholds for gate blocking** — not every finding should block a deployment; establish policies for which severity levels (e.g., critical and high) are gate-blockers versus tracked issues.
- **Maintain a living threat model** — update threat models when architecture changes, new features are added, or new attack vectors emerge; stale threat models provide false confidence.
- **Invest in developer security training** — annual secure coding training is a minimum; supplement with hands-on exercises, CTF events, and lessons learned from real incidents.
- **Track security debt explicitly** — log security findings that are accepted or deferred as security debt with clear ownership, timelines, and risk acceptance sign-off.
- **Use security as code** — express security policies, configurations, and checks as version-controlled code (e.g., OPA policies, security-as-code frameworks) for auditability and repeatability.
- **Conduct regular retrospectives on security incidents** — blameless postmortems improve process; feed findings back into security requirements and automated checks.
- **Establish metrics and report on them** — track mean time to remediate, gate pass/fail rates, security debt trends, and champion program participation to demonstrate program effectiveness and justify investment.
