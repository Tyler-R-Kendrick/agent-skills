---
name: parse-dont-validate
description: |
  USE FOR: Designing domain models where invalid states are unrepresentable by parsing raw input into strongly-typed value objects at system boundaries. Use when enforcing invariants through the type system rather than runtime validation checks.
  DO NOT USE FOR: Quick prototypes where validation overhead is premature, thin CRUD layers that pass DTOs directly to the database, or scenarios where FluentValidation with error collection is required for user-facing form feedback.
license: MIT
metadata:
  displayName: Parse Don't Validate
  author: "Tyler-R-Kendrick"
  version: "1.0.0"
compatibility:
  - claude
  - copilot
  - cursor
---

# Parse Don't Validate

## Overview

"Parse, Don't Validate" is a design principle from functional programming (coined by Alexis King) that advocates transforming unstructured or weakly-typed input into strongly-typed domain objects at system boundaries. Instead of validating a string and then passing the same string through the system with the hope that it remains valid, you parse it into a type that makes invalid states unrepresentable. Once parsed, the type guarantees correctness for all downstream consumers, eliminating redundant validation and reducing the surface area for bugs. In C#, this is implemented using value objects with private constructors, factory methods, and result types.

## Basic Value Object with Factory Method

Create a value object with a private constructor and a static `TryCreate` or `Create` factory that returns a result type.

```csharp
using System.Diagnostics.CodeAnalysis;
using System.Text.RegularExpressions;

namespace MyApp.Domain.ValueObjects;

public sealed partial class EmailAddress : IEquatable<EmailAddress>
{
    private static readonly Regex Pattern = ValidEmailRegex();

    public string Value { get; }

    private EmailAddress(string value) => Value = value;

    public static bool TryCreate(string? input, [NotNullWhen(true)] out EmailAddress? result)
    {
        result = null;

        if (string.IsNullOrWhiteSpace(input) || input.Length > 254)
            return false;

        if (!Pattern.IsMatch(input))
            return false;

        result = new EmailAddress(input.Trim().ToLowerInvariant());
        return true;
    }

    public static EmailAddress Create(string input)
    {
        if (!TryCreate(input, out var email))
            throw new ArgumentException($"Invalid email address: '{input}'", nameof(input));

        return email;
    }

    public override string ToString() => Value;
    public override int GetHashCode() => Value.GetHashCode(StringComparison.Ordinal);
    public override bool Equals(object? obj) => Equals(obj as EmailAddress);
    public bool Equals(EmailAddress? other) => other is not null && Value == other.Value;

    public static implicit operator string(EmailAddress email) => email.Value;

    [GeneratedRegex(@"^[^@\s]+@[^@\s]+\.[^@\s]+$", RegexOptions.Compiled | RegexOptions.IgnoreCase)]
    private static partial Regex ValidEmailRegex();
}
```

## Result Type for Parsing Outcomes

Use a result type to propagate parse failures without exceptions, allowing callers to handle errors gracefully.

```csharp
namespace MyApp.Domain;

public readonly struct Result<T>
{
    public T? Value { get; }
    public string? Error { get; }
    public bool IsSuccess { get; }

    private Result(T value) { Value = value; IsSuccess = true; Error = null; }
    private Result(string error) { Value = default; IsSuccess = false; Error = error; }

    public static Result<T> Success(T value) => new(value);
    public static Result<T> Failure(string error) => new(error);

    public TOut Match<TOut>(Func<T, TOut> onSuccess, Func<string, TOut> onFailure)
        => IsSuccess ? onSuccess(Value!) : onFailure(Error!);
}
```

## Multiple Value Objects Composed into a Domain Model

Parse all inputs at the boundary and compose them into a domain aggregate that is guaranteed valid.

```csharp
namespace MyApp.Domain.ValueObjects;

public sealed class PhoneNumber
{
    public string Value { get; }

    private PhoneNumber(string value) => Value = value;

    public static Result<PhoneNumber> Parse(string? input)
    {
        if (string.IsNullOrWhiteSpace(input))
            return Result<PhoneNumber>.Failure("Phone number is required.");

        var digits = new string(input.Where(char.IsDigit).ToArray());

        if (digits.Length < 10 || digits.Length > 15)
            return Result<PhoneNumber>.Failure(
                $"Phone number must be 10-15 digits, got {digits.Length}.");

        return Result<PhoneNumber>.Success(new PhoneNumber(digits));
    }

    public override string ToString() => Value;
}

public sealed class NonEmptyString
{
    public string Value { get; }

    private NonEmptyString(string value) => Value = value;

    public static Result<NonEmptyString> Parse(string? input, string fieldName = "value")
    {
        if (string.IsNullOrWhiteSpace(input))
            return Result<NonEmptyString>.Failure($"{fieldName} must not be empty.");

        return Result<NonEmptyString>.Success(new NonEmptyString(input.Trim()));
    }

    public override string ToString() => Value;
    public static implicit operator string(NonEmptyString s) => s.Value;
}

public sealed class PositiveAmount
{
    public decimal Value { get; }

    private PositiveAmount(decimal value) => Value = value;

    public static Result<PositiveAmount> Parse(decimal input)
    {
        if (input <= 0)
            return Result<PositiveAmount>.Failure(
                $"Amount must be positive, got {input}.");

        return Result<PositiveAmount>.Success(new PositiveAmount(input));
    }

    public static implicit operator decimal(PositiveAmount a) => a.Value;
}
```

