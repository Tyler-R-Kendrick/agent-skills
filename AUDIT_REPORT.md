# Agent Skills Repository - Quality Audit Report

**Auditor:** auditor agent
**Date:** 2026-02-10
**Scope:** All skills in `skills/dotnet/`, `.agents/skills/`, and repo configuration files

---

## Executive Summary

The repository contains **157 individual .NET skills** under `skills/dotnet/`, **4 advanced agent skill sets** under `.agents/skills/`, and supporting configuration. The skills fall into two distinct quality tiers based on their origin: a "curated" set (~42 skills with full YAML frontmatter authored by Tyler-R-Kendrick) and a "generated" set (~115 skills with minimal frontmatter that appear to have been bulk-produced). The advanced agent skills from Vercel are uniformly excellent. Several structural and consistency issues need attention.

### Overall Scores

| Area | Score | Notes |
|------|-------|-------|
| Advanced Agent Skills (.agents/) | **A** | Exceptional depth, well-structured, production-ready |
| Curated Core Skills (with `name:` field) | **B** | Good code examples, consistent format, but thin guidance |
| Generated Core Skills (no `name:` field) | **C+** | Correct but shallow; bullet-point best practices lack depth |
| Repo Configuration | **B-** | Functional but marketplace.json does not enumerate skills |
| Format Consistency | **C** | Two incompatible frontmatter schemas across the collection |

---

## 1. Repository Structure

### Actual Layout
```
agent-skills/
  .agents/skills/
    vercel-react-best-practices/   (SKILL.md, AGENTS.md, rules/)
    vercel-composition-patterns/    (SKILL.md, AGENTS.md, rules/)
    vercel-react-native-skills/     (SKILL.md, AGENTS.md, rules/)
    web-design-guidelines/          (SKILL.md only)
  .claude-plugin/
    marketplace.json
    plugin.json
  skills/
    dotnet/
      SKILL.md                     (parent skill index)
      README.md
      a2a/SKILL.md
      aspnet-core/SKILL.md
      ... (157 skill directories)
  README.md
  package.json
  LICENSE
```

### Structural Issues

**ISSUE-S1: Marketplace configuration does not enumerate individual skills.**
`marketplace.json` lists a single plugin entry pointing to `./` but does not register the ~157 individual skills or the 4 advanced agent skill sets. An agent or tool consuming this marketplace would not be able to discover individual skills programmatically.

**ISSUE-S2: `plugin.json` is minimal and does not describe skill paths.**
The file contains only `name`, `description`, and `version`. It lacks a `skills` array or any path mapping to help consumers locate skills.

**ISSUE-S3: The `.agents/skills/` directory is not referenced from the marketplace or plugin configs.**
The four Vercel skill sets and the web-design-guidelines skill are orphaned from the discovery mechanism.

**ISSUE-S4: README.md references `marketplace.json` at root but it lives in `.claude-plugin/`.**
The README says "Skills can be... registered in the `marketplace.json` file" but the actual path is `.claude-plugin/marketplace.json`.

---

## 2. Frontmatter Consistency

Two distinct frontmatter schemas exist across the skill collection:

### Schema A: Full frontmatter (~43 skills)
```yaml
---
name: aspnet-core
description: Guidance for ASP.NET Core usage. Use when working with aspnet core.
license: MIT
metadata:
  displayName: "ASP.NET Core"
  author: "Tyler-R-Kendrick"
---
```

### Schema B: Minimal frontmatter (~115 skills)
```yaml
---
description: Guidance for Polly resilience and transient fault handling library.
metadata:
  displayName: Polly
---
```

### Frontmatter Issues

**ISSUE-F1: 115 of 157 skills are missing `name`, `license`, and `author` fields.**
These skills have only `description` and `metadata.displayName`. This inconsistency means any tooling relying on `name:` for lookup or `license:` for compliance will fail for ~73% of skills.

