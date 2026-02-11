---
name: fody
description: >
  USE FOR: IL weaving at build time to inject cross-cutting concerns such as INotifyPropertyChanged
  implementation, null-guard checks, method timing, logging, and resource embedding into .NET assemblies.
  DO NOT USE FOR: Runtime AOP frameworks, source generators that produce C# code, or scenarios
  where compile-time code generation (Roslyn generators) would be more transparent and debuggable.
license: MIT
metadata:
  displayName: Fody
  author: "Tyler-R-Kendrick"
  version: "1.0.0"
compatibility:
  - claude
  - copilot
  - cursor
references:
  - title: "Fody GitHub Repository"
    url: "https://github.com/Fody/Fody"
  - title: "Fody Home and Documentation"
    url: "https://github.com/Fody/Home"
  - title: "Fody NuGet Package"
    url: "https://www.nuget.org/packages/Fody"
---

# Fody IL Weaving Framework

## Overview

Fody is an extensible build-time tool that manipulates .NET Intermediate Language (IL) after the C# compiler produces the assembly. It uses a plugin (add-in) architecture where each add-in performs a specific weaving task -- injecting property-change notifications, adding null checks, embedding satellite assemblies, or timing method execution. Because weaving happens at the IL level during the MSBuild pipeline, the original C# source remains clean and free of boilerplate while the compiled output contains the injected behavior.

Fody is configured through a `FodyWeavers.xml` file at the project root and NuGet packages for each add-in. The core `Fody` package is a build-only dependency that orchestrates the weaving pipeline.

## Installation and Configuration

Install the core package and desired add-ins via the dotnet CLI. Add-in NuGet packages are `PrivateAssets="all"` by default so they do not flow to consumers.

```xml
<!-- FodyWeavers.xml - place in project root alongside .csproj -->
<Weavers xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:noNamespaceSchemaLocation="FodyWeavers.xsd">
  <PropertyChanged />
  <NullGuard IncludeDebugAssert="false" />
  <MethodTimer />
  <ConfigureAwait ContinueOnCapturedContext="false" />
</Weavers>
```

```bash
dotnet add package Fody
dotnet add package PropertyChanged.Fody
dotnet add package NullGuard.Fody
dotnet add package MethodTimer.Fody
dotnet add package ConfigureAwait.Fody
```

## PropertyChanged.Fody

The most widely used add-in. It implements `INotifyPropertyChanged` by injecting `PropertyChanged` event raises into property setters. The weaver detects dependent properties and raises notifications for them as well.

```csharp
using System.ComponentModel;

// Fody detects INotifyPropertyChanged and weaves all auto-property setters
public class PersonViewModel : INotifyPropertyChanged
{
    // Fody injects PropertyChanged raise into the setter
    public string FirstName { get; set; } = string.Empty;

    // Fody injects PropertyChanged raise into the setter
    public string LastName { get; set; } = string.Empty;

    // Fody detects dependency on FirstName and LastName,
    // raises PropertyChanged for FullName when either changes
    public string FullName => $"{FirstName} {LastName}";

    // Fody also supports [AlsoNotifyFor] for explicit dependencies
    // [AlsoNotifyFor(nameof(IsValid))]
    // public string Email { get; set; }

    public event PropertyChangedEventHandler? PropertyChanged;
}
```

After weaving, the compiled IL for the `FirstName` setter is equivalent to:

```csharp
// What Fody generates in IL (conceptual C# equivalent)
public string FirstName
{
    get => _firstName;
    set
    {
        if (string.Equals(_firstName, value, StringComparison.Ordinal))
            return;
        _firstName = value;
        OnPropertyChanged(nameof(FirstName));
        OnPropertyChanged(nameof(FullName)); // detected dependency
    }
}
```

## NullGuard.Fody

Injects argument null checks at method entry and return-value null checks at method exit for all reference-type parameters and return values.

```csharp
using System;

public class OrderService
{
    // After weaving: throws ArgumentNullException if order is null
    public decimal CalculateTotal(Order order)
    {
        // NullGuard injects: if (order == null) throw new ArgumentNullException(nameof(order));
        decimal subtotal = order.Items.Sum(i => i.Price * i.Quantity);
        decimal tax = subtotal * order.TaxRate;
        return subtotal + tax;
    }

    // Nullable parameters are excluded from null checks
    public string FormatAddress(Address address, string? apartment)
    {
        // NullGuard injects null check for 'address' only, not 'apartment'
        string line1 = $"{address.Street}";
        string line2 = apartment is not null ? $"Apt {apartment}" : string.Empty;
        return $"{line1}\n{line2}\n{address.City}, {address.State} {address.Zip}";
    }
}

public record Order(OrderItem[] Items, decimal TaxRate);
public record OrderItem(string Name, decimal Price, int Quantity);
public record Address(string Street, string City, string State, string Zip);
```

## MethodTimer.Fody

Injects timing instrumentation around method bodies. By convention it looks for a static `MethodTimeLogger` class with a `Log` method.

