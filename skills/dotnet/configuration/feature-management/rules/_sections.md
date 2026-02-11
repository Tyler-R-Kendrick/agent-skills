# Feature Management Rules

Best practices and rules for Feature Management.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Define feature flag names as constants in a static class (e | MEDIUM | [`feature-management-define-feature-flag-names-as-constants-in-a-static-class-e.md`](feature-management-define-feature-flag-names-as-constants-in-a-static-class-e.md) |
| 2 | Always test both the enabled and disabled code paths in... | CRITICAL | [`feature-management-always-test-both-the-enabled-and-disabled-code-paths-in.md`](feature-management-always-test-both-the-enabled-and-disabled-code-paths-in.md) |
| 3 | Use the `TargetingFilter` for gradual rollouts rather than... | CRITICAL | [`feature-management-use-the-targetingfilter-for-gradual-rollouts-rather-than.md`](feature-management-use-the-targetingfilter-for-gradual-rollouts-rather-than.md) |
| 4 | Establish a process to remove feature flags after a feature... | MEDIUM | [`feature-management-establish-a-process-to-remove-feature-flags-after-a-feature.md`](feature-management-establish-a-process-to-remove-feature-flags-after-a-feature.md) |
| 5 | Prefer the `[FeatureGate]` attribute or Razor tag helpers... | LOW | [`feature-management-prefer-the-featuregate-attribute-or-razor-tag-helpers.md`](feature-management-prefer-the-featuregate-attribute-or-razor-tag-helpers.md) |
| 6 | Use Azure App Configuration as the backing store in... | CRITICAL | [`feature-management-use-azure-app-configuration-as-the-backing-store-in.md`](feature-management-use-azure-app-configuration-as-the-backing-store-in.md) |
| 7 | Combine multiple filters with `RequirementType | HIGH | [`feature-management-combine-multiple-filters-with-requirementtype.md`](feature-management-combine-multiple-filters-with-requirementtype.md) |
| 8 | Log feature flag evaluation results at the `Debug` level to... | MEDIUM | [`feature-management-log-feature-flag-evaluation-results-at-the-debug-level-to.md`](feature-management-log-feature-flag-evaluation-results-at-the-debug-level-to.md) |
| 9 | Implement `ITargetingContextAccessor` to provide user... | MEDIUM | [`feature-management-implement-itargetingcontextaccessor-to-provide-user.md`](feature-management-implement-itargetingcontextaccessor-to-provide-user.md) |
| 10 | Avoid nesting feature flag checks more than one level deep;... | HIGH | [`feature-management-avoid-nesting-feature-flag-checks-more-than-one-level-deep.md`](feature-management-avoid-nesting-feature-flag-checks-more-than-one-level-deep.md) |
