# Environment Setup

## Table of Contents

- [Use When](#use-when)
- [Baseline Toolchain](#baseline-toolchain)
- [Local CLI](#local-cli)
- [Python Environment](#python-environment)
- [Provider Secrets](#provider-secrets)
- [Verification Checklist](#verification-checklist)
- [Sources](#sources)

## Use When

Use this reference when the user asks how to install dependencies, set up the local machine, prepare a repo for eval or improvement work, or debug missing runtime tools.

For standard-specific tools, continue to:

- Eval tools: [`install-eval-tools.md`](install-eval-tools.md)
- Improvement libraries: [`install-improvement-libs.md`](install-improvement-libs.md)

## Baseline Toolchain

Recommended baseline:

| Tool | Why |
|---|---|
| Node.js 24+ | Runs the bundled dependency-free TypeScript CLI via native type stripping |
| Python 3.10+ | Works for GEPA and SkillOpt; many eval and tracing packages require 3.10+ or newer |
| Python 3.11+ | Preferred for ASSERT based on current repo badges and examples |
| Git | Needed for editable installs and source-based packages |
| Docker | Needed for GEPA gskill/SWE-style task environments and many agent sandboxes |

Check the host before installing:

```bash
node --version
python --version
git --version
docker --version
```

## Local CLI

The bundled CLI has no npm dependencies:

```bash
node skills/ai/improve/scripts/improve-cli.ts --help
```

Use it for deterministic workspace generation and structural checks before installing heavier external tools:

```bash
node skills/ai/improve/scripts/improve-cli.ts eval evals/support-agent --agentevals --json
node skills/ai/improve/scripts/improve-cli.ts lint evals/support-agent --agentevals --json
node skills/ai/improve/scripts/improve-cli.ts improve . --gepa --out improve/support-skill --json
node skills/ai/improve/scripts/improve-cli.ts lint improve/support-skill --json
```

## Python Environment

Prefer a project-local virtual environment:

```bash
python -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
```

On Windows PowerShell:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
```

Keep optimizer/eval packages out of the system Python unless the user explicitly wants a global install.

## Provider Secrets

Most native eval and optimizer tools need provider credentials only when they call models. Keep secrets in `.env`, CI secret storage, or the user's existing secret manager.

Common names:

```bash
OPENAI_API_KEY=...
ANTHROPIC_API_KEY=...
AZURE_OPENAI_API_KEY=...
AZURE_OPENAI_ENDPOINT=...
```

Do not write secrets into generated eval files, prompts, traces, or reports.

## Verification Checklist

After setup:

```bash
node skills/ai/improve/scripts/improve-cli.ts --help
python -m pip --version
```

Then run the native tool checks relevant to the requested standard or technique from:

- [`install-eval-tools.md`](install-eval-tools.md)
- [`install-improvement-libs.md`](install-improvement-libs.md)

## Sources

- Node.js releases: https://nodejs.org/
- Python venv documentation: https://docs.python.org/3/library/venv.html
- AgentV docs: https://agentv.dev/
- GEPA quick start: https://gepa-ai.github.io/gepa/guides/quickstart/
- Trace installation: https://microsoft.github.io/Trace/quickstart/installation.html
- SkillOpt repository: https://github.com/microsoft/SkillOpt
- ASSERT repository: https://github.com/responsibleai/ASSERT
- Agent Lightning: https://github.com/microsoft/agent-lightning
