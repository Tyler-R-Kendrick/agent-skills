---
name: curryfy
description: |
  Use when applying function currying and partial application patterns in C# to create specialized, reusable function compositions.
  USE FOR: function currying, partial application, function composition, creating specialized functions from general ones, builder-like functional APIs
  DO NOT USE FOR: full functional programming library (use language-ext), parser combinators (use pidgin or fparsec), optional value handling (use optional)
license: MIT
metadata:
  displayName: "Currying & Partial Application"
  author: "Tyler-R-Kendrick"
  version: "1.0.0"
compatibility: claude, copilot, cursor
---

# Currying & Partial Application in C#

## Overview
Currying transforms a function that takes multiple arguments into a sequence of functions, each accepting a single argument. Partial application fixes one or more arguments of a function, producing a new function with fewer parameters. While C# is not a functional-first language, these patterns are directly expressible with `Func<>` delegates and lambda expressions. The `Curryfy` NuGet package and similar libraries provide extension methods to curry standard `Func<>` delegates automatically, but the patterns can also be implemented manually for full control.

## Currying vs Partial Application

| Concept | Description | Result |
|---------|-------------|--------|
| Currying | Transforms `f(a, b, c)` into `f(a)(b)(c)` | Chain of single-argument functions |
| Partial application | Fixes some arguments of `f(a, b, c)` | New function with fewer parameters |
| Composition | Chains `f` and `g` into `g(f(x))` | Single function from two functions |

## Basic Currying
```csharp
// Traditional multi-argument function
static decimal CalculatePrice(decimal basePrice, decimal taxRate, decimal discount)
    => (basePrice * (1 + taxRate)) - discount;

// Manual currying: transform to chain of single-argument functions
static Func<decimal, Func<decimal, decimal>> CurriedPrice(decimal basePrice)
    => taxRate => discount => (basePrice * (1 + taxRate)) - discount;

// Usage
var priceWith20Tax = CurriedPrice(100m)(0.20m);
var finalPrice = priceWith20Tax(10m); // (100 * 1.20) - 10 = 110

// Generic curry extension method
public static class CurryExtensions
{
    public static Func<T1, Func<T2, TResult>> Curry<T1, T2, TResult>(
        this Func<T1, T2, TResult> func)
        => a => b => func(a, b);

    public static Func<T1, Func<T2, Func<T3, TResult>>> Curry<T1, T2, T3, TResult>(
        this Func<T1, T2, T3, TResult> func)
        => a => b => c => func(a, b, c);

    public static Func<T1, Func<T2, Func<T3, Func<T4, TResult>>>> Curry<T1, T2, T3, T4, TResult>(
        this Func<T1, T2, T3, T4, TResult> func)
        => a => b => c => d => func(a, b, c, d);
}

// Using the extension
Func<decimal, decimal, decimal, decimal> calcPrice = CalculatePrice;
var curried = calcPrice.Curry();
var withBase = curried(100m);
var withTax = withBase(0.20m);
var result = withTax(10m); // 110
```

## Partial Application
```csharp
public static class PartialExtensions
{
    // Fix first argument
    public static Func<T2, TResult> Partial<T1, T2, TResult>(
        this Func<T1, T2, TResult> func, T1 arg1)
        => arg2 => func(arg1, arg2);

    // Fix first two arguments
    public static Func<T3, TResult> Partial<T1, T2, T3, TResult>(
        this Func<T1, T2, T3, TResult> func, T1 arg1, T2 arg2)
        => arg3 => func(arg1, arg2, arg3);

    // Fix first argument of three-argument function
    public static Func<T2, T3, TResult> Partial<T1, T2, T3, TResult>(
        this Func<T1, T2, T3, TResult> func, T1 arg1)
        => (arg2, arg3) => func(arg1, arg2, arg3);
}

// Practical example: database query factory
Func<string, int, int, IEnumerable<Order>> searchOrders =
    (customerId, page, pageSize) =>
        db.Orders
            .Where(o => o.CustomerId == customerId)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToList();

// Create specialized query for a specific customer
var customerOrders = searchOrders.Partial("cust-123");
var page1 = customerOrders(1, 20);
var page2 = customerOrders(2, 20);
```

## Function Composition
```csharp
public static class ComposeExtensions
{
    // Compose: g(f(x))
    public static Func<T, TResult2> Compose<T, TResult1, TResult2>(
        this Func<TResult1, TResult2> g,
        Func<T, TResult1> f)
        => x => g(f(x));

    // Pipe: f(x) then g
    public static Func<T, TResult2> Then<T, TResult1, TResult2>(
        this Func<T, TResult1> f,
        Func<TResult1, TResult2> g)
        => x => g(f(x));
}

// Example: composing string transformations
Func<string, string> trim = s => s.Trim();
Func<string, string> toLower = s => s.ToLowerInvariant();
Func<string, string> removeSpaces = s => s.Replace(" ", "-");

var slugify = trim
    .Then(toLower)
    .Then(removeSpaces);

var slug = slugify("  Hello World  "); // "hello-world"
```

