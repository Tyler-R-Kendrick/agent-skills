# Learn

Use this skill to turn a user correction into a generalized steering rule. Keep `STEERING.md` as an index, and keep details in linked RDF/Turtle files under `~/.agents/.steering/`.

This turns feedback loops into explicit, inspectable learnings. See [correction-to-learning.md](references/correction-to-learning.md) for the correction-to-learning model.

## Route

- IF the user corrects an agent response, read [correction-to-learning.md](references/correction-to-learning.md) and [zpd-teaching-loop.md](references/zpd-teaching-loop.md).
- IF creating or updating steering artifacts, read [steering-index-contract.md](references/steering-index-contract.md) and [rdf-contract.md](references/rdf-contract.md).
- IF using the deterministic helper, read [cli-usage.md](references/cli-usage.md) and run `node skills/ai/learn/scripts/dist/learn.js`.
- ELSE answer normally and do not create steering entries.

## Core Workflow

1. Identify the correction, the agent behavior it changes, and the broader class of future tasks it should affect.
2. Generalize the correction into a strategy or preference, not a one-off fact.
3. If memory is available, search for related prior corrections and add `memory://` evidence links; keep facts in memory, not in steering.
4. Add evidence links to docs, instruction files, conversations, or other sources.
5. Use the CLI to write the RDF entry and regenerate `STEERING.md`.
6. Briefly teach the agent what reasoning move to practice next time.

## Best Practices

- Always store durable learnings as generalized strategies or preferences, not isolated task facts.
- Keep `STEERING.md` as a conditional index and load linked RDF files only when the current task matches the entry.
- Require evidence links for every learning so agents can inspect provenance before relying on the rule.
- Use the zone of proximal development to explain the next reasoning move the correction teaches.
- Prefer deterministic CLI writes over manual steering edits to avoid broken links, duplicate IDs, or stale index rows.
