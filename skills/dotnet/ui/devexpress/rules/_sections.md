# DevExpress Rules

Best practices and rules for DevExpress.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Use `DxGrid` virtual scrolling mode (`VirtualScrollingEnabled="true"`) for datasets exceeding 500 rows | HIGH | [`devexpress-use-dxgrid-virtual-scrolling-mode-virtualscrollingenabled.md`](devexpress-use-dxgrid-virtual-scrolling-mode-virtualscrollingenabled.md) |
| 2 | Set `KeyFieldName` on every `DxGrid` instance to the primary key property | MEDIUM | [`devexpress-set-keyfieldname-on-every-dxgrid-instance-to-the-primary.md`](devexpress-set-keyfieldname-on-every-dxgrid-instance-to-the-primary.md) |
| 3 | Configure `DxScheduler.DataStorage` field mappings using `nameof()` expressions | MEDIUM | [`devexpress-configure-dxscheduler-datastorage-field-mappings-using.md`](devexpress-configure-dxscheduler-datastorage-field-mappings-using.md) |
| 4 | Create a shared DevExpress theme configuration in `App.razor` using `<DxResourceManager>` and set the global size mode | MEDIUM | [`devexpress-create-a-shared-devexpress-theme-configuration-in-app-razor.md`](devexpress-create-a-shared-devexpress-theme-configuration-in-app-razor.md) |
| 5 | Implement `GridEditModelSavingEventArgs` handlers that validate the `EditModel` and set `e.Cancel = true` on validation failure | HIGH | [`devexpress-implement-grideditmodelsavingeventargs-handlers-that.md`](devexpress-implement-grideditmodelsavingeventargs-handlers-that.md) |
| 6 | Use `DxGridDataColumn.DisplayFormat` with .NET format strings (e.g., `"C2"`, `"N0"`, `"d"`) on numeric and date columns | MEDIUM | [`devexpress-use-dxgriddatacolumn-displayformat-with-net-format-strings.md`](devexpress-use-dxgriddatacolumn-displayformat-with-net-format-strings.md) |
| 7 | Wrap chart data updates in `InvokeAsync(StateHasChanged)` when data arrives from background services or SignalR hubs | MEDIUM | [`devexpress-wrap-chart-data-updates-in-invokeasync-statehaschanged-when.md`](devexpress-wrap-chart-data-updates-in-invokeasync-statehaschanged-when.md) |
| 8 | Set explicit `Width` values on `DxGridDataColumn` for columns that display fixed-format data | HIGH | [`devexpress-set-explicit-width-values-on-dxgriddatacolumn-for-columns.md`](devexpress-set-explicit-width-values-on-dxgriddatacolumn-for-columns.md) |
| 9 | License the DevExpress NuGet feed using a `nuget.config` file with the DevExpress package source and credentials stored in CI environment variables | CRITICAL | [`devexpress-license-the-devexpress-nuget-feed-using-a-nuget-config-file.md`](devexpress-license-the-devexpress-nuget-feed-using-a-nuget-config-file.md) |
| 10 | Register DevExpress services before `builder.Build()` using `builder.Services.AddDevExpressBlazor()` | HIGH | [`devexpress-register-devexpress-services-before-builder-build-using.md`](devexpress-register-devexpress-services-before-builder-build-using.md) |
