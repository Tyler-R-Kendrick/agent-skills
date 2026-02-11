# Accessibility

> **Disclaimer**: This skill provides general educational information about legal topics relevant to software development. It is **not legal advice**. Laws vary by jurisdiction and change frequently. Always consult a qualified attorney licensed in the relevant jurisdiction before making legal decisions for your organization.

## Overview

Digital accessibility is both a legal requirement and a civil rights issue. Lawsuits over inaccessible websites and apps have surged globally, and new legislation is expanding obligations to more products and services. Organizations that fail to meet accessibility standards face not only legal liability but also exclusion of millions of potential users with disabilities. Understanding the legal landscape is the first step toward building inclusive products that comply with applicable laws.

## Global Accessibility Law Landscape

| Law | Jurisdiction | Scope | Standard | Enforcement |
|---|---|---|---|---|
| **ADA Title III** | United States | Public accommodations, including websites and mobile apps | WCAG 2.1 AA (de facto standard per DOJ guidance and case law) | Private lawsuits and DOJ enforcement actions |
| **Section 508** | United States | Federal agencies and their contractors | WCAG 2.0 AA / EN 301 549 (as incorporated by the Revised 508 Standards) | Agency enforcement, procurement requirements |
| **European Accessibility Act (EAA)** | European Union | Products and services placed on the EU market from June 2025 | EN 301 549 / WCAG 2.1 AA | Member state enforcement bodies |
| **Equality Act 2010** | United Kingdom | Service providers, including digital services | WCAG 2.1 AA (recommended by EHRC) | Equality and Human Rights Commission |
| **AODA (Accessibility for Ontarians with Disabilities Act)** | Ontario, Canada | Public, private, and non-profit organizations in Ontario | WCAG 2.0 AA | Administrative penalties |
| **DDA (Disability Discrimination Act 1992)** | Australia | Service providers, including digital services | WCAG 2.1 AA (recommended) | Complaints to the Australian Human Rights Commission (AHRC) |
| **JIS X 8341-3** | Japan | Government websites and large enterprises | Based on WCAG 2.1 | Voluntary for private sector; mandated for government |

## WCAG Conformance Levels

| Level | Description | Requirement |
|---|---|---|
| **A** | Minimum level of accessibility | Addresses the most basic accessibility barriers. Without Level A conformance, some users will find it impossible to use the content. |
| **AA** | Standard level of accessibility | The legal baseline in most jurisdictions. This is what most accessibility laws require. Addresses the most common and significant barriers for users with disabilities. |
| **AAA** | Enhanced level of accessibility | Not typically required by law, but aspirational. Provides the highest level of accessibility. Some AAA criteria are not achievable for all content types. |

## Litigation Trends

Digital accessibility litigation has grown significantly and shows no signs of slowing:

- **US ADA lawsuits** — Over 10,000 digital accessibility lawsuits are filed annually in the United States under ADA Title III. Federal courts have consistently held that websites and mobile apps of businesses that qualify as public accommodations must be accessible.
- **EU EAA deadline** — The European Accessibility Act becomes enforceable in **June 2025**, creating new obligations for a wide range of products and services sold in the EU market. Companies that have not prepared face enforcement actions by national authorities.
- **Overlay tools are not considered compliance solutions** — Courts and regulators have rejected accessibility overlay widgets as insufficient for ADA compliance. The DOJ has stated that overlays do not make websites fully accessible, and several lawsuits have been filed against companies relying solely on overlays.
- **Serial plaintiff risk** — A significant portion of US accessibility lawsuits are filed by a small number of plaintiffs and law firms who systematically target non-compliant websites. While these lawsuits are legitimate, the pattern means any publicly accessible website may be targeted.
- **Expanding scope** — Litigation is expanding beyond websites to mobile apps, kiosks, PDFs, and digital documents. Video accessibility (captions and audio descriptions) is also an increasing area of enforcement.

## Compliance Documentation

Maintaining proper documentation demonstrates your commitment to accessibility and can be critical during legal proceedings:

- **VPAT (Voluntary Product Accessibility Template) / ACR (Accessibility Conformance Report)** — A VPAT is a standardized template (maintained by the IT Industry Council) used to document a product's conformance with accessibility standards. Once completed, it becomes an ACR. Government agencies and enterprise buyers frequently require ACRs during procurement.
- **Accessibility statements** — A public-facing document on your website or product that describes your accessibility commitment, the standards you conform to, known limitations, and how users can request accommodations or report barriers. Required by the EAA and recommended under most other laws.
- **Remediation plans** — When gaps are identified, a documented remediation plan with specific timelines demonstrates good faith and can mitigate legal risk. Courts and regulators look favorably on organizations that have identified issues and are actively working to resolve them.

## Products and Services Covered by EAA

The European Accessibility Act applies to a broad range of products and services placed on the EU market after June 2025:

- **Computers and operating systems** — Desktops, laptops, tablets, and their operating systems
- **Smartphones and mobile devices** — Hardware and embedded software
- **Self-service terminals** — Ticketing machines, check-in kiosks, ATMs, payment terminals
- **Banking services** — Online banking, ATMs, banking apps
- **E-commerce** — Online shopping platforms and marketplaces
- **E-books and dedicated reading software** — E-book readers and e-book distribution platforms
- **Audio-visual media services** — Streaming platforms and video-on-demand services
- **Telecommunications** — Phone services, messaging apps, and related equipment
- **Transport services** — Websites, mobile apps, ticketing, and real-time travel information for air, bus, rail, and waterborne transport

## Best Practices

- **Always consult qualified legal counsel, especially regarding ADA litigation.** Accessibility law varies by jurisdiction and is actively evolving through case law. An attorney can assess your specific litigation risk and advise on defensible compliance strategies.
- **Target WCAG 2.1 AA as your minimum standard.** This level satisfies the legal requirements of most jurisdictions and addresses the most significant barriers for users with disabilities. Plan a roadmap to WCAG 2.2 AA as regulations update.
- **Integrate accessibility testing into your development lifecycle.** Automated testing catches approximately 30-40% of WCAG issues. Combine automated scans with manual testing and assistive technology testing (screen readers, keyboard navigation, voice control) for comprehensive coverage.
- **Maintain an up-to-date VPAT/ACR for your product.** Enterprise and government buyers require these documents. Update your ACR with each major release and be transparent about known issues and remediation timelines.
- **Publish an accessibility statement on your website.** Include the standard you conform to, known limitations, contact information for accessibility feedback, and your remediation timeline. This is required by the EAA and demonstrates good faith under other laws.
- **Do not rely on accessibility overlays as your compliance strategy.** Overlay widgets do not achieve conformance with WCAG and have been rejected by courts, regulators, and the disability community. Invest in building natively accessible products instead.
- **Train your development and design teams on accessibility fundamentals.** Accessibility is most cost-effective when built in from the start. Retrofitting inaccessible products is significantly more expensive and legally risky.
- **Monitor the regulatory landscape and prepare for the EAA.** If you sell products or services in the EU market, the June 2025 deadline requires immediate action. Conduct a gap analysis against EN 301 549 and develop a remediation plan for any non-conformances.
