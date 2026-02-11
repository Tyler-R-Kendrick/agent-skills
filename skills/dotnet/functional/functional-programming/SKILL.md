---
name: functional-programming
description: |
  Use when applying functional programming patterns and principles in C# including immutability, pure functions, higher-order functions, and monadic patterns.
  USE FOR: functional programming concepts in C#, immutability patterns, pure functions, LINQ as functional operations, pattern matching, monadic error handling, higher-order functions
  DO NOT USE FOR: F# language specifics (use fsharp), specific FP library APIs (use language-ext), parser combinators (use pidgin or fparsec)
license: MIT
metadata:
  displayName: "Functional Programming in C#"
  author: "Tyler-R-Kendrick"
  version: "1.0.0"
compatibility: claude, copilot, cursor
references:
  - title: "C# Functional Programming Documentation on Microsoft Learn"
    url: "https://learn.microsoft.com/dotnet/csharp/fundamentals/functional/pattern-matching"
  - title: "C# Language Reference on Microsoft Learn"
    url: "https://learn.microsoft.com/dotnet/csharp/"
---

# Functional Programming in C#

## Overview
Functional programming (FP) is a paradigm that emphasizes immutability, pure functions, first-class functions, and declarative data transformations. While C# is a multi-paradigm language, modern C# (10+) provides strong support for functional patterns through records, pattern matching, LINQ, lambda expressions, and tuples. Applying FP principles reduces side effects, improves testability, makes concurrency safer, and leads to more composable code.

## Core Principles

| Principle | Description | C# Feature |
|-----------|-------------|------------|
| Immutability | Data does not change after creation | `record`, `readonly`, `init` |
| Pure functions | Same input always produces same output, no side effects | Static methods, expression-bodied members |
| First-class functions | Functions as values, passed as arguments | `Func<>`, `Action<>`, lambda expressions |
| Higher-order functions | Functions that take or return functions | LINQ methods, custom combinators |
| Composition | Building complex operations from simple ones | Extension methods, LINQ chaining |
| Declarative style | Express *what* to compute, not *how* | LINQ, pattern matching |

## Immutability
```csharp
// Records: immutable by default with value equality
public record Address(string Street, string City, string Zip);

public record Customer(
    Guid Id,
    string Name,
    string Email,
    Address Address,
    IReadOnlyList<Guid> OrderIds);

// Non-destructive mutation via `with`
var customer = new Customer(
    Guid.NewGuid(), "Alice", "alice@example.com",
    new Address("123 Main St", "Springfield", "62701"),
    Array.Empty<Guid>());

var updated = customer with { Email = "alice@newdomain.com" };
// `customer` is unchanged; `updated` has the new email

// Immutable collections
using System.Collections.Immutable;

var items = ImmutableList.Create("a", "b", "c");
var withD = items.Add("d"); // items is unchanged
```

## Pure Functions
```csharp
// Pure: depends only on input, produces no side effects
public static decimal CalculateTax(decimal amount, decimal rate)
    => amount * rate;

public static decimal ApplyDiscount(decimal amount, decimal discountPercent)
    => amount * (1 - discountPercent / 100m);

// Composition of pure functions
public static decimal CalculateTotal(decimal subtotal, decimal taxRate, decimal discount)
    => ApplyDiscount(subtotal, discount)
        |> (discounted => discounted + CalculateTax(discounted, taxRate));

// In practice, use method chaining or local functions
public static decimal CalculateTotal2(decimal subtotal, decimal taxRate, decimal discount)
{
    var discounted = ApplyDiscount(subtotal, discount);
    var tax = CalculateTax(discounted, taxRate);
    return discounted + tax;
}
```

## Higher-Order Functions
```csharp
// Functions that take functions as arguments
public static IEnumerable<T> FilterBy<T>(
    IEnumerable<T> source,
    Func<T, bool> predicate)
    => source.Where(predicate);

public static IEnumerable<TResult> TransformAll<T, TResult>(
    IEnumerable<T> source,
    Func<T, TResult> transform)
    => source.Select(transform);

// Functions that return functions
public static Func<T, bool> CombineFilters<T>(
    params Func<T, bool>[] predicates)
    => item => predicates.All(p => p(item));

// Usage
var isAdult = (Customer c) => c.Age >= 18;
var isActive = (Customer c) => c.IsActive;
var hasOrders = (Customer c) => c.OrderIds.Count > 0;

var filter = CombineFilters(isAdult, isActive, hasOrders);
var eligible = customers.Where(filter).ToList();
```

## Pattern Matching
```csharp
// Switch expressions
public static string DescribeShape(Shape shape) => shape switch
{
    Circle { Radius: 0 } => "Point",
    Circle { Radius: var r } => $"Circle with radius {r}",
    Rectangle { Width: var w, Height: var h } when w == h => $"Square {w}x{h}",
    Rectangle { Width: var w, Height: var h } => $"Rectangle {w}x{h}",
    Triangle { Base: var b, Height: var h } => $"Triangle base={b} height={h}",
    _ => "Unknown shape"
};

// List patterns (C# 11+)
public static string DescribeList(int[] items) => items switch
{
    [] => "Empty",
    [var single] => $"Single: {single}",
    [var first, .., var last] => $"First: {first}, Last: {last}",
};

// Type patterns with guards
public static decimal CalculateShipping(Order order) => order switch
{
    { Total: >= 100m } => 0m,                    // free shipping
    { Items.Count: <= 2, Weight: < 1.0 } => 5m, // small order
    { IsExpedited: true } => 15m,                 // expedited
    _ => 10m                                       // standard
};
```

