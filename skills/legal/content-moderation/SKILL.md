---
name: content-moderation
description: |
    Use when identifying legal obligations for platforms hosting user-generated content. Covers intermediary liability (Section 230, EU DSA), DMCA takedown procedures, illegal content obligations, CSAM reporting requirements, and content moderation transparency mandates.
    USE FOR: Section 230, EU Digital Services Act, DMCA, intermediary liability, content moderation, takedown procedures, CSAM reporting, terrorist content regulation, online safety, platform liability, safe harbor
    DO NOT USE FOR: content filtering implementation (use platform-specific skills), intellectual property strategy (use intellectual-property), consumer protection terms (use consumer-protection)
license: MIT
metadata:
  displayName: "Content Moderation"
  author: "Tyler-R-Kendrick"
compatibility: claude, copilot, cursor
references:
  - title: "EU Digital Services Act (EUR-Lex)"
    url: "https://eur-lex.europa.eu/eli/reg/2022/2065/oj"
  - title: "U.S. Code Section 230 — Communications Decency Act"
    url: "https://www.law.cornell.edu/uscode/text/47/230"
  - title: "U.S. Copyright Office — DMCA"
    url: "https://www.copyright.gov/dmca/"
---

# Content Moderation

> **Disclaimer**: This skill provides general educational information about legal topics relevant to software development. It is **not legal advice**. Laws vary by jurisdiction and change frequently. Always consult a qualified attorney licensed in the relevant jurisdiction before making legal decisions for your organization.

## Overview

Any platform that hosts, transmits, or displays user-generated content faces legal obligations around content moderation, illegal content removal, and transparency. The legal landscape varies dramatically by jurisdiction -- from broad immunity (US Section 230) to proactive monitoring obligations (EU DSA for very large platforms). Understanding these frameworks is essential for any company operating a platform where users can post, share, or communicate content.

## Intermediary Liability Frameworks

| Framework | Jurisdiction | Approach | Key Provision |
|---|---|---|---|
| **Section 230 CDA** | US | Broad immunity | Platforms are not liable for third-party content, with exceptions for federal criminal law, intellectual property, and CSAM |
| **EU Digital Services Act** | EU | Conditional immunity with obligations | Notice-and-action procedures, transparency requirements, risk assessments for VLOPs, and systemic risk management |
| **E-Commerce Directive Art 14** | EU (legacy) | Hosting immunity if no actual knowledge | Being superseded by the DSA; provided immunity for hosting services that did not have actual knowledge of illegal content |
| **Online Safety Act** | UK | Duty of care | Proactive measures required for priority illegal content, plus child safety duties for platforms likely to be accessed by children |
| **IT Act Section 79** | India | Safe harbor with conditions | Due diligence requirements for intermediaries, including 36-hour takedown on government order |
| **NetzDG** | Germany | Platform accountability for illegal content | 24-hour removal for clearly illegal content, 7 days for other illegal content, with reporting obligations |

## DMCA Takedown Process

The Digital Millennium Copyright Act (DMCA) establishes a structured process for addressing copyright infringement on online platforms. Following this process correctly is essential to maintaining safe harbor protection under Section 512 of the US Copyright Act.

### Step-by-Step Process

1. **Copyright holder sends takedown notice (Section 512(c))** — The notice must identify the copyrighted work, the infringing material, and include a statement of good faith belief that the use is not authorized. It must be signed (physically or electronically) under penalty of perjury.

2. **Service provider removes or disables access to content "expeditiously"** — Upon receiving a valid takedown notice, the service provider must act quickly to remove or disable access to the allegedly infringing material.

3. **Service provider notifies the user** — The provider must promptly inform the user whose content was removed about the takedown and provide a copy of the notice or a summary of its contents.

4. **User may file counter-notification** — If the user believes the takedown was in error or that they have a right to use the material, they may file a counter-notification under penalty of perjury stating the material was removed by mistake or misidentification.

5. **Service provider restores content after 10-14 business days** — Unless the copyright holder files a lawsuit and notifies the service provider within 10-14 business days, the provider must restore the removed content.

### Requirements for a Valid DMCA Notice

- Identification of the copyrighted work claimed to be infringed.
- Identification of the infringing material and its location on the platform.
- Contact information for the complaining party.
- A statement of good faith belief that the use is not authorized.
- A statement that the information in the notice is accurate, under penalty of perjury.
- A physical or electronic signature of the copyright owner or authorized agent.

### Designated Agent Registration

Service providers must register a designated agent with the US Copyright Office to receive DMCA takedown notices. This registration must be filed through the Copyright Office's online system and kept current. Failure to designate an agent can result in loss of safe harbor protection.

## EU DSA Obligations by Platform Size

The EU Digital Services Act imposes a tiered system of obligations based on platform size and type, with increasing requirements for larger platforms.

