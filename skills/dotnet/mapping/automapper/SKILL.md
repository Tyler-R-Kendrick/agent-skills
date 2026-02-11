---
name: automapper
description: >
  Guidance for AutoMapper convention-based object mapping library.
  USE FOR: convention-based object-to-object mapping, Profile-based mapping configuration, flattening/unflattening, ProjectTo with EF Core IQueryable, reverse mapping, value resolvers, type converters.
  DO NOT USE FOR: compile-time source-generated mapping (use mapperly), manual mapping in performance-critical paths, mapping that involves complex business logic.
license: MIT
metadata:
  displayName: "AutoMapper"
  author: "Tyler-R-Kendrick"
  version: "1.0.0"
compatibility:
  - claude
  - copilot
  - cursor
references:
  - title: "AutoMapper Documentation"
    url: "https://docs.automapper.io/"
  - title: "AutoMapper GitHub Repository"
    url: "https://github.com/AutoMapper/AutoMapper"
  - title: "AutoMapper NuGet Package"
    url: "https://www.nuget.org/packages/AutoMapper"
---

# AutoMapper

## Overview

AutoMapper is a convention-based object-to-object mapper for .NET that eliminates repetitive property-by-property assignment code. It maps properties by name and type conventions, supports flattening (e.g., `Customer.Name` maps to `CustomerName`), and provides extension points for custom mappings via `ForMember`, value resolvers, and type converters. AutoMapper is configured through `Profile` classes and integrates with dependency injection through the `AutoMapper.Extensions.Microsoft.DependencyInjection` package.

AutoMapper uses runtime reflection to build mapping plans, which makes it flexible but slower than source-generated alternatives like Mapperly. It is best suited for applications where development speed and convention-based mapping outweigh the need for compile-time verification and zero-reflection performance.

## Profile-Based Configuration

Organize mappings into `Profile` classes, one per bounded context or feature area.

```csharp
using AutoMapper;

namespace MyApp.Mapping;

public class OrderMappingProfile : Profile
{
    public OrderMappingProfile()
    {
        CreateMap<Order, OrderDto>()
            .ForMember(
                dest => dest.CustomerName,
                opt => opt.MapFrom(src => src.Customer.FullName))
            .ForMember(
                dest => dest.TotalFormatted,
                opt => opt.MapFrom(src => src.Total.ToString("C")));

        CreateMap<OrderItem, OrderItemDto>();
        CreateMap<CreateOrderRequest, Order>()
            .ForMember(
                dest => dest.Id,
                opt => opt.Ignore())
            .ForMember(
                dest => dest.CreatedAt,
                opt => opt.MapFrom(_ => DateTime.UtcNow));
    }
}

public record Order(
    Guid Id, Customer Customer, decimal Total,
    DateTime CreatedAt, List<OrderItem> Items);
public record Customer(string FullName, string Email);
public record OrderItem(string ProductName, int Quantity, decimal Price);
public record OrderDto(
    Guid Id, string CustomerName, string TotalFormatted,
    List<OrderItemDto> Items);
public record OrderItemDto(string ProductName, int Quantity, decimal Price);
public record CreateOrderRequest(
    string CustomerName, decimal Total, List<OrderItemDto> Items);
```

## DI Registration

Register AutoMapper with the ASP.NET Core DI container. `AddAutoMapper` scans assemblies for `Profile` subclasses.

```csharp
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);

// Scans the assembly containing OrderMappingProfile for all Profiles
builder.Services.AddAutoMapper(
    typeof(MyApp.Mapping.OrderMappingProfile).Assembly);

var app = builder.Build();
app.Run();
```

## Basic Mapping Usage

Inject `IMapper` and use `Map<TDestination>()` to transform objects.

```csharp
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace MyApp.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrdersController : ControllerBase
{
    private readonly IMapper _mapper;
    private readonly IOrderRepository _repository;

    public OrdersController(IMapper mapper, IOrderRepository repository)
    {
        _mapper = mapper;
        _repository = repository;
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<OrderDto>> GetOrder(Guid id)
    {
        var order = await _repository.GetByIdAsync(id);
        if (order is null) return NotFound();

        var dto = _mapper.Map<OrderDto>(order);
        return Ok(dto);
    }

    [HttpPost]
    public async Task<ActionResult<OrderDto>> CreateOrder(
        CreateOrderRequest request)
    {
        var order = _mapper.Map<Order>(request);
        await _repository.AddAsync(order);

        var dto = _mapper.Map<OrderDto>(order);
        return CreatedAtAction(nameof(GetOrder),
            new { id = order.Id }, dto);
    }
}
```

## ProjectTo for IQueryable (EF Core)

`ProjectTo` translates mapping expressions into SQL via EF Core, avoiding loading full entities into memory.

