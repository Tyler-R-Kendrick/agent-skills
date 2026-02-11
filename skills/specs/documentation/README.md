# Documentation & Requirements

Use when writing or structuring software specifications, requirements documents, and architecture decision records. Covers PRDs, TRDs, BRDs, ADRs, RFCs, and executable spec formats.

## Structure

| File | Purpose |
|------|---------|
| `SKILL.md` | Agent skill definition (frontmatter + instructions) |
| `metadata.json` | Machine-readable metadata and versioning |
| `AGENTS.md` | Agent-optimized quick reference (generated) |
| `README.md` | This file |
| `rules/` | 6 individual best practice rules |

## Sub-skills

| Skill | Description |
|-------|-------------|
| [`adr/`](adr/) | Use when writing Architecture Decision Records to capture significant technical decisions with their context, rationale,... |
| [`brd/`](brd/) | Use when writing Business Requirements Documents that justify why a project should be undertaken. Covers executive summa... |
| [`gauge/`](gauge/) | Use when writing markdown-based test specifications with the Gauge framework (ThoughtWorks). Covers specification files,... |
| [`gherkin/`](gherkin/) | Use when writing Behavior-Driven Development specifications in Gherkin syntax. Covers Feature files, Scenario/Scenario O... |
| [`prd/`](prd/) | Use when writing Product Requirements Documents that define what to build and why. Covers problem statements, goals/non-... |
| [`rfc/`](rfc/) | Use when writing RFC (Request for Comments) design documents to propose significant technical changes for team review an... |
| [`trd/`](trd/) | Use when writing Technical Requirements Documents that define how to build a system. Covers system architecture, API spe... |

## Usage

```bash
npx agentskills add Tyler-R-Kendrick/agent-skills/skills/specs/documentation
```

## License

MIT
