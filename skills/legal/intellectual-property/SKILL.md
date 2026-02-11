---
name: intellectual-property
description: |
    Use when identifying intellectual property considerations for software products. Covers patents, copyrights, trademarks, trade secrets, and IP assignment with jurisdiction-specific considerations for software companies.
    USE FOR: software patents, copyright, trademarks, trade secrets, IP ownership, IP assignment, work-for-hire, patent trolls, IP due diligence, prior art, DMCA takedowns
    DO NOT USE FOR: open-source license selection (use open-source-licensing), content moderation (use content-moderation), drafting patent applications (consult a patent attorney)
license: MIT
metadata:
  displayName: "Intellectual Property"
  author: "Tyler-R-Kendrick"
compatibility: claude, copilot, cursor
references:
  - title: "World Intellectual Property Organization (WIPO)"
    url: "https://www.wipo.int"
  - title: "United States Patent and Trademark Office (USPTO)"
    url: "https://www.uspto.gov"
  - title: "U.S. Copyright Office"
    url: "https://www.copyright.gov"
---

# Intellectual Property

> **Disclaimer**: This skill provides general educational information about legal topics relevant to software development. It is **not legal advice**. Laws vary by jurisdiction and change frequently. Always consult a qualified attorney licensed in the relevant jurisdiction before making legal decisions for your organization.

## Overview

Software IP spans four major categories -- patents, copyrights, trademarks, and trade secrets. Understanding which protections apply (and where) is critical for both protecting your own work and avoiding infringement of others'. Each category offers different scope, duration, and enforcement mechanisms, and the rules vary significantly across jurisdictions. A comprehensive IP strategy typically leverages multiple forms of protection in combination.

## IP Types Comparison

| Type | What It Protects | Duration | Registration Required | Software Example |
|---|---|---|---|---|
| **Patents** | Inventions and processes | 20 years from filing | Yes | Novel algorithms, methods, system architectures |
| **Copyright** | Expression of ideas in code | Life + 70 years (individual) or 95 years (work for hire) | Automatic, but registration strengthens enforcement | Source code, documentation, UI designs |
| **Trademarks** | Brand identifiers | Indefinite, if renewed and used | Recommended (common-law rights exist in some jurisdictions) | Product names, logos, distinctive UI elements |
| **Trade Secrets** | Confidential business information | Indefinite, as long as secrecy is maintained | No | Proprietary algorithms, customer data, pricing models |

## Software Patents

Software patentability varies significantly by jurisdiction. Understanding these differences is essential when building a global patent strategy.

### Jurisdictional Differences

| Jurisdiction | Software Patentable? | Key Constraints |
|---|---|---|
| **United States** | Yes, with limits | Must be more than an "abstract idea" under the *Alice Corp. v. CLS Bank* framework; must demonstrate a concrete, technical improvement |
| **EU (EPO)** | Limited | Must have a "technical effect" beyond merely running on a computer; pure business methods and algorithms are excluded |
| **China** | Yes, broadly | Utility model patents are also available for software-related inventions, offering faster and cheaper protection |
| **Japan** | Yes | Must involve "technical ideas utilizing laws of nature"; software inventions are patentable when tied to hardware or concrete processes |
| **India** | No, for software "per se" | Must demonstrate a "technical effect" or technical contribution beyond the program itself to be patentable |

### Patent Trolls and Defensive Strategies

Patent assertion entities (often called "patent trolls") acquire patents primarily to extract licensing fees through litigation rather than to commercialize technology. Software companies should consider:

