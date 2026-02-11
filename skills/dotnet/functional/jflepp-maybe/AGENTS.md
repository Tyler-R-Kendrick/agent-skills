# JFlepp.Maybe

## Overview
JFlepp.Maybe is a lightweight library providing Maybe<T> type for handling optional values in a functional way.

## Example
```csharp
using JFlepp.Maybe;

Maybe<User> GetUser(int id) =>
    users.ContainsKey(id) 
        ? Maybe.Just(users[id]) 
        : Maybe.Nothing<User>();

var userName = GetUser(123)
    .Select(u => u.Name)
    .OrElse("Unknown");
```

## Best Practices
- Use Maybe.Just for present values
- Use Maybe.Nothing for absent values
- Chain operations with Select, SelectMany
- Use OrElse for default values
- Avoid mixing with null
