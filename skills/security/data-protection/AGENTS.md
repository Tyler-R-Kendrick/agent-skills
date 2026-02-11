# Data Protection

## Overview

Data protection spans both compliance requirements and technical controls. Organizations must protect data not only to meet regulatory obligations but also to maintain customer trust and limit business risk. Privacy by design — the principle of embedding privacy considerations into every stage of system development — is mandatory under GDPR and is increasingly becoming the expectation under other frameworks. Effective data protection requires understanding what data you have, where it lives, how it flows, who can access it, and how long it must be retained.

## Data Classification

Data classification assigns sensitivity levels to information assets, enabling organizations to apply proportionate security controls. Every piece of data should be classified, and the classification should drive technical and procedural safeguards.

| Level | Description | Examples | Controls |
|---|---|---|---|
| **Public** | Information intended for public disclosure; no adverse impact if exposed | Marketing materials, public documentation, open-source code, press releases | No special controls required; integrity protections recommended |
| **Internal** | Information for internal use only; minor impact if disclosed | Internal policies, meeting notes, project plans, org charts | Access restricted to employees; basic access controls; no public sharing |
| **Confidential** | Sensitive business information; significant impact if disclosed | Customer lists, financial reports, contracts, source code, employee records | Encryption at rest and in transit; role-based access control; audit logging; NDA required for third-party access |
| **Restricted** | Highly sensitive data; severe regulatory, legal, or business impact if disclosed | PII, PHI, payment card data (PCI), trade secrets, cryptographic keys | Strong encryption (AES-256); strict need-to-know access; MFA required; full audit trail; data loss prevention (DLP); breach notification obligations |

## Encryption Requirements

### At Rest

Data at rest — stored in databases, file systems, object storage, or backups — must be encrypted to protect against unauthorized access in the event of physical theft, unauthorized backup access, or misconfigured storage permissions.

| Requirement | Details |
|---|---|
| Algorithm | AES-256 (AES-256-GCM preferred for authenticated encryption) |
| Transparent encryption | Use platform-native encryption (AWS KMS + S3 SSE, Azure Storage Service Encryption, GCP CMEK) for minimal application changes |
| Key storage | Keys must be stored separately from encrypted data; use dedicated key management services (AWS KMS, Azure Key Vault, HashiCorp Vault, GCP Cloud KMS) |
| Key rotation | Rotate encryption keys at least annually; automate rotation where possible; retain old keys for decrypting historical data |
| Database encryption | Enable Transparent Data Encryption (TDE) for relational databases; use field-level encryption for highly sensitive columns |
| Backup encryption | All backups must be encrypted with the same rigor as primary data; test restoration from encrypted backups regularly |

### In Transit

Data in transit — moving between clients and servers, between services, or between data centers — must be protected from eavesdropping and tampering.

