# Workspace Contracts and CLI

## Table of Contents

- [CLI Commands](#cli-commands)
- [AgentEvals Contract](#agentevals-contract)
- [Agent Skills Contract](#agent-skills-contract)
- [ASSERT Contract](#assert-contract)
- [Lint Rules](#lint-rules)
- [Exit Codes](#exit-codes)

## CLI Commands

The bundled CLI is dependency-free TypeScript for Node 24+:

For baseline runtime setup, read [`environment-setup.md`](environment-setup.md). For native AgentV, Agent Skills, or ASSERT installs, read [`install-eval-tools.md`](install-eval-tools.md).

```bash
node skills/ai/improve/scripts/improve-cli.ts eval evals/support-agent --agentevals --json
node skills/ai/improve/scripts/improve-cli.ts lint evals/support-agent --agentevals --json
```

Use `--spec` to pass an AI-produced JSON object or a path to a JSON file:

```bash
node skills/ai/improve/scripts/improve-cli.ts eval skills/ai/csv-analyzer \
  --agent-skills \
  --spec '{"input":"Analyze the CSV","expectedOutput":"A ranked result"}' \
  --json
```

## AgentEvals Contract

Generated starter structure:

```text
EVAL.yaml
prompts/quality.md
graders/deterministic-check.js
fixtures/input.txt
```

Lint expects:

- `EVAL.yaml` exists.
- `name:`, `tests:`, and `assert:` are present.
- Relative prompt, script, and fixture references exist.
- Test IDs are not duplicated.

Native validation should still be run with AgentV when installed.

## Agent Skills Contract

Generated starter structure:

```text
evals/evals.json
evals/files/input.txt
<suite>-workspace/.gitignore
<suite>-workspace/iteration-1/benchmark.json
```

Lint expects:

- `skill_name` is non-empty.
- `evals[]` contains at least one case.
- Every case has `id`, `prompt`, `expected_output`, and `assertions[]`.
- `files[]` entries are relative and resolve from the skill root.
- Eval IDs are not duplicated.

## ASSERT Contract

Generated starter structure:

```text
eval_config.yaml
artifacts/results/.gitignore
artifacts/results/<suite>/demo-1/.gitkeep
```

Lint expects:

- `eval_config.yaml` exists.
- `suite:`, `run:`, `behavior:`, `pipeline:`, `systematize:`, `test_set:`, `inference:`, and `judge:` are present.
- Result directory exists or the linter reports a warning.

The generated `.gitignore` files keep starter benchmark and placeholder files while ignoring native run outputs, scores, traces, and expanded result datasets.

The linter does not validate provider credentials, target callables, model availability, or ASSERT schema versions.

For ASSERT as an improvement gate rather than a standalone eval standard, use the improvement workspace contract in [`workspace-contracts.md`](workspace-contracts.md). That mode nests the config under `assert/` and adds `behavior-spec.md`, `trace-gates.json`, and a runbook for baseline-vs-candidate comparison.

## Lint Rules

The bundled linter verifies structure, not semantic quality. It catches missing primary files, invalid JSON, missing required fields, duplicate IDs, absolute fixture paths, and missing referenced files.

Use standard-native validation for the final gate:

```bash
agentv validate EVAL.yaml
agentv eval evals/evals.json --target claude
assert-ai run --config eval_config.yaml
```

## Exit Codes

| Code | Meaning |
|---|---|
| `0` | Success or lint with no errors |
| `1` | Lint errors or unexpected runtime failure |
| `2` | CLI usage error |
