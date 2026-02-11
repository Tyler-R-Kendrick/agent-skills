# Refit

## Overview

Refit is a type-safe REST client library for .NET that turns interface definitions into live HTTP clients using source generators. You define an interface with attributes like `[Get]`, `[Post]`, `[Put]`, and `[Delete]` on methods, and Refit generates the implementation at compile time. Refit handles URL interpolation, query string building, JSON serialization/deserialization, multipart uploads, and header management. It integrates with `HttpClientFactory` for proper handler lifecycle management and with ASP.NET Core's dependency injection for clean service registration. Refit uses `System.Text.Json` by default and supports `Newtonsoft.Json` as an alternative serializer.

## Defining API Interfaces

Create interfaces with HTTP method attributes that map to API endpoints.

```csharp
using Refit;

namespace MyApp.ApiClients;

public interface IProductsApi
{
    [Get("/api/products")]
    Task<List<ProductDto>> GetAllAsync(
        [Query] int page = 1,
        [Query] int pageSize = 20,
        [Query] string? category = null);

    [Get("/api/products/{id}")]
    Task<ProductDto> GetByIdAsync(int id);

    [Post("/api/products")]
    Task<ProductDto> CreateAsync([Body] CreateProductRequest request);

    [Put("/api/products/{id}")]
    Task<ProductDto> UpdateAsync(int id, [Body] UpdateProductRequest request);

    [Delete("/api/products/{id}")]
    Task DeleteAsync(int id);

    [Get("/api/products/search")]
    Task<List<ProductDto>> SearchAsync([Query] ProductSearchQuery query);

    [Multipart]
    [Post("/api/products/{id}/image")]
    Task UploadImageAsync(int id, [AliasAs("file")] StreamPart image);
}

public record ProductDto(int Id, string Name, decimal Price, string Category);
public record CreateProductRequest(string Name, decimal Price, string Category);
public record UpdateProductRequest(string? Name, decimal? Price, string? Category);
public record ProductSearchQuery(string? Term, decimal? MinPrice, decimal? MaxPrice);
```

## ASP.NET Core Registration with HttpClientFactory

Register Refit clients with the DI container using `AddRefitClient`.

```csharp
using Refit;
using MyApp.ApiClients;

var builder = WebApplication.CreateBuilder(args);

builder.Services
    .AddRefitClient<IProductsApi>()
    .ConfigureHttpClient(client =>
    {
        client.BaseAddress = new Uri("https://api.products.com");
        client.DefaultRequestHeaders.Add("Accept", "application/json");
        client.Timeout = TimeSpan.FromSeconds(30);
    })
    .AddStandardResilienceHandler();

builder.Services
    .AddRefitClient<IOrdersApi>(new RefitSettings
    {
        ContentSerializer = new SystemTextJsonContentSerializer(
            new System.Text.Json.JsonSerializerOptions
            {
                PropertyNamingPolicy = System.Text.Json.JsonNamingPolicy.CamelCase,
                DefaultIgnoreCondition = System.Text.Json.Serialization.JsonIgnoreCondition.WhenWritingNull
            })
    })
    .ConfigureHttpClient(client =>
    {
        client.BaseAddress = new Uri("https://api.orders.com");
    })
    .AddHttpMessageHandler<AuthHeaderHandler>();

var app = builder.Build();

app.MapGet("/products", async (IProductsApi api, int page = 1) =>
    Results.Ok(await api.GetAllAsync(page)));

app.Run();
```

## Authentication with Delegating Handlers

Add authentication tokens to requests using `DelegatingHandler`.

```csharp
using System.Net.Http.Headers;

namespace MyApp.Http;

public class AuthHeaderHandler : DelegatingHandler
{
    private readonly ITokenService _tokenService;

    public AuthHeaderHandler(ITokenService tokenService)
    {
        _tokenService = tokenService;
    }

    protected override async Task<HttpResponseMessage> SendAsync(
        HttpRequestMessage request,
        CancellationToken cancellationToken)
    {
        var token = await _tokenService.GetAccessTokenAsync(cancellationToken);
        request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);
        return await base.SendAsync(request, cancellationToken);
    }
}

// Registration
builder.Services.AddTransient<AuthHeaderHandler>();
builder.Services.AddScoped<ITokenService, TokenService>();

builder.Services
    .AddRefitClient<IProductsApi>()
    .ConfigureHttpClient(c => c.BaseAddress = new Uri("https://api.products.com"))
    .AddHttpMessageHandler<AuthHeaderHandler>();
```

## Error Handling with ApiException

Handle API errors using Refit's `ApiException` and `ApiResponse<T>`.

