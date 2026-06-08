# Learn CLI Usage

The TypeScript CLI writes deterministic steering artifacts. Build it first:

```bash
npm run learn:build
```

## Commands

| Command | Purpose |
|---------|---------|
| `template` | Print JSON input shape for an agent to fill |
| `init --home <dir>` | Create `STEERING.md` and `.steering/` |
| `add --home <dir> --input <json|- >` | Write one RDF file and regenerate the index |
| `lint --home <dir>` | Validate index links, RDF fields, evidence URIs, and duplicate IDs |

If `--home` is omitted, the CLI uses `$AGENTS_HOME`, then `~/.agents`.

## Input Shape

```json
{
  "title": "Prefer executable proof over screenshots",
  "category": "evidence",
  "trigger": "UI completion claims",
  "correction": "Screenshots alone are not accepted proof for this workflow.",
  "preferredStrategy": "Run the executable recording or validation flow before claiming completion.",
  "generalizedRule": "When a workflow has a canonical proof command, use it before declaring success.",
  "zpdScaffold": "Pause before final summary and ask which proof contract applies.",
  "evidence": ["memory://MEMORY.md:1375"],
  "scope": "global",
  "confidence": 0.9,
  "avoid": ["Do not treat visual inspection as the full evidence contract."],
  "createdAt": "2026-06-08T00:00:00.000Z"
}
```

## Output

All commands print JSON to stdout. Errors print JSON with `status: "error"` and exit non-zero.
