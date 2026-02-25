---
name: parse-dont-validate
description: Guidance for "Parse, don't validate" pattern and dependent type theory concepts in C#. Use when creating type-safe domain models.
license: MIT
metadata:
  displayName: "Parse, Don't Validate"
  author: "Tyler-R-Kendrick"
---

# Parse, Don't Validate

## Overview
"Parse, don't validate" is a design principle where types are constructed to only represent valid states, eliminating the need for validation checks throughout the codebase.

## Core Concept

**Validation**: Check if data is valid and return a boolean or throw exception.
**Parsing**: Transform data into a type that can only represent valid values.

```csharp
// Validation approach (bad)
public bool IsValidEmail(string email)
{
    return email.Contains("@") && email.Contains(".");
}

public void SendEmail(string email)
{
    if (!IsValidEmail(email))
        throw new ArgumentException("Invalid email");
    
    // Send email
}

// Parse approach (good)
public readonly record struct Email
{
    private readonly string _value;
    
    private Email(string value)
    {
        _value = value;
    }
    
    public static Result<Email, string> Parse(string value)
    {
        if (string.IsNullOrWhiteSpace(value))
            return Result.Failure<Email, string>("Email cannot be empty");
        
        if (!value.Contains("@") || !value.Contains("."))
            return Result.Failure<Email, string>("Invalid email format");
        
        return Result.Success<Email, string>(new Email(value));
    }
    
    public static implicit operator string(Email email) => email._value;
}

// Now SendEmail accepts only valid emails
public void SendEmail(Email email)
{
    // No validation needed - email is guaranteed valid
}
```

## Benefits

1. **Type Safety**: Invalid values can't be constructed
2. **No Repeated Validation**: Validation happens once at the boundary
3. **Self-Documenting**: Type signature shows requirements
4. **Compile-Time Guarantees**: Type system enforces correctness

## Value Object Pattern

Create types that represent domain concepts.

```csharp
using System.Diagnostics;
using System.Diagnostics.CodeAnalysis;
using CommunityToolkit.Diagnostics;

[DebuggerDisplay("{Value}")]
public readonly record struct NonEmptyString
{
    public string Value { get; }
    
    private NonEmptyString(string value)
    {
        Value = Guard.IsNotNullOrWhiteSpace(value);
    }
    
    public static NonEmptyString Parse(string value) => new(value);
    
    public static bool TryParse(
        [NotNullWhen(true)] string? value,
        [NotNullWhen(true)] out NonEmptyString result)
    {
        if (string.IsNullOrWhiteSpace(value))
        {
            result = default;
            return false;
        }
        
        result = new NonEmptyString(value);
        return true;
    }
    
    public static implicit operator string(NonEmptyString value) => value.Value;
    public static explicit operator NonEmptyString(string value) => Parse(value);
    
    public override string ToString() => Value;
}
```

## Numeric Constraints

```csharp
public readonly record struct PositiveInt
{
    public int Value { get; }
    
    private PositiveInt(int value)
    {
        if (value <= 0)
            throw new ArgumentException("Value must be positive", nameof(value));
        
        Value = value;
    }
    
    public static Result<PositiveInt, string> Parse(int value)
    {
        return value > 0
            ? Result.Success<PositiveInt, string>(new PositiveInt(value))
            : Result.Failure<PositiveInt, string>("Value must be positive");
    }
    
    public static implicit operator int(PositiveInt value) => value.Value;
}

public readonly record struct Percentage
{
    public decimal Value { get; }
    
    private Percentage(decimal value)
    {
        Value = value;
    }
    
    public static Result<Percentage, string> Parse(decimal value)
    {
        if (value < 0m || value > 100m)
            return Result.Failure<Percentage, string>("Percentage must be between 0 and 100");
        
        return Result.Success<Percentage, string>(new Percentage(value));
    }
}
```

## Domain-Specific Types

```csharp
// Order ID that can't be empty
public readonly record struct OrderId
{
    public Guid Value { get; }
    
    private OrderId(Guid value)
    {
        if (value == Guid.Empty)
            throw new ArgumentException("OrderId cannot be empty");
        
        Value = value;
    }
    
    public static OrderId New() => new(Guid.NewGuid());
    
    public static OrderId Parse(Guid value) => new(value);
    
    public static implicit operator Guid(OrderId id) => id.Value;
}

// Price that must be non-negative
public readonly record struct Price
{
    public decimal Value { get; }
    
    private Price(decimal value)
    {
        Value = value;
    }
    
    public static Result<Price, string> Parse(decimal value)
    {
        return value >= 0
            ? Result.Success<Price, string>(new Price(value))
            : Result.Failure<Price, string>("Price cannot be negative");
    }
    
    public static Price operator +(Price a, Price b) => new(a.Value + b.Value);
    public static Price operator *(Price price, decimal multiplier) => new(price.Value * multiplier);
}
```

## Constrained Collections

