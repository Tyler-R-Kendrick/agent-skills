---
name: ai-regulation
description: |
    Use when identifying AI-specific regulations and compliance requirements that apply to AI/ML-powered software products. Covers the EU AI Act, US AI executive orders, China's AI regulations, and emerging global frameworks with risk classification and compliance obligations.
    USE FOR: EU AI Act, AI regulation, AI risk classification, AI transparency, AI liability, algorithmic accountability, AI ethics compliance, US AI executive orders, China AI rules, AI auditing requirements
    DO NOT USE FOR: AI security vulnerabilities (use security/ai-security), ML model development (use AI skills), responsible AI ethics without legal dimension (use security/ai-security)
license: MIT
metadata:
  displayName: "AI Regulation"
  author: "Tyler-R-Kendrick"
compatibility: claude, copilot, cursor
references:
  - title: "EU AI Act Official Text (EUR-Lex)"
    url: "https://eur-lex.europa.eu/eli/reg/2024/1689/oj"
  - title: "NIST AI Risk Management Framework"
    url: "https://www.nist.gov/artificial-intelligence"
  - title: "OECD AI Principles"
    url: "https://oecd.ai/en/ai-principles"
---

# AI Regulation

> **Disclaimer**: This skill provides general educational information about legal topics relevant to software development. It is **not legal advice**. Laws vary by jurisdiction and change frequently. Always consult a qualified attorney licensed in the relevant jurisdiction before making legal decisions for your organization.

## Overview

AI regulation is the fastest-moving area of technology law. The EU AI Act is the first comprehensive AI law globally, but jurisdictions worldwide are rapidly developing their own frameworks. Any company deploying AI/ML must track these regulations to avoid penalties, reputational damage, and market access restrictions. The regulatory landscape ranges from binding legislation with significant fines to voluntary frameworks and sector-specific guidance.

## Global AI Regulation Landscape

| Jurisdiction | Legislation / Framework | Status | Approach |
|---|---|---|---|
| **EU** | EU AI Act | In force, phased implementation 2024-2027 | Risk-based classification with binding obligations |
| **US Federal** | Executive Order 14110 + NIST AI RMF | Voluntary + sectoral | Sector-specific guidance, voluntary standards, agency enforcement of existing law |
| **US States** | State-level bills (e.g., Colorado AI Act) | Various stages of enactment | Employment and insurance decision focus |
| **UK** | AI White Paper / AI Safety Institute | Voluntary, pro-innovation | Principle-based, sector regulators apply AI principles within existing mandates |
| **China** | Multiple regulations (Generative AI Measures, Deep Synthesis Rules, Recommendation Algorithm Rules) | In force | Content generation, deepfakes, recommendation algorithms, security review |
| **Canada** | AIDA (Artificial Intelligence and Data Act) in Bill C-27 | Pending | Risk-based, high-impact systems focus |
| **Brazil** | AI Bill (PL 2338/2023) | Pending | Rights-based, risk classification |
| **Japan** | AI Guidelines for Business | Voluntary | Human-centric, sector-specific guidance |
| **South Korea** | AI Basic Act | Pending | Risk-based, high-risk AI focus |
| **Singapore** | Model AI Governance Framework + AI Verify | Voluntary | Self-assessment toolkit, testing framework |

## EU AI Act Risk Classification

| Risk Level | Description | Obligations | Examples |
|---|---|---|---|
| **Unacceptable** | AI systems that pose a clear threat to fundamental rights | Prohibited -- these systems are banned outright | Social scoring by governments, real-time remote biometric identification in public spaces (with limited exceptions), manipulation of vulnerable groups, emotion recognition in workplaces and schools |
| **High** | AI systems with significant impact on people's rights, safety, or livelihoods | Conformity assessment, technical documentation, human oversight, transparency, risk management system, data governance, accuracy and robustness requirements | Recruitment and HR management AI, credit scoring, medical device AI, law enforcement, migration and border control, critical infrastructure, education assessment |
| **Limited** | AI systems that interact with humans | Transparency obligations only -- users must be informed they are interacting with AI | Chatbots, deepfake generators, emotion recognition systems, AI-generated content |
| **Minimal** | AI systems posing no significant risk | No specific obligations; voluntary codes of conduct encouraged | Spam filters, AI in video games, inventory management |

## EU AI Act Key Obligations for High-Risk AI Systems

1. **Risk management system** — Establish and maintain a continuous risk management process throughout the AI system's lifecycle, identifying and mitigating risks to health, safety, and fundamental rights.
2. **Data governance** — Ensure training, validation, and testing datasets are relevant, representative, free of errors, and complete. Address potential biases in datasets.
3. **Technical documentation** — Prepare detailed documentation before the system is placed on the market, including system description, development process, monitoring, and performance metrics.
4. **Record-keeping** — Implement automatic logging of events (logs) throughout the system's lifecycle to enable traceability and auditability.
5. **Transparency to users** — Provide clear and adequate information to deployers, including system capabilities, limitations, intended purpose, and human oversight requirements.
6. **Human oversight** — Design the system so that it can be effectively overseen by natural persons, including the ability to understand, monitor, and override the system's outputs.
7. **Accuracy, robustness, and cybersecurity** — Ensure the system achieves appropriate levels of accuracy, is resilient to errors and attacks, and maintains cybersecurity throughout its lifecycle.
8. **Conformity assessment** — Undergo a conformity assessment procedure (self-assessment or third-party audit depending on the use case) before placing the system on the market.
9. **CE marking** — Affix the CE marking to high-risk AI systems that have passed conformity assessment, indicating compliance with the regulation.
10. **Post-market monitoring** — Establish a post-market monitoring system to collect and analyze data on the system's performance and compliance throughout its operational life.

