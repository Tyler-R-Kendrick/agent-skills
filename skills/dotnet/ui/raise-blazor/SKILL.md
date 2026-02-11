---
name: raise-blazor
description: |
  USE FOR: Building Blazor applications with Radzen Blazor components, including DataGrid, Form, Scheduler, and Chart. Use when you need a free, open-source component library with an optional Radzen IDE for rapid application development.
  DO NOT USE FOR: Non-Blazor projects, native mobile or desktop apps (use MAUI or Avalonia), or projects that require deep integration with a specific CSS framework other than Radzen's built-in theme system.
license: MIT
metadata:
  displayName: Radzen Blazor Components
  author: "Tyler-R-Kendrick"
  version: "1.0.0"
compatibility:
  - claude
  - copilot
  - cursor
---

# Radzen Blazor Components

## Overview

Radzen Blazor Components is a free, open-source library of 90+ Blazor components including DataGrid, Scheduler, Chart, Form, Dialog, and Notification. The library provides its own design system with multiple built-in themes (Material, Standard, Dark, Humanistic) and does not depend on Bootstrap or other CSS frameworks. Radzen components support Blazor Server, Blazor WebAssembly, and .NET 8+ SSR with per-component interactivity. The optional Radzen IDE provides visual CRUD page generation, but the component library works standalone via NuGet.

## Installation and Service Registration

Install the `Radzen.Blazor` NuGet package and register services in `Program.cs`.

```csharp
using Radzen;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRazorComponents()
    .AddInteractiveServerComponents();

// Register Radzen services
builder.Services.AddScoped<DialogService>();
builder.Services.AddScoped<NotificationService>();
builder.Services.AddScoped<TooltipService>();
builder.Services.AddScoped<ContextMenuService>();

var app = builder.Build();

app.UseStaticFiles();
app.UseAntiforgery();
app.MapRazorComponents<App>()
    .AddInteractiveServerRenderMode();

app.Run();
```

## DataGrid with Server-Side Loading

The `RadzenDataGrid` component provides sorting, filtering, grouping, and virtual scrolling. Use `LoadData` for server-side operations.

```csharp
@page "/invoices"
@using Radzen
@using Radzen.Blazor
@inject IInvoiceService InvoiceService

<RadzenDataGrid @ref="_grid"
                Data="_invoices"
                Count="_count"
                LoadData="OnLoadData"
                TItem="Invoice"
                AllowSorting="true"
                AllowFiltering="true"
                AllowPaging="true"
                PageSize="20"
                PagerHorizontalAlign="HorizontalAlign.Center"
                FilterMode="FilterMode.Advanced"
                Style="height: 600px">

    <Columns>
        <RadzenDataGridColumn TItem="Invoice" Property="InvoiceNumber"
                              Title="Invoice #" Width="140px" />
        <RadzenDataGridColumn TItem="Invoice" Property="CustomerName"
                              Title="Customer" Width="200px" />
        <RadzenDataGridColumn TItem="Invoice" Property="Amount"
                              Title="Amount" FormatString="{0:C2}" Width="120px" />
        <RadzenDataGridColumn TItem="Invoice" Property="DueDate"
                              Title="Due Date" FormatString="{0:d}" Width="130px" />
        <RadzenDataGridColumn TItem="Invoice" Property="Status" Title="Status" Width="120px">
            <Template Context="invoice">
                <RadzenBadge BadgeStyle="@GetBadgeStyle(invoice.Status)"
                             Text="@invoice.Status" />
            </Template>
        </RadzenDataGridColumn>
        <RadzenDataGridColumn TItem="Invoice" Filterable="false" Sortable="false" Width="100px">
            <Template Context="invoice">
                <RadzenButton Icon="edit" ButtonStyle="ButtonStyle.Light" Size="ButtonSize.Small"
                              Click="() => EditInvoice(invoice)" />
                <RadzenButton Icon="delete" ButtonStyle="ButtonStyle.Danger" Size="ButtonSize.Small"
                              Click="() => DeleteInvoice(invoice)" />
            </Template>
        </RadzenDataGridColumn>
    </Columns>
</RadzenDataGrid>

@code {
    private RadzenDataGrid<Invoice> _grid = null!;
    private IEnumerable<Invoice>? _invoices;
    private int _count;

    private async Task OnLoadData(LoadDataArgs args)
    {
        var result = await InvoiceService.GetPagedAsync(
            filter: args.Filter,
            orderBy: args.OrderBy,
            skip: args.Skip ?? 0,
            top: args.Top ?? 20);

        _invoices = result.Items;
        _count = result.TotalCount;
    }

    private BadgeStyle GetBadgeStyle(string status) => status switch
    {
        "Paid" => BadgeStyle.Success,
        "Overdue" => BadgeStyle.Danger,
        "Pending" => BadgeStyle.Warning,
        _ => BadgeStyle.Light
    };

    private void EditInvoice(Invoice invoice) { /* navigation logic */ }
    private void DeleteInvoice(Invoice invoice) { /* delete with confirmation */ }
}
```

