---
name: restsharp
description: |
  USE FOR: Making HTTP API calls using RestSharp's fluent request builder with automatic serialization, authenticators, and response handling. Use when consuming REST APIs that need configurable serialization, file uploads, and built-in authentication support without defining interfaces.
  DO NOT USE FOR: Type-safe compile-time API clients (use Refit), GraphQL queries (use StrawberryShake), or new projects where HttpClientFactory with source-generated serialization is preferred (use HttpClient with System.Text.Json).
license: MIT
metadata:
  displayName: RestSharp
  author: "Tyler-R-Kendrick"
  version: "1.0.0"
compatibility:
  - claude
  - copilot
  - cursor
references:
  - title: "RestSharp Documentation"
    url: "https://restsharp.dev/"
  - title: "RestSharp GitHub Repository"
    url: "https://github.com/restsharp/RestSharp"
  - title: "RestSharp NuGet Package"
    url: "https://www.nuget.org/packages/RestSharp"
---

# RestSharp

## Overview

RestSharp is a mature HTTP client library for .NET that simplifies REST API consumption with automatic serialization/deserialization, authenticators, interceptors, and a fluent request builder. Starting with v107, RestSharp wraps `HttpClient` internally and can integrate with `HttpClientFactory` for proper handler lifecycle management. RestSharp supports JSON (System.Text.Json and Newtonsoft.Json), XML, and custom serializers. It provides built-in authenticators for OAuth1, OAuth2, JWT, and HTTP Basic authentication. RestSharp handles multipart file uploads, query parameters, URL segments, and response deserialization with a consistent API across all HTTP methods.

## Basic Client Setup and Requests

Create a `RestClient` and make typed HTTP requests.

```csharp
using RestSharp;

namespace MyApp.ApiClients;

public class ProductApiClient
{
    private readonly RestClient _client;

    public ProductApiClient(RestClient client)
    {
        _client = client;
    }

    public async Task<List<ProductDto>?> GetProductsAsync(
        int page = 1,
        string? category = null,
        CancellationToken ct = default)
    {
        var request = new RestRequest("api/products")
            .AddQueryParameter("page", page)
            .AddQueryParameter("pageSize", 20);

        if (category is not null)
            request.AddQueryParameter("category", category);

        var response = await _client.ExecuteGetAsync<List<ProductDto>>(request, ct);

        if (!response.IsSuccessful)
            throw new ApiException($"Failed: {response.StatusCode} - {response.ErrorMessage}");

        return response.Data;
    }

    public async Task<ProductDto?> GetProductByIdAsync(int id, CancellationToken ct = default)
    {
        var request = new RestRequest("api/products/{id}")
            .AddUrlSegment("id", id);

        return await _client.GetAsync<ProductDto>(request, ct);
    }

    public async Task<ProductDto?> CreateProductAsync(
        CreateProductRequest product,
        CancellationToken ct = default)
    {
        var request = new RestRequest("api/products")
            .AddJsonBody(product);

        return await _client.PostAsync<ProductDto>(request, ct);
    }

    public async Task<ProductDto?> UpdateProductAsync(
        int id,
        UpdateProductRequest product,
        CancellationToken ct = default)
    {
        var request = new RestRequest("api/products/{id}")
            .AddUrlSegment("id", id)
            .AddJsonBody(product);

        return await _client.PutAsync<ProductDto>(request, ct);
    }

    public async Task DeleteProductAsync(int id, CancellationToken ct = default)
    {
        var request = new RestRequest("api/products/{id}")
            .AddUrlSegment("id", id);

        await _client.DeleteAsync(request, ct);
    }
}

public record ProductDto(int Id, string Name, decimal Price, string Category);
public record CreateProductRequest(string Name, decimal Price, string Category);
public record UpdateProductRequest(string? Name, decimal? Price, string? Category);
```

## ASP.NET Core Registration with HttpClientFactory

Register RestSharp with dependency injection using `HttpClientFactory`.

```csharp
using RestSharp;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddHttpClient("ProductsApi", client =>
{
    client.BaseAddress = new Uri("https://api.products.com");
    client.DefaultRequestHeaders.Add("Accept", "application/json");
    client.Timeout = TimeSpan.FromSeconds(30);
});

builder.Services.AddTransient(sp =>
{
    var httpClientFactory = sp.GetRequiredService<IHttpClientFactory>();
    var httpClient = httpClientFactory.CreateClient("ProductsApi");

    var options = new RestClientOptions
    {
        ConfigureMessageHandler = _ => httpClient
    };

    return new RestClient(httpClient,
        configureSerialization: s => s.UseSystemTextJson(new System.Text.Json.JsonSerializerOptions
        {
            PropertyNamingPolicy = System.Text.Json.JsonNamingPolicy.CamelCase
        }));
});

builder.Services.AddScoped<ProductApiClient>();

var app = builder.Build();

app.MapGet("/products", async (ProductApiClient client, int page = 1) =>
    Results.Ok(await client.GetProductsAsync(page)));

app.Run();
```

