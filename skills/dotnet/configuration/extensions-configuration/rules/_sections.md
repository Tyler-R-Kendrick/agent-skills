# Configuration Rules

Best practices and rules for Configuration.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Always define a dedicated options class with a `const... | CRITICAL | [`extensions-configuration-always-define-a-dedicated-options-class-with-a-const.md`](extensions-configuration-always-define-a-dedicated-options-class-with-a-const.md) |
| 2 | Call `ValidateDataAnnotations() | HIGH | [`extensions-configuration-call-validatedataannotations.md`](extensions-configuration-call-validatedataannotations.md) |
| 3 | Never store secrets in `appsettings | CRITICAL | [`extensions-configuration-never-store-secrets-in-appsettings.md`](extensions-configuration-never-store-secrets-in-appsettings.md) |
| 4 | Use `IOptionsSnapshot<T>` in scoped services (e | MEDIUM | [`extensions-configuration-use-ioptionssnapshot-t-in-scoped-services-e.md`](extensions-configuration-use-ioptionssnapshot-t-in-scoped-services-e.md) |
| 5 | Prefix environment variables with a unique application... | HIGH | [`extensions-configuration-prefix-environment-variables-with-a-unique-application.md`](extensions-configuration-prefix-environment-variables-with-a-unique-application.md) |
| 6 | Keep each options class focused on a single concern; split... | MEDIUM | [`extensions-configuration-keep-each-options-class-focused-on-a-single-concern-split.md`](extensions-configuration-keep-each-options-class-focused-on-a-single-concern-split.md) |
| 7 | Write integration tests that load a test-specific... | MEDIUM | [`extensions-configuration-write-integration-tests-that-load-a-test-specific.md`](extensions-configuration-write-integration-tests-that-load-a-test-specific.md) |
| 8 | Use named options (`services | MEDIUM | [`extensions-configuration-use-named-options-services.md`](extensions-configuration-use-named-options-services.md) |
| 9 | Register custom post-configuration logic with... | MEDIUM | [`extensions-configuration-register-custom-post-configuration-logic-with.md`](extensions-configuration-register-custom-post-configuration-logic-with.md) |
| 10 | Log the effective configuration at startup at the `Debug`... | CRITICAL | [`extensions-configuration-log-the-effective-configuration-at-startup-at-the-debug.md`](extensions-configuration-log-the-effective-configuration-at-startup-at-the-debug.md) |
