---
name: healthcare
description: |
    Use when identifying healthcare regulations that apply to software handling health data or functioning as a medical device. Covers HIPAA, HITECH, FDA SaMD regulation, EU MDR, HITRUST, and health data privacy across jurisdictions.
    USE FOR: HIPAA, HITECH, PHI, FDA SaMD, EU MDR, HITRUST, health data privacy, medical device software, BAA, ePHI, clinical decision support, telehealth regulation, health app compliance
    DO NOT USE FOR: general data privacy (use privacy-data-protection), security controls implementation (use security skills), clinical validation methodology (consult regulatory affairs specialists)
license: MIT
metadata:
  displayName: "Healthcare Regulation"
  author: "Tyler-R-Kendrick"
compatibility: claude, copilot, cursor
---

# Healthcare Regulation

> **Disclaimer**: This skill provides general educational information about legal topics relevant to software development. It is **not legal advice**. Laws vary by jurisdiction and change frequently. Always consult a qualified attorney licensed in the relevant jurisdiction before making legal decisions for your organization.

> **Additional Warning**: Healthcare regulatory violations carry **severe penalties including criminal prosecution**. HIPAA criminal penalties can include fines up to $250,000 and imprisonment up to 10 years for offenses committed with intent to sell or use PHI for personal gain. FDA enforcement for unauthorized medical devices can include injunctions, seizures, and criminal prosecution. Do not rely on this skill as a substitute for qualified healthcare regulatory counsel.

## Overview

Healthcare software faces a dual regulatory burden — **health data privacy laws** AND **medical device regulations** if the software provides clinical decision support or diagnosis. The penalty landscape is severe, with regulators empowered to impose criminal sanctions, civil monetary penalties, and injunctive relief. Even unintentional violations can result in multi-million-dollar settlements, mandatory corrective action plans, and years of monitoring. Understanding both dimensions of healthcare regulation is essential before building any software that touches health data or clinical workflows.

## Health Data Privacy Laws

| Law | Jurisdiction | Scope | Protected Data | Penalties |
|---|---|---|---|---|
| **HIPAA Privacy Rule** | US | Covered entities + business associates | PHI (Protected Health Information) | Up to $1.5M/year per violation category |
| **HIPAA Security Rule** | US | Covered entities + business associates handling ePHI | ePHI (electronic Protected Health Information) | Up to $1.5M/year per violation category |
| **HITECH Act** | US | Expands HIPAA to business associates + breach notification | PHI | Increased penalties + state Attorney General enforcement |
| **UK GDPR + NHS Code of Practice** | UK | Health data processors | Special category data | Up to £17.5M or 4% global revenue |
| **DSGVO / German Federal Data Protection Act** | Germany | Extra protections for health data | Health data | GDPR penalties + sector-specific rules |
| **PIPEDA Health Data** | Canada | Health information custodians in some provinces | Personal health information | Provincial enforcement |
| **LGPD** | Brazil | Sensitive data category for health | Health data | 2% of revenue up to R$50M |

## HIPAA Deep Dive

### Who Is a Covered Entity?

HIPAA applies directly to three categories of **covered entities**:

1. **Health plans** — Health insurance companies, HMOs, employer-sponsored health plans, government health programs (Medicare, Medicaid).
2. **Healthcare clearinghouses** — Entities that process nonstandard health information into standard formats.
3. **Healthcare providers** — Any provider who transmits health information electronically in connection with a HIPAA-covered transaction (claims, eligibility inquiries, referral authorizations, etc.).

### Who Is a Business Associate?

A **business associate** is any person or organization that performs functions or activities on behalf of (or provides services to) a covered entity that involve access to PHI. This includes:

- Cloud service providers hosting ePHI (yes, including IaaS, PaaS, and SaaS providers)
- Software vendors whose products store, process, or transmit PHI
- IT contractors with access to systems containing PHI
- Data analytics firms processing PHI
- Billing and claims processing companies
- Shredding and document destruction companies

