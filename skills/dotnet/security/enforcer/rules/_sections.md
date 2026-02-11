# Enforcer (Casbin.NET) Rules

Best practices and rules for Enforcer (Casbin.NET).

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Choose the simplest model that meets your needs | HIGH | [`enforcer-choose-the-simplest-model-that-meets-your-needs.md`](enforcer-choose-the-simplest-model-that-meets-your-needs.md) |
| 2 | Store policies in a database for production | CRITICAL | [`enforcer-store-policies-in-a-database-for-production.md`](enforcer-store-policies-in-a-database-for-production.md) |
| 3 | Cache enforcement decisions for hot paths | HIGH | [`enforcer-cache-enforcement-decisions-for-hot-paths.md`](enforcer-cache-enforcement-decisions-for-hot-paths.md) |
| 4 | Register the Enforcer as a singleton | HIGH | [`enforcer-register-the-enforcer-as-a-singleton.md`](enforcer-register-the-enforcer-as-a-singleton.md) |
| 5 | Use the ASP.NET Core authorization pipeline | HIGH | [`enforcer-use-the-asp-net-core-authorization-pipeline.md`](enforcer-use-the-asp-net-core-authorization-pipeline.md) |
| 6 | Separate model definitions from policy data | CRITICAL | [`enforcer-separate-model-definitions-from-policy-data.md`](enforcer-separate-model-definitions-from-policy-data.md) |
| 7 | Audit all policy changes | MEDIUM | [`enforcer-audit-all-policy-changes.md`](enforcer-audit-all-policy-changes.md) |
| 8 | Test authorization rules with dedicated unit tests | MEDIUM | [`enforcer-test-authorization-rules-with-dedicated-unit-tests.md`](enforcer-test-authorization-rules-with-dedicated-unit-tests.md) |
| 9 | Use role hierarchy for permission inheritance | MEDIUM | [`enforcer-use-role-hierarchy-for-permission-inheritance.md`](enforcer-use-role-hierarchy-for-permission-inheritance.md) |
| 10 | Implement a policy management API | MEDIUM | [`enforcer-implement-a-policy-management-api.md`](enforcer-implement-a-policy-management-api.md) |
