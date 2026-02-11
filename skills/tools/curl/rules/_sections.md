# curl & HTTP Clients Rules

Best practices and rules for curl & HTTP Clients.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Use `-s` and pipe to `jq` for scripted API calls | HIGH | [`curl-use-s-and-pipe-to-jq-for-scripted-api-calls.md`](curl-use-s-and-pipe-to-jq-for-scripted-api-calls.md) |
| 2 | Always set timeouts (`--connect-timeout` and `--max-time`)... | CRITICAL | [`curl-always-set-timeouts-connect-timeout-and-max-time.md`](curl-always-set-timeouts-connect-timeout-and-max-time.md) |
| 3 | Use HTTPie for interactive API exploration | MEDIUM | [`curl-use-httpie-for-interactive-api-exploration.md`](curl-use-httpie-for-interactive-api-exploration.md) |
| 4 | Prefer curl for scripting and CI | LOW | [`curl-prefer-curl-for-scripting-and-ci.md`](curl-prefer-curl-for-scripting-and-ci.md) |
| 5 | Use `-w` format strings for response inspection in scripts... | MEDIUM | [`curl-use-w-format-strings-for-response-inspection-in-scripts.md`](curl-use-w-format-strings-for-response-inspection-in-scripts.md) |
| 6 | Store auth tokens in environment variables, not directly on... | HIGH | [`curl-store-auth-tokens-in-environment-variables-not-directly-on.md`](curl-store-auth-tokens-in-environment-variables-not-directly-on.md) |
