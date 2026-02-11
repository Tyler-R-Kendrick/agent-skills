# Helm Rules

Best practices and rules for Helm.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Always run `helm template` or `helm install --dry-run` to... | CRITICAL | [`helm-always-run-helm-template-or-helm-install-dry-run-to.md`](helm-always-run-helm-template-or-helm-install-dry-run-to.md) |
| 2 | Use `_helpers | MEDIUM | [`helm-use-helpers.md`](helm-use-helpers.md) |
| 3 | Use `values | MEDIUM | [`helm-use-values.md`](helm-use-values.md) |
| 4 | Pin chart dependency versions to avoid breaking changes | HIGH | [`helm-pin-chart-dependency-versions-to-avoid-breaking-changes.md`](helm-pin-chart-dependency-versions-to-avoid-breaking-changes.md) |
| 5 | Use `helm lint` in CI to catch template errors early | MEDIUM | [`helm-use-helm-lint-in-ci-to-catch-template-errors-early.md`](helm-use-helm-lint-in-ci-to-catch-template-errors-early.md) |
| 6 | Use Helm's built-in `required` function to fail fast on... | HIGH | [`helm-use-helm-s-built-in-required-function-to-fail-fast-on.md`](helm-use-helm-s-built-in-required-function-to-fail-fast-on.md) |
| 7 | Use semantic versioning for chart versions and `appVersion`... | MEDIUM | [`helm-use-semantic-versioning-for-chart-versions-and-appversion.md`](helm-use-semantic-versioning-for-chart-versions-and-appversion.md) |
