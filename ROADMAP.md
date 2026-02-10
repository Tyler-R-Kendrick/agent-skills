# Agent Skills Repository - Improvement Roadmap

**Created:** 2026-02-10
**Based on:** AUDIT_REPORT.md findings and firsthand codebase review
**Status:** Ready for execution

---

## Priority Matrix

| Priority | Impact | Effort | Phase |
|----------|--------|--------|-------|
| Fix frontmatter on 115 skills | HIGH (discovery broken for 73%) | LOW (scripted) | 1 |
| Fill placeholder code (mcp, a2a, agent-framework) | HIGH (D-grade skills) | LOW (3 files) | 1 |
| Fix mardig misspelling | MEDIUM (confusing) | TRIVIAL | 1 |
| Fix README marketplace.json path | LOW (inaccurate docs) | TRIVIAL | 1 |
| Fix web-design-guidelines structure | MEDIUM (inconsistent) | LOW | 1 |
| Expand setup-only skills (7 skills) | HIGH (C-grade skills) | MEDIUM | 2 |
| Add comparative guidance for overlaps | HIGH (9 overlap groups) | MEDIUM | 2 |
| Deprecate/update obsolete skills | MEDIUM (misleading) | LOW | 2 |
| Deduplicate cheatsheet content | MEDIUM (maintenance burden) | MEDIUM | 2 |
| Create missing high-value skills | HIGH (major gaps) | HIGH | 3 |
| Upgrade top skills to .agents format | HIGH (quality uplift) | HIGH | 3 |
| Build validation tooling | HIGH (prevents regression) | MEDIUM | 4 |
| Expand marketplace.json indexing | MEDIUM (programmatic discovery) | MEDIUM | 4 |

---

## Phase 1: Quick Wins

**Goal:** Fix all mechanical issues that can be scripted or done in minutes.
**Estimated scope:** ~120 file edits, mostly automated.

### 1.1 Standardize Frontmatter on All 115 Schema B Skills

**Problem:** 115 of 157 skills are missing `name`, `license`, and `author` fields (ISSUE-F1). Tooling relying on these fields fails for 73% of skills.

**Action:** Add `name`, `license: MIT`, and `author: "Tyler-R-Kendrick"` to every Schema B skill. Also add the trigger phrase pattern ("Use when working with X.") to descriptions (ISSUE-F2).

**Before** (e.g., `skills/dotnet/polly/SKILL.md`):
```yaml
---
description: Guidance for Polly resilience and transient fault handling library.
metadata:
  displayName: Polly
---
```

**After:**
```yaml
---
name: polly
description: Guidance for Polly resilience and transient fault handling library. Use when working with Polly.
license: MIT
metadata:
  displayName: Polly
  author: "Tyler-R-Kendrick"
---
```

**Files affected:** All ~115 skills without `name:` field. The full list of Schema A skills (already correct) is documented in the audit report Section 2.

**Approach:** Write a script that reads each `SKILL.md`, detects missing fields, derives `name` from the directory name, and adds the missing fields. Manual review for the `description` trigger phrases.

### 1.2 Fix Placeholder Code Examples

**Problem:** Three skills have comment-only code examples with no actual executable code (ISSUE-C1).

**Action items:**

- **`skills/dotnet/mcp/SKILL.md`** -- Replace the placeholder comment with a real MCP server/client registration example using `ModelContextProtocol` NuGet package. Show tool definition, server setup, and DI registration.

- **`skills/dotnet/a2a/SKILL.md`** -- Replace the placeholder comment with a real A2A agent card, task handler, and client example using the `SharpA2A` or official A2A package.

- **`skills/dotnet/agent-framework/SKILL.md`** -- Replace the placeholder comment with a real agent framework setup showing agent definition, tool registration, and execution using `Microsoft.Extensions.AI` agent abstractions.

### 1.3 Fix the "mardig" Misspelling

**Problem:** The directory `skills/dotnet/mardig/` is almost certainly a misspelling of "Markdig" (the popular .NET Markdown processor). The SKILL.md inside already references "Markdig" in its content and uses `using Markdig;`.

