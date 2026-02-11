# IAsyncEnumerable Rules

Best practices and rules for IAsyncEnumerable.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Always accept `[EnumeratorCancellation] CancellationToken` as the last parameter of async iterator methods | CRITICAL | [`iasyncenumerable-always-accept-enumeratorcancellation-cancellationtoken-as.md`](iasyncenumerable-always-accept-enumeratorcancellation-cancellationtoken-as.md) |
| 2 | Use `await foreach` with `ConfigureAwait(false)` in library code | HIGH | [`iasyncenumerable-use-await-foreach-with-configureawait-false-in-library-code.md`](iasyncenumerable-use-await-foreach-with-configureawait-false-in-library-code.md) |
| 3 | Return `IAsyncEnumerable<T>` from ASP.NET Core endpoints for large result sets | MEDIUM | [`iasyncenumerable-return-iasyncenumerable-t-from-asp-net-core-endpoints-for.md`](iasyncenumerable-return-iasyncenumerable-t-from-asp-net-core-endpoints-for.md) |
| 4 | Use `AsAsyncEnumerable()` in EF Core queries instead of `ToListAsync()` for large datasets | CRITICAL | [`iasyncenumerable-use-asasyncenumerable-in-ef-core-queries-instead-of.md`](iasyncenumerable-use-asasyncenumerable-in-ef-core-queries-instead-of.md) |
| 5 | Install the `System.Linq.Async` NuGet package for LINQ operators | MEDIUM | [`iasyncenumerable-install-the-system-linq-async-nuget-package-for-linq.md`](iasyncenumerable-install-the-system-linq-async-nuget-package-for-linq.md) |
| 6 | Do not enumerate the same `IAsyncEnumerable<T>` instance multiple times | CRITICAL | [`iasyncenumerable-do-not-enumerate-the-same-iasyncenumerable-t-instance.md`](iasyncenumerable-do-not-enumerate-the-same-iasyncenumerable-t-instance.md) |
| 7 | Use `yield return` with `try/finally` for resource cleanup | MEDIUM | [`iasyncenumerable-use-yield-return-with-try-finally-for-resource-cleanup.md`](iasyncenumerable-use-yield-return-with-try-finally-for-resource-cleanup.md) |
| 8 | Prefer `IAsyncEnumerable<T>` over `IObservable<T>` when the consumer controls the pace | LOW | [`iasyncenumerable-prefer-iasyncenumerable-t-over-iobservable-t-when-the.md`](iasyncenumerable-prefer-iasyncenumerable-t-over-iobservable-t-when-the.md) |
| 9 | Batch items using `Buffer(count)` from System.Linq.Async when processing items individually is too slow | MEDIUM | [`iasyncenumerable-batch-items-using-buffer-count-from-system-linq-async-when.md`](iasyncenumerable-batch-items-using-buffer-count-from-system-linq-async-when.md) |
| 10 | Test async iterators by collecting results into a list with `await stream.ToListAsync()` | MEDIUM | [`iasyncenumerable-test-async-iterators-by-collecting-results-into-a-list-with.md`](iasyncenumerable-test-async-iterators-by-collecting-results-into-a-list-with.md) |