**Key point for software developers:** If your SaaS product is used by a healthcare organization and your systems can access PHI — even if you never intend to look at it — you are likely a business associate.

### Business Associate Agreement (BAA)

Before any PHI is shared, a **Business Associate Agreement** must be in place. A BAA is a legally binding contract that:

- Establishes the permitted uses and disclosures of PHI
- Requires the business associate to implement appropriate safeguards
- Requires reporting of breaches and security incidents
- Gives the covered entity the right to terminate the agreement if the business associate violates HIPAA
- Requires the business associate to ensure any subcontractors also agree to the same restrictions

### PHI vs. De-Identified Data

**Protected Health Information (PHI)** is individually identifiable health information that is created or received by a covered entity. Data can be **de-identified** through two methods:

- **Safe Harbor Method** — Remove 18 specified identifiers (names, geographic data smaller than state, dates except year, phone numbers, email addresses, SSNs, medical record numbers, etc.) and have no actual knowledge that the remaining information could identify an individual.
- **Expert Determination Method** — A qualified statistical expert determines that the risk of identifying an individual is very small and documents the methods and results.

De-identified data is not subject to HIPAA. However, re-identification risk must be carefully managed, and some state laws may impose additional restrictions.

### Minimum Necessary Standard

HIPAA requires that covered entities and business associates limit PHI access, use, and disclosure to the **minimum necessary** to accomplish the intended purpose. This means:

- Role-based access controls that restrict PHI access to what each role requires
- Policies defining who needs access to what categories of PHI
- Technical controls that enforce the minimum necessary standard programmatically

## Software as a Medical Device (SaMD)

The FDA regulates software that meets the definition of a **medical device** — specifically, software intended for one or more medical purposes that performs these purposes without being part of a hardware medical device. This is known as **Software as a Medical Device (SaMD)**.

### FDA Classification

| Classification | Risk Level | FDA Pathway | Examples |
|---|---|---|---|
| **Class I** | Low risk | Exempt or 510(k) | General wellness apps that do not diagnose or treat, simple data display |
| **Class II** | Moderate risk | 510(k) + Special Controls | Clinical decision support with review by clinician, remote patient monitoring |
| **Class III** | High risk | Premarket Approval (PMA) | AI-driven diagnosis without human review, life-critical treatment decisions |

### Clinical Decision Support (CDS) Exclusion

The **21st Century Cures Act** exempts certain clinical decision support software from FDA regulation if it meets **all five criteria**:

1. Not intended to acquire, process, or analyze a medical image or signal from an in vitro diagnostic device or a pattern or signal from a signal acquisition system
2. Intended for the purpose of displaying, analyzing, or printing medical information
3. Intended for the purpose of supporting or providing recommendations to a healthcare professional
4. Intended for the purpose of enabling the healthcare professional to independently review the basis for the recommendation
5. The healthcare professional does not primarily rely on the software to make a clinical decision without independently reviewing the basis for the recommendation

If your CDS software fails **any one** of these criteria, it may be regulated as a medical device.

## EU Medical Device Regulation (MDR)

The **EU MDR (Regulation 2017/745)** significantly expanded the scope of medical device regulation for software in the European Union.

**Key aspects for software:**

- **Rule 11 classification** — Software intended to provide information used to make decisions with diagnosis or therapeutic purposes is classified based on the seriousness of the condition and the state of the patient. Software can be classified anywhere from Class I to Class III depending on its intended purpose.
- **CE marking** — Required before placing a medical device on the EU market. Involves conformity assessment, technical documentation, and (for higher-risk classes) notified body review.
- **Notified body assessment** — For Class IIa and above, an independent notified body must assess the device. There is currently a significant shortage of notified bodies, causing delays.
- **Post-market surveillance** — Ongoing obligations to monitor device performance, collect user feedback, report incidents, and update risk assessments throughout the device lifecycle.
- **EUDAMED registration** — The European Database on Medical Devices requires registration of devices, economic operators, certificates, and clinical investigations. Rollout has been phased.

