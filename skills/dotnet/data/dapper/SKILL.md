---
name: dapper
description: >
  USE FOR: High-performance SQL queries mapped to POCOs, read-heavy and latency-critical data
  access, stored procedure invocation, multi-mapping joins, bulk operations, and scenarios
  requiring full SQL control. DO NOT USE FOR: Schema migrations (use EF Core or FluentMigrator),
  complex object-graph change tracking, or applications where a full ORM with lazy loading is
  needed.
license: MIT
metadata:
  displayName: "Dapper"
  author: "Tyler-R-Kendrick"
  version: "1.0.0"
compatibility:
  - claude
  - copilot
  - cursor
---

# Dapper

## Overview

Dapper is a lightweight, high-performance micro-ORM for .NET that extends `IDbConnection` with methods for executing SQL and mapping results to strongly-typed objects. It does not generate SQL, manage change tracking, or handle migrations -- it maps query results to POCOs with minimal overhead. Dapper is used when you need full control over SQL, maximum query performance, or when working with legacy databases where an ORM's conventions do not fit.

Dapper supports parameterized queries, multi-mapping (joins across tables), multiple result sets, stored procedures, and dynamic parameters. It is the data access layer used by Stack Overflow and is one of the most widely adopted .NET data access libraries.

Install via NuGet: `dotnet add package Dapper`

## Basic Query and Command

```csharp
using System.Data;
using Dapper;
using Microsoft.Data.SqlClient;

public sealed class ProductRepository
{
    private readonly string _connectionString;

    public ProductRepository(string connectionString)
    {
        _connectionString = connectionString;
    }

    public async Task<IReadOnlyList<Product>> GetAllAsync(CancellationToken ct)
    {
        using IDbConnection db = new SqlConnection(_connectionString);
        var products = await db.QueryAsync<Product>(
            "SELECT Id, Name, Price, CategoryId FROM Products ORDER BY Name");
        return products.AsList();
    }

    public async Task<Product?> GetByIdAsync(int id, CancellationToken ct)
    {
        using IDbConnection db = new SqlConnection(_connectionString);
        return await db.QuerySingleOrDefaultAsync<Product>(
            "SELECT Id, Name, Price, CategoryId FROM Products WHERE Id = @Id",
            new { Id = id });
    }

    public async Task<int> CreateAsync(Product product, CancellationToken ct)
    {
        using IDbConnection db = new SqlConnection(_connectionString);
        return await db.ExecuteScalarAsync<int>(
            @"INSERT INTO Products (Name, Price, CategoryId)
              VALUES (@Name, @Price, @CategoryId);
              SELECT SCOPE_IDENTITY();",
            new { product.Name, product.Price, product.CategoryId });
    }

    public async Task<bool> UpdateAsync(Product product, CancellationToken ct)
    {
        using IDbConnection db = new SqlConnection(_connectionString);
        int rowsAffected = await db.ExecuteAsync(
            @"UPDATE Products SET Name = @Name, Price = @Price, CategoryId = @CategoryId
              WHERE Id = @Id",
            new { product.Id, product.Name, product.Price, product.CategoryId });
        return rowsAffected > 0;
    }
}

public sealed class Product
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public int CategoryId { get; set; }
}
```

## Multi-Mapping (Joins)

Map a single query result row to multiple objects, useful for JOIN queries.

```csharp
using System.Data;
using Dapper;
using Microsoft.Data.SqlClient;

public sealed class OrderRepository
{
    private readonly string _connectionString;

    public OrderRepository(string connectionString)
    {
        _connectionString = connectionString;
    }

    public async Task<IReadOnlyList<Order>> GetOrdersWithCustomerAsync(CancellationToken ct)
    {
        const string sql = @"
            SELECT o.Id, o.OrderDate, o.Total,
                   c.Id, c.Name, c.Email
            FROM Orders o
            INNER JOIN Customers c ON o.CustomerId = c.Id
            ORDER BY o.OrderDate DESC";

        using IDbConnection db = new SqlConnection(_connectionString);
        var orders = await db.QueryAsync<Order, Customer, Order>(
            sql,
            (order, customer) =>
            {
                order.Customer = customer;
                return order;
            },
            splitOn: "Id");

        return orders.AsList();
    }
}

public sealed class Order
{
    public int Id { get; set; }
    public DateTime OrderDate { get; set; }
    public decimal Total { get; set; }
    public Customer Customer { get; set; } = null!;
}

public sealed class Customer
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
}
```

## Stored Procedures

```csharp
using System.Data;
using Dapper;
using Microsoft.Data.SqlClient;

public sealed class ReportRepository
{
    private readonly string _connectionString;

    public ReportRepository(string connectionString)
    {
        _connectionString = connectionString;
    }

    public async Task<IReadOnlyList<SalesReport>> GetSalesReportAsync(
        DateTime startDate, DateTime endDate, CancellationToken ct)
    {
        using IDbConnection db = new SqlConnection(_connectionString);
        var results = await db.QueryAsync<SalesReport>(
            "usp_GetSalesReport",
            new { StartDate = startDate, EndDate = endDate },
            commandType: CommandType.StoredProcedure);
        return results.AsList();
    }

    public async Task<int> ArchiveOldOrdersAsync(int daysOld, CancellationToken ct)
    {
        using IDbConnection db = new SqlConnection(_connectionString);
        var parameters = new DynamicParameters();
        parameters.Add("@DaysOld", daysOld);
        parameters.Add("@RowsArchived", dbType: DbType.Int32, direction: ParameterDirection.Output);

        await db.ExecuteAsync(
            "usp_ArchiveOrders",
            parameters,
            commandType: CommandType.StoredProcedure);

        return parameters.Get<int>("@RowsArchived");
    }
}

public sealed class SalesReport
{
    public string CategoryName { get; set; } = string.Empty;
    public int TotalOrders { get; set; }
    public decimal TotalRevenue { get; set; }
}
```

