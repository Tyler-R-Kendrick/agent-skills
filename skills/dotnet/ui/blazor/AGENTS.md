# Blazor

## Overview

Blazor is a .NET web framework for building interactive client-side web UIs using C# and Razor syntax. It supports multiple hosting models: Blazor Server (SignalR-based), Blazor WebAssembly (client-side .NET runtime), and the unified model introduced in .NET 8 that combines static server-side rendering with per-component interactivity. Blazor components are reusable `.razor` files that encapsulate markup, logic, and state. The framework integrates natively with ASP.NET Core for authentication, dependency injection, and middleware.

## Component Fundamentals

Blazor components are the building blocks of the UI. Each component is a `.razor` file with markup and C# code.

```csharp
@page "/customers"
@using Microsoft.AspNetCore.Components
@using MyApp.Services
@inject ICustomerService CustomerService
@inject NavigationManager Navigation

<PageTitle>Customers</PageTitle>

<h1>Customer Directory</h1>

@if (_customers is null)
{
    <p><em>Loading customers...</em></p>
}
else if (_customers.Count == 0)
{
    <p>No customers found.</p>
}
else
{
    <table class="table table-striped">
        <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Joined</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            @foreach (var customer in _customers)
            {
                <tr @key="customer.Id">
                    <td>@customer.Name</td>
                    <td>@customer.Email</td>
                    <td>@customer.JoinedDate.ToShortDateString()</td>
                    <td>
                        <button class="btn btn-sm btn-primary"
                                @onclick="() => EditCustomer(customer.Id)">
                            Edit
                        </button>
                    </td>
                </tr>
            }
        </tbody>
    </table>
}

@code {
    private List<Customer>? _customers;

    protected override async Task OnInitializedAsync()
    {
        _customers = await CustomerService.GetAllAsync();
    }

    private void EditCustomer(int id)
    {
        Navigation.NavigateTo($"/customers/{id}/edit");
    }
}
```

## Render Modes (.NET 8+)

The unified Blazor model in .NET 8+ lets you set render modes per-component: static SSR, interactive Server, interactive WebAssembly, or Auto.

```csharp
// Program.cs - Configure render modes
using Microsoft.AspNetCore.Components;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRazorComponents()
    .AddInteractiveServerComponents()
    .AddInteractiveWebAssemblyComponents();

builder.Services.AddScoped<ICustomerService, CustomerService>();

var app = builder.Build();

app.UseStaticFiles();
app.UseAntiforgery();

app.MapRazorComponents<App>()
    .AddInteractiveServerRenderMode()
    .AddInteractiveWebAssemblyRenderMode()
    .AddAdditionalAssemblies(typeof(MyApp.Client._Imports).Assembly);

app.Run();
```

Apply render modes to individual components:

```csharp
@* Static SSR by default, interactive where needed *@
@page "/dashboard"
@rendermode InteractiveServer

<h1>Dashboard</h1>
<LiveChart Data="_chartData" />
<NotificationPanel @rendermode="InteractiveWebAssembly" />

@code {
    private ChartData[] _chartData = Array.Empty<ChartData>();

    protected override async Task OnInitializedAsync()
    {
        _chartData = await DashboardService.GetChartDataAsync();
    }
}
```

## Reusable Component with Parameters and EventCallbacks

Build composable components using parameters and event callbacks for parent-child communication.

```csharp
@* Components/ConfirmDialog.razor *@
@namespace MyApp.Components

<div class="modal @(_isVisible ? "show d-block" : "d-none")" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">@Title</h5>
            </div>
            <div class="modal-body">
                <p>@Message</p>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" @onclick="Cancel">Cancel</button>
                <button class="btn btn-danger" @onclick="Confirm">@ConfirmText</button>
            </div>
        </div>
    </div>
</div>

@code {
    private bool _isVisible;

    [Parameter, EditorRequired]
    public string Title { get; set; } = string.Empty;

    [Parameter, EditorRequired]
    public string Message { get; set; } = string.Empty;

    [Parameter]
    public string ConfirmText { get; set; } = "Delete";

    [Parameter]
    public EventCallback OnConfirmed { get; set; }

    [Parameter]
    public EventCallback OnCancelled { get; set; }

    public void Show() { _isVisible = true; StateHasChanged(); }
    public void Hide() { _isVisible = false; StateHasChanged(); }

    private async Task Confirm()
    {
        Hide();
        await OnConfirmed.InvokeAsync();
    }

    private async Task Cancel()
    {
        Hide();
        await OnCancelled.InvokeAsync();
    }
}
```

## Forms and Validation

Blazor provides built-in form handling with `EditForm`, model binding, and `DataAnnotations` validation.

