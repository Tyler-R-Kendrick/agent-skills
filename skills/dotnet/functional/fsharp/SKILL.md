---
name: fsharp
description: |
  Use when writing F# code on .NET, leveraging functional-first programming with discriminated unions, pattern matching, computation expressions, and type inference.
  USE FOR: functional-first .NET programming, discriminated unions and pattern matching, computation expressions, type-safe domain modeling, data pipeline processing, F# interop with C#
  DO NOT USE FOR: C# functional patterns (use functional-programming or language-ext), C# parser combinators (use pidgin), imperative OOP patterns
license: MIT
metadata:
  displayName: "F#"
  author: "Tyler-R-Kendrick"
  version: "1.0.0"
compatibility: claude, copilot, cursor
references:
  - title: "F# Official Website"
    url: "https://fsharp.org"
  - title: "F# Documentation on Microsoft Learn"
    url: "https://learn.microsoft.com/dotnet/fsharp"
  - title: "F# GitHub Repository"
    url: "https://github.com/dotnet/fsharp"
---

# F#

## Overview
F# is a functional-first programming language on .NET that emphasizes immutability, type inference, concise syntax, and expressive type systems. It supports discriminated unions for domain modeling, pattern matching for control flow, computation expressions for custom workflows (async, result, query), and seamless interoperability with C# libraries. F# is well suited for data processing pipelines, domain modeling, financial systems, and any codebase that benefits from strong typing with minimal boilerplate.

## Project Setup
```xml
<!-- .fsproj -->
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net8.0</TargetFramework>
  </PropertyGroup>
</Project>
```

## Discriminated Unions for Domain Modeling
```fsharp
type EmailAddress = EmailAddress of string

type PaymentMethod =
    | CreditCard of cardNumber: string * expiry: string
    | BankTransfer of iban: string
    | PayPal of email: EmailAddress

type OrderStatus =
    | Pending
    | Confirmed of confirmedAt: System.DateTime
    | Shipped of trackingNumber: string * shippedAt: System.DateTime
    | Delivered of deliveredAt: System.DateTime
    | Cancelled of reason: string

type OrderLine = {
    ProductId: string
    Quantity: int
    UnitPrice: decimal
}

type Order = {
    Id: System.Guid
    CustomerId: string
    Lines: OrderLine list
    Status: OrderStatus
    Payment: PaymentMethod
}
```

## Pattern Matching
```fsharp
let processOrder (order: Order) =
    match order.Status with
    | Pending ->
        printfn "Order %A is pending" order.Id
        { order with Status = Confirmed System.DateTime.UtcNow }
    | Confirmed confirmedAt ->
        printfn "Confirmed at %A, preparing shipment" confirmedAt
        order
    | Shipped (tracking, _) ->
        printfn "In transit: %s" tracking
        order
    | Delivered deliveredAt ->
        printfn "Delivered at %A" deliveredAt
        order
    | Cancelled reason ->
        printfn "Cancelled: %s" reason
        order

let describePayment payment =
    match payment with
    | CreditCard (num, _) -> sprintf "Card ending %s" (num.Substring(num.Length - 4))
    | BankTransfer iban -> sprintf "Bank transfer to %s" iban
    | PayPal (EmailAddress email) -> sprintf "PayPal: %s" email
```

## Pipe Operator and Function Composition
```fsharp
// Pipe operator |> for readable left-to-right data flow
let orderTotal (order: Order) =
    order.Lines
    |> List.map (fun line -> decimal line.Quantity * line.UnitPrice)
    |> List.sum

// Function composition with >>
let sanitize = System.String.Trim >> fun s -> s.ToLowerInvariant()
let slugify = sanitize >> fun s -> s.Replace(" ", "-")

let slug = slugify "  Hello World  " // "hello-world"

// Combining operators in a pipeline
let activeCustomerEmails (customers: Customer list) =
    customers
    |> List.filter (fun c -> c.IsActive)
    |> List.map (fun c -> c.Email)
    |> List.distinct
    |> List.sort
```

## Result Type for Error Handling
```fsharp
type ValidationError =
    | EmptyName
    | InvalidEmail of string
    | NegativeAmount of decimal

let validateName name =
    if System.String.IsNullOrWhiteSpace name then Error EmptyName
    else Ok name

let validateEmail email =
    if email |> System.String.IsNullOrWhiteSpace then Error (InvalidEmail email)
    elif not (email.Contains "@") then Error (InvalidEmail email)
    else Ok email

let validateAmount amount =
    if amount < 0m then Error (NegativeAmount amount)
    else Ok amount

// Bind/flatMap for Result chaining
module Result =
    let bind f result =
        match result with
        | Ok value -> f value
        | Error e -> Error e

type CreateCustomerRequest = { Name: string; Email: string; Credit: decimal }

let validateRequest (req: CreateCustomerRequest) =
    validateName req.Name
    |> Result.bind (fun name ->
        validateEmail req.Email
        |> Result.bind (fun email ->
            validateAmount req.Credit
            |> Result.map (fun credit ->
                { Name = name; Email = email; Credit = credit })))
```