## Multiple Result Sets

Read multiple result sets from a single query to reduce round trips.

```csharp
using System.Data;
using Dapper;
using Microsoft.Data.SqlClient;

public sealed class DashboardRepository
{
    private readonly string _connectionString;

    public DashboardRepository(string connectionString)
    {
        _connectionString = connectionString;
    }

    public async Task<DashboardData> GetDashboardDataAsync(CancellationToken ct)
    {
        const string sql = @"
            SELECT COUNT(*) AS TotalOrders, SUM(Total) AS Revenue FROM Orders WHERE OrderDate >= @Today;
            SELECT TOP 5 Id, Name, Email FROM Customers ORDER BY CreatedAt DESC;
            SELECT TOP 10 Id, Name, Price FROM Products ORDER BY SoldCount DESC;";

        using IDbConnection db = new SqlConnection(_connectionString);
        using var multi = await db.QueryMultipleAsync(sql, new { Today = DateTime.UtcNow.Date });

        var summary = await multi.ReadSingleAsync<OrderSummary>();
        var recentCustomers = (await multi.ReadAsync<Customer>()).AsList();
        var topProducts = (await multi.ReadAsync<Product>()).AsList();

        return new DashboardData
        {
            Summary = summary,
            RecentCustomers = recentCustomers,
            TopProducts = topProducts
        };
    }
}

public sealed class DashboardData
{
    public OrderSummary Summary { get; set; } = null!;
    public List<Customer> RecentCustomers { get; set; } = new();
    public List<Product> TopProducts { get; set; } = new();
}

public sealed class OrderSummary
{
    public int TotalOrders { get; set; }
    public decimal Revenue { get; set; }
}
```

## Transaction Support

```csharp
using System.Data;
using Dapper;
using Microsoft.Data.SqlClient;

public sealed class TransferService
{
    private readonly string _connectionString;

    public TransferService(string connectionString)
    {
        _connectionString = connectionString;
    }

    public async Task TransferFundsAsync(int fromAccountId, int toAccountId, decimal amount)
    {
        using IDbConnection db = new SqlConnection(_connectionString);
        db.Open();
        using IDbTransaction transaction = db.BeginTransaction();

        try
        {
            await db.ExecuteAsync(
                "UPDATE Accounts SET Balance = Balance - @Amount WHERE Id = @Id",
                new { Amount = amount, Id = fromAccountId },
                transaction);

            await db.ExecuteAsync(
                "UPDATE Accounts SET Balance = Balance + @Amount WHERE Id = @Id",
                new { Amount = amount, Id = toAccountId },
                transaction);

            transaction.Commit();
        }
        catch
        {
            transaction.Rollback();
            throw;
        }
    }
}
```

## DI Registration Pattern

```csharp
using System.Data;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.DependencyInjection;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddDataAccess(
        this IServiceCollection services, string connectionString)
    {
        services.AddScoped<IDbConnection>(_ => new SqlConnection(connectionString));
        services.AddScoped<ProductRepository>();
        services.AddScoped<OrderRepository>();
        return services;
    }
}
```

## Dapper vs Entity Framework Core

| Aspect | Dapper | Entity Framework Core |
|---|---|---|
| SQL control | Full (you write SQL) | Generated (LINQ to SQL) |
| Performance | Fastest (near raw ADO.NET) | Good (with optimization) |
| Change tracking | None | Built-in |
| Migrations | None | Built-in |
| Learning curve | Low (just SQL + mapping) | Medium (LINQ, conventions) |
| Best for | Read-heavy, reports, legacy DBs | CRUD, complex domains |

## Best Practices

1. Always use parameterized queries with anonymous objects (e.g., `new { Id = id }`) instead of string interpolation to prevent SQL injection and enable query plan caching.
2. Create and dispose `IDbConnection` per operation or per request; do not share a single connection across concurrent operations or store it in a singleton.
3. Use `QuerySingleOrDefaultAsync` when you expect zero or one row and `QueryFirstOrDefaultAsync` when you want the first of potentially many rows, to clearly express intent.
4. Specify `splitOn` explicitly in multi-mapping queries to avoid ambiguity when join columns share the same name across tables.
5. Use `DynamicParameters` with `ParameterDirection.Output` for stored procedures that return values through output parameters rather than result sets.
6. Wrap multiple related write operations in an explicit `IDbTransaction` and call `Commit` only after all operations succeed to maintain data consistency.
7. Use `QueryMultipleAsync` to batch multiple SELECT statements into a single round trip when a single method needs data from several tables.
8. Keep Dapper queries in dedicated repository or query classes with single-responsibility boundaries rather than scattering SQL throughout controllers or services.
9. Use `buffered: false` in `QueryAsync` for very large result sets that should be streamed row-by-row to avoid loading the entire result into memory at once.
10. Add a thin abstraction (e.g., `IDbConnectionFactory`) over connection creation to simplify testing with in-memory databases like SQLite.
