---
name: contracts
description: |
    Use when identifying contractual considerations for software companies — SLAs, DPAs, MSAs, licensing agreements, and liability allocation. Covers key contract types, essential clauses, jurisdiction-specific requirements, and negotiation considerations for software products and services.
    USE FOR: SLA, DPA, MSA, software licensing, liability limitation, indemnification, warranty, contract negotiation, jurisdiction clauses, force majeure, escrow agreements, SaaS agreements
    DO NOT USE FOR: drafting actual contracts (consult legal counsel), open-source license selection (use open-source-licensing), consumer terms of service (use consumer-protection)
license: MIT
metadata:
  displayName: "Contracts"
  author: "Tyler-R-Kendrick"
compatibility: claude, copilot, cursor
references:
  - title: "Uniform Commercial Code (UCC) — Cornell Law Institute"
    url: "https://www.law.cornell.edu/ucc"
  - title: "GDPR Data Processing Agreement Requirements (Article 28)"
    url: "https://gdpr-info.eu/art-28-gdpr/"
---

# Contracts

> **Disclaimer**: This skill provides general educational information about legal topics relevant to software development. It is **not legal advice**. Laws vary by jurisdiction and change frequently. Always consult a qualified attorney licensed in the relevant jurisdiction before making legal decisions for your organization.

## Overview

Software companies operate through a web of contracts with customers, vendors, partners, and employees. Understanding the key contract types and essential clauses helps teams engage legal counsel more effectively and avoid common pitfalls. Whether negotiating a SaaS agreement with a new enterprise customer or reviewing a vendor DPA, familiarity with standard contract structures and jurisdiction-specific requirements is a critical competency for product, engineering, and business teams.

## Key Contract Types for Software Companies

| Contract | Parties | Purpose | Key Terms |
|---|---|---|---|
| **MSA (Master Service Agreement)** | Company + customer | Governing terms for an ongoing relationship | Scope, payment, IP ownership, liability, termination |
| **SaaS Agreement / Subscription Agreement** | Provider + customer | Cloud software access and usage rights | Uptime SLA, data handling, pricing, auto-renewal, termination |
| **SLA (Service Level Agreement)** | Provider + customer | Performance commitments and remedies | Uptime percentage, response times, remedies/credits for breach |
| **DPA (Data Processing Agreement)** | Controller + processor | GDPR and privacy law compliance | Data processing scope, security measures, sub-processors, breach notification, data subject rights assistance |
| **Software License Agreement** | Licensor + licensee | On-premises software usage rights | License scope, restrictions, audit rights, updates, support |
| **Reseller / Partner Agreement** | Company + partner | Distribution, referral, or reseller arrangements | Territories, margins, branding, exclusivity, termination |
| **API / Integration Agreement** | API provider + consumer | Terms for API access and data exchange | Rate limits, SLA, acceptable use, data ownership, versioning |
| **Escrow Agreement** | Licensor + licensee + escrow agent | Source code protection for licensees | Release conditions, update frequency, verification rights |

## Essential Clauses

### Limitation of Liability

Limitation of liability clauses are among the most heavily negotiated provisions in software contracts. They define the maximum financial exposure each party faces.

- **Cap types** — Liability is typically capped at the contract value, fees paid in the prior 12 months, or a specified insurance amount. The cap amount should reflect the risk profile of the engagement.
- **Carve-outs** — Certain obligations are commonly excluded from the liability cap, including IP infringement, data breach, willful misconduct, and confidentiality breach. These carve-outs may have their own higher cap or be uncapped.
- **Mutual vs one-sided** — Best practice is to negotiate mutual liability caps. One-sided caps that disproportionately favor one party may be unenforceable in some jurisdictions and are often a sign of an imbalanced negotiation.

### Indemnification

Indemnification provisions allocate responsibility for third-party claims between the contracting parties.

- **IP infringement** — The provider typically indemnifies the customer against claims that the software infringes third-party intellectual property rights.
- **Data breach** — The party responsible for the breach (or whose negligence caused it) typically bears the indemnification obligation for resulting third-party claims.
- **Third-party claims** — Broader indemnification may cover claims arising from a party's breach of representations, warranties, or applicable law.
- **Defense obligation vs reimbursement** — A defense obligation requires the indemnifying party to actively defend the claim (hire counsel, manage litigation). Reimbursement-only obligations are less protective, requiring the indemnified party to manage their own defense and seek repayment afterward.

