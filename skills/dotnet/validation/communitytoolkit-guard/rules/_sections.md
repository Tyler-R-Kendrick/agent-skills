# CommunityToolkit Guard Rules

Best practices and rules for CommunityToolkit Guard.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Place guard clauses at the top of public and protected methods, before any logic | CRITICAL | [`communitytoolkit-guard-place-guard-clauses-at-the-top-of-public-and-protected.md`](communitytoolkit-guard-place-guard-clauses-at-the-top-of-public-and-protected.md) |
| 2 | Use `Guard.IsNotNullOrWhiteSpace` instead of `Guard.IsNotNull` for string parameters | CRITICAL | [`communitytoolkit-guard-use-guard-isnotnullorwhitespace-instead-of-guard-isnotnull.md`](communitytoolkit-guard-use-guard-isnotnullorwhitespace-instead-of-guard-isnotnull.md) |
| 3 | Prefer `Guard.IsInRange(value, min, max)` over separate `IsGreaterThan` and `IsLessThan` calls | LOW | [`communitytoolkit-guard-prefer-guard-isinrange-value-min-max-over-separate.md`](communitytoolkit-guard-prefer-guard-isinrange-value-min-max-over-separate.md) |
| 4 | Combine guards with private constructors on value objects | HIGH | [`communitytoolkit-guard-combine-guards-with-private-constructors-on-value-objects.md`](communitytoolkit-guard-combine-guards-with-private-constructors-on-value-objects.md) |
| 5 | Use `Guard.IsDefined(enumValue)` on every public method that accepts an enum parameter | MEDIUM | [`communitytoolkit-guard-use-guard-isdefined-enumvalue-on-every-public-method-that.md`](communitytoolkit-guard-use-guard-isdefined-enumvalue-on-every-public-method-that.md) |
| 6 | Use `Guard.HasSizeGreaterThan(collection, 0)` instead of checking `.Count > 0` manually and throwing | MEDIUM | [`communitytoolkit-guard-use-guard-hassizegreaterthan-collection-0-instead-of.md`](communitytoolkit-guard-use-guard-hassizegreaterthan-collection-0-instead-of.md) |
| 7 | Do not use Guard for business-rule validation that should return error messages to users | CRITICAL | [`communitytoolkit-guard-do-not-use-guard-for-business-rule-validation-that-should.md`](communitytoolkit-guard-do-not-use-guard-for-business-rule-validation-that-should.md) |
| 8 | Use `ThrowHelper.ThrowArgumentException(nameof(param), message)` for custom validation logic | MEDIUM | [`communitytoolkit-guard-use-throwhelper-throwargumentexception-nameof-param-message.md`](communitytoolkit-guard-use-throwhelper-throwargumentexception-nameof-param-message.md) |
| 9 | Apply `Guard.IsNotNull` on injected dependencies in constructor bodies rather than relying on nullable reference type warnings | HIGH | [`communitytoolkit-guard-apply-guard-isnotnull-on-injected-dependencies-in.md`](communitytoolkit-guard-apply-guard-isnotnull-on-injected-dependencies-in.md) |
| 10 | Avoid wrapping Guard calls in try-catch blocks in the same method | CRITICAL | [`communitytoolkit-guard-avoid-wrapping-guard-calls-in-try-catch-blocks-in-the-same.md`](communitytoolkit-guard-avoid-wrapping-guard-calls-in-try-catch-blocks-in-the-same.md) |
