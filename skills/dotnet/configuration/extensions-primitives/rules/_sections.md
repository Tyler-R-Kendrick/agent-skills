# Microsoft.Extensions.Primitives Rules

Best practices and rules for Microsoft.Extensions.Primitives.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Always dispose the `IDisposable` returned by `ChangeToken | CRITICAL | [`extensions-primitives-always-dispose-the-idisposable-returned-by-changetoken.md`](extensions-primitives-always-dispose-the-idisposable-returned-by-changetoken.md) |
| 2 | Keep change-token callbacks short and non-blocking; offload... | MEDIUM | [`extensions-primitives-keep-change-token-callbacks-short-and-non-blocking-offload.md`](extensions-primitives-keep-change-token-callbacks-short-and-non-blocking-offload.md) |
| 3 | Use `CancellationChangeToken` with the swap-and-cancel... | MEDIUM | [`extensions-primitives-use-cancellationchangetoken-with-the-swap-and-cancel.md`](extensions-primitives-use-cancellationchangetoken-with-the-swap-and-cancel.md) |
| 4 | Prefer `StringSegment` over `string | HIGH | [`extensions-primitives-prefer-stringsegment-over-string.md`](extensions-primitives-prefer-stringsegment-over-string.md) |
| 5 | Recreate tokens in the `changeTokenProducer` lambda passed... | MEDIUM | [`extensions-primitives-recreate-tokens-in-the-changetokenproducer-lambda-passed.md`](extensions-primitives-recreate-tokens-in-the-changetokenproducer-lambda-passed.md) |
| 6 | Use `CompositeChangeToken` to merge file-watcher and... | HIGH | [`extensions-primitives-use-compositechangetoken-to-merge-file-watcher-and.md`](extensions-primitives-use-compositechangetoken-to-merge-file-watcher-and.md) |
| 7 | Avoid storing references to `IChangeToken` instances beyond... | HIGH | [`extensions-primitives-avoid-storing-references-to-ichangetoken-instances-beyond.md`](extensions-primitives-avoid-storing-references-to-ichangetoken-instances-beyond.md) |
| 8 | Use `StringValues | MEDIUM | [`extensions-primitives-use-stringvalues.md`](extensions-primitives-use-stringvalues.md) |
| 9 | When building a custom `ConfigurationProvider`, call... | MEDIUM | [`extensions-primitives-when-building-a-custom-configurationprovider-call.md`](extensions-primitives-when-building-a-custom-configurationprovider-call.md) |
| 10 | Write unit tests for change-token producers by asserting... | MEDIUM | [`extensions-primitives-write-unit-tests-for-change-token-producers-by-asserting.md`](extensions-primitives-write-unit-tests-for-change-token-producers-by-asserting.md) |
