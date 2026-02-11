---
name: consumer-protection
description: |
    Use when identifying consumer protection laws that apply to software products and digital services. Covers terms of service, EULAs, refund policies, dark patterns regulation, subscription practices, the EU Digital Markets Act, and consumer rights across jurisdictions.
    USE FOR: terms of service, EULA, consumer rights, refund policies, dark patterns, auto-renewal laws, Digital Markets Act, Digital Services Act, FTC Act, CAN-SPAM, children's privacy (COPPA), subscription traps
    DO NOT USE FOR: data privacy regulations (use privacy-data-protection), content liability (use content-moderation), contract drafting (consult legal counsel)
license: MIT
metadata:
  displayName: "Consumer Protection"
  author: "Tyler-R-Kendrick"
compatibility: claude, copilot, cursor
references:
  - title: "Federal Trade Commission (FTC) — Consumer Protection"
    url: "https://www.ftc.gov/about-ftc/bureaus-offices/bureau-consumer-protection"
  - title: "EU Digital Markets Act (EUR-Lex)"
    url: "https://eur-lex.europa.eu/eli/reg/2022/1925/oj"
  - title: "EU Digital Services Act (EUR-Lex)"
    url: "https://eur-lex.europa.eu/eli/reg/2022/2065/oj"
---

# Consumer Protection

> **Disclaimer**: This skill provides general educational information about legal topics relevant to software development. It is **not legal advice**. Laws vary by jurisdiction and change frequently. Always consult a qualified attorney licensed in the relevant jurisdiction before making legal decisions for your organization.

## Overview

Consumer protection laws govern the relationship between software companies and their users or customers. These laws increasingly target digital-specific practices like dark patterns, auto-renewal subscriptions, and manipulative design. As regulators worldwide focus more attention on digital markets, software companies must ensure their user interfaces, pricing practices, marketing, and terms of service comply with a growing body of consumer protection legislation. Failure to comply can result in enforcement actions, significant fines, class action lawsuits, and reputational damage.

## Key Consumer Protection Laws

