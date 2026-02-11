---
name: billing-taxation
description: |
    Use when identifying tax, billing, and revenue recognition obligations for software products sold globally. Covers service type classification and billing codes, VAT/GST/sales tax, invoicing requirements, revenue recognition (ASC 606/IFRS 15), cloud credits and stored-value models, and money transmission risks for prepaid systems.
    USE FOR: sales tax, VAT, GST, billing codes, service classification, invoicing requirements, revenue recognition, ASC 606, IFRS 15, cloud credits, stored value, prepaid credits, tax nexus, digital services tax, e-invoicing, withholding tax, transfer pricing
    DO NOT USE FOR: payment processing compliance (use financial-regulation), consumer refund policies (use consumer-protection), contract pricing terms (use contracts), tax return preparation (consult a tax advisor)
license: MIT
metadata:
  displayName: "Billing & Taxation"
  author: "Tyler-R-Kendrick"
compatibility: claude, copilot, cursor
references:
  - title: "OECD International VAT/GST Guidelines"
    url: "https://www.oecd.org/tax/consumption/international-vat-gst-guidelines.htm"
  - title: "IFRS 15 Revenue from Contracts with Customers"
    url: "https://www.ifrs.org/issued-standards/list-of-standards/ifrs-15-revenue-from-contracts-with-customers/"
  - title: "FASB ASC 606 Revenue Recognition"
    url: "https://asc.fasb.org/606"
---

# Billing & Taxation

> **Disclaimer**: This skill provides general educational information about legal topics relevant to software development. It is **not legal advice** and is **not tax advice**. Tax laws are complex, vary by jurisdiction, and change frequently. Always consult a qualified tax advisor and legal counsel licensed in the relevant jurisdiction before making tax or billing decisions for your organization.

## Overview

Every software company that charges customers faces a web of tax and billing obligations that vary by what you sell, how you sell it, who you sell it to, and where both parties are located. Misclassifying your service type, failing to collect applicable taxes, or improperly recognizing revenue can result in back-tax liabilities, penalties, and audit exposure. Additionally, billing models that use "credits," "tokens," or "units" instead of currency can inadvertently trigger money transmission, stored-value, or consumer protection regulations.

## Service Type Classification

How your product is classified determines which tax rates, billing codes, and regulations apply. The same software can be classified differently depending on the jurisdiction and delivery method.

### Classification Categories

| Classification | Description | Tax Treatment (General) | Examples |
|---------------|-------------|------------------------|----------|
| **SaaS** | Software accessed via internet, no download | Taxable in many US states + most countries (digital service) | Salesforce, Slack, GitHub |
| **Licensed software (download)** | Software delivered electronically for local installation | Taxable as tangible personal property in some states; digital good in others | Adobe Creative Suite (perpetual), desktop apps |
| **Professional services** | Consulting, implementation, custom development | Often exempt or lower rate than software | Integration services, custom dev, training |
| **Information services** | Data feeds, research, analytics | Varies widely — exempt in some states, taxable in others | Bloomberg terminal, market data feeds |
| **Infrastructure / IaaS** | Compute, storage, networking resources | Emerging rules — taxable as digital service in many jurisdictions | AWS EC2, Azure VMs, GCP Compute |
| **Platform / PaaS** | Development platforms and tools | Similar to IaaS — taxable as digital service | Heroku, Vercel, Azure App Service |
| **Digital goods** | E-books, media, downloadable content | Taxable in most jurisdictions | App Store purchases, digital media |
| **Telecommunications** | Voice, messaging, video conferencing | Heavily taxed with industry-specific surcharges | Twilio, Zoom (voice/telephony components) |

### US State-by-State Complexity

US sales tax on software varies dramatically by state:

| State Approach | Example States | SaaS Taxable? | Custom Software? |
|---------------|---------------|---------------|-----------------|
| **SaaS is taxable** | TX, NY, PA, CT, OH, WA | Yes | Often yes |
| **SaaS is not taxable** | CA, CO, FL, IL, MO, VA | No (currently) | Varies |
| **SaaS taxability depends on factors** | GA, IN, UT | Depends on customization, access method | Varies |