## Forms with Validation

Radzen provides form components with built-in validators that render inline error messages.

```csharp
@page "/contacts/new"
@using Radzen
@using Radzen.Blazor
@inject NavigationManager Navigation
@inject IContactService ContactService
@inject NotificationService NotificationService

<RadzenTemplateForm TItem="ContactModel" Data="_model" Submit="HandleSubmit">
    <RadzenFieldset Text="New Contact">
        <RadzenStack Gap="1rem">
            <RadzenFormField Text="Full Name" Variant="Variant.Outlined">
                <ChildContent>
                    <RadzenTextBox @bind-Value="_model.FullName" Name="FullName" />
                </ChildContent>
                <Helper>
                    <RadzenRequiredValidator Component="FullName" Text="Name is required" />
                </Helper>
            </RadzenFormField>

            <RadzenFormField Text="Email" Variant="Variant.Outlined">
                <ChildContent>
                    <RadzenTextBox @bind-Value="_model.Email" Name="Email" />
                </ChildContent>
                <Helper>
                    <RadzenRequiredValidator Component="Email" Text="Email is required" />
                    <RadzenEmailValidator Component="Email" Text="Invalid email format" />
                </Helper>
            </RadzenFormField>

            <RadzenFormField Text="Phone" Variant="Variant.Outlined">
                <ChildContent>
                    <RadzenMask @bind-Value="_model.Phone" Mask="(***) ***-****"
                                Placeholder="(555) 123-4567" Name="Phone" />
                </ChildContent>
            </RadzenFormField>

            <RadzenFormField Text="Category" Variant="Variant.Outlined">
                <ChildContent>
                    <RadzenDropDown @bind-Value="_model.Category" Data="_categories"
                                   Name="Category" Placeholder="Select..." />
                </ChildContent>
                <Helper>
                    <RadzenRequiredValidator Component="Category" Text="Category is required" />
                </Helper>
            </RadzenFormField>

            <RadzenButton ButtonType="ButtonType.Submit" Text="Save Contact"
                          ButtonStyle="ButtonStyle.Primary" />
        </RadzenStack>
    </RadzenFieldset>
</RadzenTemplateForm>

@code {
    private ContactModel _model = new();
    private readonly List<string> _categories = new() { "Client", "Vendor", "Partner", "Internal" };

    private async Task HandleSubmit()
    {
        await ContactService.CreateAsync(_model);
        NotificationService.Notify(NotificationSeverity.Success, "Saved", "Contact created.");
        Navigation.NavigateTo("/contacts");
    }

    public class ContactModel
    {
        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
    }
}
```

## Dialog Service

Use `DialogService` to open components as modal dialogs and receive results.

