# Legal & Compliance

Use when identifying legal, regulatory, and compliance considerations that affect software companies operating globally. Covers data privacy, intellectual property, open-source licensing, AI regulation, accessibility, export controls, financial regulation, healthcare, cybersecurity compliance, and more.

## Structure

| File | Purpose |
|------|---------|
| `SKILL.md` | Agent skill definition (frontmatter + instructions) |
| `metadata.json` | Machine-readable metadata and versioning |
| `AGENTS.md` | Agent-optimized quick reference (generated) |
| `README.md` | This file |
| `rules/` | 8 individual best practice rules |

## Sub-skills

| Skill | Description |
|-------|-------------|
| [`accessibility/`](accessibility/) | Use when identifying digital accessibility laws and standards that apply to software products. Covers ADA, Section 508, ... |
| [`ai-regulation/`](ai-regulation/) | Use when identifying AI-specific regulations and compliance requirements that apply to AI/ML-powered software products. ... |
| [`attribution/`](attribution/) | Use when identifying attribution requirements that apply to software products — open-source license notices, third-party... |
| [`billing-taxation/`](billing-taxation/) | Use when identifying tax, billing, and revenue recognition obligations for software products sold globally. Covers servi... |
| [`consumer-protection/`](consumer-protection/) | Use when identifying consumer protection laws that apply to software products and digital services. Covers terms of serv... |
| [`content-moderation/`](content-moderation/) | Use when identifying legal obligations for platforms hosting user-generated content. Covers intermediary liability (Sect... |
| [`contracts/`](contracts/) | Use when identifying contractual considerations for software companies — SLAs, DPAs, MSAs, licensing agreements, and lia... |
| [`cybersecurity-compliance/`](cybersecurity-compliance/) | Use when identifying cybersecurity-specific regulations and incident reporting obligations. Covers NIS2, DORA, SEC cyber... |
| [`employment-labor/`](employment-labor/) | Use when identifying employment and labor law considerations for software companies, especially those with distributed o... |
| [`export-controls/`](export-controls/) | Use when identifying export control and sanctions laws that affect software distribution and encryption. Covers US EAR a... |
| [`financial-regulation/`](financial-regulation/) | Use when identifying financial regulations that apply to software handling payments, banking, or financial data. Covers ... |
| [`healthcare/`](healthcare/) | Use when identifying healthcare regulations that apply to software handling health data or functioning as a medical devi... |
| [`intellectual-property/`](intellectual-property/) | Use when identifying intellectual property considerations for software products. Covers patents, copyrights, trademarks,... |
| [`open-source-licensing/`](open-source-licensing/) | Use when selecting, using, or distributing open-source software and understanding license obligations. Covers permissive... |
| [`privacy-data-protection/`](privacy-data-protection/) | Use when identifying data privacy and protection laws that apply to your software product. Covers GDPR, CCPA/CPRA, LGPD,... |

## Usage

```bash
npx agentskills add Tyler-R-Kendrick/agent-skills/skills/legal
```

## License

MIT
