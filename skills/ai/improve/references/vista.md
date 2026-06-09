# VISTA

## Table of Contents

- [Use When](#use-when)
- [Method](#method)
- [Implemented Loop](#implemented-loop)
- [Generated Artifacts](#generated-artifacts)
- [Inputs](#inputs)
- [Caveats](#caveats)
- [Sources](#sources)

## Use When

Use VISTA-style optimization when reflective prompt optimization must be interpretable, auditable, and robust to defective seeds or local optima.

For local runtime setup, read [`environment-setup.md`](environment-setup.md). For related optimizer installs, read [`install-improvement-libs.md`](install-improvement-libs.md).

VISTA is most useful when:

- GEPA-style reflection regresses or becomes opaque.
- The user needs to know why a candidate changed.
- Failure modes need labels.
- Multiple hypotheses should be verified in parallel before rewriting.
- Exploration needs random restart or epsilon-greedy behavior.

## Method

The VISTA paper proposes a multi-agent APO framework that:

1. Separates hypothesis generation from prompt rewriting.
2. Produces semantically labeled hypotheses.
3. Rewrites prompts independently for each hypothesis.
4. Verifies hypotheses on minibatches in parallel.
5. Records an interpretable optimization trace.
6. Uses two-layer explore/exploit with random restart and epsilon-greedy sampling.

This skill implements VISTA as a deterministic TypeScript orchestration loop. The script owns order of operations, workspace files, minibatches, candidate files, checkable state, and selection policy. The calling agent owns inference: semantic hypothesis generation, artifact rewriting, and verification judgments.

## Implemented Loop

Use `improve --vista` when the task needs an auditable VISTA loop:

```bash
node skills/ai/improve/scripts/improve-cli.ts improve . --vista --out improve/support-skill --json
```

The implementation follows a Sensei-style progress loop:

- `read`: load seed artifact, eval failures, trace observations, and objective.
- `hypothesize`: ask the calling agent to generate semantically labeled hypotheses without rewriting.
- `rewrite`: ask the calling agent to rewrite one candidate per hypothesis.
- `verify`: verify candidates against minibatches and protected regressions.
- `select`: apply deterministic random restart plus epsilon-greedy selection.
- `summarize`: record the evidence trail and selected candidate.
- `repeat`: continue only when eval deltas, traces, or human review justify another iteration.

The local scorer is a deterministic proxy so the workspace can be checked and replayed without hidden model calls. Replace proxy scores with real eval and trace verification before promoting a candidate.

## Generated Artifacts

`improve-cli.ts improve ... --vista` writes VISTA artifacts:

```text
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
    .gitkeep
candidates/
  selected.md
```

`run.json` contains the full VISTA trace: roles, parameters, loop iterations, minibatches, hypotheses, candidate patch plans, verification records, and explore/exploit selection state.

## Inputs

Recommended spec fields:

- `seed`: current prompt, skill instruction, code fragment, or workflow description.
- `objective`: desired improvement.
- `cases[]`: eval failures, trace observations, expected outputs, or feedback.
- `maxHypotheses`: cap on hypotheses.
- `epsilon`: exploration weight for restart candidates.
- `minibatchSize`: case count per verification minibatch.
- `maxIterations`: loop iterations to prepare.
- `restartCount`: random-restart candidate count.

## Caveats

- The bundled VISTA library is deterministic and local; it does not call an LLM or hide inference.
- Agent prompt artifacts must be completed by the calling agent or by an explicitly configured model runner.
- Use real evals and traces before accepting the selected candidate.
- Preserve rejected hypotheses for auditability.
- Use GEPA, Trace, SkillOpt, ASSERT, or Agent Lightning when the user asks for native optimizer execution or policy-governed training beyond this deterministic workspace.

## Sources

- VISTA paper abstract: https://arxiv.org/abs/2603.18388
- VISTA PDF: https://arxiv.org/pdf/2603.18388
