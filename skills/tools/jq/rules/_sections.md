# jq & Data Processing Rules

Best practices and rules for jq & Data Processing.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Use jq for any JSON manipulation in shell scripts | MEDIUM | [`jq-use-jq-for-any-json-manipulation-in-shell-scripts.md`](jq-use-jq-for-any-json-manipulation-in-shell-scripts.md) |
| 2 | Pipe `curl -s` to jq for API work | MEDIUM | [`jq-pipe-curl-s-to-jq-for-api-work.md`](jq-pipe-curl-s-to-jq-for-api-work.md) |
| 3 | Use yq for editing Kubernetes manifests, Helm values, and... | MEDIUM | [`jq-use-yq-for-editing-kubernetes-manifests-helm-values-and.md`](jq-use-yq-for-editing-kubernetes-manifests-helm-values-and.md) |
| 4 | Prefer jq over grep/awk for JSON | LOW | [`jq-prefer-jq-over-grep-awk-for-json.md`](jq-prefer-jq-over-grep-awk-for-json.md) |
| 5 | Use `-r` for raw string output in scripts to avoid quoted... | HIGH | [`jq-use-r-for-raw-string-output-in-scripts-to-avoid-quoted.md`](jq-use-r-for-raw-string-output-in-scripts-to-avoid-quoted.md) |
| 6 | Learn `select()` and `map()` | MEDIUM | [`jq-learn-select-and-map.md`](jq-learn-select-and-map.md) |
