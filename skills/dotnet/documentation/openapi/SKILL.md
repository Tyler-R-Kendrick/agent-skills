---
name: openapi
description: |
  Use when documenting .NET APIs with OpenAPI (Swagger) specifications, generating client SDKs, and configuring Swashbuckle or NSwag.
  USE FOR: API documentation with OpenAPI/Swagger, Swashbuckle configuration, NSwag client generation, XML comment documentation, API versioning with OpenAPI, minimal API documentation
  DO NOT USE FOR: general REST API design patterns (use aspnet-core), API gateway configuration, GraphQL schema documentation
license: MIT
metadata:
  displayName: "OpenAPI"
  author: "Tyler-R-Kendrick"
  version: "1.0.0"
compatibility: claude, copilot, cursor
references:
  - title: "ASP.NET Core OpenAPI Documentation"
    url: "https://learn.microsoft.com/en-us/aspnet/core/tutorials/getting-started-with-swashbuckle"
  - title: "Swashbuckle.AspNetCore GitHub Repository"
    url: "https://github.com/domaindrivendev/Swashbuckle.AspNetCore"
  - title: "Swashbuckle.AspNetCore NuGet Package"
    url: "https://www.nuget.org/packages/Swashbuckle.AspNetCore"
---

# OpenAPI (Swagger)

## Overview
OpenAPI (formerly Swagger) is the industry standard for describing HTTP APIs. In .NET, OpenAPI specifications are generated from your API metadata using libraries like Swashbuckle (built into ASP.NET Core project templates) or NSwag. The generated specification enables interactive documentation (Swagger UI), client SDK generation, and API testing. ASP.NET Core 9+ also includes built-in OpenAPI document generation via `Microsoft.AspNetCore.OpenApi`.

## NuGet Packages
- `Swashbuckle.AspNetCore` -- Swagger/OpenAPI generation with Swagger UI
- `Microsoft.AspNetCore.OpenApi` -- built-in OpenAPI support (ASP.NET Core 9+)
- `NSwag.AspNetCore` -- alternative OpenAPI generation + client generation
- `NSwag.CodeGeneration.CSharp` -- C# client code generation from OpenAPI specs
- `Microsoft.Extensions.ApiDescription.Client` -- MSBuild integration for generated clients

## Basic Swashbuckle Setup
```csharp
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Order API",
        Version = "v1",
        Description = "API for managing customer orders.",
        Contact = new OpenApiContact
        {
            Name = "API Support",
            Email = "support@example.com"
        }
    });

    // Include XML comments
    var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
    options.IncludeXmlComments(xmlPath);
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/swagger/v1/swagger.json", "Order API v1");
        options.RoutePrefix = string.Empty; // serve at root
    });
}

app.Run();
```

## Built-in OpenAPI (ASP.NET Core 9+)
```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi(); // serves at /openapi/v1.json
}

app.MapGet("/orders/{id}", (int id) => new Order(id, "Pending"))
    .WithName("GetOrder")
    .WithDescription("Gets an order by its identifier.")
    .Produces<Order>(StatusCodes.Status200OK)
    .Produces(StatusCodes.Status404NotFound);

app.Run();
```

## Documenting Minimal APIs
```csharp
app.MapPost("/orders", async (CreateOrderRequest request, AppDbContext db) =>
{
    var order = new Order
    {
        CustomerId = request.CustomerId,
        Total = request.Total
    };
    db.Orders.Add(order);
    await db.SaveChangesAsync();

    return Results.Created($"/orders/{order.Id}", order);
})
.WithName("CreateOrder")
.WithDescription("Creates a new order.")
.WithTags("Orders")
.Accepts<CreateOrderRequest>("application/json")
.Produces<Order>(StatusCodes.Status201Created)
.Produces<ProblemDetails>(StatusCodes.Status400BadRequest)
.WithOpenApi(operation =>
{
    operation.Summary = "Create Order";
    operation.Parameters[0].Description = "The order details.";
    return operation;
});

app.MapGet("/orders", async (
    [Description("Filter by customer ID")] string? customerId,
    [Description("Page number")] int page = 1,
    [Description("Page size")] int pageSize = 20,
    AppDbContext db) =>
{
    var query = db.Orders.AsNoTracking();
    if (customerId is not null)
        query = query.Where(o => o.CustomerId == customerId);

    return await query.Skip((page - 1) * pageSize).Take(pageSize).ToListAsync();
})
.WithName("ListOrders")
.WithTags("Orders")
.Produces<List<Order>>(StatusCodes.Status200OK);
```

## Documenting Controllers
```csharp
/// <summary>
/// Manages customer orders.
/// </summary>
[ApiController]
[Route("api/[controller]")]
[Produces("application/json")]
public class OrdersController : ControllerBase
{
    private readonly AppDbContext _db;

    public OrdersController(AppDbContext db) => _db = db;

    /// <summary>
    /// Gets an order by its unique identifier.
    /// </summary>
    /// <param name="id">The order ID.</param>
    /// <returns>The order details.</returns>
    /// <response code="200">Returns the order.</response>
    /// <response code="404">Order not found.</response>
    [HttpGet("{id:int}")]
    [ProducesResponseType<OrderDto>(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetOrder(int id)
    {
        var order = await _db.Orders.FindAsync(id);
        return order is not null ? Ok(order.ToDto()) : NotFound();
    }

    /// <summary>
    /// Creates a new order.
    /// </summary>
    /// <param name="request">The order creation request.</param>
    /// <returns>The created order.</returns>
    [HttpPost]
    [ProducesResponseType<OrderDto>(StatusCodes.Status201Created)]
    [ProducesResponseType<ValidationProblemDetails>(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> CreateOrder([FromBody] CreateOrderRequest request)
    {
        var order = new Order { CustomerId = request.CustomerId, Total = request.Total };
        _db.Orders.Add(order);
        await _db.SaveChangesAsync();

        return CreatedAtAction(nameof(GetOrder), new { id = order.Id }, order.ToDto());
    }
}
```

