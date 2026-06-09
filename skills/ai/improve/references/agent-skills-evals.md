# Agent Skills Evals

## Table of Contents

- [Use When](#use-when)
- [Authored File](#authored-file)
- [Workspace Shape](#workspace-shape)
- [Run Pattern](#run-pattern)
- [Conversion to AgentEvals](#conversion-to-agentevals)
- [Sources](#sources)

## Use When

Use the Agent Skills eval standard when evaluating a skill's output quality or trigger precision in the skill authoring workflow. It is best for lightweight skill feedback loops and for comparing behavior with the skill enabled versus disabled.

For install and environment setup, read [`install-eval-tools.md`](install-eval-tools.md).

## Authored File

The main authored artifact is `evals/evals.json` beside `SKILL.md`.

```json
{
  "skill_name": "csv-analyzer",
  "evals": [
    {
      "id": 1,
      "prompt": "Analyze evals/files/sales.csv and find the top 3 months by revenue.",
      "expected_output": "The output names the top 3 months and includes revenue values.",
      "files": ["evals/files/sales.csv"],
      "assertions": [
        "Output identifies the highest revenue month",
        "Output includes exactly 3 months",
        "Revenue figures are included"
      ]
    }
  ]
}
```

Use `evals/files/` for fixtures. Keep file references relative to the skill root in this catalog.

## Workspace Shape

Each full eval loop gets a separate workspace iteration:

```text
skill-name/
  SKILL.md
  evals/
    evals.json
    files/
skill-name-workspace/
  iteration-1/
    eval-case-id/
      with_skill/
        outputs/
        timing.json
        grading.json
      without_skill/
        outputs/
        timing.json
        grading.json
    benchmark.json
```

The hand-authored file is `evals/evals.json`. Runtime or analysis steps produce `grading.json`, `timing.json`, `benchmark.json`, and optional human `feedback.json`.

## Run Pattern

Run each case in clean context:

1. Run once with the skill available.
2. Run once without the skill or with the previous skill version.
3. Grade assertions for both runs.
4. Aggregate pass rate, time, token, and delta statistics in `benchmark.json`.
5. Review outputs with a human when release evidence depends on nuanced quality.

Do not trust assertions that always pass in both conditions or always fail in both conditions. They do not show skill value until the case or assertion is improved.

## Conversion to AgentEvals

AgentV can run `evals.json` directly:

```bash
agentv eval evals/evals.json --target claude
```

When the eval needs deterministic graders, multi-turn inputs, workspace isolation, tool trajectory checks, or matrix targets, convert to AgentEvals:

```bash
agentv convert evals/evals.json --out EVAL.yaml
```

Treat conversion as a starting point. Replace vague natural-language assertions with exact graders where possible.

## Sources

- Agent Skills evaluating skills: https://agentskills.io/skill-creation/evaluating-skills
- AgentV Skill Evals integration: https://agentv.dev/docs/integrations/agent-skills-evals/
- AgentV convert docs: https://agentv.dev/docs/tools/convert/
