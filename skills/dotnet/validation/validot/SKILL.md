---
name: validot
description: |
  USE FOR: Defining high-performance validation specifications using Validot's fluent specification builder. Use when you need allocation-free validation with reusable specifications, fast execution, and detailed error output.
  DO NOT USE FOR: Async validation with database lookups (Validot is synchronous), ASP.NET Core automatic model validation integration (use FluentValidation), or guard-clause-style argument checking (use CommunityToolkit Guard).
license: MIT
metadata:
  displayName: Validot
  author: "Tyler-R-Kendrick"
  version: "1.0.0"
compatibility:
  - claude
  - copilot
  - cursor
references:
  - title: "Validot GitHub Repository"
    url: "https://github.com/bartoszlenar/Validot"
  - title: "Validot NuGet Package"
    url: "https://www.nuget.org/packages/Validot"
---

# Validot

## Overview

Validot is a performance-focused .NET validation library that uses a specification-based approach to define validation rules. Specifications are built once using a fluent API and compiled into a `Validator<T>` instance that can be reused across requests with zero heap allocations during validation. Validot pre-computes error message templates and validation paths at specification creation time, making the validation pass itself extremely fast. It supports nested object validation, collection validation, custom rules, error message templating, and translation. Validot targets .NET Standard 2.0+.

## Defining Specifications

Create specifications using the `Specification<T>` delegate and Validot's fluent API.

```csharp
using Validot;

namespace MyApp.Validation;

public static class Specifications
{
    public static readonly Specification<string> EmailSpec = s => s
        .NotEmpty()
            .WithMessage("Email address is required.")
        .Email()
            .WithMessage("Invalid email format.")
        .MaxLength(254)
            .WithMessage("Email must not exceed 254 characters.");

    public static readonly Specification<string> PasswordSpec = s => s
        .NotEmpty()
            .WithMessage("Password is required.")
        .MinLength(8)
            .WithMessage("Password must be at least 8 characters.")
        .MaxLength(128)
            .WithMessage("Password must not exceed 128 characters.")
        .Rule(p => p.Any(char.IsUpper))
            .WithMessage("Password must contain at least one uppercase letter.")
        .Rule(p => p.Any(char.IsDigit))
            .WithMessage("Password must contain at least one digit.");

    public static readonly Specification<int> PositiveIntSpec = s => s
        .GreaterThan(0)
            .WithMessage("Value must be positive.");

    public static readonly Specification<decimal> MoneyAmountSpec = s => s
        .GreaterThanOrEqualTo(0.01m)
            .WithMessage("Amount must be at least $0.01.")
        .LessThanOrEqualTo(999_999.99m)
            .WithMessage("Amount must not exceed $999,999.99.");
}
```

## Complex Model Specification

Compose specifications for nested objects and collections.

```csharp
using Validot;

namespace MyApp.Validation;

public class CreateOrderRequest
{
    public int CustomerId { get; set; }
    public string ShippingAddress { get; set; } = string.Empty;
    public List<OrderItemRequest> Items { get; set; } = new();
    public decimal TipAmount { get; set; }
    public string? Notes { get; set; }
}

public class OrderItemRequest
{
    public string ProductId { get; set; } = string.Empty;
    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }
}

public static class OrderSpecifications
{
    public static readonly Specification<OrderItemRequest> OrderItemSpec = s => s
        .Member(m => m.ProductId, m => m
            .NotEmpty().WithMessage("Product ID is required.")
            .MaxLength(50).WithMessage("Product ID must not exceed 50 characters."))
        .Member(m => m.Quantity, m => m
            .GreaterThan(0).WithMessage("Quantity must be at least 1.")
            .LessThanOrEqualTo(100).WithMessage("Quantity must not exceed 100."))
        .Member(m => m.UnitPrice, m => m
            .GreaterThan(0m).WithMessage("Unit price must be positive."));

    public static readonly Specification<CreateOrderRequest> CreateOrderSpec = s => s
        .Member(m => m.CustomerId, m => m
            .GreaterThan(0).WithMessage("Customer ID must be positive."))
        .Member(m => m.ShippingAddress, m => m
            .NotEmpty().WithMessage("Shipping address is required.")
            .MinLength(10).WithMessage("Shipping address is too short.")
            .MaxLength(500).WithMessage("Shipping address must not exceed 500 characters."))
        .Member(m => m.Items, m => m
            .NotEmpty().WithMessage("Order must contain at least one item.")
            .MaxCollectionSize(50).WithMessage("Order must not exceed 50 items.")
            .AsCollection(OrderItemSpec))
        .Member(m => m.TipAmount, Specifications.MoneyAmountSpec)
        .Member(m => m.Notes, m => m
            .Optional()
            .MaxLength(1000).WithMessage("Notes must not exceed 1000 characters."));
}
```

## Creating and Using Validators

Compile specifications into reusable `Validator<T>` instances.

