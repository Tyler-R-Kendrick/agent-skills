# Playwright

Guidance for Playwright browser automation and end-to-end testing in .NET. USE FOR: cross-browser end-to-end testing, UI automation, screenshot and visual regression testing, network request interception, mobile viewport emulation, testing SPAs and server-rendered pages, CI/CD browser testing in headless mode. DO NOT USE FOR: unit testing (use xUnit with Moq), API contract testing (use Pact), load testing (use k6 or NBomber), or testing non-web applications.

## Structure

| File | Purpose |
|------|---------|
| `SKILL.md` | Agent skill definition (frontmatter + instructions) |
| `metadata.json` | Machine-readable metadata and versioning |
| `AGENTS.md` | Agent-optimized quick reference (generated) |
| `README.md` | This file |
| `rules/` | 15 individual best practice rules |

## Usage

```bash
npx agentskills add Tyler-R-Kendrick/agent-skills/skills/dotnet/testing/playwright
```

## License

MIT