```csharp
@inject DialogService DialogService

// Open a component as a dialog
private async Task OpenEditDialog(Invoice invoice)
{
    var result = await DialogService.OpenAsync<InvoiceEditDialog>(
        "Edit Invoice",
        new Dictionary<string, object> { { "Invoice", invoice } },
        new DialogOptions
        {
            Width = "600px",
            Height = "500px",
            Resizable = true,
            Draggable = true,
            CloseDialogOnOverlayClick = false
        });

    if (result is true)
    {
        await _grid.Reload();
    }
}
```

## Radzen vs Other Free Blazor Libraries

| Feature | Radzen | MudBlazor | Blazorise (free) | Ant Design Blazor |
|---|---|---|---|---|
| Component count | 90+ | 60+ | 50+ (free tier) | 60+ |
| Built-in themes | 5 | 3 | Via provider | 1 |
| DataGrid | Full-featured | Full-featured | Basic | Full-featured |
| Scheduler | Yes | No | No | No |
| Dialog service | Yes | Yes | Yes | Yes |
| Form validators | Component-based | EditForm-based | Component-based | EditForm-based |
| Visual IDE | Radzen IDE (optional) | No | No | No |

## Best Practices

1. **Use `LoadData` with `LoadDataArgs.Filter` and `LoadDataArgs.OrderBy` for all DataGrids displaying server-sourced data** and translate the OData-style filter string to your data layer using `System.Linq.Dynamic.Core`, avoiding loading the full dataset into memory just to support client-side filtering.

2. **Register `DialogService`, `NotificationService`, `TooltipService`, and `ContextMenuService` as `Scoped` in `Program.cs`** and add the corresponding `<RadzenDialog />`, `<RadzenNotification />`, `<RadzenTooltip />`, and `<RadzenContextMenu />` components in `MainLayout.razor`, not in individual pages; missing these root components causes silent failures when services are injected.

3. **Use `RadzenTemplateForm<T>` with component-specific validators (`RadzenRequiredValidator`, `RadzenEmailValidator`)** rather than `EditForm` with `DataAnnotationsValidator`, because Radzen's validators render inline within `RadzenFormField` helper slots and integrate with the Radzen theme; mixing `EditForm` and Radzen components produces misaligned validation messages.

4. **Set explicit `Width` on each `RadzenDataGridColumn` for fixed-content columns** (IDs, dates, status badges, action buttons) and leave one primary text column without width to fill remaining space, preventing horizontal scrollbar appearance and content overflow on narrow viewports.

5. **Use `FormatString` on `RadzenDataGridColumn` for date and numeric formatting** (e.g., `"{0:C2}"`, `"{0:d}"`) instead of a `<Template>` with inline formatting, because `FormatString` is applied consistently in export, clipboard copy, and print operations.

6. **Configure `FilterMode.Advanced` on DataGrid for multi-condition filtering** and `FilterMode.Simple` for search-box-style filtering; Advanced mode generates proper OData filter expressions that can be passed directly to `LoadData` server queries without custom parsing.

7. **Wrap `DialogService.OpenAsync<T>` calls in try-catch to handle `TaskCanceledException`** that fires when users close dialogs via the X button or overlay click, because unhandled cancellation propagates up and logs a noisy unobserved task exception in Blazor Server circuits.

8. **Apply Radzen theme CSS by adding `<RadzenTheme Theme="material" @rendermode="InteractiveServer" />` in `App.razor`** rather than linking individual CSS files manually; the `RadzenTheme` component manages dark mode toggling, CSS variable scoping, and runtime theme switching.

9. **Use `RadzenStack` and `RadzenRow`/`RadzenColumn` for layout** instead of raw HTML `div` elements with CSS classes, because Radzen's layout components respect the active theme's spacing tokens, breakpoints, and gap sizes, producing consistent density across theme switches.

10. **Call `await _grid.Reload()` after any data mutation** (create, update, delete) that affects the DataGrid's server-side source, rather than manually manipulating the bound collection; `Reload` re-invokes `LoadData` with the current filter, sort, and page state, ensuring count and pagination remain accurate.