### Warranties and Disclaimers

Warranties define the promises each party makes about their performance, products, or services.

- **What is typically warranted** — Conformance to published specifications or documentation, non-infringement of third-party IP, authority to enter the agreement, and compliance with applicable laws.
- **Statutory warranties that cannot be disclaimed** — Many jurisdictions impose mandatory warranties that cannot be disclaimed by contract. For example, the UK's Unfair Contract Terms Act, Australia's Australian Consumer Law (statutory guarantees), and Germany's BGB provisions on defect liability all limit the ability to exclude warranties.
- **"As-is" disclaimers** — In jurisdictions that permit it, providers often disclaim all warranties not expressly stated, including implied warranties of merchantability and fitness for a particular purpose.

### Data Protection

Data processing agreements are mandatory under GDPR and increasingly required under other privacy laws.

- **GDPR Article 28 requirements** — DPAs must specify the subject matter and duration of processing, the nature and purpose of processing, the types of personal data, categories of data subjects, and the controller's obligations and rights.
- **Sub-processor management** — The processor must obtain prior authorization (general or specific) before engaging sub-processors, maintain a list of sub-processors, and ensure sub-processors are bound by equivalent data protection obligations.
- **Data return and deletion on termination** — The DPA must specify the processor's obligations to return or delete all personal data at the end of the processing relationship, and certify deletion upon request.

### Jurisdiction and Governing Law

Choice of law and forum clauses determine which jurisdiction's laws apply and where disputes will be resolved.

- **Choice of law vs choice of forum** — These are distinct concepts. Choice of law determines which legal rules apply to interpret the contract. Choice of forum determines where disputes will be litigated or arbitrated. They need not be the same jurisdiction.
- **Mandatory consumer protection overrides** — In many jurisdictions, consumer protection laws override contractual choice of law or forum clauses when the other party is a consumer. B2B contracts have more flexibility.
- **Arbitration vs litigation** — Arbitration offers privacy, speed, and the ability to select specialized arbitrators. Litigation provides broader discovery, appeal rights, and public precedent. The right choice depends on the nature of the relationship and the value at stake.

### Force Majeure

Force majeure clauses excuse performance when extraordinary events beyond a party's control prevent fulfillment of contractual obligations.

- **Post-COVID expansion** — Many organizations have expanded their force majeure clauses following the COVID-19 pandemic to explicitly cover pandemics, epidemics, and government-mandated shutdowns.
- **What constitutes force majeure in software** — Events commonly covered include infrastructure failure (cloud provider outages), pandemic, government action (sanctions, embargoes), natural disasters, war, terrorism, and widespread cyberattacks.
- **Notice requirements** — Most force majeure clauses require the affected party to provide prompt written notice, describe the event and its expected duration, and demonstrate efforts to mitigate the impact.

### IP Ownership

Clarity on intellectual property ownership is essential, especially when custom development or data is involved.

- **Who owns customizations** — Contracts should clearly state whether customizations, configurations, or integrations developed for a customer are owned by the provider, the customer, or jointly.
- **Who owns data** — Customer data should remain the customer's property. The provider should have only a limited license to use customer data for the purpose of delivering the service.
- **Background IP vs foreground IP** — Background IP is intellectual property that existed before the contract. Foreground IP is created during the engagement. Contracts should clearly delineate ownership and licensing rights for both.

### Termination

Termination provisions define how and when each party can exit the contract.

- **For cause vs for convenience** — Termination for cause allows a party to exit when the other party materially breaches the agreement. Termination for convenience allows exit without cause, typically with a notice period.
- **Cure periods** — A cure period gives the breaching party a specified number of days (commonly 30) to remedy the breach before the other party can terminate. Critical breaches (data breach, insolvency) may have shorter or no cure periods.
- **Wind-down obligations** — The contract should specify each party's obligations during the wind-down period, including continued service delivery, transition assistance, and final invoicing.
- **Data portability on exit** — Customers should negotiate the right to export their data in a standard, machine-readable format upon termination, along with a specified period during which the provider will make the data available before deletion.

## SLA Design

Service Level Agreements define measurable performance commitments and the remedies available when those commitments are not met.

### Availability Tiers