## Result/Either Pattern
```csharp
// A discriminated union for success/failure
public abstract record Result<T>
{
    public sealed record Ok(T Value) : Result<T>;
    public sealed record Error(string Message) : Result<T>;

    public TResult Match<TResult>(Func<T, TResult> ok, Func<string, TResult> error) =>
        this switch
        {
            Ok(var v) => ok(v),
            Error(var m) => error(m),
            _ => throw new InvalidOperationException()
        };

    public Result<TResult> Map<TResult>(Func<T, TResult> f) =>
        this switch
        {
            Ok(var v) => new Result<TResult>.Ok(f(v)),
            Error(var m) => new Result<TResult>.Error(m),
            _ => throw new InvalidOperationException()
        };

    public Result<TResult> Bind<TResult>(Func<T, Result<TResult>> f) =>
        this switch
        {
            Ok(var v) => f(v),
            Error(var m) => new Result<TResult>.Error(m),
            _ => throw new InvalidOperationException()
        };
}

// Usage
public static Result<Customer> ValidateCustomer(CreateCustomerRequest request)
{
    if (string.IsNullOrWhiteSpace(request.Name))
        return new Result<Customer>.Error("Name is required");
    if (!request.Email.Contains('@'))
        return new Result<Customer>.Error("Invalid email");

    return new Result<Customer>.Ok(new Customer(
        Guid.NewGuid(), request.Name, request.Email));
}

var result = ValidateCustomer(request)
    .Map(c => c with { Name = c.Name.Trim() })
    .Bind(c => SaveToDatabase(c))
    .Match(
        ok: c => Results.Created($"/customers/{c.Id}", c),
        error: msg => Results.BadRequest(msg));
```

## LINQ as Functional Operations
```csharp
// LINQ methods are higher-order functions: map, filter, reduce, flatMap

// Map
var names = customers.Select(c => c.Name);

// Filter
var active = customers.Where(c => c.IsActive);

// Reduce (fold)
var totalRevenue = orders.Aggregate(0m, (sum, order) => sum + order.Total);

// FlatMap (SelectMany = monadic bind)
var allItems = orders.SelectMany(o => o.Items);

// Composing a pipeline
var report = orders
    .Where(o => o.Status == OrderStatus.Completed)
    .GroupBy(o => o.CustomerId)
    .Select(g => new
    {
        CustomerId = g.Key,
        OrderCount = g.Count(),
        TotalSpent = g.Sum(o => o.Total),
        AverageOrder = g.Average(o => o.Total)
    })
    .OrderByDescending(r => r.TotalSpent)
    .Take(10)
    .ToList();
```

## Option Pattern
```csharp
// Lightweight Option without external library
public readonly struct Option<T>
{
    private readonly T _value;
    private readonly bool _hasValue;

    private Option(T value) { _value = value; _hasValue = true; }

    public static Option<T> Some(T value) => new(value);
    public static Option<T> None => default;

    public TResult Match<TResult>(Func<T, TResult> some, Func<TResult> none)
        => _hasValue ? some(_value) : none();

    public Option<TResult> Map<TResult>(Func<T, TResult> f)
        => _hasValue ? Option<TResult>.Some(f(_value)) : Option<TResult>.None;

    public Option<TResult> Bind<TResult>(Func<T, Option<TResult>> f)
        => _hasValue ? f(_value) : Option<TResult>.None;
}

// Usage
public static Option<Customer> FindCustomer(Guid id) =>
    customers.TryGetValue(id, out var customer)
        ? Option<Customer>.Some(customer)
        : Option<Customer>.None;

var greeting = FindCustomer(id)
    .Map(c => c.Name)
    .Match(
        some: name => $"Hello, {name}!",
        none: () => "Customer not found");
```

## Functional Error Handling Pipeline
```csharp
// Chain validation steps functionally
public static Result<Order> ProcessOrder(CreateOrderRequest request) =>
    ValidateItems(request.Items)
        .Bind(items => ValidateCustomer(request.CustomerId)
            .Map(customer => (customer, items)))
        .Bind(tuple => CalculateTotal(tuple.items)
            .Map(total => new Order(
                Guid.NewGuid(),
                tuple.customer.Id,
                tuple.items,
                total)))
        .Bind(order => SaveOrder(order));

// Each step returns Result<T>, errors short-circuit the chain
static Result<List<OrderItem>> ValidateItems(List<OrderItemDto> items) =>
    items.Count == 0
        ? new Result<List<OrderItem>>.Error("Order must have at least one item")
        : new Result<List<OrderItem>>.Ok(items.Select(i => i.ToModel()).ToList());
```

## Best Practices
- Use C# `record` types for domain models to get immutability, value equality, and `with` expressions for non-destructive updates.
- Write pure functions wherever possible: functions that depend only on their parameters and produce no side effects are trivially testable and safe for concurrent use.
- Use LINQ methods (`Select`, `Where`, `Aggregate`, `SelectMany`) as the standard vocabulary for functional data transformations rather than writing imperative loops.
- Implement `Result<T>` or use a library like language-ext for error handling that forces callers to handle both success and failure paths explicitly.
- Use pattern matching (`switch` expressions) with exhaustive cases to handle discriminated types, ensuring the compiler warns when a case is missing.
- Prefer expression-bodied members (`=>`) for small pure functions to communicate that the method is a simple computation with no side effects.
- Separate pure business logic (easily testable) from impure I/O operations (database, HTTP, file system) at architectural boundaries.
- Use `IReadOnlyList<T>`, `IReadOnlyDictionary<K,V>`, and `ImmutableList<T>` to prevent mutation of collections passed between functions.
- Compose small, focused functions into pipelines rather than writing large methods that perform multiple unrelated transformations.
- Use `Option<T>` instead of null returns for methods that may not produce a value, making the absence of a value explicit in the type signature.
