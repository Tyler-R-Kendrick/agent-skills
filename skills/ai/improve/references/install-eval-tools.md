# Eval Tool Installation

## Table of Contents

- [Use When](#use-when)
- [AgentEvals and AgentV](#agentevals-and-agentv)
- [Agent Skills Evals](#agent-skills-evals)
- [ASSERT](#assert)
- [Environment Variables](#environment-variables)
- [Native Validation](#native-validation)
- [Sources](#sources)

## Use When

Use this reference when the user asks how to install or configure tools for AgentEvals, AgentV, Agent Skills evals, ASSERT, eval runners, judges, graders, or native eval validation.

For baseline Node/Python setup first read [`environment-setup.md`](environment-setup.md).

## AgentEvals and AgentV

AgentV is the default native implementation for AgentEvals.

Install:

```bash
npm install -g agentv
```

Initialize and configure:

```bash
agentv init
cp .env.example .env
```

Run or validate generated evals:

```bash
agentv validate EVAL.yaml
agentv eval EVAL.yaml
agentv compare run-a run-b
```

Use the bundled structural linter before or after native validation:

```bash
node skills/ai/improve/scripts/improve-cli.ts lint evals/support-agent --agentevals --json
```

## Agent Skills Evals

Agent Skills evals are file-contract driven. The authored eval artifact is usually:

```text
evals/evals.json
```

Install the repository's existing validator/runner first when present. In this repo, use the local validation command after generation:

```bash
agentskills validate skills/ai/improve
```

Use the bundled CLI for deterministic structural checks:

```bash
node skills/ai/improve/scripts/improve-cli.ts eval skills/ai/support-skill --agent-skills --json
node skills/ai/improve/scripts/improve-cli.ts lint skills/ai/support-skill --agent-skills --json
```

If converting to AgentEvals, install AgentV and use its conversion workflow, then revalidate the generated `EVAL.yaml`.

## ASSERT

ASSERT is available as the `assert-ai` package and also supports source installs. Prefer a virtual environment.

PyPI install:

```bash
python -m pip install assert-ai
python -m pip install "assert-ai[otel,langgraph]"
python -m pip install "assert-ai[all]"
```

Source install:

```bash
git clone https://github.com/responsibleai/ASSERT.git
cd ASSERT
python -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
python -m pip install -e ".[otel,langgraph]"
cp .env.example .env
```

On Windows PowerShell:

```powershell
git clone https://github.com/responsibleai/ASSERT.git
cd ASSERT
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
python -m pip install -e ".[otel,langgraph]"
Copy-Item .env.example .env
```

Run an example or a generated config:

```bash
assert-ai run --config examples/travel_planner_langgraph/eval_config.yaml
assert-ai run --config eval_config.yaml
assert-ai judge-traces --traces traces.jsonl --config eval_config.yaml
assert-ai results compare <suite> <baseline-run> <candidate-run>
```

Use the bundled linter to catch obvious structure problems before native runs:

```bash
node skills/ai/improve/scripts/improve-cli.ts lint evals/assert-suite --assert --json
```

## Environment Variables

Store provider credentials outside generated artifacts:

```bash
OPENAI_API_KEY=...
ANTHROPIC_API_KEY=...
AZURE_OPENAI_API_KEY=...
AZURE_OPENAI_ENDPOINT=...
```

ASSERT and AgentV can call external providers depending on config. Check provider-specific docs for the exact key names your model backend expects.

## Native Validation

Use this order:

1. Scaffold or update files with `improve-cli`.
2. Run `improve-cli lint <path> --agentevals|--agent-skills|--assert`.
3. Run the standard-native validator or runner.
4. Save result artifacts with the eval suite.

Report native validation as skipped when the tool is not installed, rather than substituting structural checks as proof of runtime correctness.

## Sources

- AgentV docs: https://agentv.dev/
- AgentV documentation: https://agentv.dev/docs/
- AgentV Agent Skills integration: https://agentv.dev/docs/integrations/agent-skills-evals/
- AgentV convert docs: https://agentv.dev/docs/tools/convert/
- Agent Skills eval guide: https://agentskills.io/skill-creation/evaluating-skills
- Agent Skills CLI docs: https://www.agentskills.in/docs/getting-started
- ASSERT repository: https://github.com/responsibleai/ASSERT
- ASSERT project docs: https://responsibleai.github.io/ASSERT/
- ASSERT PyPI package: https://pypi.org/project/assert-ai/
