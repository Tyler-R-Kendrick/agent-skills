---
name: fsharp
description: Guidance for F# programming language patterns and best practices. Use when working with F# code.
license: MIT
metadata:
  displayName: "F#"
  author: "Tyler-R-Kendrick"
---

# F#

## Overview
F# is a functional-first .NET language with strong type inference, immutability by default, and excellent interop with C#.

## Getting Started

```bash
dotnet new console -lang F# -o MyFSharpApp
cd MyFSharpApp
dotnet run
```

## Core Syntax

### Immutable Bindings

```fsharp
let x = 5
let name = "John"

// Mutable (rare)
let mutable counter = 0
counter <- counter + 1
```

### Functions

```fsharp
// Simple function
let add x y = x + y

// Type annotations (optional)
let multiply (x: int) (y: int): int = x * y

// Anonymous function (lambda)
let double = fun x -> x * 2

// Pipe operator
let result = 5 |> add 3 |> multiply 2 // 16
```

### Pattern Matching

```fsharp
let describe x =
    match x with
    | 0 -> "zero"
    | 1 -> "one"
    | x when x < 0 -> "negative"
    | x when x > 0 -> "positive"
    | _ -> "unknown"

// Shorthand
let describeShort = function
    | 0 -> "zero"
    | 1 -> "one"
    | _ -> "other"
```

## Data Types

### Records

```fsharp
type Person = {
    Name: string
    Age: int
}

let john = { Name = "John"; Age = 30 }

// Immutable update
let olderJohn = { john with Age = 31 }
```

### Discriminated Unions

```fsharp
type Shape =
    | Circle of radius: float
    | Rectangle of width: float * height: float
    | Triangle of base: float * height: float

let area shape =
    match shape with
    | Circle r -> System.Math.PI * r * r
    | Rectangle (w, h) -> w * h
    | Triangle (b, h) -> 0.5 * b * h

let c = Circle(radius = 5.0)
let a = area c
```

### Option Type

```fsharp
let tryParse (s: string) =
    match System.Int32.TryParse s with
    | (true, value) -> Some value
    | (false, _) -> None

let result = tryParse "42"
match result with
| Some value -> printfn "Parsed: %d" value
| None -> printfn "Failed to parse"

// Option combinators
let doubled = result |> Option.map ((*) 2)
let defaulted = result |> Option.defaultValue 0
```

### Result Type

```fsharp
let divide x y =
    if y = 0 then
        Error "Division by zero"
    else
        Ok (x / y)

let result = divide 10 2
match result with
| Ok value -> printfn "Result: %d" value
| Error msg -> printfn "Error: %s" msg
```

## Collections

### Lists

```fsharp
let numbers = [1; 2; 3; 4; 5]
let evens = numbers |> List.filter (fun x -> x % 2 = 0)
let doubled = numbers |> List.map ((*) 2)

// List comprehensions
let squares = [for x in 1..10 -> x * x]
```

### Arrays

```fsharp
let arr = [|1; 2; 3; 4; 5|]
arr.[0] <- 10 // Arrays are mutable
```

### Sequences

```fsharp
let seq = seq { 1..1000000 } // Lazy evaluation
let taken = seq |> Seq.take 5 |> Seq.toList
```

## Async and Task

```fsharp
open System.Threading.Tasks

// Async workflow
let asyncOperation = async {
    do! Async.Sleep 1000
    return "Done"
}

// Task (modern)
let taskOperation = task {
    do! Task.Delay 1000
    return "Done"
}

// Run async
let result = asyncOperation |> Async.RunSynchronously

// Run task
let taskResult = taskOperation.Result
```

## Modules and Namespaces

```fsharp
namespace MyApp

module Math =
    let add x y = x + y
    let multiply x y = x * y

// Usage
open MyApp
let result = Math.add 2 3
```

## Type Providers

Access external data with compile-time type safety.

```fsharp
#r "nuget: FSharp.Data"

open FSharp.Data

type Weather = JsonProvider<"https://api.weather.com/sample.json">
let weather = Weather.Load("https://api.weather.com/current")
printfn "Temperature: %f" weather.Temperature
```

## Active Patterns

Custom pattern matching.

```fsharp
let (|Even|Odd|) x =
    if x % 2 = 0 then Even else Odd

let describe = function
    | Even -> "even number"
    | Odd -> "odd number"

printfn "%s" (describe 4) // "even number"
```

## Computation Expressions

Custom control flow (like LINQ).

```fsharp
// Option builder
type OptionBuilder() =
    member _.Bind(opt, f) = Option.bind f opt
    member _.Return(x) = Some x
    member _.ReturnFrom(opt) = opt

let option = OptionBuilder()

let result = option {
    let! x = Some 5
    let! y = Some 3
    return x + y
} // Some 8
```

## Units of Measure

Type-safe numerical calculations.

```fsharp
[<Measure>] type m
[<Measure>] type s
[<Measure>] type kg

let distance = 100.0<m>
let time = 10.0<s>
let speed = distance / time // 10.0<m/s>

let mass = 5.0<kg>
// let invalid = distance + mass // Compile error!
```

## Interop with C#

```fsharp
// Call C# code
open System.Collections.Generic

let dict = Dictionary<string, int>()
dict.Add("one", 1)

// Nullable types
open System

let nullable: Nullable<int> = Nullable(42)
let hasValue = nullable.HasValue
```

## Testing with Expecto

```fsharp
#r "nuget: Expecto"

open Expecto

let tests =
    testList "Math tests" [
        testCase "add works" <| fun () ->
            let result = add 2 3
            Expect.equal result 5 "Should be 5"
    ]

[<EntryPoint>]
let main args =
    runTestsWithArgs defaultConfig args tests
```

## Guidance

- Embrace immutability by default; use mutable only when necessary.
- Use pattern matching extensively for clarity and exhaustiveness checking.
- Prefer discriminated unions over class hierarchies.
- Use `Option` and `Result` types instead of null and exceptions.
- Leverage type inference; add annotations only for clarity or API boundaries.
- Use pipe operator `|>` for readable data transformations.
- Prefer `task` over `async` for interop with C# and modern .NET.
- Use computation expressions for custom control flow.
- Consider type providers for external data access.
- Use units of measure for domain-specific numerical calculations.
- Keep functions pure and side-effect-free when possible.
- Use modules to organize related functions.
