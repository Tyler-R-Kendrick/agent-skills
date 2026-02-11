# Telerik UI

## Overview

Telerik UI is a commercial suite of .NET UI components from Progress Software, available for Blazor, WPF, WinForms, and ASP.NET Core. The Telerik UI for Blazor library includes 110+ components covering Data Grid, TreeList, Scheduler, Editor, Charts, Gantt, PDF Viewer, Spreadsheet, and Form components. Telerik components integrate with Blazor Server, Blazor WebAssembly, and .NET 8+ SSR. They provide built-in accessibility (WCAG 2.1), keyboard navigation, localization, and multiple theme options including Material, Bootstrap, Fluent, and Default.

## Setup and Registration

Install the `Telerik.UI.for.Blazor` NuGet package and configure the Telerik service.

```csharp
using Microsoft.AspNetCore.Components;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRazorComponents()
    .AddInteractiveServerComponents();

builder.Services.AddTelerikBlazor();

var app = builder.Build();

app.UseStaticFiles();
app.UseAntiforgery();
app.MapRazorComponents<App>()
    .AddInteractiveServerRenderMode();

app.Run();
```

Add the `TelerikRootComponent` in `MainLayout.razor`:

```csharp
@inherits LayoutComponentBase

<TelerikRootComponent>
    <div class="page">
        <main>
            @Body
        </main>
    </div>
</TelerikRootComponent>
```

## Data Grid with Editing and Virtual Scrolling

The `TelerikGrid` supports inline editing, popup editing, virtual scrolling, and server-side data operations via `OnRead`.

```csharp
@page "/products"
@using Telerik.Blazor.Components
@using Telerik.DataSource
@inject IProductService ProductService

<TelerikGrid Data="_products"
             TItem="Product"
             OnRead="OnGridRead"
             Pageable="true"
             PageSize="25"
             Sortable="true"
             FilterMode="GridFilterMode.FilterRow"
             EditMode="GridEditMode.Inline"
             OnUpdate="OnProductUpdate"
             OnDelete="OnProductDelete"
             OnCreate="OnProductCreate"
             Height="600px"
             ScrollMode="GridScrollMode.Virtual"
             RowHeight="40">

    <GridToolBarTemplate>
        <GridCommandButton Command="Add" Icon="@SvgIcon.Plus">Add Product</GridCommandButton>
    </GridToolBarTemplate>

    <GridColumns>
        <GridColumn Field="@nameof(Product.Name)" Title="Product Name" Width="250px" />
        <GridColumn Field="@nameof(Product.Category)" Title="Category" Width="180px">
            <FilterCellTemplate>
                <TelerikDropDownList Data="_categories" @bind-Value="context.FilterDescriptor.Value"
                                    DefaultText="All Categories" />
            </FilterCellTemplate>
        </GridColumn>
        <GridColumn Field="@nameof(Product.Price)" Title="Price" DisplayFormat="{0:C2}" Width="120px" />
        <GridColumn Field="@nameof(Product.StockCount)" Title="Stock" Width="100px" />
        <GridColumn Field="@nameof(Product.LastUpdated)" Title="Updated"
                    DisplayFormat="{0:yyyy-MM-dd}" Width="140px" />
        <GridCommandColumn Width="200px">
            <GridCommandButton Command="Edit" Icon="@SvgIcon.Pencil">Edit</GridCommandButton>
            <GridCommandButton Command="Delete" Icon="@SvgIcon.Trash">Delete</GridCommandButton>
            <GridCommandButton Command="Save" Icon="@SvgIcon.Save" ShowInEdit="true">Save</GridCommandButton>
            <GridCommandButton Command="Cancel" Icon="@SvgIcon.Cancel" ShowInEdit="true">Cancel</GridCommandButton>
        </GridCommandColumn>
    </GridColumns>
</TelerikGrid>

@code {
    private List<Product> _products = new();
    private List<string> _categories = new() { "Electronics", "Clothing", "Food", "Books" };

    private async Task OnGridRead(GridReadEventArgs args)
    {
        var result = await ProductService.GetFilteredAsync(args.Request);
        args.Data = result.Data;
        args.Total = result.Total;
    }

    private async Task OnProductUpdate(GridCommandEventArgs args)
    {
        var product = (Product)args.Item;
        await ProductService.UpdateAsync(product);
    }

    private async Task OnProductDelete(GridCommandEventArgs args)
    {
        var product = (Product)args.Item;
        await ProductService.DeleteAsync(product.Id);
    }

    private async Task OnProductCreate(GridCommandEventArgs args)
    {
        var product = (Product)args.Item;
        await ProductService.CreateAsync(product);
    }
}
```

