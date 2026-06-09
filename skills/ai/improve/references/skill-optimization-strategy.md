# Skill Optimization Strategy

## Table of Contents

- [Default Position](#default-position)
- [Progressive Disclosure Contract](#progressive-disclosure-contract)
- [Script-First Workflow Contract](#script-first-workflow-contract)
- [Agent Delegation Boundary](#agent-delegation-boundary)
- [When to Use Other Strategies](#when-to-use-other-strategies)
- [CLI Workspace](#cli-workspace)
- [Review Checklist](#review-checklist)

## Default Position

Default to progressive disclosure and deterministic workflow generation when optimizing an agent skill.

Treat `SKILL.md` as a table-of-contents/index page. It should route the calling agent with conditional access descriptors and link only to top-level reference docs. Detailed technique notes, install steps, examples, schemas, or deep links should live in the referenced markdown docs.

Use scripts to make as much of the workflow deterministic as possible. The calling agent should supply generated inputs, perform inference, and make contextual judgments; scripts should own stable file creation, schemas, structural checks, ordering, and artifact layout.

## Progressive Disclosure Contract

`SKILL.md` should contain:

- Frontmatter with specific triggers and anti-triggers.
- A short operating rule.
- A routing table of `IF task says... THEN read top-level reference`.
- A concise workflow.
- A script entrypoint.
- Final `## Best Practices`.

`SKILL.md` should not contain the majority of technical detail. It should not deep-link into second-order docs, external subsections, or nested artifacts. Each top-level reference should expose its own table of contents and deeper links when that context is actually needed.

## Script-First Workflow Contract

Prefer deterministic scripts for:

- Creating workspace folders and starter artifacts.
- Emitting machine-readable JSON results for AI-assisted specs.
- Checking expected files, relative references, required fields, duplicate IDs, and format drift.
- Recording order of operations.
- Producing stable JSON/YAML-like output with sorted keys and LF endings.
- Checking structural contracts before any model-based or subjective review.
- Orchestrating VISTA-style loops: deterministic state, prompts, minibatches, candidate files, verification files, and selection traces.

Avoid scripts for:

- Generating hidden conclusions that require contextual judgment.
- Calling models implicitly without user-visible configuration.
- Replacing the calling agent's responsibility to choose inputs, reason over traces, and interpret eval deltas.

## Agent Delegation Boundary

Delegate to scripts:

| Concern | Script-owned behavior |
|---|---|
| Order of operations | Deterministic commands, generated plans, and runbooks |
| Workspace layout | Required files, folders, references, and placeholders |
| Structural validation | Schemas, required files, duplicate IDs, relative paths |
| Repeatability | Stable output ordering and deterministic defaults |

Delegate to the calling agent:

| Concern | Agent-owned behavior |
|---|---|
| Generated inputs | Behavior specs, objectives, eval cases, trace observations, policy constraints |
| Inference | Model calls, reflective analysis, candidate generation, subjective judgment |
| Strategy override | User-specified standards or techniques that differ from the default |
| Acceptance reasoning | Whether evidence deltas justify promotion |

## When to Use Other Strategies

Use the default strategy unless the user explicitly requests a different skill architecture or optimization method.

Examples:

- If the user asks for a compact single-file skill, keep it small but still preserve clear conditional sections.
- If the target platform does not support references, embed the minimum viable detail and note the constraint.
- If the user wants a specific optimizer such as GEPA, SkillOpt, ASSERT, or Agent Lightning, use that method but keep the surrounding skill packaging progressive and script-backed.
- If a workflow cannot be made deterministic, keep the nondeterministic part explicit and make inputs, outputs, and acceptance gates deterministic.

VISTA in this skill follows that split: scripts own the loop and artifact contract, while agents supply hypothesis generation, rewrites, and verification judgments through generated prompt files.

## CLI Workspace

Initialize a workspace and inspect the default strategy:

```bash
node skills/ai/improve/scripts/improve-cli.ts init improve/support-skill --json
```

Create a skill-improvement workspace:

```bash
node skills/ai/improve/scripts/improve-cli.ts improve . --gepa --out improve/support-skill --json
```

The workspace includes:

```text
improve.plan.json
strategy/skill-optimization-contract.json
inputs/
vista/
candidates/
reports/
```

`strategy/skill-optimization-contract.json` records the default: `SKILL.md` as a table-of-contents/index page, only top-level references from `SKILL.md`, deeper links inside references, deterministic script-owned workflow logic, agent-supplied generated inputs, and agent-owned inference operations.

## Review Checklist

- `SKILL.md` reads like an index, not a manual.
- Every reference linked from `SKILL.md` is a top-level document in `references/`.
- Each reference document exposes deeper context through its own table of contents.
- Scripts generate or lint deterministic workflow artifacts.
- The calling agent remains responsible for generated inputs and inference-based decisions.
- The workflow preserves alternate user-specified standards and techniques.
