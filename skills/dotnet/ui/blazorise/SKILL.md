---
name: blazorise
description: |
  USE FOR: Building Blazor applications with a rich component library that abstracts over CSS frameworks like Bootstrap, Bulma, Material, and Ant Design. Use when you need pre-built UI components (DataGrid, Charts, Modals) with consistent theming across providers.
  DO NOT USE FOR: Non-Blazor projects, applications that need pixel-perfect custom UI unrelated to any CSS framework, or scenarios where you want to avoid third-party component library dependencies.
license: MIT
metadata:
  displayName: Blazorise
  author: "Tyler-R-Kendrick"
  version: "1.0.0"
compatibility:
  - claude
  - copilot
  - cursor
references:
  - title: "Blazorise Official Documentation"
    url: "https://blazorise.com/docs/start"
  - title: "Blazorise GitHub Repository"
    url: "https://github.com/Megabit/Blazorise"
  - title: "Blazorise NuGet Package"
    url: "https://www.nuget.org/packages/Blazorise"
---

# Blazorise

## Overview

Blazorise is an open-source component library for Blazor that provides a unified API over multiple CSS frameworks including Bootstrap 5, Bulma, Material, Fluent 2, and Ant Design. It offers over 80 components such as DataGrid, Chart, Autocomplete, Modal, and DatePicker. Blazorise abstracts the CSS framework away so that switching from Bootstrap to Material requires changing only the provider registration, not the component markup. It supports Blazor Server, Blazor WebAssembly, and the .NET 8+ unified model.

## Installation and Provider Configuration

Register Blazorise with a CSS framework provider in `Program.cs`. Each provider is a separate NuGet package.

```csharp
using Blazorise;
using Blazorise.Bootstrap5;
using Blazorise.Icons.FontAwesome;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRazorComponents()
    .AddInteractiveServerComponents();

builder.Services
    .AddBlazorise(options =>
    {
        options.Immediate = true; // Immediate validation mode
    })
    .AddBootstrap5Providers()
    .AddFontAwesomeIcons();

var app = builder.Build();

app.UseStaticFiles();
app.UseAntiforgery();
app.MapRazorComponents<App>()
    .AddInteractiveServerRenderMode();

app.Run();
```

## DataGrid with Sorting, Filtering, and Pagination

The Blazorise DataGrid component handles large datasets with built-in sorting, filtering, and server-side pagination via `ReadData`.

```csharp
@page "/orders"
@using Blazorise.DataGrid
@inject IOrderService OrderService

<DataGrid TItem="Order"
          Data="_orders"
          ReadData="OnReadData"
          TotalItems="_totalCount"
          PageSize="25"
          Responsive
          Sortable
          Filterable
          ShowPager>
    <DataGridColumn Field="@nameof(Order.Id)" Caption="Order #" Sortable Width="100px" />
    <DataGridColumn Field="@nameof(Order.CustomerName)" Caption="Customer" Filterable>
        <FilterTemplate>
            <TextEdit Text="@((string)context.SearchValue)"
                      TextChanged="(v) => context.TriggerFilterChange(v)" />
        </FilterTemplate>
    </DataGridColumn>
    <DataGridColumn Field="@nameof(Order.Total)" Caption="Total" Sortable>
        <DisplayTemplate>
            @($"{context.Total:C2}")
        </DisplayTemplate>
    </DataGridColumn>
    <DataGridColumn Field="@nameof(Order.Status)" Caption="Status">
        <DisplayTemplate>
            <Badge Color="@GetStatusColor(context.Status)">@context.Status</Badge>
        </DisplayTemplate>
    </DataGridColumn>
    <DataGridCommandColumn>
        <EditCommandTemplate>
            <Button Color="Color.Primary" Size="Size.Small" Clicked="() => ViewOrder(context.Item.Id)">
                View
            </Button>
        </EditCommandTemplate>
    </DataGridCommandColumn>
</DataGrid>

@code {
    private List<Order>? _orders;
    private int _totalCount;

    private async Task OnReadData(DataGridReadDataEventArgs<Order> e)
    {
        var sortField = e.Columns
            .FirstOrDefault(c => c.SortDirection != SortDirection.Default);

        var result = await OrderService.GetPagedAsync(
            page: e.Page,
            pageSize: e.PageSize,
            sortBy: sortField?.Field,
            sortDescending: sortField?.SortDirection == SortDirection.Descending,
            filters: e.Columns
                .Where(c => c.SearchValue is not null)
                .ToDictionary(c => c.Field, c => c.SearchValue!.ToString()!));

        _orders = result.Items;
        _totalCount = result.TotalCount;
    }

    private Color GetStatusColor(string status) => status switch
    {
        "Shipped" => Color.Success,
        "Pending" => Color.Warning,
        "Cancelled" => Color.Danger,
        _ => Color.Secondary
    };

    private void ViewOrder(int id) { /* navigate to order detail */ }
}
```

