---
name: fluent-validations
description: |
  USE FOR: Building strongly-typed validation rules for domain models and DTOs using FluentValidation's fluent API. Use for form validation, API request validation, and business rule enforcement with composable, testable validators.
  DO NOT USE FOR: Simple null/range guard clauses on method parameters (use CommunityToolkit.Diagnostics Guard), compile-time type safety enforcement (use Parse Don't Validate pattern), or command pipeline orchestration (use Peasy or MediatR behaviors).
license: MIT
metadata:
  displayName: FluentValidation
  author: "Tyler-R-Kendrick"
  version: "1.0.0"
compatibility:
  - claude
  - copilot
  - cursor
references:
  - title: "FluentValidation Documentation"
    url: "https://docs.fluentvalidation.net/"
  - title: "FluentValidation GitHub Repository"
    url: "https://github.com/FluentValidation/FluentValidation"
  - title: "FluentValidation NuGet Package"
    url: "https://www.nuget.org/packages/FluentValidation"
---

# FluentValidation

## Overview

FluentValidation is a .NET validation library that uses a fluent interface and lambda expressions to build strongly-typed validation rules. Validators are defined as classes that inherit from `AbstractValidator<T>`, and rules are configured in the constructor using a chainable API. FluentValidation supports conditional rules, custom validators, async validation, collection validation, and integration with ASP.NET Core's model validation pipeline. It produces `ValidationResult` objects containing typed error messages that can be mapped to API responses or UI error displays.

## Basic Validator

Define validation rules in a class that inherits from `AbstractValidator<T>`.

```csharp
using FluentValidation;

namespace MyApp.Validators;

public class CreateOrderRequest
{
    public string CustomerId { get; set; } = string.Empty;
    public List<OrderItemDto> Items { get; set; } = new();
    public string ShippingAddress { get; set; } = string.Empty;
    public string? PromoCode { get; set; }
    public decimal TipAmount { get; set; }
}

public class OrderItemDto
{
    public string ProductId { get; set; } = string.Empty;
    public int Quantity { get; set; }
}

public class CreateOrderRequestValidator : AbstractValidator<CreateOrderRequest>
{
    public CreateOrderRequestValidator()
    {
        RuleFor(x => x.CustomerId)
            .NotEmpty().WithMessage("Customer ID is required.")
            .MaximumLength(36).WithMessage("Customer ID must not exceed 36 characters.");

        RuleFor(x => x.Items)
            .NotEmpty().WithMessage("Order must contain at least one item.");

        RuleForEach(x => x.Items)
            .SetValidator(new OrderItemDtoValidator());

        RuleFor(x => x.ShippingAddress)
            .NotEmpty().WithMessage("Shipping address is required.")
            .MinimumLength(10).WithMessage("Shipping address is too short.")
            .MaximumLength(500);

        RuleFor(x => x.PromoCode)
            .Matches(@"^[A-Z0-9]{4,12}$")
            .When(x => !string.IsNullOrEmpty(x.PromoCode))
            .WithMessage("Promo code must be 4-12 uppercase alphanumeric characters.");

        RuleFor(x => x.TipAmount)
            .GreaterThanOrEqualTo(0)
            .LessThanOrEqualTo(1000)
            .WithMessage("Tip must be between $0 and $1,000.");
    }
}

public class OrderItemDtoValidator : AbstractValidator<OrderItemDto>
{
    public OrderItemDtoValidator()
    {
        RuleFor(x => x.ProductId)
            .NotEmpty().WithMessage("Product ID is required.");

        RuleFor(x => x.Quantity)
            .InclusiveBetween(1, 100)
            .WithMessage("Quantity must be between 1 and 100.");
    }
}
```

## Async Validation with External Dependencies

Inject services into validators for rules that require database lookups or API calls.

```csharp
using FluentValidation;

namespace MyApp.Validators;

public class RegisterUserRequestValidator : AbstractValidator<RegisterUserRequest>
{
    private readonly IUserRepository _userRepository;

    public RegisterUserRequestValidator(IUserRepository userRepository)
    {
        _userRepository = userRepository;

        RuleFor(x => x.Email)
            .NotEmpty()
            .EmailAddress()
            .MustAsync(BeUniqueEmail)
            .WithMessage("An account with this email already exists.");

        RuleFor(x => x.Username)
            .NotEmpty()
            .MinimumLength(3)
            .MaximumLength(50)
            .Matches(@"^[a-zA-Z0-9_]+$")
            .WithMessage("Username may only contain letters, numbers, and underscores.")
            .MustAsync(BeUniqueUsername)
            .WithMessage("This username is already taken.");

        RuleFor(x => x.Password)
            .NotEmpty()
            .MinimumLength(8)
            .Must(ContainUppercase).WithMessage("Password must contain at least one uppercase letter.")
            .Must(ContainDigit).WithMessage("Password must contain at least one digit.")
            .Must(ContainSpecialChar).WithMessage("Password must contain at least one special character.");

        RuleFor(x => x.ConfirmPassword)
            .Equal(x => x.Password)
            .WithMessage("Passwords do not match.");
    }

    private async Task<bool> BeUniqueEmail(string email, CancellationToken ct)
        => !await _userRepository.EmailExistsAsync(email, ct);

    private async Task<bool> BeUniqueUsername(string username, CancellationToken ct)
        => !await _userRepository.UsernameExistsAsync(username, ct);

    private bool ContainUppercase(string password)
        => password.Any(char.IsUpper);

    private bool ContainDigit(string password)
        => password.Any(char.IsDigit);

    private bool ContainSpecialChar(string password)
        => password.Any(ch => !char.IsLetterOrDigit(ch));
}

public class RegisterUserRequest
{
    public string Email { get; set; } = string.Empty;
    public string Username { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public string ConfirmPassword { get; set; } = string.Empty;
}
```

## ASP.NET Core Integration

Register FluentValidation with ASP.NET Core's validation pipeline using automatic validator discovery.

```csharp
using FluentValidation;
using FluentValidation.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

// Register all validators from the assembly
builder.Services.AddValidatorsFromAssemblyContaining<CreateOrderRequestValidator>();

// Option 1: Automatic validation via filter
builder.Services.AddFluentValidationAutoValidation();

var app = builder.Build();
app.MapControllers();
app.Run();
```

Or validate manually in an endpoint for more control:

```csharp
using FluentValidation;
using Microsoft.AspNetCore.Mvc;

app.MapPost("/api/orders", async (
    CreateOrderRequest request,
    IValidator<CreateOrderRequest> validator,
    IOrderService orderService) =>
{
    var validationResult = await validator.ValidateAsync(request);

    if (!validationResult.IsValid)
    {
        return Results.ValidationProblem(
            validationResult.ToDictionary());
    }

    var order = await orderService.CreateAsync(request);
    return Results.Created($"/api/orders/{order.Id}", order);
});
```

## MediatR Pipeline Integration

Use FluentValidation in a MediatR pipeline behavior for CQRS validation.

```csharp
using FluentValidation;
using MediatR;

namespace MyApp.Behaviors;

public class ValidationBehavior<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse>
    where TRequest : IRequest<TResponse>
{
    private readonly IEnumerable<IValidator<TRequest>> _validators;

    public ValidationBehavior(IEnumerable<IValidator<TRequest>> validators)
    {
        _validators = validators;
    }

    public async Task<TResponse> Handle(
        TRequest request,
        RequestHandlerDelegate<TResponse> next,
        CancellationToken cancellationToken)
    {
        if (!_validators.Any())
            return await next();

        var context = new ValidationContext<TRequest>(request);

        var failures = (await Task.WhenAll(
                _validators.Select(v => v.ValidateAsync(context, cancellationToken))))
            .SelectMany(result => result.Errors)
            .Where(error => error is not null)
            .ToList();

        if (failures.Count > 0)
            throw new ValidationException(failures);

        return await next();
    }
}
```

## FluentValidation vs Other Approaches

| Feature | FluentValidation | DataAnnotations | CommunityToolkit Guard | Validot |
|---|---|---|---|---|
| Validation style | Fluent builder | Attributes | Static methods | Specification builder |
| Async support | Yes (MustAsync) | No | No | No |
| DI integration | Constructor injection | No | No | No |
| Collection rules | RuleForEach | No | HasSize* methods | Member + Each |
| Error result type | ValidationResult | ModelStateDictionary | Throws exceptions | IValidationResult |
| ASP.NET Core integration | Auto + manual | Built-in | Not applicable | Manual |

## Best Practices

1. **Create one validator class per request/command DTO** (e.g., `CreateOrderRequestValidator` for `CreateOrderRequest`) and register validators using `AddValidatorsFromAssemblyContaining<T>()`, which scans the assembly and registers every `AbstractValidator<T>` implementation with the DI container automatically.

2. **Use `RuleForEach` with a child validator via `.SetValidator(new ChildValidator())` for collection properties** instead of writing manual loops or `Must(x => x.All(...))`, because `RuleForEach` generates per-item error messages with the collection index included (e.g., `"Items[2].Quantity: ..."`), making it clear which item failed.

3. **Inject services (repositories, caches) into the validator constructor for async uniqueness checks** and use `MustAsync` rather than calling the service in the controller/handler and then conditionally adding errors; this keeps all validation logic in a single, testable class.

4. **Use `.When(condition)` and `.Unless(condition)` guards to skip rules for optional fields** rather than making every field required and then checking for null manually; conditional rules prevent false-positive validation errors when a property is intentionally omitted (e.g., promo code on an order).

5. **Call `validator.ValidateAsync()` instead of `Validate()` when any rule in the validator uses `MustAsync`, `WhenAsync`, or `CustomAsync`**, because the synchronous `Validate()` method throws `AsyncValidatorInvokedSynchronouslyException` if it encounters an async rule.

6. **Map `ValidationResult.ToDictionary()` to `Results.ValidationProblem()` in minimal API endpoints** to return a standard RFC 7807 problem details response with per-field errors, which front-end frameworks like React Hook Form and Blazor EditForm can parse and display automatically.

7. **Set `CascadeMode = CascadeMode.Stop` on rules where the first failure makes subsequent checks meaningless** (e.g., `NotEmpty` before `EmailAddress`), preventing redundant error messages like both "Email is required" and "Invalid email format" appearing for an empty field.

8. **Write unit tests for each validator by instantiating it directly with mocked dependencies** and asserting on `validationResult.IsValid`, `validationResult.Errors.Count`, and specific `validationResult.Errors[0].PropertyName` values; do not rely on integration tests through the HTTP pipeline alone.

9. **Avoid putting business logic that modifies state inside `Must` or `MustAsync` predicates** because validators may be invoked multiple times (auto-validation + manual validation), and side effects in validation rules cause duplicated operations, audit log entries, or database writes.

10. **Use `WithErrorCode("UNIQUE_EMAIL")` on rules that front-end clients need to handle programmatically** in addition to `WithMessage()`, because error codes are stable across localizations and allow the client to map errors to specific UI behaviors without parsing human-readable text.
