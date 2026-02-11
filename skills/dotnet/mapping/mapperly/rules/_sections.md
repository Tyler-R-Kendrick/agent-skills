# Mapperly Rules

Best practices and rules for Mapperly.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Prefer Mapperly over AutoMapper | LOW | [`mapperly-prefer-mapperly-over-automapper.md`](mapperly-prefer-mapperly-over-automapper.md) |
| 2 | Define one mapper class per aggregate or feature area | MEDIUM | [`mapperly-define-one-mapper-class-per-aggregate-or-feature-area.md`](mapperly-define-one-mapper-class-per-aggregate-or-feature-area.md) |
| 3 | Register mappers as singletons | MEDIUM | [`mapperly-register-mappers-as-singletons.md`](mapperly-register-mappers-as-singletons.md) |
| 4 | Use `[MapProperty]` for name mismatches | MEDIUM | [`mapperly-use-mapproperty-for-name-mismatches.md`](mapperly-use-mapproperty-for-name-mismatches.md) |
| 5 | Provide custom non-partial methods | MEDIUM | [`mapperly-provide-custom-non-partial-methods.md`](mapperly-provide-custom-non-partial-methods.md) |
| 6 | Use `[MapperIgnoreSource]` and `[MapperIgnoreTarget]` | MEDIUM | [`mapperly-use-mapperignoresource-and-mapperignoretarget.md`](mapperly-use-mapperignoresource-and-mapperignoretarget.md) |
| 7 | Review the generated source code | MEDIUM | [`mapperly-review-the-generated-source-code.md`](mapperly-review-the-generated-source-code.md) |
| 8 | Use `[MapEnum(EnumMappingStrategy.ByName)]` | HIGH | [`mapperly-use-mapenum-enummappingstrategy-byname.md`](mapperly-use-mapenum-enummappingstrategy-byname.md) |
| 9 | Enable `ThrowOnMappingNullMismatch` | CRITICAL | [`mapperly-enable-throwonmappingnullmismatch.md`](mapperly-enable-throwonmappingnullmismatch.md) |
| 10 | Combine with AutoMapper only when you need `ProjectTo` | MEDIUM | [`mapperly-combine-with-automapper-only-when-you-need-projectto.md`](mapperly-combine-with-automapper-only-when-you-need-projectto.md) |