## EU AI Act General-Purpose AI (GPAI) Models

The EU AI Act introduces specific obligations for providers of **general-purpose AI models** (foundation models), including large language models:

- **Transparency obligations** — Provide technical documentation, usage instructions, and information about the model's capabilities and limitations to downstream providers.
- **Technical documentation** — Maintain detailed documentation of the training process, design choices, testing, and evaluation results.
- **Copyright compliance** — Implement a policy to comply with EU copyright law, including the text and data mining opt-out provisions. Provide a sufficiently detailed summary of training data content.
- **Systemic risk assessment** — GPAI models with significant capabilities (defined by compute thresholds or Commission designation) must additionally perform model evaluations, assess and mitigate systemic risks, conduct adversarial testing, report serious incidents, and ensure adequate cybersecurity protections.

## US AI Landscape

The United States takes a **sectoral approach** to AI regulation rather than a single comprehensive law:

- **Executive Order 14110 (October 2023)** — Directs federal agencies to develop AI safety and security standards, requires safety testing and reporting for powerful AI models, establishes AI governance across federal agencies, and tasks NIST with developing AI standards.
- **NIST AI Risk Management Framework (AI RMF)** — A voluntary framework for managing AI risks organized around four functions: Govern, Map, Measure, and Manage. Widely referenced as a baseline for responsible AI.
- **Sectoral enforcement** — Existing regulatory agencies apply current law to AI:
    - **FTC** — Enforces against unfair or deceptive AI practices under Section 5 of the FTC Act, including algorithmic bias in consumer products.
    - **EEOC** — Issues guidance on AI in employment decisions, including ADA implications of AI-driven hiring tools.
    - **FDA** — Regulates AI/ML-based software as a medical device (SaMD) under existing frameworks.
    - **SEC** — Monitors AI use in financial services, including algorithmic trading and robo-advisors.
- **State laws** — Colorado AI Act (SB 24-205) is among the first state laws specifically targeting high-risk AI in employment and insurance decisions, requiring impact assessments, transparency, and risk management for developers and deployers.

## Compliance Timeline

| Date | Jurisdiction | Milestone |
|---|---|---|
| **February 2025** | EU | Prohibited AI practices banned |
| **August 2025** | EU | GPAI model obligations apply; codes of practice finalized |
| **August 2026** | EU | Full high-risk AI obligations apply for new systems |
| **August 2027** | EU | High-risk obligations apply to AI systems embedded in regulated products |
| **February 2026** | Colorado, US | Colorado AI Act takes effect |
| **Ongoing** | US Federal | Agency guidance and rulemaking continue under Executive Order 14110 |
| **Ongoing** | China | Regulations are in force and continuously updated |
| **TBD** | Canada | AIDA awaiting passage as part of Bill C-27 |
| **TBD** | Brazil | AI Bill progressing through legislative process |
| **TBD** | South Korea | AI Basic Act under legislative review |

## Best Practices

- **Recognize that AI regulation is rapidly evolving and requires ongoing legal counsel.** The regulatory landscape is changing on a quarterly basis. Engage legal advisors who specialize in AI law and monitor legislative developments in every jurisdiction where you operate.
- **Classify your AI systems by risk level early in the development process.** Understanding whether your system falls into the high-risk, limited-risk, or minimal-risk category under the EU AI Act (and equivalent frameworks) determines your compliance obligations.
- **Implement a comprehensive AI risk management framework.** Adopt a structured approach such as the NIST AI RMF to govern, map, measure, and manage AI risks across your organization.
- **Design for human oversight from the start.** Build mechanisms that allow humans to understand, monitor, intervene in, and override AI system outputs. This is both a regulatory requirement and an engineering best practice.
- **Maintain thorough documentation of your AI system's lifecycle.** Document training data provenance, model architecture, testing methodology, evaluation results, known limitations, and deployment decisions. This documentation is essential for conformity assessments and audits.
- **Conduct bias and fairness assessments regularly.** Test your AI systems for discriminatory outcomes across protected characteristics. Document the results and remediation steps taken.
- **Implement transparency measures appropriate to your system's risk level.** At minimum, inform users when they are interacting with an AI system. For high-risk systems, provide detailed information about the system's purpose, capabilities, limitations, and the role of human oversight.
- **Monitor your deployed AI systems continuously.** Post-market monitoring is a legal requirement under the EU AI Act and a best practice globally. Track performance metrics, log incidents, and maintain feedback loops to detect model drift and emergent risks.
