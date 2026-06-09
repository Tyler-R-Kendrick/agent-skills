# Eval and Trace Driven Improvement

## Table of Contents

- [Use When](#use-when)
- [Evidence Types](#evidence-types)
- [Diagnosis Pattern](#diagnosis-pattern)
- [Acceptance Pattern](#acceptance-pattern)
- [Anti-Patterns](#anti-patterns)

## Use When

Use this reference when improvement is based on eval results, failing examples, span traces, tool logs, benchmark deltas, cost/latency metrics, or human review notes.

## Evidence Types

| Evidence | Use it to improve |
|---|---|
| Deterministic eval failure | Exact behavior, schema, parser, safety, or regression contract |
| LLM judge rationale | Semantic quality, tone, helpfulness, groundedness |
| Tool trace | Tool ordering, missing call, wrong arguments, bad stop condition |
| Span timing | Latency, repeated work, unnecessary context loading |
| Cost metrics | Model choice, token budget, routing |
| Behavior taxonomy | ASSERT category-level diagnosis for requirement and policy failures |
| Trace-grounded judge evidence | ASSERT verdicts that cite tool calls, routing, model calls, or latency |
| Held-out validation split | SkillOpt selection gates and `best_skill.md` promotion |
| Rejected skill edits | SkillOpt evolution history and repeated-failure avoidance |
| Reward or policy signal | Agent Lightning reward shaping, penalties, and rollout acceptance |
| Human review | Product judgment and acceptance criteria |

## Diagnosis Pattern

1. Map every failure to a labeled cause.
2. Group similar causes across cases.
3. Identify which artifact owns each cause.
4. Generate one candidate per cause.
5. Keep the baseline unchanged for comparison.
6. Run candidate and baseline on the same cases.

## Acceptance Pattern

Accept a candidate only when:

- It improves the primary metric or fixes the target failure.
- It does not regress protected cases.
- It has trace or eval evidence that explains why it improved.
- The change is small enough to review.
- The result artifacts are stored.

For agent skills, pair this with the `eval` skill when creating or converting `evals.json`, `EVAL.yaml`, or ASSERT artifacts.

For Agent Lightning-style skill improvement, pair eval outputs with trace spans and policy events so rewards cannot be optimized apart from safety, cost, or regression gates.

For SkillOpt-style skill evolution, keep train cases for rollouts, validation cases for edit selection, and test cases for final reporting. Do not tune directly on held-out validation or test cases.

For ASSERT-style improvement, compare baseline and candidate runs by behavior category and judge dimension. Preserve `taxonomy.json`, `test_set.jsonl`, `inference_set.jsonl`, `scores.jsonl`, and `metrics.json` so release decisions can be audited from requirement to trace evidence.

## Anti-Patterns

- Improving from one anecdote without a regression case.
- Changing a prompt because it "sounds better" without a metric.
- Hiding all failures inside one judge score.
- Accepting a candidate that only improves visible training cases.
- Treating an ASSERT aggregate score as sufficient without inspecting failing dimensions and cited trace evidence.
- Throwing away rejected hypotheses and losing the audit trail.