## Authentication Documentation
```csharp
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo { Title = "Order API", Version = "v1" });

    // JWT Bearer authentication
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "JWT Authorization header using the Bearer scheme.",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.Http,
        Scheme = "bearer",
        BearerFormat = "JWT"
    });

    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });

    // OAuth2 / OpenID Connect
    options.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
    {
        Type = SecuritySchemeType.OAuth2,
        Flows = new OpenApiOAuthFlows
        {
            AuthorizationCode = new OpenApiOAuthFlow
            {
                AuthorizationUrl = new Uri("https://auth.example.com/authorize"),
                TokenUrl = new Uri("https://auth.example.com/token"),
                Scopes = new Dictionary<string, string>
                {
                    ["orders:read"] = "Read orders",
                    ["orders:write"] = "Create and modify orders"
                }
            }
        }
    });
});
```

## API Versioning with OpenAPI
```csharp
using Asp.Versioning;

builder.Services.AddApiVersioning(options =>
{
    options.DefaultApiVersion = new ApiVersion(1, 0);
    options.AssumeDefaultVersionWhenUnspecified = true;
    options.ReportApiVersions = true;
})
.AddApiExplorer(options =>
{
    options.GroupNameFormat = "'v'VVV";
    options.SubstituteApiVersionInUrl = true;
});

builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo { Title = "Order API", Version = "v1" });
    options.SwaggerDoc("v2", new OpenApiInfo { Title = "Order API", Version = "v2" });
});

app.UseSwaggerUI(options =>
{
    options.SwaggerEndpoint("/swagger/v1/swagger.json", "v1");
    options.SwaggerEndpoint("/swagger/v2/swagger.json", "v2");
});
```

## Client Generation with NSwag
```csharp
// NSwag.config or via MSBuild
// Install: dotnet tool install -g NSwag.ConsoleCore

// Generate C# client from running API
// nswag openapi2csclient /input:https://localhost:5001/swagger/v1/swagger.json
//                        /output:OrderApiClient.cs
//                        /namespace:MyApp.Clients
//                        /className:OrderApiClient

// MSBuild integration in .csproj
// <ItemGroup>
//   <OpenApiReference Include="swagger.json"
//     ClassName="OrderApiClient"
//     Namespace="MyApp.Clients" />
// </ItemGroup>

// Using the generated client
var client = new OrderApiClient(httpClient);
var order = await client.GetOrderAsync(42);
```

## Schema Customization
```csharp
builder.Services.AddSwaggerGen(options =>
{
    // Custom schema filter
    options.SchemaFilter<EnumSchemaFilter>();

    // Document filter for global modifications
    options.DocumentFilter<HealthCheckDocumentFilter>();

    // Operation filter for custom attributes
    options.OperationFilter<AuthorizeCheckOperationFilter>();
});

public class EnumSchemaFilter : ISchemaFilter
{
    public void Apply(OpenApiSchema schema, SchemaFilterContext context)
    {
        if (context.Type.IsEnum)
        {
            schema.Enum.Clear();
            foreach (var name in Enum.GetNames(context.Type))
            {
                schema.Enum.Add(new Microsoft.OpenApi.Any.OpenApiString(name));
            }
            schema.Type = "string";
        }
    }
}
```

## OpenAPI Generation Tools Comparison

| Tool | Package | Strengths |
|------|---------|-----------|
| Swashbuckle | `Swashbuckle.AspNetCore` | Default in templates, mature ecosystem |
| NSwag | `NSwag.AspNetCore` | Client generation, TypeScript support |
| Built-in (9+) | `Microsoft.AspNetCore.OpenApi` | No third-party dependency, AOT-friendly |
| Kiota | CLI tool | Multi-language client generation from OpenAPI |

## Best Practices
- Enable XML documentation generation in `.csproj` (`<GenerateDocumentationFile>true</GenerateDocumentationFile>`) and include XML comments via `IncludeXmlComments` so API descriptions come from code comments.
- Use `[ProducesResponseType]` attributes on every action to document all possible HTTP status codes and response types explicitly.
- Add `WithName`, `WithDescription`, and `WithTags` to minimal API endpoints so the generated OpenAPI spec has meaningful operation IDs and grouping.
- Configure security definitions (`AddSecurityDefinition` + `AddSecurityRequirement`) so consumers know how to authenticate when using Swagger UI or generated clients.
- Version your APIs and generate separate OpenAPI documents per version using `SwaggerDoc("v1", ...)` and `SwaggerDoc("v2", ...)`.
- Only expose Swagger UI in development or staging environments; disable it in production by guarding with `app.Environment.IsDevelopment()`.
- Use `[Description]` attributes on parameters and `/// <summary>` XML comments on models so auto-generated schemas include human-readable descriptions.
- Generate typed API clients using NSwag or Kiota from the OpenAPI spec to keep client code in sync with the API contract automatically.
- Customize enum serialization in OpenAPI schemas (string vs integer) to match your API's JSON serialization settings using schema filters.
- Validate your generated OpenAPI spec in CI using tools like `swagger-cli validate` or `spectral lint` to catch documentation drift before deployment.
