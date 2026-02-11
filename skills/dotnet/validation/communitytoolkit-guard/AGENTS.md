# CommunityToolkit Guard

## Overview

`CommunityToolkit.Diagnostics` provides the `Guard` class, a set of static helper methods for writing concise and performant guard clauses. Guard clauses validate method arguments and invariants at the boundaries of public APIs, constructors, and factory methods. The `Guard` class throws standard .NET exceptions (`ArgumentNullException`, `ArgumentOutOfRangeException`, `ArgumentException`) with descriptive messages generated at compile time via `CallerArgumentExpression`. It is part of the .NET Community Toolkit and works with .NET Standard 2.0+, .NET 6+, and all modern .NET platforms.

## Basic Guard Clauses

Use `Guard.IsNotNull`, `Guard.IsNotNullOrEmpty`, and `Guard.IsNotNullOrWhiteSpace` for null and string validation.

```csharp
using CommunityToolkit.Diagnostics;

namespace MyApp.Domain;

public class Customer
{
    public int Id { get; }
    public string Name { get; }
    public string Email { get; }
    public int Age { get; }

    public Customer(int id, string name, string email, int age)
    {
        Guard.IsGreaterThan(id, 0);
        Guard.IsNotNullOrWhiteSpace(name);
        Guard.IsNotNullOrWhiteSpace(email);
        Guard.IsInRange(age, 18, 120);

        Id = id;
        Name = name;
        Email = email;
        Age = age;
    }
}
```

## Numeric and Collection Guards

Guard methods cover numeric ranges, collection sizes, and enum values.

```csharp
using CommunityToolkit.Diagnostics;
using System.Collections.Generic;

namespace MyApp.Services;

public class OrderService
{
    public void PlaceOrder(
        IReadOnlyList<OrderItem> items,
        decimal discount,
        int quantity)
    {
        Guard.IsNotNull(items);
        Guard.HasSizeGreaterThan(items, 0);
        Guard.HasSizeLessThanOrEqualTo(items, 100);

        Guard.IsGreaterThanOrEqualTo(discount, 0m);
        Guard.IsLessThanOrEqualTo(discount, 1m);

        Guard.IsInRange(quantity, 1, 10_000);

        // All arguments are validated, proceed with order logic
        var total = CalculateTotal(items, discount, quantity);
    }

    public void SetStatus(Order order, OrderStatus newStatus)
    {
        Guard.IsNotNull(order);
        Guard.IsDefined(newStatus);

        order.Status = newStatus;
    }

    private decimal CalculateTotal(
        IReadOnlyList<OrderItem> items, decimal discount, int quantity)
    {
        var subtotal = items.Sum(i => i.Price * i.Quantity);
        return subtotal * (1 - discount);
    }
}

public enum OrderStatus { Pending, Processing, Shipped, Delivered, Cancelled }
public record OrderItem(string Name, decimal Price, int Quantity);
public class Order { public OrderStatus Status { get; set; } }
```

## Guard Clauses in Value Objects and Domain Types

Combine guards with private constructors to enforce invariants on domain value types.

```csharp
using CommunityToolkit.Diagnostics;
using System.Text.RegularExpressions;

namespace MyApp.Domain.ValueObjects;

public sealed partial class EmailAddress
{
    private static readonly Regex EmailPattern = EmailRegex();

    public string Value { get; }

    private EmailAddress(string value) => Value = value;

    public static EmailAddress Create(string value)
    {
        Guard.IsNotNullOrWhiteSpace(value);
        Guard.HasSizeLessThanOrEqualTo(value, 254);

        if (!EmailPattern.IsMatch(value))
        {
            ThrowHelper.ThrowArgumentException(nameof(value),
                $"'{value}' is not a valid email address.");
        }

        return new EmailAddress(value.ToLowerInvariant());
    }

    public override string ToString() => Value;

    [GeneratedRegex(@"^[^@\s]+@[^@\s]+\.[^@\s]+$", RegexOptions.Compiled)]
    private static partial Regex EmailRegex();
}

public readonly struct Money
{
    public decimal Amount { get; }
    public string Currency { get; }

    public Money(decimal amount, string currency)
    {
        Guard.IsGreaterThanOrEqualTo(amount, 0m);
        Guard.IsNotNullOrWhiteSpace(currency);
        Guard.HasSizeEqualTo(currency, 3);

        Amount = amount;
        Currency = currency.ToUpperInvariant();
    }

    public static Money USD(decimal amount) => new(amount, "USD");
    public static Money EUR(decimal amount) => new(amount, "EUR");

    public override string ToString() => $"{Amount:F2} {Currency}";
}
```

