---
name: entity-framework-core
description: >
  USE FOR: CRUD data access with LINQ, database migrations, change tracking, complex domain
  models with relationships, database-first and code-first workflows, and multi-provider support
  (SQL Server, PostgreSQL, SQLite, Cosmos DB). DO NOT USE FOR: Bulk operations on millions of
  rows without batching extensions, latency-critical read-only queries where Dapper is faster,
  or non-relational data that does not fit an entity model.
license: MIT
metadata:
  displayName: "Entity Framework Core"
  author: "Tyler-R-Kendrick"
  version: "1.0.0"
compatibility:
  - claude
  - copilot
  - cursor
references:
  - title: "Entity Framework Core Documentation"
    url: "https://learn.microsoft.com/en-us/ef/core/"
  - title: "Entity Framework Core GitHub Repository"
    url: "https://github.com/dotnet/efcore"
  - title: "Microsoft.EntityFrameworkCore NuGet Package"
    url: "https://www.nuget.org/packages/Microsoft.EntityFrameworkCore"
---

# Entity Framework Core

## Overview

Entity Framework Core (EF Core) is Microsoft's official ORM for .NET. It provides LINQ-based querying, change tracking, migrations, and a rich mapping system that translates between C# objects and relational database tables. EF Core supports multiple database providers including SQL Server, PostgreSQL (via Npgsql), SQLite, MySQL (via Pomelo), and Azure Cosmos DB.

EF Core follows the Unit of Work and Repository patterns through `DbContext`, which tracks entity state changes and generates optimized SQL for inserts, updates, and deletes. The migrations system allows schema evolution to be version-controlled alongside application code.

Install via NuGet: `dotnet add package Microsoft.EntityFrameworkCore.SqlServer` (or the provider for your database).

## DbContext and Entity Configuration

```csharp
using Microsoft.EntityFrameworkCore;

public sealed class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Product> Products => Set<Product>();
    public DbSet<Category> Categories => Set<Category>();
    public DbSet<Order> Orders => Set<Order>();
    public DbSet<OrderItem> OrderItems => Set<OrderItem>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Product>(entity =>
        {
            entity.HasKey(p => p.Id);
            entity.Property(p => p.Name).HasMaxLength(200).IsRequired();
            entity.Property(p => p.Price).HasPrecision(18, 2);
            entity.HasOne(p => p.Category)
                  .WithMany(c => c.Products)
                  .HasForeignKey(p => p.CategoryId);
            entity.HasIndex(p => p.Name);
        });

        modelBuilder.Entity<Order>(entity =>
        {
            entity.HasKey(o => o.Id);
            entity.Property(o => o.Total).HasPrecision(18, 2);
            entity.HasMany(o => o.Items)
                  .WithOne(i => i.Order)
                  .HasForeignKey(i => i.OrderId)
                  .OnDelete(DeleteBehavior.Cascade);
        });
    }
}

public sealed class Product
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public int CategoryId { get; set; }
    public Category Category { get; set; } = null!;
}

public sealed class Category
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public List<Product> Products { get; set; } = new();
}

public sealed class Order
{
    public int Id { get; set; }
    public DateTime OrderDate { get; set; }
    public decimal Total { get; set; }
    public List<OrderItem> Items { get; set; } = new();
}

public sealed class OrderItem
{
    public int Id { get; set; }
    public int OrderId { get; set; }
    public Order Order { get; set; } = null!;
    public int ProductId { get; set; }
    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }
}
```

## Registration and Connection

```csharp
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var builder = Host.CreateApplicationBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("Default"),
        sqlOptions =>
        {
            sqlOptions.EnableRetryOnFailure(
                maxRetryCount: 3,
                maxRetryDelay: TimeSpan.FromSeconds(10),
                errorNumbersToAdd: null);
            sqlOptions.CommandTimeout(30);
        }));

var app = builder.Build();
await app.RunAsync();
```

## Querying with LINQ

```csharp
using Microsoft.EntityFrameworkCore;

public sealed class ProductService
{
    private readonly AppDbContext _db;

    public ProductService(AppDbContext db)
    {
        _db = db;
    }

    public async Task<Product?> GetByIdAsync(int id, CancellationToken ct)
    {
        return await _db.Products
            .Include(p => p.Category)
            .FirstOrDefaultAsync(p => p.Id == id, ct);
    }

    public async Task<List<Product>> SearchAsync(
        string? name, decimal? minPrice, int page, int pageSize, CancellationToken ct)
    {
        IQueryable<Product> query = _db.Products.AsNoTracking();

        if (!string.IsNullOrWhiteSpace(name))
        {
            query = query.Where(p => p.Name.Contains(name));
        }

        if (minPrice.HasValue)
        {
            query = query.Where(p => p.Price >= minPrice.Value);
        }

        return await query
            .OrderBy(p => p.Name)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync(ct);
    }

    public async Task<List<CategorySummary>> GetCategorySummaryAsync(CancellationToken ct)
    {
        return await _db.Categories
            .AsNoTracking()
            .Select(c => new CategorySummary
            {
                CategoryName = c.Name,
                ProductCount = c.Products.Count,
                AveragePrice = c.Products.Average(p => (decimal?)p.Price) ?? 0
            })
            .OrderByDescending(c => c.ProductCount)
            .ToListAsync(ct);
    }
}

public sealed class CategorySummary
{
    public string CategoryName { get; set; } = string.Empty;
    public int ProductCount { get; set; }
    public decimal AveragePrice { get; set; }
}
```