> **This landscape changes annually.** States are increasingly moving to tax SaaS. Always verify current rules with a tax advisor.

### Billing Codes and Tax Codes

Proper billing line items are critical for tax compliance and audit defense. Each line item should map to a tax classification:

| Line Item Category | Common Tax Code/Category | Why It Matters |
|-------------------|------------------------|----------------|
| **Software subscription** | SaaS / Electronic services / Digital service | Determines VAT/sales tax rate |
| **Implementation / setup** | Professional services / Consulting | Often a different (or zero) tax rate |
| **Support / maintenance** | Maintenance agreement / Service | May be taxed differently than the subscription |
| **Training** | Educational services | Exempt in many jurisdictions |
| **Data storage** | IaaS / Cloud computing | Emerging tax classification |
| **API usage / compute** | IaaS or Telecommunications | May trigger telecom-specific taxes |
| **Hardware** | Tangible personal property | Standard sales tax applies |
| **Managed services** | Professional services or SaaS | Classification depends on what predominates |

### Bundled vs Unbundled Invoicing

| Approach | Description | Tax Impact |
|----------|-------------|-----------|
| **Bundled** | Single line item "Platform Fee: $10,000" | Taxed at the rate of the predominant component (or the highest applicable rate in some jurisdictions) |
| **Unbundled** | Separate lines: "Subscription: $7,000" + "Implementation: $2,000" + "Training: $1,000" | Each line taxed at its own rate — can reduce total tax |

> **Best practice**: Unbundle invoices wherever possible. Bundling can cause the entire invoice to be taxed at the highest applicable rate. Work with your tax advisor to determine the correct unbundling for each jurisdiction.

## VAT / GST / Sales Tax

### Global Tax Obligations

| Tax Type | Jurisdictions | Registration Trigger | Rate Range | Key Requirements |
|----------|--------------|---------------------|------------|-----------------|
| **VAT** | EU (27 countries), UK, Norway, Switzerland | Selling to customers in the jurisdiction (no minimum threshold for B2C digital in EU) | 17-27% (varies by country) | VAT registration, periodic returns, reverse charge for B2B |
| **GST** | Australia, New Zealand, Canada, India, Singapore, Malaysia | Revenue thresholds vary by country | 5-18% (varies) | GST registration, BAS/returns, input tax credits |
| **Sales tax** | US (45 states + DC + territories) | Economic nexus thresholds (typically $100K revenue or 200 transactions) | 0-10.25% (state + local) | Nexus analysis, registration, collection, remittance, returns |
| **Digital services tax (DST)** | France, UK, Italy, Spain, Turkey, India, others | Revenue thresholds (typically €750M global + local threshold) | 1.5-7.5% | Separate from VAT; applies to large digital companies |
| **Withholding tax** | Many countries (India, Brazil, etc.) | Cross-border service payments | 10-30% | Deducted at source by customer; may be reduced by tax treaty |

### EU VAT for Digital Services (B2C)

The EU One-Stop Shop (OSS) simplifies VAT for digital services sold to EU consumers:

| Element | Requirement |
|---------|-------------|
| **Registration** | Register in one EU member state via OSS; covers all 27 countries |
| **Rate** | Apply the VAT rate of the customer's country (not seller's) |
| **Evidence of location** | Two pieces of non-contradictory evidence (IP address, billing address, bank country, SIM country) |
| **Returns** | Quarterly OSS return covering all EU sales |
| **B2B reverse charge** | If customer provides valid VAT ID, no VAT charged (customer self-assesses) |
| **Threshold** | No minimum — applies from the first euro of B2C digital sales |

### Tax Automation Tools