Skills with full frontmatter (Schema A): `a2a`, `agent-framework`, `appcontext`, `aspnet-core`, `aspnet-identity`, `azure-ai-inference`, `blazor`, `channels`, `communitytoolkit-guard`, `dapper`, `dotnet-cheatsheet`, `entity-framework-core`, `extensions-caching`, `extensions-compliance`, `extensions-configuration`, `extensions-dependency-injection`, `extensions-logging`, `extensions-primitives`, `extensions-resilience`, `extensions-service-discovery`, `file-provider`, `generic-host`, `globalization-localization`, `grpc-dotnet`, `humanizer`, `iasyncenumerable`, `isolated-storage`, `masstransit`, `maui`, `mcp`, `mediatr`, `microsoft-extensions-ai`, `msbuild-csproj`, `nservicebus`, `orleans`, `reactive-extensions`, `resources-localization`, `signalr`, `system-io-abstractions`, `system-io-pipelines`, `timeprovider`, `wolverine`.

Skills with minimal frontmatter (Schema B): All remaining ~115 skills.

**ISSUE-F2: Description field wording is inconsistent.**
- Schema A skills use the pattern: "Guidance for X usage. Use when working with X."
- Schema B skills use the pattern: "Guidance for X library/framework." (no trigger phrase)
The trigger phrase ("Use when working with...") is valuable for agent tool selection and should be standardized.

**ISSUE-F3: No `version` field on individual skills.**
Only the parent `skills/dotnet/SKILL.md` has a `version` in its metadata. Individual skills have no versioning.

---

## 3. Content Quality Assessment

### Tier 1: HIGH Quality

#### Advanced Agent Skills (.agents/skills/)

**vercel-react-best-practices** - SKILL.md + AGENTS.md (100KB+) + 57 rule files
- Exceptional quality. 57 rules organized by priority (CRITICAL to LOW)
- Each rule has incorrect/correct code examples with clear explanations
- AGENTS.md is a complete compiled document with table of contents
- Rule files use consistent frontmatter (`title`, `impact`, `impactDescription`, `tags`)
- Impact metrics included (e.g., "2-10x improvement")
- Grade: **A+**

**vercel-composition-patterns** - SKILL.md + AGENTS.md + 8 rule files
- Excellent depth on compound components, state management, dependency injection
- Real-world Composer example thread through all patterns
- React 19 API changes covered
- Grade: **A**

**vercel-react-native-skills** - SKILL.md + AGENTS.md (very large) + 30+ rule files
- Comprehensive coverage: list performance, animations, navigation, UI patterns
- Practical, production-grade code examples
- References to specific libraries (LegendList, FlashList, Galeria, zeego, expo-image)
- Grade: **A**

**web-design-guidelines** - SKILL.md only (no AGENTS.md, no rules/)
- Unusual design: fetches guidelines at runtime from a URL
- Acts as a "meta-skill" that delegates to external content
- Missing AGENTS.md unlike siblings
- Grade: **B** (good concept but structurally inconsistent with peers)

#### Curated .NET Cheatsheet

**dotnet-cheatsheet** (453 lines)
- The most comprehensive single skill in the core collection
- Covers: primary constructors, static avoidance, TimeProvider, parse-don't-validate, isolated storage, AppContext, resources, primitives, service discovery, resilience, generic host, logging, configuration, DI, ORMs, eventing, AI libraries, identity, IO, streams, reactive extensions, single-file executables, compliance, caching, globalization
- Well-organized with code examples for each topic
- Cross-references other specific skills
- Grade: **A**

### Tier 2: MEDIUM Quality

These skills have correct code, appropriate structure, but limited depth. They typically have:
- Overview (1-2 sentences)
- Setup and/or Example (one code block)
- Guidance or Best Practices (2-5 bullet points)

Representative examples with assessment:

| Skill | Lines | Code Example | Guidance Depth | Grade |
|-------|-------|-------------|----------------|-------|
| `entity-framework-core` | 32 | Good (Setup + usage) | 2 bullets | B |
| `masstransit` | 26 | Good (config) | 2 bullets | B |
| `signalr` | 28 | Good (setup + map) | 2 bullets | B |
| `maui` | 27 | OK (builder only) | 2 bullets | B- |
| `serilog` | 36 | Good (config + ASP.NET) | 5 bullets | B+ |
| `fsharp` | 38 | Good (DU + pattern match) | 5 bullets | B+ |
| `polly` | 40 | Good (retry + circuit breaker) | 5 bullets | B+ |
| `graphql` | 43 | Good (HotChocolate) | 5 bullets | B+ |
| `redis` | 46 | Good (multiple data types) | 4 bullets | B+ |
| `fluent-validations` | 43 | Good (validator class) | 5 bullets | B+ |
| `aspire` | 39 | Good (distributed app) | 5 bullets | B+ |
| `testcontainers` | 49 | Good (full lifecycle) | 5 bullets | B+ |
| `stripe` | 42 | Good (customer + payment) | 5 bullets | B+ |

