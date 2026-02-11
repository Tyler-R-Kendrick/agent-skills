# Radzen Blazor Components Rules

Best practices and rules for Radzen Blazor Components.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Use `LoadData` with `LoadDataArgs.Filter` and `LoadDataArgs.OrderBy` for all DataGrids displaying server-sourced data | HIGH | [`raise-blazor-use-loaddata-with-loaddataargs-filter-and-loaddataargs.md`](raise-blazor-use-loaddata-with-loaddataargs-filter-and-loaddataargs.md) |
| 2 | Register `DialogService`, `NotificationService`, `TooltipService`, and `ContextMenuService` as `Scoped` in `Program.cs` | MEDIUM | [`raise-blazor-register-dialogservice-notificationservice-tooltipservice.md`](raise-blazor-register-dialogservice-notificationservice-tooltipservice.md) |
| 3 | Use `RadzenTemplateForm<T>` with component-specific validators (`RadzenRequiredValidator`, `RadzenEmailValidator`) | HIGH | [`raise-blazor-use-radzentemplateform-t-with-component-specific-validators.md`](raise-blazor-use-radzentemplateform-t-with-component-specific-validators.md) |
| 4 | Set explicit `Width` on each `RadzenDataGridColumn` for fixed-content columns | HIGH | [`raise-blazor-set-explicit-width-on-each-radzendatagridcolumn-for-fixed.md`](raise-blazor-set-explicit-width-on-each-radzendatagridcolumn-for-fixed.md) |
| 5 | Use `FormatString` on `RadzenDataGridColumn` for date and numeric formatting | MEDIUM | [`raise-blazor-use-formatstring-on-radzendatagridcolumn-for-date-and.md`](raise-blazor-use-formatstring-on-radzendatagridcolumn-for-date-and.md) |
| 6 | Configure `FilterMode.Advanced` on DataGrid for multi-condition filtering | MEDIUM | [`raise-blazor-configure-filtermode-advanced-on-datagrid-for-multi.md`](raise-blazor-configure-filtermode-advanced-on-datagrid-for-multi.md) |
| 7 | Wrap `DialogService.OpenAsync<T>` calls in try-catch to handle `TaskCanceledException` | MEDIUM | [`raise-blazor-wrap-dialogservice-openasync-t-calls-in-try-catch-to-handle.md`](raise-blazor-wrap-dialogservice-openasync-t-calls-in-try-catch-to-handle.md) |
| 8 | Apply Radzen theme CSS by adding `<RadzenTheme Theme="material" @rendermode="InteractiveServer" />` in `App.razor` | MEDIUM | [`raise-blazor-apply-radzen-theme-css-by-adding-radzentheme-theme-material.md`](raise-blazor-apply-radzen-theme-css-by-adding-radzentheme-theme-material.md) |
| 9 | Use `RadzenStack` and `RadzenRow`/`RadzenColumn` for layout | MEDIUM | [`raise-blazor-use-radzenstack-and-radzenrow-radzencolumn-for-layout.md`](raise-blazor-use-radzenstack-and-radzenrow-radzencolumn-for-layout.md) |
| 10 | Call `await _grid.Reload()` after any data mutation | MEDIUM | [`raise-blazor-call-await-grid-reload-after-any-data-mutation.md`](raise-blazor-call-await-grid-reload-after-any-data-mutation.md) |
