# agent-skills

My personal agent-skills marketplace.

## Overview

This repository serves as a marketplace for agent skills that can be discovered and installed using the [Agent Skills](https://agentskills.io/specification) open standard.

## Usage

To pull down skills from this marketplace, use:

```bash
npx skills add Tyler-R-Kendrick/agent-skills
```

Or to list available skills:

```bash
npx skills list Tyler-R-Kendrick/agent-skills
```

## Structure

```
.claude-plugin/
  marketplace.json        # Marketplace configuration / catalog
skills/
  dotnet/                 # .NET ecosystem skills (aspnet-core, blazor, …)
.agents/
  skills/                 # Advanced skills (AGENTS.md + rules/ pattern)
scripts/
  validate.sh             # Build / validation script
package.json
requirements.txt          # Python dependencies (skills-ref)
AGENTS.md                 # Contributor guidance for AI agents and humans
```

## Adding Skills

Skills live under the `skills/` directory. Each skill is a directory containing a `SKILL.md` file with required YAML frontmatter (`name`, `description`) and Markdown body content. See [AGENTS.md](AGENTS.md) for full authoring guidance.

## Build / Validation

Skills are validated against the Agent Skills specification using the [`skills-ref`](https://pypi.org/project/skills-ref/) Python package.

### Prerequisites

- Python 3.11+
- Install dependencies:

```bash
pip install -r requirements.txt
```

### Running validation

Validate all skills:

```bash
npm run validate
# or
bash scripts/validate.sh
```

Validate a single skill:

```bash
agentskills validate skills/dotnet/aspnet-core
# or
bash scripts/validate.sh skills/dotnet/aspnet-core
```

### npm scripts

| Script | Description |
|--------|-------------|
| `npm run validate` | Validate all SKILL.md files |
| `npm test` | Alias for validate |

## License

MIT
