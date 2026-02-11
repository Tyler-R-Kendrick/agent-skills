# Agent Skills

## Overview
Agent Skills is an open standard from Anthropic for packaging reusable capabilities that AI agents can discover and load dynamically. A skill is a directory containing a `SKILL.md` file with YAML frontmatter metadata and Markdown instructions. Adopted by Claude, VS Code Copilot, OpenAI Codex, Cursor, and 25+ platforms.

## Skill Structure
```
my-skill/
  SKILL.md          # Required — metadata + instructions
  scripts/          # Optional — executable scripts
  references/       # Optional — reference documents
  assets/           # Optional — supporting files
```

## SKILL.md Format
```markdown
---
name: my-skill
description: "Use when working with My Framework to follow best practices."
license: MIT
metadata:
  displayName: "My Skill"
  category: frameworks
  author: your-name
compatibility:
  - claude
  - copilot
allowed-tools:
  - Bash
  - Read
  - Edit
---

# My Skill

## Overview
Instructions for the agent when this skill is activated...

## Best Practices
- Concrete guidance the agent should follow
- Code examples demonstrating correct usage
```

## Required Frontmatter
| Field | Type | Rules |
|-------|------|-------|
| `name` | string | Must match directory name. Lowercase, hyphens, digits only. Max 64 chars. |
| `description` | string | What the skill does and when to trigger it. |

## Optional Frontmatter
| Field | Type | Description |
|-------|------|-------------|
| `license` | string | SPDX identifier (e.g., `MIT`, `Apache-2.0`) |
| `metadata` | object | Arbitrary key-value pairs (category, author, tags) |
| `compatibility` | list | Target platforms |
| `allowed-tools` | list | Tools the skill may use |

## Description Best Practices
The `description` field is critical for discovery — agents use it to decide when to activate the skill:
- Start with a trigger phrase: "Use when working with X…"
- Be specific: "Use when configuring ASP.NET Core middleware" not "Web development skill"
- Keep it under 200 characters

## Content Guidelines
- Keep the main SKILL.md under 500 lines (~5000 tokens)
- Use concrete code examples, not abstract descriptions
- Include "do this, not that" guidance
- Structure with clear headings for scanability

## Validation
```bash
# Install the validator
pip install skills-ref

# Validate a skill
agentskills validate path/to/my-skill

# Read properties as JSON
agentskills read-properties path/to/my-skill

# Generate agent prompt XML
agentskills to-prompt path/to/my-skill
```

## Marketplace Publishing
Skills can be published to marketplace repositories:
```bash
# Add skills from a marketplace
npx skills add owner/repo

# List available skills
npx skills list owner/repo
```

The marketplace catalog is defined in `.claude-plugin/marketplace.json`.

## Best Practices
- One skill per concept — keep skills focused on a single framework, tool, or pattern.
- Use trigger phrases in descriptions so agents activate the skill at the right time.
- Validate with `agentskills validate` before publishing.
- Pin the skill name to the directory name — the validator enforces this.
- Include runnable code examples that agents can adapt, not just documentation.
- Keep instructions actionable: "Do X when Y" rather than "X is a feature of Y."
