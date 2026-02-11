# Terraform Rules

Best practices and rules for Terraform.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Always run `terraform plan` before `apply` and review the... | CRITICAL | [`terraform-always-run-terraform-plan-before-apply-and-review-the.md`](terraform-always-run-terraform-plan-before-apply-and-review-the.md) |
| 2 | Use remote state with locking (S3 + DynamoDB, Terraform... | MEDIUM | [`terraform-use-remote-state-with-locking-s3-dynamodb-terraform.md`](terraform-use-remote-state-with-locking-s3-dynamodb-terraform.md) |
| 3 | Pin provider versions with `~>` constraints to avoid... | HIGH | [`terraform-pin-provider-versions-with-constraints-to-avoid.md`](terraform-pin-provider-versions-with-constraints-to-avoid.md) |
| 4 | Use modules for reusable infrastructure patterns | MEDIUM | [`terraform-use-modules-for-reusable-infrastructure-patterns.md`](terraform-use-modules-for-reusable-infrastructure-patterns.md) |
| 5 | Use `terraform fmt` and `terraform validate` in CI | HIGH | [`terraform-use-terraform-fmt-and-terraform-validate-in-ci.md`](terraform-use-terraform-fmt-and-terraform-validate-in-ci.md) |
| 6 | Never store secrets in ` | CRITICAL | [`terraform-never-store-secrets-in.md`](terraform-never-store-secrets-in.md) |
| 7 | Use `lifecycle { prevent_destroy = true }` on critical... | CRITICAL | [`terraform-use-lifecycle-prevent-destroy-true-on-critical.md`](terraform-use-lifecycle-prevent-destroy-true-on-critical.md) |
| 8 | Use workspaces or directory structure for environment... | MEDIUM | [`terraform-use-workspaces-or-directory-structure-for-environment.md`](terraform-use-workspaces-or-directory-structure-for-environment.md) |
