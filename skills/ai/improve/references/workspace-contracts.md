# Workspace Contracts and CLI

## Table of Contents

- [CLI Commands](#cli-commands)
- [Technique Flags](#technique-flags)
- [Generated Workspace](#generated-workspace)
- [Source Control Ignore Rules](#source-control-ignore-rules)
- [Plan Contract](#plan-contract)
- [Lint Rules](#lint-rules)
- [Exit Codes](#exit-codes)

## CLI Commands

For baseline runtime setup, read [`environment-setup.md`](environment-setup.md). For native GEPA, Trace, SkillOpt, or Agent Lightning installs, read [`install-improvement-libs.md`](install-improvement-libs.md). For ASSERT native runs, read [`install-eval-tools.md`](install-eval-tools.md).

```bash
node skills/ai/improve/scripts/improve-cli.ts --help
node skills/ai/improve/scripts/improve-cli.ts init improve/support-skill --json
node skills/ai/improve/scripts/improve-cli.ts improve . --gepa --json
node skills/ai/improve/scripts/improve-cli.ts eval --agent-skills --json
node skills/ai/improve/scripts/improve-cli.ts simulate . --simula --json
node skills/ai/improve/scripts/improve-cli.ts lint improve/support-skill --json
```

Public commands:

- `init <cwd>`: initialize a deterministic improvement workspace at a directory.
- `improve <file|dir>`: create an improvement workspace from a target using technique flags.
- `eval [file|dir]`: create eval artifacts using eval-standard flags; defaults to AgentEvals.
- `simulate <file|dir>`: create a synthetic-data simulation workspace using dataset-level design and quality gates.
- `lint <cwd>`: validate improvement, eval, or simulation workspace structure.

Use `<command> --help` for command-specific options and examples. Use `--json` when an agent needs machine-readable command output.

## Technique Flags

The command chooses artifact shape from flags rather than a separate target type:

| Command | Flags | Generated contract |
|---|---|---|
| `improve` | `--gepa` | Text-evolution workspace with `gepa/` reflection, frontier, and runbook files |
| `improve` | `--vista` | VISTA hypothesis, rewrite, verification, and selection artifacts |
| `improve` | `--trace` | Microsoft Trace-style graph and runbook files |
| `improve` | `--assert` | ASSERT improvement gate under `assert/` |
| `improve` | `--skillopt` | SkillOpt split/config/output contract under `skillopt/` |
| `improve` | `--agent-lightning` | Agent Lightning reward and training notes under `agent-lightning/` |
| `eval` | `--agentevals` | AgentEvals `EVAL.yaml` plus prompts, graders, and fixtures |
| `eval` | `--agent-skills` | Agent Skills `evals/evals.json` plus files and benchmark workspace |
| `eval` | `--assert` | ASSERT `eval_config.yaml` plus result placeholder |
| `simulate` | `--simula` | Simula-style mechanism design artifacts with taxonomy, local diversity, complexity, and critic loops |
| `simulate` | `--qdc` | Quality, diversity, and complexity metric artifacts |
| `simulate` | `--source-grounded` | Source manifest, grounding rules, and lineage artifacts |
| `simulate` | `--multi-agent` | Generator, critic, curator, and auditor role artifacts |
| `simulate` | `--base-refine` | Base-generate plus instruction-refine plan |
| `simulate` | `--knowledge-tree` | Knowledge-tree expansion and refinement contract |

`improve . --gepa` creates a GEPA-focused workspace under `.improve/` unless `--out <dir>` is provided. `eval --agent-skills` writes `evals/evals.json` in the current directory unless `--out <dir>` is provided.

`simulate . --simula` creates a Simula/QDC-focused workspace under `.simulate/` unless `--out <dir>` is provided. Read [`simulation-data.md`](simulation-data.md) before choosing simulation flags beyond the default.

## Generated Workspace

```text
improve.plan.json
inputs/
  seed.md
  cases.jsonl
  traces.jsonl
  metrics.json
vista/
  run.json
  state.json
  prompts/
    hypothesis-agent.md
    rewrite-agent.md
    verification-agent.md
  minibatches/
    minibatch-1.json
  hypotheses/
    1.json
  candidates/
    c1.md
  verification/
    c1.json
  summaries/
    .gitignore
gepa/
  config.json
  reflections.json
  reflection-prompt.md
  candidate-frontier.json
  outputs/
    .gitignore
    selected.md
    run.json
  runbook.md
trace/
  graph-spec.json
  optimization.json
  outputs/
    .gitignore
    patches.json
  runbook.md
candidates/
  .gitignore
  selected.md
reports/
  .gitignore
  improvement-report.md
assert/
  eval_config.yaml
  behavior-spec.md
  behavior-taxonomy.json
  trace-gates.json
  runbook.md
  artifacts/
    results/.gitignore
    results/<suite>/demo-1/
      .gitkeep
      taxonomy.json
      scores.jsonl
      metrics.json
agent-lightning/
  reward-spec.json
  rollouts.jsonl
  policy-update.json
  training-notes.md
skillopt/
  config.yaml
  edit-set.json
  history.json
  seed_skill.md
  split/
    train/items.json
    val/items.json
    test/items.json
  outputs/
    .gitignore
    best_skill.md
  runbook.md
strategy/
  skill-optimization-contract.json
```

Technique folders are generated only when the corresponding technique is selected, except VISTA, which is used as the deterministic orchestration trace for improvement workspaces.

Simulation workspaces use a separate contract:

```text
simulate.plan.json
simulation/
  run.json
inputs/
  domain.md
  source-manifest.json
fixtures/
  seed-case.json
taxonomies/
  factors.json
  expansion-plan.json
sampling/
  strategy.json
  coverage-grid.json
meta-prompts/
  templates.jsonl
  complexification.json
samples/
  .gitignore
  samples.jsonl
  accepted.jsonl
critics/
  .gitignore
  quality-gates.json
  decisions.jsonl
  dual-critic-rubric.md
metrics/
  qdc-metrics.json
  taxonomic-coverage.json
  complexity-elo.json
provenance/
  .gitignore
  lineage.jsonl
reports/
  .gitignore
  simulation-report.md
```

Optional simulation folders include:

```text
simula/
  mechanism-design.md
  critic-loop.json
source-grounded/
  source-plan.json
  grounding-audit.jsonl
multi-agent/
  roles.json
  transcript.jsonl
base-refine/
  base-refine-plan.json
  refinements.jsonl
knowledge-tree/
  tree-spec.json
  tree.json
```

## Source Control Ignore Rules

The repository root ignores default generated workspaces:

```text
.improve/
.simulate/
**/.improve/
**/.simulate/
```

Generated workspaces also include nested `.gitignore` files in folders where native tools or agents write run output:

| Folder | Keeps | Ignores |
|---|---|---|
| `candidates/` | `selected.md` | extra candidates, temporary dumps, model outputs |
| `reports/` | starter report markdown | rendered exports, logs, attachments, ad hoc reports |
| `gepa/outputs/` | `.gitignore` only by source control default | selected candidate text and local GEPA run output |
| `trace/outputs/` | `.gitignore` only by source control default | generated patch lists and replay outputs |
| `vista/summaries/` | `.gitignore` only | generated VISTA summaries |
| `skillopt/outputs/` | `.gitignore` only by source control default | `best_skill.md`, histories, runtime state, per-step evals unless deliberately moved elsewhere |
| `assert/artifacts/results/` | `.gitignore` plus placeholder `.gitkeep` files | ASSERT native result datasets, scores, traces, and metrics |
| `samples/` | starter `samples.jsonl` | generated datasets such as accepted, rejected, or raw sample files |
| `critics/` | quality-gate contracts | generated critic decisions |
| `provenance/` | starter `lineage.jsonl` | expanded lineage exports |

Move a generated output into a tracked docs or evidence folder only when it is intentionally curated for review or release.

## Plan Contract

`improve.plan.json` is the source of truth:

```json
{
  "suite": "support-skill-gepa",
  "artifact": "prompt",
  "techniques": ["gepa"],
  "inputs": {
    "seed": "inputs/seed.md",
    "cases": "inputs/cases.jsonl",
    "traces": "inputs/traces.jsonl",
    "metrics": "inputs/metrics.json"
  },
  "outputs": {
    "candidates": "candidates/",
    "gepa": "gepa/",
    "report": "reports/improvement-report.md",
    "vistaRun": "vista/run.json"
  }
}
```

## Lint Rules

The linter validates:

- `improve.plan.json` exists.
- Required plan fields exist.
- `improve.plan.json` records the progressive-disclosure and deterministic-script strategy defaults.
- Techniques are present.
- Input and output references are relative.
- All referenced input files exist.
- Candidate, report, VISTA summary, GEPA output, Trace output, SkillOpt output, and ASSERT result folders include `.gitignore` files for generated outputs.
- VISTA orchestration files exist and include calling-agent hypothesis, rewrite, verification, minibatch, and selected-candidate records.
- When `gepa` is selected, `gepa/config.json`, `gepa/reflections.json`, `gepa/reflection-prompt.md`, `gepa/candidate-frontier.json`, generated selected output, and `gepa/runbook.md` exist.
- When `trace` is selected, `trace/graph-spec.json`, `trace/optimization.json`, generated patches, and `trace/runbook.md` exist.
- When `assert` is selected, `assert/eval_config.yaml`, `assert/behavior-spec.md`, `assert/behavior-taxonomy.json`, `assert/trace-gates.json`, result metrics, and `assert/runbook.md` exist.
- When `agent-lightning` is selected, `agent-lightning/reward-spec.json`, `agent-lightning/rollouts.jsonl`, `agent-lightning/policy-update.json`, and `agent-lightning/training-notes.md` exist.
- When `skillopt` is selected, `skillopt/config.yaml`, `skillopt/edit-set.json`, `skillopt/history.json`, `skillopt/seed_skill.md`, generated best skill output, and train/val/test split JSON files exist.
- When the inferred artifact is `skill`, `strategy/skill-optimization-contract.json` records `SKILL.md` as a table-of-contents/index page with top-level references.

For simulation workspaces, the linter validates:

- `simulate.plan.json` exists and records deterministic-script strategy defaults.
- Simulation techniques are present and supported.
- Input and output references are relative.
- Source manifest references exist.
- `simulation/run.json` records the Simula local algorithm, generated samples, and critic decisions.
- Required taxonomy, sampling, meta-prompt, sample, critic, metric, provenance, and report files exist.
- Sample, critic, provenance, and report folders include `.gitignore` files for generated outputs.
- JSON and JSONL files parse correctly.
- Source ids, factor ids, coverage-cell ids, meta-prompt ids, sample ids, and lineage ids are not duplicated.
- Samples include id, split, input, expected, factors, complexity, and provenance.
- QDC metrics include quality, diversity, and complexity sections.
- Selected simulation technique folders contain their generated artifacts, such as source-grounding audits, multi-agent transcripts, base/refine records, and knowledge trees.

The linter does not run evals, generate data, call models, or prove quality. It validates deterministic workspace structure.

## Exit Codes

| Code | Meaning |
|---|---|
| `0` | Success or lint with no errors |
| `1` | Lint errors or unexpected runtime failure |
| `2` | CLI usage error |
