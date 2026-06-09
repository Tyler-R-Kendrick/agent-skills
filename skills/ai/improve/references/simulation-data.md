# Synthetic Data Simulation

Use this reference when the user asks for high-quality synthetic data, simulated eval data, data generation, Simula-style dataset design, QDC audits, source-grounded examples, or agent/customer/workflow simulation.

## Table of Contents

- [Default Strategy](#default-strategy)
- [Research Signals](#research-signals)
- [Technique Selection](#technique-selection)
- [Simulation Workspace](#simulation-workspace)
- [Quality Gates](#quality-gates)
- [CLI Usage](#cli-usage)
- [Progressive Setup](#progressive-setup)
- [Sources](#sources)

## Default Strategy

Default to a Simula-style dataset-level design:

1. Define the real-world domain, users, constraints, and downstream objective.
2. Build a global taxonomy of factors of variation before generating samples.
3. Create local diversity inside each taxonomy cell with multiple distinct instantiations.
4. Add a complexity schedule so easy, medium, hard, and edge cases are intentionally allocated.
5. Run dual critics and deterministic quality gates before accepting any generated record.
6. Track lineage, split membership, factor coverage, and rejected candidates.
7. Evaluate the resulting dataset with quality, diversity, complexity, coverage, and trust metrics.

Use this strategy even when the final data is produced by an LLM. The script should make the workflow deterministic; the calling agent or native model runner supplies generated content.

## Research Signals

Simula reframes synthetic data generation as mechanism design rather than sample-by-sample prompt iteration. Its important design moves are global diversification through taxonomies, local diversification within cells, controlled complexification, and quality checks with critic loops. It also treats taxonomic coverage and calibrated complexity as first-class evaluation metrics.

The QDC line of work argues that quality, diversity, and complexity should be tracked separately because optimizing only for quality can suppress diversity and limit self-improvement. This makes QDC a useful audit frame for every simulation workspace.

Source-grounded approaches such as Source2Synth are best when synthetic examples must teach skills from real documents, tables, traces, or product artifacts. They should preserve source ids, answerability checks, and intermediate reasoning or transform lineage.

Multi-agent generation and verification approaches such as MAG-V and MetaSynth are best when a single generator is likely to collapse modes. Use separate roles for taxonomy design, generation, acceptance critique, rejection critique, curation, and audit.

BARE-style base-refine pipelines are useful when instruction-tuned models produce polished but narrow outputs. Use a base model or high-temperature stage for diversity, then an instruction-tuned refinement stage for schema, task fit, and quality.

Condor-style knowledge-tree pipelines are useful for broad alignment or SFT data where the domain has explicit knowledge coverage. Use a tree expansion pass, then self-reflection refinement and held-out quality gates.

Metric-oriented data auditing is needed when the user cares about release-quality datasets, not just downstream model score. Include intrinsic checks for quality and trustworthiness before relying on extrinsic task performance.

## Technique Selection

| If the user needs... | Use... | Why |
|---|---|---|
| No specific method, data-scarce domain, privacy-sensitive domain, or business-critical synthetic data | `--simula --qdc` | Designs the dataset before sampling and audits QDC explicitly. |
| Real docs, tables, traces, user logs, or product specs as source material | `--source-grounded --qdc` | Preserves source ids, lineage, and answerability checks. |
| Agent eval queries, tool-call trajectories, customer-query simulations, or workflow traces | `--multi-agent --source-grounded` | Separates generation from trajectory verification and critique. |
| Low diversity from instruction-tuned models | `--base-refine --qdc` | Generates diverse raw samples first, then refines for quality. |
| Broad SFT or alignment coverage | `--knowledge-tree --qdc` | Expands domain knowledge intentionally before refinement. |
| Domain adaptation with expert perspectives | `--multi-agent --qdc` | Uses meta-prompted expert roles to broaden coverage. |
| Publication or release-quality dataset artifacts | `--simula --source-grounded --multi-agent --qdc` | Combines mechanism design, provenance, critics, and audit. |

## Simulation Workspace

`simulate` writes a deterministic workspace; it does not call a model or generate final records by itself.

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

Technique folders are created only when their flags are selected, except the core taxonomy, sampling, critic, metric, and provenance files.

`simulation/run.json` is produced by the bundled local Simula implementation and records the generated samples, critic decisions, QDC audit, lineage, coverage, and complexity artifacts. The `.gitignore` files preserve starter contract files while ignoring generated datasets, critic decisions, report exports, and expanded provenance unless those outputs are deliberately curated elsewhere.

## Quality Gates

Every accepted sample should pass:

- Schema validity: stable ids, split, input, expected output or label, factor values, complexity metadata, and provenance.
- Cell fit: the sample targets a declared coverage-grid cell and does not drift into a different task.
- Diversity: the sample is not a near duplicate of accepted records and adds coverage or local variation.
- Complexity calibration: the sample matches its assigned difficulty and uses declared complexification operators.
- Grounding: source-grounded samples cite source ids and do not invent facts absent from the source.
- Dual critique: one critic argues for acceptance and one argues for rejection before curation.
- Split hygiene: train, validation, and test examples do not leak paraphrases or repeated source spans.
- Lineage completeness: every accepted sample records source, generator, transforms, reviewers, and gate outcomes.

## CLI Usage

```bash
node skills/ai/improve/scripts/improve-cli.ts simulate . --simula --json
node skills/ai/improve/scripts/improve-cli.ts simulate docs/domain.md --source-grounded --multi-agent --out .simulate/domain --json
node skills/ai/improve/scripts/improve-cli.ts simulate . --base-refine --knowledge-tree --suite support-data --json
node skills/ai/improve/scripts/improve-cli.ts lint .simulate/domain --json
```

Flags:

| Flag | Adds |
|---|---|
| `--simula` | `simula/mechanism-design.md` and `simula/critic-loop.json`; default when no technique flag is provided. |
| `--qdc` | QDC metric and gate emphasis; default when no technique flag is provided. |
| `--source-grounded` | Source manifest, grounding plan, and `grounding-audit.jsonl`. |
| `--multi-agent` | Generator, critic, curator, auditor role contract, and `transcript.jsonl`. |
| `--base-refine` | Base-generate then instruction-refine plan plus `refinements.jsonl`. |
| `--knowledge-tree` | Knowledge-tree expansion contract plus generated `tree.json`. |

Use `--spec` for AI-assisted arguments:

```json
{
  "domain": "Customer support escalation conversations for a cloud deployment product.",
  "objective": "Generate agent-eval examples that exercise routing, missing context, tool use, and policy-safe escalation.",
  "targetSize": 250
}
```

The linter checks required files, JSON/JSONL parseability, relative source references, duplicate ids, required factor and sample fields, QDC metric sections, and selected technique artifacts.

## Progressive Setup

If the user asks how to install or configure runtime dependencies, read [`environment-setup.md`](environment-setup.md).

If the user wants to run model-backed generation or store large datasets, load only the environment reference first, then the tool-specific reference for the chosen model or data platform. The bundled CLI itself is dependency-free and expects Node 24+ TypeScript type stripping.

## Sources

- [Google Research: Designing synthetic datasets for the real world](https://research.google/blog/designing-synthetic-datasets-for-the-real-world-mechanism-design-and-reasoning-from-first-principles/)
- [Reasoning-Driven Synthetic Data Generation and Evaluation](https://openreview.net/forum?id=NALsdGEPhB)
- [Surveying the Effects of Quality, Diversity, and Complexity in Synthetic Data From Large Language Models](https://huggingface.co/papers/2412.02980)
- [On the Diversity of Synthetic Data and its Impact on Training Large Language Models](https://huggingface.co/papers/2410.15226)
- [Source2Synth: Synthetic Data Generation and Curation Grounded in Real Data Sources](https://arxiv.org/abs/2409.08239)
- [MAG-V: A Multi-Agent Framework for Synthetic Data Generation and Verification](https://huggingface.co/papers/2412.04494)
- [MetaSynth: Meta-Prompting-Driven Agentic Scaffolds for Diverse Synthetic Data Generation](https://huggingface.co/papers/2504.12563)
- [BARE: Combining Base and Instruction-Tuned Language Models for Better Synthetic Data Generation](https://huggingface.co/papers/2502.01697)
- [Condor: Enhance LLM Alignment with Knowledge-Driven Data Synthesis and Refinement](https://huggingface.co/papers/2501.12273)
- [The LLM Data Auditor: A Metric-oriented Survey on Quality and Trustworthiness in Evaluating Synthetic Data](https://huggingface.co/papers/2601.17717)
