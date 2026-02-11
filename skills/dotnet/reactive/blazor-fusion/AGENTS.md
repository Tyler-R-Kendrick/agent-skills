# Blazor Fusion (Stl.Fusion)

## Overview

Stl.Fusion is a library that brings computed observables and real-time state synchronization to .NET applications, with first-class support for Blazor. It introduces `[ComputeMethod]` -- methods whose outputs are cached and automatically invalidated when their dependencies change. When a compute method's result changes, all Blazor components consuming that result re-render automatically. Fusion handles server-to-client replication transparently, making Blazor Server and Blazor WebAssembly apps display real-time data without manual SignalR hubs, polling, or state management boilerplate.

Fusion's core abstraction is `IComputed<T>`, a versioned, cached container for a method's return value. Computed instances form a dependency graph -- when an upstream computed value is invalidated, all downstream dependents are also invalidated and lazily recomputed on next access.

## Installation

```bash
dotnet add package Stl.Fusion
dotnet add package Stl.Fusion.Blazor
dotnet add package Stl.Fusion.Server  # For Blazor Server or API hosting
```

## Defining Compute Services

Compute services are interfaces with `[ComputeMethod]` attributes. Implementations must be registered as singletons because Fusion caches results per-instance.

```csharp
using Stl.Fusion;

namespace MyApp.Services;

public interface IProductService : IComputeService
{
    [ComputeMethod]
    Task<List<Product>> GetAllAsync(CancellationToken cancellationToken = default);

    [ComputeMethod]
    Task<Product?> GetByIdAsync(int id, CancellationToken cancellationToken = default);

    [ComputeMethod]
    Task<int> GetCountAsync(CancellationToken cancellationToken = default);

    Task AddAsync(Product product, CancellationToken cancellationToken = default);
    Task UpdateAsync(Product product, CancellationToken cancellationToken = default);
}

public record Product(int Id, string Name, decimal Price, int StockCount);
```

```csharp
using Stl.Fusion;

namespace MyApp.Services;

public class ProductService : IProductService
{
    private readonly List<Product> _products = new();
    private int _nextId = 1;

    [ComputeMethod]
    public virtual async Task<List<Product>> GetAllAsync(
        CancellationToken cancellationToken = default)
    {
        return _products.ToList();
    }

    [ComputeMethod]
    public virtual async Task<Product?> GetByIdAsync(
        int id, CancellationToken cancellationToken = default)
    {
        return _products.FirstOrDefault(p => p.Id == id);
    }

    [ComputeMethod]
    public virtual async Task<int> GetCountAsync(
        CancellationToken cancellationToken = default)
    {
        return _products.Count;
    }

    public virtual async Task AddAsync(
        Product product, CancellationToken cancellationToken = default)
    {
        var newProduct = product with { Id = _nextId++ };
        _products.Add(newProduct);

        // Invalidate computed values that depend on the product list
        using (Computed.Invalidate())
        {
            _ = GetAllAsync(cancellationToken);
            _ = GetCountAsync(cancellationToken);
        }
    }

    public virtual async Task UpdateAsync(
        Product product, CancellationToken cancellationToken = default)
    {
        var index = _products.FindIndex(p => p.Id == product.Id);
        if (index >= 0)
        {
            _products[index] = product;

            using (Computed.Invalidate())
            {
                _ = GetAllAsync(cancellationToken);
                _ = GetByIdAsync(product.Id, cancellationToken);
            }
        }
    }
}
```

## Blazor Component Integration

Fusion provides `ComputedStateComponent<T>` as a base class that automatically subscribes to computed values and re-renders when they change.

```csharp
@page "/products"
@using Stl.Fusion.Blazor
@using MyApp.Services
@inherits ComputedStateComponent<List<Product>>

<h3>Products (@State.Value?.Count ?? 0)</h3>

@if (State.HasValue)
{
    <table class="table">
        <thead>
            <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Stock</th>
            </tr>
        </thead>
        <tbody>
            @foreach (var product in State.Value)
            {
                <tr>
                    <td>@product.Name</td>
                    <td>@product.Price.ToString("C")</td>
                    <td>@product.StockCount</td>
                </tr>
            }
        </tbody>
    </table>
}
else if (State.Error is not null)
{
    <div class="alert alert-danger">Error: @State.Error.Message</div>
}
else
{
    <div>Loading...</div>
}

@code {
    [Inject] private IProductService ProductService { get; set; } = default!;

    protected override async Task<List<Product>> ComputeState(CancellationToken cancellationToken)
    {
        return await ProductService.GetAllAsync(cancellationToken);
    }
}
```

## Invalidation Patterns

Fusion uses explicit invalidation. When data changes, you invalidate the affected compute methods and Fusion propagates the change through the dependency graph.