```csharp
using System;
using System.Diagnostics;
using System.Reflection;

// MethodTimer.Fody looks for this class by convention
public static class MethodTimeLogger
{
    public static void Log(MethodBase methodBase, TimeSpan elapsed, string message)
    {
        Console.WriteLine($"[PERF] {methodBase.DeclaringType?.Name}.{methodBase.Name} " +
                          $"took {elapsed.TotalMilliseconds:F1}ms");
    }
}

public class DataImporter
{
    // Fody wraps this method body in a Stopwatch and calls MethodTimeLogger.Log
    [Time]
    public void ImportCsvFile(string filePath)
    {
        var lines = System.IO.File.ReadAllLines(filePath);
        foreach (var line in lines)
        {
            ParseAndStore(line);
        }
    }

    private void ParseAndStore(string line)
    {
        // parsing logic
    }
}
```

## ConfigureAwait.Fody

Adds `.ConfigureAwait(false)` to every `await` expression in the assembly. This is particularly useful in library code where capturing the synchronization context is undesirable.

```csharp
using System.Net.Http;
using System.Threading.Tasks;

public class ApiClient
{
    private readonly HttpClient _httpClient;

    public ApiClient(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    // After weaving, every await in this method has .ConfigureAwait(false)
    public async Task<string> GetDataAsync(string endpoint)
    {
        // Woven to: await _httpClient.GetAsync(endpoint).ConfigureAwait(false)
        var response = await _httpClient.GetAsync(endpoint);
        response.EnsureSuccessStatusCode();
        // Woven to: await response.Content.ReadAsStringAsync().ConfigureAwait(false)
        return await response.Content.ReadAsStringAsync();
    }
}
```

## Popular Add-ins Comparison

| Add-in              | Purpose                              | Typical Use Case                        |
|---------------------|--------------------------------------|-----------------------------------------|
| PropertyChanged     | INotifyPropertyChanged injection     | MVVM ViewModels, WPF/MAUI data binding  |
| NullGuard           | Automatic null argument checks       | Public API surface null safety           |
| MethodTimer         | Method execution timing              | Performance diagnostics, profiling       |
| ConfigureAwait      | `.ConfigureAwait(false)` injection   | Library code avoiding context capture    |
| Costura             | Embed referenced assemblies as resources | Single-file deployment without publish |
| Janitor             | IDisposable implementation           | Classes with disposable fields           |
| Virtuosity          | Make all methods virtual             | Testing and mocking legacy classes       |
| InlineIL            | Inline IL instructions in C#        | Low-level performance optimization       |

## Writing a Custom Add-in

Custom add-ins implement `BaseModuleWeaver` and manipulate Mono.Cecil types.

```csharp
using System.Collections.Generic;
using Fody;
using Mono.Cecil;
using Mono.Cecil.Cil;

public class LoggingWeaver : BaseModuleWeaver
{
    public override void Execute()
    {
        foreach (var type in ModuleDefinition.Types)
        {
            foreach (var method in type.Methods)
            {
                if (!method.HasBody || method.IsConstructor)
                    continue;

                var processor = method.Body.GetILProcessor();
                var firstInstruction = method.Body.Instructions[0];

                // Inject Console.WriteLine at method entry
                var writeLineRef = ModuleDefinition.ImportReference(
                    typeof(System.Console).GetMethod("WriteLine", new[] { typeof(string) }));

                processor.InsertBefore(firstInstruction,
                    processor.Create(OpCodes.Ldstr, $"Entering {type.Name}.{method.Name}"));
                processor.InsertBefore(firstInstruction,
                    processor.Create(OpCodes.Call, writeLineRef));
            }
        }
    }

    public override IEnumerable<string> GetAssembliesForScanning()
    {
        yield return "mscorlib";
        yield return "System.Runtime";
    }
}
```

## Best Practices

1. **List weavers in `FodyWeavers.xml` in the order they should execute** because Fody processes add-ins sequentially and the output of one weaver becomes the input of the next; place `NullGuard` before `MethodTimer` so that timing includes the null-check overhead.

2. **Commit `FodyWeavers.xml` and `FodyWeavers.xsd` to version control** so that all developers and CI agents use the same weaver configuration; the XSD file is auto-generated and enables IntelliSense in XML editors.

3. **Verify woven behavior by decompiling the output assembly with ILSpy or dotnet-ilverify** because IL weaving modifies code after the C# compiler runs and compiler-level debugging cannot step through injected instructions.

4. **Use nullable annotations (`string?`) to control NullGuard behavior** rather than `[AllowNull]` attributes; NullGuard.Fody respects the nullable annotation context and skips parameters annotated as nullable.

5. **Prefer PropertyChanged.Fody over manual `INotifyPropertyChanged` implementation in MVVM projects** to eliminate hundreds of lines of boilerplate, but always verify that computed property dependencies (like `FullName` depending on `FirstName`) are detected correctly.

6. **Pin Fody and add-in package versions in `Directory.Packages.props`** when using Central Package Management to prevent version skew between developers and CI; mismatched versions can cause silent weaving failures.

7. **Do not use Fody for concerns that source generators can handle transparently** because source generators produce inspectable C# code that is easier to debug, test, and understand than IL-level modifications.

8. **Set `IncludeDebugAssert="false"` on NullGuard in production builds** to avoid Debug.Assert calls that behave differently between Debug and Release configurations and can mask runtime exceptions.

9. **Measure build-time impact when adding multiple weavers** by enabling MSBuild binary logging (`dotnet build -bl`) and inspecting the Fody target duration; each weaver loads and scans the entire assembly.

10. **Exclude generated or third-party code from weaving using `[DoNotNotify]`, `[NullGuardIgnore]`, or assembly-level attributes** to prevent unexpected behavior in code you do not control.
