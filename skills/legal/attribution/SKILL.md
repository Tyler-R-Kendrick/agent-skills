---
name: attribution
description: |
    Use when identifying attribution requirements that apply to software products — open-source license notices, third-party asset credits, API usage attribution, font licensing, media licensing, and data source attribution. Covers what must be attributed, how, and where across different asset types and jurisdictions.
    USE FOR: attribution requirements, license notices, open-source attribution, Creative Commons, font licensing, image licensing, API attribution, data attribution, NOTICE files, third-party credits, attribution in UI, attribution in documentation
    DO NOT USE FOR: choosing open-source licenses (use open-source-licensing), IP ownership disputes (use intellectual-property), content moderation obligations (use content-moderation)
license: MIT
metadata:
  displayName: "Attribution"
  author: "Tyler-R-Kendrick"
compatibility: claude, copilot, cursor
references:
  - title: "Creative Commons Licenses"
    url: "https://creativecommons.org/licenses/"
  - title: "Open Source Initiative (OSI) — License List"
    url: "https://opensource.org/licenses"
  - title: "SPDX License List"
    url: "https://spdx.org/licenses/"
---

# Attribution

> **Disclaimer**: This skill provides general educational information about legal topics relevant to software development. It is **not legal advice**. Laws vary by jurisdiction and change frequently. Always consult a qualified attorney licensed in the relevant jurisdiction before making legal decisions for your organization.

## Overview

Attribution is a legal obligation that arises from many sources — open-source licenses, Creative Commons media, font licenses, API terms of service, data provider agreements, and more. Failing to provide required attribution can constitute license violation (risking license termination and copyright infringement claims), breach of contract, or regulatory non-compliance. Many companies underestimate attribution requirements because the obligation is spread across dozens of different asset types, each with its own rules.

## Attribution by Asset Type

| Asset Type | Common Licenses/Terms | Attribution Required | Where to Attribute |
|-----------|----------------------|---------------------|-------------------|
| **Open-source libraries** | MIT, Apache 2.0, BSD, GPL, LGPL, MPL | Yes (nearly all OSS licenses) | NOTICE file, about/legal screen, documentation |
| **Fonts** | OFL (SIL Open Font License), proprietary EULA | OFL: yes; Proprietary: per EULA | Font credits page, CSS comments, documentation |
| **Images / Icons** | Creative Commons, stock photo licenses, proprietary | CC BY: yes; Stock: per license; Proprietary: per contract | Image credits, about page, metadata |
| **Audio / Video** | Creative Commons, royalty-free licenses, sync licenses | CC BY: yes; Royalty-free: per license | Credits section, end cards, metadata |
| **Datasets** | CC BY, ODC-BY, government open data licenses | CC BY/ODC-BY: yes; Some government: yes | Data source citations, documentation |
| **APIs** | Terms of service, developer agreements | Many require "powered by" branding | UI badge/logo, documentation, per ToS |
| **Maps** | Google Maps Platform, Mapbox, OpenStreetMap | Yes (all major providers) | Map overlay attribution, per ToS |
| **AI/ML models** | Model cards, Hugging Face licenses, proprietary | Varies — many require model credit | Documentation, about page, per license |

## Open-Source Attribution

Open-source attribution is the most common and most frequently violated attribution requirement in software.

### What Most OSS Licenses Require

| License | Requirements | NOTICE File | License Text | Copyright Notice |
|---------|-------------|-------------|-------------|-----------------|
| **MIT** | Include copyright notice + license text in copies | Recommended | Required | Required |
| **Apache 2.0** | Include NOTICE file + license text; state changes | Required | Required | Required |
| **BSD 2-Clause** | Include copyright notice + license text | Recommended | Required | Required |
| **BSD 3-Clause** | Same as 2-Clause + no endorsement clause | Recommended | Required | Required |
| **ISC** | Include copyright notice + license text | Recommended | Required | Required |
| **MPL 2.0** | License text in source files; larger work can be proprietary | Per-file | Required (per file) | Required |
| **LGPL 2.1/3.0** | License text + copyright + link to source for modifications | Required | Required | Required |
| **GPL 2.0/3.0** | Full license + copyright + source offer for binaries | Required | Required | Required |
| **AGPL 3.0** | Same as GPL + network interaction triggers | Required | Required | Required |

