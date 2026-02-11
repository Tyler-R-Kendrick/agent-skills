---
name: dotnet-web-apps
description: |
  USE FOR: Choosing between and implementing .NET web application patterns including MVC, Razor Pages, Minimal APIs, and Blazor. Use when deciding on architecture, project structure, and routing strategies for ASP.NET Core web applications.
  DO NOT USE FOR: Native mobile/desktop apps (use MAUI or Avalonia), game development (use Unity or MonoGame), or projects that exclusively need a REST API without any server-rendered content (use the aspnet-core skill directly).
license: MIT
metadata:
  displayName: .NET Web Apps
  author: "Tyler-R-Kendrick"
  version: "1.0.0"
compatibility:
  - claude
  - copilot
  - cursor
---

# .NET Web Apps

## Overview

ASP.NET Core provides multiple models for building web applications: MVC (Model-View-Controller) for complex server-rendered apps, Razor Pages for page-focused scenarios, Minimal APIs for lightweight HTTP services, and Blazor for interactive web UIs with C#. Each model runs on the same ASP.NET Core pipeline and shares the dependency injection, configuration, middleware, and authentication infrastructure. Choosing the right model depends on the application's complexity, team familiarity, and whether the UI is server-rendered, client-rendered, or API-driven.

## MVC Pattern

Use the MVC pattern for applications with complex routing, multiple views per controller, and shared layouts.

```csharp
// Program.cs
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllersWithViews();
builder.Services.AddScoped<IProductService, ProductService>();

var app = builder.Build();
app.UseStaticFiles();
app.UseRouting();
app.UseAuthorization();
app.MapControllerRoute("default", "{controller=Home}/{action=Index}/{id?}");
app.Run();

// Controllers/ProductsController.cs
using Microsoft.AspNetCore.Mvc;

namespace MyApp.Controllers;

public class ProductsController : Controller
{
    private readonly IProductService _productService;

    public ProductsController(IProductService productService)
    {
        _productService = productService;
    }

    public async Task<IActionResult> Index(string? category, int page = 1)
    {
        var products = await _productService.GetPagedAsync(category, page, pageSize: 20);
        ViewBag.CurrentCategory = category;
        return View(products);
    }

    public async Task<IActionResult> Details(int id)
    {
        var product = await _productService.GetByIdAsync(id);
        if (product is null) return NotFound();
        return View(product);
    }

    [HttpGet]
    public IActionResult Create() => View();

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Create(CreateProductViewModel model)
    {
        if (!ModelState.IsValid) return View(model);

        await _productService.CreateAsync(model);
        TempData["Success"] = "Product created successfully.";
        return RedirectToAction(nameof(Index));
    }
}
```

## Razor Pages

Use Razor Pages for page-centric applications where each URL maps to a single page with its own model.

```csharp
// Program.cs
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddRazorPages();
builder.Services.AddScoped<IContactService, ContactService>();

var app = builder.Build();
app.UseStaticFiles();
app.UseRouting();
app.UseAuthorization();
app.MapRazorPages();
app.Run();

// Pages/Contacts/Create.cshtml.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.ComponentModel.DataAnnotations;

namespace MyApp.Pages.Contacts;

public class CreateModel : PageModel
{
    private readonly IContactService _contactService;

    public CreateModel(IContactService contactService)
    {
        _contactService = contactService;
    }

    [BindProperty]
    public ContactInput Input { get; set; } = new();

    public void OnGet() { }

    public async Task<IActionResult> OnPostAsync()
    {
        if (!ModelState.IsValid) return Page();

        await _contactService.CreateAsync(new Contact
        {
            Name = Input.Name,
            Email = Input.Email,
            Message = Input.Message
        });

        TempData["Success"] = "Contact submitted.";
        return RedirectToPage("/Contacts/Index");
    }

    public class ContactInput
    {
        [Required, StringLength(100)]
        public string Name { get; set; } = string.Empty;

        [Required, EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required, StringLength(2000)]
        public string Message { get; set; } = string.Empty;
    }
}
```

## Minimal APIs with Endpoint Groups

Use minimal APIs for lightweight microservices and API-only projects.

