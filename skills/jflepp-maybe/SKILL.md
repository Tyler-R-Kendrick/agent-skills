---
name: jflepp-maybe
description: Guidance for using Jflepp.Maybe library for optional value handling in C#. Use when working with Jflepp.Maybe.
license: MIT
metadata:
  displayName: "Jflepp.Maybe"
  author: "Tyler-R-Kendrick"
---

# Jflepp.Maybe

## Overview
Jflepp.Maybe (also known as just "Maybe") is a lightweight library for representing optional values in C#, providing a type-safe alternative to null.

Package: `Jflepp.Maybe`

## Installation

```bash
dotnet add package Jflepp.Maybe
```

## Creating Maybe Values

```csharp
using Jflepp;

// With value
Maybe<int> some = Maybe.From(42);

// Without value
Maybe<int> none = Maybe<int>.Nothing;

// From nullable
int? nullable = 5;
Maybe<int> fromNullable = nullable.ToMaybe();

int? nullValue = null;
Maybe<int> fromNull = nullValue.ToMaybe(); // Nothing
```

## Checking for Values

```csharp
using Jflepp;

Maybe<int> maybe = Maybe.From(42);

if (maybe.HasValue)
{
    int value = maybe.Value;
    Console.WriteLine($"Value: {value}");
}

// Or use HasNoValue
if (maybe.HasNoValue)
{
    Console.WriteLine("No value");
}
```

## Extracting Values

```csharp
using Jflepp;

Maybe<int> some = Maybe.From(42);
Maybe<int> nothing = Maybe<int>.Nothing;

// GetOrDefault
int value1 = some.GetOrDefault(0); // 42
int value2 = nothing.GetOrDefault(0); // 0

// GetOrElse with lazy evaluation
int value3 = nothing.GetOrElse(() => ExpensiveDefault());

// Value property (throws if Nothing)
int value4 = some.Value; // 42
// int value5 = nothing.Value; // throws InvalidOperationException
```

## Transformations

### Select (Map)

Transform the value if present.

```csharp
using Jflepp;

Maybe<int> maybe = Maybe.From(5);
Maybe<int> doubled = maybe.Select(x => x * 2); // Maybe.From(10)

Maybe<int> nothing = Maybe<int>.Nothing;
Maybe<int> stillNothing = nothing.Select(x => x * 2); // Nothing
```

### SelectMany (Bind/FlatMap)

Chain operations that return Maybe.

```csharp
using Jflepp;

Maybe<User> GetUser(int id) => Maybe.From(new User { Id = id });
Maybe<Order> GetOrder(User user) => Maybe.From(new Order { UserId = user.Id });

var order = Maybe.From(1)
    .SelectMany(GetUser)
    .SelectMany(GetOrder);
```

### Where (Filter)

Keep value only if predicate is true.

```csharp
using Jflepp;

Maybe<int> maybe = Maybe.From(42);
Maybe<int> filtered = maybe.Where(x => x > 40); // Maybe.From(42)

Maybe<int> removed = maybe.Where(x => x < 40); // Nothing
```

## Do/Else Pattern

Execute actions based on presence of value.

```csharp
using Jflepp;

Maybe<int> maybe = Maybe.From(42);

maybe.Do(value => Console.WriteLine($"Value: {value}"))
     .Else(() => Console.WriteLine("No value"));

// Only Do
maybe.Do(value => ProcessValue(value));

// Only Else (when Nothing)
Maybe<int> nothing = Maybe<int>.Nothing;
nothing.Else(() => HandleMissingValue());
```

## LINQ Support

```csharp
using Jflepp;

var result = from x in Maybe.From(5)
             from y in Maybe.From(3)
             select x + y;
// Maybe.From(8)

var withNothing = from x in Maybe.From(5)
                  from y in Maybe<int>.Nothing
                  select x + y;
// Nothing
```

## OrElse Chaining

Provide alternatives.