### NOTICE File Structure

The standard approach for bundling attribution in a distributable product:

```
NOTICE

This product includes software developed by third parties.

================================================================================
Library: react
Version: 18.2.0
License: MIT
Copyright (c) Meta Platforms, Inc. and affiliates.
================================================================================

================================================================================
Library: lodash
Version: 4.17.21
License: MIT
Copyright JS Foundation and other contributors
================================================================================

================================================================================
Library: express
Version: 4.18.2
License: MIT
Copyright (c) 2009-2014 TJ Holowaychuk
Copyright (c) 2013-2014 Roman Shtylman
Copyright (c) 2014-2015 Douglas Christopher Wilson
================================================================================
```

### Automation Tools

| Tool | Ecosystem | Output |
|------|-----------|--------|
| **license-checker** | npm | JSON/CSV/Markdown of all dependency licenses |
| **license-report** | npm | Detailed license report with texts |
| **pip-licenses** | Python | Tabular license output for pip packages |
| **go-licenses** | Go | License detection and NOTICE file generation |
| **dotnet-project-licenses** | .NET | NuGet package license report |
| **FOSSA** | Multi-language | Full compliance management platform |
| **Snyk** | Multi-language | License auditing as part of SCA |
| **licenseFinder** | Multi-language (Ruby-based) | Approve/deny license policies |

### Where to Display OSS Attribution

| Distribution Method | Where to Show Attribution |
|--------------------|--------------------------|
| **Web application (SaaS)** | "Legal" or "Open Source Licenses" page linked from footer |
| **Desktop application** | About dialog → "Third-Party Licenses" section |
| **Mobile app (iOS)** | Settings → Licenses (use `Settings.bundle` or acknowledgements plist) |
| **Mobile app (Android)** | About → Open Source Licenses (use `oss-licenses-plugin` for Gradle) |
| **CLI tool** | `--licenses` flag or `THIRD-PARTY-NOTICES.txt` bundled in distribution |
| **Library / SDK** | `NOTICE` or `THIRD-PARTY-NOTICES` file in package root |
| **Container image** | `/licenses/` directory or `NOTICE` file in image root |
| **Documentation** | Acknowledgements section in README or docs site |

## Creative Commons Attribution

Creative Commons licenses are common for media, data, and documentation.

| License | Attribution Required | Share Alike | Commercial Use |
|---------|---------------------|-------------|----------------|
| **CC0** | No | No | Yes |
| **CC BY 4.0** | Yes | No | Yes |
| **CC BY-SA 4.0** | Yes | Yes (derivatives same license) | Yes |
| **CC BY-NC 4.0** | Yes | No | No |
| **CC BY-NC-SA 4.0** | Yes | Yes | No |
| **CC BY-ND 4.0** | Yes | No (no derivatives) | Yes |

### Proper CC BY Attribution (TASL)

Creative Commons specifies the **TASL** format:

- **T**itle — name of the work
- **A**uthor — creator name (linked to profile if available)
- **S**ource — URL where the work was found
- **L**icense — license name linked to the license deed

Example:
```
"Sunset Over Mountains" by Jane Smith (https://example.com/photo/123)
is licensed under CC BY 4.0 (https://creativecommons.org/licenses/by/4.0/)
```

## Font Licensing

Fonts carry their own licensing terms that are frequently overlooked.

