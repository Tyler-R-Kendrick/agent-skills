# Fluent Serializer Rules

Best practices and rules for Fluent Serializer.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Return `this` from every configuration method | CRITICAL | [`fluent-serializer-return-this-from-every-configuration-method.md`](fluent-serializer-return-this-from-every-configuration-method.md) |
| 2 | Make `Build()` return a copy of the options | HIGH | [`fluent-serializer-make-build-return-a-copy-of-the-options.md`](fluent-serializer-make-build-return-a-copy-of-the-options.md) |
| 3 | Create named profiles for distinct serialization contexts | MEDIUM | [`fluent-serializer-create-named-profiles-for-distinct-serialization-contexts.md`](fluent-serializer-create-named-profiles-for-distinct-serialization-contexts.md) |
| 4 | Register the profile registry as a singleton | MEDIUM | [`fluent-serializer-register-the-profile-registry-as-a-singleton.md`](fluent-serializer-register-the-profile-registry-as-a-singleton.md) |
| 5 | Default to camelCase and null-ignoring for API profiles | MEDIUM | [`fluent-serializer-default-to-camelcase-and-null-ignoring-for-api-profiles.md`](fluent-serializer-default-to-camelcase-and-null-ignoring-for-api-profiles.md) |
| 6 | Add `WithEnumStrings()` for APIs and `WithEnumNumbers()` for storage | MEDIUM | [`fluent-serializer-add-withenumstrings-for-apis-and-withenumnumbers-for-storage.md`](fluent-serializer-add-withenumstrings-for-apis-and-withenumnumbers-for-storage.md) |
| 7 | Validate that profiles exist at startup | HIGH | [`fluent-serializer-validate-that-profiles-exist-at-startup.md`](fluent-serializer-validate-that-profiles-exist-at-startup.md) |
| 8 | Use `JsonSerializerOptions.Default` as the base | MEDIUM | [`fluent-serializer-use-jsonserializeroptions-default-as-the-base.md`](fluent-serializer-use-jsonserializeroptions-default-as-the-base.md) |
| 9 | Avoid mutating options after first use | CRITICAL | [`fluent-serializer-avoid-mutating-options-after-first-use.md`](fluent-serializer-avoid-mutating-options-after-first-use.md) |
| 10 | Write unit tests for each profile | MEDIUM | [`fluent-serializer-write-unit-tests-for-each-profile.md`](fluent-serializer-write-unit-tests-for-each-profile.md) |