## Forms and Validation

Blazorise provides its own form components with built-in validation that works alongside DataAnnotations.

```csharp
@page "/products/create"
@using System.ComponentModel.DataAnnotations
@inject IProductService ProductService

<Validations @ref="_validations" Mode="ValidationMode.Auto" Model="_model">
    <Validation>
        <Field>
            <FieldLabel>Product Name</FieldLabel>
            <FieldBody>
                <TextEdit @bind-Text="_model.Name" Placeholder="Enter product name">
                    <Feedback>
                        <ValidationError />
                    </Feedback>
                </TextEdit>
            </FieldBody>
        </Field>
    </Validation>

    <Validation>
        <Field>
            <FieldLabel>Price</FieldLabel>
            <FieldBody>
                <NumericEdit TValue="decimal" @bind-Value="_model.Price" Min="0.01m" Decimals="2">
                    <Feedback>
                        <ValidationError />
                    </Feedback>
                </NumericEdit>
            </FieldBody>
        </Field>
    </Validation>

    <Validation>
        <Field>
            <FieldLabel>Category</FieldLabel>
            <FieldBody>
                <Select TValue="string" @bind-SelectedValue="_model.Category">
                    <SelectItem Value="@string.Empty">Choose...</SelectItem>
                    <SelectItem Value="Electronics">Electronics</SelectItem>
                    <SelectItem Value="Clothing">Clothing</SelectItem>
                    <SelectItem Value="Books">Books</SelectItem>
                </Select>
            </FieldBody>
        </Field>
    </Validation>

    <Button Color="Color.Primary" Clicked="HandleSubmit" Loading="_saving">
        Create Product
    </Button>
</Validations>

@code {
    private Validations _validations = null!;
    private ProductModel _model = new();
    private bool _saving;

    private async Task HandleSubmit()
    {
        if (await _validations.ValidateAll())
        {
            _saving = true;
            await ProductService.CreateAsync(_model);
            _model = new ProductModel();
            await _validations.ClearAll();
            _saving = false;
        }
    }

    public class ProductModel
    {
        [Required, StringLength(200, MinimumLength = 3)]
        public string Name { get; set; } = string.Empty;

        [Required, Range(0.01, 999999.99)]
        public decimal Price { get; set; }

        [Required]
        public string Category { get; set; } = string.Empty;
    }
}
```

## Charts

Blazorise wraps Chart.js to provide reactive charting components.

