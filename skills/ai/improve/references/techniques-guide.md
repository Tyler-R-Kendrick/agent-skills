# Improvement Technique Guide

## Table of Contents

- [Default Rule](#default-rule)
- [Selection Matrix](#selection-matrix)
- [Pipeline Shape](#pipeline-shape)
- [Acceptance Criteria](#acceptance-criteria)
- [Sources](#sources)

## Default Rule

Default to a VISTA-style eval/trace improvement loop when the user has evidence but has not named a technique. It produces labeled hypotheses, candidate rewrites, verification records, and an auditable decision trace.

For agent-skill optimization, default to the progressive-disclosure and deterministic-script strategy in [`skill-optimization-strategy.md`](skill-optimization-strategy.md) before choosing an optimizer. The optimizer may evolve content, but the skill package should still behave like an index with top-level conditional references and script-owned workflow contracts.

The bundled CLI implements local deterministic versions of GEPA, Trace-style credit assignment, VISTA, ASSERT gates, SkillOpt-style bounded edits, Agent Lightning reward rollouts, and Simula-style dataset design. Native upstream libraries are still useful for model-backed training, framework integration, or official validation, but they are not required to create concrete candidate, score, trace, reward, taxonomy, or simulation artifacts.

Use GEPA when optimizing textual artifacts against measurable evals. Use Microsoft Trace when the artifact is a trainable Python workflow, agent, or code path with feedback that can be propagated through a computation graph. Use ASSERT when requirements, policies, behavior taxonomies, or trace-grounded judge evidence should gate candidate adoption. Use SkillOpt when a reusable skill should evolve through bounded text edits, held-out validation gates, and a deployable `best_skill.md`. Use Agent Lightning when a skill or agent has enough rollouts to define reward signals and policy penalties.

For native optimizer installation and environment setup, read [`install-improvement-libs.md`](install-improvement-libs.md).

## Selection Matrix

| Need | Technique | Why |
|---|---|---|
| Optimize an agent skill's structure or workflow | Progressive disclosure + deterministic scripts | Keeps `SKILL.md` sparse, routes context conditionally, and makes workflow generation repeatable |
| Improve a prompt or skill instructions from eval failures | GEPA or VISTA | Both use reflective failure analysis; VISTA adds interpretable hypothesis tracking |
| Improve code, prompts, and agent steps together | Microsoft Trace | Trainable `node`, `bundle`, and `model` primitives optimize end-to-end workflows |
| Gate candidate adoption on requirements, policies, generated behavior taxonomies, and trace-cited judge evidence | ASSERT | Spec-driven cases and `scores.jsonl`/`metrics.json` make baseline vs candidate regressions inspectable |
| Train reusable natural-language skills from rollouts, traces, eval splits, and held-out validation gates | SkillOpt | Bounded text edits and validation-gated updates produce a deployable `best_skill.md` |
| Improve a skill or agent from repeated rollouts, rewards, and policy constraints | Agent Lightning | RL-style optimization can learn from experience while policy rewards penalize unsafe behavior |
| Keep every optimization step auditable | VISTA | Separates hypothesis generation from prompt rewriting and validates hypotheses on minibatches |
| Improve from existing evals and traces without model calls | Eval/trace deterministic loop | Build targeted candidates, lint structure, and compare metrics reproducibly |
| Explore several specialized candidates | GEPA | Pareto frontier keeps candidates that win on different slices |
| Escape defective seeds or local optima | VISTA | Random restart plus epsilon-greedy exploration improves search diversity |

## Pipeline Shape

1. Baseline: capture the current artifact and its current eval or trace results.
2. Diagnose: cluster failures by cause, not by visible example wording.
3. Select: choose GEPA, Trace, VISTA, ASSERT, SkillOpt, Agent Lightning, or a hybrid loop.
4. Generate: create small candidates tied to labeled hypotheses.
5. Verify: run deterministic checks, evals, and trace replay against baseline and candidate.
6. Accept: promote only candidates that improve target metrics without regressing protected cases.
7. Record: save candidates, rejected hypotheses, metrics, traces, and human review notes.

## Acceptance Criteria

Do not call an artifact "improved" unless at least one of these is true:

- It improves the primary eval metric and does not regress protected cases.
- It fixes a deterministic failing case and the fix generalizes to adjacent cases.
- It reduces cost, latency, or error rate while preserving quality.
- It produces a clearer trace with the same or better final output quality.
- A human reviewer accepts a behavior change and the rationale is recorded.

## Sources

- GEPA repository: https://github.com/gepa-ai/gepa
- GEPA docs: https://gepa-ai.github.io/gepa/
- Microsoft Trace repository: https://github.com/microsoft/Trace
- Microsoft Trace docs: https://microsoft.github.io/Trace/
- ASSERT repository: https://github.com/responsibleai/ASSERT
- ASSERT project docs: https://responsibleai.github.io/ASSERT/
- VISTA paper: https://arxiv.org/abs/2603.18388
- SkillOpt repository: https://github.com/microsoft/SkillOpt
- SkillOpt project docs: https://microsoft.github.io/SkillOpt/
- SkillOpt paper: https://arxiv.org/abs/2605.23904
- Agent Lightning governance package: https://github.com/microsoft/agent-governance-toolkit/tree/main/agent-governance-python/agent-lightning
- Agent Lightning project: https://www.microsoft.com/en-us/research/project/agent-lightning/
- Agent Skills standard: https://www.agent-skills.io/
