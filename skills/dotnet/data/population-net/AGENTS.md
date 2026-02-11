# Population.NET

## Overview

Population.NET provides GraphQL-like selective field projection for .NET REST APIs. It allows API consumers to request only the fields they need by specifying a `fields` query parameter, reducing over-fetching and improving bandwidth efficiency. The library works with POCO objects, Entity Framework Core queryables, and in-memory collections.

Instead of building separate DTOs for every client need, Population.NET dynamically projects the response shape at runtime based on the fields requested. This is particularly useful for mobile clients, public APIs with diverse consumers, and any scenario where different callers need different subsets of the same resource.

## Basic Field Projection

```csharp
using System.Dynamic;
using System.Reflection;

// A simple projection utility that demonstrates the concept
public static class FieldProjector
{
    public static object Project<T>(T source, string fields) where T : class
    {
        if (string.IsNullOrWhiteSpace(fields))
        {
            return source;
        }

        string[] requestedFields = fields.Split(',',
            StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);

        IDictionary<string, object?> result = new ExpandoObject();
        Type type = typeof(T);

        foreach (string field in requestedFields)
        {
            PropertyInfo? property = type.GetProperty(
                field, BindingFlags.Public | BindingFlags.Instance | BindingFlags.IgnoreCase);

            if (property is not null)
            {
                result[property.Name] = property.GetValue(source);
            }
        }

        return result;
    }

    public static IEnumerable<object> ProjectList<T>(
        IEnumerable<T> source, string fields) where T : class
    {
        return source.Select(item => Project(item, fields));
    }
}
```

## API Controller with Field Selection

```csharp
using Microsoft.AspNetCore.Mvc;

public sealed class User
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public Address Address { get; set; } = new();
    public DateTime CreatedAt { get; set; }
    public string Role { get; set; } = string.Empty;
}

public sealed class Address
{
    public string Street { get; set; } = string.Empty;
    public string City { get; set; } = string.Empty;
    public string State { get; set; } = string.Empty;
    public string ZipCode { get; set; } = string.Empty;
    public string Country { get; set; } = string.Empty;
}

[ApiController]
[Route("api/[controller]")]
public sealed class UsersController : ControllerBase
{
    private readonly IUserRepository _repository;

    public UsersController(IUserRepository repository)
    {
        _repository = repository;
    }

    // GET /api/users?fields=id,name,email
    [HttpGet]
    public async Task<IActionResult> GetUsers(
        [FromQuery] string? fields,
        CancellationToken ct)
    {
        List<User> users = await _repository.GetAllAsync(ct);

        if (string.IsNullOrWhiteSpace(fields))
        {
            return Ok(users);
        }

        return Ok(FieldProjector.ProjectList(users, fields));
    }

    // GET /api/users/42?fields=id,name,address.city
    [HttpGet("{id}")]
    public async Task<IActionResult> GetUser(
        int id,
        [FromQuery] string? fields,
        CancellationToken ct)
    {
        User? user = await _repository.GetByIdAsync(id, ct);

        if (user is null)
        {
            return NotFound();
        }

        if (string.IsNullOrWhiteSpace(fields))
        {
            return Ok(user);
        }

        return Ok(FieldProjector.Project(user, fields));
    }
}
```

## Nested Field Projection

Support dot-notation for nested object fields (e.g., `address.city`).

```csharp
using System.Dynamic;
using System.Reflection;

public static class NestedFieldProjector
{
    public static object Project<T>(T source, string fields) where T : class
    {
        if (string.IsNullOrWhiteSpace(fields))
        {
            return source;
        }

        string[] requestedFields = fields.Split(',',
            StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);

        IDictionary<string, object?> result = new ExpandoObject();

        foreach (string fieldPath in requestedFields)
        {
            SetNestedValue(result, source, fieldPath.Split('.'));
        }

        return result;
    }

    private static void SetNestedValue(
        IDictionary<string, object?> target,
        object source,
        string[] pathParts)
    {
        if (pathParts.Length == 0) return;

        string currentField = pathParts[0];
        PropertyInfo? property = source.GetType().GetProperty(
            currentField, BindingFlags.Public | BindingFlags.Instance | BindingFlags.IgnoreCase);

        if (property is null) return;

        if (pathParts.Length == 1)
        {
            // Leaf field
            target[property.Name] = property.GetValue(source);
        }
        else
        {
            // Nested field
            object? nestedValue = property.GetValue(source);
            if (nestedValue is null) return;

            if (!target.ContainsKey(property.Name) || target[property.Name] is not IDictionary<string, object?>)
            {
                target[property.Name] = new ExpandoObject();
            }

            var nestedTarget = (IDictionary<string, object?>)target[property.Name]!;
            SetNestedValue(nestedTarget, nestedValue, pathParts[1..]);
        }
    }
}
```

