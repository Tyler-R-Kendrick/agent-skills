# BDD Cheatsheet

Guidance for Behavior-Driven Development (BDD) patterns and Gherkin syntax in .NET. USE FOR: writing Gherkin feature files, structuring Given-When-Then scenarios, creating scenario outlines with data tables, organizing BDD step definitions, mapping business requirements to executable specifications with Reqnroll or SpecFlow. DO NOT USE FOR: unit test design (use xUnit/NUnit directly), performance testing, API contract testing (use Pact), or end-to-end browser automation (use Playwright).

## Structure

| File | Purpose |
|------|---------|
| `SKILL.md` | Agent skill definition (frontmatter + instructions) |
| `metadata.json` | Machine-readable metadata and versioning |
| `AGENTS.md` | Agent-optimized quick reference (generated) |
| `README.md` | This file |
| `rules/` | 16 individual best practice rules |

## Usage

```bash
npx agentskills add Tyler-R-Kendrick/agent-skills/skills/dotnet/testing/bdd-cheatsheet
```

## License

MIT
