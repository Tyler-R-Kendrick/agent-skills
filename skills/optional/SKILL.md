---
name: optional
description: Guidance for using Optional library for null-safe programming in C#. Use when working with Optional.
license: MIT
metadata:
  displayName: "Optional"
  author: "Tyler-R-Kendrick"
---

# Optional

## Overview
Optional is a robust, fully-featured optional values library for C#, providing a type-safe alternative to null references.

Package: `Optional`

## Installation

```bash
dotnet add package Optional
```

## Creating Optional Values

```csharp
using Optional;

// Some value
Option<int> some = Option.Some(42);

// No value
Option<int> none = Option.None<int>();

// From nullable
int? nullable = 5;
Option<int> fromNullable = nullable.SomeNotNull();

int? nullValue = null;
Option<int> fromNull = nullValue.SomeNotNull(); // None
```

## Pattern Matching

```csharp
using Optional;

Option<int> value = Option.Some(42);

// Match
var result = value.Match(
    some: v => $"Value: {v}",
    none: () => "No value"
);

// MatchSome (returns Option)
var doubled = value.MatchSome(v => v * 2); // Option<int>
```

## Extracting Values

```csharp
using Optional;

Option<int> some = Option.Some(42);
Option<int> none = Option.None<int>();

// ValueOr (with default)
int value1 = some.ValueOr(0); // 42
int value2 = none.ValueOr(0); // 0

// ValueOr (with lazy default)
int value3 = none.ValueOr(() => ExpensiveDefault());

// HasValue and Value
if (some.HasValue)
{
    int value = some.Value; // Safe to access
}

// ValueOrFailure (throws if None)
int value4 = some.ValueOrFailure(); // 42
// int value5 = none.ValueOrFailure(); // throws OptionValueMissingException
```

## Transformations

### Map

Transform the value if present.

```csharp
using Optional;

Option<int> opt = Option.Some(5);
Option<int> doubled = opt.Map(x => x * 2); // Some(10)

Option<int> empty = Option.None<int>();
Option<int> stillEmpty = empty.Map(x => x * 2); // None
```

### FlatMap (Bind)

Chain operations that return Option.

```csharp
using Optional;

Option<User> GetUser(int id) => Option.Some(new User { Id = id });
Option<Order> GetOrder(User user) => Option.Some(new Order { UserId = user.Id });

var order = Option.Some(1)
    .FlatMap(GetUser)
    .FlatMap(GetOrder);
```

### Filter

Keep value only if predicate is true.

```csharp
using Optional;

Option<int> opt = Option.Some(42);
Option<int> filtered = opt.Filter(x => x > 40); // Some(42)

Option<int> removed = opt.Filter(x => x < 40); // None
```

## Or/Else Chaining

Provide alternative options.

```csharp
using Optional;

Option<int> first = Option.None<int>();
Option<int> second = Option.None<int>();
Option<int> third = Option.Some(42);

var result = first.Or(second).Or(third); // Some(42)

// With lazy evaluation
var lazyResult = first
    .Else(() => second)
    .Else(() => third);
```

## Converting to Nullable

```csharp
using Optional;

Option<int> some = Option.Some(42);
int? nullable = some.ToNullable(); // 42

Option<int> none = Option.None<int>();
int? nullableNone = none.ToNullable(); // null
```

## LINQ Support

```csharp
using Optional;

var result = from x in Option.Some(5)
             from y in Option.Some(3)
             select x + y;
// Some(8)

var withNone = from x in Option.Some(5)
               from y in Option.None<int>()
               select x + y;
// None
```

## Collections

### SomeNotNull for filtering

```csharp
using Optional;

var values = new int?[] { 1, null, 3, null, 5 };

var options = values
    .Select(x => x.SomeNotNull())
    .Values(); // Extension that filters out None values
// [1, 3, 5]
```

### Traversing Options

```csharp
using Optional;
using Optional.Collections;

var opts = new[] 
{
    Option.Some(1),
    Option.Some(2),
    Option.Some(3)
};

// All or nothing
Option<IEnumerable<int>> all = opts.Sequence();
// Some([1, 2, 3])

var withNone = new[]
{
    Option.Some(1),
    Option.None<int>(),
    Option.Some(3)
};

Option<IEnumerable<int>> hasNone = withNone.Sequence();
// None
```

## Exception Handling

```csharp
using Optional;
using Optional.Unsafe;

Option<int> TryParse(string s)
{
    try
    {
        return Option.Some(int.Parse(s));
    }
    catch
    {
        return Option.None<int>();
    }
}

// Or use the provided helper
Option<int> result = Option.Try(() => int.Parse("42")); // Some(42)
Option<int> failed = Option.Try(() => int.Parse("invalid")); // None
```

## Practical Examples

### Safe Dictionary Lookup

```csharp
using Optional;

public static class DictionaryExtensions
{
    public static Option<TValue> GetValueOrNone<TKey, TValue>(
        this IDictionary<TKey, TValue> dict,
        TKey key)
    {
        return dict.TryGetValue(key, out var value)
            ? Option.Some(value)
            : Option.None<TValue>();
    }
}

var dict = new Dictionary<string, int> { ["one"] = 1 };

var result = dict.GetValueOrNone("one").ValueOr(0); // 1
var missing = dict.GetValueOrNone("two").ValueOr(0); // 0
```

### Configuration Reading

```csharp
using Optional;

Option<string> GetConfigValue(string key)
{
    var value = Environment.GetEnvironmentVariable(key);
    return string.IsNullOrWhiteSpace(value)
        ? Option.None<string>()
        : Option.Some(value);
}

var host = GetConfigValue("DB_HOST").ValueOr("localhost");
var port = GetConfigValue("DB_PORT")
    .Map(int.Parse)
    .ValueOr(5432);
```

### User Input Validation

```csharp
using Optional;

Option<string> ValidateName(string input)
{
    return string.IsNullOrWhiteSpace(input)
        ? Option.None<string>()
        : Option.Some(input.Trim());
}

Option<int> ValidateAge(string input)
{
    return Option.Try(() => int.Parse(input))
        .Filter(age => age >= 0 && age <= 150);
}

var name = ValidateName("John").ValueOr("Anonymous");
var age = ValidateAge("30").ValueOr(0);
```

## Guidance

- Use `Option<T>` instead of nullable reference types for explicit optionality.
- Use `SomeNotNull()` to convert nullable values to Options.
- Prefer `Match()` for explicit handling of both cases.
- Use `Map()` for transforming values without changing the Optional context.
- Use `FlatMap()` for chaining operations that return Options.
- Use `Filter()` to conditionally keep values.
- Use `ValueOr()` to provide defaults when extracting values.
- Leverage LINQ syntax for complex optional value composition.
- Use `Option.Try()` to convert exception-throwing code to optional values.
- Use `Sequence()` for collections of Options when you need all-or-nothing semantics.
