---
name: threat-modeling
description: |
    Use when identifying and prioritizing security threats during system design. Covers STRIDE and DREAD frameworks, threat modeling processes, data flow diagrams for security, and integrating threat analysis into the SDLC.
    USE FOR: STRIDE, DREAD, threat modeling, data flow diagrams for security, attack surface analysis, security design review, threat prioritization
    DO NOT USE FOR: runtime vulnerability scanning (use security-testing), incident response (use logging-monitoring), specific vulnerability remediation (use owasp)
license: MIT
metadata:
  displayName: "Threat Modeling"
  author: "Tyler-R-Kendrick"
compatibility: claude, copilot, cursor
references:
  - title: "OWASP Threat Modeling"
    url: "https://owasp.org/www-community/Threat_Modeling"
  - title: "Microsoft Threat Modeling Tool"
    url: "https://learn.microsoft.com/en-us/azure/security/develop/threat-modeling-tool"
  - title: "NIST SP 800-154 Guide to Data-Centric System Threat Modeling"
    url: "https://csrc.nist.gov/publications/detail/sp/800-154/draft"
---

# Threat Modeling

## Overview

Threat modeling is a structured approach to identifying, quantifying, and addressing the security risks associated with a system. As Adam Shostack describes in *Threat Modeling: Designing for Security* (2014), the goal is to answer four fundamental questions: (1) What are we building? (2) What can go wrong? (3) What are we going to do about it? (4) Did we do a good job? By systematically analyzing a system's architecture through data flow diagrams and applying frameworks such as STRIDE for threat identification and DREAD for risk assessment, teams can discover and mitigate security weaknesses before they become vulnerabilities in production. Threat modeling is most effective when integrated early in the software development lifecycle and revisited as the system evolves.

## STRIDE Framework

STRIDE is a mnemonic developed at Microsoft for classifying security threats. Each letter represents a category of threat that violates a corresponding security property.

| Threat | Property Violated | Description | Example | Mitigation Strategy |
|--------|-------------------|-------------|---------|---------------------|
| **S**poofing | Authentication | An attacker pretends to be someone or something else to gain unauthorized access. | Forged authentication token used to impersonate a legitimate user. | Strong authentication (MFA, OAuth 2.0, certificate-based auth); validate identity at every trust boundary. |
| **T**ampering | Integrity | Unauthorized modification of data in transit or at rest. | Man-in-the-middle attack alters API request payload between client and server. | TLS for data in transit; digital signatures; checksums; write-access controls; tamper-evident logging. |
| **R**epudiation | Non-repudiation | An attacker performs an action and then denies having done it, with no way to prove otherwise. | User deletes records and claims they never accessed the system. | Audit logging with tamper-proof storage; digital signatures on transactions; centralized SIEM with log integrity. |
| **I**nformation Disclosure | Confidentiality | Sensitive information is exposed to unauthorized parties. | Database connection string leaked in a verbose error message returned to the client. | Encrypt sensitive data; enforce access controls; suppress detailed error messages in production; classify data by sensitivity. |
| **D**enial of Service | Availability | An attacker makes a system or resource unavailable to legitimate users. | Flood of API requests overwhelms a service with no rate limiting. | Rate limiting; auto-scaling; circuit breakers; input size validation; CDN and DDoS protection services. |
| **E**levation of Privilege | Authorization | An attacker gains elevated access rights beyond what they are authorized to have. | Exploiting a local file inclusion vulnerability to execute code as root. | Least privilege; run processes with minimum required permissions; input validation; sandboxing; regular privilege audits. |

## DREAD Risk Assessment

DREAD is a risk assessment model used to quantify and prioritize threats identified during threat modeling. Each factor is scored on a scale of 1 to 10, and the overall risk rating is the average of all five scores.

**Formula**: `Risk = (D + R + E + A + D) / 5`

| Factor | Score 1-3 (Low) | Score 4-6 (Medium) | Score 7-10 (High) |
|--------|-----------------|--------------------|--------------------|
| **D**amage Potential | Minor data leakage or inconvenience; no financial impact. | Significant data exposure or partial service disruption; moderate financial impact. | Complete system compromise, massive data breach, or total service destruction; severe financial or reputational impact. |
| **R**eproducibility | Difficult to reproduce; requires specific conditions or timing. | Reproducible under certain conditions or with some expertise. | Easily and reliably reproducible every time by anyone. |
| **E**xploitability | Requires advanced skills, custom tooling, or insider knowledge. | Requires moderate technical skill and publicly known techniques. | Exploitable by beginners using widely available tools or scripts. |
| **A**ffected Users | Affects a small subset of users or only the attacker themselves. | Affects a significant portion of users or specific user roles. | Affects all users, administrators, or connected downstream systems. |
| **D**iscoverability | Requires deep system knowledge or source code access to find. | Discoverable through moderate investigation or common scanning tools. | Easily discovered through casual observation, public documentation, or automated scanners. |

