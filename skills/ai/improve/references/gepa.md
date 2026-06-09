# GEPA

## Table of Contents

- [Use When](#use-when)
- [Core Loop](#core-loop)
- [Inputs](#inputs)
- [Integration Notes](#integration-notes)
- [Caveats](#caveats)
- [Sources](#sources)

## Use When

Use GEPA for textual artifacts that can be evaluated: prompts, code snippets, skill instructions, agent architectures, policies, configurations, and tool descriptions.

For install and environment setup, read [`install-improvement-libs.md`](install-improvement-libs.md).

GEPA is strongest when:

- Eval feedback includes rich text, traces, errors, profiler output, or reasoning logs.
- Several candidates may be good on different slices.
- The budget is too small for broad RL-style search.
- The user wants a measured optimization loop instead of manual prompt tweaking.

## Core Loop

GEPA uses reflective text evolution:

1. Select a candidate from the Pareto frontier.
2. Execute it on a minibatch and collect full textual traces.
3. Use an LLM to reflect on failures and actionable side information.
4. Mutate the text artifact.
5. Accept improved variants and update the Pareto frontier.
6. Optionally merge candidates that specialize on different subsets.

The important design point is that evaluators should return more than a scalar. Include actionable side information such as failing examples, parse errors, tool traces, and missing constraints.

## Inputs

Minimum useful inputs:

- Seed artifact text.
- Objective.
- Train/eval cases.
- Metric function.
- Rich feedback logs.
- Budget for metric calls.
- Hold-out set for final acceptance.

## Integration Notes

Python GEPA:

```bash
pip install gepa
```

For prompt optimization in AI pipelines, use DSPy when available:

```python
import dspy

optimizer = dspy.GEPA(metric=metric, max_metric_calls=150, reflection_lm="openai/gpt-5")
optimized_program = optimizer.compile(student=program, trainset=trainset, valset=valset)
```

For generic artifacts, use GEPA's optimize-anything style API and return rich logs from the evaluator.

## Caveats

- Do not use GEPA without measurable feedback.
- Preserve a held-out eval set; GEPA can overfit to the visible minibatch.
- Keep mutation scope small enough for review.
- VISTA may be preferable when a defective seed or opaque reflection loop causes regression.

## Sources

- GEPA repository: https://github.com/gepa-ai/gepa
- GEPA docs: https://gepa-ai.github.io/gepa/
- GEPA paper: https://arxiv.org/abs/2507.19457
- DSPy GEPA docs: https://github.com/stanfordnlp/dspy/blob/main/docs/docs/api/optimizers/GEPA/overview.md
