# Kubernetes Rules

Best practices and rules for Kubernetes.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Always set resource `requests` and `limits` to ensure fair... | CRITICAL | [`kubernetes-always-set-resource-requests-and-limits-to-ensure-fair.md`](kubernetes-always-set-resource-requests-and-limits-to-ensure-fair.md) |
| 2 | Use liveness probes (restart on failure) and readiness... | MEDIUM | [`kubernetes-use-liveness-probes-restart-on-failure-and-readiness.md`](kubernetes-use-liveness-probes-restart-on-failure-and-readiness.md) |
| 3 | Use Secrets for sensitive data, ConfigMaps for... | CRITICAL | [`kubernetes-use-secrets-for-sensitive-data-configmaps-for.md`](kubernetes-use-secrets-for-sensitive-data-configmaps-for.md) |
| 4 | Use `kubectl diff` before `kubectl apply` to review changes | MEDIUM | [`kubernetes-use-kubectl-diff-before-kubectl-apply-to-review-changes.md`](kubernetes-use-kubectl-diff-before-kubectl-apply-to-review-changes.md) |
| 5 | Pin container image tags to specific versions (not... | MEDIUM | [`kubernetes-pin-container-image-tags-to-specific-versions-not.md`](kubernetes-pin-container-image-tags-to-specific-versions-not.md) |
| 6 | Use namespaces to isolate environments or teams | MEDIUM | [`kubernetes-use-namespaces-to-isolate-environments-or-teams.md`](kubernetes-use-namespaces-to-isolate-environments-or-teams.md) |
| 7 | Use labels and selectors consistently for organizing and... | MEDIUM | [`kubernetes-use-labels-and-selectors-consistently-for-organizing-and.md`](kubernetes-use-labels-and-selectors-consistently-for-organizing-and.md) |
| 8 | Use rolling update strategy (default) with `maxUnavailable`... | MEDIUM | [`kubernetes-use-rolling-update-strategy-default-with-maxunavailable.md`](kubernetes-use-rolling-update-strategy-default-with-maxunavailable.md) |
