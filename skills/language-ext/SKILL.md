---
description: Guidance for language-ext functional programming library.
metadata:
  displayName: language-ext
---

# language-ext

## Overview
language-ext brings functional programming features to C#, including Option, Either, Try, and many functional data structures.

## Key Features
- **Option<T>**: Represents optional values
- **Either<L, R>**: Represents success or failure
- **Try<T>**: Safe exception handling
- **Immutable Collections**: Persistent data structures

## Example
```csharp
using LanguageExt;
using static LanguageExt.Prelude;

Option<User> GetUser(int id) =>
    users.TryGetValue(id) ? Some(users[id]) : None;

var result = GetUser(123)
    .Map(u => u.Name)
    .Match(
        Some: name => $"Hello {name}",
        None: () => "User not found"
    );
```

## Best Practices
- Use Option instead of null
- Use Either for error handling with context
- Leverage monadic composition with Map, Bind
- Prefer immutable collections for thread safety
- Use pattern matching for cleaner code