### Tier 3: LOW Quality

These skills have significant quality concerns:

**Stub/placeholder skills with no real code examples:**

| Skill | Issue | Grade |
|-------|-------|-------|
| `mcp` | Code example is just comments: `// Register MCP clients...` | D |
| `a2a` | Code example is just comments: `// Use the a2a client...` | D |
| `agent-framework` | Code example is just comments: `// Configure agents and tools...` | D |

**Overly thin skills (<30 lines with generic guidance):**

| Skill | Lines | Issue | Grade |
|-------|-------|-------|-------|
| `appcontext` | 22 | Single tiny code block, 2 generic bullets | C |
| `blazor` | 23 | Registration only, no component example | C |
| `orleans` | 27 | Setup only, no grain example | C |
| `grpc-dotnet` | 28 | Setup only, no service implementation | C |
| `wolverine` | 25 | Setup only, no handler example | C- |
| `nservicebus` | 23 | Setup only, no handler or saga example | C- |
| `mediatr` | 22 | Registration only, no handler example | C- |

**Skills for obsolete, abandoned, or extremely niche libraries:**

| Skill | Concern |
|-------|---------|
| `mobius` | Deprecated - .NET for Apache Spark replaced this project |
| `wave-engine` | Rebranded to Evergine; "Wave Engine" name is outdated |
| `plastic` | Very obscure; last NuGet update unclear |
| `hyperion` | Akka.NET serializer; extremely niche |
| `migrant` | Obscure serialization library |
| `population-net` | Extremely niche genetic algorithm library |
| `parakeet` | Very obscure parsing library |
| `mardig` | Appears to be "Markdig" misspelled |

---

## 4. Code Example Quality

### Strengths
- Code examples are generally syntactically correct C#
- Modern C# features used appropriately (primary constructors, records, async/await)
- The curated skills (Schema A) use tabs consistently for indentation
- Examples are self-contained and demonstrate actual API usage

### Issues

**ISSUE-C1: Three skills have placeholder-only code examples.**
- `mcp/SKILL.md`: `// Register MCP clients and tools using the official mcp package APIs.`
- `a2a/SKILL.md`: `// Use the a2a client and message types from the official package.`
- `agent-framework/SKILL.md`: `// Configure agents and tools at the host composition root.`

**ISSUE-C2: Many skills show only setup/registration, not actual usage.**
Skills like `blazor`, `orleans`, `mediatr`, `nservicebus`, `wolverine`, and `grpc-dotnet` show only the DI registration call but not how to implement a handler, grain, consumer, or service.

**ISSUE-C3: No imports/usings shown in Schema A skills.**
The curated skills omit `using` statements while Schema B skills include them. Both approaches have merit but should be consistent.

**ISSUE-C4: Indentation inconsistency.**
Schema A skills use tabs. Schema B skills use spaces (4-space indent). This creates an inconsistent visual style.

---

## 5. Overlapping and Duplicate Skills

### Definite Overlaps

| Group | Skills | Overlap Description |
|-------|--------|-------------------|
| Resilience | `polly`, `extensions-resilience` | Both cover retry/circuit-breaker. `extensions-resilience` example is identical to the resilience section in `dotnet-cheatsheet` |
| Logging | `serilog`, `nlog`, `extensions-logging`, `otlp-logging` | Four separate logging skills with overlapping guidance |
| Validation | `fluent-validations`, `validot`, `enforcer`, `peasy` | Four validation libraries; no guidance on when to choose which |
| Mapping | `automapper`, `mapperly` | Both are object mappers; Mapperly says "prefer over AutoMapper" but both exist as equal skills |
| Messaging | `masstransit`, `nservicebus`, `wolverine`, `brighter`, `rebus` | Five messaging frameworks; no comparative guidance |
| Caching | `extensions-caching`, `redis` | Redis is a cache too; overlap in caching patterns |
| Localization | `globalization-localization`, `resources-localization`, `i18n`, `messageformat-net` | Four localization-related skills |
| Functional | `fsharp`, `functional-programming`, `language-ext`, `curryfy`, `optional`, `jflepp-maybe` | Six FP-related skills with overlapping concepts |
| Parsing | `fparsec`, `pidgin`, `parakeet` | Three parser combinator libraries |