**Action:**
1. Rename directory: `skills/dotnet/mardig/` -> `skills/dotnet/markdig/`
2. Update frontmatter to add `name: markdig`
3. Update any references in the parent `skills/dotnet/SKILL.md` if present

### 1.4 Fix README.md Marketplace Path

**Problem:** `README.md` says skills are "registered in the `marketplace.json` file" but the actual path is `.claude-plugin/marketplace.json` (ISSUE-S4).

**Action:** Update `README.md` line 30 to reference the correct path:
```
Skills can be added to the `skills/` directory and registered in the `.claude-plugin/marketplace.json` file...
```

### 1.5 Fix package.json Dead Reference

**Problem:** `package.json` references `"main": "index.js"` but no such file exists.

**Action:** Remove the `"main": "index.js"` line from `package.json`, or replace it with an appropriate entry point if one is planned.

### 1.6 Normalize web-design-guidelines Structure

**Problem:** `.agents/skills/web-design-guidelines/` has only a SKILL.md, while its sibling Vercel skills all have SKILL.md + AGENTS.md + rules/ (ISSUE in Section 7).

**Action:**
1. Create `.agents/skills/web-design-guidelines/AGENTS.md` with an offline fallback containing the core web design guidelines (fetched and cached from the source URL)
2. Consider adding a `rules/` directory with individual rule files for the most critical guidelines

### 1.7 Standardize Code Style

**Problem:** Schema A skills use tabs, Schema B skills use 4-space indentation (ISSUE-C4). Schema A omits `using` statements while Schema B includes them (ISSUE-C3).

**Action:** Pick one convention and apply it repo-wide. Recommendation: Use tabs (consistent with the curated skills authored by the repo owner) and include `using` statements (more helpful for agents generating code).

---

## Phase 2: Quality Improvements

**Goal:** Raise all skills to at least B grade. Add guidance that helps agents make informed library choices.

### 2.1 Expand Setup-Only Skills with Real Examples

**Problem:** Seven curated skills show only DI registration with no actual usage examples (ISSUE-C2). These are among the most important .NET skills.

| Skill | What to Add | Target File |
|-------|-------------|-------------|
| `blazor` | Razor component with `@code` block, parameter binding, event handling, render modes | `skills/dotnet/blazor/SKILL.md` |
| `orleans` | Grain interface + implementation, grain client call, grain persistence | `skills/dotnet/orleans/SKILL.md` |
| `mediatr` | `IRequest<T>` + `IRequestHandler<,>`, notification, pipeline behavior | `skills/dotnet/mediatr/SKILL.md` |
| `nservicebus` | Message handler, saga example, endpoint startup | `skills/dotnet/nservicebus/SKILL.md` |
| `wolverine` | Command handler, message routing, middleware | `skills/dotnet/wolverine/SKILL.md` |
| `grpc-dotnet` | Proto file, generated service implementation, client factory | `skills/dotnet/grpc-dotnet/SKILL.md` |
| `appcontext` | More complete switch usage with feature-flag pattern | `skills/dotnet/appcontext/SKILL.md` |

**Target:** Each skill should have at minimum:
- Overview (2-3 sentences)
- Setup/registration code
- At least one real usage example (component, handler, grain, service impl)
- 4-5 guidance bullets with actionable advice

### 2.2 Add Comparative Guidance for Overlapping Skills

**Problem:** Nine groups of overlapping skills exist with no guidance on when to choose which (Section 5 of audit).

**Action:** For each overlap group, add a `## When to Choose` section to the primary/most popular skill in each group, and add cross-references from the others.

