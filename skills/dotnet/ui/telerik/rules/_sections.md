# Telerik UI Rules

Best practices and rules for Telerik UI.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Use the `OnRead` event with `DataSourceRequest` for all grid data operations | MEDIUM | [`telerik-use-the-onread-event-with-datasourcerequest-for-all-grid.md`](telerik-use-the-onread-event-with-datasourcerequest-for-all-grid.md) |
| 2 | Wrap the entire application in `<TelerikRootComponent>` in `MainLayout.razor` | MEDIUM | [`telerik-wrap-the-entire-application-in-telerikrootcomponent-in.md`](telerik-wrap-the-entire-application-in-telerikrootcomponent-in.md) |
| 3 | Set `Field` on grid columns using `nameof()` expressions | MEDIUM | [`telerik-set-field-on-grid-columns-using-nameof-expressions.md`](telerik-set-field-on-grid-columns-using-nameof-expressions.md) |
| 4 | Configure `ScrollMode="GridScrollMode.Virtual"` with an explicit `RowHeight` for grids displaying more than 500 rows | HIGH | [`telerik-configure-scrollmode-gridscrollmode-virtual-with-an.md`](telerik-configure-scrollmode-gridscrollmode-virtual-with-an.md) |
| 5 | Use `DisplayFormat` on grid columns for date and numeric formatting | MEDIUM | [`telerik-use-displayformat-on-grid-columns-for-date-and-numeric.md`](telerik-use-displayformat-on-grid-columns-for-date-and-numeric.md) |
| 6 | Define `<GridCommandColumn>` buttons with `ShowInEdit="true"` for Save/Cancel | MEDIUM | [`telerik-define-gridcommandcolumn-buttons-with-showinedit-true-for.md`](telerik-define-gridcommandcolumn-buttons-with-showinedit-true-for.md) |
| 7 | Register the Telerik NuGet feed in `nuget.config` using the private feed URL and API key stored in CI secrets | CRITICAL | [`telerik-register-the-telerik-nuget-feed-in-nuget-config-using-the.md`](telerik-register-the-telerik-nuget-feed-in-nuget-config-using-the.md) |
| 8 | Use the Telerik ThemeBuilder (`themebuilder.telerik.com`) to generate custom SCSS overrides | MEDIUM | [`telerik-use-the-telerik-themebuilder-themebuilder-telerik-com-to.md`](telerik-use-the-telerik-themebuilder-themebuilder-telerik-com-to.md) |
| 9 | Handle Scheduler `OnCreate`, `OnUpdate`, and `OnDelete` events by mutating the bound collection and persisting to the database in the same handler | MEDIUM | [`telerik-handle-scheduler-oncreate-onupdate-and-ondelete-events-by.md`](telerik-handle-scheduler-oncreate-onupdate-and-ondelete-events-by.md) |
| 10 | Set `Debounce` delay on `TelerikTextBox` filter inputs bound to grid `FilterCellTemplate` | HIGH | [`telerik-set-debounce-delay-on-teleriktextbox-filter-inputs-bound-to.md`](telerik-set-debounce-delay-on-teleriktextbox-filter-inputs-bound-to.md) |
