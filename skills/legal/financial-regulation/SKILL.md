---
name: financial-regulation
description: |
    Use when identifying financial regulations that apply to software handling payments, banking, or financial data. Covers PCI DSS, PSD2/PSD3, SOX, AML/KYC, Dodd-Frank, MiFID II, open banking, and fintech licensing across jurisdictions.
    USE FOR: PCI DSS, PSD2, PSD3, SOX, AML, KYC, Dodd-Frank, MiFID II, open banking, fintech licensing, payment processing compliance, money transmission, crypto regulation
    DO NOT USE FOR: payment gateway integration (use platform-specific skills), encryption implementation (use security/cryptography), financial data modeling (use dev/backend/data-modeling)
license: MIT
metadata:
  displayName: "Financial Regulation"
  author: "Tyler-R-Kendrick"
compatibility: claude, copilot, cursor
references:
  - title: "PCI Security Standards Council"
    url: "https://www.pcisecuritystandards.org"
  - title: "PSD2 Directive Official Text (EUR-Lex)"
    url: "https://eur-lex.europa.eu/eli/dir/2015/2366/oj"
  - title: "U.S. Securities and Exchange Commission (SEC)"
    url: "https://www.sec.gov"
---

# Financial Regulation

> **Disclaimer**: This skill provides general educational information about legal topics relevant to software development. It is **not legal advice**. Laws vary by jurisdiction and change frequently. Always consult a qualified attorney licensed in the relevant jurisdiction before making legal decisions for your organization.

## Overview

Any software that touches money, financial data, or payment information is subject to significant regulation. The rules differ by jurisdiction, financial activity type, and whether you are acting as a principal or an intermediary. From card payment processing to cryptocurrency custody, the regulatory landscape is broad, overlapping, and carries some of the most severe penalties in all of technology law. Understanding which regulations apply to your product is the essential first step before writing a single line of payment-handling code.

## Key Financial Regulations

| Regulation | Jurisdiction | Scope | Key Requirements | Penalty |
|---|---|---|---|---|
| **PCI DSS v4.0** | Global (card brands) | Anyone storing, processing, or transmitting cardholder data | 12 requirements including encryption, access control, monitoring, and vulnerability management | Fines up to $100K/month + losing ability to process cards |
| **PSD2 / PSD3** | EU | Payment service providers | Strong Customer Authentication (SCA), open banking APIs, third-party access | Regulatory sanctions |
| **SOX (Sarbanes-Oxley)** | US | Publicly traded companies | IT controls for financial reporting, audit trails, CEO/CFO certification | Criminal penalties including imprisonment |
| **Dodd-Frank** | US | Financial institutions | Consumer protection, systemic risk oversight, derivatives regulation | CFPB enforcement |
| **MiFID II** | EU | Investment firms | Transparency, best execution, reporting, investor protection | Regulatory sanctions |
| **AML Directives / AMLD6** | EU | Financial institutions + crypto | Customer due diligence, transaction monitoring, suspicious activity reporting | Criminal liability |
| **Bank Secrecy Act / FinCEN** | US | Financial institutions + MSBs | SAR filing, CTR reporting, CIP, recordkeeping | Criminal + civil penalties |
| **DORA** | EU | Financial entities + ICT providers | ICT risk management, incident reporting, resilience testing, third-party risk | Regulatory enforcement from January 2025 |

## Money Transmission / E-Money

One of the most critical questions for fintech companies is: **when does your application trigger money transmitter licensing?** Many startups have been surprised to learn that holding user funds, facilitating peer-to-peer transfers, or offering crypto custody can require extensive licensing.

### Licensing Requirements by Activity

| Activity | US | EU | UK |
|---|---|---|---|
| **Holding funds on behalf of users** | State money transmitter licenses + FinCEN MSB registration | E-money license (EMI) under EMD2 | FCA e-money authorization |
| **Facilitating transfers between users** | State money transmitter licenses + FinCEN MSB registration | Payment institution license under PSD2 | FCA payment institution authorization |
| **Cryptocurrency custody** | State money transmitter licenses (varies by state) + FinCEN MSB registration | MiCA crypto-asset service provider (CASP) license | FCA registration under MLR |

In the **United States**, money transmission is regulated at both the federal and state level. You must register as a Money Services Business (MSB) with FinCEN at the federal level, and then obtain individual money transmitter licenses in each state where you operate. Most states require separate applications, surety bonds, and ongoing compliance. This process can take 12-24 months and cost hundreds of thousands of dollars.

In the **EU**, the e-money and payment institution licensing framework under PSD2 and the Electronic Money Directive provides a more harmonized (though still complex) approach with passporting rights across member states.

In the **UK**, post-Brexit, the Financial Conduct Authority (FCA) maintains its own authorization regime, broadly similar to EU requirements but with diverging details.

## Open Banking