| Tool | Capability | Best For |
|------|-----------|----------|
| **Stripe Tax** | Automated tax calculation, collection, and reporting | Companies already using Stripe |
| **Avalara** | Multi-jurisdiction tax compliance (sales tax, VAT, GST) | Enterprise, complex nexus |
| **TaxJar** | US sales tax automation (now part of Stripe) | US-focused SaaS companies |
| **Vertex** | Enterprise tax technology (direct + indirect) | Large enterprise, ERP integration |
| **Paddle / FastSpring** | Merchant of Record (handles all tax obligations for you) | Smaller companies wanting to offload tax entirely |
| **Chargebee** | Subscription billing with tax integration | Subscription-first businesses |

## Invoicing Requirements

Many jurisdictions have specific legal requirements for invoice content:

### Mandatory Invoice Elements (Most Jurisdictions)

| Element | Required By | Notes |
|---------|-----------|-------|
| **Seller name and address** | Virtually all | Legal entity name, not just trade name |
| **Buyer name and address** | EU, most countries | For B2B; B2C may require less |
| **Tax ID / VAT number** | EU, UK, India, Brazil, many others | Both seller and buyer (B2B) |
| **Invoice number** | Virtually all | Sequential, unique, tamper-evident |
| **Invoice date** | Virtually all | Date of issue |
| **Supply date** | EU, UK, many countries | Date the service was provided (if different from invoice date) |
| **Line item description** | Virtually all | Clear description of each service/product |
| **Tax rate and amount per line** | EU, UK, many countries | Separate tax line per rate |
| **Total amount** | Virtually all | Net + tax + gross |
| **Currency** | Virtually all | Must be clear; some jurisdictions require local currency equivalent |
| **Payment terms** | Commercial best practice | Due date, accepted payment methods |

### E-Invoicing Mandates

Electronic invoicing is becoming mandatory in many jurisdictions:

| Jurisdiction | Mandate | Format | Status |
|-------------|---------|--------|--------|
| **Italy** | B2B and B2G e-invoicing mandatory | FatturaPA (XML) via SDI | In force since 2019 |
| **India** | E-invoicing mandatory above ₹5 crore turnover | JSON via IRP | In force, thresholds lowering |
| **Brazil** | NF-e mandatory for all businesses | XML via SEFAZ | In force |
| **EU (ViDA)** | VAT in the Digital Age — EU-wide e-invoicing | EN 16931 (structured XML) | Proposed; phased from 2028 |
| **France** | B2B e-invoicing mandate | Factur-X / EN 16931 | Phased from September 2026 |
| **Germany** | B2B e-invoicing mandate | EN 16931 / XRechnung | In force for B2G; B2B from 2025 |
| **Saudi Arabia** | ZATCA e-invoicing (Fatoorah) | XML/JSON via ZATCA platform | In force |
| **Poland** | KSeF mandatory e-invoicing | Structured XML | Phased from 2026 |

## Revenue Recognition (ASC 606 / IFRS 15)

Software companies must recognize revenue according to accounting standards, not just when cash is received.

### Five-Step Model

| Step | Description | Software Example |
|------|-------------|-----------------|
| 1. **Identify the contract** | Agreement with enforceable rights and obligations | SaaS subscription agreement, SOW |
| 2. **Identify performance obligations** | Distinct promises to the customer | Software access, implementation, support, training |
| 3. **Determine transaction price** | Total consideration expected | $120,000/year subscription + $30,000 implementation |
| 4. **Allocate to performance obligations** | Allocate price based on standalone selling prices | $120K to subscription, $30K to implementation |
| 5. **Recognize when obligation is satisfied** | Over time or at a point in time | Subscription: ratably over term; Implementation: on completion or milestone |

### Common Software Revenue Scenarios

| Scenario | Recognition Pattern | Key Consideration |
|----------|-------------------|-------------------|
| **Monthly SaaS subscription** | Ratably each month | Straightforward — recognize as service is delivered |
| **Annual prepaid subscription** | Ratably over 12 months | Cash received upfront; revenue recognized monthly |
| **Multi-year deal with discount** | Ratably over full term at effective rate | Discount allocated across all periods |
| **Implementation + subscription** | Implementation: on completion; Subscription: ratably | Must determine if implementation is distinct |
| **Usage-based pricing** | As usage occurs | Estimate variable consideration if minimum commitments exist |
| **Perpetual license + maintenance** | License: upfront; Maintenance: ratably | Must allocate transaction price between components |
| **Free trial → paid conversion** | Revenue starts at conversion | No revenue during trial period |
| **Credits / prepaid usage** | As credits are consumed (or expire) | See Cloud Credits section below |

