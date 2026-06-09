# Microsoft Trace

## Table of Contents

- [Use When](#use-when)
- [Core Concepts](#core-concepts)
- [Workflow](#workflow)
- [Greeting Example Pattern](#greeting-example-pattern)
- [Caveats](#caveats)
- [Sources](#sources)

## Use When

Use Microsoft Trace for end-to-end generative optimization of AI agents and workflows when the trainable parts can be represented in Python as nodes, bundles, models, or parameters.

For install and environment setup, read [`install-improvement-libs.md`](install-improvement-libs.md).

Trace is useful when:

- The artifact is not just one prompt.
- Code, prompts, and agent steps all affect the result.
- Feedback can be propagated through a computation graph.
- You need to optimize with natural-language feedback, numeric reward, compiler errors, or execution errors.

## Core Concepts

| Concept | Meaning |
|---|---|
| `node` | A value in the computation graph; mark it `trainable=True` when the optimizer may change it |
| `bundle` | A wrapped Python function that can participate in the trace graph |
| `model` | A higher-level agent/model container that exposes parameters |
| `OptoPrime` | Trace optimizer that uses the computation graph and feedback |
| Feedback | Natural-language or numeric signal passed backward through the trace |

Trace describes itself as AutoDiff-like optimization for AI systems. It captures and propagates execution traces instead of only optimizing final outputs.

## Workflow

1. Wrap trainable prompts, code fragments, and agent steps as `node`, `bundle`, or `model` parameters.
2. Run the workflow on a case.
3. Convert result quality into directional feedback.
4. Call optimizer `backward` with the result and feedback.
5. Step the optimizer.
6. Re-run evals and preserve traces before accepting changes.

## Greeting Example Pattern

The greeting notebook demonstrates a sales agent with trainable instructions:

- `@trace.model` wraps the agent.
- `trace.node(..., trainable=True)` marks instructions as trainable.
- `@trace.bundle(trainable=True)` wraps decision and greeting functions.
- A feedback function returns "Correct" or "Incorrect".
- `OptoPrime(agent.parameters())` updates the trainable parts.

Use this pattern when improving agents whose failures are tied to intermediate decisions, not only final wording.

## Caveats

- Trace is a Python research library; do not treat it as a drop-in production optimizer without guardrails.
- Large computation graphs may exceed context limits.
- Preserve human review for safety-sensitive changes.
- Keep provider/model configuration explicit and reproducible.

## Sources

- Microsoft Trace repository: https://github.com/microsoft/Trace
- Trace documentation: https://microsoft.github.io/Trace/
- Greeting agent notebook: https://colab.research.google.com/github/microsoft/Trace/blob/experimental/docs/examples/basic/greeting.ipynb
- Raw greeting notebook: https://raw.githubusercontent.com/microsoft/Trace/experimental/docs/examples/basic/greeting.ipynb
- Trace paper: https://arxiv.org/abs/2406.16218