### Content Duplicated Across Skills

The `dotnet-cheatsheet` skill is a meta-skill that contains condensed versions of many individual skills. For example:
- Its "Resiliency" section duplicates `extensions-resilience` verbatim
- Its "Logging" section duplicates `extensions-logging` verbatim
- Its "Isolated Storage" section duplicates `isolated-storage`
- Its "AppContext" section duplicates `appcontext`
- Its "Parse, don't validate" section duplicates `parse-dont-validate`

This creates a maintenance burden -- changes must be made in two places.

### Naming Issue

**`mardig`** appears to be a misspelling of **Markdig** (the popular .NET Markdown processor). This should be verified and corrected.

---

## 6. Completeness Assessment

### Well-Covered Areas
- ASP.NET Core web stack (core, Blazor, SignalR, gRPC, YARP, Ocelot)
- Data access (EF Core, Dapper, Redis)
- Messaging (5 frameworks)
- Resilience and HTTP patterns
- Microsoft.Extensions.* ecosystem
- AI/ML (.NET AI, Azure AI, MCP, A2A, ML.NET, ONNX)
- Testing (Testcontainers, AutoFixture, Moq, Pact, Reqnroll, BDD)
- Functional programming ecosystem

### Missing Skills (Gaps)
- **No Minimal API patterns skill** - Only briefly touched in aspnet-core
- **No xUnit/NUnit skill** - Testing frameworks themselves are missing
- **No Swagger/OpenAPI generation patterns** - Only a generic openapi skill
- **No Docker/containerization skill** - Despite Testcontainers coverage
- **No CI/CD patterns skill** - GitHub Actions, Azure DevOps
- **No memory/performance profiling skill**
- **No Dependency Injection anti-patterns skill** - Despite DI registration coverage
- **No async/await best practices skill** - Despite `iasyncenumerable`
- **No C# 12/13 new features skill** - Despite dotnet-cheatsheet mentioning .NET 10

---

## 7. Advanced Agent Skills Deep Dive

### vercel-react-best-practices
- **Files:** SKILL.md (137 lines) + AGENTS.md (100KB+) + 57 rule .md files
- **Structure:** SKILL.md serves as index with priority table; each rule has its own file
- **Rule file format:** Consistent YAML frontmatter with `title`, `impact`, `impactDescription`, `tags`
- **Quality highlights:**
  - Incorrect/correct code pairs for every rule
  - Impact quantified where possible
  - Covers critical performance issues (waterfalls, bundle size) through micro-optimizations
- **No issues found**

### vercel-composition-patterns
- **Files:** SKILL.md (89 lines) + AGENTS.md (947 lines) + 8 rule files
- **Structure:** Same index+rules pattern
- **Quality highlights:**
  - Real-world Composer example demonstrates all patterns
  - React 19 API changes included
  - State management patterns are nuanced and practical
- **Minor issue:** AGENTS.md has extra blank lines between paragraphs (double newlines creating odd spacing)

### vercel-react-native-skills
- **Files:** SKILL.md (122 lines) + AGENTS.md (2898 lines) + 30+ rule files
- **Structure:** Same index+rules pattern
- **Quality highlights:**
  - Covers everything from crash-prevention to micro-optimizations
  - Specific library recommendations (LegendList, expo-image, zeego, Galeria)
  - React Compiler compatibility notes
- **Minor issue:** Rule 2.2 has a code example with `useCallback` that still creates per-item closures (the `item.id` dependency changes per item, which defeats the purpose of hoisting)

### web-design-guidelines
- **Files:** SKILL.md only (40 lines)
- **Design:** Meta-skill that fetches guidelines at runtime via URL
- **Issues:**
  - No AGENTS.md or rules/ directory (inconsistent with siblings)
  - Depends on external URL availability at runtime
  - No offline fallback content
  - Grade is lower than peers due to structural difference

---

