# Pulumi Rules

Best practices and rules for Pulumi.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Always run `pulumi preview` before `pulumi up` to review... | CRITICAL | [`pulumi-always-run-pulumi-preview-before-pulumi-up-to-review.md`](pulumi-always-run-pulumi-preview-before-pulumi-up-to-review.md) |
| 2 | Use `ComponentResource` classes for reusable infrastructure... | MEDIUM | [`pulumi-use-componentresource-classes-for-reusable-infrastructure.md`](pulumi-use-componentresource-classes-for-reusable-infrastructure.md) |
| 3 | Never call ` | CRITICAL | [`pulumi-never-call.md`](pulumi-never-call.md) |
| 4 | Use `pulumi | CRITICAL | [`pulumi-use-pulumi.md`](pulumi-use-pulumi.md) |
| 5 | Use stack references for cross-stack dependencies instead... | MEDIUM | [`pulumi-use-stack-references-for-cross-stack-dependencies-instead.md`](pulumi-use-stack-references-for-cross-stack-dependencies-instead.md) |
| 6 | Pin provider package versions in `package | HIGH | [`pulumi-pin-provider-package-versions-in-package.md`](pulumi-pin-provider-package-versions-in-package.md) |
| 7 | Use `aliases` when renaming resources to avoid... | HIGH | [`pulumi-use-aliases-when-renaming-resources-to-avoid.md`](pulumi-use-aliases-when-renaming-resources-to-avoid.md) |
