# AutoMapper Rules

Best practices and rules for AutoMapper.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Organize mappings into `Profile` classes | MEDIUM | [`automapper-organize-mappings-into-profile-classes.md`](automapper-organize-mappings-into-profile-classes.md) |
| 2 | Call `AssertConfigurationIsValid()` | MEDIUM | [`automapper-call-assertconfigurationisvalid.md`](automapper-call-assertconfigurationisvalid.md) |
| 3 | Use `ProjectTo<T>()` instead of `Map<T>()` | HIGH | [`automapper-use-projectto-t-instead-of-map-t.md`](automapper-use-projectto-t-instead-of-map-t.md) |
| 4 | Avoid placing business logic inside mapping profiles | HIGH | [`automapper-avoid-placing-business-logic-inside-mapping-profiles.md`](automapper-avoid-placing-business-logic-inside-mapping-profiles.md) |
| 5 | Use `ForMember(..., opt => opt.Ignore())` | HIGH | [`automapper-use-formember-opt-opt-ignore.md`](automapper-use-formember-opt-opt-ignore.md) |
| 6 | Prefer `IMapper` injection | CRITICAL | [`automapper-prefer-imapper-injection.md`](automapper-prefer-imapper-injection.md) |
| 7 | Flatten nested objects by convention | MEDIUM | [`automapper-flatten-nested-objects-by-convention.md`](automapper-flatten-nested-objects-by-convention.md) |
| 8 | Register value resolvers and type converters in DI | MEDIUM | [`automapper-register-value-resolvers-and-type-converters-in-di.md`](automapper-register-value-resolvers-and-type-converters-in-di.md) |
| 9 | Keep DTOs simple and flat | MEDIUM | [`automapper-keep-dtos-simple-and-flat.md`](automapper-keep-dtos-simple-and-flat.md) |
| 10 | Consider migrating to Mapperly | LOW | [`automapper-consider-migrating-to-mapperly.md`](automapper-consider-migrating-to-mapperly.md) |
