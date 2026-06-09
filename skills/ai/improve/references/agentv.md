# AgentV

## Table of Contents

- [Use When](#use-when)
- [CLI Workflow](#cli-workflow)
- [TypeScript SDK](#typescript-sdk)
- [Agent Skills Conversion](#agent-skills-conversion)
- [Validation Notes](#validation-notes)
- [Sources](#sources)

## Use When

Use AgentV as the canonical implementation for AgentEvals. It is CLI-first, local, version-control friendly, and supports code graders, LLM graders, custom TypeScript/Python graders, rubrics, result comparison, and coding-agent targets.

For install and environment setup, read [`install-eval-tools.md`](install-eval-tools.md).

## CLI Workflow

Install and initialize from the current docs:

```bash
npm install -g agentv
agentv init
```

Run and compare evals:

```bash
agentv eval ./evals/support-agent/EVAL.yaml
agentv compare run-a run-b
```

For Agent Skills evals:

```bash
agentv eval evals/evals.json --target claude
agentv convert evals/evals.json --out EVAL.yaml
```

Use `agentv validate` when available in the installed version. If a local install uses different command names, prefer the installed CLI help over stale notes:

```bash
agentv --help
agentv validate --help
```

## TypeScript SDK

Read the AgentV TypeScript SDK docs when the task needs programmatic eval generation, custom providers, custom graders, or CI integration beyond CLI invocation:

https://agentv.dev/docs/

Use the SDK when:

- A repo needs evals generated from typed test fixtures.
- A custom target/provider must wrap a local CLI, API, or app server.
- A deterministic grader should be shared between runtime code and eval code.
- Results need typed post-processing before dashboards or CI gates.

## Agent Skills Conversion

AgentV natively supports Agent Skills `evals.json`. The conversion docs map:

| `evals.json` | AgentV / EVAL equivalent |
|---|---|
| `prompt` | `input` |
| `expected_output` | `expected_output` and criteria |
| `assertions[]` | assertion graders |
| `files[]` | file paths copied into workspace |
| `skill_name` | metadata |
| `id` | string test id |

After converting, improve the generated YAML with deterministic checks, rubrics, multi-turn inputs, workspace isolation, tool trajectory graders, or matrix targets as needed.

## Validation Notes

- Native AgentV validation catches tool-version and schema drift; run it before expensive evals.
- The bundled `scripts/improve-cli.ts lint <path> --agentevals` is structural only. It checks file shape and references, not semantic correctness.
- Keep result directories out of grader logic unless the standard explicitly requires them.
- Report the exact AgentV command and version used when evals are release evidence.

## Sources

- AgentV docs: https://agentv.dev/docs/
- AgentV home and install command: https://agentv.dev/
- AgentV Agent Skills integration: https://agentv.dev/docs/integrations/agent-skills-evals/
- AgentV convert docs: https://agentv.dev/docs/tools/convert/