| Platform Type | Size | Key Obligations |
|---|---|---|
| **All intermediaries** | Any | Transparency reports, Terms of Service clarity, cooperation with national authorities, single point of contact for authorities and users |
| **Hosting services** | Any | Notice-and-action mechanisms, statement of reasons for content removals, notification to users of moderation decisions |
| **Online platforms** | Any with public content | Additional transparency requirements, internal complaint-handling systems, out-of-court dispute resolution, trusted flagger mechanisms, measures against misuse |
| **Very Large Online Platforms (VLOPs)** | 45M+ EU users | Systemic risk assessment, independent audits, data access for vetted researchers, crisis response protocols, advertising repositories, recommender system transparency |
| **Very Large Online Search Engines** | 45M+ EU users | Similar obligations to VLOPs, including systemic risk assessments, independent audits, and researcher data access |

## Mandatory Reporting Obligations

### CSAM (Child Sexual Abuse Material)

Child sexual abuse material carries the most stringent legal obligations of any content category. Failure to comply can result in criminal liability.

- **United States** — Federal law (18 USC 2258A) requires electronic service providers to report apparent CSAM to the National Center for Missing & Exploited Children (NCMEC). Failure to report is a federal offense carrying fines of up to $300,000 for a first offense and $600,000 for subsequent offenses.
- **European Union** — The proposed EU CSAM Regulation would introduce detection orders requiring platforms to scan for known and new CSAM using approved technologies. Member states already have national reporting obligations.
- **Criminal penalties** — Beyond reporting obligations, knowingly distributing, possessing, or producing CSAM carries severe criminal penalties in virtually every jurisdiction worldwide.

### Terrorist Content

- **EU Terrorism Content Online (TCO) Regulation** — Requires hosting service providers to remove terrorist content within one hour of receiving a removal order from a competent authority in an EU member state. Platforms must also take specific measures to address the dissemination of terrorist content, including the use of automated tools where appropriate.
- **Christchurch Call** — A voluntary commitment by governments and technology companies to eliminate terrorist and violent extremist content online.

## Content Moderation Approaches

Different content moderation strategies carry different legal implications depending on the jurisdiction and the type of content involved.

| Approach | Description | Legal Considerations |
|---|---|---|
| **Proactive filtering** | Automated detection and removal before publication | May increase liability awareness in some jurisdictions; required for CSAM in some proposals; must avoid over-removal under DSA |
| **Reactive / notice-and-action** | Respond to reports and notices from users, rightsholders, or authorities | Standard approach under US and EU frameworks; essential for maintaining safe harbor protections |
| **Human review** | Manual review of flagged content by trained moderators | Required for complex decisions under DSA; necessary for context-dependent content; raises worker welfare concerns |
| **Hybrid** | Automated flagging combined with human review for final decisions | Recommended approach that balances scale with accuracy; aligns with DSA requirements for meaningful human oversight |

## Transparency Requirements

Modern content moderation laws increasingly mandate transparency as a core obligation for platforms.

- **DSA transparency reports** — Platforms must publish regular reports detailing the volume of content moderation actions, the types of content removed, the grounds for removal, and the use of automated tools.
- **Content moderation algorithmic transparency** — VLOPs must explain how their recommender systems work and offer users at least one option not based on profiling.
- **Advertising transparency** — VLOPs must maintain publicly accessible repositories of all advertisements displayed on their platform, including information about the advertiser, the content, the targeting parameters, and the period of display.
- **Terms of Service clarity** — All platforms must ensure their Terms of Service clearly describe content moderation policies, including the types of content restricted, the tools and methods used, and the rights of users to appeal decisions.

## Best Practices

- **Always consult qualified legal counsel for content moderation policy decisions.** CSAM reporting failures carry criminal liability, and the legal landscape for platform obligations is evolving rapidly across jurisdictions. An experienced attorney can help you navigate these obligations.
- **Implement a robust notice-and-action system.** Design clear workflows for receiving, evaluating, and acting on content reports. Document every step to demonstrate compliance with legal obligations and to support any disputes.
- **Register a DMCA designated agent and keep the registration current.** This is a prerequisite for safe harbor protection under US copyright law. Ensure the agent's contact information is also prominently displayed on your platform.
- **Build CSAM detection and reporting into your platform from day one.** Use established tools (such as PhotoDNA or similar hash-matching technologies) and report all apparent CSAM to the appropriate authorities (NCMEC in the US). Never delay reporting.
- **Maintain detailed records of all content moderation actions.** Record what was removed, why, when, by whom (or by what automated system), and what notice was given to the user. These records are essential for DSA compliance, legal defense, and internal auditing.
- **Provide meaningful appeal mechanisms for users.** Both the DSA and general principles of due process require that users have the ability to challenge content moderation decisions. Ensure appeals are reviewed by a human who was not involved in the original decision.
- **Train content moderation teams and invest in their well-being.** Moderators reviewing harmful content face significant psychological risks. Provide regular training on legal obligations, platform policies, and emerging content types, along with mental health support.
- **Monitor regulatory developments across all jurisdictions where you operate.** Content moderation law is one of the fastest-evolving areas of technology regulation. Assign responsibility for tracking legislative and regulatory changes and updating your policies accordingly.
