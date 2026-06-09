# Agent Lightning

## Table of Contents

- [Use When](#use-when)
- [Core Ideas](#core-ideas)
- [Skill Improvement Pattern](#skill-improvement-pattern)
- [Governed RL Integration](#governed-rl-integration)
- [CLI Workspace](#cli-workspace)
- [Caveats](#caveats)
- [Sources](#sources)

## Use When

Use Agent Lightning when improving a skill, agent, workflow, or harness needs reinforcement-learning style reward signals from repeated rollouts.

For install and environment setup, read [`install-improvement-libs.md`](install-improvement-libs.md).

It is especially relevant when:

- Skill behavior can be exercised as task rollouts.
- Eval results can become rewards or penalties.
- Agent traces expose intermediate decisions for credit assignment.
- Safety, cost, policy, or governance violations must affect the reward.
- The user wants an optimization loop that can learn from experience instead of one-off prompt edits.

For lightweight skill instruction edits, start with GEPA or VISTA. Move to Agent Lightning when the improvement target is a repeated behavior with enough rollout data to define a reward.

## Core Ideas

Agent Lightning is a Microsoft agent optimization framework for training agents with reinforcement learning while decoupling agent execution from training. The broader framework is designed to work with existing agents across frameworks such as LangChain, OpenAI Agents SDK, AutoGen, or custom agents.

For this skill, use the idea as an improvement pattern:

1. Run the current skill or agent on a task distribution.
2. Capture outputs, tool traces, intermediate decisions, policy events, and final eval results.
3. Convert the evidence into reward components.
4. Train or select candidates against rewards and protected regressions.
5. Promote only candidates that improve reward without violating policy gates.

## Skill Improvement Pattern

Model skill improvement as a governed rollout:

| Rollout piece | Skill mapping |
|---|---|
| State | User task, loaded references, repo context, prior trace |
| Action | Skill instruction choice, tool call, candidate edit, response step |
| Reward | Eval pass, grader score, lower cost, lower latency, human approval |
| Penalty | Regression, unsupported claim, unsafe tool use, policy violation |
| Trace | Tool calls, file reads, eval output, rejected hypotheses |

Start with deterministic reward components:

- Task success: the skill solves the target task.
- Regression clean: protected eval cases still pass.
- Policy clean: no safety, governance, or cost violations.
- Evidence quality: the output cites evals, traces, or concrete artifacts.
- Efficiency: lower cost or latency without quality loss.

## Governed RL Integration

The linked Agent Governance Toolkit package is `agentmesh-lightning`, a public-preview Python package for governed RL training integration. It pairs Agent Lightning training with Agent OS guardrails.

Key components:

| Component | Role |
|---|---|
| `GovernedRunner` | Runs agent tasks while enforcing policies |
| `PolicyReward` | Converts policy violations into reward penalties |
| `GovernedEnvironment` | Exposes a gym-style training environment |
| `FlightRecorderEmitter` | Exports audit logs and violation summaries |

Use this when skill or agent improvement needs explicit policy-aware reward shaping. Keep the policy kernel, reward config, rollout data, and violation summary as release evidence.

## CLI Workspace

The local CLI does not run Agent Lightning. It creates deterministic planning artifacts for an Agent Lightning-style improvement loop:

```bash
node skills/ai/improve/scripts/improve-cli.ts improve . --agent-lightning --vista --out improve/support-skill-rl --json
node skills/ai/improve/scripts/improve-cli.ts lint improve/support-skill-rl --json
```

The workspace includes:

- `agent-lightning/reward-spec.json`
- `agent-lightning/training-notes.md`
- `inputs/cases.jsonl`
- `inputs/traces.jsonl`
- `vista/run.json`
- `reports/improvement-report.md`

Use native Agent Lightning or `agentmesh-lightning` execution only when the package is installed and the user has provided enough rollouts, reward definitions, and policy constraints.

## Caveats

- Agent Governance Toolkit's Agent Lightning package is public preview; APIs may change before GA.
- Do not use RL for a single anecdotal failure; create deterministic evals first.
- Reward hacking is a real risk. Keep protected regressions and policy penalties outside the optimized candidate.
- For skill text only, GEPA or VISTA is often cheaper and easier to review.
- Native training belongs in Python; the bundled TypeScript CLI is only for deterministic workspace generation and structural checks.

## Sources

- Agent Governance Toolkit Agent Lightning: https://github.com/microsoft/agent-governance-toolkit/tree/main/agent-governance-python/agent-lightning
- Agent Lightning GitHub: https://github.com/microsoft/agent-lightning
- Agent Lightning Microsoft Research project: https://www.microsoft.com/en-us/research/project/agent-lightning/
- Agent Lightning paper: https://arxiv.org/abs/2508.03680
