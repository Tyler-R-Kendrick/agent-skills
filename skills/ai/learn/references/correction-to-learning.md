# Correction to Learning

Use this reference when the user corrects, rejects, edits, or redirects an agent response. The output is a generalized steering rule, not a record of the immediate task.

This captures feedback-derived preferences as learnings that align future agent choices without copying source material or storing task facts.

## Classify the Signal

| Signal | Meaning | Learning Target |
|--------|---------|-----------------|
| "Do not do X" | A forbidden reasoning move or output pattern | Avoidance rule |
| "Prefer X" | A stable choice among valid options | Preference rule |
| "You missed Y" | A context-gathering or verification gap | Discovery rule |
| "This is not proof" | Evidence standard mismatch | Acceptance rule |
| User edit | Delta between generated and desired output | Style or structure rule |

## Extract the Rule

1. Name the agent move that failed.
2. Name the user-preferred move.
3. Expand from the specific example to the smallest safe task class.
4. Add boundaries so the rule does not overfit.
5. Link evidence: memory, conversation, docs, code, or instruction files.

Good learning:

```text
When browser evidence is required for a UI change, run the executable recording flow before claiming completion; screenshots alone are not accepted proof.
```

Overfit learning:

```text
For QUI-22, rerun recording-artifacts.mjs.
```

## Keep Out

- Do not store facts that belong in memory.
- Do not encode secrets, credentials, or private data.
- Do not turn one frustrated sentence into a broad rule unless the task class is clear.
- Do not overwrite project instructions; link them as evidence instead.