```csharp
using Validot;

namespace MyApp.Validation;

public static class Validators
{
    // Create validators once (thread-safe, reusable)
    public static readonly IValidator<CreateOrderRequest> OrderValidator =
        Validator.Factory.Create(OrderSpecifications.CreateOrderSpec);

    public static readonly IValidator<RegisterUserRequest> UserValidator =
        Validator.Factory.Create(UserSpecifications.RegisterUserSpec);
}

// Usage in a service
public class OrderService
{
    private readonly IValidator<CreateOrderRequest> _validator;
    private readonly IOrderRepository _orderRepo;

    public OrderService(IValidator<CreateOrderRequest> validator, IOrderRepository orderRepo)
    {
        _validator = validator;
        _orderRepo = orderRepo;
    }

    public OrderResult CreateOrder(CreateOrderRequest request)
    {
        var result = _validator.Validate(request);

        if (result.AnyErrors)
        {
            var errors = result.MessageMap
                .SelectMany(kvp => kvp.Value.Select(msg => new ValidationError
                {
                    Path = kvp.Key,
                    Message = msg
                }))
                .ToList();

            return OrderResult.Invalid(errors);
        }

        var order = MapToOrder(request);
        _orderRepo.Insert(order);
        return OrderResult.Created(order);
    }

    private static Order MapToOrder(CreateOrderRequest request) =>
        new()
        {
            CustomerId = request.CustomerId,
            ShippingAddress = request.ShippingAddress,
            Items = request.Items.Select(i => new OrderItem
            {
                ProductId = i.ProductId,
                Quantity = i.Quantity,
                UnitPrice = i.UnitPrice
            }).ToList()
        };
}

public record ValidationError
{
    public string Path { get; init; } = string.Empty;
    public string Message { get; init; } = string.Empty;
}
```

## ASP.NET Core Integration

Register Validot validators with the DI container and use them in endpoints.

```csharp
using Validot;

var builder = WebApplication.CreateBuilder(args);

// Register validators as singletons (they are thread-safe and immutable)
builder.Services.AddSingleton<IValidator<CreateOrderRequest>>(
    Validator.Factory.Create(OrderSpecifications.CreateOrderSpec));
builder.Services.AddSingleton<IValidator<RegisterUserRequest>>(
    Validator.Factory.Create(UserSpecifications.RegisterUserSpec));

builder.Services.AddScoped<OrderService>();

var app = builder.Build();

app.MapPost("/api/orders", (
    CreateOrderRequest request,
    IValidator<CreateOrderRequest> validator,
    OrderService orderService) =>
{
    var validationResult = validator.Validate(request);

    if (validationResult.AnyErrors)
    {
        var errors = validationResult.MessageMap
            .ToDictionary(
                kvp => kvp.Key,
                kvp => kvp.Value.ToArray());

        return Results.ValidationProblem(errors);
    }

    var result = orderService.CreateOrder(request);
    return Results.Created($"/api/orders/{result.Order!.Id}", result.Order);
});

app.Run();
```

## Validot vs Other Validation Libraries

| Feature | Validot | FluentValidation | DataAnnotations | CommunityToolkit Guard |
|---|---|---|---|---|
| Performance | Zero-alloc validation | Allocates per rule | Allocates per attribute | Throws (no result) |
| Async rules | No | Yes (MustAsync) | No | No |
| Specification reuse | First-class | Via Include() | Attribute inheritance | N/A |
| Error output | MessageMap (path => messages) | ValidationResult | ModelStateDictionary | Exception message |
| DI integration | Manual registration | Auto-discovery | Built-in | N/A |
| Collection rules | AsCollection() | RuleForEach() | No | HasSize* |
| Localization | Built-in translations | Manual | Resource files | No |

## Best Practices

1. **Create `Validator<T>` instances once and register them as singletons** in the DI container, because the factory method compiles the specification into an optimized validation plan with pre-allocated error templates; creating new validators per request wastes the compilation cost.

2. **Define specifications as `static readonly` fields in dedicated specification classes** (e.g., `OrderSpecifications.CreateOrderSpec`) rather than inline in service constructors, so that specifications are discoverable, reusable across validators, and unit-testable independently.

3. **Use `.Member()` with nested specifications for object graph validation** and `.AsCollection()` for list properties, composing small specifications into larger ones; avoid writing a single monolithic specification that validates the entire request in one flat chain.

4. **Use `.WithMessage()` on every rule to provide context-specific error messages** rather than relying on Validot's default messages, because default messages reference the rule type (e.g., "Must not be empty") without mentioning the field name, which is unhelpful in API responses.

5. **Use `.Optional()` on nullable or optional members** before applying further rules, so that null values pass validation without triggering subsequent rules; without `.Optional()`, a null `Notes` field would fail a `.MaxLength()` check with a confusing null reference error.

6. **Check `result.AnyErrors` before accessing `result.MessageMap`** to avoid unnecessary enumeration; `AnyErrors` is a fast boolean check that does not allocate, while `MessageMap` builds a dictionary on access.

7. **Map `result.MessageMap` to ASP.NET Core's `Results.ValidationProblem(IDictionary<string, string[]>)` format** for API endpoints, so that front-end clients receive standard RFC 7807 problem details with per-field error arrays that integrate with form validation libraries.

8. **Use `.Rule(predicate)` for custom validation logic** that Validot's built-in rules do not cover (e.g., password complexity, business-specific formats), keeping the predicate as a pure function without side effects so it can be safely invoked during the synchronous validation pass.

9. **Do not use Validot for validation that requires database lookups or external API calls** because Validot's validation pipeline is synchronous; use FluentValidation with `MustAsync` for rules that need async I/O, or split validation into a synchronous Validot pass for format checks and a separate async service call for uniqueness/existence checks.

10. **Write unit tests that instantiate the validator, pass both valid and invalid objects, and assert on `result.AnyErrors` and specific paths in `result.MessageMap`**, verifying that each rule produces the expected error at the expected path; do not rely solely on integration tests through the HTTP pipeline.