```csharp
using Stl.Fusion;

namespace MyApp.Services;

public class OrderService : IOrderService
{
    private readonly IProductService _productService;

    public OrderService(IProductService productService)
    {
        _productService = productService;
    }

    // This compute method depends on GetByIdAsync -- Fusion tracks the dependency
    [ComputeMethod]
    public virtual async Task<decimal> GetOrderTotalAsync(
        int[] productIds, CancellationToken cancellationToken = default)
    {
        decimal total = 0;
        foreach (int id in productIds)
        {
            var product = await _productService.GetByIdAsync(id, cancellationToken);
            if (product is not null)
                total += product.Price;
        }
        return total;
    }

    public virtual async Task PlaceOrderAsync(
        Order order, CancellationToken cancellationToken = default)
    {
        // Process order...

        // When product stock changes, invalidate the product
        foreach (var item in order.Items)
        {
            var product = await _productService.GetByIdAsync(
                item.ProductId, cancellationToken);
            if (product is not null)
            {
                var updated = product with
                {
                    StockCount = product.StockCount - item.Quantity
                };
                await _productService.UpdateAsync(updated, cancellationToken);
            }
        }
    }
}

public record Order(int Id, OrderItem[] Items);
public record OrderItem(int ProductId, int Quantity);

public interface IOrderService : IComputeService
{
    [ComputeMethod]
    Task<decimal> GetOrderTotalAsync(
        int[] productIds, CancellationToken cancellationToken = default);
    Task PlaceOrderAsync(
        Order order, CancellationToken cancellationToken = default);
}
```

## Service Registration

```csharp
// Program.cs
using Stl.Fusion;
using MyApp.Services;

var builder = WebApplication.CreateBuilder(args);

var fusion = builder.Services.AddFusion();
fusion.AddService<IProductService, ProductService>();
fusion.AddService<IOrderService, OrderService>();
fusion.AddBlazor(); // Adds Blazor-specific Fusion services

builder.Services.AddRazorComponents()
    .AddInteractiveServerComponents();

var app = builder.Build();

app.MapRazorComponents<App>()
    .AddInteractiveServerRenderMode();

app.Run();
```

## Computed State Options

Configure update behavior on components.

```csharp
@inherits ComputedStateComponent<DashboardData>

@code {
    [Inject] private IDashboardService DashboardService { get; set; } = default!;

    protected override ComputedState<DashboardData>.Options GetStateOptions()
    {
        return new()
        {
            // How often to check for updates
            UpdateDelayer = FixedDelayer.Get(TimeSpan.FromSeconds(1)),

            // Initial value before first computation
            InitialValue = new DashboardData(0, 0, 0m)
        };
    }

    protected override async Task<DashboardData> ComputeState(
        CancellationToken cancellationToken)
    {
        return await DashboardService.GetDashboardAsync(cancellationToken);
    }
}
```

## Fusion vs. Traditional Blazor State Management

| Feature                  | Stl.Fusion                          | Fluxor / Redux                   | Cascading Values        |
|--------------------------|-------------------------------------|----------------------------------|-------------------------|
| Real-time updates        | Automatic via invalidation          | Manual dispatch required         | Manual parameter flow   |
| Caching                  | Built-in computed cache             | Manual memoization               | None                    |
| Dependency tracking      | Automatic (call graph)              | Manual selector composition      | None                    |
| Server-client sync       | Transparent replication             | Not built-in                     | Not built-in            |
| Boilerplate              | `ComputeMethod` + `Invalidate`      | Actions, reducers, effects       | Properties, callbacks   |
| Learning curve           | Moderate (invalidation model)       | High (Redux concepts)            | Low                     |
| Multi-user broadcast     | Built-in                            | Requires SignalR                 | Not applicable          |

## Best Practices

1. **Make compute method implementations `virtual`** because Fusion uses Castle.DynamicProxy to intercept method calls and manage the computed cache; non-virtual methods bypass the proxy and produce stale data.

2. **Always invalidate compute methods inside a `using (Computed.Invalidate())` block** and call the same method signatures that need to be refreshed; Fusion matches invalidation targets by method identity and argument values.

3. **Register compute services as singletons** because Fusion caches computed results per-service-instance; transient or scoped registrations create new instances that bypass the cache and invalidation graph.

4. **Inherit from `ComputedStateComponent<T>` for Blazor components that consume compute methods** rather than calling compute methods directly in `OnInitializedAsync`, so that the component automatically re-renders when the computed value is invalidated.

5. **Invalidate only the specific compute methods affected by a mutation** rather than invalidating broadly; for example, when updating a single product, invalidate `GetByIdAsync(productId)` and `GetAllAsync()` but not unrelated compute methods.

6. **Set `UpdateDelayer` in `GetStateOptions()` to control how frequently a component polls for recomputation** to balance responsiveness against server load; use `FixedDelayer.Get(TimeSpan.FromSeconds(1))` for dashboards and shorter intervals for critical data.

7. **Use Fusion's `IComputeService` interface as a marker on service interfaces** to enable the Fusion DI extensions to register the proxy wrapper automatically during `AddService<TInterface, TImplementation>()`.

8. **Do not throw exceptions from compute methods to signal "not found"** -- return `null` or empty collections instead, because exceptions bypass the computed cache and force recomputation on every access.

9. **Test compute services by verifying that calling a compute method twice returns the same cached instance** and that invalidation causes the next call to return a fresh value, ensuring the caching and invalidation graph works correctly.

10. **Separate mutation methods (Add, Update, Delete) from compute methods (Get, List, Count)** on the service interface because mutations trigger invalidation while compute methods participate in the dependency graph; mixing them creates confusing invalidation cycles.
