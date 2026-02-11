# Blazor Rules

Best practices and rules for Blazor.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Add `@key` directives to every element inside `@foreach` loops | MEDIUM | [`blazor-add-key-directives-to-every-element-inside-foreach-loops.md`](blazor-add-key-directives-to-every-element-inside-foreach-loops.md) |
| 2 | Mark required component parameters with `[EditorRequired]` | HIGH | [`blazor-mark-required-component-parameters-with-editorrequired.md`](blazor-mark-required-component-parameters-with-editorrequired.md) |
| 3 | Avoid calling `StateHasChanged()` inside `OnInitializedAsync` or `OnParametersSetAsync` | HIGH | [`blazor-avoid-calling-statehaschanged-inside-oninitializedasync-or.md`](blazor-avoid-calling-statehaschanged-inside-oninitializedasync-or.md) |
| 4 | Extract `@code` blocks exceeding 40 lines into a partial class code-behind file | MEDIUM | [`blazor-extract-code-blocks-exceeding-40-lines-into-a-partial-class.md`](blazor-extract-code-blocks-exceeding-40-lines-into-a-partial-class.md) |
| 5 | Use `CascadingValue` with `IsFixed="true"` for values that never change | CRITICAL | [`blazor-use-cascadingvalue-with-isfixed-true-for-values-that-never.md`](blazor-use-cascadingvalue-with-isfixed-true-for-values-that-never.md) |
| 6 | Implement `IDisposable` on components that register event handlers, timers, or JS interop callbacks | MEDIUM | [`blazor-implement-idisposable-on-components-that-register-event.md`](blazor-implement-idisposable-on-components-that-register-event.md) |
| 7 | Wrap `IJSRuntime.InvokeAsync` calls in `OnAfterRenderAsync` guarded by `firstRender` | MEDIUM | [`blazor-wrap-ijsruntime-invokeasync-calls-in-onafterrenderasync.md`](blazor-wrap-ijsruntime-invokeasync-calls-in-onafterrenderasync.md) |
| 8 | Scope CSS to components using `MyComponent.razor.css` isolation files | MEDIUM | [`blazor-scope-css-to-components-using-mycomponent-razor-css.md`](blazor-scope-css-to-components-using-mycomponent-razor-css.md) |
| 9 | Configure Blazor Server's `CircuitOptions.DetailedErrors` to `true` only in Development | CRITICAL | [`blazor-configure-blazor-server-s-circuitoptions-detailederrors-to.md`](blazor-configure-blazor-server-s-circuitoptions-detailederrors-to.md) |
| 10 | Use `StreamRendering` attribute on pages that perform slow data fetches | MEDIUM | [`blazor-use-streamrendering-attribute-on-pages-that-perform-slow.md`](blazor-use-streamrendering-attribute-on-pages-that-perform-slow.md) |