| Group | Primary Skill | Action |
|-------|--------------|--------|
| **Resilience** | `extensions-resilience` | Add note: "Prefer Microsoft.Extensions.Resilience for new projects. Use Polly directly only when you need advanced policies not yet in the extensions." Cross-link from `polly`. |
| **Logging** | `extensions-logging` | Add comparison table: built-in vs Serilog vs NLog vs OTLP. Link from `serilog`, `nlog`, `otlp-logging`. |
| **Validation** | `fluent-validations` | Add "When to Choose" section: FluentValidation (general), Validot (perf-critical), Enforcer/Peasy (domain rules). |
| **Mapping** | `mapperly` | Add "When to Choose": Mapperly (new projects, source-gen perf), AutoMapper (legacy, runtime flexibility). |
| **Messaging** | `masstransit` | Add comparison: MassTransit (open-source default), NServiceBus (enterprise/licensed), Wolverine (modern/lightweight), Brighter (CQRS-centric), Rebus (simple). |
| **Caching** | `extensions-caching` | Clarify: in-memory vs distributed. Cross-reference `redis` for distributed caching. |
| **Localization** | `globalization-localization` | Consolidate guidance on when to use which localization approach. |
| **Functional** | `functional-programming` | Add overview linking to `language-ext` (primary), `fsharp` (language-level), and noting that `curryfy`, `optional`, `jflepp-maybe` are niche. |
| **Parsing** | `fparsec` | Note: FParsec (F#), Pidgin (C# with good errors), Parakeet (very niche). |

### 2.3 Deprecate or Update Obsolete Skills

| Skill | Action | File |
|-------|--------|------|
| `mobius` | Add deprecation notice at top: "Mobius is deprecated. Use .NET for Apache Spark (`Microsoft.Spark`) instead." Consider removing or redirecting. | `skills/dotnet/mobius/SKILL.md` |
| `wave-engine` | Rename/update to "Evergine" (the current name). Update all API references. | `skills/dotnet/wave-engine/SKILL.md` |
| `plastic` | Evaluate if still maintained. If not, add deprecation note or remove. | `skills/dotnet/plastic/SKILL.md` |
| `hyperion` | Mark as niche/legacy Akka.NET serializer. Consider removal. | `skills/dotnet/hyperion/SKILL.md` |
| `migrant` | Evaluate maintenance status. Mark accordingly. | `skills/dotnet/migrant/SKILL.md` |
| `population-net` | Mark as extremely niche. Consider removal. | `skills/dotnet/population-net/SKILL.md` |
| `parakeet` | Mark as very niche. Consider removal. | `skills/dotnet/parakeet/SKILL.md` |

### 2.4 Deduplicate Cheatsheet Content

**Problem:** `skills/dotnet/dotnet-cheatsheet/SKILL.md` contains verbatim copies of content from individual skills (resilience, logging, isolated-storage, etc.), creating a maintenance burden.

**Action:** Refactor the cheatsheet to use reference-style links:
- Keep condensed summaries (2-3 lines) in the cheatsheet
- Replace duplicated code blocks with "For details and examples, use the [skill-name] skill" (some sections already do this)
- Apply this pattern consistently to all sections that currently duplicate individual skills

**Sections to refactor in `skills/dotnet/dotnet-cheatsheet/SKILL.md`:**
- "Resiliency" (duplicates `extensions-resilience`)
- "Logging" (duplicates `extensions-logging`)
- "Isolated Storage" (duplicates `isolated-storage`)
- "AppContext" (duplicates `appcontext`)

### 2.5 Improve Tier 2 Skills (Bulk Quality Uplift)

**Problem:** ~115 generated skills have correct but shallow content (B-/C+ grade).

**Action for the top 20 most commonly used libraries** (prioritize by NuGet download counts and real-world usage):

1. `aspire` - Add component authoring, health check config, telemetry setup
2. `testcontainers` - Add custom container, network setup, parallel test example
3. `redis` - Add pub/sub, streams, distributed lock patterns
4. `automapper` - Add projection, reverse mapping, testing profile
5. `serilog` - Add enrichers, destructuring, custom sink
6. `polly` - Add Polly v8 resilience pipeline, hedging, rate limiter
7. `graphql` - Add subscriptions, data loaders, authorization
8. `fluent-validations` - Add async validators, integration with ASP.NET, custom validators
9. `yarp` - Add transforms, rate limiting, load balancing config
10. `moq` - Add verify, callback, sequence, mock repository patterns
11. `refit` - Add header handling, auth, polymorphic serialization
12. `unity3d` - Add MonoBehaviour lifecycle, coroutines, scriptable objects
13. `avalonia` - Add MVVM pattern, styling, platform-specific code
14. `openfeature` - Add provider setup, evaluation context, hooks
15. `spectre-console` - Add tables, progress bars, prompts
16. `bdd-cheatsheet` - Add SpecFlow/Reqnroll scenario example, step definition
17. `stateless` - Add state machine with guards, async triggers
18. `humanizer` - Add datetime, collection, string examples
19. `nodatime` - Add time zone handling, period/duration, serialization
20. `pact` - Add consumer/provider test, broker integration

---

## Phase 3: Expansion

**Goal:** Fill major skill gaps and promote the best .NET skills to the advanced `.agents/` format.

### 3.1 New Skills to Create

These are significant gaps identified in the audit (Section 6) plus additional gaps found during codebase review.

#### Critical Missing Skills (High Impact)

| Skill Name | Directory | Description |
|------------|-----------|-------------|
| `xunit` | `skills/dotnet/xunit/` | xUnit testing: facts, theories, fixtures, collection fixtures, output, assertions |
| `nunit` | `skills/dotnet/nunit/` | NUnit testing: attributes, constraints, parameterized tests, setup/teardown |
| `minimal-api-patterns` | `skills/dotnet/minimal-api-patterns/` | Minimal API: route groups, filters, endpoint metadata, typed results, OpenAPI |
| `async-await` | `skills/dotnet/async-await/` | Async best practices: ConfigureAwait, ValueTask, cancellation, avoiding deadlocks, async disposal |
| `docker-dotnet` | `skills/dotnet/docker-dotnet/` | Dockerfile patterns for .NET: multi-stage builds, restore optimization, health checks, .dockerignore |
| `ci-cd-dotnet` | `skills/dotnet/ci-cd-dotnet/` | CI/CD patterns: GitHub Actions for .NET, Azure DevOps pipelines, NuGet publishing |

#### High-Value Missing Skills

| Skill Name | Directory | Description |
|------------|-----------|-------------|
| `csharp-12-13` | `skills/dotnet/csharp-12-13/` | New C# features: collection expressions, primary constructors (classes), inline arrays, interceptors, params collections |
| `di-anti-patterns` | `skills/dotnet/di-anti-patterns/` | DI anti-patterns: service locator, captive dependencies, ambient context, constructor over-injection |
| `swagger-openapi` | `skills/dotnet/swagger-openapi/` | OpenAPI generation: Swashbuckle, NSwag, Microsoft.AspNetCore.OpenApi, schema customization |
| `performance-profiling` | `skills/dotnet/performance-profiling/` | BenchmarkDotNet, dotnet-counters, dotnet-trace, dotnet-dump, memory profiling patterns |
| `source-generators` | `skills/dotnet/source-generators/` | Writing and consuming source generators, incremental generators, analyzer patterns |
| `health-checks` | `skills/dotnet/health-checks/` | ASP.NET Core health checks: custom checks, UI, degraded status, dependency checks |
| `middleware-patterns` | `skills/dotnet/middleware-patterns/` | ASP.NET Core middleware: ordering, branching, conditional middleware, terminal middleware |
| `background-services` | `skills/dotnet/background-services/` | IHostedService, BackgroundService, scoped services in hosted services, graceful shutdown |
| `ef-core-advanced` | `skills/dotnet/ef-core-advanced/` | Migrations, interceptors, value conversions, owned entities, temporal tables, compiled queries |
| `result-pattern` | `skills/dotnet/result-pattern/` | Result/OneOf pattern for error handling without exceptions |

#### Nice-to-Have Skills

| Skill Name | Directory | Description |
|------------|-----------|-------------|
| `rate-limiting` | `skills/dotnet/rate-limiting/` | ASP.NET Core rate limiting: fixed window, sliding window, token bucket, concurrency |
| `output-caching` | `skills/dotnet/output-caching/` | Response/output caching in ASP.NET Core |
| `api-versioning` | `skills/dotnet/api-versioning/` | Asp.Versioning: URL, header, query string versioning strategies |
| `aot-publishing` | `skills/dotnet/aot-publishing/` | Native AOT: trimming, configuration, platform limitations, reflection-free patterns |
| `global-error-handling` | `skills/dotnet/global-error-handling/` | IExceptionHandler, ProblemDetails, RFC 9457 |
| `semantic-kernel` | `skills/dotnet/semantic-kernel/` | SK patterns for existing codebases (even though agent-framework is preferred) |

### 3.2 Upgrade High-Value .NET Skills to .agents Format

**Goal:** Take the most impactful .NET skill areas and create deep, multi-rule skill sets in the `.agents/skills/` format, matching the quality of the Vercel skills.

**Candidates for upgrade** (based on breadth of rules, frequency of use, and depth available):

#### Tier 1 Upgrades (Highest Value)

1. **`dotnet-aspnet-best-practices`** -> `.agents/skills/dotnet-aspnet-best-practices/`
   - SKILL.md (index with priority table)
   - AGENTS.md (compiled rules document)
   - `rules/` with individual rule files covering:
     - Minimal API patterns (routing, filters, typed results)
     - Middleware ordering and anti-patterns
     - Authentication/authorization patterns
     - Request validation and model binding
     - Response compression and caching
     - Error handling (ProblemDetails, IExceptionHandler)
     - Endpoint security (CORS, rate limiting, HTTPS)
   - Estimated: 25-35 rules

2. **`dotnet-ef-core-best-practices`** -> `.agents/skills/dotnet-ef-core-best-practices/`
   - Rules covering: query optimization, N+1 prevention, migration strategies, connection management, concurrency handling, testing with in-memory providers
   - Estimated: 20-30 rules

3. **`dotnet-testing-best-practices`** -> `.agents/skills/dotnet-testing-best-practices/`
   - Rules covering: test organization, fixture management, mocking strategies, integration test patterns, test data builders, assertion best practices, CI integration
   - Estimated: 20-25 rules

#### Tier 2 Upgrades

4. **`dotnet-async-best-practices`** -> `.agents/skills/dotnet-async-best-practices/`
   - Rules for: async/await pitfalls, cancellation, ValueTask, ConfigureAwait, async disposal, parallel execution, channels and pipelines
   - Estimated: 15-20 rules

5. **`dotnet-di-patterns`** -> `.agents/skills/dotnet-di-patterns/`
   - Rules for: lifetime management, factory patterns, decorator pattern, composite pattern, keyed services, module registration, testing with DI
   - Estimated: 15-20 rules

---

## Phase 4: Tooling and Infrastructure

**Goal:** Prevent quality regression and enable programmatic skill discovery.

### 4.1 Frontmatter Validation Script

Create a CI check that validates every SKILL.md has required frontmatter fields.

**File:** `scripts/validate-frontmatter.js` (or PowerShell/bash)

**Required fields to validate:**
- `name` (must match directory name)
- `description` (must contain text, ideally with trigger phrase)
- `license` (must be present)
- `metadata.displayName` (must be present)
- `metadata.author` (must be present)

**Optional but recommended:**
- `metadata.tags` (array)
- `metadata.version`

### 4.2 Skill Quality Linter

Create a script that checks each skill for minimum content quality.

**Rules:**
- Must have at least one code block (not just comments)
- Code blocks must contain actual code (not just `// placeholder...`)
- Must have at least 3 guidance/best-practice bullets
- Must be at least 20 lines total
- Should have both Setup/Registration AND Usage examples

**File:** `scripts/lint-skills.js`

### 4.3 Expand marketplace.json to Enumerate Skills

**Problem:** `marketplace.json` has a single flat entry for the entire repo (ISSUE-S1, S2, S3).

**Action:** Either:
- **(Option A)** Generate a `skills-index.json` that lists every skill with its metadata, path, and category. Use a build script to regenerate it from SKILL.md frontmatter.
- **(Option B)** Expand `marketplace.json` to include a `skills` array with per-skill entries.
- **(Option C)** Expand `plugin.json` to include skill paths and metadata.

**Recommended:** Option A -- keep `marketplace.json` as the top-level plugin entry and add a generated `skills-index.json` for programmatic discovery.

**Generated index structure:**
```json
{
  "generatedAt": "2026-02-10T00:00:00Z",
  "skills": [
    {
      "name": "aspnet-core",
      "displayName": "ASP.NET Core",
      "description": "Guidance for ASP.NET Core usage.",
      "path": "skills/dotnet/aspnet-core/SKILL.md",
      "category": "web",
      "author": "Tyler-R-Kendrick",
      "license": "MIT"
    }
  ],
  "agentSkills": [
    {
      "name": "vercel-react-best-practices",
      "path": ".agents/skills/vercel-react-best-practices/",
      "hasAgentsMd": true,
      "ruleCount": 57
    }
  ]
}
```

### 4.4 CI Pipeline

**File:** `.github/workflows/validate-skills.yml`

**Steps:**
1. Frontmatter validation (4.1)
2. Skill quality lint (4.2)
3. Index generation and staleness check (4.3)
4. Markdown lint (markdownlint or similar)
5. Link checking (for any URLs in skills)

### 4.5 Skill Categories and Tags

**Action:** Add `metadata.tags` to all skills for category-based discovery.

**Proposed tag taxonomy:**
- **Domain:** `web`, `data`, `messaging`, `cloud`, `ui`, `testing`, `observability`, `security`, `ai-ml`, `devops`
- **Type:** `framework`, `library`, `pattern`, `tool`, `language`
- **Level:** `beginner`, `intermediate`, `advanced`

### 4.6 Contribution Guidelines

**File:** `CONTRIBUTING.md`

**Contents:**
- Skill template (required frontmatter fields, section structure)
- Minimum quality requirements (code examples, guidance depth)
- Review checklist
- How to propose new skills
- How to upgrade a skill to `.agents/` format
- Style guide (tabs, usings, naming conventions)

---

## Execution Order

For maximum impact with minimum effort, execute in this order:

```
Phase 1 (Week 1-2)
  1.3  Fix mardig -> markdig                          [5 min]
  1.4  Fix README marketplace path                    [5 min]
  1.5  Fix package.json main reference                [5 min]
  1.1  Standardize frontmatter (script + review)      [2-4 hours]
  1.2  Fill placeholder code (mcp, a2a, agent-fw)     [2-3 hours]
  1.6  Normalize web-design-guidelines                [1-2 hours]
  1.7  Standardize code style                         [1-2 hours]

Phase 2 (Week 3-5)
  2.1  Expand 7 setup-only skills                     [4-6 hours]
  2.3  Deprecate/update obsolete skills               [1-2 hours]
  2.2  Add comparative guidance (9 groups)             [3-4 hours]
  2.4  Deduplicate cheatsheet                         [1-2 hours]
  2.5  Improve top 20 Tier 2 skills                   [8-12 hours]

Phase 3 (Week 6-10)
  3.1  Create 6 critical missing skills               [6-8 hours]
  3.1  Create 10 high-value missing skills            [8-12 hours]
  3.2  First .agents upgrade (aspnet-best-practices)  [8-12 hours]
  3.2  Second .agents upgrade (testing)               [6-8 hours]
  3.2  Third .agents upgrade (ef-core)                [6-8 hours]

Phase 4 (Parallel with Phase 2-3)
  4.1  Frontmatter validation script                  [2-3 hours]
  4.2  Skill quality linter                           [2-3 hours]
  4.6  Contribution guidelines                        [1-2 hours]
  4.3  Skills index generation                        [2-3 hours]
  4.4  CI pipeline                                    [2-3 hours]
  4.5  Skill tags taxonomy                            [2-3 hours]
```

---

## Success Metrics

| Metric | Current | After Phase 1 | After Phase 2 | After Phase 4 |
|--------|---------|---------------|---------------|---------------|
| Skills with complete frontmatter | 27% | 100% | 100% | 100% |
| Skills at grade B or above | ~35% | ~40% | ~70% | ~70% |
| Skills with placeholder-only code | 3 | 0 | 0 | 0 |
| Overlap groups with comparison guidance | 0/9 | 0/9 | 9/9 | 9/9 |
| Missing critical skill gaps filled | 0/6 | 0/6 | 0/6 | 6/6 |
| Automated validation checks | 0 | 0 | 0 | 5+ |
| Skills in .agents format (.NET) | 0 | 0 | 0 | 3+ |
