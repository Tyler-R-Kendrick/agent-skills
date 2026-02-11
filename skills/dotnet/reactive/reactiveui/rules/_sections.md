# ReactiveUI Rules

Best practices and rules for ReactiveUI.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Use `this.RaiseAndSetIfChanged(ref _field, value)` for every mutable property | MEDIUM | [`reactiveui-use-this-raiseandsetifchanged-ref-field-value-for-every.md`](reactiveui-use-this-raiseandsetifchanged-ref-field-value-for-every.md) |
| 2 | Use `ObservableAsPropertyHelper<T>` (OAPH) for computed/derived properties | MEDIUM | [`reactiveui-use-observableaspropertyhelper-t-oaph-for-computed-derived.md`](reactiveui-use-observableaspropertyhelper-t-oaph-for-computed-derived.md) |
| 3 | Pass a `canExecute` observable to `ReactiveCommand.Create` | HIGH | [`reactiveui-pass-a-canexecute-observable-to-reactivecommand-create.md`](reactiveui-pass-a-canexecute-observable-to-reactivecommand-create.md) |
| 4 | Subscribe to `command.ThrownExceptions` for every `ReactiveCommand` | MEDIUM | [`reactiveui-subscribe-to-command-thrownexceptions-for-every.md`](reactiveui-subscribe-to-command-thrownexceptions-for-every.md) |
| 5 | Use `IActivatableViewModel` with `this.WhenActivated(disposables => { ... })` for subscriptions that should only run while the view is visible | HIGH | [`reactiveui-use-iactivatableviewmodel-with-this-whenactivated.md`](reactiveui-use-iactivatableviewmodel-with-this-whenactivated.md) |
| 6 | Apply `Throttle` to `WhenAnyValue` streams for search text inputs | HIGH | [`reactiveui-apply-throttle-to-whenanyvalue-streams-for-search-text.md`](reactiveui-apply-throttle-to-whenanyvalue-streams-for-search-text.md) |
| 7 | Use `Interaction<TInput, TOutput>` instead of injecting view-layer services into view models | MEDIUM | [`reactiveui-use-interaction-tinput-toutput-instead-of-injecting-view.md`](reactiveui-use-interaction-tinput-toutput-instead-of-injecting-view.md) |
| 8 | Call `.DisposeWith(disposables)` on every subscription inside `WhenActivated` | HIGH | [`reactiveui-call-disposewith-disposables-on-every-subscription-inside.md`](reactiveui-call-disposewith-disposables-on-every-subscription-inside.md) |
| 9 | Use `WhenAnyValue` with multiple property overloads (up to 12 properties) | MEDIUM | [`reactiveui-use-whenanyvalue-with-multiple-property-overloads-up-to-12.md`](reactiveui-use-whenanyvalue-with-multiple-property-overloads-up-to-12.md) |
| 10 | Keep view model constructors synchronous and move async initialization into a `ReactiveCommand` or `WhenActivated` block | MEDIUM | [`reactiveui-keep-view-model-constructors-synchronous-and-move-async.md`](reactiveui-keep-view-model-constructors-synchronous-and-move-async.md) |