```csharp
@using Blazorise.Charts

<Chart @ref="_chart" TItem="double" Type="ChartType.Bar">
    <ChartOptions Options="_chartOptions" />
</Chart>

@code {
    private Chart<double> _chart = null!;
    private readonly BarChartOptions _chartOptions = new()
    {
        Responsive = true,
        Plugins = new() { Legend = new() { Display = true, Position = "top" } }
    };

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            await _chart.AddLabelsDatasetsAndUpdate(
                labels: new[] { "Jan", "Feb", "Mar", "Apr", "May" },
                new BarChartDataset<double>
                {
                    Label = "Revenue ($K)",
                    Data = new List<double> { 42.5, 58.3, 61.0, 55.7, 73.2 },
                    BackgroundColor = new List<string>
                    {
                        ChartColor.FromRgba(54, 162, 235, 0.6f),
                        ChartColor.FromRgba(54, 162, 235, 0.6f),
                        ChartColor.FromRgba(54, 162, 235, 0.6f),
                        ChartColor.FromRgba(54, 162, 235, 0.6f),
                        ChartColor.FromRgba(75, 192, 192, 0.6f)
                    }
                });
        }
    }
}
```

## CSS Framework Provider Comparison

| Feature | Bootstrap 5 | Material | Bulma | Ant Design |
|---|---|---|---|---|
| NuGet package | Blazorise.Bootstrap5 | Blazorise.Material | Blazorise.Bulma | Blazorise.AntDesign |
| Icons package | FontAwesome | Material | FontAwesome | AntDesign |
| Theming | SCSS variables | Material tokens | Sass variables | Less variables |
| Grid system | 12-column flex | 12-column flex | 12-column flex | 24-column flex |
| RTL support | Yes | Yes | Partial | Yes |
| Bundle size | Medium | Large | Small | Large |

## Best Practices

1. **Use `ReadData` with server-side pagination for DataGrids bound to more than 100 rows** instead of loading the entire dataset into `Data`; client-side sorting/filtering on large datasets blocks the UI thread and causes noticeable lag on Blazor Server circuits.

2. **Set `Validations Mode="ValidationMode.Auto"` and bind `Model` rather than calling `ValidateAll()` on every keystroke manually**, letting Blazorise debounce and validate only dirty fields; manual validation triggers on `TextChanged` events cause excessive re-renders.

3. **Wrap Blazorise component references (e.g., `Chart<T>`, `Modal`, `Validations`) in null-forgiving assignments (`= null!`)** with the understanding they are populated after `OnAfterRenderAsync`; accessing them in `OnInitializedAsync` before render will throw `NullReferenceException`.

4. **Register only one CSS framework provider per application** (e.g., `AddBootstrap5Providers()`) because Blazorise generates CSS class names from the active provider at runtime; mixing providers causes class conflicts and unpredictable visual rendering.

5. **Use the `<Feedback>` and `<ValidationError>` components nested inside input components** rather than standalone `<ValidationSummary>` blocks, so that error messages appear contextually next to the field they describe, following form UX conventions.

6. **Configure `DataGridColumn.Field` using `nameof()` expressions** instead of magic strings, so that property renames are caught at compile time; if the model property is renamed but the Field string is not updated, the column silently renders empty.

7. **Debounce `TextEdit.TextChanged` events on filter inputs by using `Blazorise.DataGrid.FilterTemplate` with an explicit `Timer`-based delay of 300ms** before calling `TriggerFilterChange`, avoiding a new server-side query on every keystroke.

8. **Create a shared `_Imports.razor` file that includes `@using Blazorise` and `@using Blazorise.DataGrid`** at the project level rather than repeating these directives in every component file, reducing noise and ensuring consistent namespace availability.

9. **Update `Chart` data using `AddLabelsDatasetsAndUpdate` or `SetLabelsDatasetsAndUpdate` methods** instead of replacing the `Data` property and calling `Refresh()`, because the method-based API performs incremental Chart.js updates with animations rather than destroying and recreating the canvas.

10. **Pin the Blazorise NuGet package version across all `Blazorise.*` packages using central package management** because Blazorise components share internal contracts versioned together; a mismatch between `Blazorise` 1.6.0 and `Blazorise.Bootstrap5` 1.5.2 causes `MissingMethodException` at runtime.
