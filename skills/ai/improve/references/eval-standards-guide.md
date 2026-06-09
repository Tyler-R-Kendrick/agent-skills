# Eval Standards Guide

## Table of Contents

- [Default Rule](#default-rule)
- [Selection Matrix](#selection-matrix)
- [Conversion Paths](#conversion-paths)
- [Artifact Expectations](#artifact-expectations)
- [Sources](#sources)

## Default Rule

Use AgentEvals `EVAL.yaml` and AgentV for new evals unless the user asks for another standard. This keeps evaluator wiring, custom judges, rubrics, targets, and result tracking in one version-controlled contract.

For native tool installation and environment setup, read [`install-eval-tools.md`](install-eval-tools.md).

Choose another standard only when:

- The user asks for Agent Skills `evals.json`, ASSERT, or a named existing standard.
- The repo already contains canonical eval artifacts for that standard.
- The eval's purpose is better served by that standard's native workflow.

## Selection Matrix

| Need | Standard | Why |
|---|---|---|
| General agent or LLM output quality gates | AgentEvals | Declarative `EVAL.yaml`, portable tests, explicit evaluators |
| AgentV CLI, TypeScript SDK, compare/trend tooling | AgentEvals via AgentV | AgentV is the canonical implementation and runs locally |
| Skill authoring feedback loops with baseline comparisons | Agent Skills evals | Native `evals/evals.json`, with-skill vs without-skill workflow |
| Convert a skill eval into richer graders | Agent Skills evals -> AgentEvals | AgentV converts `evals.json` into EVAL YAML |
| Requirements, policy, safety, and trace-grounded behavior checks | ASSERT | Spec-driven generation, trace-aware judgment, local JSON/JSONL artifacts |
| Baseline-vs-candidate improvement gates from requirements and traces | ASSERT as improvement technique | Use `assert/` workspace artifacts, trace gates, and run comparisons |

## Conversion Paths

- Agent Skills `evals.json` -> AgentEvals: use `agentv convert evals/evals.json --out EVAL.yaml`, then add deterministic graders, workspace isolation, rubrics, or target matrices.
- AgentEvals -> JSONL: use AgentV conversion when large-scale processing or dataset interchange is needed.
- ASSERT -> AgentEvals: no direct standard conversion is assumed. Translate requirements into AgentEvals tests only after preserving ASSERT dimensions, trace requirements, and policy categories.

## Artifact Expectations

| Standard | Primary authored artifact | Generated or runtime artifacts |
|---|---|---|
| AgentEvals | `EVAL.yaml` | AgentV result JSON/JSONL/YAML, compare/trend reports |
| Agent Skills evals | `evals/evals.json` | `grading.json`, `timing.json`, `benchmark.json`, `feedback.json` |
| ASSERT | `eval_config.yaml` | `taxonomy.json`, `test_set.jsonl`, `inference_set.jsonl`, `scores.jsonl`, `metrics.json` under `artifacts/results/<suite>/<run>/` |

## Sources

- AgentEvals: https://agentevals.io/
- AgentEvals specification overview: https://agentevals.io/specification/overview/
- AgentV docs: https://agentv.dev/docs/
- AgentV Agent Skills evals integration: https://agentv.dev/docs/integrations/agent-skills-evals/
- AgentV convert docs: https://agentv.dev/docs/tools/convert/
- Agent Skills evaluating skills: https://agentskills.io/skill-creation/evaluating-skills
- ASSERT repository: https://github.com/responsibleai/ASSERT
- ASSERT project docs: https://responsibleai.github.io/ASSERT/