```csharp
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace MyApp.Services;

public class OrderQueryService
{
    private readonly AppDbContext _db;
    private readonly IConfigurationProvider _mapperConfig;

    public OrderQueryService(
        AppDbContext db, IMapper mapper)
    {
        _db = db;
        _mapperConfig = mapper.ConfigurationProvider;
    }

    public async Task<List<OrderDto>> GetRecentOrdersAsync(
        int count, CancellationToken ct)
    {
        // ProjectTo generates SELECT with only the DTO columns
        return await _db.Orders
            .OrderByDescending(o => o.CreatedAt)
            .Take(count)
            .ProjectTo<OrderDto>(_mapperConfig)
            .ToListAsync(ct);
    }
}
```

## Value Resolvers and Type Converters

Use value resolvers for complex per-member logic and type converters for reusable type-level conversions.

```csharp
using AutoMapper;

namespace MyApp.Mapping;

// Value resolver: resolves a single member
public class FullAddressResolver
    : IValueResolver<Customer, CustomerDto, string>
{
    public string Resolve(
        Customer source, CustomerDto destination,
        string destMember, ResolutionContext context)
    {
        return $"{source.Street}, {source.City}, "
            + $"{source.State} {source.ZipCode}";
    }
}

// Type converter: converts entire type
public class StringToDateConverter
    : ITypeConverter<string, DateOnly>
{
    public DateOnly Convert(
        string source, DateOnly destination,
        ResolutionContext context)
    {
        return DateOnly.Parse(source);
    }
}

public class CustomerProfile : Profile
{
    public CustomerProfile()
    {
        CreateMap<Customer, CustomerDto>()
            .ForMember(
                dest => dest.FullAddress,
                opt => opt.MapFrom<FullAddressResolver>());

        CreateMap<string, DateOnly>()
            .ConvertUsing<StringToDateConverter>();
    }
}
```

## Configuration Validation

Validate all mapping configurations at startup to catch missing mappings before they cause runtime errors.

```csharp
using AutoMapper;
using Microsoft.Extensions.DependencyInjection;

var services = new ServiceCollection();
services.AddAutoMapper(typeof(OrderMappingProfile).Assembly);

var provider = services.BuildServiceProvider();
var mapper = provider.GetRequiredService<IMapper>();

// Throws if any mapping is incomplete or misconfigured
mapper.ConfigurationProvider.AssertConfigurationIsValid();
```

## AutoMapper vs Mapperly

| Feature | AutoMapper | Mapperly |
|---|---|---|
| Mapping strategy | Runtime reflection | Compile-time source generation |
| Performance | Moderate (reflection + expression trees) | Near hand-written (no reflection) |
| Configuration | Profile classes with fluent API | Attributes on partial classes |
| DI integration | `AddAutoMapper()` | Manual or `new` |
| `ProjectTo` (IQueryable) | Built-in | Not supported |
| Custom resolvers | `IValueResolver`, `ITypeConverter` | Custom methods in mapper class |
| Compile-time errors | No (runtime validation) | Yes (compiler errors) |
| NuGet package | `AutoMapper` | `Riok.Mapperly` |

## Best Practices

1. **Organize mappings into `Profile` classes** by feature area or bounded context (e.g., `OrderMappingProfile`, `CustomerMappingProfile`) rather than putting all mappings in a single profile.
2. **Call `AssertConfigurationIsValid()`** during application startup or in an integration test to catch missing member mappings, typos, and configuration errors before they cause runtime exceptions.
3. **Use `ProjectTo<T>()` instead of `Map<T>()`** when querying with EF Core to generate efficient SQL that selects only the mapped columns, avoiding N+1 queries and unnecessary data loading.
4. **Avoid placing business logic inside mapping profiles**; mappings should be pure data transformations. Complex logic belongs in service classes that call the mapper.
5. **Use `ForMember(..., opt => opt.Ignore())`** explicitly for destination properties that should not be mapped (e.g., `Id` on creation DTOs) to prevent `AssertConfigurationIsValid` from flagging them as unmapped.
6. **Prefer `IMapper` injection** over `Mapper.Map` static calls so mappings are testable with mock/stub implementations and do not rely on global state.
7. **Flatten nested objects by convention** (AutoMapper automatically maps `src.Customer.Name` to `dest.CustomerName`) and only use `ForMember` when the convention does not apply.
8. **Register value resolvers and type converters in DI** so they can access services like `IHttpContextAccessor` or `ICurrentUser` for context-dependent mapping.
9. **Keep DTOs simple and flat** to take advantage of AutoMapper's convention-based mapping; deeply nested DTOs negate the benefit of the library.
10. **Consider migrating to Mapperly** for new projects or hot-path mappings where the compile-time safety and zero-reflection performance of source generation outweigh AutoMapper's runtime flexibility.