```csharp
using Refit;

namespace MyApp.ApiClients;

// Option 1: Use ApiResponse<T> for non-throwing error handling
public interface IOrdersApi
{
    [Get("/api/orders/{id}")]
    Task<ApiResponse<OrderDto>> GetByIdAsync(int id);

    [Post("/api/orders")]
    Task<ApiResponse<OrderDto>> CreateAsync([Body] CreateOrderRequest request);
}

// Service using ApiResponse<T>
public class OrderService
{
    private readonly IOrdersApi _api;
    private readonly ILogger<OrderService> _logger;

    public OrderService(IOrdersApi api, ILogger<OrderService> logger)
    {
        _api = api;
        _logger = logger;
    }

    public async Task<OrderResult> GetOrderAsync(int id)
    {
        using var response = await _api.GetByIdAsync(id);

        if (response.IsSuccessStatusCode && response.Content is not null)
        {
            return OrderResult.Success(response.Content);
        }

        _logger.LogWarning(
            "Failed to get order {Id}. Status: {Status}, Error: {Error}",
            id,
            response.StatusCode,
            response.Error?.Content);

        return response.StatusCode switch
        {
            System.Net.HttpStatusCode.NotFound => OrderResult.NotFound(),
            System.Net.HttpStatusCode.Unauthorized => OrderResult.Unauthorized(),
            _ => OrderResult.Error($"API returned {response.StatusCode}")
        };
    }
}

// Option 2: Use try-catch with ApiException
public class ProductService
{
    private readonly IProductsApi _api;

    public ProductService(IProductsApi api) => _api = api;

    public async Task<ProductDto?> GetProductAsync(int id)
    {
        try
        {
            return await _api.GetByIdAsync(id);
        }
        catch (ApiException ex) when (ex.StatusCode == System.Net.HttpStatusCode.NotFound)
        {
            return null;
        }
        catch (ApiException ex)
        {
            var errorBody = await ex.GetContentAsAsync<ProblemDetails>();
            throw new ExternalApiException(
                $"Products API error: {errorBody?.Detail ?? ex.Message}",
                ex);
        }
    }
}
```

## Headers and Dynamic Configuration

Use static and dynamic headers on interfaces and methods.

```csharp
using Refit;

namespace MyApp.ApiClients;

[Headers("User-Agent: MyApp/1.0", "Accept: application/json")]
public interface IExternalApi
{
    [Get("/data")]
    [Headers("Cache-Control: no-cache")]
    Task<DataResponse> GetFreshDataAsync();

    [Get("/data")]
    Task<DataResponse> GetCachedDataAsync();

    [Post("/data")]
    Task<DataResponse> CreateDataAsync(
        [Body] DataRequest request,
        [Header("X-Idempotency-Key")] string idempotencyKey,
        [Header("X-Request-Id")] string requestId);

    [Get("/data")]
    Task<DataResponse> GetDataWithAuthAsync(
        [Authorize("Bearer")] string token);
}
```

## Refit vs Other HTTP Client Libraries

| Feature | Refit | RestSharp | HttpClient | Flurl |
|---|---|---|---|---|
| Approach | Interface + attributes | Builder pattern | Manual requests | Fluent URL builder |
| Code generation | Source generator | None | None | None |
| Type safety | Compile-time | Runtime | Runtime | Runtime |
| Serialization | Auto (STJ / Newtonsoft) | Auto (STJ / Newtonsoft) | Manual | Auto (STJ / Newtonsoft) |
| HttpClientFactory | Built-in integration | v107+ support | Native | Built-in integration |
| Error handling | ApiException / ApiResponse | RestResponse | HttpResponseMessage | FlurlHttpException |
| Multipart upload | `[Multipart]` + `StreamPart` | `AddFile()` | `MultipartFormDataContent` | `PostMultipartAsync()` |
| Query objects | `[Query]` on complex types | `AddQueryParameter()` | Manual string building | `SetQueryParams()` |

## Best Practices

1. **Define one Refit interface per API domain** (e.g., `IProductsApi`, `IOrdersApi`, `IUsersApi`) rather than one monolithic interface, so that each interface can be registered with different `HttpClient` configurations (base URL, timeout, retry policy) and injected only where needed.

2. **Use `AddRefitClient<T>()` with `ConfigureHttpClient()` instead of `RestService.For<T>()`** so that Refit clients participate in `HttpClientFactory`'s handler lifecycle management, preventing socket exhaustion from creating `HttpClient` instances manually.

3. **Return `Task<ApiResponse<T>>` instead of `Task<T>` on interface methods** when the calling code needs to inspect HTTP status codes, headers, or error bodies without catching exceptions, because `ApiResponse<T>` wraps the response metadata and deserialized content together.

4. **Add resilience with `.AddStandardResilienceHandler()` from `Microsoft.Extensions.Http.Resilience`** on `AddRefitClient` registrations to automatically retry transient failures, apply circuit breakers, and enforce timeouts, rather than implementing retry logic in the consuming service.

5. **Use `[Query]` on complex type parameters** to automatically flatten object properties into query string parameters (`?term=shoes&minPrice=10&maxPrice=100`) instead of building query strings manually, keeping method signatures clean and type-safe.

6. **Implement `DelegatingHandler` for cross-cutting concerns** (authentication, logging, correlation IDs) and register them with `.AddHttpMessageHandler<T>()`, so that all requests through a Refit client include the required headers without modifying each interface method.

7. **Use `[Authorize("Bearer")]` on a string parameter for per-request token injection** in scenarios where different calls may use different tokens (multi-tenant, user impersonation), instead of a shared `DelegatingHandler` that always attaches the same token.

8. **Configure `RefitSettings` with `SystemTextJsonContentSerializer`** and explicit `JsonSerializerOptions` (camelCase naming, null handling) to ensure serialization matches the API contract, rather than relying on default serializer settings that may differ between .NET versions.

9. **Dispose `ApiResponse<T>` objects** by wrapping them in `using` statements or calling `Dispose()` after reading the content, because `ApiResponse<T>` holds an `HttpResponseMessage` whose `Content` stream should be released after use to free network connections.

10. **Use `[AliasAs("name")]` on parameters and properties** when the C# property name differs from the API's expected parameter name (e.g., `[AliasAs("page_size")] int pageSize`), because Refit uses the C# name by default and API servers with snake_case conventions will reject unrecognized parameter names.
