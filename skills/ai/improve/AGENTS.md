# Evals and Self-Improvement Pipelines

## Operating Rule

Default new agent and LLM evals to AgentEvals `EVAL.yaml` with AgentV. Improve only against evidence: eval failures, trace observations, benchmark deltas, human review notes, or explicit user goals. Keep each loop narrow, reproducible, and auditable.

## Progressive Disclosure

Load only the reference needed for the requested eval or improvement surface:

| If the task says... | Then read... |
|---|---|
| "install", "setup", "environment", "venv", "dependencies", "API keys", "Node", "Python", or missing native tools | [`references/environment-setup.md`](references/environment-setup.md) |
| "install AgentV", "install ASSERT", "setup eval tools", "eval runner install", or native eval validation setup | [`references/install-eval-tools.md`](references/install-eval-tools.md) |
| "install GEPA", "install Trace", "install Agent Lightning", "install SkillOpt", "setup optimizer", or improvement library dependencies | [`references/install-improvement-libs.md`](references/install-improvement-libs.md) |
| "create an eval", "judge", "grader", "rubric", "EVAL.yaml", or no eval standard | [`references/agentevals.md`](references/agentevals.md) and [`references/agentv.md`](references/agentv.md) |
| "which eval standard", "convert eval", "compare standards", or mixed eval formats | [`references/eval-standards-guide.md`](references/eval-standards-guide.md) |
| "Agent Skills eval", `evals.json`, "skill quality", "with_skill", or "without_skill" | [`references/agent-skills-evals.md`](references/agent-skills-evals.md) |
| "ASSERT", `assert-ai`, "judge-traces", "spec-driven", "behavior taxonomy", "trace-aware", "policy failure modes", or `eval_config.yaml` | [`references/assert.md`](references/assert.md) |
| "eval starter", "eval lint", "eval workspace contract", or expected eval artifacts | [`references/eval-workspace-contracts.md`](references/eval-workspace-contracts.md) |
| "optimize a skill", "progressive disclosure", "Table of Contents", "Index Page", "conditional access", "top-level links", "scripted workflow", or "deterministic workflow generation" | [`references/skill-optimization-strategy.md`](references/skill-optimization-strategy.md) |
| "which technique", "optimize this", "improvement plan", or mixed artifacts | [`references/techniques-guide.md`](references/techniques-guide.md) |
| "GEPA", "Pareto", "reflective mutation", "prompt evolution", or "optimize anything" | [`references/gepa.md`](references/gepa.md) |
| "Trace", "OptoPrime", "computation graph", "node", "bundle", or end-to-end generative optimization | [`references/microsoft-trace.md`](references/microsoft-trace.md) |
| "VISTA", "interpretable APO", "hypothesis agent", "random restart", or "epsilon-greedy" | [`references/vista.md`](references/vista.md) |
| "Agent Lightning", "RL", "reward", "policy reward", "governed training", or skill improvement with policy constraints | [`references/agent-lightning.md`](references/agent-lightning.md) |
| "SkillOpt", "SkillOpts", "skill evolution", `best_skill.md`, "held-out gate", "bounded edits", "textual learning rate", or "SkillOpt-Sleep" | [`references/skillopt.md`](references/skillopt.md) |
| "eval failures", "agent traces", "span logs", "benchmark deltas", or "release evidence" | [`references/eval-trace-improvement.md`](references/eval-trace-improvement.md) |
| "synthetic data", "simulation data", "Simula", "QDC", "Source2Synth", "MAG-V", "MetaSynth", "BARE", "Condor", "data auditor", "generate data", or "simulate" | [`references/simulation-data.md`](references/simulation-data.md) |
| "CLI", "init", "improve", "eval", "simulate", "lint", "workspace", or "deterministic improvement artifacts" | [`references/workspace-contracts.md`](references/workspace-contracts.md) |

## Workflow

1. Identify whether the user needs an eval artifact, an improvement loop, or both.
2. For eval artifacts, select the standard from explicit language, existing repo artifacts, or the default AgentEvals rule.
3. For improvement loops, identify the artifact type and evidence: eval cases, traces, logs, cost/latency metrics, human review, or explicit constraints.
4. Load only the matching reference docs, then use `scripts/improve-cli.ts init`, `improve`, `eval`, `simulate`, or `lint` when deterministic artifacts help.
5. Prefer deterministic graders and structural checks before subjective LLM review.
6. Run the smallest useful loop, compare against the baseline, and preserve selected candidates plus rejected hypotheses.
7. Report the evidence delta and any residual risk before claiming the artifact is evaluated or improved.

## Script

Use the bundled TypeScript CLI for deterministic planning, eval artifact generation, technique-specific local implementations, simulation data generation, improvement workspaces, and structural linting:

```bash
node skills/ai/improve/scripts/improve-cli.ts --help
node skills/ai/improve/scripts/improve-cli.ts init improve/support-skill --json
node skills/ai/improve/scripts/improve-cli.ts improve . --gepa --json
node skills/ai/improve/scripts/improve-cli.ts eval --agent-skills --json
node skills/ai/improve/scripts/improve-cli.ts simulate . --simula --json
node skills/ai/improve/scripts/improve-cli.ts lint improve/support-skill --json
```

For the CLI contract and generated workspace structure, read [`references/workspace-contracts.md`](references/workspace-contracts.md). The script is dependency-free, calls the bundled implementation libraries in `scripts/`, and expects Node 24+ TypeScript type stripping.

## Best Practices

- **Use AgentEvals by default**: default new agent and LLM evals to AgentEvals `EVAL.yaml` with AgentV unless the user or repo clearly specifies another standard.
- **Use progressive disclosure by default**: treat `SKILL.md` as a table-of-contents/index page with conditional top-level links; put deeper links inside references.
- **Codify workflows in scripts**: make order-of-operations and workspace generation deterministic in scripts; let calling agents provide generated inputs and handle inference operations.
- **Improve from evidence**: require eval failures, trace observations, benchmark deltas, or explicit human feedback before changing an artifact.
- **Keep loops narrow**: optimize one prompt, skill behavior, agent step, code path, or workflow contract at a time.
- **Preserve baselines**: save the original artifact, eval cases, trace inputs, and metrics before generating candidates.
- **Wire explicit assertions**: wire explicit test cases and assertions; do not ship one anonymous catch-all judge.
- **Prefer deterministic checks**: use exact graders, structural checks, schema checks, and replayable traces before subjective LLM review.
- **Use GEPA for text evolution**: use reflective mutation and Pareto selection when the artifact is textual and measurable.
- **Use Trace for trainable workflows**: use computation-graph optimization when code, prompts, and agent steps need end-to-end feedback propagation.
- **Use VISTA for interpretability**: decouple hypotheses from rewrites when the improvement loop needs auditable reasoning and local-optimum escape.
- **Design synthetic data before sampling**: use dataset-level taxonomies, local diversity, complexity schedules, quality gates, and lineage before asking an agent or model to generate simulation records.
- **Validate the candidate**: accept a candidate only after it beats the baseline on held-out evals or trace-backed acceptance criteria.
- **Validate natively first**: validate eval artifacts with the native standard tool where possible, then use the bundled linter as a structural fallback.
- **Record rejected paths**: keep failed hypotheses and candidates so future iterations do not rediscover the same dead ends.