## Practical Patterns

### Configuration Builders
```csharp
// Curried configuration for creating HTTP clients
Func<string, Func<TimeSpan, Func<int, HttpClient>>> createClient =
    baseUrl => timeout => maxRetries =>
    {
        var handler = new SocketsHttpHandler
        {
            PooledConnectionLifetime = TimeSpan.FromMinutes(5)
        };
        var client = new HttpClient(handler)
        {
            BaseAddress = new Uri(baseUrl),
            Timeout = timeout
        };
        client.DefaultRequestHeaders.Add("X-Max-Retries", maxRetries.ToString());
        return client;
    };

// Partially apply environment-specific settings
var productionClient = createClient("https://api.example.com")(TimeSpan.FromSeconds(30));
var devClient = createClient("https://localhost:5001")(TimeSpan.FromSeconds(5));

// Final application
var apiClient = productionClient(3);
var testClient = devClient(0);
```

### Validation Pipelines
```csharp
Func<string, bool> notEmpty = s => !string.IsNullOrWhiteSpace(s);
Func<string, bool> maxLength100 = s => s.Length <= 100;
Func<string, bool> validEmail = s => s.Contains('@') && s.Contains('.');

// Compose validators
public static Func<T, bool> And<T>(
    this Func<T, bool> left,
    Func<T, bool> right)
    => x => left(x) && right(x);

var validateEmail = notEmpty
    .And(maxLength100)
    .And(validEmail);

var isValid = validateEmail("user@example.com"); // true
var isInvalid = validateEmail(""); // false
```

### Middleware-Like Pipelines
```csharp
// Build a processing pipeline with curried decorators
Func<Func<Order, Task<Order>>, Func<Order, Task<Order>>> withLogging =
    next => async order =>
    {
        Console.WriteLine($"Processing order {order.Id}");
        var result = await next(order);
        Console.WriteLine($"Completed order {order.Id}");
        return result;
    };

Func<Func<Order, Task<Order>>, Func<Order, Task<Order>>> withValidation =
    next => async order =>
    {
        if (order.Total <= 0)
            throw new ValidationException("Invalid total");
        return await next(order);
    };

Func<Order, Task<Order>> processOrder = async order =>
{
    order.Status = OrderStatus.Processed;
    return order;
};

// Compose the pipeline
var pipeline = withLogging(withValidation(processOrder));
var result = await pipeline(new Order { Id = 1, Total = 50m });
```

### Dependency Injection Factories
```csharp
// Use partial application to create service factories
Func<ILogger, IDbConnection, string, IOrderService> createService =
    (logger, connection, region) =>
        new OrderService(logger, connection, region);

// In DI registration, partially apply shared dependencies
builder.Services.AddScoped<IOrderService>(sp =>
{
    var logger = sp.GetRequiredService<ILogger<OrderService>>();
    var connection = sp.GetRequiredService<IDbConnection>();
    var factory = createService.Partial(logger).Partial(connection);
    return factory("us-east-1");
});
```

## Curryfy NuGet Package
```csharp
// The Curryfy package provides automatic currying for Func<> and Action<>
// Install: dotnet add package Curryfy

using Curryfy;

Func<int, int, int, int> add3 = (a, b, c) => a + b + c;

// Auto-curry
var curried = add3.Curry();      // Func<int, Func<int, Func<int, int>>>
var result = curried(1)(2)(3);   // 6

// Partial application
var add1 = add3.Partial(1);     // Func<int, int, int>
var add1and2 = add3.Partial(1, 2); // Func<int, int>
```

## Best Practices
- Use currying to create families of related functions from a single general function, fixing environment or configuration parameters early (e.g., `createLogger("orders")` returns a specialized logger).
- Prefer partial application over currying when you only need to fix one or two arguments and the remaining function still takes multiple parameters.
- Use function composition (`Then`/`Compose`) to build data transformation pipelines that are more readable than nested function calls.
- Keep curried functions focused: if a function takes more than 3-4 parameters, consider refactoring into an options record or builder pattern instead.
- Document the expected argument order in curried functions, since the first argument is fixed first and determines the specialization hierarchy.
- Use currying for middleware and decorator patterns where each layer wraps the next, creating composable processing pipelines.
- Combine currying with generic type constraints to build type-safe fluent APIs that guide the developer through required configuration steps.
- Avoid excessive currying in team codebases unfamiliar with functional patterns; provide XML documentation and named factory methods as wrappers for discoverability.
- Test curried functions at each level of application to verify that partially applied functions behave correctly with different fixed arguments.
- Use the `Curryfy` NuGet package for automatic curry/partial extension methods on standard `Func<>` delegates rather than implementing your own for every arity.
