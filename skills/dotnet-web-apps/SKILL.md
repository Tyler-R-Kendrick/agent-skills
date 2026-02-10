---
name: dotnet-web-apps
description: Guidance for building modern .NET web applications with ASP.NET Core. Use when working with web apps.
license: MIT
metadata:
  displayName: ".NET Web Apps"
  author: "Tyler-R-Kendrick"
---

# .NET Web Apps

## Overview
Build modern, scalable web applications with ASP.NET Core using Minimal APIs, MVC, Razor Pages, or Blazor.

## Minimal APIs

Lightweight API approach with minimal ceremony.

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapGet("/products", async (IProductService productService) =>
{
    var products = await productService.GetAllAsync();
    return Results.Ok(products);
});

app.MapGet("/products/{id}", async (int id, IProductService productService) =>
{
    var product = await productService.GetByIdAsync(id);
    return product is not null ? Results.Ok(product) : Results.NotFound();
});

app.MapPost("/products", async (Product product, IProductService productService) =>
{
    var created = await productService.CreateAsync(product);
    return Results.Created($"/products/{created.Id}", created);
});

app.Run();
```

## MVC Controllers

Traditional controller-based approach.

```csharp
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly IProductService _productService;
    
    public ProductsController(IProductService productService)
    {
        _productService = productService;
    }
    
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Product>>> GetAll()
    {
        var products = await _productService.GetAllAsync();
        return Ok(products);
    }
    
    [HttpGet("{id}")]
    public async Task<ActionResult<Product>> GetById(int id)
    {
        var product = await _productService.GetByIdAsync(id);
        
        if (product is null)
        {
            return NotFound();
        }
        
        return Ok(product);
    }
    
    [HttpPost]
    public async Task<ActionResult<Product>> Create([FromBody] Product product)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        
        var created = await _productService.CreateAsync(product);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }
    
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] Product product)
    {
        if (id != product.Id)
        {
            return BadRequest();
        }
        
        await _productService.UpdateAsync(product);
        return NoContent();
    }
    
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await _productService.DeleteAsync(id);
        return NoContent();
    }
}
```

## Razor Pages

Page-focused development model.

```csharp
// Pages/Products/Index.cshtml.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

public class IndexModel : PageModel
{
    private readonly IProductService _productService;
    
    public IndexModel(IProductService productService)
    {
        _productService = productService;
    }
    
    public IList<Product> Products { get; set; } = new List<Product>();
    
    public async Task OnGetAsync()
    {
        Products = await _productService.GetAllAsync();
    }
}
```

```html
@* Pages/Products/Index.cshtml *@
@page
@model IndexModel

<h1>Products</h1>

<table class="table">
    <thead>
        <tr>
            <th>Name</th>
            <th>Price</th>
        </tr>
    </thead>
    <tbody>
        @foreach (var product in Model.Products)
        {
            <tr>
                <td>@product.Name</td>
                <td>@product.Price</td>
            </tr>
        }
    </tbody>
</table>
```

## Blazor Server

Interactive web UI with server-side rendering.

```csharp
@page "/products"
@inject IProductService ProductService

<h1>Products</h1>

@if (products == null)
{
    <p>Loading...</p>
}
else
{
    <table class="table">
        <thead>
            <tr>
                <th>Name</th>
                <th>Price</th>
            </tr>
        </thead>
        <tbody>
            @foreach (var product in products)
            {
                <tr>
                    <td>@product.Name</td>
                    <td>@product.Price</td>
                </tr>
            }
        </tbody>
    </table>
}

@code {
    private List<Product>? products;
    
    protected override async Task OnInitializedAsync()
    {
        products = await ProductService.GetAllAsync();
    }
}
```

## Middleware

```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

// Built-in middleware
app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();

// Custom middleware
app.Use(async (context, next) =>
{
    var requestId = Guid.NewGuid().ToString();
    context.Items["RequestId"] = requestId;
    
    await next();
    
    context.Response.Headers["X-Request-Id"] = requestId;
});

app.Run();
```

## Dependency Injection

```csharp
var builder = WebApplication.CreateBuilder(args);

// Register services
builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddSingleton<ICacheService, CacheService>();
builder.Services.AddTransient<IEmailService, EmailService>();