```csharp
public sealed class NonEmptyList<T>
{
    private readonly List<T> _items;
    
    public T Head => _items[0];
    public IReadOnlyList<T> Tail => _items.Skip(1).ToList();
    public int Count => _items.Count;
    
    private NonEmptyList(IEnumerable<T> items)
    {
        _items = items.ToList();
    }
    
    public static Result<NonEmptyList<T>, string> Create(IEnumerable<T> items)
    {
        var list = items.ToList();
        return list.Count > 0
            ? Result.Success<NonEmptyList<T>, string>(new NonEmptyList<T>(list))
            : Result.Failure<NonEmptyList<T>, string>("List cannot be empty");
    }
    
    public IEnumerator<T> GetEnumerator() => _items.GetEnumerator();
}
```

## API Boundaries

Parse at the boundary, use typed values internally.

```csharp
public class OrderController : ControllerBase
{
    [HttpPost]
    public IActionResult CreateOrder([FromBody] CreateOrderRequest request)
    {
        // Parse at the boundary
        var customerId = NonEmptyString.TryParse(request.CustomerId, out var cId)
            ? cId
            : return BadRequest("Invalid customer ID");
        
        var items = request.Items
            .Select(i => OrderItem.Parse(i.ProductId, i.Quantity))
            .ToList();
        
        if (items.Any(i => i.IsFailure))
            return BadRequest("Invalid order items");
        
        // Domain layer receives only valid types
        var order = _orderService.CreateOrder(customerId, items.Select(i => i.Value));
        
        return Ok(order);
    }
}
```

## Smart Constructors

Private constructor, public factory method.

```csharp
public sealed class Username
{
    public string Value { get; }
    
    private Username(string value)
    {
        Value = value;
    }
    
    public static Result<Username, string> Create(string value)
    {
        if (string.IsNullOrWhiteSpace(value))
            return Result.Failure<Username, string>("Username cannot be empty");
        
        if (value.Length < 3)
            return Result.Failure<Username, string>("Username must be at least 3 characters");
        
        if (value.Length > 20)
            return Result.Failure<Username, string>("Username cannot exceed 20 characters");
        
        if (!value.All(c => char.IsLetterOrDigit(c) || c == '_'))
            return Result.Failure<Username, string>("Username can only contain letters, digits, and underscores");
        
        return Result.Success<Username, string>(new Username(value));
    }
}
```

## Dependent Types Simulation

Types that depend on values (limited in C#).

```csharp
// Vector with compile-time length (using generics)
public readonly struct Vector<TLength> where TLength : struct
{
    private readonly double[] _values;
    
    private Vector(double[] values)
    {
        _values = values;
    }
    
    public static Vector<TLength> Create(params double[] values)
    {
        var length = default(TLength) switch
        {
            Two => 2,
            Three => 3,
            _ => throw new NotSupportedException()
        };
        
        if (values.Length != length)
            throw new ArgumentException($"Expected {length} values");
        
        return new Vector<TLength>(values);
    }
}

public readonly struct Two { }
public readonly struct Three { }

// Usage
var vec2 = Vector<Two>.Create(1.0, 2.0);
var vec3 = Vector<Three>.Create(1.0, 2.0, 3.0);
// var invalid = Vector<Two>.Create(1.0, 2.0, 3.0); // Throws
```

## Result Type for Parsing

```csharp
public readonly struct Result<TSuccess, TError>
{
    private readonly TSuccess? _success;
    private readonly TError? _error;
    private readonly bool _isSuccess;
    
    private Result(TSuccess success)
    {
        _success = success;
        _error = default;
        _isSuccess = true;
    }
    
    private Result(TError error)
    {
        _success = default;
        _error = error;
        _isSuccess = false;
    }
    
    public static Result<TSuccess, TError> Success(TSuccess value) => new(value);
    public static Result<TSuccess, TError> Failure(TError error) => new(error);
    
    public bool IsSuccess => _isSuccess;
    public bool IsFailure => !_isSuccess;
    
    public TSuccess Value => _isSuccess ? _success! : throw new InvalidOperationException("No value");
    public TError Error => !_isSuccess ? _error! : throw new InvalidOperationException("No error");
    
    public TResult Match<TResult>(
        Func<TSuccess, TResult> success,
        Func<TError, TResult> failure)
        => _isSuccess ? success(_success!) : failure(_error!);
}
```

## Guidance

- Parse inputs at system boundaries (API controllers, CLI parsers, file readers).
- Use private constructors with public factory methods for smart constructors.
- Return Result or Option types from parsing functions.
- Make invalid states unrepresentable through types.
- Use guard clauses only inside type constructors/factories, not at call sites.
- Prefer CommunityToolkit.Diagnostics.Guard for throwing guards.
- Use readonly record struct for immutable value objects.
- Implement implicit/explicit operators for convenient conversion.
- Add DebuggerDisplay for better debugging experience.
- Use NotNullWhen attribute for TryParse patterns.
- Prefer language-ext or similar library for Result/Option if not building your own.
