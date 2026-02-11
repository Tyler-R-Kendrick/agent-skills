# Reactive Extensions (Rx.NET) Rules

Best practices and rules for Reactive Extensions (Rx.NET).

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Always dispose subscriptions by storing the `IDisposable` returned by `Subscribe` and calling `Dispose` when done | CRITICAL | [`reactive-extensions-always-dispose-subscriptions-by-storing-the-idisposable.md`](reactive-extensions-always-dispose-subscriptions-by-storing-the-idisposable.md) |
| 2 | Use `Publish().RefCount()` to share a single upstream subscription among multiple downstream subscribers | MEDIUM | [`reactive-extensions-use-publish-refcount-to-share-a-single-upstream.md`](reactive-extensions-use-publish-refcount-to-share-a-single-upstream.md) |
| 3 | Apply `Throttle` (debounce) for user input streams and `Sample` for periodic snapshots | MEDIUM | [`reactive-extensions-apply-throttle-debounce-for-user-input-streams-and-sample.md`](reactive-extensions-apply-throttle-debounce-for-user-input-streams-and-sample.md) |
| 4 | Prefer `DistinctUntilChanged` over `Distinct` | LOW | [`reactive-extensions-prefer-distinctuntilchanged-over-distinct.md`](reactive-extensions-prefer-distinctuntilchanged-over-distinct.md) |
| 5 | Use `ObserveOn(scheduler)` to marshal notifications to the UI thread | MEDIUM | [`reactive-extensions-use-observeon-scheduler-to-marshal-notifications-to-the-ui.md`](reactive-extensions-use-observeon-scheduler-to-marshal-notifications-to-the-ui.md) |
| 6 | Use `Switch` instead of `SelectMany` when only the latest inner observable matters | HIGH | [`reactive-extensions-use-switch-instead-of-selectmany-when-only-the-latest-inner.md`](reactive-extensions-use-switch-instead-of-selectmany-when-only-the-latest-inner.md) |
| 7 | Handle errors at the subscription level with `onError` or in the pipeline with `Catch` and `Retry` | MEDIUM | [`reactive-extensions-handle-errors-at-the-subscription-level-with-onerror-or-in.md`](reactive-extensions-handle-errors-at-the-subscription-level-with-onerror-or-in.md) |
| 8 | Use `Observable.Create` with a `CancellationToken` for async producers | MEDIUM | [`reactive-extensions-use-observable-create-with-a-cancellationtoken-for-async.md`](reactive-extensions-use-observable-create-with-a-cancellationtoken-for-async.md) |
| 9 | Keep observable pipelines in named methods or well-commented chains | MEDIUM | [`reactive-extensions-keep-observable-pipelines-in-named-methods-or-well.md`](reactive-extensions-keep-observable-pipelines-in-named-methods-or-well.md) |
| 10 | Test observables using `TestScheduler` from `Microsoft.Reactive.Testing` | MEDIUM | [`reactive-extensions-test-observables-using-testscheduler-from-microsoft.md`](reactive-extensions-test-observables-using-testscheduler-from-microsoft.md) |
