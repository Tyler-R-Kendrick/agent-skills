# DynamicData Rules

Best practices and rules for DynamicData.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Use `SourceCache<TObject, TKey>` for collections with a natural unique key (database IDs, GUIDs) | MEDIUM | [`dynamic-data-use-sourcecache-tobject-tkey-for-collections-with-a-natural.md`](dynamic-data-use-sourcecache-tobject-tkey-for-collections-with-a-natural.md) |
| 2 | Call `.DisposeWith(disposables)` on every subscription and dispose the `CompositeDisposable` in the view model's `Dispose` method | HIGH | [`dynamic-data-call-disposewith-disposables-on-every-subscription-and.md`](dynamic-data-call-disposewith-disposables-on-every-subscription-and.md) |
| 3 | Use `cache.Edit(innerCache => { ... })` for bulk mutations | HIGH | [`dynamic-data-use-cache-edit-innercache-for-bulk-mutations.md`](dynamic-data-use-cache-edit-innercache-for-bulk-mutations.md) |
| 4 | Apply `ObserveOn(RxApp.MainThreadScheduler)` before `.Bind()` | MEDIUM | [`dynamic-data-apply-observeon-rxapp-mainthreadscheduler-before-bind.md`](dynamic-data-apply-observeon-rxapp-mainthreadscheduler-before-bind.md) |
| 5 | Use `SortExpressionComparer<T>.Ascending(x => x.Property)` instead of custom `IComparer<T>` implementations | MEDIUM | [`dynamic-data-use-sortexpressioncomparer-t-ascending-x-x-property-instead.md`](dynamic-data-use-sortexpressioncomparer-t-ascending-x-x-property-instead.md) |
| 6 | Use `AutoRefresh(e => e.PropertyName)` when items implement `INotifyPropertyChanged` and a filter or sort depends on a mutable property | MEDIUM | [`dynamic-data-use-autorefresh-e-e-propertyname-when-items-implement.md`](dynamic-data-use-autorefresh-e-e-propertyname-when-items-implement.md) |
| 7 | Throttle dynamic filter predicates with `.Throttle(TimeSpan.FromMilliseconds(300))` | HIGH | [`dynamic-data-throttle-dynamic-filter-predicates-with-throttle-timespan.md`](dynamic-data-throttle-dynamic-filter-predicates-with-throttle-timespan.md) |
| 8 | Prefer `Transform` over `Select` | LOW | [`dynamic-data-prefer-transform-over-select.md`](dynamic-data-prefer-transform-over-select.md) |
| 9 | Use `DistinctValues(e => e.Category)` to extract unique property values for filter dropdowns | MEDIUM | [`dynamic-data-use-distinctvalues-e-e-category-to-extract-unique-property.md`](dynamic-data-use-distinctvalues-e-e-category-to-extract-unique-property.md) |
| 10 | Keep the `SourceCache` as a private field in the view model and expose only `IObservableCollection<T>` to the view | HIGH | [`dynamic-data-keep-the-sourcecache-as-a-private-field-in-the-view-model.md`](dynamic-data-keep-the-sourcecache-as-a-private-field-in-the-view-model.md) |