## ThrowHelper for Custom Validation Logic

When `Guard` does not provide a built-in method, use `ThrowHelper` for consistent exception formatting.

```csharp
using CommunityToolkit.Diagnostics;

namespace MyApp.Services;

public class UserService
{
    private readonly IUserRepository _repository;

    public UserService(IUserRepository repository)
    {
        Guard.IsNotNull(repository);
        _repository = repository;
    }

    public async Task<User> GetUserAsync(int id)
    {
        Guard.IsGreaterThan(id, 0);

        var user = await _repository.FindByIdAsync(id);

        if (user is null)
        {
            ThrowHelper.ThrowInvalidOperationException(
                $"User with ID {id} was not found.");
        }

        return user;
    }

    public async Task UpdatePasswordAsync(int userId, string currentPassword, string newPassword)
    {
        Guard.IsGreaterThan(userId, 0);
        Guard.IsNotNullOrWhiteSpace(currentPassword);
        Guard.IsNotNullOrWhiteSpace(newPassword);
        Guard.HasSizeGreaterThanOrEqualTo(newPassword, 8);
        Guard.HasSizeLessThanOrEqualTo(newPassword, 128);

        if (currentPassword == newPassword)
        {
            ThrowHelper.ThrowArgumentException(nameof(newPassword),
                "New password must differ from the current password.");
        }

        await _repository.UpdatePasswordAsync(userId, newPassword);
    }
}
```

## Guard vs Other Validation Approaches

| Feature | CommunityToolkit Guard | Manual if/throw | FluentValidation | Code Contracts |
|---|---|---|---|---|
| Use case | Argument preconditions | Argument preconditions | Business rules, forms | Design-by-contract |
| Exception type | Standard .NET exceptions | Custom | `ValidationException` | `ContractException` |
| Error messages | Auto-generated (CallerArgumentExpression) | Manual | Fluent builder | Requires rewriter |
| Performance | Zero allocation | Varies | Allocates result objects | Compile-time |
| Discoverability | Static methods, IntelliSense | None | Fluent chain | Attributes |
| NuGet package | CommunityToolkit.Diagnostics | None (built-in) | FluentValidation | System.Diagnostics.Contracts |

## Best Practices

1. **Place guard clauses at the top of public and protected methods, before any logic** so that invalid arguments are rejected immediately with descriptive exceptions; never scatter guards throughout the method body where they can be skipped or overlooked during code review.

2. **Use `Guard.IsNotNullOrWhiteSpace` instead of `Guard.IsNotNull` for string parameters** because a non-null empty or whitespace-only string almost always represents an invalid input; `IsNotNull` alone lets `""` and `"   "` pass through, causing downstream errors in database queries or API calls.

3. **Prefer `Guard.IsInRange(value, min, max)` over separate `IsGreaterThan` and `IsLessThan` calls** when both bounds are known, because `IsInRange` performs both checks atomically and generates a single clear exception message including the expected range, reducing debugging time.

4. **Combine guards with private constructors on value objects** (e.g., `EmailAddress.Create(string)`) so that the type system guarantees all instances are valid; this moves validation to the creation boundary and eliminates the need to re-validate the same data in every consuming method.

5. **Use `Guard.IsDefined(enumValue)` on every public method that accepts an enum parameter** because C# allows casting arbitrary integers to enum types; without `IsDefined`, a caller can pass `(OrderStatus)999` and bypass switch expressions or pattern matches that assume valid values.

6. **Use `Guard.HasSizeGreaterThan(collection, 0)` instead of checking `.Count > 0` manually and throwing** because the Guard method generates a standardized exception message that includes the collection name (via `CallerArgumentExpression`) and the expected size constraint.

7. **Do not use Guard for business-rule validation that should return error messages to users** (e.g., "Password must contain a special character"); Guard throws exceptions that terminate the call stack, which is appropriate for programming errors but not for user input validation that should be handled with result objects or FluentValidation.

8. **Use `ThrowHelper.ThrowArgumentException(nameof(param), message)` for custom validation logic** that Guard does not cover (regex matching, cross-parameter checks), keeping the exception type and message format consistent with the auto-generated Guard exceptions.

9. **Apply `Guard.IsNotNull` on injected dependencies in constructor bodies rather than relying on nullable reference type warnings** because NRT is a compile-time-only check that does not prevent null at runtime; third-party callers, reflection-based DI containers, and serializers can still pass null.

10. **Avoid wrapping Guard calls in try-catch blocks in the same method** because `ArgumentNullException` and `ArgumentOutOfRangeException` are not recoverable errors -- they indicate a bug in the calling code; catching them masks the root cause and produces confusing behavior in production.