## Cloud Credits and Prepaid Models

Cloud credits, tokens, units, and prepaid balances are common in compute, hosting, and API billing. These models create several legal and regulatory risks that traditional subscription billing does not.

### Common Credit Models

| Model | How It Works | Examples |
|-------|-------------|----------|
| **Prepaid usage credits** | Customer buys credits; credits consumed by resource usage | AWS credits, Azure credits, GCP credits, Vercel credits |
| **Token-based API billing** | Customer buys tokens; each API call consumes tokens | OpenAI tokens, Anthropic tokens |
| **Unit-based billing** | Customer buys units (abstraction over compute) | Salesforce compute credits, Snowflake credits |
| **Platform credits (non-monetary)** | Credits earned through promotions, loyalty, or incentives | Startup program credits, promotional credits |
| **Gift cards / vouchers** | Redeemable for services at face value | Digital gift cards for platform services |

### Legal and Regulatory Risks

#### Money Transmission

| Risk | Description | Trigger |
|------|-------------|---------|
| **Stored value** | If credits can be purchased, held, and redeemed for services, they may be classified as "stored value" under state money transmitter laws | Credits purchasable with money and redeemable for services |
| **Money transmission** | If credits can be transferred between users or redeemed for cash, you may be operating as a money transmitter | Transferability or cash-out capability |
| **E-money** | Under EU PSD2/EMD2, if credits function like electronic money, you may need an e-money license | Credits redeemable at par value for services or cash |

**Key question**: Can a customer transfer credits to another party, or convert credits back to cash? If yes, money transmission/e-money analysis is required.

| Feature | Low Risk | High Risk |
|---------|----------|-----------|
| Purchased with currency | Moderate | — |
| Non-transferable between users | Low | — |
| Non-refundable / no cash-out | Low | — |
| Transferable between users | — | Money transmission risk |
| Redeemable for cash | — | Strong money transmission indicator |
| Expire after a period | Reduces risk | — |
| Earn interest | — | May trigger banking/investment regulation |

#### Consumer Protection

| Concern | Requirement | Jurisdictions |
|---------|-------------|---------------|
| **Expiration disclosure** | Must clearly disclose if/when credits expire at time of purchase | US (state gift card laws), EU (Unfair Terms Directive), UK, Australia |
| **Gift card laws (if applicable)** | Many US states prohibit expiration of gift cards or require minimum 5-year validity; residual value laws may apply | US (CARD Act for gift cards, state laws vary), EU, Australia |
| **Refund rights** | Some jurisdictions require refund of unused prepaid balances on account termination | EU (Consumer Rights Directive), California, Australia |
| **Balance disclosure** | Customer must be able to check credit balance | US (state laws), EU, Australia |
| **Dormancy fees** | Restrictions on charging fees on dormant/unused credits | US (many states prohibit), EU |
| **Currency vs credit value** | If credits are denominated in currency equivalents, stronger consumer protections apply | Most jurisdictions |

#### Revenue Recognition

| Credit Scenario | Revenue Treatment | Breakage |
|----------------|-------------------|----------|
| **Credits consumed** | Recognize as credits are used (ASC 606 step 5) | N/A |
| **Credits expire unused** | Recognize breakage revenue proportionally or at expiration | Must estimate expected breakage based on historical data |
| **Unused credits, no expiration** | May need to estimate breakage; cannot recognize until consumed or forfeited | Analyze historical consumption patterns |
| **Promotional/free credits** | Generally no revenue (contra-revenue or marketing expense) | No breakage revenue |
| **Refundable credits** | Defer until consumed; refund liability until then | Refund liability reduces recognized revenue |

#### Tax Treatment

