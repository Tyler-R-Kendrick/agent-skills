---
name: curryfy
description: Guidance for using Curryfy library for functional currying in C#. Use when working with Curryfy.
license: MIT
metadata:
  displayName: "Curryfy"
  author: "Tyler-R-Kendrick"
---

# Curryfy

## Overview
Curryfy is a library that provides currying and partial application support for C# methods, enabling functional programming patterns.

Package: `Curryfy`

## Installation

```bash
dotnet add package Curryfy
```

## Basic Currying

Convert multi-parameter methods into a chain of single-parameter functions.

```csharp
using Curryfy;

// Normal method
int Add(int x, int y) => x + y;

// Curry it
var curriedAdd = Curry.From<int, int, int>(Add);

// Partial application
var add5 = curriedAdd(5);
var result = add5(3); // 8
```

## Extension Methods

```csharp
using Curryfy;

Func<int, int, int> add = (x, y) => x + y;

// Curry
var curried = add.Curry();
var result = curried(5)(3); // 8

// Uncurry
Func<int, Func<int, int>> curriedFunc = x => y => x + y;
var uncurried = curriedFunc.Uncurry();
var result2 = uncurried(5, 3); // 8
```

## Partial Application

```csharp
using Curryfy;

Func<int, int, int, int> sum3 = (x, y, z) => x + y + z;

// Apply first argument
var partialSum = sum3.Curry()(5);
var result = partialSum(3)(2); // 10

// Apply multiple arguments
var curriedSum = sum3.Curry();
var add5and3 = curriedSum(5)(3);
var result2 = add5and3(2); // 10
```

## Currying Methods with More Parameters

```csharp
using Curryfy;

int Sum4(int a, int b, int c, int d) => a + b + c + d;

var curried = Curry.From<int, int, int, int, int>(Sum4);

var step1 = curried(1);
var step2 = step1(2);
var step3 = step2(3);
var result = step3(4); // 10
```

## Practical Use Cases

### Configuration Builders

```csharp
using Curryfy;

public record Config(string Host, int Port, bool UseSsl);

Func<string, int, bool, Config> createConfig = (host, port, ssl) => new Config(host, port, ssl);

var curried = createConfig.Curry();

// Create specialized builders
var prodConfigBuilder = curried("prod.example.com");
var devConfigBuilder = curried("localhost");

var prodConfig = prodConfigBuilder(443)(true);
var devConfig = devConfigBuilder(8080)(false);
```

### Event Handlers

```csharp
using Curryfy;

void LogEvent(string level, string source, string message)
{
    Console.WriteLine($"[{level}] {source}: {message}");
}

var curriedLog = Curry.From<string, string, string>(LogEvent);

var errorLog = curriedLog("ERROR");
var infoLog = curriedLog("INFO");

var dbErrorLog = errorLog("Database");
var apiErrorLog = errorLog("API");

dbErrorLog("Connection failed");
apiErrorLog("Request timeout");
```

### Data Transformation Pipelines

```csharp
using Curryfy;

Func<int, int, int, int> transform = (multiplier, offset, value) => (value * multiplier) + offset;

var curried = transform.Curry();

// Create transformation functions
var doubleAndAdd10 = curried(2)(10);
var tripleAndAdd5 = curried(3)(5);

var result1 = doubleAndAdd10(7); // (7 * 2) + 10 = 24
var result2 = tripleAndAdd5(7);  // (7 * 3) + 5 = 26
```

## Combining with LINQ

```csharp
using Curryfy;

Func<int, int, int> add = (x, y) => x + y;
var curried = add.Curry();

var numbers = new[] { 1, 2, 3, 4, 5 };

// Add 10 to each number
var result = numbers.Select(curried(10)).ToList();
// [11, 12, 13, 14, 15]
```

## Composition with Curried Functions

```csharp
using Curryfy;

Func<int, int> addOne = x => x + 1;
Func<int, int> multiplyByTwo = x => x * 2;

// Compose
Func<int, int> composed = x => multiplyByTwo(addOne(x));

var result = composed(5); // (5 + 1) * 2 = 12

// With currying
Func<int, int, int> add = (x, y) => x + y;
var curriedAdd = add.Curry();

Func<int, int> pipeline = x => x
    .Pipe(curriedAdd(1))
    .Pipe(multiplyByTwo);

var result2 = pipeline(5); // 12
```

## Guidance

- Use currying to create specialized versions of general functions.
- Apply currying when building configuration or factory methods.
- Combine with LINQ for functional data transformations.
- Curry functions to create reusable, partially applied handlers.
- Consider currying for dependency injection in functional style.
- Use `Curry()` extension method for Func delegates.
- Use `Curry.From()` for static methods or named functions.
- Prefer currying when you frequently need variations of the same function with different fixed parameters.
