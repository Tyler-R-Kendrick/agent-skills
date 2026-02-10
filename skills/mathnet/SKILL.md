---
description: Guidance for Math.NET Numerics library.
metadata:
  displayName: Math.NET
---

# Math.NET

## Overview
Math.NET Numerics is a library for numerical computing including linear algebra, statistics, and more.

## Example
```csharp
using MathNet.Numerics.LinearAlgebra;
using MathNet.Numerics.Statistics;

// Linear algebra
var matrix = Matrix<double>.Build.DenseOfArray(new double[,] {
    { 1, 2 }, { 3, 4 }
});
var inverse = matrix.Inverse();

// Statistics
var data = new[] { 1.0, 2.0, 3.0, 4.0, 5.0 };
var mean = Statistics.Mean(data);
var stdDev = Statistics.StandardDeviation(data);

// Random numbers
var normal = new MathNet.Numerics.Distributions.Normal(0, 1);
var samples = normal.Samples().Take(100).ToArray();
```

## Best Practices
- Use appropriate data structures
- Leverage parallelization
- Consider precision requirements
- Profile performance
