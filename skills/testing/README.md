# Testing Strategy

Use when choosing a testing strategy, right-sizing test coverage, or understanding test categories. Covers the Test Trophy model, test type tradeoffs, and guidance on balancing static analysis, unit, integration, and end-to-end tests.

## Structure

| File | Purpose |
|------|---------|
| `SKILL.md` | Agent skill definition (frontmatter + instructions) |
| `metadata.json` | Machine-readable metadata and versioning |
| `AGENTS.md` | Agent-optimized quick reference (generated) |
| `README.md` | This file |
| `rules/` | 11 individual best practice rules |

## Sub-skills

| Skill | Description |
|-------|-------------|
| [`acceptance-testing/`](acceptance-testing/) | Use for verifying business requirements with executable specifications using BDD frameworks. Covers Cucumber (Java, JS, ... |
| [`accessibility-testing/`](accessibility-testing/) | Use for WCAG compliance testing and assistive technology validation. Covers axe-core (programmatic API, Playwright/React... |
| [`api-testing/`](api-testing/) | Use for testing HTTP endpoints directly using cross-platform API testing tools. Covers .http files (VS Code REST Client,... |
| [`chaos-testing/`](chaos-testing/) | Use when designing or implementing chaos engineering experiments to verify system resilience under failure conditions. C... |
| [`contract-testing/`](contract-testing/) | Use when setting up or improving contract tests that verify API compatibility between services. Covers Pact (consumer-dr... |
| [`e2e-testing/`](e2e-testing/) | Use when writing, improving, or debugging end-to-end tests that verify full user flows through the real system. Covers P... |
| [`integration-testing/`](integration-testing/) | Use when writing or improving integration tests that verify multiple components working together. Covers Testcontainers,... |
| [`performance-testing/`](performance-testing/) | Use for load, stress, and scalability testing of applications and APIs. Covers k6 (Grafana), JMeter, Gatling, Artillery,... |
| [`static-analysis/`](static-analysis/) | Use when setting up or improving static analysis tooling — type checking, linting, security scanning (SAST), and code fo... |
| [`unit-testing/`](unit-testing/) | Use when writing, improving, or debugging unit tests that verify isolated functions, methods, and classes. Covers cross-... |
| [`visual-testing/`](visual-testing/) | Use for visual regression testing to catch unintended UI changes. Covers Chromatic (Storybook integration), Percy (Brows... |

## Usage

```bash
npx agentskills add Tyler-R-Kendrick/agent-skills/skills/testing
```

## License

MIT
