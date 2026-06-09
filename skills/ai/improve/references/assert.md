# ASSERT

## Table of Contents

- [Use When](#use-when)
- [Core Idea](#core-idea)
- [Config Shape](#config-shape)
- [Improvement Gate](#improvement-gate)
- [Trace and Evolution Inputs](#trace-and-evolution-inputs)
- [Pipeline Artifacts](#pipeline-artifacts)
- [Run Pattern](#run-pattern)
- [CLI Workspace](#cli-workspace)
- [Caveats](#caveats)
- [Sources](#sources)

## Use When

Use ASSERT when the eval begins from a product requirement, policy, system prompt, safety case, or launch criterion and needs trace-aware scoring. It is strongest when the target is an agent or multi-agent system whose intermediate tool calls, routing, and model calls matter.

For install and environment setup, read [`install-eval-tools.md`](install-eval-tools.md).

Do not use ASSERT as the default for ordinary output-quality regression tests. Use AgentEvals unless the requirements/specification and trace-aware behavior categories are central.

Use ASSERT as an improvement technique when the user asks to evolve prompts, agents, workflows, or skills against product requirements, generated behavior taxonomies, policy dimensions, or trace-grounded judge evidence.

## Core Idea

ASSERT is Adaptive Spec-driven Scoring for Evaluation and Regression Testing. Its pipeline turns natural-language behavior specs into behavior categories, generated prompts/scenarios, target inferences, and judge scores with local artifacts.

It is local-first and framework-agnostic. The recommended non-trivial agent integration uses OpenTelemetry/OpenInference traces so judges can cite behavior evidence beyond final text.

## Config Shape

The main authored file is `eval_config.yaml`.

```yaml
suite: travel-planner-langgraph-v1
run: demo-1
behavior:
  name: travel_planner_eval
  description: |-
    A travel planning AI must use tools, respect constraints, avoid fabricated details,
    and resist unsafe or injected instructions.
context: |-
  The target is a multi-tool planning agent.
default_model:
  name: azure/gpt-4o-mini
pipeline:
  systematize:
    behavior_category_count: 6
  test_set:
    prompt:
      sample_size: 5
  inference:
    concurrency: 1
    target:
      callable: examples.travel_planner_langgraph.auto_trace:chat_sync
      trace:
        backend: phoenix
  judge:
    preset: safety-core
```

Use current ASSERT docs for exact target and model fields. The config format is young enough that local CLI help and examples should be treated as authoritative.

## Improvement Gate

ASSERT does not rewrite the candidate artifact by itself. Use it as a spec-driven gate inside an improvement loop:

1. Write or preserve the behavior spec in `behavior.description` and `context`.
2. Generate or review the taxonomy before accepting it as the policy surface.
3. Run the baseline target and candidate target against the same generated test set.
4. Compare `metrics.json` and `scores.jsonl` by behavior category and judge dimension.
5. Accept the candidate only when the target dimensions improve or remain clean and protected categories do not regress.

Pair ASSERT with:

| Pairing | Use when |
|---|---|
| ASSERT + VISTA | Need auditable hypotheses and a spec-grounded verification gate |
| ASSERT + GEPA | Need prompt/skill text candidates but policy categories must gate adoption |
| ASSERT + Trace | Need tool/routing/model-call evidence to diagnose the failing behavior |
| ASSERT + SkillOpt | Need reusable skill evolution while preserving held-out requirement gates |
| ASSERT + Agent Lightning | Need reward shaping that includes policy and regression penalties |

## Trace and Evolution Inputs

ASSERT can extend the evidence surface for improvement by converting requirements into structured cases and trace-grounded verdicts:

| ASSERT artifact | Improvement use |
|---|---|
| `taxonomy.json` | Names behavior categories, permissible behavior, and impermissible behavior |
| `test_set.jsonl` | Supplies generated single-turn and multi-turn regression scenarios |
| `inference_set.jsonl` | Captures target outputs plus trace references or trace events |
| `scores.jsonl` | Gives per-case judge dimensions, rationales, and evidence |
| `metrics.json` | Provides aggregate rates by dimension/category for baseline vs candidate comparison |

Use `assert-ai judge-traces` when traces already exist and you want trace-grounded scoring without rerunning target inference.

## Pipeline Artifacts

ASSERT writes local artifacts under `artifacts/results/<suite>/<run>/`.

| Artifact | Meaning |
|---|---|
| `taxonomy.json` | Behavior taxonomy from systematization |
| `test_set.jsonl` | Generated prompts and scenarios |
| `inference_set.jsonl` | Per-scenario traces and target outputs |
| `scores.jsonl` | Judge verdicts, rationale, and cited evidence |
| `metrics.json` | Aggregate roll-up |

## Run Pattern

Typical commands:

```bash
pip install assert-ai
assert-ai run --config eval_config.yaml
assert-ai results status <suite> <run>
```

From a checked-out ASSERT repo or example workspace, the docs also show editable installs with extras:

```bash
python -m pip install -e ".[otel,langgraph]"
assert-ai run --config examples/travel_planner_langgraph/eval_config.yaml
```

Use `assert-ai init` when the user wants a conversational assistant to draft a config from a description and model.

Judge pre-collected traces:

```bash
assert-ai judge-traces --traces traces.jsonl --config eval_config.yaml
```

Compare runs:

```bash
assert-ai results compare <suite> <baseline-run> <candidate-run>
```

## CLI Workspace

Use the bundled CLI for deterministic improvement workspaces:

```bash
node skills/ai/improve/scripts/improve-cli.ts improve . --assert --vista --out improve/support-agent-assert --json
node skills/ai/improve/scripts/improve-cli.ts lint improve/support-agent-assert --json
```

Generated improvement workspace:

```text
assert/
  eval_config.yaml
  behavior-spec.md
  trace-gates.json
  runbook.md
  artifacts/results/.gitignore
  artifacts/results/<suite>/demo-1/.gitkeep
```

The workspace is structural. The results folder keeps placeholders but ignores native ASSERT scores, traces, generated test sets, and metrics unless they are deliberately curated elsewhere. Native ASSERT runs still require a real target callable/model, provider credentials, and review of generated adversarial or stress cases before using them against systems with side effects.

## Caveats

- Keep provider credentials and telemetry destinations explicit; local artifacts may still contain prompts, responses, traces, and metadata.
- Phoenix is optional for visual trace inspection; the eval can run without the UI if trace data is captured locally.
- Do not collapse distinct failure dimensions into one aggregate score when the policy requires separate safety and quality signals.
- Preserve the natural-language behavior spec and generated taxonomy as release evidence.
- Treat generated scenarios and LLM judge labels as reviewable signals, not a compliance certification.
- Run ASSERT against isolated targets with restricted credentials; generated scenarios can trigger real tool or workflow side effects.

## Sources

- ASSERT repository: https://github.com/responsibleai/ASSERT
- ASSERT README: https://github.com/responsibleai/ASSERT/blob/main/README.md
- ASSERT getting started: https://github.com/responsibleai/ASSERT/blob/main/docs/getting-started.md
- ASSERT concepts: https://github.com/responsibleai/ASSERT/blob/main/docs/concepts.md
- ASSERT config overview: https://github.com/responsibleai/ASSERT/blob/main/docs/config/overview.md
- ASSERT CLI commands: https://github.com/responsibleai/ASSERT/blob/main/docs/cli/commands.md
- ASSERT results guide: https://github.com/responsibleai/ASSERT/blob/main/docs/guides/results.md
- ASSERT project docs: https://responsibleai.github.io/ASSERT/
- ASSERT PyPI package: https://pypi.org/project/assert-ai/
- Command Line ASSERT article: https://commandline.microsoft.com/assert-written-intent-executable-evals/
