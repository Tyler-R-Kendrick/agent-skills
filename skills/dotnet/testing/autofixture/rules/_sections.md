# AutoFixture Rules

Best practices and rules for AutoFixture.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Use `Freeze<T>()` to share a single instance across the test | MEDIUM | [`autofixture-use-freeze-t-to-share-a-single-instance-across-the-test.md`](autofixture-use-freeze-t-to-share-a-single-instance-across-the-test.md) |
| 2 | Specify only test-relevant data with `Build<T>().With()` | MEDIUM | [`autofixture-specify-only-test-relevant-data-with-build-t-with.md`](autofixture-specify-only-test-relevant-data-with-build-t-with.md) |
| 3 | Combine AutoFixture with AutoMoq for zero-setup unit tests | MEDIUM | [`autofixture-combine-autofixture-with-automoq-for-zero-setup-unit-tests.md`](autofixture-combine-autofixture-with-automoq-for-zero-setup-unit-tests.md) |
| 4 | Create custom `ISpecimenBuilder` implementations for domain rules | MEDIUM | [`autofixture-create-custom-ispecimenbuilder-implementations-for-domain.md`](autofixture-create-custom-ispecimenbuilder-implementations-for-domain.md) |
| 5 | Use `[AutoData]` and `[InlineAutoData]` for xUnit theories | MEDIUM | [`autofixture-use-autodata-and-inlineautodata-for-xunit-theories.md`](autofixture-use-autodata-and-inlineautodata-for-xunit-theories.md) |
| 6 | Avoid calling `Create<T>()` for the system-under-test in AutoMoq tests | HIGH | [`autofixture-avoid-calling-create-t-for-the-system-under-test-in-automoq.md`](autofixture-avoid-calling-create-t-for-the-system-under-test-in-automoq.md) |
| 7 | Compose customizations into a single `CompositeCustomization` | MEDIUM | [`autofixture-compose-customizations-into-a-single-compositecustomization.md`](autofixture-compose-customizations-into-a-single-compositecustomization.md) |
| 8 | Limit collection sizes with `RepeatCount` | MEDIUM | [`autofixture-limit-collection-sizes-with-repeatcount.md`](autofixture-limit-collection-sizes-with-repeatcount.md) |
| 9 | Use `fixture.Register<T>()` for types with no public constructor | MEDIUM | [`autofixture-use-fixture-register-t-for-types-with-no-public-constructor.md`](autofixture-use-fixture-register-t-for-types-with-no-public-constructor.md) |
| 10 | Never use AutoFixture-generated data for integration or contract tests | CRITICAL | [`autofixture-never-use-autofixture-generated-data-for-integration-or.md`](autofixture-never-use-autofixture-generated-data-for-integration-or.md) |