PSD2 established the legal foundation for open banking in Europe, requiring banks to provide access to customer account information and payment initiation services through standardized APIs.

**Key concepts:**

- **AISP (Account Information Service Provider)** — Third parties authorized to access account information with customer consent (read-only access).
- **PISP (Payment Initiation Service Provider)** — Third parties authorized to initiate payments from a customer's account with their consent.
- **Screen scraping prohibition** — PSD2 generally prohibits screen scraping in favor of dedicated APIs, though fallback mechanisms exist where APIs are unreliable.

**API Standards by Region:**

| Region | Standard | Governing Body |
|---|---|---|
| EU | Berlin Group NextGenPSD2 | Berlin Group |
| UK | UK Open Banking Standard | Open Banking Implementation Entity (OBIE) |
| US | FDX (Financial Data Exchange) | FDX (industry-led, not mandated) |
| Australia | Consumer Data Right (CDR) | ACCC + Data Standards Body |

Open banking is expanding beyond payments into "open finance," with PSD3 and the EU Financial Data Access (FIDA) framework extending data-sharing obligations to insurance, pensions, and investments.

## Cryptocurrency and Digital Assets

The regulatory landscape for cryptocurrency and digital assets is evolving rapidly and varies significantly by jurisdiction.

**Key regulatory frameworks:**

- **MiCA (Markets in Crypto-Assets Regulation)** — The EU's comprehensive crypto regulation, effective from 2024-2025. Establishes licensing requirements for Crypto-Asset Service Providers (CASPs), rules for stablecoin issuers (EMTs and ARTs), and market abuse provisions. This is currently the most comprehensive crypto regulatory framework globally.
- **United States** — Regulatory jurisdiction remains contested between the SEC and CFTC. The SEC treats many tokens as securities under the Howey test, while the CFTC claims jurisdiction over commodities (including Bitcoin). State money transmitter laws also apply to crypto custodians and exchanges. The regulatory approach remains enforcement-driven rather than framework-driven.
- **United Kingdom** — The FCA regulates crypto assets primarily through anti-money laundering registration. The Financial Services and Markets Act 2023 provides a framework for broader regulation.

**Classification challenges:** The treatment of stablecoins, DeFi protocols, and NFTs varies by jurisdiction. Stablecoins may be regulated as e-money, securities, or under bespoke regimes. DeFi protocols raise questions about who the regulated entity is when there is no central operator. NFTs may be treated as securities, collectibles, or something else entirely depending on their characteristics and how they are marketed.

## PCI DSS Compliance Levels

If your software processes payment cards, your PCI DSS compliance level depends on your annual transaction volume:

| Level | Transaction Volume | Requirements |
|---|---|---|
| **Level 1** | Over 6 million transactions/year | Annual on-site assessment by Qualified Security Assessor (QSA) + quarterly network scan by Approved Scanning Vendor (ASV) |
| **Level 2** | 1 million to 6 million transactions/year | Annual Self-Assessment Questionnaire (SAQ) + quarterly ASV scan |
| **Level 3** | 20,000 to 1 million e-commerce transactions/year | Annual SAQ + quarterly ASV scan |
| **Level 4** | Fewer than 20,000 e-commerce transactions/year | Annual SAQ recommended (requirements vary by acquirer) |

**PCI DSS v4.0** (mandatory from March 2025) introduces significant changes including customized validation approaches, expanded multi-factor authentication requirements, and new e-commerce anti-skimming protections. If you are still on v3.2.1, you must transition.

## Best Practices

- **Always consult financial regulatory counsel before launching any product that touches money or financial data.** Fintech regulation is one of the highest-penalty areas in technology law, with both civil and criminal exposure for non-compliance.
- **Map your regulatory obligations before writing code.** Identify every jurisdiction where you will operate and every financial activity your product performs. The licensing requirements may fundamentally affect your product architecture and go-to-market timeline.
- **Design for PCI DSS compliance from the start.** Retrofitting PCI compliance is extremely expensive. Minimize your cardholder data environment by using tokenization and hosted payment fields to reduce scope.
- **Implement robust KYC/AML controls.** If your product involves money movement, you will almost certainly need identity verification, transaction monitoring, and suspicious activity reporting capabilities.
- **Maintain comprehensive audit trails.** Financial regulators expect detailed logging of all transactions, access events, and compliance decisions. Design your data architecture to support this from day one.
- **Monitor regulatory changes continuously.** Financial regulation is one of the fastest-moving areas of law, particularly around cryptocurrency, open banking, and AI in financial services.
- **Engage with regulators proactively.** Many regulators offer sandbox programs, no-action letters, or guidance for innovative fintech products. Engaging early can save significant time and legal risk.
- **Plan for multi-jurisdictional compliance.** If you operate across borders, you will face overlapping and sometimes conflicting regulatory requirements. Build your compliance architecture to be modular and jurisdiction-aware.
