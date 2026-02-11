# Olive Rules

Best practices and rules for Olive.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Use `OrEmpty()` and `Or("default")` at API boundaries | MEDIUM | [`olive-use-orempty-and-or-default-at-api-boundaries.md`](olive-use-orempty-and-or-default-at-api-boundaries.md) |
| 2 | Prefer `.HasValue()` over `!string.IsNullOrWhiteSpace()` | LOW | [`olive-prefer-hasvalue-over-string-isnullorwhitespace.md`](olive-prefer-hasvalue-over-string-isnullorwhitespace.md) |
| 3 | Use `.IsValidEmail()` for quick input validation | CRITICAL | [`olive-use-isvalidemail-for-quick-input-validation.md`](olive-use-isvalidemail-for-quick-input-validation.md) |
| 4 | Apply `.ToSafeFileName()` on all user-provided file names | HIGH | [`olive-apply-tosafefilename-on-all-user-provided-file-names.md`](olive-apply-tosafefilename-on-all-user-provided-file-names.md) |
| 5 | Use `.To<T>()` for configuration parsing | MEDIUM | [`olive-use-to-t-for-configuration-parsing.md`](olive-use-to-t-for-configuration-parsing.md) |
| 6 | Avoid mixing Olive extensions with standard LINQ carelessly | HIGH | [`olive-avoid-mixing-olive-extensions-with-standard-linq-carelessly.md`](olive-avoid-mixing-olive-extensions-with-standard-linq-carelessly.md) |
| 7 | Use `.OrEmpty()` on collection parameters | HIGH | [`olive-use-orempty-on-collection-parameters.md`](olive-use-orempty-on-collection-parameters.md) |
| 8 | Prefer Olive's `.ToString(separator)` on collections | LOW | [`olive-prefer-olive-s-tostring-separator-on-collections.md`](olive-prefer-olive-s-tostring-separator-on-collections.md) |
| 9 | Keep Olive usage in application/service layers | MEDIUM | [`olive-keep-olive-usage-in-application-service-layers.md`](olive-keep-olive-usage-in-application-service-layers.md) |
| 10 | Pin the Olive NuGet version | HIGH | [`olive-pin-the-olive-nuget-version.md`](olive-pin-the-olive-nuget-version.md) |
