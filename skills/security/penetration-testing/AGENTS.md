# Penetration Testing

## Overview

Penetration testing is the authorized practice of simulating attacks against a system to discover exploitable vulnerabilities before malicious actors do. Unlike automated security scanning (SAST/DAST), pen testing involves human expertise to chain vulnerabilities, test business logic flaws, and assess real-world exploitability. Pen tests are conducted under a clear scope and rules of engagement, and results are reported with severity ratings and remediation guidance.

> **Important**: Penetration testing must always be performed with explicit written authorization. Unauthorized testing is illegal in virtually every jurisdiction. Ensure you have a signed rules of engagement document before beginning any testing.

### Key References

| Title | Author(s) | Focus |
|-------|-----------|-------|
| *The Web Application Hacker's Handbook* | Stuttard & Pinto | Web app vulnerability discovery and exploitation |
| *Penetration Testing* | Georgia Weidman | Hands-on pen testing methodology |
| *The Hacker Playbook 3* | Peter Kim | Red team tactics and techniques |
| *OWASP Testing Guide v4.2* | OWASP Foundation | Comprehensive web application testing methodology |
| *PTES (Penetration Testing Execution Standard)* | PTES.org | Industry-standard pen testing framework |

## Methodologies

| Methodology | Scope | Phases | Best For |
|-------------|-------|--------|----------|
| **OWASP Testing Guide** | Web applications | Information gathering, configuration testing, identity management, authentication, authorization, session management, input validation, error handling, cryptography, business logic, client-side | Web app and API pen tests |
| **PTES** | General | Pre-engagement, intelligence gathering, threat modeling, vulnerability analysis, exploitation, post-exploitation, reporting | Full-scope engagements |
| **OSSTMM** | Networks and systems | Scope, channel, index, vectors, verification, resolution | Network and infrastructure testing |
| **NIST SP 800-115** | Technical security | Planning, discovery, attack, reporting | Government and regulatory compliance |
| **CREST** | General (UK-focused) | Certified methodology for regulated industries | UK/EU regulated environments |

## Pen Test Types

| Type | Target | Techniques | Common Findings |
|------|--------|------------|-----------------|
| **Web Application** | HTTP endpoints, UI, business logic | Authentication bypass, injection, XSS, IDOR, privilege escalation, SSRF | OWASP Top 10 vulnerabilities |
| **API** | REST/GraphQL/gRPC endpoints | BOLA, broken auth, excessive data exposure, mass assignment, rate limit bypass | OWASP API Top 10 vulnerabilities |
| **Network / Infrastructure** | Hosts, services, protocols | Port scanning, service enumeration, exploit known CVEs, lateral movement, privilege escalation | Unpatched services, weak configs, default credentials |
| **Mobile** | iOS/Android apps | Binary analysis, certificate pinning bypass, local storage review, API interception, reverse engineering | Insecure storage, hardcoded secrets, weak transport |
| **Cloud** | AWS/Azure/GCP resources | Misconfiguration audits, IAM review, storage bucket enumeration, metadata service abuse | Over-permissioned roles, public resources, SSRF to metadata |
| **Wireless** | Wi-Fi, Bluetooth | Rogue AP, WPA cracking, evil twin, Bluetooth sniffing | Weak encryption, rogue access points |
| **Social Engineering** | People and processes | Phishing campaigns, pretexting, physical access testing | Credential harvesting, policy violations |

## Testing Approaches

| Approach | Knowledge Given | Simulates | Best For |
|----------|----------------|-----------|----------|
| **Black Box** | No internal knowledge | External attacker | Realistic external threat assessment |
| **Gray Box** | Partial knowledge (credentials, architecture docs) | Authenticated attacker or insider threat | Most common; best efficiency-to-realism ratio |
| **White Box** | Full source code, architecture, credentials | Comprehensive audit | Maximum coverage; code-assisted testing |

## Pen Testing Tools

### Reconnaissance and Enumeration

| Tool | Purpose | Type |
|------|---------|------|
| **Nmap** | Port scanning, service detection, OS fingerprinting | Open source |
| **Amass** | Subdomain enumeration, DNS mapping | Open source (OWASP) |
| **Shodan** | Internet-connected device search | Commercial (free tier) |
| **Recon-ng** | OSINT framework for reconnaissance | Open source |
| **theHarvester** | Email, subdomain, and IP harvesting | Open source |

### Web Application Testing

| Tool | Purpose | Type |
|------|---------|------|
| **Burp Suite Professional** | Intercepting proxy, scanner, manual testing | Commercial |
| **OWASP ZAP** | Intercepting proxy, automated scanning | Open source |
| **SQLMap** | Automated SQL injection detection and exploitation | Open source |
| **Nikto** | Web server vulnerability scanner | Open source |
| **ffuf / Gobuster** | Directory and parameter fuzzing | Open source |
| **Nuclei** | Template-based vulnerability scanning | Open source |

### Network and Infrastructure

| Tool | Purpose | Type |
|------|---------|------|
| **Metasploit Framework** | Exploitation framework with modules for known CVEs | Open source (+ Pro) |
| **Nessus** | Vulnerability scanning and assessment | Commercial |
| **OpenVAS** | Vulnerability scanning | Open source |
| **CrackMapExec / NetExec** | Active Directory and SMB exploitation | Open source |
| **Impacket** | Network protocol attack toolkit | Open source |
| **Responder** | LLMNR/NBT-NS/mDNS poisoning | Open source |

