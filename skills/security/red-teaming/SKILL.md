---
name: red-teaming
description: |
    Use when planning or conducting adversarial red team engagements that test an organization's detection, response, and resilience capabilities beyond traditional penetration testing. Covers red team vs pen test distinctions, adversary simulation frameworks (MITRE ATT&CK, Cyber Kill Chain), purple teaming, C2 frameworks, and AI/LLM red teaming.
    USE FOR: red teaming, adversary simulation, MITRE ATT&CK, Cyber Kill Chain, purple teaming, C2 frameworks, assumed breach, attack path mapping, detection testing, AI red teaming, LLM red teaming, tabletop exercises
    DO NOT USE FOR: automated vulnerability scanning (use security-testing), initial vulnerability discovery (use penetration-testing), threat modeling during design (use threat-modeling)
license: MIT
metadata:
  displayName: "Red Teaming"
  author: "Tyler-R-Kendrick"
compatibility: claude, copilot, cursor
---

# Red Teaming

## Overview

Red teaming is an adversarial assessment that goes beyond penetration testing to evaluate an organization's **detection, response, and resilience** capabilities against realistic attack scenarios. While pen testing asks "can we get in?", red teaming asks "can you detect us, stop us, and recover?"

Red teams operate with stealth, simulate real-world threat actors (APTs, insider threats, ransomware groups), and test the full kill chain — from initial access through lateral movement to objective completion. The goal is not just to find vulnerabilities, but to expose gaps in people, processes, and technology.

> **Important**: Red team engagements require explicit written authorization from organizational leadership. Only a small group (the "white team" or "trusted agents") should know the engagement is occurring. Unauthorized adversarial activity is illegal.

### Key References

| Title | Author(s) | Focus |
|-------|-----------|-------|
| *Red Team Development and Operations* | Joe Vest & James Tubberville | Planning and executing red team engagements |
| *The Hacker Playbook 3* | Peter Kim | Red team field manual with practical TTPs |
| *Adversarial Tradecraft in Cybersecurity* | Dan Borges | Offensive and defensive techniques for red/blue teams |
| *MITRE ATT&CK Framework* | MITRE Corporation | Comprehensive knowledge base of adversary tactics and techniques |
| *Cyber Kill Chain* | Lockheed Martin | Seven-stage model of cyberattack progression |

## Red Team vs Pen Test vs Vulnerability Assessment

| Dimension | Vulnerability Assessment | Penetration Test | Red Team |
|-----------|------------------------|------------------|----------|
| **Goal** | Find known vulnerabilities | Exploit vulnerabilities to prove impact | Test detection and response against realistic attacks |
| **Scope** | Broad, automated scanning | Defined targets and systems | Objective-based (e.g., "exfiltrate customer database") |
| **Stealth** | None | Minimal | High — evade detection, mimic real threat actors |
| **Duration** | Hours to days | Days to weeks | Weeks to months |
| **Blue team awareness** | Yes | Usually yes | No (except white team) |
| **Tests people/process** | No | Limited | Yes — primary focus |
| **Methodology** | Scan and report | OWASP/PTES/OSSTMM | MITRE ATT&CK, Cyber Kill Chain |
| **Output** | Vulnerability list with severities | Exploit proof with business impact | Detection gaps, response failures, attack narratives |

## Adversary Simulation Frameworks

### MITRE ATT&CK

The industry-standard knowledge base of adversary tactics, techniques, and procedures (TTPs) based on real-world observations.

| Tactic | Description | Example Techniques |
|--------|-------------|-------------------|
| **Reconnaissance** | Gathering information about the target | Active scanning, search open websites, gather victim identity info |
| **Resource Development** | Establishing infrastructure for the attack | Acquire infrastructure, develop capabilities, establish accounts |
| **Initial Access** | Getting into the target environment | Phishing, exploit public-facing application, supply chain compromise |
| **Execution** | Running adversary-controlled code | Command/scripting interpreter, exploitation for client execution |
| **Persistence** | Maintaining access across restarts | Boot/logon autostart, scheduled tasks, account manipulation |
| **Privilege Escalation** | Gaining higher-level permissions | Exploitation for privilege escalation, access token manipulation |
| **Defense Evasion** | Avoiding detection | Obfuscated files, indicator removal, masquerading |
| **Credential Access** | Stealing credentials | OS credential dumping, brute force, credentials from password stores |
| **Discovery** | Understanding the environment | Network service scanning, system information discovery |
| **Lateral Movement** | Moving through the environment | Remote services, exploitation of remote services, lateral tool transfer |
| **Collection** | Gathering data of interest | Data from local system, email collection, screen capture |
| **Command and Control** | Communicating with compromised systems | Application layer protocol, encrypted channel, proxy |
| **Exfiltration** | Stealing data | Exfiltration over C2 channel, exfiltration over web service |
| **Impact** | Disrupting, destroying, or manipulating systems | Data encrypted for impact (ransomware), defacement, data destruction |

