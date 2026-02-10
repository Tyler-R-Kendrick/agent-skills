# AGENTS.md — Contributor Guidance

Guidance for AI agents and human contributors working in this repository.

## Skill Structure

Each skill is a directory containing a `SKILL.md` file. The file has two parts:

1. **YAML frontmatter** (between `---` fences) with metadata
2. **Markdown body** with the skill content (instructions, rules, examples)

### Minimal example

```markdown
---
name: my-skill
description: "Use when working with My Framework to follow best practices."
---

# My Skill

Instructions for the agent…
```

### Full example

```markdown
---
name: my-skill
description: "Use when working with My Framework to follow best practices."
license: MIT
metadata:
  category: frameworks
  author: your-name
compatibility:
  - claude
allowed-tools:
  - Bash
  - Read
  - Edit
---

# My Skill

Detailed instructions…
```

## Required Frontmatter Fields

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Unique skill identifier. Must match the directory name. |
| `description` | string | What the skill does and when to use it. |

## Optional Frontmatter Fields

| Field | Type | Description |
|-------|------|-------------|
| `license` | string | SPDX license identifier |
| `metadata` | object | Arbitrary key-value pairs (category, author, tags, etc.) |
| `compatibility` | list | Target platforms / runtimes |
| `allowed-tools` | list | Tools the skill is permitted to use |

## Naming Rules

- **Lowercase letters, hyphens, and digits only** (e.g., `aspnet-core`, `blazor`)
- **Maximum 64 characters**
- **Must match the directory name** — the `name` field in frontmatter and the containing directory must be identical
- No underscores, spaces, or uppercase letters

## Description Best Practices

- Start with a **trigger phrase**: "Use when working with X…" or "Use when the user asks about Y…"
- Use multi-line YAML format (`|`) for descriptions over 200 characters
- Keep total description under 1024 characters
- Include **USE FOR:** trigger phrases (3-5 per skill)
- Include **DO NOT USE FOR:** anti-triggers that redirect to sibling skills
- Be specific about when the skill should activate so discovery works well

### Description Template

```yaml
description: |
    Use when [doing X with Y]. Covers [topic1], [topic2], and [topic3].
    USE FOR: [trigger1], [trigger2], [trigger3], [trigger4]
    DO NOT USE FOR: [scenario] (use other-skill), [scenario] (use another-skill)
```

## Directory Layout

### Standard skills — `skills/`

```
skills/
  dotnet/
    aspnet-core/
      SKILL.md
    blazor/
      SKILL.md
```

### Advanced skills — `.agents/skills/`

Advanced skills use the `.agents/skills/` directory and can include additional structure:

```
.agents/
  skills/
    my-advanced-skill/
      AGENTS.md
      rules/
        rule-set-1.md
        rule-set-2.md
```

## Subdirectory Discovery Limitations

Claude discovers skills by scanning for `SKILL.md` files in the configured scan path. Important limitations:

- **Nested subdirectories are NOT recursively discovered** unless each intermediate directory contains its own `SKILL.md`
- A **flat layout** under each parent skill directory is the reliable approach
- If you need grouping (like `skills/dotnet/`), the grouped skills should each have their own `SKILL.md` directly in their directory

For example, `skills/dotnet/aspnet-core/SKILL.md` is discovered because the scanner finds `SKILL.md` files. But a deeply nested path like `skills/dotnet/web/api/my-skill/SKILL.md` may not be discovered unless intermediate directories are set up correctly.

## Quality & Compliance

When creating or improving skills, use the installed agent skills in `.agents/skills/` to ensure quality:

1. **sensei** — Run sensei on new or existing skills to improve frontmatter compliance. Sensei iteratively checks description length, trigger phrases (USE FOR), anti-triggers (DO NOT USE FOR), and token budgets using the Ralph loop pattern. Target score: **Medium-High** or better.
2. **skill-authoring** — Follow the skill authoring guidelines for structure, token budgets, progressive disclosure, and reference loading patterns.
3. **agentskills validate** — Run the validator to check frontmatter schema, naming, and file structure.

### Compliance Scoring (from sensei)

| Score | Requirements |
|-------|--------------|
| **Low** | Description < 150 chars, no triggers, no anti-triggers |
| **Medium** | Description > 150 chars, has trigger keywords |
| **Medium-High** | Has explicit `USE FOR:` triggers AND `DO NOT USE FOR:` anti-triggers |
| **High** | Triggers + anti-triggers + `compatibility` field |

### Workflow for Creating Skills

1. Author the `SKILL.md` with frontmatter and content
2. Run sensei to improve compliance to Medium-High or better
3. Run `agentskills validate` to check schema compliance
4. Validate the skill passes both checks before committing

## Validation

Before submitting a new skill or modifying an existing one, validate it:

```bash
# Validate a single skill
agentskills validate skills/dotnet/aspnet-core

# Validate all skills
npm run validate
```

### Install the validator

```bash
pip install -r requirements.txt
```

The `skills-ref` package checks:
- Frontmatter schema (required and optional fields, types)
- Naming conventions (lowercase, hyphens, length, directory match)
- File structure