| Scenario | Tax Implications |
|----------|-----------------|
| **Credit purchase** | Generally NOT a taxable event (no service yet delivered). Tax due when credits are consumed. |
| **Credit consumption** | Taxable event — the service is being delivered. Apply tax based on service classification and customer location. |
| **Cross-border credits** | Customer buys credits in one jurisdiction, consumes in another — tax may apply where consumption occurs |
| **Expiration / breakage** | Some jurisdictions tax breakage as income; consumer protection laws may limit breakage |
| **Promotional credits** | Generally not taxable (no consideration received) |

### Structuring Credits to Minimize Regulatory Risk

| Design Decision | Lower Risk Choice | Why |
|----------------|-------------------|-----|
| **Transferability** | Non-transferable (tied to purchasing account) | Avoids money transmission classification |
| **Refundability** | Non-refundable (with clear disclosure) | Avoids stored-value / e-money classification; but check consumer protection law by jurisdiction |
| **Expiration** | Include reasonable expiration (12+ months with disclosure) | Reduces balance sheet liability; enables breakage recognition |
| **Denomination** | Denominate in abstract units, not currency | Reduces argument that credits are "money equivalents" |
| **Cash-out** | No cash-out option | Critical for avoiding money transmission |
| **Interest** | Credits do not earn interest | Avoids banking/investment regulation |
| **Promotional credits** | Separate bucket from purchased credits | Different revenue and tax treatment |
| **Minimum purchase** | No minimum (or low minimum) | Avoids appearance of investment product |

## Withholding Tax on Cross-Border Payments

| Concern | Description |
|---------|-------------|
| **What it is** | When a customer in Country A pays a vendor in Country B, Country A may require the customer to withhold a percentage and remit it to their tax authority |
| **Common rates** | 10-30% depending on countries involved |
| **Mitigation** | Tax treaties between countries can reduce or eliminate withholding; require customers to provide tax treaty certificates |
| **Gross-up clauses** | Contracts should specify whether payments are net of withholding tax or whether the customer must gross up |
| **Classification matters** | "Royalty" payments (software licenses) often have higher withholding rates than "service" payments (SaaS) in many jurisdictions |

## Transfer Pricing

If your company has entities in multiple countries, inter-company transactions must be priced at arm's length (as if between unrelated parties). This affects:

- Licensing IP from a parent to a subsidiary
- Charging for shared services (engineering, support)
- Allocating costs of cloud infrastructure
- Cost-sharing arrangements for R&D

> **Transfer pricing audits** are a top priority for tax authorities globally. Documentation (typically a transfer pricing study) is mandatory in most jurisdictions above certain revenue thresholds.

## Best Practices

- **Always consult a qualified tax advisor** for each jurisdiction in which you sell — tax classification of software varies dramatically.
- **Unbundle invoices** by service type — separate software, professional services, training, and support to apply correct tax treatment to each.
- **Automate tax calculation and collection** using tools like Stripe Tax, Avalara, or a Merchant of Record — manual processes do not scale.
- **Classify credits carefully** — design prepaid/credit systems to minimize money transmission, stored-value, and e-money regulatory risk by making credits non-transferable, non-refundable, and denominated in abstract units rather than currency.
- **Disclose credit terms clearly** at the point of purchase — expiration dates, refund policies, and balance access are required by consumer protection laws in most jurisdictions.
- **Recognize revenue per ASC 606 / IFRS 15** — do not recognize credit purchases as revenue; recognize when credits are consumed or expire (breakage).
- **Monitor nexus and registration thresholds** — US economic nexus rules, EU VAT OSS, and expanding DST regimes create new obligations as your business grows.
- **Prepare for e-invoicing mandates** — Italy, India, Brazil, and France already require structured electronic invoices; the EU-wide ViDA mandate is coming.
- **Address withholding tax in contracts** — specify whether payments are net or gross of withholding and include tax treaty cooperation clauses.
- **Keep billing codes consistent** between your invoicing system, tax engine, and general ledger — mismatches create audit exposure.
