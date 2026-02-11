---
name: graphql
description: |
  USE FOR: Building GraphQL APIs in .NET using Hot Chocolate. Use when clients need flexible query capabilities, field selection, and efficient data fetching across related entities without over-fetching or under-fetching.
  DO NOT USE FOR: Simple CRUD APIs with fixed response shapes (use REST with minimal APIs), file upload/download endpoints (use REST), or real-time bidirectional communication (use SignalR, though GraphQL subscriptions can complement it).
license: MIT
metadata:
  displayName: GraphQL (Hot Chocolate)
  author: "Tyler-R-Kendrick"
  version: "1.0.0"
compatibility:
  - claude
  - copilot
  - cursor
references:
  - title: "Hot Chocolate Documentation"
    url: "https://chillicream.com/docs/hotchocolate/v13/"
  - title: "Hot Chocolate GitHub Repository"
    url: "https://github.com/ChilliCream/graphql-platform"
  - title: "HotChocolate.AspNetCore NuGet Package"
    url: "https://www.nuget.org/packages/HotChocolate.AspNetCore"
---

# GraphQL (Hot Chocolate)

## Overview

Hot Chocolate is the most popular GraphQL server library for .NET. It enables building type-safe GraphQL APIs with support for queries, mutations, subscriptions, filtering, sorting, pagination, data loaders (for N+1 prevention), and schema stitching. Hot Chocolate integrates with ASP.NET Core, Entity Framework Core, and the standard .NET dependency injection system. It supports both code-first and schema-first approaches and generates a fully introspectable GraphQL schema.

## Server Setup

Configure Hot Chocolate in an ASP.NET Core application.

```csharp
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("Default")));

builder.Services
    .AddGraphQLServer()
    .AddQueryType<Query>()
    .AddMutationType<Mutation>()
    .AddSubscriptionType<Subscription>()
    .AddFiltering()
    .AddSorting()
    .AddProjections()
    .AddInMemorySubscriptions();

var app = builder.Build();

app.UseWebSockets();
app.MapGraphQL();

app.Run();
```

## Query Type with Filtering, Sorting, and Pagination

Define queries that expose data with built-in filtering and cursor-based pagination.

```csharp
using HotChocolate;
using HotChocolate.Data;
using HotChocolate.Types;
using Microsoft.EntityFrameworkCore;

namespace MyApp.GraphQL;

public class Query
{
    [UsePaging(IncludeTotalCount = true)]
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public IQueryable<Product> GetProducts(AppDbContext context)
        => context.Products.AsNoTracking();

    public async Task<Product?> GetProductById(
        int id,
        AppDbContext context)
        => await context.Products
            .Include(p => p.Category)
            .FirstOrDefaultAsync(p => p.Id == id);

    [UseFiltering]
    [UseSorting]
    public IQueryable<Customer> GetCustomers(AppDbContext context)
        => context.Customers.AsNoTracking();
}
```

## Mutation Type

Define mutations for data modification operations.

```csharp
using HotChocolate;
using HotChocolate.Types;

namespace MyApp.GraphQL;

public class Mutation
{
    public async Task<CreateProductPayload> CreateProduct(
        CreateProductInput input,
        AppDbContext context)
    {
        var product = new Product
        {
            Name = input.Name,
            Price = input.Price,
            CategoryId = input.CategoryId,
            Description = input.Description
        };

        context.Products.Add(product);
        await context.SaveChangesAsync();

        return new CreateProductPayload(product);
    }

    public async Task<UpdateProductPayload> UpdateProduct(
        int id,
        UpdateProductInput input,
        AppDbContext context)
    {
        var product = await context.Products.FindAsync(id);

        if (product is null)
        {
            return new UpdateProductPayload(
                product: null,
                error: new UserError("Product not found.", "PRODUCT_NOT_FOUND"));
        }

        if (input.Name is not null) product.Name = input.Name;
        if (input.Price.HasValue) product.Price = input.Price.Value;
        if (input.Description is not null) product.Description = input.Description;

        await context.SaveChangesAsync();
        return new UpdateProductPayload(product, error: null);
    }

    public async Task<bool> DeleteProduct(int id, AppDbContext context)
    {
        var product = await context.Products.FindAsync(id);
        if (product is null) return false;

        context.Products.Remove(product);
        await context.SaveChangesAsync();
        return true;
    }
}

// Input and Payload types
public record CreateProductInput(string Name, decimal Price, int CategoryId, string? Description);
public record UpdateProductInput(string? Name, decimal? Price, string? Description);
public record CreateProductPayload(Product Product);
public record UpdateProductPayload(Product? Product, UserError? Error);
public record UserError(string Message, string Code);
```