| Law | Jurisdiction | Scope | Key Requirements |
|---|---|---|---|
| **FTC Act Section 5** | US | Unfair or deceptive acts or practices in commerce | Truthful advertising, clear disclosures, substantiated claims |
| **CAN-SPAM Act** | US | Commercial email messages | Opt-out mechanism, honest subject lines, physical mailing address, identification as advertisement |
| **COPPA** (Children's Online Privacy Protection Act) | US | Online services directed at or knowingly collecting data from children under 13 | Verifiable parental consent, data minimization, clear privacy policy, right to review/delete child's data |
| **EU Consumer Rights Directive** | EU | Business-to-consumer digital contracts | 14-day withdrawal (cooling-off) right, pre-contractual information disclosure, refund within 14 days of withdrawal |
| **EU Digital Markets Act (DMA)** | EU | Gatekeeper platforms (large online platforms meeting specific thresholds) | Interoperability requirements, prohibition on self-preferencing, data portability, ban on tying services |
| **EU Digital Services Act (DSA)** | EU | Online platforms and intermediaries | Content moderation transparency, illegal content removal processes, algorithmic transparency, annual risk assessments |
| **California Auto-Renewal Law** (ARL) | California, US | Automatic renewal and continuous service offers | Clear and conspicuous disclosure of terms, affirmative consent before charging, easy cancellation mechanism |
| **UK Consumer Rights Act 2015** | UK | Digital content supplied to consumers | Satisfactory quality, fit for particular purpose, as described, 30-day right to refund for faulty digital content |

## Dark Patterns

Dark patterns are deceptive or manipulative user interface designs that trick users into taking actions they did not intend. Regulators including the FTC, EU authorities, and the California Attorney General have taken enforcement action against dark patterns, and legislation specifically targeting these practices is expanding.

### Common Dark Patterns

| Pattern | Description | Legal Risk |
|---|---|---|
| **Confirmshaming** | Using guilt-tripping language to manipulate users into accepting an option (e.g., "No thanks, I don't like saving money") | FTC unfairness doctrine, EU unfair commercial practices |
| **Hidden costs** | Revealing additional fees, taxes, or charges late in the checkout process after the user has invested time | FTC deceptive practices, EU Consumer Rights Directive (pre-contractual info) |
| **Roach motel** | Making it easy to subscribe or sign up but deliberately difficult to cancel or unsubscribe | California ARL, FTC "click to cancel" rule, EU Consumer Rights Directive |
| **Forced continuity** | Silently charging users after a free trial ends without clear notice or easy cancellation | California ARL, FTC enforcement, EU auto-renewal rules |
| **Misdirection** | Using visual design, layout, or language to steer users toward an unintended but more profitable action | FTC deceptive practices, EU DSA transparency requirements |
| **Bait and switch** | Advertising one product, price, or offer and then substituting a different one at the point of purchase | FTC Act Section 5, state consumer protection statutes |

### Regulatory Landscape for Dark Patterns

- **FTC (US)** — The FTC has brought enforcement actions against companies using dark patterns, relying on Section 5's prohibition on unfair or deceptive practices. The FTC's 2022 report "Bringing Dark Patterns to Light" signaled aggressive enforcement.
- **EU DSA** — The Digital Services Act explicitly prohibits online platforms from using dark patterns that materially distort or impair users' ability to make free and informed decisions.
- **California** — California's privacy laws (CCPA/CPRA) include provisions prohibiting the use of dark patterns in the context of obtaining consumer consent, and the California Attorney General has issued specific guidance.

## Terms of Service / EULA

### Essential Terms

Terms of Service (ToS) and End-User License Agreements (EULAs) for software products should address the following areas:

- **Governing law and jurisdiction** — Specify which jurisdiction's law governs the agreement and where disputes will be resolved.
- **Limitation of liability** — Limit the company's liability to the extent permitted by applicable law. Note that many jurisdictions restrict the ability to limit liability for certain claims (e.g., personal injury, fraud).
- **Dispute resolution** — Specify whether disputes will be resolved through arbitration, mediation, or litigation. Include class action waiver provisions where enforceable.
- **Arbitration clause** — If using arbitration, specify the arbitration provider, rules, location, and whether arbitration is binding. Note that consumer arbitration clauses are unenforceable or restricted in many EU jurisdictions.
- **Termination rights** — Define when and how either party can terminate the agreement, including what happens to user data upon termination.
- **Intellectual property** — Clarify what rights the user receives (license, not ownership) and what rights the company retains.
- **Acceptable use policy** — Define prohibited uses of the software or service.
- **Modification of terms** — Describe how changes to the terms will be communicated and when they take effect.

### Enforceability Considerations

- **Clickwrap agreements** — Requiring users to affirmatively click "I agree" before accessing a service is generally enforceable across most jurisdictions. This is the strongest form of online consent.
- **Browsewrap agreements** — Terms that are merely posted on a website with a hyperlink in the footer, without requiring affirmative consent, are frequently found unenforceable because users have no notice.
- **Conspicuous presentation** — Courts evaluate whether the terms were presented in a manner that a reasonable user would notice. Buried links, small fonts, and low-contrast text undermine enforceability.
- **Jurisdiction-specific requirements** — EU consumer law prohibits unfair contract terms in B2C agreements. Many clauses that are enforceable in the US (e.g., broad liability waivers, mandatory arbitration) may be void under EU or UK law.

## Subscription and Auto-Renewal

Subscription-based software is subject to increasingly strict consumer protection rules:

### Disclosure Requirements

- Auto-renewal terms must be **clearly and conspicuously** disclosed before the consumer subscribes.
- The disclosure must include the price, billing frequency, cancellation policy, and what happens at the end of a free trial.
- These disclosures must appear in proximity to the consent mechanism — not buried in lengthy terms of service.

### Easy Cancellation Mandates

- **FTC "Click to Cancel" Rule** — The FTC has adopted a rule requiring that businesses make cancellation as easy as sign-up. If a consumer can subscribe online, they must be able to cancel online without being forced to call a phone number or navigate multiple retention screens.
- **California Auto-Renewal Law** — Requires a "simple mechanism" for cancellation, and mandates sending a post-purchase acknowledgment that includes cancellation instructions.
- **EU Consumer Rights Directive** — Grants consumers a 14-day cooling-off period for online purchases, during which they can withdraw without penalty.

### Free Trial Conversion Rules

- Before converting a free trial to a paid subscription, companies must send clear notice and obtain affirmative consent to be charged.
- California and several other states require that free trial offers include the full price the consumer will be charged when the trial ends, along with instructions for canceling.

## Children's Privacy (COPPA / EU Age Requirements)

Software products directed at or knowingly used by children are subject to heightened consumer protection requirements:

### COPPA (US)

- Applies to online services directed at children under 13, or that have actual knowledge they are collecting data from children under 13.
- Requires **verifiable parental consent** before collecting, using, or disclosing personal information from children.
- Mandates **data minimization** — only collecting data reasonably necessary for the child's participation in the activity.
- Requires a clear, comprehensive **privacy policy** describing data practices.

### EU Age Requirements

- GDPR Article 8 sets the default age of consent for data processing at 16 (member states may lower it to 13).
- The **UK Age Appropriate Design Code** (Children's Code) requires online services likely to be accessed by children to implement 15 standards of age-appropriate design, including high privacy defaults, data minimization, and restrictions on nudge techniques.

### Age Verification

- Implement age gates or age verification mechanisms where required.
- Consider the privacy implications of age verification itself — collecting identity documents or biometric data for verification creates additional privacy obligations.

## Best Practices

- **Have legal counsel review all consumer-facing terms, pricing practices, and user interface flows.** Consumer protection law varies significantly by jurisdiction, and enforcement is increasing. What is permissible in one market may be illegal in another.
- **Design cancellation flows to be as simple as sign-up flows.** The FTC's "click to cancel" rule and similar state and EU requirements make this a legal obligation, not just a best practice.
- **Disclose all material terms before the consumer commits.** Ensure pricing, auto-renewal terms, cancellation policies, and any limitations are presented clearly and conspicuously before the consumer clicks "subscribe" or "buy."
- **Avoid dark patterns in all user interfaces.** Audit your product regularly for confirmshaming, hidden costs, roach motel patterns, forced continuity, and misdirection. What product teams see as "growth optimization" may constitute an unfair or deceptive practice under consumer protection law.
- **Implement age-appropriate design for products accessible to children.** If your service is likely to be used by minors, comply with COPPA, GDPR Article 8, and the UK Age Appropriate Design Code. When in doubt, apply the most protective standard.
- **Use clickwrap consent for all terms of service.** Require affirmative user action (clicking "I agree") rather than relying on browsewrap terms that may be unenforceable.
- **Send clear confirmation and renewal notices.** After a consumer subscribes, send a confirmation that includes the terms, price, renewal date, and cancellation instructions. Send renewal reminders before each billing cycle.
- **Monitor enforcement trends and regulatory guidance.** The FTC, EU Commission, and state attorneys general regularly publish guidance, enforcement actions, and rulemaking proposals that signal where consumer protection law is heading. Stay informed and adapt your practices proactively.