## Authentication

Use built-in authenticators for various authentication schemes.

```csharp
using RestSharp;
using RestSharp.Authenticators;
using RestSharp.Authenticators.OAuth2;

namespace MyApp.ApiClients;

// JWT Bearer authentication
public static class AuthenticatedClients
{
    public static RestClient CreateBearerClient(string baseUrl, string token)
    {
        var options = new RestClientOptions(baseUrl)
        {
            Authenticator = new JwtAuthenticator(token)
        };

        return new RestClient(options);
    }

    // HTTP Basic authentication
    public static RestClient CreateBasicClient(string baseUrl, string username, string password)
    {
        var options = new RestClientOptions(baseUrl)
        {
            Authenticator = new HttpBasicAuthenticator(username, password)
        };

        return new RestClient(options);
    }

    // OAuth2 with token refresh
    public static RestClient CreateOAuth2Client(
        string baseUrl,
        string clientId,
        string clientSecret,
        string tokenUrl)
    {
        var options = new RestClientOptions(baseUrl)
        {
            Authenticator = new OAuth2AuthorizationRequestHeaderAuthenticator(
                GetOAuth2Token(clientId, clientSecret, tokenUrl).Result,
                "Bearer")
        };

        return new RestClient(options);
    }

    private static async Task<string> GetOAuth2Token(
        string clientId, string clientSecret, string tokenUrl)
    {
        using var tokenClient = new RestClient(tokenUrl);
        var request = new RestRequest()
            .AddParameter("grant_type", "client_credentials")
            .AddParameter("client_id", clientId)
            .AddParameter("client_secret", clientSecret);

        var response = await tokenClient.PostAsync<TokenResponse>(request);
        return response?.AccessToken ?? throw new InvalidOperationException("Token retrieval failed");
    }
}

public record TokenResponse(
    [property: System.Text.Json.Serialization.JsonPropertyName("access_token")] string AccessToken,
    [property: System.Text.Json.Serialization.JsonPropertyName("expires_in")] int ExpiresIn);
```

## File Upload and Download

Handle file uploads with multipart form data and file downloads.

```csharp
using RestSharp;

namespace MyApp.ApiClients;

public class FileApiClient
{
    private readonly RestClient _client;

    public FileApiClient(RestClient client) => _client = client;

    public async Task<UploadResult?> UploadFileAsync(
        string filePath,
        string description,
        CancellationToken ct = default)
    {
        var request = new RestRequest("api/files", Method.Post)
            .AddFile("file", filePath, "application/octet-stream")
            .AddParameter("description", description)
            .AlwaysMultipartFormData();

        return await _client.PostAsync<UploadResult>(request, ct);
    }

    public async Task<byte[]?> DownloadFileAsync(
        string fileId,
        CancellationToken ct = default)
    {
        var request = new RestRequest("api/files/{id}/download")
            .AddUrlSegment("id", fileId);

        return await _client.DownloadDataAsync(request, ct);
    }

    public async Task DownloadFileToPathAsync(
        string fileId,
        string outputPath,
        CancellationToken ct = default)
    {
        var request = new RestRequest("api/files/{id}/download")
            .AddUrlSegment("id", fileId);

        var data = await _client.DownloadDataAsync(request, ct);
        if (data is not null)
        {
            await File.WriteAllBytesAsync(outputPath, data, ct);
        }
    }
}

public record UploadResult(string FileId, string Url, long SizeBytes);
```

## Interceptors for Cross-Cutting Concerns

Use interceptors to add logging, retry headers, or modify requests globally.