```csharp
using Jflepp;

Maybe<int> first = Maybe<int>.Nothing;
Maybe<int> second = Maybe<int>.Nothing;
Maybe<int> third = Maybe.From(42);

var result = first.OrElse(second).OrElse(third); // Maybe.From(42)

// With lazy evaluation
var lazyResult = first
    .OrElse(() => second)
    .OrElse(() => third);
```

## Converting to Nullable

```csharp
using Jflepp;

Maybe<int> maybe = Maybe.From(42);
int? nullable = maybe.ToNullable(); // 42

Maybe<int> nothing = Maybe<int>.Nothing;
int? nullableNothing = nothing.ToNullable(); // null
```

## Practical Examples

### Safe Property Access

```csharp
using Jflepp;

public class Address
{
    public string? Street { get; set; }
}

public class Person
{
    public Address? Address { get; set; }
}

Person? person = GetPerson();

var street = person.ToMaybe()
    .Select(p => p.Address)
    .SelectMany(a => a.ToMaybe())
    .Select(a => a.Street)
    .SelectMany(s => s.ToMaybe())
    .GetOrDefault("Unknown");
```

### Dictionary Lookup

```csharp
using Jflepp;

public static class DictionaryExtensions
{
    public static Maybe<TValue> GetMaybe<TKey, TValue>(
        this IDictionary<TKey, TValue> dict,
        TKey key)
    {
        return dict.TryGetValue(key, out var value)
            ? Maybe.From(value)
            : Maybe<TValue>.Nothing;
    }
}

var dict = new Dictionary<string, int> { ["one"] = 1 };

var result = dict.GetMaybe("one").GetOrDefault(0); // 1
var missing = dict.GetMaybe("two").GetOrDefault(0); // 0
```

### First or Default

```csharp
using Jflepp;

public static class EnumerableExtensions
{
    public static Maybe<T> FirstOrNothing<T>(this IEnumerable<T> source)
    {
        foreach (var item in source)
        {
            return Maybe.From(item);
        }
        return Maybe<T>.Nothing;
    }
    
    public static Maybe<T> FirstOrNothing<T>(
        this IEnumerable<T> source,
        Func<T, bool> predicate)
    {
        foreach (var item in source)
        {
            if (predicate(item))
            {
                return Maybe.From(item);
            }
        }
        return Maybe<T>.Nothing;
    }
}

var numbers = new[] { 1, 2, 3, 4, 5 };
var first = numbers.FirstOrNothing(); // Maybe.From(1)
var evenFirst = numbers.FirstOrNothing(x => x % 2 == 0); // Maybe.From(2)
```

### Parsing with Maybe

```csharp
using Jflepp;

Maybe<int> TryParseInt(string s)
{
    return int.TryParse(s, out var result)
        ? Maybe.From(result)
        : Maybe<int>.Nothing;
}

var parsed = TryParseInt("42")
    .Select(x => x * 2)
    .GetOrDefault(0); // 84

var invalid = TryParseInt("abc")
    .Select(x => x * 2)
    .GetOrDefault(0); // 0
```

### Configuration Loading

```csharp
using Jflepp;

Maybe<string> GetConfigValue(string key)
{
    var value = Environment.GetEnvironmentVariable(key);
    return string.IsNullOrWhiteSpace(value)
        ? Maybe<string>.Nothing
        : Maybe.From(value);
}

var connectionString = GetConfigValue("DB_CONNECTION")
    .GetOrDefault("DefaultConnection");

var timeout = GetConfigValue("TIMEOUT")
    .SelectMany(TryParseInt)
    .GetOrDefault(30);
```

## Guidance

- Use `Maybe<T>` to explicitly represent optional values.
- Use `ToMaybe()` extension to convert nullable values to Maybe.
- Prefer `GetOrDefault()` for providing fallback values.
- Use `Do()` and `Else()` for side effects based on value presence.
- Use `Select()` for transforming values.
- Use `SelectMany()` for chaining operations that return Maybe.
- Use `Where()` to conditionally keep values.
- Leverage LINQ syntax for readable composition.
- Use `OrElse()` to chain alternative Maybe sources.
- Avoid accessing `.Value` directly; prefer `GetOrDefault()` or `Do()`.