### Post-Exploitation

| Tool | Purpose | Type |
|------|---------|------|
| **BloodHound** | Active Directory attack path mapping | Open source |
| **Mimikatz** | Credential extraction from Windows | Open source |
| **Chisel / Ligolo-ng** | Tunneling and pivoting | Open source |
| **LinPEAS / WinPEAS** | Privilege escalation enumeration | Open source |

### Mobile

| Tool | Purpose | Type |
|------|---------|------|
| **Frida** | Dynamic instrumentation and hooking | Open source |
| **objection** | Runtime mobile exploration (built on Frida) | Open source |
| **MobSF** | Automated mobile static/dynamic analysis | Open source |
| **Jadx** | Android APK decompilation | Open source |

### Cloud

| Tool | Purpose | Type |
|------|---------|------|
| **ScoutSuite** | Multi-cloud security auditing | Open source |
| **Prowler** | AWS/Azure/GCP security assessment | Open source |
| **Pacu** | AWS exploitation framework | Open source |
| **CloudSploit** | Cloud misconfiguration detection | Open source |

## Scoping and Rules of Engagement

Every pen test must begin with a formal scoping and rules of engagement agreement:

| Element | Description |
|---------|-------------|
| **Scope** | Specific IP ranges, domains, applications, or environments to be tested |
| **Out of scope** | Systems, networks, or actions explicitly excluded |
| **Testing window** | Dates and hours when testing is permitted |
| **Authorization** | Written permission from system owner (get-out-of-jail letter) |
| **Communication plan** | Emergency contacts, escalation procedures, status reporting |
| **Data handling** | How sensitive data discovered during testing will be handled and destroyed |
| **Rules** | No denial of service, no data destruction, no social engineering (unless scoped), notification on critical findings |
| **Deliverables** | Report format, debrief meeting, retest timeline |

## Severity Rating

| Severity | CVSS Range | Description | Example |
|----------|-----------|-------------|---------|
| **Critical** | 9.0 - 10.0 | Immediate exploitation possible with severe impact | Unauthenticated RCE, SQL injection to database dump |
| **High** | 7.0 - 8.9 | Exploitation likely with significant impact | Authentication bypass, privilege escalation to admin |
| **Medium** | 4.0 - 6.9 | Exploitation possible with moderate impact | Stored XSS, IDOR with limited data exposure |
| **Low** | 0.1 - 3.9 | Exploitation difficult or limited impact | Information disclosure, verbose error messages |
| **Informational** | 0.0 | No direct security impact but worth noting | Missing security headers, outdated software versions |

## Reporting

A pen test report should include:

1. **Executive Summary** — non-technical overview of findings, risk level, and key recommendations for leadership
2. **Scope and Methodology** — what was tested, how, and testing approach (black/gray/white box)
3. **Findings** — each vulnerability with: title, severity (CVSS), description, affected asset, evidence (screenshots, request/response), business impact, remediation steps
4. **Risk Summary** — findings grouped by severity with counts
5. **Remediation Roadmap** — prioritized list of fixes with effort estimates
6. **Appendices** — tool output, raw scan results, methodology details

## Bug Bounty and Responsible Disclosure

| Program Type | Description | Reward | Best For |
|-------------|-------------|--------|----------|
| **Bug Bounty (managed)** | Ongoing program via HackerOne/Bugcrowd/Intigriti | Monetary bounties | Continuous external testing at scale |
| **Bug Bounty (self-hosted)** | Company-run program with security@ email | Monetary or swag | Companies wanting control over process |
| **VDP (Vulnerability Disclosure Policy)** | Published policy inviting responsible reports | Recognition (no monetary) | Minimum baseline for any company |

### Responsible Disclosure Process

1. Researcher discovers vulnerability
2. Researcher reports via designated channel
3. Company acknowledges receipt (target: 1 business day)
4. Company triages and validates (target: 5 business days)
5. Company remediates (target: 90 days for standard, 7 days for actively exploited)
6. Coordinated public disclosure after fix

## Best Practices

- **Always obtain written authorization** before testing — unauthorized pen testing is a criminal offense regardless of intent.
- **Scope tightly** — clearly define what is in and out of scope to protect both the tester and the organization.
- **Use gray-box testing** as the default for most engagements — it provides the best balance of realism and coverage.
- **Report findings with business impact**, not just technical severity — help stakeholders understand the real-world risk.
- **Verify remediations** with a retest engagement after fixes are deployed — do not assume fixes are complete.
- **Maintain a vulnerability disclosure policy (VDP)** even if you do not run a bug bounty — it gives researchers a safe way to report issues.
- **Separate pen testing from automated scanning** — automated tools find known patterns; human testers find business logic flaws and chained exploits.
- **Conduct pen tests at least annually** and after major releases or architecture changes.
- **Treat pen test reports as confidential** — they contain detailed exploitation instructions for your systems.
- **Rotate pen testing firms** periodically to get fresh perspectives and avoid blind spots from familiarity.