## Computation Expressions
```fsharp
// Async computation
let fetchOrderAsync (orderId: System.Guid) = async {
    let! order = getOrderFromDb orderId
    let! customer = getCustomerAsync order.CustomerId
    return {| Order = order; Customer = customer |}
}

// Task computation (for interop with C# Task-based APIs)
open System.Threading.Tasks

let fetchOrderTask (orderId: System.Guid) = task {
    let! order = getOrderFromDbTask orderId
    let! customer = getCustomerTask order.CustomerId
    return {| Order = order; Customer = customer |}
}

// Custom Result computation expression
type ResultBuilder() =
    member _.Bind(result, f) = Result.bind f result
    member _.Return(value) = Ok value
    member _.ReturnFrom(result) = result

let result = ResultBuilder()

let validateAndCreate (req: CreateCustomerRequest) = result {
    let! name = validateName req.Name
    let! email = validateEmail req.Email
    let! credit = validateAmount req.Credit
    return { Name = name; Email = email; Credit = credit }
}
```

## Collections and Sequences
```fsharp
// List comprehension
let squares = [ for i in 1..10 -> i * i ]

// Sequence (lazy evaluation)
let fibs =
    Seq.unfold (fun (a, b) -> Some(a, (b, a + b))) (0, 1)

let first20Fibs = fibs |> Seq.take 20 |> Seq.toList

// Array operations
let transformed =
    [| 1; 2; 3; 4; 5 |]
    |> Array.filter (fun x -> x % 2 = 0)
    |> Array.map (fun x -> x * x)

// Map (dictionary)
let lookup =
    [ ("alice", 1); ("bob", 2); ("charlie", 3) ]
    |> Map.ofList

let bobValue = Map.tryFind "bob" lookup // Some 2
```

## Active Patterns
```fsharp
// Partial active pattern for parsing
let (|Int|_|) (s: string) =
    match System.Int32.TryParse(s) with
    | true, value -> Some value
    | _ -> None

let (|Float|_|) (s: string) =
    match System.Double.TryParse(s) with
    | true, value -> Some value
    | _ -> None

let parseInput input =
    match input with
    | Int n -> printfn "Integer: %d" n
    | Float f -> printfn "Float: %f" f
    | _ -> printfn "Not a number: %s" input

// Parameterized active pattern
let (|DivisibleBy|_|) divisor n =
    if n % divisor = 0 then Some() else None

let classify n =
    match n with
    | DivisibleBy 15 -> "FizzBuzz"
    | DivisibleBy 3 -> "Fizz"
    | DivisibleBy 5 -> "Buzz"
    | _ -> string n
```

## F# with ASP.NET Core
```fsharp
open Microsoft.AspNetCore.Builder
open Microsoft.Extensions.DependencyInjection
open Microsoft.Extensions.Hosting

[<CLIMutable>]
type OrderDto = { Id: System.Guid; CustomerId: string; Total: decimal }

let builder = WebApplication.CreateBuilder()
builder.Services.AddEndpointsApiExplorer() |> ignore

let app = builder.Build()

app.MapGet("/orders/{id:guid}", fun (id: System.Guid) ->
    task {
        return Results.Ok({ Id = id; CustomerId = "cust-1"; Total = 99.99m })
    }) |> ignore

app.MapPost("/orders", fun (dto: OrderDto) ->
    task {
        return Results.Created($"/orders/{dto.Id}", dto)
    }) |> ignore

app.Run()
```

## F# Type Comparison

| Feature | F# | C# |
|---------|----|----|
| Default immutability | Yes (`let` bindings) | No (must use `readonly`) |
| Discriminated unions | Native | Requires class hierarchy |
| Pattern matching | Exhaustive, with active patterns | `switch` expressions (limited) |
| Type inference | Hindley-Milner (powerful) | Local variable only |
| Null safety | Option type idiom, no nulls by default | Nullable reference types |
| Computation expressions | Built-in (async, task, seq, custom) | No equivalent |
| Pipe operator | `\|>` built-in | Not available |

## Best Practices
- Use discriminated unions instead of class hierarchies for domain modeling; the compiler enforces exhaustive pattern matching so new cases cannot be accidentally ignored.
- Prefer the pipe operator `|>` for data transformation pipelines to express left-to-right flow rather than nested function calls.
- Use `Result<'T, 'Error>` for operations that can fail with domain-specific errors instead of throwing exceptions; chain with `Result.bind` or a computation expression.
- Make types and functions immutable by default; use `mutable` only when interacting with C# APIs or when profiling proves a performance need.
- Use computation expressions (`async { }`, `task { }`, custom `result { }`) to write monadic code that reads sequentially while handling effects implicitly.
- Add `[<CLIMutable>]` to record types used in ASP.NET Core or EF Core that require parameterless constructors for model binding and deserialization.
- Use active patterns to create reusable, composable pattern-matching logic for parsing, validation, and classification tasks.
- Place F# files in dependency order within `.fsproj` since F# compiles top-to-bottom; use `--warnon:3218` to catch forward reference issues.
- Write public API functions with explicit type annotations for clarity and C# interop, but rely on type inference for internal implementation code.
- Use `Seq` for lazy evaluation of large or infinite data sets; use `List` for small, fully-evaluated collections; use `Array` for performance-critical indexed access.
