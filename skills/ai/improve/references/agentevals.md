# AgentEvals

## Table of Contents

- [Use When](#use-when)
- [Core Shape](#core-shape)
- [Evaluator Types](#evaluator-types)
- [Authoring Workflow](#authoring-workflow)
- [Common Mistakes](#common-mistakes)
- [Sources](#sources)

## Use When

Use AgentEvals for the default eval contract. It is a declarative YAML specification for agent capabilities, intended to be portable, composable, extensible, and readable by humans and AI agents.

For install and environment setup, read [`install-eval-tools.md`](install-eval-tools.md).

Use `EVAL.yaml` when the eval needs:

- Explicit test cases and criteria.
- Deterministic custom checks.
- LLM-as-judge semantic grading.
- Rubrics, composite scoring, tool trajectory checks, field accuracy, or execution metrics.
- CI-friendly artifacts that can live beside code.

## Core Shape

Keep the main file named `EVAL.yaml` unless the repo already uses a clearer convention.

```yaml
name: support-agent-regression
version: "1.0"
description: Evaluates support agent response quality
metadata:
  owner: support-platform
  tags: [support, regression]
execution:
  target: default
assert:
  - name: factuality
    type: llm_judge
    prompt: ./prompts/factuality.md
  - name: deterministic-order-id
    type: code_judge
    script: ./graders/order-id.js
tests:
  - id: delayed-order
    criteria: Agent helps the user track a delayed order without fabricating status.
    input:
      - role: user
        content: "My order 12345 has not arrived after two weeks. Help me."
    expected_output: "An empathetic response that offers to check order 12345 and gives next steps."
    assert:
      - name: mentions-order-id
        type: code_judge
        script: ./graders/order-id.js
```

Prefer per-test assertions when a test needs specialized checks. Prefer top-level `assert` entries when the evaluator should apply broadly across the suite.

## Evaluator Types

| Type | Use for |
|---|---|
| `code_judge` | Deterministic scripts, exact string/JSON/path/tool checks |
| `llm_judge` | Semantic quality, tone, groundedness, answer usefulness |
| `rubric` | Weighted criteria and object-level rubric scoring |
| `composite` | Combining several evaluator signals into one verdict |
| `tool_trajectory` | Validating tool use sequence or required tool calls |
| `field_accuracy` | Checking structured fields against references |
| `execution_metrics` | Latency, cost, token, or runtime budget checks |

AgentV documentation sometimes shows hyphenated grader labels in integration examples. When authoring AgentEvals directly, use the current AgentEvals schema names and validate with the installed AgentV version.

## Authoring Workflow

1. Name the target behavior and owner.
2. Write tests from user-visible failures, not from implementation branches.
3. Add deterministic checks first for exact, cheap criteria.
4. Add LLM judges only where exact checks cannot express quality.
5. Keep grader scripts small and stable; they should read inputs and return structured scores or verdicts.
6. Run AgentV validation or the bundled `improve-cli.ts lint <path> --agentevals` before running expensive evals.
7. Store results and compare against a baseline before claiming a regression is fixed.

## Common Mistakes

- Creating one broad judge prompt that hides individual failure reasons.
- Hardcoding one incident instead of adding a generalized detector and adjacent regression cases.
- Skipping `EVAL.yaml` because a unit test or prompt snapshot already exists.
- Treating LLM judge output as deterministic without temperature, prompt, and model control.
- Forgetting to validate referenced prompt, grader, or fixture paths.

## Sources

- AgentEvals overview: https://agentevals.io/
- AgentEvals specification overview: https://agentevals.io/specification/overview/
- AgentEvals evaluator reference: https://agentevals.io/specification/overview/