## Charts

Telerik Blazor Charts support bar, column, line, area, pie, donut, funnel, and stock chart types.

```csharp
@using Telerik.Blazor.Components

<TelerikChart Width="100%" Height="400px">
    <ChartTitle Text="Monthly Revenue vs Expenses" />
    <ChartSeriesItems>
        <ChartSeries Type="ChartSeriesType.Column"
                     Data="_revenue" Field="Value" CategoryField="Month"
                     Name="Revenue" Color="#4e79a7" />
        <ChartSeries Type="ChartSeriesType.Column"
                     Data="_expenses" Field="Value" CategoryField="Month"
                     Name="Expenses" Color="#e15759" />
        <ChartSeries Type="ChartSeriesType.Line"
                     Data="_profit" Field="Value" CategoryField="Month"
                     Name="Profit" Color="#59a14f" />
    </ChartSeriesItems>
    <ChartCategoryAxes>
        <ChartCategoryAxis>
            <ChartCategoryAxisLabels Format="{0}" />
        </ChartCategoryAxis>
    </ChartCategoryAxes>
    <ChartValueAxes>
        <ChartValueAxis>
            <ChartValueAxisLabels Format="${0:N0}" />
        </ChartValueAxis>
    </ChartValueAxes>
    <ChartTooltip Visible="true">
        <Template>
            @context.FormattedValue
        </Template>
    </ChartTooltip>
    <ChartLegend Position="ChartLegendPosition.Bottom" />
</TelerikChart>

@code {
    private List<ChartDataPoint> _revenue = new()
    {
        new("Jan", 45000), new("Feb", 52000), new("Mar", 61000),
        new("Apr", 58000), new("May", 67000), new("Jun", 72000)
    };
    private List<ChartDataPoint> _expenses = new()
    {
        new("Jan", 32000), new("Feb", 35000), new("Mar", 38000),
        new("Apr", 36000), new("May", 41000), new("Jun", 39000)
    };
    private List<ChartDataPoint> _profit = new()
    {
        new("Jan", 13000), new("Feb", 17000), new("Mar", 23000),
        new("Apr", 22000), new("May", 26000), new("Jun", 33000)
    };

    public record ChartDataPoint(string Month, decimal Value);
}
```

## Scheduler

The Telerik Scheduler provides day, week, month, timeline, and agenda views with drag-and-drop appointment management.

```csharp
@using Telerik.Blazor.Components

<TelerikScheduler Data="_appointments"
                  @bind-Date="_selectedDate"
                  @bind-View="_selectedView"
                  Height="700px"
                  AllowCreate="true"
                  AllowUpdate="true"
                  AllowDelete="true"
                  OnCreate="OnAppointmentCreate"
                  OnUpdate="OnAppointmentUpdate"
                  OnDelete="OnAppointmentDelete"
                  IdField="@nameof(SchedulerAppointment.Id)"
                  TitleField="@nameof(SchedulerAppointment.Title)"
                  StartField="@nameof(SchedulerAppointment.Start)"
                  EndField="@nameof(SchedulerAppointment.End)"
                  IsAllDayField="@nameof(SchedulerAppointment.IsAllDay)"
                  RecurrenceRuleField="@nameof(SchedulerAppointment.RecurrenceRule)">

    <SchedulerViews>
        <SchedulerDayView StartTime="@new TimeSpan(8, 0, 0)"
                          EndTime="@new TimeSpan(18, 0, 0)" />
        <SchedulerWeekView StartTime="@new TimeSpan(8, 0, 0)"
                           EndTime="@new TimeSpan(18, 0, 0)" />
        <SchedulerMonthView />
    </SchedulerViews>
</TelerikScheduler>

@code {
    private DateTime _selectedDate = DateTime.Today;
    private SchedulerView _selectedView = SchedulerView.Week;
    private List<SchedulerAppointment> _appointments = new();

    private async Task OnAppointmentCreate(SchedulerCreateEventArgs args)
    {
        var appointment = (SchedulerAppointment)args.Item;
        appointment.Id = Guid.NewGuid();
        _appointments.Add(appointment);
        await AppointmentService.CreateAsync(appointment);
    }

    private async Task OnAppointmentUpdate(SchedulerUpdateEventArgs args)
    {
        var appointment = (SchedulerAppointment)args.Item;
        var index = _appointments.FindIndex(a => a.Id == appointment.Id);
        if (index >= 0) _appointments[index] = appointment;
        await AppointmentService.UpdateAsync(appointment);
    }

    private async Task OnAppointmentDelete(SchedulerDeleteEventArgs args)
    {
        var appointment = (SchedulerAppointment)args.Item;
        _appointments.Remove(appointment);
        await AppointmentService.DeleteAsync(appointment.Id);
    }
}
```

