# Blazorise Rules

Best practices and rules for Blazorise.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Use `ReadData` with server-side pagination for DataGrids bound to more than 100 rows | MEDIUM | [`blazorise-use-readdata-with-server-side-pagination-for-datagrids.md`](blazorise-use-readdata-with-server-side-pagination-for-datagrids.md) |
| 2 | Set `Validations Mode="ValidationMode.Auto"` and bind `Model` rather than calling `ValidateAll()` on every keystroke manually | HIGH | [`blazorise-set-validations-mode-validationmode-auto-and-bind-model.md`](blazorise-set-validations-mode-validationmode-auto-and-bind-model.md) |
| 3 | Wrap Blazorise component references (e.g., `Chart<T>`, `Modal`, `Validations`) in null-forgiving assignments (`= null!`) | MEDIUM | [`blazorise-wrap-blazorise-component-references-e-g-chart-t-modal.md`](blazorise-wrap-blazorise-component-references-e-g-chart-t-modal.md) |
| 4 | Register only one CSS framework provider per application | MEDIUM | [`blazorise-register-only-one-css-framework-provider-per-application.md`](blazorise-register-only-one-css-framework-provider-per-application.md) |
| 5 | Use the `<Feedback>` and `<ValidationError>` components nested inside input components | MEDIUM | [`blazorise-use-the-feedback-and-validationerror-components-nested.md`](blazorise-use-the-feedback-and-validationerror-components-nested.md) |
| 6 | Configure `DataGridColumn.Field` using `nameof()` expressions | MEDIUM | [`blazorise-configure-datagridcolumn-field-using-nameof-expressions.md`](blazorise-configure-datagridcolumn-field-using-nameof-expressions.md) |
| 7 | Debounce `TextEdit.TextChanged` events on filter inputs by using `Blazorise.DataGrid.FilterTemplate` with an explicit `Timer`-based delay of 300ms | HIGH | [`blazorise-debounce-textedit-textchanged-events-on-filter-inputs-by.md`](blazorise-debounce-textedit-textchanged-events-on-filter-inputs-by.md) |
| 8 | Create a shared `_Imports.razor` file that includes `@using Blazorise` and `@using Blazorise.DataGrid` | MEDIUM | [`blazorise-create-a-shared-imports-razor-file-that-includes-using.md`](blazorise-create-a-shared-imports-razor-file-that-includes-using.md) |
| 9 | Update `Chart` data using `AddLabelsDatasetsAndUpdate` or `SetLabelsDatasetsAndUpdate` methods | MEDIUM | [`blazorise-update-chart-data-using-addlabelsdatasetsandupdate-or.md`](blazorise-update-chart-data-using-addlabelsdatasetsandupdate-or.md) |
| 10 | Pin the Blazorise NuGet package version across all `Blazorise.*` packages using central package management | MEDIUM | [`blazorise-pin-the-blazorise-nuget-package-version-across-all.md`](blazorise-pin-the-blazorise-nuget-package-version-across-all.md) |
