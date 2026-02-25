---
name: functional-programming-cheatsheet
description: Guidance for functional programming patterns in C# and .NET. Use when working with functional programming concepts.
license: MIT
metadata:
  displayName: "Functional Programming Cheatsheet"
  author: "Tyler-R-Kendrick"
---

# Functional Programming Cheatsheet

## Overview
Functional programming (FP) emphasizes immutability, pure functions, and composition. C# supports many FP patterns natively.

## Core Principles

- **Immutability**: Data structures don't change after creation.
- **Pure functions**: Same input always produces same output, no side effects.
- **First-class functions**: Functions are values that can be passed around.
- **Composition**: Build complex behavior by combining simple functions.
- **Referential transparency**: Expressions can be replaced by their values.

## Immutability

Use `record` types and `init` properties for immutable data.

```csharp
public record Person(string Name, int Age);

public class Settings
{
    public required string Host { get; init; }
    public required int Port { get; init; }
}
```

Use `ImmutableList`, `ImmutableDictionary`, etc. for collections.

```csharp
using System.Collections.Immutable;

var list = ImmutableList.Create(1, 2, 3);
var newList = list.Add(4); // Returns new list, original unchanged
```

## Pure Functions

Functions without side effects, relying only on inputs.

```csharp
// Pure
public int Add(int a, int b) => a + b;

// Impure (has side effect)
private int _counter = 0;
public int IncrementCounter() => ++_counter;
```

## Higher-Order Functions

Functions that take or return other functions.

```csharp
public Func<int, int> CreateMultiplier(int factor)
{
    return x => x * factor;
}

var double = CreateMultiplier(2);
var result = double(5); // 10
```

## Function Composition

Combine functions to create new behavior.

```csharp
public static Func<T, TResult> Compose<T, TMiddle, TResult>(
    Func<T, TMiddle> f,
    Func<TMiddle, TResult> g)
{
    return x => g(f(x));
}

Func<int, int> addOne = x => x + 1;
Func<int, int> multiplyByTwo = x => x * 2;

var composed = Compose(addOne, multiplyByTwo);
var result = composed(5); // (5 + 1) * 2 = 12
```

## Currying and Partial Application

Transform multi-parameter functions into sequences of single-parameter functions.

```csharp
// Manual currying
public static Func<int, Func<int, int>> Add => x => y => x + y;

var add5 = Add(5);
var result = add5(3); // 8

// Partial application
public static Func<int, int> PartialAdd(int x)
{
    return y => x + y;
}
```

## Option/Maybe Pattern

Represent absence of value without null.

```csharp
public readonly struct Option<T>
{
    private readonly T _value;
    private readonly bool _hasValue;
    
    private Option(T value)
    {
        _value = value;
        _hasValue = true;
    }
    
    public static Option<T> Some(T value) => new(value);
    public static Option<T> None => default;
    
    public TResult Match<TResult>(Func<T, TResult> some, Func<TResult> none)
        => _hasValue ? some(_value) : none();
}

// Usage
Option<int> GetValue(bool condition) 
    => condition ? Option<int>.Some(42) : Option<int>.None;

var result = GetValue(true).Match(
    some: value => $"Got {value}",
    none: () => "No value"
);
```

## Either/Result Pattern

Represent success or failure without exceptions.

```csharp
public readonly struct Result<TSuccess, TError>
{
    private readonly TSuccess _success;
    private readonly TError _error;
    private readonly bool _isSuccess;
    
    private Result(TSuccess success)
    {
        _success = success;
        _error = default!;
        _isSuccess = true;
    }
    
    private Result(TError error)
    {
        _success = default!;
        _error = error;
        _isSuccess = false;
    }
    
    public static Result<TSuccess, TError> Success(TSuccess value) => new(value);
    public static Result<TSuccess, TError> Failure(TError error) => new(error);
    
    public TResult Match<TResult>(
        Func<TSuccess, TResult> success,
        Func<TError, TResult> failure)
        => _isSuccess ? success(_success) : failure(_error);
}

// Usage
Result<int, string> Divide(int a, int b)
    => b == 0 
        ? Result<int, string>.Failure("Division by zero")
        : Result<int, string>.Success(a / b);

var message = Divide(10, 2).Match(
    success: value => $"Result: {value}",
    failure: error => $"Error: {error}"
);
```

## LINQ as Functional Composition

LINQ provides functional patterns for collections.

```csharp
var result = numbers
    .Where(x => x > 0)
    .Select(x => x * 2)
    .OrderBy(x => x)
    .Take(10)
    .ToList();
```

## Monadic Bind (SelectMany)

Chain operations that return wrapped values.

```csharp
public static Option<TResult> Bind<T, TResult>(
    this Option<T> option,
    Func<T, Option<TResult>> binder)
{
    return option.Match(
        some: binder,
        none: () => Option<TResult>.None
    );
}

// Usage
var result = GetUserId()
    .Bind(id => GetUser(id))
    .Bind(user => GetUserEmail(user))
    .Match(
        some: email => $"Email: {email}",
        none: () => "No email found"
    );
```

## Pattern Matching

Functional-style branching.

```csharp
public string Describe(object value) => value switch
{
    null => "null",
    int i when i > 0 => "positive integer",
    int i when i < 0 => "negative integer",
    int => "zero",
    string s => $"string of length {s.Length}",
    _ => "unknown"
};
```

## Recursion

Solve problems by breaking them into smaller instances.

```csharp
// Tail recursion (optimizable)
public int Factorial(int n, int accumulator = 1)
{
    return n <= 1 ? accumulator : Factorial(n - 1, n * accumulator);
}

// List recursion
public int Sum(IEnumerable<int> numbers)
{
    if (!numbers.Any()) return 0;
    return numbers.First() + Sum(numbers.Skip(1));
}
```

## Lazy Evaluation

Defer computation until needed.

```csharp
public static IEnumerable<int> InfiniteSequence()
{
    int i = 0;
    while (true)
    {
        yield return i++;
    }
}

var firstTen = InfiniteSequence().Take(10).ToList();
```

## Discriminated Unions (with records)

Type-safe alternatives.

```csharp
public abstract record Shape;
public record Circle(double Radius) : Shape;
public record Rectangle(double Width, double Height) : Shape;

public double CalculateArea(Shape shape) => shape switch
{
    Circle c => Math.PI * c.Radius * c.Radius,
    Rectangle r => r.Width * r.Height,
    _ => throw new NotSupportedException()
};
```

## Guidance

- Prefer `record` types for immutable data structures.
- Use LINQ for functional collection operations.
- Consider Option/Result types instead of null/exceptions for expected failures.
- Use pattern matching for complex conditional logic.
- Avoid mutable state when possible; use functional updates instead.
- Use higher-order functions for reusable behavior.
- Prefer pure functions for testability and reasoning.
- Use libraries like `language-ext` for advanced functional patterns.
- Leverage `ImmutableCollections` for thread-safe, immutable data.