| Requirement | Details |
|---|---|
| Protocol | TLS 1.2 as minimum; TLS 1.3 preferred; disable TLS 1.0/1.1 and SSL entirely |
| HTTPS everywhere | All API endpoints, web interfaces, and webhooks must use HTTPS; redirect HTTP to HTTPS; set HSTS headers |
| Certificate validation | Validate server certificates in all clients; do not disable certificate verification in production; pin certificates for mobile apps and critical service-to-service calls where appropriate |
| Internal traffic | Encrypt service-to-service communication within the network using mTLS or a service mesh (Istio, Linkerd); do not assume internal networks are trusted |
| Certificate management | Use automated certificate management (Let's Encrypt, AWS ACM) to prevent expiration-related outages; monitor certificate expiry |

## Privacy Regulations

The following table compares the major privacy regulations that most organizations must consider. This is a summary — consult legal counsel for jurisdiction-specific compliance requirements.

| Regulation | Jurisdiction | Key Requirements | Penalties |
|---|---|---|---|
| **GDPR** | European Union (and EEA) | Lawful basis for processing (consent, contract, legitimate interest); data subject rights (access, rectification, erasure, portability); Data Protection Officer (DPO) required for large-scale processing; breach notification to supervisory authority within 72 hours; Data Protection Impact Assessments (DPIA) for high-risk processing; privacy by design and by default | Up to 4% of global annual revenue or 20 million EUR, whichever is higher |
| **CCPA/CPRA** | California, USA | Right to know what data is collected; right to delete personal information; right to opt-out of sale/sharing of personal information; right to non-discrimination for exercising rights; data minimization and purpose limitation (CPRA); risk assessments for high-risk processing (CPRA) | Up to $7,500 per intentional violation; $2,500 per unintentional violation; private right of action for data breaches ($100-$750 per consumer per incident) |
| **HIPAA** | United States (healthcare) | Administrative, physical, and technical safeguards for Protected Health Information (PHI); Business Associate Agreements (BAA) required for third-party processors; access logs and audit controls; minimum necessary standard for PHI access; breach notification to individuals and HHS | Up to $1.5 million per year per violation category; criminal penalties for willful neglect (up to $250,000 and imprisonment) |

## PII Handling

Personally Identifiable Information (PII) requires specific technical and procedural controls throughout its lifecycle.

**Data Minimization**

Collect only the personal data that is strictly necessary for the stated purpose. Review data collection forms, API request schemas, and database schemas to identify and eliminate unnecessary fields. Ask: "Do we need this data to provide the service?" If not, do not collect it.

**Purpose Limitation**

Use personal data only for the purpose for which it was collected. If a new use case arises, assess whether it is compatible with the original purpose or whether new consent is required. Document the purpose for each data element in a data inventory.

**Tokenization and Pseudonymization**

- **Tokenization**: Replace sensitive data with non-sensitive tokens that map back to the original data via a secure token vault. Tokens have no mathematical relationship to the original data.
- **Pseudonymization**: Replace identifying fields with pseudonyms; the data can be re-identified with a separate key. GDPR recognizes pseudonymization as a risk-reduction measure but still treats pseudonymized data as personal data.

**Right to Erasure (Right to be Forgotten)**

Implement a process to delete or anonymize all personal data associated with a data subject upon verified request. This must cover primary databases, backups, caches, logs, analytics systems, and third-party processors. Key considerations:
- Define what "erasure" means for each data store (hard delete vs. cryptographic erasure vs. anonymization).
- Propagate deletion requests to all downstream systems and third-party processors.
- Maintain a record of the deletion request and its execution (without retaining the deleted data itself).
- Handle exceptions for legal holds and regulatory retention requirements.

**Data Subject Access Requests (DSAR)**

Build automated or semi-automated workflows to respond to DSARs within regulatory timelines (30 days under GDPR). The system must be able to locate, extract, and export all personal data associated with a given identity across all data stores.

## Data Masking and Tokenization

| Technique | When to Use | Details |
|---|---|---|
| **Tokenization** | When the original data must be retrievable by authorized systems (e.g., payment processing) | Non-reversible without access to the token vault; tokens can preserve format (e.g., same length as a credit card number); ideal for PCI DSS scope reduction |
| **Format-Preserving Encryption (FPE)** | When encrypted data must retain the same format as the original (e.g., SSN, phone number) | Encrypts data while preserving length and character set; useful for legacy systems that validate field formats; uses FF1 or FF3-1 algorithms |
| **Dynamic Masking** | When data must be masked in real-time based on the requesting user's role or context | Applied at query time; the underlying data is not modified; useful for analytics and support access where full data is not needed |
| **Static Masking** | When creating non-production copies of data (e.g., for testing or development environments) | Applied once to create a masked copy; original data structure is preserved; irreversible; ensures test environments contain no real PII |

Key decisions:
- Use tokenization when you need to reverse the process for legitimate business operations.
- Use static masking for non-production environments — never use real PII in development or testing.
- Use dynamic masking for production access control scenarios where different users need different levels of data visibility.

## Data Retention

Data retention policies define how long data is kept and what happens when the retention period expires. Retaining data longer than necessary increases risk, storage costs, and regulatory exposure.

**Define Retention Policies**

- Establish retention periods based on regulatory requirements, business needs, and contractual obligations.
- Document retention policies in a data retention schedule that covers every data category.
- Ensure retention periods are specific (e.g., "3 years after account closure") rather than vague (e.g., "as long as needed").

**Automated Deletion**

- Implement automated processes to delete or anonymize data when the retention period expires.
- Use database-level TTL (Time-to-Live) features, scheduled jobs, or lifecycle policies (e.g., S3 lifecycle rules) to enforce retention.
- Verify automated deletion is working through regular audits.

**Legal Hold**

- Implement a legal hold process that can suspend automated deletion for data relevant to litigation, regulatory investigations, or audits.
- Legal holds must be granular — hold only the specific data relevant to the matter, not all data for a given user or category.
- Track all active legal holds and release them promptly when they are no longer needed.

**Backup Considerations**

- Retention policies must account for backup cycles. Data deleted from primary storage may still exist in backups.
- Define how long backups are retained and how deletion requests are handled for data in backups (e.g., delete upon next backup rotation vs. cryptographic erasure of the backup encryption key).
- Regularly test the ability to restore from backups and verify that retained data is still usable.

## Best Practices

- **Maintain a comprehensive data inventory** — you cannot protect data you do not know about; catalog all personal and sensitive data, where it is stored, how it flows, and who has access.
- **Apply privacy by design from the start** — embed data protection into architecture decisions, not as a retrofit; conduct Data Protection Impact Assessments (DPIAs) for new systems that process personal data.
- **Encrypt by default** — enable encryption at rest and in transit for all data stores and communication channels; treat encryption as baseline, not an add-on for sensitive data only.
- **Implement least-privilege access to sensitive data** — restrict access to personal and confidential data based on role and business need; review access permissions regularly and revoke unnecessary grants.
- **Automate compliance processes** — manual compliance processes do not scale; automate DSAR fulfillment, retention enforcement, consent management, and breach detection to reduce human error and response times.
- **Test your data deletion capabilities** — regularly verify that erasure requests result in actual deletion across all systems, including backups, caches, logs, and third-party processors.
- **Monitor for data exfiltration** — deploy Data Loss Prevention (DLP) tools to detect unauthorized data transfers via email, cloud storage, USB, and API calls; alert on anomalous data access patterns.
- **Train all employees on data handling** — security and privacy training should cover data classification, acceptable use, incident reporting, and regulatory obligations; tailor training to roles (developers, support, executives).