| Tier | Uptime | Downtime per Year | Typical Use |
|---|---|---|---|
| **99.9%** | Three nines | 8.76 hours | Standard SaaS applications |
| **99.95%** | Three nines five | 4.38 hours | Business-critical applications |
| **99.99%** | Four nines | 52.6 minutes | Mission-critical applications |

### Credit Structures

SLA breaches are typically remedied through one or more of the following mechanisms:

- **Service credits** — A percentage of the monthly fee is credited to the customer's account for each period of downtime exceeding the SLA. Credits commonly range from 10% to 30% of the monthly fee.
- **Refunds** — In more severe cases, the customer may be entitled to a pro-rata refund for the affected period.
- **Termination rights** — Persistent or severe SLA breaches may trigger the customer's right to terminate the agreement without penalty.

### Exclusions

SLA commitments typically exclude downtime caused by:

- **Scheduled maintenance** — Planned maintenance windows that are communicated in advance (commonly with 48-72 hours notice).
- **Customer-caused issues** — Downtime resulting from the customer's own actions, such as misconfiguration, exceeding usage limits, or unauthorized modifications.
- **Force majeure** — Events beyond the provider's reasonable control, as defined in the force majeure clause.

### Measurement Methodology

The SLA should clearly define how availability is measured, including the monitoring tools used, the measurement interval, and whether the calculation excludes scheduled maintenance windows. Ambiguity in measurement methodology is a common source of disputes.

## Jurisdiction-Specific Considerations

Contract law varies significantly across jurisdictions. The following highlights notable differences that affect software contracts.

| Jurisdiction | Notable Contract Rules |
|---|---|
| **United States** | UCC governs contracts for goods (including some software licenses); common law governs services contracts; significant state-by-state variation in enforceability of non-competes, limitation of liability, and arbitration clauses |
| **European Union** | GDPR DPA mandatory for data processing; unfair terms directives limit enforceability of one-sided terms in consumer and some B2B contracts; consumer protection laws may override choice-of-law clauses |
| **United Kingdom** | Unfair Contract Terms Act (UCTA) limits exclusion of liability for negligence and breach of implied terms; Consumer Rights Act provides additional protections for consumer contracts |
| **Germany** | AGB law (Allgemeine Geschaeftsbedingungen) heavily regulates standard terms; caps on liability may be unenforceable if they exclude liability for gross negligence or willful misconduct; written form requirements for certain provisions |
| **India** | Indian Contract Act governs; data localization requirements may affect DPA terms; stamp duty may apply to certain contracts; specific performance is a more common remedy than in common-law jurisdictions |
| **Australia** | Australian Consumer Law prohibits exclusion of statutory guarantees; unfair contract terms provisions apply to standard form contracts (including B2B since 2023); penalties for unfair terms |

## Best Practices

- **Have all contracts reviewed by qualified legal counsel in the relevant jurisdiction.** Contract law is jurisdiction-specific, and terms that are enforceable in one country may be void in another. Invest in legal review before signing, not after a dispute arises.
- **Use a Master Service Agreement as the foundation.** Structure your contract relationships with an MSA that covers general terms, supplemented by SOWs, order forms, or schedules for specific engagements. This approach reduces negotiation overhead for repeat business.
- **Negotiate mutual liability caps and carve-outs.** Ensure that both parties share risk proportionally. Pay particular attention to uncapped carve-outs and ensure they are limited to areas of genuine catastrophic risk (IP infringement, data breach, willful misconduct).
- **Include clear SLAs with measurable metrics and meaningful remedies.** Vague performance commitments are unenforceable and erode trust. Define uptime targets, measurement methodology, credit structures, and termination triggers with specificity.
- **Address data ownership, portability, and deletion explicitly.** Ensure customer data remains the customer's property, that it can be exported in a standard format on termination, and that the provider is obligated to delete it after a defined retention period.
- **Build in regular contract review cycles.** Laws change, business relationships evolve, and technology advances. Schedule annual reviews of key contracts to ensure they remain current and reflect the actual state of the relationship.
- **Maintain a contract repository with key date tracking.** Use a centralized system to store all executed contracts and track renewal dates, termination notice periods, and other critical deadlines to avoid inadvertent auto-renewals or missed cure periods.
- **Negotiate data processing agreements proactively.** Do not wait for a customer to request a DPA. Prepare a GDPR-compliant DPA template that can be attached to your standard agreements, and keep your sub-processor list current and publicly accessible.