**Example**: A SQL injection in a public login form might score D=9, R=10, E=8, A=10, D=9 = **(9+10+8+10+9)/5 = 9.2** (Critical risk).

## Threat Modeling Process

1. **Define Scope and Objectives** -- Identify the system, component, or feature to be modeled. Establish what assets need protection (user data, API keys, business logic) and define the trust boundaries of the system.

2. **Create Data Flow Diagrams (DFDs)** -- Map how data moves through the system by identifying external entities, processes, data stores, data flows, and trust boundaries. Start at a high level (context diagram) and decompose into more detailed levels as needed.

3. **Identify Threats Using STRIDE** -- Walk through each element and data flow in the DFD and apply the STRIDE categories. For each element, ask: Can this be spoofed? Can data be tampered with here? Is there a repudiation risk? Can information be disclosed? Can this be denied service? Can privileges be elevated?

4. **Rate Threats Using DREAD** -- For each identified threat, score it using the DREAD factors. Calculate the average to produce a risk rating. This prioritizes which threats demand immediate attention versus those that can be addressed later.

5. **Plan Mitigations** -- For each high-priority threat, define specific mitigation strategies. Map mitigations to concrete implementation tasks (e.g., "add input validation to endpoint X", "enforce TLS on connection Y"). Track these as security requirements in the backlog.

6. **Validate and Iterate** -- Review the threat model with the team. Verify that mitigations address the identified threats. Re-run the analysis whenever the architecture changes, new features are added, or after a security incident reveals a gap.

## Data Flow Diagram Elements

| Element | Symbol | Security Relevance |
|---------|--------|--------------------|
| External Entity | Rectangle | Represents actors outside the system (users, third-party services). These are untrusted by default and represent potential sources of malicious input. |
| Process | Circle / Rounded Rectangle | Represents a unit of computation that transforms data. Each process is a potential target for injection, tampering, or privilege escalation attacks. |
| Data Store | Parallel Lines (open-ended rectangle) | Represents persistent storage (database, file system, cache). Stores are targets for information disclosure, tampering, and denial of service. |
| Data Flow | Arrow | Represents data moving between elements. Flows crossing trust boundaries are the highest-risk paths and require encryption, validation, and authentication. |
| Trust Boundary | Dashed Line | Represents a change in privilege or trust level (e.g., between the internet and a DMZ, or between a web server and a database). Every crossing requires security controls. |

## When to Threat Model

Threat modeling should be integrated throughout the SDLC rather than treated as a one-time activity:

- **Design phase**: Perform the initial threat model when the system architecture is being defined. This is the highest-leverage point because design changes are cheapest here.
- **Before major feature additions**: Any significant new feature, integration, or data flow should trigger a threat model review or update.
- **Before security reviews or penetration tests**: A current threat model gives testers a focused scope and helps them prioritize their efforts.
- **After security incidents**: Post-incident analysis should feed back into the threat model to capture previously unidentified threats and validate existing mitigations.
- **Periodically (quarterly or per release cycle)**: Even without major changes, revisit the threat model to account for changes in the threat landscape, newly disclosed vulnerabilities, or shifts in business requirements.

## Best Practices

- **Start simple and iterate**: a basic threat model that covers the most critical data flows is far more valuable than a perfect model that never gets completed. Use the four-question framework as a starting point.
- **Involve the whole team**: threat modeling is not solely a security engineer's responsibility. Developers, architects, and product owners all bring essential context about how the system works and what matters most to protect.
- **Use DFDs as the common language**: data flow diagrams provide a shared visual representation that bridges the gap between technical implementation details and security analysis.
- **Prioritize ruthlessly with DREAD**: not all threats are equal. Use quantitative scoring to focus mitigation effort on the threats with the highest combined impact and likelihood.
- **Track threats as first-class backlog items**: identified threats and their mitigations should be tracked alongside feature work in the project management system, with clear ownership and deadlines.
- **Keep the threat model alive**: a threat model is a living document. Store it alongside the code (e.g., in the repository), version it, and update it as the system evolves.