### Cyber Kill Chain (Lockheed Martin)

A linear model of cyberattack progression:

```
1. Reconnaissance ──► 2. Weaponization ──► 3. Delivery ──► 4. Exploitation
         │                                                         │
         │              7. Actions on ◄── 6. Command ◄── 5. Installation
         │                 Objectives       & Control
         └──────────────────────────────────────────────────────────┘
                          Defender can break the chain at any stage
```

| Stage | Attacker Activity | Defender Response |
|-------|------------------|-------------------|
| **Reconnaissance** | Research targets, scan for vulnerabilities | Monitor for scanning, minimize public exposure |
| **Weaponization** | Create exploit payload, craft phishing lure | Threat intelligence, signature updates |
| **Delivery** | Send phishing email, exploit web app | Email filtering, web application firewall, user training |
| **Exploitation** | Execute exploit, trigger vulnerability | Patching, endpoint detection, application hardening |
| **Installation** | Install backdoor, establish persistence | EDR, application allowlisting, integrity monitoring |
| **Command & Control** | Establish C2 channel, beacon | Network monitoring, DNS filtering, egress controls |
| **Actions on Objectives** | Exfiltrate data, deploy ransomware, pivot | DLP, segmentation, incident response, backups |

## Purple Teaming

Purple teaming is the **collaborative integration** of red team (attack) and blue team (defense) to maximize learning and improve detection coverage.

| Aspect | Traditional Red Team | Purple Team |
|--------|---------------------|-------------|
| **Collaboration** | Adversarial — red hides from blue | Cooperative — red and blue work together |
| **Goal** | Find gaps in detection and response | Improve detection and response in real-time |
| **Process** | Red attacks, writes report, blue reads later | Red executes technique, blue tunes detection, iterate |
| **Speed of improvement** | Slow (report → fix cycle) | Fast (immediate feedback loop) |
| **Best for** | Mature security programs | Building and validating detection capabilities |

### Purple Team Exercise Flow

1. **Select ATT&CK technique** to test (e.g., T1059 — Command and Scripting Interpreter)
2. **Red team executes** the technique in a controlled environment
3. **Blue team observes** — did alerts fire? Were logs generated? Was the activity detected?
4. **Gap analysis** — identify what was missed and why
5. **Detection engineering** — blue team writes or tunes detection rules
6. **Re-execute** — red team runs the technique again to verify detection
7. **Document** — record the detection coverage and any remaining gaps
8. **Repeat** for the next technique

## C2 Frameworks

Command and Control (C2) frameworks provide the infrastructure for maintaining access to compromised systems during engagements. These tools must only be used in authorized engagements.

| Framework | Type | Key Features | Best For |
|-----------|------|-------------|----------|
| **Cobalt Strike** | Commercial | Beacon payload, Malleable C2 profiles, team server, industry standard | Professional red teams, APT simulation |
| **Sliver** | Open source (BishopFox) | Cross-platform implants, mutual TLS, DNS/HTTP/WireGuard C2 | Modern open-source alternative to Cobalt Strike |
| **Havoc** | Open source | Demon agent, sleep obfuscation, token manipulation | Advanced evasion techniques |
| **Mythic** | Open source | Multi-agent support, containerized, extensible | Flexible multi-platform C2 |
| **Brute Ratel** | Commercial | Badger payload, EDR evasion focused, syscall-level evasion | EDR bypass testing |
| **Caldera** | Open source (MITRE) | ATT&CK-aligned automated adversary emulation | Automated purple team exercises |

