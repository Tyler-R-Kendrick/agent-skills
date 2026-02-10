---
description: Guidance for mathematical expression evaluation in .NET.
metadata:
  displayName: MathFlow
---

# MathFlow

## Overview
Libraries and techniques for parsing and evaluating mathematical expressions in .NET.

## Example
```csharp
// Using NCalc
using NCalc;

var expr = new Expression("2 + 3 * 5");
var result = expr.Evaluate(); // 17

// With parameters
var paramExpr = new Expression("price * quantity");
paramExpr.Parameters["price"] = 10.5;
paramExpr.Parameters["quantity"] = 3;
var total = paramExpr.Evaluate(); // 31.5

// Custom functions
expr.EvaluateFunction += (name, args) =>
{
    if (name == "Square")
        args.Result = Math.Pow((double)args.Parameters[0].Evaluate(), 2);
};
```

## Best Practices
- Validate input expressions
- Handle division by zero
- Set evaluation timeout
- Restrict available functions
- Consider security implications
