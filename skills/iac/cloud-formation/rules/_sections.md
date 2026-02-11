# AWS CloudFormation Rules

Best practices and rules for AWS CloudFormation.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Always use change sets to preview updates before applying | CRITICAL | [`cloud-formation-always-use-change-sets-to-preview-updates-before-applying.md`](cloud-formation-always-use-change-sets-to-preview-updates-before-applying.md) |
| 2 | Use parameters and conditions to make templates reusable... | MEDIUM | [`cloud-formation-use-parameters-and-conditions-to-make-templates-reusable.md`](cloud-formation-use-parameters-and-conditions-to-make-templates-reusable.md) |
| 3 | Enable termination protection on production stacks | CRITICAL | [`cloud-formation-enable-termination-protection-on-production-stacks.md`](cloud-formation-enable-termination-protection-on-production-stacks.md) |
| 4 | Use `DependsOn` only when CloudFormation can't infer... | MEDIUM | [`cloud-formation-use-dependson-only-when-cloudformation-can-t-infer.md`](cloud-formation-use-dependson-only-when-cloudformation-can-t-infer.md) |
| 5 | Export outputs for cross-stack references instead of... | MEDIUM | [`cloud-formation-export-outputs-for-cross-stack-references-instead-of.md`](cloud-formation-export-outputs-for-cross-stack-references-instead-of.md) |
| 6 | Use `DeletionPolicy | MEDIUM | [`cloud-formation-use-deletionpolicy.md`](cloud-formation-use-deletionpolicy.md) |
| 7 | Validate templates before deploying | HIGH | [`cloud-formation-validate-templates-before-deploying.md`](cloud-formation-validate-templates-before-deploying.md) |