## 8. Configuration Assessment

### marketplace.json
```json
{
  "plugins": [
    {
      "name": "agent-skills",
      "source": "./",
      "description": "Collection of agent skills",
      "version": "1.0.0"
    }
  ]
}
```
- Does not enumerate individual skills
- Single flat plugin entry for entire repo
- No categories, tags, or dependencies

### plugin.json
```json
{
  "name": "agent-skills",
  "description": "Collection of agent skills",
  "version": "1.0.0"
}
```
- Minimal -- no skills listing, no paths, no metadata

### package.json
- References `index.js` as main but no such file exists
- Test script is a no-op (`echo "Error: no test specified" && exit 1`)
- Otherwise well-formed with proper repository and license fields

---

## 9. Quality Tier Summary

### Tier 1 - HIGH (Recommend as-is, minor polish only)
- `.agents/skills/vercel-react-best-practices/` (A+)
- `.agents/skills/vercel-composition-patterns/` (A)
- `.agents/skills/vercel-react-native-skills/` (A)
- `skills/dotnet/dotnet-cheatsheet/` (A)
- `skills/dotnet/entity-framework-core/` (B+)
- `skills/dotnet/serilog/` (B+)
- `skills/dotnet/fsharp/` (B+)
- `skills/dotnet/polly/` (B+)
- `skills/dotnet/redis/` (B+)
- `skills/dotnet/graphql/` (B+)
- `skills/dotnet/fluent-validations/` (B+)
- `skills/dotnet/aspire/` (B+)
- `skills/dotnet/testcontainers/` (B+)
- `skills/dotnet/stripe/` (B+)
- `skills/dotnet/parse-dont-validate/` (B+)
- `skills/dotnet/dapper/` (B)
- `skills/dotnet/masstransit/` (B)
- `skills/dotnet/signalr/` (B)
- `skills/dotnet/playwright/` (B)

### Tier 2 - MEDIUM (Usable but should be expanded)
Most of the ~115 Schema B skills fall here. They are correct but shallow:
- `skills/dotnet/automapper/`
- `skills/dotnet/mapperly/`
- `skills/dotnet/validot/`
- `skills/dotnet/yarp/`
- `skills/dotnet/unity3d/`
- `skills/dotnet/bdd-cheatsheet/`
- `skills/dotnet/hygiene/`
- `skills/dotnet/functional-programming/`
- `skills/dotnet/evaluations/`
- `skills/dotnet/wave-engine/` (also outdated name)
- And ~105 more in this tier

### Tier 3 - LOW (Need significant improvement or removal)
- `skills/dotnet/mcp/` (D - placeholder code)
- `skills/dotnet/a2a/` (D - placeholder code)
- `skills/dotnet/agent-framework/` (D - placeholder code)
- `skills/dotnet/blazor/` (C - setup only)
- `skills/dotnet/orleans/` (C - setup only)
- `skills/dotnet/mediatr/` (C- - registration only)
- `skills/dotnet/nservicebus/` (C- - setup only)
- `skills/dotnet/wolverine/` (C- - setup only)
- `skills/dotnet/grpc-dotnet/` (C - setup only)
- `skills/dotnet/mobius/` (deprecated library)
- `skills/dotnet/mardig/` (possible name error)
- `.agents/skills/web-design-guidelines/` (B- structurally inconsistent)

---

## 10. Recommendations

### Critical (Fix First)
1. **Standardize frontmatter** across all 157 skills to include `name`, `license`, and `author`
2. **Replace placeholder code examples** in `mcp`, `a2a`, and `agent-framework` with real, working code
3. **Fix `mardig` naming** -- verify if this should be `markdig`
4. **Update `marketplace.json`** to enumerate skills or skill categories

### High Priority
5. **Expand setup-only skills** (blazor, orleans, mediatr, nservicebus, wolverine, grpc-dotnet) with actual handler/component/grain examples
6. **Add comparative guidance** to overlapping skill groups (messaging, validation, mapping, logging) -- help agents choose the right tool
7. **Review obsolete libraries** (mobius, wave-engine) for removal or update
8. **Bring `web-design-guidelines`** into structural parity with other `.agents/skills/` entries (add AGENTS.md with offline fallback content)

