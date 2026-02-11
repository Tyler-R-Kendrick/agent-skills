# AppContext Rules

Best practices and rules for AppContext.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Use a reverse-domain naming convention for custom switches... | HIGH | [`appcontext-use-a-reverse-domain-naming-convention-for-custom-switches.md`](appcontext-use-a-reverse-domain-naming-convention-for-custom-switches.md) |
| 2 | Set all switches as early as possible in `Main` or `Program | MEDIUM | [`appcontext-set-all-switches-as-early-as-possible-in-main-or-program.md`](appcontext-set-all-switches-as-early-as-possible-in-main-or-program.md) |
| 3 | Always provide a safe default when a switch is unset by... | CRITICAL | [`appcontext-always-provide-a-safe-default-when-a-switch-is-unset-by.md`](appcontext-always-provide-a-safe-default-when-a-switch-is-unset-by.md) |
| 4 | Document every custom switch with its name, default value,... | MEDIUM | [`appcontext-document-every-custom-switch-with-its-name-default-value.md`](appcontext-document-every-custom-switch-with-its-name-default-value.md) |
| 5 | Expose switch names as `public const string` fields in a... | MEDIUM | [`appcontext-expose-switch-names-as-public-const-string-fields-in-a.md`](appcontext-expose-switch-names-as-public-const-string-fields-in-a.md) |
| 6 | Reserve `AppContext` switches for binary compatibility... | CRITICAL | [`appcontext-reserve-appcontext-switches-for-binary-compatibility.md`](appcontext-reserve-appcontext-switches-for-binary-compatibility.md) |
| 7 | Prefer `runtimeconfig | LOW | [`appcontext-prefer-runtimeconfig.md`](appcontext-prefer-runtimeconfig.md) |
| 8 | Write unit tests that exercise both switch states by... | MEDIUM | [`appcontext-write-unit-tests-that-exercise-both-switch-states-by.md`](appcontext-write-unit-tests-that-exercise-both-switch-states-by.md) |
| 9 | Avoid reading a switch value on every method call in a hot... | HIGH | [`appcontext-avoid-reading-a-switch-value-on-every-method-call-in-a-hot.md`](appcontext-avoid-reading-a-switch-value-on-every-method-call-in-a-hot.md) |
| 10 | Review switches set by the | MEDIUM | [`appcontext-review-switches-set-by-the.md`](appcontext-review-switches-set-by-the.md) |