```csharp
using RestSharp;
using RestSharp.Interceptors;
using Microsoft.Extensions.Logging;

namespace MyApp.Http;

public class LoggingInterceptor : Interceptor
{
    private readonly ILogger _logger;

    public LoggingInterceptor(ILogger<LoggingInterceptor> logger) => _logger = logger;

    public override ValueTask BeforeRequest(
        RestRequest request,
        CancellationToken cancellationToken)
    {
        _logger.LogInformation(
            "Sending {Method} {Resource}",
            request.Method,
            request.Resource);

        request.AddOrUpdateHeader("X-Request-Id", Guid.NewGuid().ToString());
        return ValueTask.CompletedTask;
    }

    public override ValueTask AfterRequest(
        RestResponse response,
        CancellationToken cancellationToken)
    {
        _logger.LogInformation(
            "Received {StatusCode} from {Uri} in {Duration}ms",
            response.StatusCode,
            response.ResponseUri,
            response.Headers?
                .FirstOrDefault(h => h.Name == "X-Response-Time")?.Value);

        return ValueTask.CompletedTask;
    }
}

// Registration
var options = new RestClientOptions("https://api.example.com")
{
    Interceptors = [new LoggingInterceptor(logger)]
};
var client = new RestClient(options);
```

## RestSharp vs Other HTTP Client Libraries

| Feature | RestSharp | Refit | HttpClient | Flurl |
|---|---|---|---|---|
| Approach | Builder pattern | Interface + attributes | Manual | Fluent URL builder |
| Authenticators | Built-in (JWT, Basic, OAuth) | DelegatingHandler | DelegatingHandler | DelegatingHandler |
| Serialization | Auto (STJ / Newtonsoft / XML) | Auto (STJ / Newtonsoft) | Manual | Auto (STJ / Newtonsoft) |
| File upload | `AddFile()` | `[Multipart]` + `StreamPart` | `MultipartFormDataContent` | `PostMultipartAsync()` |
| Interceptors | `Interceptor` base class | DelegatingHandler | DelegatingHandler | `BeforeCall` / `AfterCall` |
| HttpClientFactory | v107+ wraps HttpClient | Built-in | Native | Built-in |
| Code generation | None | Source generator | None | None |
| XML support | Built-in | Custom serializer | Manual | Not built-in |

## Best Practices

1. **Create `RestClient` instances through `HttpClientFactory`** by registering named `HttpClient` instances and passing them to the `RestClient` constructor, so that `HttpMessageHandler` lifetimes are managed by the factory and socket exhaustion is prevented.

2. **Use `AddUrlSegment()` for path parameters** (e.g., `"api/products/{id}"` with `.AddUrlSegment("id", 42)`) instead of string interpolation (`$"api/products/{id}"`), because URL segments are properly encoded and the request template remains readable in logs and interceptors.

3. **Use `ExecuteGetAsync<T>()` / `ExecutePostAsync<T>()` instead of `GetAsync<T>()` / `PostAsync<T>()`** when you need to inspect the full response including status code, headers, and error details, because the `Execute*` methods return a `RestResponse<T>` with metadata while the shorthand methods throw on non-success status codes.

4. **Configure serialization explicitly** using `configureSerialization: s => s.UseSystemTextJson(options)` when creating the `RestClient` to control property naming, null handling, and enum serialization, rather than relying on default serializer settings that may not match the API's expected format.

5. **Use built-in authenticators** (`JwtAuthenticator`, `HttpBasicAuthenticator`, `OAuth2AuthorizationRequestHeaderAuthenticator`) rather than manually adding `Authorization` headers to each request, because authenticators apply consistently to all requests and can be swapped without modifying request-building code.

6. **Pass `CancellationToken` to all async methods** from the calling context (controller, hosted service) so that HTTP requests are cancelled when the client disconnects or the application shuts down, preventing wasted network calls and improving shutdown performance.

7. **Use interceptors for cross-cutting concerns** (logging, correlation IDs, metrics) by extending the `Interceptor` base class and adding instances to `RestClientOptions.Interceptors`, rather than modifying each request individually, ensuring all requests consistently include the required behavior.

8. **Use `AddJsonBody()` for JSON payloads and `AddFile()` for file uploads** rather than manually constructing `StringContent` or `MultipartFormDataContent`, because RestSharp sets the correct `Content-Type` headers and handles serialization and encoding automatically.

9. **Handle errors by checking `response.IsSuccessful` before accessing `response.Data`** and examine `response.ErrorException` for transport errors and `response.Content` for API error bodies, rather than only checking the deserialized `Data` property which is null on failure.

10. **Set `MaxTimeout` on `RestClientOptions`** to a value appropriate for the downstream service (e.g., 30 seconds for most APIs, 120 seconds for report generation endpoints) rather than using the default infinite timeout, because unresponsive downstream services will hold connections open indefinitely and exhaust the connection pool.
