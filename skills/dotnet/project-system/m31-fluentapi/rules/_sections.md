# M31.FluentAPI Rules

Best practices and rules for M31.FluentAPI.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Use numeric step indices starting from 0 in `[FluentMember]` to define the exact builder step order | MEDIUM | [`m31-fluentapi-use-numeric-step-indices-starting-from-0-in-fluentmember-to.md`](m31-fluentapi-use-numeric-step-indices-starting-from-0-in-fluentmember-to.md) |
| 2 | Mark optional properties with `[FluentNullableMember]` instead of providing default values | MEDIUM | [`m31-fluentapi-mark-optional-properties-with-fluentnullablemember-instead.md`](m31-fluentapi-mark-optional-properties-with-fluentnullablemember-instead.md) |
| 3 | Declare the target class as `partial` | MEDIUM | [`m31-fluentapi-declare-the-target-class-as-partial.md`](m31-fluentapi-declare-the-target-class-as-partial.md) |
| 4 | Use `init`-only setters (`{ get; init; }`) rather than mutable setters (`{ get; set; }`) | HIGH | [`m31-fluentapi-use-init-only-setters-get-init-rather-than-mutable-setters.md`](m31-fluentapi-use-init-only-setters-get-init-rather-than-mutable-setters.md) |
| 5 | Give builder method names verb-preposition prefixes like `WithName`, `ForAmount`, `InDepartment`, `UsingMethod` | CRITICAL | [`m31-fluentapi-give-builder-method-names-verb-preposition-prefixes-like.md`](m31-fluentapi-give-builder-method-names-verb-preposition-prefixes-like.md) |
| 6 | Use `[FluentCollection]` with `IReadOnlyList<T>` rather than `List<T>` | MEDIUM | [`m31-fluentapi-use-fluentcollection-with-ireadonlylist-t-rather-than-list-t.md`](m31-fluentapi-use-fluentcollection-with-ireadonlylist-t-rather-than-list-t.md) |
| 7 | Place `[FluentApi]` classes in a dedicated `Models` or `Contracts` namespace | MEDIUM | [`m31-fluentapi-place-fluentapi-classes-in-a-dedicated-models-or-contracts.md`](m31-fluentapi-place-fluentapi-classes-in-a-dedicated-models-or-contracts.md) |
| 8 | Validate the constructed object immediately after building by calling a `Validate()` method or using `IValidatableObject` | CRITICAL | [`m31-fluentapi-validate-the-constructed-object-immediately-after-building.md`](m31-fluentapi-validate-the-constructed-object-immediately-after-building.md) |
| 9 | Regenerate and inspect generated code after changing step indices or adding new members | MEDIUM | [`m31-fluentapi-regenerate-and-inspect-generated-code-after-changing-step.md`](m31-fluentapi-regenerate-and-inspect-generated-code-after-changing-step.md) |
| 10 | Pin the M31.FluentApi package version in `Directory.Packages.props` | MEDIUM | [`m31-fluentapi-pin-the-m31-fluentapi-package-version-in-directory-packages.md`](m31-fluentapi-pin-the-m31-fluentapi-package-version-in-directory-packages.md) |
