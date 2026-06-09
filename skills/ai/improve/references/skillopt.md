# SkillOpt

## Table of Contents

- [Use When](#use-when)
- [Core Loop](#core-loop)
- [Eval, Trace, and Evolution Inputs](#eval-trace-and-evolution-inputs)
- [Workspace Shape](#workspace-shape)
- [CLI Workspace](#cli-workspace)
- [Native Runs](#native-runs)
- [SkillOpt-Sleep](#skillopt-sleep)
- [Caveats](#caveats)
- [Sources](#sources)

## Use When

Use SkillOpt when the artifact is a reusable natural-language skill for a frozen agent and the user has enough rollouts, eval cases, or trace observations to train the skill behind held-out gates.

Prefer SkillOpt for:

- Skill evolution from train, validation, and test splits.
- Eval-backed skill edits where validation must strictly improve before adoption.
- Agent skill optimization where deployment should add no inference-time model calls.
- Workflows that need `best_skill.md`, rejected edits, and training history as release evidence.

Prefer VISTA or GEPA for one-off prompt edits, early hypothesis exploration, or small textual improvements without a real held-out split. Prefer Agent Lightning when the user explicitly wants RL-style policy or reward optimization over broader agent behavior.

## Core Loop

SkillOpt treats the skill document as trainable text state while keeping the target agent model frozen. The public implementation describes the loop as:

```text
rollout -> reflect -> aggregate -> select -> update -> evaluate
```

Key mechanics to preserve in local workspaces:

| Mechanic | Skill behavior |
|---|---|
| Bounded edits | Optimizer proposes add, delete, or replace edits against one skill document |
| Textual learning rate | Limits how much text can change at each step |
| Held-out gate | Candidate edits are accepted only when validation score strictly improves |
| Rejected-edit buffer | Failed edits remain available so later iterations avoid repeated mistakes |
| Slow/meta update | Epoch-level guidance can consolidate repeated lessons |
| Deployable artifact | Final output is a compact `best_skill.md` used by the unchanged target agent |

## Eval, Trace, and Evolution Inputs

Use SkillOpt when the evidence set can be divided cleanly:

| Input | Required use |
|---|---|
| `train/` split | Rollouts and reflections can learn from these cases |
| `val/` split | Selection gate; keep this held out from direct editing |
| `test/` split | Final report and release decision only |
| Trace spans | Explain tool ordering, missing calls, argument drift, latency, and stop conditions |
| Eval scores | Define the validation gate metric, such as hard accuracy, soft score, or mixed score |
| Policies | Add protected regression or safety gates before accepting `best_skill.md` |

When converting existing evals or traces into SkillOpt inputs, preserve original case IDs and source paths so accepted edits can be audited back to the source failure.

## Workspace Shape

The bundled CLI creates this SkillOpt-compatible folder when `techniques` includes `skillopt`:

```text
skillopt/
  config.yaml
  seed_skill.md
  split/
    train/items.json
    val/items.json
    test/items.json
  outputs/
    .gitkeep
  runbook.md
```

Keep `val` held out for candidate selection and `test` held out for final reporting. Store native SkillOpt outputs under `skillopt/outputs/`, especially `best_skill.md`, `history.json`, `runtime_state.json`, per-step evals, patches, and rejected edits.

## CLI Workspace

Use `improve` with `--skillopt` when the user asks for skill evolution, held-out gates, or `best_skill.md`:

```bash
node skills/ai/improve/scripts/improve-cli.ts improve . --skillopt --out improve/support-skill-opt --json
```

Or specify techniques explicitly:

```bash
node skills/ai/improve/scripts/improve-cli.ts improve . --skillopt --vista --out improve/support-skill-opt --json
node skills/ai/improve/scripts/improve-cli.ts lint improve/support-skill-opt --json
```

The linter verifies that `skillopt/config.yaml`, `seed_skill.md`, and all train/val/test split files exist and that the config declares optimizer, gate, evolution, trace, and eval sections.

## Native Runs

Install SkillOpt only when the user asks to run the native optimizer or inspect real training behavior. For installation commands, Python requirements, extras, and provider environment variables, read [`install-improvement-libs.md`](install-improvement-libs.md).

Native run shape:

```bash
python scripts/train.py \
  --config configs/searchqa/default.yaml \
  --split_dir /path/to/split \
  --optimizer_model gpt-5.5 \
  --target_model gpt-5.5
```

Native eval-only shape:

```bash
python scripts/eval_only.py \
  --config configs/searchqa/default.yaml \
  --skill outputs/my_run/best_skill.md \
  --split all \
  --split_dir /path/to/split
```

Adapt benchmark config and split schema to the target task. The deterministic CLI workspace is a contract, not a replacement for SkillOpt's benchmark-specific dataloaders and rollouts.

## SkillOpt-Sleep

Use SkillOpt-Sleep as a deployment-time companion when the user wants recurring local usage to improve long-term skills or memory offline. Its shape is:

```text
harvest session transcripts -> mine recurring tasks -> replay offline -> consolidate -> gate on held-out tasks -> stage proposal -> user adopts
```

Keep staged proposals reviewable and never auto-adopt changes that bypass held-out gates or user approval.

## Caveats

- SkillOpt is for optimizing skill documents, not model weights.
- The generated `skillopt/` folder is structural workspace setup; native SkillOpt still needs benchmark-specific configs and data loaders.
- Held-out validation must stay held out. Do not tune directly on `val` or report training-set wins as release evidence.
- Treat paper benchmark numbers as source claims, not guaranteed outcomes for a new task.
- Preserve baseline skill, splits, outputs, and rejected edits before promoting `best_skill.md`.

## Sources

- SkillOpt repository: https://github.com/microsoft/SkillOpt
- SkillOpt project docs: https://microsoft.github.io/SkillOpt/
- SkillOpt paper: https://arxiv.org/abs/2605.23904
- SkillOpt package: https://pypi.org/project/skillopt/