```csharp
// Usage:
// GET /api/users/42?fields=id,name,address.city,address.country
//
// Response:
// {
//   "Id": 42,
//   "Name": "Alice",
//   "Address": {
//     "City": "Seattle",
//     "Country": "US"
//   }
// }
```

## Field Validation Middleware

Validate requested fields against allowed fields to prevent information leakage and improve error messages.

```csharp
using Microsoft.AspNetCore.Http;
using System.Reflection;

public sealed class FieldValidationMiddleware
{
    private readonly RequestDelegate _next;

    public FieldValidationMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        string? fields = context.Request.Query["fields"];

        if (!string.IsNullOrWhiteSpace(fields))
        {
            string[] requestedFields = fields.Split(',',
                StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);

            // Enforce maximum field count
            if (requestedFields.Length > 20)
            {
                context.Response.StatusCode = 400;
                await context.Response.WriteAsJsonAsync(new
                {
                    Error = "Too many fields requested. Maximum is 20."
                });
                return;
            }

            // Enforce maximum nesting depth
            if (requestedFields.Any(f => f.Split('.').Length > 3))
            {
                context.Response.StatusCode = 400;
                await context.Response.WriteAsJsonAsync(new
                {
                    Error = "Field nesting depth exceeds maximum of 3 levels."
                });
                return;
            }
        }

        await _next(context);
    }
}
```

## Minimal API Integration

```csharp
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddScoped<IUserRepository, UserRepository>();

var app = builder.Build();

app.MapGet("/api/users", async (
    IUserRepository repo,
    string? fields,
    CancellationToken ct) =>
{
    var users = await repo.GetAllAsync(ct);

    if (string.IsNullOrWhiteSpace(fields))
    {
        return Results.Ok(users);
    }

    return Results.Ok(FieldProjector.ProjectList(users, fields));
});

app.MapGet("/api/users/{id}", async (
    int id,
    IUserRepository repo,
    string? fields,
    CancellationToken ct) =>
{
    var user = await repo.GetByIdAsync(id, ct);
    if (user is null) return Results.NotFound();

    if (string.IsNullOrWhiteSpace(fields))
    {
        return Results.Ok(user);
    }

    return Results.Ok(NestedFieldProjector.Project(user, fields));
});

app.Run();
```

## Field Projection vs Other Approaches

| Approach | Flexibility | Complexity | Client Control | Cacheability |
|---|---|---|---|---|
| Field projection (Population.NET) | Medium | Low | Per-request fields | Varies by fields |
| DTOs / View Models | Low | Medium | Fixed shape | Highly cacheable |
| GraphQL (HotChocolate) | High | High | Full query language | Requires special cache |
| OData $select | High | Medium | Standardized protocol | Varies |

## Best Practices

1. Validate requested field names against an allowlist of public property names to prevent exposing internal or sensitive fields that should not be returned to clients.
2. Limit the maximum number of fields per request (e.g., 20) and the maximum nesting depth (e.g., 3 levels) to prevent abuse and maintain predictable response sizes.
3. Return the full object when no `fields` parameter is provided so that the API remains fully functional for clients that do not use field selection.
4. Use `PropertyInfo` caching with a `ConcurrentDictionary` keyed by type to avoid repeated reflection lookups on every request in high-throughput scenarios.
5. Document available fields and nesting paths in your API documentation (e.g., OpenAPI descriptions) so that consumers know which fields they can request.
6. Strip sensitive fields (e.g., `passwordHash`, `internalNotes`) from the projectable set regardless of what the client requests, enforcing security at the projection layer.
7. Combine field projection with proper EF Core `.Select()` projections at the database level to avoid loading unnecessary columns from the database.
8. Cache projected responses with a cache key that includes the `fields` parameter value so that different field combinations are cached independently.
9. Return a `400 Bad Request` with a descriptive error message when a client requests a field name that does not exist, rather than silently ignoring unknown fields.
10. Prefer dedicated DTOs for stable, well-known API shapes and reserve field projection for APIs with highly diverse consumers who need different subsets of the same resource.
