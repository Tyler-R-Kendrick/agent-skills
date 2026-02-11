# Currying

## Overview
Currying transforms a function with multiple arguments into a sequence of functions, each taking a single argument.

## Concept
```csharp
// Traditional
int Add(int a, int b) => a + b;

// Curried
Func<int, Func<int, int>> AddCurried = 
    a => b => a + b;

// Usage
var add5 = AddCurried(5);
var result = add5(10); // 15
```

## Use Cases
- Partial application
- Function composition
- Configuration builders
- Dependency injection

## Best Practices
- Use for creating specialized functions
- Combine with higher-order functions
- Consider readability vs functional purity
- Leverage for builder patterns