## Parsing at the API Boundary

Parse raw DTO input into domain value objects at the controller or endpoint level.

```csharp
using Microsoft.AspNetCore.Mvc;

namespace MyApp.Api;

public record CreateCustomerDto(
    string Name,
    string Email,
    string Phone,
    decimal CreditLimit);

public record CustomerCreated(int Id, string Name, string Email);

app.MapPost("/api/customers", (
    CreateCustomerDto dto,
    ICustomerService service) =>
{
    // Parse all fields at the boundary
    var nameResult = NonEmptyString.Parse(dto.Name, "Name");
    var emailResult = EmailAddress.TryCreate(dto.Email, out var email)
        ? Result<EmailAddress>.Success(email)
        : Result<EmailAddress>.Failure("Invalid email address.");
    var phoneResult = PhoneNumber.Parse(dto.Phone);
    var creditResult = PositiveAmount.Parse(dto.CreditLimit);

    // Collect errors
    var errors = new List<string>();
    if (!nameResult.IsSuccess) errors.Add(nameResult.Error!);
    if (!emailResult.IsSuccess) errors.Add(emailResult.Error!);
    if (!phoneResult.IsSuccess) errors.Add(phoneResult.Error!);
    if (!creditResult.IsSuccess) errors.Add(creditResult.Error!);

    if (errors.Count > 0)
    {
        return Results.BadRequest(new { Errors = errors });
    }

    // All values are parsed and guaranteed valid
    var customer = new Customer(
        name: nameResult.Value!,
        email: emailResult.Value!,
        phone: phoneResult.Value!,
        creditLimit: creditResult.Value!);

    var created = service.Create(customer);
    return Results.Created($"/api/customers/{created.Id}", created);
});
```

## Parse Don't Validate vs Validate-and-Pass

| Aspect | Parse Don't Validate | Validate-and-Pass |
|---|---|---|
| Type safety | Invariants in type system | Invariants in comments/docs |
| Re-validation needed | Never (type guarantees) | At every layer boundary |
| Invalid state possible | No (private constructor) | Yes (mutable string/int) |
| Error handling | Result type or exception | Exception or error list |
| Downstream trust | Full (type proves validity) | Trust-but-verify |
| Refactoring safety | Compiler catches misuse | Runtime failures |
| Boilerplate | More types upfront | Less types, more checks |
| Testing | Test parser once | Test every consumer |

## Best Practices

1. **Make value object constructors private and expose a `Parse`, `TryCreate`, or `Create` factory method** so that the only way to obtain an instance is through the validation path; a public constructor allows anyone to create invalid instances, defeating the purpose of the pattern.

2. **Return a `Result<T>` from `Parse` methods instead of throwing exceptions** for expected failure cases (user input, external data), because exceptions are expensive and should be reserved for unexpected programmer errors; use `Create` that throws only when invalid input represents a bug.

3. **Implement `IEquatable<T>`, override `Equals`, and override `GetHashCode` on all value objects** using the underlying value, so that two `EmailAddress` instances with the same parsed value are considered equal in collections, dictionary lookups, and LINQ operations.

4. **Parse all inputs at the system boundary (API controller, message handler, CLI parser)** and pass only parsed domain types to the service and domain layers; if a service method accepts `string email` instead of `EmailAddress email`, any caller can bypass validation.

5. **Use `implicit operator` conversions from the value object to its primitive type** (e.g., `public static implicit operator string(EmailAddress e) => e.Value;`) for read-only access, but never define an implicit conversion from primitive to value object, as that would bypass the parsing step.

6. **Create a small set of reusable generic value objects** (`NonEmptyString`, `PositiveInt`, `BoundedString<TMin, TMax>`, `PositiveAmount`) rather than creating hundreds of domain-specific types for every field; compose these building blocks to cover most validation needs.

7. **Store parsed value objects in EF Core entities using `HasConversion` in `OnModelCreating`** to map `EmailAddress.Value` to a `nvarchar` column, so the database schema uses primitive types while the C# domain model uses parsed types; this avoids losing type safety at the persistence boundary.

8. **Collect all parse errors before returning to the client** by evaluating all `Result<T>` instances and aggregating failures into a single error response, rather than failing fast on the first invalid field; users expect to see all form errors at once, not one at a time.

9. **Write unit tests that verify both the happy path and each specific rejection case** for every value object's `Parse` method (null, empty, too long, malformed, boundary values), because the parser is the single source of truth for what constitutes valid data in the entire system.

10. **Use `[NotNullWhen(true)]` and `[NotNullWhen(false)]` attributes on `TryCreate` out parameters** so that the C# nullable flow analysis knows the value is non-null when the method returns true, eliminating false null warnings in consuming code without requiring the `!` operator.