## Attack Path Mapping

| Tool | Purpose | Type |
|------|---------|------|
| **BloodHound** | Active Directory attack path visualization | Open source |
| **PlumHound** | BloodHound report automation | Open source |
| **PingCastle** | AD security assessment and risk scoring | Free (community) |
| **ADExplorer** | AD snapshot and analysis | Free (Sysinternals) |

## AI / LLM Red Teaming

AI systems require specialized red teaming to test for vulnerabilities unique to language models and autonomous agents.

| Concern | Test Approach | Tools |
|---------|--------------|-------|
| **Prompt injection** | Craft adversarial inputs to override system instructions | Garak, Promptfoo |
| **Data extraction** | Attempt to extract training data or PII from model responses | Manual probing, ARTKIT |
| **System prompt leakage** | Try to reveal hidden system prompts or instructions | Manual, Promptfoo |
| **Jailbreaking** | Bypass safety guardrails to produce harmful content | Garak, DeepTeam |
| **Excessive agency** | Test whether agent takes unauthorized actions | Scenario-based testing, sandboxed execution |
| **Hallucination exploitation** | Trick model into generating convincing false information | Domain-specific fact-checking probes |
| **Multi-turn manipulation** | Gradually shift model behavior across conversation turns | ARTKIT (multi-turn framework) |

### AI Red Teaming Tools

| Tool | Maintainer | Focus |
|------|-----------|-------|
| **Garak** | OWASP | 100+ attack modules for LLM vulnerability scanning |
| **ARTKIT** | — | Multi-turn adversarial interaction framework |
| **Promptfoo** | — | Prompt testing, comparison, and red teaming |
| **DeepTeam** | — | Comprehensive LLM red team framework |
| **Counterfit** | Microsoft | Adversarial ML attack framework (classical + generative AI) |
| **Caldera + MITRE ATLAS** | MITRE | ATT&CK-aligned adversarial ML tactics |

## Tabletop Exercises

Tabletop exercises simulate cyber incidents in a discussion-based format without touching live systems. They test incident response plans, communication, and decision-making.

### Common Scenarios

| Scenario | Tests | Participants |
|----------|-------|-------------|
| **Ransomware attack** | Containment, communication, ransom decision, recovery | Executive, IT, Legal, Comms |
| **Data breach** | Breach notification, forensics, regulatory response | Security, Legal, Compliance, Comms |
| **Insider threat** | Detection, investigation, HR/legal coordination | Security, HR, Legal, IT |
| **Supply chain compromise** | Vendor assessment, containment, customer notification | Security, Engineering, Legal, Comms |
| **Business email compromise** | Fraud detection, financial controls, employee training | Finance, Security, Executive |

### Running a Tabletop

1. **Define scenario and objectives** — what are you testing?
2. **Identify participants** — include leadership, not just technical staff
3. **Prepare injects** — time-sequenced events that escalate the scenario
4. **Facilitate discussion** — walk through decisions at each stage
5. **Document gaps** — record where plans broke down, who was unclear on their role
6. **Produce action items** — concrete improvements with owners and deadlines
7. **Schedule follow-up** — run the exercise again after improvements are implemented

## Best Practices

- **Distinguish red teaming from pen testing** — pen tests find vulnerabilities; red teams test your ability to detect and respond to real attacks.
- **Start with purple teaming** if your security program is still maturing — get collaborative value before going adversarial.
- **Map engagements to MITRE ATT&CK** to measure detection coverage systematically against known adversary techniques.
- **Use assumed breach as a starting point** for red team engagements — skip initial access and focus on lateral movement and detection gaps.
- **Conduct tabletop exercises** quarterly to test incident response without the cost and risk of live red team engagements.
- **Rotate between internal and external red teams** — external teams bring fresh TTPs; internal teams bring organizational knowledge.
- **Debrief collaboratively** — red team findings should lead to blue team improvements, not blame.
- **Invest in detection engineering** based on red team results — every missed detection is an opportunity to build a new rule.
- **Test AI systems with specialized AI red teaming** — traditional pen testing tools do not cover prompt injection, jailbreaking, or excessive agency.
- **Treat red team reports as highly confidential** — they contain detailed attack playbooks specific to your organization.