- **Defensive patent portfolios** — Filing patents not to assert offensively but to create a deterrent against infringement claims from competitors and trolls.
- **Defensive patent pledges** — Publicly committing not to assert patents offensively (e.g., the Open Invention Network, Google's Open Patent Non-Assertion Pledge).
- **Prior art documentation** — Publishing detailed technical disclosures to establish prior art, which can be used to invalidate overly broad patent claims by others.
- **Patent insurance** — Specialized insurance products that cover the cost of defending against patent infringement claims.
- **Inter partes review (IPR)** — A US Patent and Trademark Office proceeding to challenge the validity of a granted patent, often more efficient than federal court litigation.

## Copyright in Software

### What Copyright Protects

Copyright protection applies automatically to original works of authorship fixed in a tangible medium. In the software context, this includes:

- **Source code** — The human-readable code as written by developers.
- **Object code** — Compiled or machine-readable versions of the software.
- **Documentation** — User manuals, API documentation, technical specifications.
- **UI elements** — The specific creative expression in user interface designs (layout, graphics, icons), though functional elements receive limited protection.
- **Database structure** — The creative selection and arrangement of data in a database (though not the underlying facts themselves).

### What Copyright Does Not Protect

- **Ideas, concepts, or methods** — Copyright protects expression, not the underlying idea.
- **Algorithms** — Mathematical formulas and algorithms themselves are not copyrightable (though their specific code implementation is).
- **Functional elements** — Features dictated by function rather than creative choice receive limited or no protection.
- **Facts and data** — Raw data and factual information are not copyrightable, though their creative arrangement may be.

### Work-for-Hire Doctrine

In the United States, works created by employees within the scope of their employment are automatically owned by the employer under the work-for-hire doctrine. However, this doctrine does **not** automatically apply to independent contractors. For contractor-created works to qualify as work-for-hire, the work must fall into one of nine enumerated categories **and** be subject to a written agreement. Otherwise, the contractor retains copyright, making written IP assignment agreements essential.

### Assignment Agreements for Contractors

Because the work-for-hire doctrine is unreliable for contractor relationships, best practice is to require all contractors to sign a written IP assignment agreement that explicitly transfers all IP rights in their work product to the commissioning company. This assignment should cover all forms of IP (copyright, patent, trade secret) and all jurisdictions.

## Trademarks

### Registering Product Names

Trademark registration provides nationwide (or region-wide) exclusive rights to use a mark in connection with specified goods or services. Before launching a product name:

- **Conduct a comprehensive trademark search** across relevant jurisdictions and trademark classes.
- **File trademark applications** in every jurisdiction where you plan to operate or sell.
- **Monitor trademark databases** for conflicting applications that could dilute or infringe your marks.

### Trademark Classes for Software

Software products typically require registration in one or more of the following Nice Classification classes:

- **Class 9** — Downloadable software, mobile apps, SaaS-related goods.
- **Class 35** — Business management software services, data analytics services.
- **Class 42** — SaaS, cloud computing, software development services, IT consulting.

### Domain Name Disputes

When a third party registers a domain name that is identical or confusingly similar to your trademark, the **Uniform Domain-Name Dispute-Resolution Policy (UDRP)** provides a streamlined arbitration process through WIPO or other approved dispute resolution providers. UDRP proceedings are typically faster and less expensive than litigation.

### Trademark Monitoring

Ongoing trademark monitoring is essential to maintaining the strength and enforceability of your marks. This includes:

- Watching trademark office filings for conflicting applications.
- Monitoring domain name registrations for cybersquatting.
- Scanning app stores and marketplaces for infringing product names.
- Tracking common-law use of similar marks in your industry.

## Trade Secrets

### What Qualifies as a Trade Secret

Information qualifies as a trade secret when it: (1) derives economic value from not being generally known, and (2) is subject to reasonable measures to maintain its secrecy. In the software industry, trade secrets commonly include:

- Proprietary algorithms and business logic
- Customer lists and usage data
- Pricing models and financial projections
- System architecture and infrastructure details
- Training data and model weights for AI/ML systems

### Reasonable Measures to Protect Trade Secrets

Courts evaluate whether a company took "reasonable measures" to maintain secrecy. Essential protective measures include:

- **Non-disclosure agreements (NDAs)** — Require NDAs from employees, contractors, partners, and any third parties with access to confidential information.
- **Access controls** — Implement role-based access controls, encryption, and audit logging to restrict and monitor access to sensitive information.
- **Employee and contractor agreements** — Include confidentiality obligations, invention assignment clauses, and (where enforceable) non-compete provisions.
- **Physical and digital security** — Secure facilities, endpoint protection, network segmentation, and data loss prevention tools.
- **Labeling and classification** — Mark confidential documents and code repositories clearly to put recipients on notice of their confidential status.

### Key Trade Secret Legislation

- **Defend Trade Secrets Act (DTSA)** (United States, 2016) — Creates a federal civil cause of action for trade secret misappropriation, allowing companies to sue in federal court and, in extraordinary circumstances, obtain ex parte seizure orders.
- **EU Trade Secrets Directive** (2016/943) — Harmonizes trade secret protection across EU member states, defining unlawful acquisition, use, and disclosure of trade secrets, and providing for injunctive relief and damages.

## IP Assignment

### Importance of Clear IP Assignment

Ambiguity in IP ownership can derail acquisitions, funding rounds, and partnerships. Clear IP assignment in employment contracts and contractor agreements ensures that the company owns all IP created in connection with its business.

### Employment Contracts

Most jurisdictions allow employers to require IP assignment as a condition of employment. However, some jurisdictions impose limits:

- **United States** — Many states (e.g., California, Illinois, Washington, Minnesota) prohibit employers from claiming IP created entirely on the employee's own time with their own resources, unrelated to the employer's business.
- **Germany** — Employees retain initial copyright in their works; however, employers are entitled to an exclusive license by operation of law for works created within the scope of employment.
- **India** — Work created by an employee in the course of employment belongs to the employer by default under the Copyright Act.
- **Japan** — Employers can claim patent rights for employee inventions made in the scope of employment, but employees are entitled to "reasonable compensation."

### Contractor Agreements

The work-for-hire doctrine applies differently (or not at all) to contractors depending on the jurisdiction. Best practices:

- Always use a written agreement that includes explicit IP assignment.
- Cover all forms of IP: patents, copyrights, trade secrets, and moral rights waivers where permitted.
- Include representations that the work is original and does not infringe third-party rights.
- Address pre-existing IP and open-source components that the contractor may incorporate.

## Best Practices

- **Always consult qualified IP counsel.** Intellectual property law is highly specialized and jurisdiction-dependent. A qualified IP attorney can help you build a protection strategy, conduct freedom-to-operate analyses, and respond to infringement claims.
- **Conduct an IP audit regularly.** Identify all IP assets your company owns or uses, verify ownership documentation, and assess the strength of your protections.
- **Require written IP assignment from all contributors.** Ensure that every employee and contractor has signed an agreement that clearly assigns all work-product IP to the company.
- **Register key trademarks and consider patent filings early.** The cost of registration is far less than the cost of enforcement disputes that arise from failing to secure your rights.
- **Document your development process.** Maintain records of when features were conceived and developed, who contributed, and what prior art was considered. This documentation is critical for patent prosecution and defense.
- **Implement a trade secret protection program.** Classify confidential information, restrict access, require NDAs, and train employees on their confidentiality obligations.
- **Monitor for infringement proactively.** Use automated tools and periodic manual reviews to detect unauthorized use of your patents, copyrights, trademarks, and trade secrets.
- **Develop a clear policy for handling third-party IP.** Establish processes for evaluating third-party licenses, responding to DMCA takedown notices, and conducting IP due diligence for acquisitions and partnerships.
