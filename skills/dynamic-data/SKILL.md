---
description: Guidance for DynamicData reactive collections library.
metadata:
  displayName: DynamicData
---

# DynamicData

## Overview
DynamicData provides reactive collections and LINQ operators for observable collections using Reactive Extensions.

## Example
```csharp
using DynamicData;

// Observable cache
var cache = new SourceCache<User, int>(u => u.Id);

// Subscribe to changes
cache.Connect()
    .Filter(u => u.IsActive)
    .Sort(SortExpressionComparer<User>.Ascending(u => u.Name))
    .Bind(out var users)
    .Subscribe();

// Add items
cache.AddOrUpdate(new User { Id = 1, Name = "Alice", IsActive = true });

// Transform
cache.Connect()
    .Transform(u => new UserViewModel(u))
    .Bind(out var viewModels)
    .Subscribe();
```

## Best Practices
- Use for reactive collections
- Combine with ReactiveUI
- Dispose subscriptions properly
- Use appropriate operators
