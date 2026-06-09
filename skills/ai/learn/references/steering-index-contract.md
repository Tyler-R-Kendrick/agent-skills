# Steering Index Contract

`~/.agents/STEERING.md` is a progressive-disclosure index. It should tell an agent when to load a learning, not carry the full learning itself.

## Required Layout

```markdown
# Agent Steering

This file indexes generalized reasoning strategies learned from user feedback.
Load linked RDF entries only when the IF condition matches the current task.

## Load Policy

- Start with this index when available.
- Load only matching RDF files from `.steering/`.
- Prefer fresher, higher-confidence, narrower-scope entries when rules conflict.
- Treat evidence links as provenance, not as always-loaded context.

## Steering Entries

| IF current task involves | THEN load | Strategy | Confidence | Scope |
|--------------------------|-----------|----------|------------|-------|
| deployment proof claims | [.steering/proof/platform-proof.ttl](.steering/proof/platform-proof.ttl) | Verify platform path before provider evidence | 0.90 | global |
```

## Entry Rules

- `IF current task involves` must be a concise trigger, not a paragraph.
- `THEN load` must be a relative link to one RDF/Turtle file.
- `Strategy` must summarize the reasoning rule in one sentence.
- `Confidence` is `0.00` through `1.00`.
- `Scope` defaults to `global`; use a narrower value when the rule applies only to one repo, domain, or workflow.

## Instruction Hook

Agents may add this snippet to AGENTS.md-like files when the user explicitly asks for steering integration:

```markdown
When available, read `~/.agents/STEERING.md` before starting substantial work. Load only the linked `.steering/*.ttl` entries whose IF conditions match the current task, and let those generalized strategies shape your reasoning.
```