## HITRUST CSF

**HITRUST CSF (Common Security Framework)** is a comprehensive security framework widely adopted in the healthcare industry as a way to demonstrate compliance with HIPAA and other regulatory requirements.

**What it is:** A certifiable framework that harmonizes requirements from HIPAA, NIST, ISO 27001, PCI DSS, and other standards into a single set of controls tailored for organizations handling health information.

**Relationship to HIPAA:** HITRUST is not required by law, but it has become a de facto standard for demonstrating HIPAA compliance. Many healthcare organizations require their vendors to have HITRUST certification.

**Certification levels:**

| Level | Name | Scope | Effort |
|---|---|---|---|
| **e1** | Essentials, 1-Year | Basic cybersecurity hygiene, 44 requirements | Lower effort, suitable for lower-risk organizations |
| **i1** | Implemented, 1-Year | Good security practices, 182 requirements | Moderate effort, demonstrates established security program |
| **r2** | Risk-Based, 2-Year | Comprehensive risk-based assessment, 200+ requirements | Highest effort, gold standard for healthcare vendors |

## Telehealth and Digital Health

Telehealth and digital health regulation adds additional layers of complexity beyond data privacy and device regulation.

**United States:**
- **State-by-state licensure** — Healthcare providers must generally be licensed in the state where the patient is located at the time of the telehealth encounter. Interstate compacts (such as the Interstate Medical Licensure Compact) simplify this for physicians, but coverage is not universal.
- **Prescribing restrictions** — Rules about prescribing medications via telehealth vary by state and drug schedule. The DEA's temporary COVID-era flexibilities for controlled substance prescribing via telehealth have been extended but remain in flux.
- **Reimbursement parity** — Many states have telehealth parity laws requiring insurers to reimburse telehealth services at the same rate as in-person services, but details vary.

**European Union:**
- Cross-border telehealth in the EU is governed by the **Cross-Border Healthcare Directive**, but practical implementation varies significantly by member state. Healthcare provider licensing remains a national competency.

**FDA and health apps:**
- The FDA distinguishes between health apps that are regulated as medical devices and those that are not. General wellness apps (exercise tracking, diet logging) that do not claim to diagnose or treat conditions are generally not regulated. Apps that claim to diagnose, treat, or prevent disease may be regulated as medical devices.

## Best Practices

- **Engage healthcare regulatory counsel early and often.** Healthcare is one of the most heavily regulated industries, and ignorance is not a defense for HIPAA violations. The cost of a single breach can dwarf the cost of proactive legal advice.
- **Assume you are a business associate until proven otherwise.** If your software could possibly touch PHI, operate under that assumption and implement HIPAA-compliant safeguards. Getting this wrong exposes you to direct liability.
- **Execute BAAs with all covered entity customers and downstream subcontractors.** A BAA is not optional — it is a legal prerequisite to receiving PHI. Ensure your BAA template has been reviewed by healthcare counsel.
- **Implement encryption for ePHI at rest and in transit.** While HIPAA technically treats encryption as "addressable" rather than "required," failing to encrypt ePHI is the single most common basis for enforcement actions and dramatically increases breach notification obligations.
- **Conduct a thorough SaMD assessment before launch.** Determine early whether your software meets the FDA's definition of a medical device. Launching an uncleared or unapproved medical device carries severe consequences, including product seizure and criminal prosecution.
- **Design for the minimum necessary standard.** Build role-based access controls, audit logging, and data segmentation into your architecture from day one. Retroactively restricting PHI access is far more difficult and expensive.
- **Prepare a breach response plan specific to healthcare.** HIPAA breach notification has specific timelines (60 days to individuals, HHS, and media for breaches affecting 500+), content requirements, and documentation obligations that differ from general data breach laws.
- **Monitor the evolving digital health regulatory landscape.** FDA guidance on AI/ML in SaMD, state telehealth laws, and international health data frameworks are changing rapidly. What is compliant today may not be compliant next year.