## Telerik vs Other Component Suites

| Feature | Telerik | DevExpress | Syncfusion | Radzen |
|---|---|---|---|---|
| License | Commercial | Commercial | Commercial + community | Free + IDE |
| Blazor components | 110+ | 80+ | 80+ | 90+ |
| Grid virtual scroll | Yes | Yes | Yes | Yes |
| Document processing | Yes (PDF, Word, Excel) | Yes (XtraReports) | Yes | No |
| Scheduler | Yes | Yes | Yes | Yes |
| Gantt chart | Yes | No | Yes | No |
| Theme builder | Yes (ThemeBuilder) | Yes | Yes | Yes |

## Best Practices

1. **Use the `OnRead` event with `DataSourceRequest` for all grid data operations** instead of binding a `List<T>` to the `Data` parameter, because `OnRead` passes sorting, filtering, paging, and grouping descriptors that can be translated server-side using `Telerik.DataSource.Extensions.ToDataSourceResult()` on an `IQueryable<T>`.

2. **Wrap the entire application in `<TelerikRootComponent>` in `MainLayout.razor`** rather than placing it on individual pages, because Telerik dialogs, context menus, and tooltips render at the root level and fail to display if the root component is missing or nested incorrectly.

3. **Set `Field` on grid columns using `nameof()` expressions** (e.g., `Field="@nameof(Product.Name)"`) instead of hardcoded strings, so that property renames on the model class produce compile-time errors rather than silently rendering empty cells.

4. **Configure `ScrollMode="GridScrollMode.Virtual"` with an explicit `RowHeight` for grids displaying more than 500 rows**, and ensure the `Height` property is set to a fixed pixel value; virtual scrolling requires a known row height to calculate the scrollbar position and only renders visible rows in the DOM.

5. **Use `DisplayFormat` on grid columns for date and numeric formatting** (e.g., `"{0:C2}"`, `"{0:yyyy-MM-dd}"`) rather than a `<Template>` with `ToString()`, because `DisplayFormat` is applied in export, group headers, and aggregate footers.

6. **Define `<GridCommandColumn>` buttons with `ShowInEdit="true"` for Save/Cancel** and without it for Edit/Delete, so that the correct button set appears based on whether the row is in read or edit mode; combining all four buttons without `ShowInEdit` flags shows all actions simultaneously.

7. **Register the Telerik NuGet feed in `nuget.config` using the private feed URL and API key stored in CI secrets** (`https://nuget.telerik.com/v3/index.json`), and never commit the API key to source control; the feed requires an active Telerik license.

8. **Use the Telerik ThemeBuilder (`themebuilder.telerik.com`) to generate custom SCSS overrides** and include the compiled CSS as a static asset, rather than overriding Telerik CSS classes directly; direct overrides break on version upgrades when internal class names change.

9. **Handle Scheduler `OnCreate`, `OnUpdate`, and `OnDelete` events by mutating the bound collection and persisting to the database in the same handler**, because the Scheduler does not automatically add/update items in the data source; if you persist but forget to update the in-memory list, the appointment disappears until the next data refresh.

10. **Set `Debounce` delay on `TelerikTextBox` filter inputs bound to grid `FilterCellTemplate`** (e.g., `DebounceDelay="300"`) to avoid triggering a server-side `OnRead` call on every keystroke; without debouncing, rapid typing causes a flood of concurrent `OnRead` invocations that degrade Blazor Server circuit responsiveness.