## DataLoader for N+1 Prevention

Use DataLoaders to batch database queries and prevent the N+1 query problem.

```csharp
using GreenDonut;
using HotChocolate;
using Microsoft.EntityFrameworkCore;

namespace MyApp.GraphQL;

public class CategoryBatchDataLoader : BatchDataLoader<int, Category>
{
    private readonly IDbContextFactory<AppDbContext> _contextFactory;

    public CategoryBatchDataLoader(
        IDbContextFactory<AppDbContext> contextFactory,
        IBatchScheduler batchScheduler,
        DataLoaderOptions? options = null)
        : base(batchScheduler, options)
    {
        _contextFactory = contextFactory;
    }

    protected override async Task<IReadOnlyDictionary<int, Category>> LoadBatchAsync(
        IReadOnlyList<int> keys,
        CancellationToken cancellationToken)
    {
        await using var context = await _contextFactory.CreateDbContextAsync(cancellationToken);
        return await context.Categories
            .Where(c => keys.Contains(c.Id))
            .ToDictionaryAsync(c => c.Id, cancellationToken);
    }
}

// Usage in a type extension
[ExtendObjectType(typeof(Product))]
public class ProductExtensions
{
    public async Task<Category?> GetCategory(
        [Parent] Product product,
        CategoryBatchDataLoader loader)
        => await loader.LoadAsync(product.CategoryId);
}
```

## GraphQL vs REST Comparison

| Feature | GraphQL (Hot Chocolate) | REST (ASP.NET Core) |
|---|---|---|
| Data fetching | Client specifies fields | Server defines response shape |
| Over-fetching | Eliminated | Common |
| Under-fetching | Eliminated | Requires multiple calls |
| Versioning | Schema evolution | URL or header versioning |
| Caching | Per-field, complex | HTTP caching, simple |
| File upload | Multipart spec (complex) | Native support |
| Real-time | Subscriptions (WebSocket) | SignalR / SSE |
| Tooling | GraphQL Playground, Banana Cake Pop | Swagger, Postman |

## Best Practices

1. **Use `[UseProjection]` on every query that returns `IQueryable<T>`** so that Hot Chocolate generates SQL `SELECT` statements containing only the fields requested by the client, preventing full-table reads when the client queries only `id` and `name` from an entity with 20 columns.

2. **Implement `BatchDataLoader<TKey, TValue>` for every foreign key relationship** (e.g., `Product.CategoryId` to `Category`) and register it via type extensions using `[ExtendObjectType]`, so that resolving the category for 50 products results in one `WHERE Id IN (...)` query instead of 50 individual queries.

3. **Use `AddDbContextFactory<T>()` instead of `AddDbContext<T>()` when using DataLoaders** because DataLoaders outlive the HTTP request scope and hold references to scoped services; `IDbContextFactory` creates short-lived `DbContext` instances per batch that are disposed after use.

4. **Define input types for mutations (`CreateProductInput`) and return payload types (`CreateProductPayload`) with optional `UserError` fields** rather than throwing exceptions, following the GraphQL convention where errors are part of the response payload, not transport-level failures.

5. **Enable `AddFiltering()` and `AddSorting()` on list queries but restrict the filterable/sortable fields** using `[UseFiltering(typeof(ProductFilterType))]` with a custom filter type, to prevent clients from filtering on expensive computed columns or sensitive fields like `PasswordHash`.

6. **Use cursor-based pagination with `[UsePaging]` instead of offset-based pagination** for lists that may change between page loads, because cursor pagination guarantees no items are skipped or duplicated when new items are inserted; offset pagination shifts results when the underlying data changes.

7. **Register GraphQL services using `AddGraphQLServer()` and call `MapGraphQL()` at a dedicated path** (default `/graphql`) rather than embedding GraphQL resolution inside REST controllers, keeping the two API styles isolated and independently configurable.

8. **Apply `[Authorize]` attributes on query/mutation resolvers that require authentication** and use `[GraphQLAuthorize(Policy = "AdminOnly")]` for role-based access control, rather than checking `ClaimsPrincipal` manually in every resolver method.

9. **Use Hot Chocolate's `ITopicEventSender` and `ITopicEventReceiver` for subscriptions** rather than implementing custom WebSocket handlers, because Hot Chocolate manages subscription lifecycle, serialization, and concurrent subscriber tracking through the configured subscription provider (in-memory or Redis).

10. **Monitor resolver execution times using Hot Chocolate's built-in instrumentation events** (`IExecutionDiagnosticEvents`) and log queries that exceed a threshold (e.g., 500ms), focusing optimization on the slowest resolvers; avoid premature optimization of resolvers that complete in single-digit milliseconds.