| License | Attribution | Embedding | Modification |
|---------|-------------|-----------|-------------|
| **SIL Open Font License (OFL)** | Required (original name + copyright) | Web/app/document embedding allowed | Allowed (must rename modified version) |
| **Apache 2.0** (some Google Fonts) | Required (copyright + license) | Allowed | Allowed |
| **Proprietary (Adobe, Monotype, etc.)** | Per EULA | Per EULA (often limited seats/pageviews) | Typically prohibited |
| **Desktop-only licenses** | Per EULA | Web embedding NOT allowed | Per EULA |

### Font Attribution Pitfalls

- **Web fonts** loaded via Google Fonts CDN do not require separate attribution (Google's ToS handles it), but self-hosted Google Fonts do require including the license file.
- **Icon fonts** (Font Awesome, Material Icons) have separate licenses for the font file vs the CSS/SVG — check both.
- **Custom font subsets** may trigger modification clauses — OFL requires renaming modified fonts.

## API and Service Attribution

Many APIs and services require visible attribution as a condition of use.

| Service | Attribution Requirement |
|---------|----------------------|
| **Google Maps** | "Google" logo on map + "Map data ©20XX Google" + Terms link |
| **Mapbox** | "© Mapbox" + "© OpenStreetMap" on map display |
| **OpenStreetMap** | "© OpenStreetMap contributors" with link to copyright page |
| **Twilio** | No visible attribution required (per current ToS) |
| **Stripe** | "Powered by Stripe" badge on checkout (optional but encouraged) |
| **OpenAI API** | No required attribution (per current ToS), but must not claim AI output is human-generated |
| **GitHub API** | Must comply with ToS; no mandatory badge |
| **Unsplash** | Attribution appreciated but not required (Unsplash License) |

> **Always check the current Terms of Service.** API attribution requirements change with ToS updates. What was optional last year may be mandatory now.

## Data Source Attribution

| Data License | Attribution Required | Derivative Works |
|-------------|---------------------|-----------------|
| **Open Data Commons Attribution (ODC-BY)** | Yes — credit source | Yes |
| **Open Data Commons ODbL** | Yes — credit source + share alike | Yes (same license) |
| **CC BY 4.0 (for datasets)** | Yes — TASL format | Yes |
| **Government open data (US)** | Generally no (public domain) | Yes |
| **Government open data (UK)** | OGL — yes, crown copyright | Yes |
| **Government open data (EU)** | Varies by member state | Varies |

## Compliance Checklist

| # | Check | Frequency |
|---|-------|-----------|
| 1 | **Audit all dependencies** for license types and attribution requirements | Every release |
| 2 | **Generate NOTICE/THIRD-PARTY-NOTICES file** from dependency metadata | Every build (automate) |
| 3 | **Review media assets** (images, icons, fonts, audio) for license terms | When assets are added |
| 4 | **Check API ToS** for attribution requirements | When integrating new APIs and on ToS change notifications |
| 5 | **Verify data source licenses** for attribution and share-alike terms | When incorporating new data sources |
| 6 | **Display attribution** in the correct location for your distribution type | Every release |
| 7 | **Verify modified fonts** are renamed per OFL requirements | When customizing fonts |
| 8 | **Document attribution decisions** in a central register | Ongoing |

## Best Practices

- **Always consult legal counsel** when unsure about attribution requirements — getting it wrong can terminate your license to use the software.
- **Automate NOTICE file generation** as part of your CI/CD pipeline — tools like `license-checker`, `FOSSA`, and `go-licenses` catch new dependencies automatically.
- **Maintain a central attribution register** that tracks every third-party component, its license, and where attribution is displayed.
- **Include attribution in your release checklist** — it is easy to add a dependency and forget to update the NOTICE file.
- **Check API Terms of Service** on a scheduled basis — attribution requirements change with ToS updates without notice.
- **Do not strip copyright notices or license headers** from source files — many licenses explicitly require preserving them.
- **Display attribution accessibly** — a legal/licenses page that users can actually find, not buried in an invisible footer.
- **Treat font licenses as seriously as code licenses** — font piracy lawsuits are common and penalties can be per-seat or per-pageview.
