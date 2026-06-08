# ZPD Teaching Loop

Use this reference to teach the agent what the correction means. The zone of proximal development is the gap between what the agent just did and the next reasoning move it can learn with a small scaffold.

## Teaching Shape

| Step | Prompt To Yourself | Output |
|------|--------------------|--------|
| Current move | What did I do that made sense but failed? | Honest diagnosis |
| Target move | What should I do next time? | General strategy |
| Scaffold | What small check would have prevented the miss? | Repeatable cue |
| Transfer | Where else will this apply? | Scope boundary |
| Evidence | What proves this is real user preference? | Links |

## ZPD Entry Pattern

```text
Next time I see <trigger>, pause before <old move>, check <scaffold>, then choose <preferred strategy> when <scope condition> is true.
```

Example:

```text
Next time I see a correction about overstated deployment proof, pause before summarizing provider evidence, check whether the logged-in platform path was exercised, then claim success only when both platform and provider boundaries were verified.
```

## Teaching Rules

- Keep the explanation near the agent's current behavior; do not introduce a heavy framework.
- Teach one reasoning move per learning.
- Include a near-transfer scenario so the rule can generalize.
- Preserve humility: say what was learned, not that the agent will never miss it again.