// HttpClient factory
builder.Services.AddHttpClient<IApiClient, ApiClient>(client =>
{
    client.BaseAddress = new Uri("https://api.example.com");
});

// Options pattern
builder.Services.Configure<AppSettings>(
    builder.Configuration.GetSection("AppSettings"));

var app = builder.Build();
```

## Configuration

```csharp
var builder = WebApplication.CreateBuilder(args);

// appsettings.json is loaded by default
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
var apiKey = builder.Configuration["ExternalApi:ApiKey"];

// Load additional sources
builder.Configuration.AddJsonFile("secrets.json", optional: true);
builder.Configuration.AddEnvironmentVariables();
builder.Configuration.AddUserSecrets<Program>();
```

## Authentication & Authorization

```csharp
var builder = WebApplication.CreateBuilder(args);

// JWT authentication
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
        };
    });

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("AdminOnly", policy => policy.RequireRole("Admin"));
});

var app = builder.Build();
app.UseAuthentication();
app.UseAuthorization();

// Protected endpoint
app.MapGet("/admin", () => "Admin area")
    .RequireAuthorization("AdminOnly");
```

## Database with EF Core

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

// Auto-apply migrations
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    await db.Database.MigrateAsync();
}

app.Run();
```

## CORS

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("https://example.com")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();
app.UseCors();
```

## SignalR (Real-time)

```csharp
// Hub
public class ChatHub : Hub
{
    public async Task SendMessage(string user, string message)
    {
        await Clients.All.SendAsync("ReceiveMessage", user, message);
    }
}

// Register
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSignalR();

var app = builder.Build();
app.MapHub<ChatHub>("/chatHub");
```

## Rate Limiting

```csharp
using Microsoft.AspNetCore.RateLimiting;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRateLimiter(options =>
{
    options.AddFixedWindowLimiter("fixed", config =>
    {
        config.PermitLimit = 10;
        config.Window = TimeSpan.FromMinutes(1);
    });
});

var app = builder.Build();
app.UseRateLimiter();

app.MapGet("/api/data", () => "Data")
    .RequireRateLimiting("fixed");
```

## Response Caching

```csharp
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddResponseCaching();

var app = builder.Build();
app.UseResponseCaching();

app.MapGet("/products", async (IProductService service) =>
{
    var products = await service.GetAllAsync();
    return Results.Ok(products);
}).CacheOutput(policy => policy.Expire(TimeSpan.FromMinutes(5)));
```

## Health Checks

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddHealthChecks()
    .AddNpgSql(builder.Configuration.GetConnectionString("DefaultConnection")!)
    .AddRedis(builder.Configuration.GetConnectionString("Redis")!);

var app = builder.Build();
app.MapHealthChecks("/health");
```

## Background Services

```csharp
public class DataSyncService : BackgroundService
{
    private readonly ILogger<DataSyncService> _logger;
    
    public DataSyncService(ILogger<DataSyncService> logger)
    {
        _logger = logger;
    }
    
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            _logger.LogInformation("Syncing data at: {time}", DateTimeOffset.Now);
            await Task.Delay(TimeSpan.FromMinutes(5), stoppingToken);
        }
    }
}

// Register
builder.Services.AddHostedService<DataSyncService>();
```

## File Uploads

```csharp
app.MapPost("/upload", async (IFormFile file) =>
{
    var filePath = Path.Combine("uploads", file.FileName);
    
    using (var stream = File.Create(filePath))
    {
        await file.CopyToAsync(stream);
    }
    
    return Results.Ok(new { fileName = file.FileName });
});
```

## Guidance

- Use Minimal APIs for simple, lightweight APIs.
- Use MVC controllers for complex APIs with many endpoints.
- Use Razor Pages for server-rendered web UIs.
- Use Blazor for interactive, component-based web UIs.
- Inject dependencies through constructors.
- Use the Options pattern for configuration.
- Enable response caching for read-heavy endpoints.
- Add health checks for production monitoring.
- Use rate limiting to prevent abuse.
- Implement authentication and authorization for protected resources.
- Use EF Core migrations for database schema management.
- Enable CORS for cross-origin requests.
- Use SignalR for real-time features.
- Register background services for periodic tasks.
- Use `ILogger` for structured logging.