## Creating, Updating, and Deleting

```csharp
using Microsoft.EntityFrameworkCore;

public sealed class OrderService
{
    private readonly AppDbContext _db;

    public OrderService(AppDbContext db)
    {
        _db = db;
    }

    public async Task<Order> CreateOrderAsync(
        List<(int ProductId, int Quantity)> items, CancellationToken ct)
    {
        var productIds = items.Select(i => i.ProductId).ToList();
        var products = await _db.Products
            .Where(p => productIds.Contains(p.Id))
            .ToDictionaryAsync(p => p.Id, ct);

        var order = new Order
        {
            OrderDate = DateTime.UtcNow,
            Items = items.Select(i => new OrderItem
            {
                ProductId = i.ProductId,
                Quantity = i.Quantity,
                UnitPrice = products[i.ProductId].Price
            }).ToList()
        };

        order.Total = order.Items.Sum(i => i.Quantity * i.UnitPrice);

        _db.Orders.Add(order);
        await _db.SaveChangesAsync(ct);

        return order;
    }

    public async Task<bool> CancelOrderAsync(int orderId, CancellationToken ct)
    {
        // ExecuteDeleteAsync performs a bulk delete without loading entities
        int deleted = await _db.Orders
            .Where(o => o.Id == orderId)
            .ExecuteDeleteAsync(ct);

        return deleted > 0;
    }

    public async Task UpdatePricesAsync(int categoryId, decimal percentageIncrease, CancellationToken ct)
    {
        // ExecuteUpdateAsync performs a bulk update without loading entities
        await _db.Products
            .Where(p => p.CategoryId == categoryId)
            .ExecuteUpdateAsync(setters => setters
                .SetProperty(p => p.Price, p => p.Price * (1 + percentageIncrease / 100)),
                ct);
    }
}
```

## Migrations

```bash
# Create a migration
dotnet ef migrations add InitialCreate

# Apply migrations to the database
dotnet ef database update

# Generate a SQL script for production deployment
dotnet ef migrations script --idempotent -o migrate.sql
```

```csharp
// Apply migrations programmatically at startup (development only)
using Microsoft.EntityFrameworkCore;

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    await db.Database.MigrateAsync();
}

await app.RunAsync();
```

## Interceptors and Auditing

```csharp
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;

public sealed class AuditSaveChangesInterceptor : SaveChangesInterceptor
{
    public override ValueTask<InterceptionResult<int>> SavingChangesAsync(
        DbContextEventData eventData,
        InterceptionResult<int> result,
        CancellationToken cancellationToken = default)
    {
        var context = eventData.Context;
        if (context is null) return new ValueTask<InterceptionResult<int>>(result);

        foreach (var entry in context.ChangeTracker.Entries<IAuditable>())
        {
            switch (entry.State)
            {
                case EntityState.Added:
                    entry.Entity.CreatedAt = DateTime.UtcNow;
                    break;
                case EntityState.Modified:
                    entry.Entity.ModifiedAt = DateTime.UtcNow;
                    break;
            }
        }

        return new ValueTask<InterceptionResult<int>>(result);
    }
}

public interface IAuditable
{
    DateTime CreatedAt { get; set; }
    DateTime? ModifiedAt { get; set; }
}
```

```csharp
// Registration with interceptor
builder.Services.AddDbContext<AppDbContext>((sp, options) =>
    options.UseSqlServer(connectionString)
           .AddInterceptors(new AuditSaveChangesInterceptor()));
```

## Best Practices

1. Use `AsNoTracking()` on all read-only queries to avoid the overhead of change tracking and reduce memory consumption in read-heavy scenarios.
2. Keep `DbContext` lifetime scoped to the request (the default with `AddDbContext`) and never register it as a singleton, which causes concurrency issues.
3. Use `ExecuteUpdateAsync` and `ExecuteDeleteAsync` for bulk operations instead of loading entities into memory, modifying them, and calling `SaveChangesAsync`.
4. Always use `Include` or projection (`Select`) to load related data explicitly; never rely on lazy loading, which causes N+1 query problems and hides performance issues.
5. Generate idempotent SQL scripts with `dotnet ef migrations script --idempotent` for production deployments rather than calling `Database.MigrateAsync()` at startup.
6. Configure connection resiliency with `EnableRetryOnFailure` for cloud-hosted databases that may experience transient connection failures.
7. Use `HasPrecision(18, 2)` on all `decimal` properties in `OnModelCreating` to avoid silent precision loss when mapping to database column types.
8. Add interceptors for cross-cutting concerns like audit timestamps, soft-delete filtering, and query logging rather than scattering that logic across repositories.
9. Use `IEntityTypeConfiguration<T>` in separate files per entity instead of a single large `OnModelCreating` method, keeping model configuration modular and testable.
10. Add explicit indexes with `HasIndex` on columns used in WHERE, JOIN, and ORDER BY clauses to ensure the database engine can serve queries efficiently.
