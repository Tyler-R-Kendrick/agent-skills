# Reqnroll

Guidance for Reqnroll BDD testing framework (SpecFlow successor) in .NET. USE FOR: behavior-driven development with Gherkin syntax, writing executable specifications, step definition bindings, scenario outlines with data tables, integrating BDD with xUnit/NUnit/MSTest, acceptance testing with natural language scenarios. DO NOT USE FOR: unit testing without BDD requirements (use xUnit directly), performance testing, API contract testing (use Pact), or browser automation (combine with Playwright).

## Structure

| File | Purpose |
|------|---------|
| `SKILL.md` | Agent skill definition (frontmatter + instructions) |
| `metadata.json` | Machine-readable metadata and versioning |
| `AGENTS.md` | Agent-optimized quick reference (generated) |
| `README.md` | This file |
| `rules/` | 14 individual best practice rules |

## Usage

```bash
npx agentskills add Tyler-R-Kendrick/agent-skills/skills/dotnet/testing/reqnroll
```

## License

MIT