```csharp
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<IOrderService, OrderService>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapGroup("/api/orders")
    .WithTags("Orders")
    .MapOrderEndpoints();

app.Run();

// Extensions/OrderEndpoints.cs
public static class OrderEndpoints
{
    public static RouteGroupBuilder MapOrderEndpoints(this RouteGroupBuilder group)
    {
        group.MapGet("/", async (IOrderService service, int page = 1) =>
            Results.Ok(await service.GetPagedAsync(page)));

        group.MapGet("/{id:int}", async (int id, IOrderService service) =>
        {
            var order = await service.GetByIdAsync(id);
            return order is not null ? Results.Ok(order) : Results.NotFound();
        });

        group.MapPost("/", async (CreateOrderDto dto, IOrderService service) =>
        {
            var order = await service.CreateAsync(dto);
            return Results.Created($"/api/orders/{order.Id}", order);
        });

        return group;
    }
}
```

## Static Server-Side Rendering with Blazor

Use Blazor SSR for server-rendered pages with optional interactive islands.

```csharp
// Program.cs
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddRazorComponents()
    .AddInteractiveServerComponents();

var app = builder.Build();
app.UseStaticFiles();
app.UseAntiforgery();
app.MapRazorComponents<App>()
    .AddInteractiveServerRenderMode();
app.Run();
```

## Web Application Model Comparison

| Feature | MVC | Razor Pages | Minimal APIs | Blazor SSR |
|---|---|---|---|---|
| Best for | Complex web apps | Page-centric apps | Microservices/APIs | Interactive web UI |
| Routing | Convention + attribute | File/folder-based | Lambda-based | Component-based |
| Views | Razor views (.cshtml) | Razor pages (.cshtml) | JSON responses | Razor components (.razor) |
| Model binding | `[FromForm]`, `[FromBody]` | `[BindProperty]` | Parameter injection | `@bind`, `EditForm` |
| Testability | Controller unit tests | PageModel unit tests | Endpoint delegate tests | Component tests |
| SEO | Server-rendered HTML | Server-rendered HTML | N/A (API) | Server-rendered HTML |
| Complexity | Higher | Moderate | Lowest | Moderate |
| Areas/Sections | Yes (Areas) | Yes (folders) | Groups | Layouts |

## Best Practices

1. **Choose Razor Pages for page-centric web apps** where each URL corresponds to a single page (e.g., contact forms, dashboards, admin panels), and MVC only when multiple actions per controller are genuinely needed (e.g., a products controller with CRUD + search + bulk operations sharing the same service dependencies).

2. **Organize minimal API endpoints into static extension methods** (e.g., `MapOrderEndpoints()`, `MapUserEndpoints()`) in separate files under an `Endpoints/` folder, rather than defining all routes in `Program.cs`, to keep the startup file under 50 lines and make each endpoint group independently navigable.

3. **Use `MapGroup()` to share route prefixes, tags, filters, and authorization policies** across related endpoints instead of duplicating `.RequireAuthorization()` and `.WithTags()` on every individual endpoint, reducing boilerplate and ensuring policy consistency when new endpoints are added.

4. **Apply `[ValidateAntiForgeryToken]` on every MVC `[HttpPost]` action and Razor Page `OnPost` handler** that processes form submissions, and add `app.UseAntiforgery()` to the middleware pipeline, to prevent cross-site request forgery attacks on state-changing operations.

5. **Use `TempData` for post-redirect-get (PRG) success messages** in MVC and Razor Pages instead of passing messages via query strings or storing them in session, because `TempData` is automatically cleared after the next request and does not persist across browser refreshes.

6. **Set `[BindProperty]` on Razor Page properties that receive form data** and use a nested `Input` class to group all bound properties, rather than binding directly to the domain model, to prevent over-posting attacks where malicious users submit fields that should not be user-editable.

7. **Configure `AddControllersWithViews()` or `AddRazorPages()` with `AddJsonOptions(options => options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase)`** to ensure JSON responses use camelCase property names, matching JavaScript conventions and preventing front-end mapping errors.

8. **Use the `IWebHostEnvironment.IsDevelopment()` check to conditionally enable Swagger, detailed error pages, and developer exception page** so that sensitive diagnostic information is never exposed in production; `app.UseDeveloperExceptionPage()` leaks stack traces and connection strings.

9. **Implement `IAsyncActionFilter` or endpoint filters for cross-cutting validation** rather than repeating `ModelState.IsValid` checks in every controller action, centralizing validation logic and ensuring no action accidentally skips the check.

10. **Deploy behind a reverse proxy (NGINX, Azure App Gateway, YARP) and configure `ForwardedHeaders` middleware** to preserve the original client IP, scheme, and host from the `X-Forwarded-*` headers, because without this configuration, `HttpContext.Connection.RemoteIpAddress` returns the proxy's IP and `Request.Scheme` returns `http` instead of `https`.