### Medium Priority
9. **Add missing skills** for xUnit/NUnit, Docker/CI-CD patterns, async/await best practices, Minimal API patterns
10. **Deduplicate** the dotnet-cheatsheet content from individual skills -- either make cheatsheet the single source or keep skills as single source with cheatsheet referencing them
11. **Standardize code style** (tabs vs spaces, with/without `using` statements)
12. **Add `version` field** to individual skill frontmatter

### Low Priority
13. **Add `package.json` main entry** or remove the `"main": "index.js"` reference
14. **Update README.md** to accurately reflect the `.claude-plugin/marketplace.json` path
15. **Add trigger phrases** ("Use when working with...") to all Schema B skill descriptions
16. **Consider categorization metadata** (tags/categories) in frontmatter for better discovery

---

## Appendix: Files Audited

### Core Skills Read (25+ skills)
- `skills/dotnet/aspnet-core/SKILL.md`
- `skills/dotnet/masstransit/SKILL.md`
- `skills/dotnet/entity-framework-core/SKILL.md`
- `skills/dotnet/blazor/SKILL.md`
- `skills/dotnet/dapper/SKILL.md`
- `skills/dotnet/signalr/SKILL.md`
- `skills/dotnet/playwright/SKILL.md`
- `skills/dotnet/maui/SKILL.md`
- `skills/dotnet/serilog/SKILL.md`
- `skills/dotnet/fsharp/SKILL.md`
- `skills/dotnet/polly/SKILL.md`
- `skills/dotnet/graphql/SKILL.md`
- `skills/dotnet/dotnet-cheatsheet/SKILL.md`
- `skills/dotnet/bdd-cheatsheet/SKILL.md`
- `skills/dotnet/redis/SKILL.md`
- `skills/dotnet/mediatr/SKILL.md`
- `skills/dotnet/orleans/SKILL.md`
- `skills/dotnet/grpc-dotnet/SKILL.md`
- `skills/dotnet/nservicebus/SKILL.md`
- `skills/dotnet/wolverine/SKILL.md`
- `skills/dotnet/evaluations/SKILL.md`
- `skills/dotnet/mcp/SKILL.md`
- `skills/dotnet/a2a/SKILL.md`
- `skills/dotnet/hygiene/SKILL.md`
- `skills/dotnet/fluent-validations/SKILL.md`
- `skills/dotnet/validot/SKILL.md`
- `skills/dotnet/automapper/SKILL.md`
- `skills/dotnet/mapperly/SKILL.md`
- `skills/dotnet/extensions-resilience/SKILL.md`
- `skills/dotnet/extensions-logging/SKILL.md`
- `skills/dotnet/extensions-caching/SKILL.md`
- `skills/dotnet/functional-programming/SKILL.md`
- `skills/dotnet/aspire/SKILL.md`
- `skills/dotnet/testcontainers/SKILL.md`
- `skills/dotnet/stripe/SKILL.md`
- `skills/dotnet/unity3d/SKILL.md`
- `skills/dotnet/plastic/SKILL.md`
- `skills/dotnet/mobius/SKILL.md`
- `skills/dotnet/agent-framework/SKILL.md`
- `skills/dotnet/isolated-storage/SKILL.md`
- `skills/dotnet/appcontext/SKILL.md`
- `skills/dotnet/wave-engine/SKILL.md`
- `skills/dotnet/mathflow/SKILL.md`
- `skills/dotnet/parse-dont-validate/SKILL.md`
- `skills/dotnet/yarp/SKILL.md`
- `skills/dotnet/SKILL.md` (parent index)

### Advanced Agent Skills Read
- `.agents/skills/vercel-react-best-practices/SKILL.md` + `AGENTS.md` + sample rules
- `.agents/skills/vercel-composition-patterns/SKILL.md` + `AGENTS.md`
- `.agents/skills/vercel-react-native-skills/SKILL.md` + `AGENTS.md`
- `.agents/skills/web-design-guidelines/SKILL.md`

### Configuration Files Read
- `.claude-plugin/marketplace.json`
- `.claude-plugin/plugin.json`
- `package.json`
- `README.md`

### Systematic Checks
- YAML frontmatter field presence (`name:`, `license:`, `author:`) across all 157 skills
- Directory structure verification
- Duplicate/overlap analysis across all skill names