```csharp
@page "/customers/create"
@using System.ComponentModel.DataAnnotations
@inject ICustomerService CustomerService
@inject NavigationManager Navigation

<EditForm Model="_model" OnValidSubmit="HandleSubmit" FormName="CreateCustomer">
    <DataAnnotationsValidator />
    <ValidationSummary class="text-danger" />

    <div class="mb-3">
        <label class="form-label">Name</label>
        <InputText class="form-control" @bind-Value="_model.Name" />
        <ValidationMessage For="() => _model.Name" />
    </div>

    <div class="mb-3">
        <label class="form-label">Email</label>
        <InputText class="form-control" @bind-Value="_model.Email" />
        <ValidationMessage For="() => _model.Email" />
    </div>

    <div class="mb-3">
        <label class="form-label">Tier</label>
        <InputSelect class="form-select" @bind-Value="_model.Tier">
            <option value="">Select tier...</option>
            <option value="Free">Free</option>
            <option value="Pro">Pro</option>
            <option value="Enterprise">Enterprise</option>
        </InputSelect>
    </div>

    <button type="submit" class="btn btn-primary" disabled="@_isSubmitting">
        @(_isSubmitting ? "Saving..." : "Create Customer")
    </button>
</EditForm>

@code {
    private CustomerFormModel _model = new();
    private bool _isSubmitting;

    private async Task HandleSubmit()
    {
        _isSubmitting = true;
        try
        {
            await CustomerService.CreateAsync(_model);
            Navigation.NavigateTo("/customers");
        }
        finally
        {
            _isSubmitting = false;
        }
    }

    public class CustomerFormModel
    {
        [Required, StringLength(100, MinimumLength = 2)]
        public string Name { get; set; } = string.Empty;

        [Required, EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string Tier { get; set; } = string.Empty;
    }
}
```

## Hosting Model Comparison

| Feature | Static SSR | Interactive Server | Interactive WASM | Auto |
|---|---|---|---|---|
| Initial load speed | Fastest | Fast | Slow (download runtime) | Fast then WASM |
| Interactivity | None | Full | Full | Full |
| Server connection | No | Required (SignalR) | No | Transitions off |
| Offline capable | No | No | Yes | Eventually |
| Server resource cost | Low | High (per-user circuit) | Low | Medium |
| SEO friendly | Yes | Partial | No (without prerender) | Yes |

## Best Practices

1. **Add `@key` directives to every element inside `@foreach` loops** using a stable unique identifier (such as a database ID), not the loop index; without `@key`, Blazor's diffing algorithm reuses DOM elements incorrectly when items are inserted, removed, or reordered.

2. **Mark required component parameters with `[EditorRequired]`** so that consuming components get compile-time warnings when mandatory parameters are omitted, catching integration bugs before runtime.

3. **Avoid calling `StateHasChanged()` inside `OnInitializedAsync` or `OnParametersSetAsync`** because Blazor automatically re-renders after these lifecycle methods complete; redundant calls double the render work and cause visible flicker on Server render mode.

4. **Extract `@code` blocks exceeding 40 lines into a partial class code-behind file** (e.g., `MyComponent.razor.cs`) to keep markup readable, enable better IntelliSense, and allow the C# code to be unit-tested without Razor compilation.

5. **Use `CascadingValue` with `IsFixed="true"` for values that never change** (such as theme configuration or feature flags) so that Blazor skips change-detection on every render cycle for all descendant components that consume the value.

6. **Implement `IDisposable` on components that register event handlers, timers, or JS interop callbacks** and unsubscribe in `Dispose()`; Blazor Server circuits can leak memory for each connected user if handlers accumulate over the circuit lifetime.

7. **Wrap `IJSRuntime.InvokeAsync` calls in `OnAfterRenderAsync` guarded by `firstRender`** for DOM-dependent initialization (e.g., chart libraries, focus management); calling JS interop during `OnInitializedAsync` will throw during server-side prerendering because no DOM exists yet.

8. **Scope CSS to components using `MyComponent.razor.css` isolation files** and reference the generated `{Assembly}.styles.css` bundle in the layout rather than writing global CSS rules that collide across component libraries.

9. **Configure Blazor Server's `CircuitOptions.DetailedErrors` to `true` only in Development** and set `CircuitOptions.DisconnectedCircuitRetentionPeriod` to a bounded timespan (e.g., 3 minutes) in production to free server memory when users close browser tabs without disconnecting.

10. **Use `StreamRendering` attribute on pages that perform slow data fetches** so the initial HTML shell renders immediately with a loading placeholder and the content streams in as the async operation completes, improving perceived performance without requiring interactive mode.
