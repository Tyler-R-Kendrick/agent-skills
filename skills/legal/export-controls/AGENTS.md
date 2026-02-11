# Export Controls

> **Disclaimer**: This skill provides general educational information about legal topics relevant to software development. It is **not legal advice**. Laws vary by jurisdiction and change frequently. Always consult a qualified attorney licensed in the relevant jurisdiction before making legal decisions for your organization.

## Overview

Software — especially software containing encryption — is subject to export control laws. Even making software available for download on the internet can constitute an "export." Violations carry severe criminal and civil penalties, including imprisonment and fines in the millions of dollars. Export controls exist to prevent sensitive technology from reaching hostile actors, embargoed nations, or end-uses that threaten national security. For software companies distributing products internationally, understanding these regimes is not optional — it is a legal necessity.

## Key Export Control Regimes

| Regime | Jurisdiction | Scope | Enforcement |
|---|---|---|---|
| **EAR** (Export Administration Regulations) | US | Commercial and dual-use items including software | Bureau of Industry and Security (BIS), Department of Commerce; civil and criminal penalties |
| **ITAR** (International Traffic in Arms Regulations) | US | Defense articles and defense services | Directorate of Defense Trade Controls (DDTC), Department of State; criminal penalties up to $1M per violation |
| **EU Dual-Use Regulation 2021/821** | EU | Dual-use items including cyber-surveillance technology | Member state export licensing authorities |
| **Wassenaar Arrangement** | 42 participating countries | Multilateral framework for conventional arms and dual-use goods and technologies | Implemented through each member state's national legislation |
| **OFAC Sanctions** | US | Transactions with embargoed countries, entities, and individuals | Office of Foreign Assets Control (OFAC), Department of the Treasury; strict liability penalties |

## Software-Specific Concerns

The following categories of software and technology commonly trigger export control requirements:

- **Encryption algorithms** — Software implementing AES, RSA, elliptic curve, and other cryptographic algorithms is classified as a controlled item under most export control regimes.
- **Cybersecurity tools** — Penetration testing software, vulnerability scanners, network exploitation tools, and intrusion detection systems may be controlled as dual-use items.
- **AI/ML models with military applications** — Machine learning models designed for or adaptable to military targeting, autonomous weapons, intelligence analysis, or surveillance may fall under export controls.
- **High-performance computing** — Software designed for or enabling high-performance computing beyond certain thresholds may require export licenses.
- **Satellite and space technology** — Software related to satellite communications, remote sensing, launch vehicles, and space systems is frequently controlled under both EAR and ITAR.

## Encryption Export Rules (US EAR)

Encryption is the most common export control issue for software companies. The US EAR classifies encryption software primarily under **ECCN 5D002** (information security software).

### Classification and License Exceptions

- **ECCN 5D002** — The primary classification for software with encryption functionality that exceeds certain thresholds. Covers both proprietary and custom encryption implementations.
- **License Exception ENC** — Allows export of many commercial encryption products after a one-time self-classification and BIS notification, without an individual license.
- **Mass-market encryption exemption (ECCN 5D992)** — Software with encryption that is widely available to the public (e.g., standard TLS in a web browser) may qualify for the mass-market classification, which requires no license.
- **Open-source exemption** — Publicly available source code with encryption is exempt from EAR licensing requirements under EAR Section 742.15(b), but you must notify BIS and the NSA via email before or concurrently with making the source code publicly available.

### Encryption Scenarios

| Scenario | Classification | Requirement |
|---|---|---|
| Proprietary software with standard encryption (e.g., AES-256, TLS) | ECCN 5D002 | Self-classify and notify BIS |
| Mass-market encryption product (e.g., consumer messaging app) | ECCN 5D992 | No license needed after self-classification |
| Open-source software with encryption | Publicly available (exempt) | Notify BIS and NSA via email |
| Custom encryption for government or military end-use | ECCN 5D002 | May require an individual export license |

### Self-Classification and BIS Notification

For most commercial software with encryption, the process is:

1. Determine the ECCN classification of your product.
2. If ECCN 5D002, submit a self-classification report to BIS annually (by February 1) using the SNAP-R system.
3. For open-source encryption, send an email notification to BIS (crypt@bis.doc.gov) and the NSA (enc@nsa.gov) with a copy of the source code or a URL where it can be accessed.

## Embargoed and Sanctioned Jurisdictions

**Note: Sanctions lists and embargoed jurisdictions change frequently. Always verify current status before any transaction.**

As of the time of writing, the following jurisdictions are subject to comprehensive US embargo programs:

- **Cuba**
- **Iran**
- **North Korea (DPRK)**
- **Syria**
- **Crimea, Donetsk, and Luhansk regions** (of Ukraine, as occupied by Russia)

### SDN List Screening

The **Specially Designated Nationals and Blocked Persons (SDN) List** maintained by OFAC identifies individuals, entities, and vessels with whom US persons are prohibited from transacting. Software companies must screen customers and end-users against the SDN list before completing transactions. OFAC also maintains the Entity List, the Denied Persons List, and other restricted party lists that must be checked.

## Deemed Exports

A **deemed export** occurs when controlled technology or source code is released to a foreign national within your own country. Under the EAR, this release is treated as an export to that person's country of citizenship or permanent residency. This means:

- Sharing controlled encryption source code with a foreign national employee or contractor may require an export license, depending on their nationality.
- "Release" includes visual inspection, oral exchange, or allowing access to technology through employment, contracts, or other arrangements.
- Companies must implement technology control plans to prevent unauthorized deemed exports in workplaces with international staff.

## Compliance Program Elements

An effective export control compliance program should include:

- **Customer and end-user screening** — Screen all customers, distributors, and end-users against applicable restricted party lists (SDN, Entity List, Denied Persons List, etc.) before every transaction.
- **ECCN classification** — Classify all products, software, and technology under the applicable export control regime. Maintain a classification database and review it when products change.
- **Record-keeping** — Maintain export records for at least five years (EAR requirement). Records should include classification determinations, license applications, shipping documents, and end-user certifications.
- **Training** — Provide regular export control training to all employees involved in product development, sales, distribution, and customer support.
- **Internal audits** — Conduct periodic audits of export compliance procedures to identify gaps and ensure controls are functioning as intended.
- **Red flag procedures** — Establish clear procedures for identifying and escalating suspicious orders, unusual destinations, or evasive customer behavior.
- **Technology control plans** — Implement physical and IT security measures to prevent unauthorized access to controlled technology, especially in environments with foreign national employees.
- **Voluntary self-disclosure** — Have a process for promptly identifying violations and making voluntary self-disclosures to the relevant agency, which can significantly reduce penalties.

## Best Practices

- **Always consult qualified trade compliance counsel.** Export control violations carry severe criminal penalties, including imprisonment up to 20 years and fines up to $1 million per violation under ITAR, and up to $300,000 per violation or twice the transaction value under EAR. Do not attempt to self-assess complex export control questions.
- **Classify your products early in the development cycle.** Determine the ECCN or other applicable classification before your product ships — not after a customer in a restricted jurisdiction places an order.
- **Automate restricted party screening.** Manual screening is error-prone. Use commercial screening tools (e.g., Visual Compliance, Descartes, SAP GTS) to screen customers and end-users against all applicable lists in real time.
- **Implement geo-blocking for embargoed jurisdictions.** If you distribute software via download, implement technical controls to block access from comprehensively embargoed countries and IP addresses associated with those jurisdictions.
- **Track open-source encryption notifications.** If you publish open-source software with encryption, maintain records of your BIS/NSA email notifications and annual self-classification reports.
- **Monitor regulatory changes continuously.** Sanctions lists, embargoed jurisdictions, and export control classifications change frequently. Subscribe to BIS and OFAC alerts and review updates promptly.
- **Include export compliance terms in contracts.** Require customers and distributors to certify that they will comply with applicable export control laws and will not divert products to prohibited end-users or destinations.
- **Treat deemed exports seriously.** Implement technology control plans in offices with foreign national employees and ensure that access to controlled technology is limited based on export classification and employee nationality.
