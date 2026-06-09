# Improvement Library Installation

## Table of Contents

- [Use When](#use-when)
- [GEPA](#gepa)
- [Microsoft Trace](#microsoft-trace)
- [VISTA](#vista)
- [SkillOpt](#skillopt)
- [Agent Lightning](#agent-lightning)
- [Agent Lightning Governance](#agent-lightning-governance)
- [Verification](#verification)
- [Sources](#sources)

## Use When

Use this reference when the user asks how to install libraries for GEPA, Microsoft Trace, VISTA-style local planning, SkillOpt, Agent Lightning, governed RL training, prompt optimization, skill improvement, or trace-based optimization.

For baseline Node/Python setup first read [`environment-setup.md`](environment-setup.md).

The bundled TypeScript CLI already implements deterministic local versions of GEPA-style reflection/frontier selection, Trace-style credit assignment, VISTA orchestration, SkillOpt-style bounded edits, Agent Lightning reward rollouts, and ASSERT-style behavior gates. Install native libraries only when the user needs the upstream package runtime, model-backed optimization, official framework integration, or native validation.

## GEPA

Basic install:

```bash
python -m pip install gepa
```

Latest development version:

```bash
python -m pip install git+https://github.com/gepa-ai/gepa.git
```

Optional installs:

```bash
python -m pip install "gepa[full]"
python -m pip install "gepa[gskill]"
python -m pip install mini-swe-agent swebench
```

Use `gepa[gskill]` only when optimizing transferable skills from software-engineering task batches. It requires Docker and benchmark/task infrastructure.

## Microsoft Trace

Install:

```bash
python -m pip install trace-opt
```

Optional AutoGen backend support:

```bash
python -m pip install "trace-opt[autogen]"
```

Development install:

```bash
git clone https://github.com/microsoft/Trace.git
cd Trace
python -m pip install -e .
```

Trace requires Python 3.9+. Starting with current docs, Trace uses LiteLLM by default for LLM backends, with optional AutoGen support for compatibility.

## VISTA

The bundled VISTA implementation is local TypeScript and requires no external install:

```bash
node skills/ai/improve/scripts/improve-cli.ts improve . --vista --out improve/vista-prompt --json
node skills/ai/improve/scripts/improve-cli.ts lint improve/vista-prompt --json
```

Use this as deterministic planning and hypothesis tracking. It does not reproduce the full VISTA paper training system and does not call an LLM.

## SkillOpt

SkillOpt requires Python 3.10+.

Install from PyPI:

```bash
python -m pip install skillopt
```

Optional extras:

```bash
python -m pip install "skillopt[alfworld]"
python -m pip install "skillopt[webui]"
python -m pip install "skillopt[claude]"
python -m pip install "skillopt[qwen]"
```

Development install:

```bash
git clone https://github.com/microsoft/SkillOpt.git
cd SkillOpt
python -m pip install -e .
```

Optional ALFWorld benchmark setup:

```bash
python -m pip install -e ".[alfworld]"
alfworld-download
```

Common provider settings:

```bash
export AZURE_OPENAI_ENDPOINT="https://your-resource.openai.azure.com/"
export AZURE_OPENAI_API_KEY="your-key"
export AZURE_OPENAI_AUTH_MODE="api_key"
export ANTHROPIC_API_KEY="sk-ant-..."
export QWEN_CHAT_BASE_URL="http://localhost:8000/v1"
export QWEN_CHAT_MODEL="Qwen/Qwen3.5-4B"
export MINIMAX_BASE_URL="https://api.minimax.io/v1"
export MINIMAX_API_KEY="..."
export MINIMAX_MODEL="MiniMax-M2.7"
```

For OpenAI-compatible endpoints, SkillOpt currently reuses `AZURE_OPENAI_*` names:

```bash
export AZURE_OPENAI_ENDPOINT="https://api.openai.com/v1"
export AZURE_OPENAI_API_KEY="sk-..."
export AZURE_OPENAI_AUTH_MODE="openai_compatible"
```

Native train/eval scripts are benchmark-specific. Use the deterministic CLI to prepare local contracts, then adapt SkillOpt configs and split schemas:

```bash
node skills/ai/improve/scripts/improve-cli.ts improve . --skillopt --vista --out improve/support-skill-opt --json
node skills/ai/improve/scripts/improve-cli.ts lint improve/support-skill-opt --json
```

## Agent Lightning

Install the main Agent Lightning package for agent optimization and RL-style training:

```bash
python -m pip install agentlightning
```

Nightly/pre-release install:

```bash
python -m pip install --upgrade --index-url https://test.pypi.org/simple/ --extra-index-url https://pypi.org/simple/ --pre agentlightning
```

Use this when the user wants the broader Agent Lightning framework for optimizing agents across existing frameworks.

## Agent Lightning Governance

Install the Agent Governance Toolkit integration when the improvement loop needs governed runners, policy rewards, or Agent OS guardrails:

```bash
python -m pip install agentmesh-lightning
python -m pip install agent-os-kernel
```

The `agentmesh-lightning` package is public preview. Prefer pinned versions in project lockfiles for repeatable training runs.

## Verification

After install, verify imports before running expensive optimization:

```bash
python -c "import gepa; print('gepa ok')"
python -c "import opto; print('trace ok')"
python -c "import skillopt; print('skillopt ok')"
python -c "import agentlightning; print('agentlightning ok')"
python -c "import agent_lightning_gov; print('agent_lightning_gov ok')"
```

Then create deterministic artifacts:

```bash
node skills/ai/improve/scripts/improve-cli.ts improve . --gepa --out improve/support-skill --json
node skills/ai/improve/scripts/improve-cli.ts improve . --skillopt --vista --out improve/support-skill-opt --json
node skills/ai/improve/scripts/improve-cli.ts improve . --agent-lightning --vista --out improve/support-skill-rl --json
```

## Sources

- GEPA quick start: https://gepa-ai.github.io/gepa/guides/quickstart/
- GEPA gskill guide: https://gepa-ai.github.io/gepa/guides/gskill/
- Microsoft Trace installation: https://microsoft.github.io/Trace/quickstart/installation.html
- Microsoft Trace repository: https://github.com/microsoft/Trace
- VISTA paper: https://arxiv.org/abs/2603.18388
- SkillOpt repository: https://github.com/microsoft/SkillOpt
- SkillOpt project docs: https://microsoft.github.io/SkillOpt/
- SkillOpt package: https://pypi.org/project/skillopt/
- SkillOpt paper: https://arxiv.org/abs/2605.23904
- Agent Lightning repository: https://github.com/microsoft/agent-lightning
- Agent Lightning docs: https://microsoft.github.io/agent-lightning/
- Agent Lightning governance package: https://github.com/microsoft/agent-governance-toolkit/tree/main/agent-governance-python/agent-lightning
