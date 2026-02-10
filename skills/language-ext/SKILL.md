---
name: language-ext
description: Guidance for using language-ext library for functional programming in C#. Use when working with language-ext.
license: MIT
metadata:
  displayName: "language-ext"
  author: "Tyler-R-Kendrick"
---

# language-ext

## Overview
`language-ext` is a comprehensive functional programming library for C# that brings advanced FP patterns like Option, Either, Try, immutable collections, and more.

Package: `LanguageExt.Core`

## Installation

```bash
dotnet add package LanguageExt.Core
```

## Core Types

### Option<T>

Represents optional values without null.

```csharp
using LanguageExt;
using static LanguageExt.Prelude;

Option<int> some = Some(42);
Option<int> none = None;

// Pattern matching
var result = some.Match(
    Some: value => $"Value: {value}",
    None: () => "No value"
);

// Binding
Option<string> GetUser(int id) => Some("John");
Option<string> GetEmail(string user) => Some("john@example.com");

var email = Some(1)
    .Bind(GetUser)
    .Bind(GetEmail)
    .IfNone("No email");
```

### Either<L, R>

Represents success (Right) or failure (Left).

```csharp
Either<string, int> Divide(int a, int b)
    => b == 0 
        ? Left<string, int>("Division by zero")
        : Right<string, int>(a / b);

var result = Divide(10, 2).Match(
    Left: error => $"Error: {error}",
    Right: value => $"Result: {value}"
);
```

### Try<T>

Encapsulates operations that may throw exceptions.

```csharp
Try<int> ParseInt(string s) => () => int.Parse(s);

var result = ParseInt("42").Match(
    Succ: value => $"Parsed: {value}",
    Fail: ex => $"Failed: {ex.Message}"
);
```

### Validation<F, S>

Accumulate multiple errors (unlike Either which short-circuits).

```csharp
using LanguageExt;
using static LanguageExt.Prelude;

Validation<string, string> ValidateName(string name)
    => string.IsNullOrWhiteSpace(name)
        ? Fail<string, string>("Name is required")
        : Success<string, string>(name);

Validation<string, int> ValidateAge(int age)
    => age < 0
        ? Fail<string, int>("Age must be positive")
        : Success<string, int>(age);

// Combine validations
var person = (ValidateName(""), ValidateAge(-5))
    .Apply((name, age) => new Person(name, age));
// Returns Validation with both errors
```

## Immutable Collections

```csharp
using LanguageExt;

// Seq<T> - immutable list
var seq = Seq("a", "b", "c");
var newSeq = seq.Add("d");

// Map<K, V> - immutable dictionary
var map = Map(
    (1, "one"),
    (2, "two")
);

// Set<T> - immutable set
var set = Set(1, 2, 3);
```

## Functional Composition

```csharp
using static LanguageExt.Prelude;

Func<int, int> add1 = x => x + 1;
Func<int, int> mul2 = x => x * 2;

// Function composition
var composed = compose(add1, mul2);
var result = composed(5); // mul2(add1(5)) = 12

// Pipe
var pipeResult = 5.Pipe(add1).Pipe(mul2); // 12
```

## Monadic Operations

### Map

Transform the value inside a context.

```csharp
Option<int> opt = Some(5);
Option<int> doubled = opt.Map(x => x * 2);
```

### Bind (flatMap)

Chain operations that return wrapped values.

```csharp
Option<User> GetUser(int id) => Some(new User { Id = id, Name = "John" });
Option<Order> GetOrder(User user) => Some(new Order { UserId = user.Id });

var order = Some(1)
    .Bind(GetUser)
    .Bind(GetOrder);
```

### Traverse

Convert `IEnumerable<Option<T>>` to `Option<IEnumerable<T>>`.

```csharp
var opts = Seq(Some(1), Some(2), Some(3));
Option<Seq<int>> allOrNone = opts.Traverse(identity);
// Some(Seq(1, 2, 3))

var optsWithNone = Seq(Some(1), None, Some(3));
Option<Seq<int>> result = optsWithNone.Traverse(identity);
// None (because one is None)
```

## LINQ Support

language-ext types support LINQ syntax.

```csharp
var result = from x in Some(5)
             from y in Some(3)
             select x + y;
// Some(8)

var eitherResult = from x in Right<string, int>(10)
                   from y in Right<string, int>(5)
                   select x / y;
// Right(2)
```

## Reader Monad

Inject dependencies functionally.

```csharp
using LanguageExt;

public record Config(string ConnectionString);

Reader<Config, string> GetConnectionString()
    => config => config.ConnectionString;

var result = GetConnectionString().Run(new Config("Server=localhost"));
```

## State Monad

Thread state through computations.

```csharp
State<int, string> increment = state => (state + 1, $"Value: {state + 1}");

var (finalState, message) = increment.Run(0);
// finalState = 1, message = "Value: 1"
```

## Effect System (Eff)

Track side effects in the type system.

```csharp
using LanguageExt;
using LanguageExt.Effects;

Eff<int> GetValue() => SuccessEff(42);

Eff<string> Process() =>
    from value in GetValue()
    from doubled in SuccessEff(value * 2)
    select $"Result: {doubled}";

var result = Process().Run();
```

## Lens

Functional updates of nested immutable data.

```csharp
using LanguageExt;

public record Address(string Street, string City);
public record Person(string Name, Address Address);

var streetLens = lens<Person, string>(
    Get: p => p.Address.Street,
    Set: (p, street) => p with { Address = p.Address with { Street = street } }
);

var person = new Person("John", new Address("Main St", "NYC"));
var updated = streetLens.Set(person, "Broadway");
```

## Pattern Matching

Enhanced pattern matching with `@case`.

```csharp
using LanguageExt;

Option<int> value = Some(42);

var result = value.Case switch
{
    SomeCase<int> some => $"Value: {some.Value}",
    _ => "None"
};
```

## Guidance

- Use `Option<T>` instead of nullable reference types for explicit optionality.
- Use `Either<L, R>` for operations that can fail with typed errors.
- Use `Try<T>` to wrap operations that may throw exceptions.
- Use `Validation<F, S>` when you need to collect multiple errors.
- Prefer immutable collections (`Seq`, `Map`, `Set`) over mutable ones.
- Use LINQ syntax for readable monadic composition.
- Use `Prelude` static imports for convenient factory methods (`Some`, `None`, `Left`, `Right`).
- Consider `Eff` for dependency injection and effect tracking.
- Use lenses for updating deeply nested immutable structures.
- Prefer functional error handling over exceptions in domain logic.
