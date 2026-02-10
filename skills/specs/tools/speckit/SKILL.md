---
name: speckit
description: |
    Use when setting up or using GitHub Spec Kit for spec-driven development — where specifications define the "what" before the "how." Covers slash commands for constitution definition, specification generation, clarification, implementation planning, task breakdown, analysis, and implementation execution.
    USE FOR: spec-driven development, GitHub Spec Kit setup, speckit slash commands, constitution definition, specification generation, implementation planning, task breakdown
    DO NOT USE FOR: writing specifications manually (use prd, trd, or brd), creating diagrams (use diagramming sub-skills), test automation (use gherkin or gauge)
license: MIT
metadata:
  displayName: "GitHub Spec Kit"
  author: "Tyler-R-Kendrick"
compatibility: claude, copilot, cursor
---

# GitHub Spec Kit

## Overview
GitHub Spec Kit is a spec-driven development toolkit where specifications define the "what" before the "how." It provides a set of slash commands that guide AI-assisted development workflows through a structured pipeline — from defining project principles, through specification and planning, to implementation. Rather than generating code in a single shot, Spec Kit enforces a multi-step refinement process that produces richer, more accurate results.

## Installation

```bash
# Initialize Spec Kit in an existing project
npx speckit init

# Or install via pip (uv recommended for speed)
pip install speckit
```

After initialization, Spec Kit installs its slash commands into your project's agent configuration folder (`.claude/`, `.github/prompts/`, `.cursor/`, etc.) so they are available directly in your AI coding tool.

## Core Slash Commands

Spec Kit provides a suite of slash commands that form a complete spec-driven development pipeline:

| Command | Purpose |
|---------|---------|
| `/speckit.constitution` | Define non-negotiable project principles and guardrails |
| `/speckit.specify` | Build a specification document from a prompt |
| `/speckit.clarify` | Ask clarification questions on the specification |
| `/speckit.plan` | Create a technical implementation plan from the spec |
| `/speckit.tasks` | Break the plan into individual tasks with dependencies |
| `/speckit.analyze` | Scan spec, plan, and tasks for inconsistencies |
| `/speckit.checklist` | Create a verification checklist ("unit tests for English") |
| `/speckit.implement` | Execute all tasks and build the feature |

### `/speckit.constitution`
Defines the non-negotiable principles and guardrails for your project. The constitution acts as a persistent set of constraints that all subsequent commands respect — coding standards, architectural boundaries, security requirements, and organizational policies.

### `/speckit.specify`
Takes a natural-language prompt and builds a structured specification document. The spec captures intent, requirements, constraints, and acceptance criteria in a format that downstream commands can consume.

### `/speckit.clarify`
Reviews the current specification and generates targeted clarification questions. Use this to identify ambiguities, missing edge cases, and unstated assumptions before moving to planning.

### `/speckit.plan`
Transforms the specification into a technical implementation plan. The plan outlines the architecture, component structure, data flows, and integration points needed to satisfy the spec.

### `/speckit.tasks`
Breaks the implementation plan into discrete, actionable tasks. Each task includes dependency information, parallel execution markers, affected file paths, and TDD considerations so work can be distributed and tracked.

### `/speckit.analyze`
Scans the specification, plan, and tasks for inconsistencies, gaps, and contradictions. Acts as a quality gate before implementation to catch misalignments early.

### `/speckit.checklist`
Generates a verification checklist — essentially "unit tests for English." Each checklist item maps back to a specification requirement so you can confirm every requirement is addressed before and after implementation.

### `/speckit.implement`
Executes all tasks from the task breakdown and builds the feature. This is the final step where specifications become working code, guided by the constitution, plan, and task definitions.

## Workflow

The recommended Spec Kit workflow follows a linear pipeline with optional feedback loops:

```
Constitution → Specify → Clarify → Plan → Tasks → Analyze → Implement
     │                     ▲                          │
     │                     │                          │
     │                     └──── (refine if needed) ──┘
     │
     └── Persistent guardrails applied to every step
```

1. **Constitution** — Establish project principles and guardrails once; they persist across all commands.
2. **Specify** — Describe what you want to build; Spec Kit produces a structured specification.
3. **Clarify** — Review the spec for ambiguities and fill in gaps.
4. **Plan** — Generate a technical implementation plan from the refined spec.
5. **Tasks** — Break the plan into individual, trackable tasks with dependencies.
6. **Analyze** — Validate consistency across the spec, plan, and tasks.
7. **Implement** — Execute the tasks and produce working code.

## Spec-Driven Development Principles

Spec Kit is built on a set of core principles that distinguish spec-driven development from ad-hoc code generation:

- **Intent-driven** — Specifications define the "what" before the "how." Implementation decisions are deferred until the requirements are clear and validated.
- **Rich specifications** — Guardrails (constitutions) and organizational principles ensure generated specs are grounded in real project constraints, not generic boilerplate.
- **Multi-step refinement** — Rather than one-shot code generation, the workflow passes through multiple stages of clarification, planning, and analysis. Each step refines the output of the previous one.
- **Executable specifications** — Specifications are not shelf-ware. They directly generate implementation plans, task breakdowns, and working code, closing the loop between documentation and delivery.
- **Consistency validation** — The analyze step acts as a quality gate, ensuring the specification, plan, and tasks remain aligned before any code is written.

## File Structure

After running `speckit init`, commands are installed into your project's agent configuration folder based on the detected environment:

```
your-project/
├── .claude/
│   └── commands/           # Claude Code slash commands
│       ├── speckit.constitution.md
│       ├── speckit.specify.md
│       ├── speckit.clarify.md
│       ├── speckit.plan.md
│       ├── speckit.tasks.md
│       ├── speckit.analyze.md
│       ├── speckit.checklist.md
│       └── speckit.implement.md
├── .github/
│   └── prompts/            # GitHub Copilot prompt files
├── .cursor/
│   └── prompts/            # Cursor prompt files
└── ...
```

The exact folder structure depends on which AI tools are detected in your project. Spec Kit adapts its installation to the tools you use.

## Integration

Spec Kit works with multiple AI coding tools:

| Tool | Integration Method |
|------|-------------------|
| **Claude Code** | Slash commands installed in `.claude/commands/` |
| **GitHub Copilot** | Prompt files installed in `.github/prompts/` |
| **Cursor** | Prompt files installed in `.cursor/prompts/` |

All integrations provide the same slash command interface, so the workflow is consistent regardless of which AI tool you use.

## Best Practices
- Always start with `/speckit.constitution` to establish guardrails before writing any specifications — it prevents drift and ensures consistency across features.
- Run `/speckit.clarify` at least once before planning — the cheapest time to find ambiguity is before implementation begins.
- Use `/speckit.analyze` as a quality gate before `/speckit.implement` — catching inconsistencies in text is far cheaper than catching them in code.
- Keep your constitution updated as project standards evolve — it is a living document, not a one-time setup.
- Commit generated specs, plans, and task breakdowns to version control so the rationale behind implementation decisions is preserved alongside the code.
- Use `/speckit.checklist` to create verification criteria before implementation — it gives you a concrete definition of "done" for every requirement.
