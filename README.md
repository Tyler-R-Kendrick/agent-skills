# agent-skills

My personal agent-skills marketplace.

## Overview

This repository serves as a marketplace for agent skills that can be discovered and installed using the Agent Skills open standard.

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

- `marketplace.json` - The marketplace configuration file that catalogs available agent skills
- `skills/` - Directory containing the agent skills

## Adding Skills

Skills can be added to the `skills/` directory and registered in the `marketplace.json` file following the [Agent Skills specification](https://agentskills.io/specification).

Each skill should have:
- A unique name
- A description
- Version information
- A source path
- Metadata including category, author, and other optional fields

## License

MIT
