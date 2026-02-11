# Topaz Rules

Best practices and rules for Topaz.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Model your permission hierarchy carefully before writing code | MEDIUM | [`topaz-model-your-permission-hierarchy-carefully-before-writing.md`](topaz-model-your-permission-hierarchy-carefully-before-writing.md) |
| 2 | Use the Topaz directory as the single source of truth for relationships | MEDIUM | [`topaz-use-the-topaz-directory-as-the-single-source-of-truth-for.md`](topaz-use-the-topaz-directory-as-the-single-source-of-truth-for.md) |
| 3 | Run Topaz as a sidecar in production | CRITICAL | [`topaz-run-topaz-as-a-sidecar-in-production.md`](topaz-run-topaz-as-a-sidecar-in-production.md) |
| 4 | Batch relationship writes when provisioning resources | HIGH | [`topaz-batch-relationship-writes-when-provisioning-resources.md`](topaz-batch-relationship-writes-when-provisioning-resources.md) |
| 5 | Use `CheckPermission` instead of `CheckRelation` | MEDIUM | [`topaz-use-checkpermission-instead-of-checkrelation.md`](topaz-use-checkpermission-instead-of-checkrelation.md) |
| 6 | Cache authorization decisions at the edge for read-heavy workloads | MEDIUM | [`topaz-cache-authorization-decisions-at-the-edge-for-read-heavy.md`](topaz-cache-authorization-decisions-at-the-edge-for-read-heavy.md) |
| 7 | Write Rego policies for complex business rules | MEDIUM | [`topaz-write-rego-policies-for-complex-business-rules.md`](topaz-write-rego-policies-for-complex-business-rules.md) |
| 8 | Test your authorization model with the Topaz CLI | MEDIUM | [`topaz-test-your-authorization-model-with-the-topaz-cli.md`](topaz-test-your-authorization-model-with-the-topaz-cli.md) |
| 9 | Audit relationship changes | MEDIUM | [`topaz-audit-relationship-changes.md`](topaz-audit-relationship-changes.md) |
| 10 | Separate authorization concerns from business logic | MEDIUM | [`topaz-separate-authorization-concerns-from-business-logic.md`](topaz-separate-authorization-concerns-from-business-logic.md) |
