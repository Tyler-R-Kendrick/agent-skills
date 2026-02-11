---
name: community-toolkit
description: >
  Guidance for .NET Community Toolkit libraries including MVVM Toolkit, Diagnostics, and HighPerformance.
  USE FOR: MVVM source-generated view models, observable properties, relay commands, messenger pattern, guard clauses, high-performance array pooling, string pooling.
  DO NOT USE FOR: UI framework specifics (use WPF/MAUI/WinUI skills), full reactive programming (use Rx), dependency injection container logic.
license: MIT
metadata:
  displayName: Community Toolkit
  author: "Tyler-R-Kendrick"
  version: "1.0.0"
compatibility:
  - claude
  - copilot
  - cursor
---

# .NET Community Toolkit

## Overview

The .NET Community Toolkit is a collection of libraries maintained by the .NET Foundation that provides MVVM infrastructure, diagnostic helpers, and high-performance utilities. The toolkit is split into three main packages: `CommunityToolkit.Mvvm` for source-generated MVVM patterns, `CommunityToolkit.Diagnostics` for guard clauses and type validation, and `CommunityToolkit.HighPerformance` for memory-efficient data structures and pooling.

The MVVM Toolkit uses C# source generators to eliminate boilerplate for observable properties, commands, and messaging. It is UI-framework agnostic and works with WPF, MAUI, WinUI, Avalonia, and any framework that consumes `INotifyPropertyChanged`.

Install via NuGet:
```
dotnet add package CommunityToolkit.Mvvm
dotnet add package CommunityToolkit.Diagnostics
dotnet add package CommunityToolkit.HighPerformance
```

## MVVM Source Generators

The MVVM Toolkit uses attributes to generate boilerplate code at compile time. Annotate fields with `[ObservableProperty]` to auto-generate properties with change notification, and methods with `[RelayCommand]` to generate `ICommand` implementations.

```csharp
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using System.Threading;
using System.Threading.Tasks;

public partial class CustomerViewModel : ObservableObject
{
    [ObservableProperty]
    [NotifyPropertyChangedFor(nameof(FullName))]
    private string _firstName = string.Empty;

    [ObservableProperty]
    [NotifyPropertyChangedFor(nameof(FullName))]
    private string _lastName = string.Empty;

    [ObservableProperty]
    [NotifyCanExecuteChangedFor(nameof(SaveCommand))]
    private bool _hasChanges;

    public string FullName => $"{FirstName} {LastName}";

    [RelayCommand(CanExecute = nameof(HasChanges))]
    private async Task SaveAsync(CancellationToken token)
    {
        await _customerService.UpdateAsync(
            new Customer { FirstName = FirstName, LastName = LastName }, token);
        HasChanges = false;
    }

    [RelayCommand]
    private void Reset()
    {
        FirstName = string.Empty;
        LastName = string.Empty;
        HasChanges = false;
    }
}
```

## Messenger Pattern

The `WeakReferenceMessenger` or `StrongReferenceMessenger` decouples communication between view models without direct references. Define message types as records for immutability.

```csharp
using CommunityToolkit.Mvvm.Messaging;
using CommunityToolkit.Mvvm.Messaging.Messages;

// Define messages as records
public record OrderPlacedMessage(int OrderId, decimal Total);

public record StatusRequestMessage : RequestMessage<string>;

// Sender view model
public partial class CheckoutViewModel : ObservableObject
{
    [RelayCommand]
    private void PlaceOrder()
    {
        var orderId = ProcessOrder();
        WeakReferenceMessenger.Default.Send(new OrderPlacedMessage(orderId, 99.99m));
    }
}

// Receiver view model
public partial class DashboardViewModel : ObservableRecipient, IRecipient<OrderPlacedMessage>
{
    public DashboardViewModel()
    {
        IsActive = true; // activates messenger registration
    }

    public void Receive(OrderPlacedMessage message)
    {
        LatestOrderId = message.OrderId;
        TotalRevenue += message.Total;
    }

    [ObservableProperty]
    private int _latestOrderId;

    [ObservableProperty]
    private decimal _totalRevenue;
}
```

## Diagnostics Guard Clauses

`CommunityToolkit.Diagnostics` provides a fluent `Guard` class for argument validation that produces clear exception messages and integrates with nullable analysis.

```csharp
using System;
using System.Collections.Generic;
using CommunityToolkit.Diagnostics;

public class InventoryService
{
    public void AddStock(string sku, int quantity, IReadOnlyList<string> warehouses)
    {
        Guard.IsNotNullOrWhiteSpace(sku);
        Guard.IsGreaterThan(quantity, 0);
        Guard.IsNotNull(warehouses);
        Guard.HasSizeGreaterThan(warehouses, 0);

        // Business logic proceeds with validated inputs
    }

    public decimal CalculateDiscount(decimal price, double percentage)
    {
        Guard.IsGreaterThanOrEqualTo(price, 0m);
        Guard.IsInRange(percentage, 0.0, 1.0);

        return price * (decimal)percentage;
    }
}
```

## HighPerformance Utilities

The HighPerformance package provides memory-efficient types like `StringPool`, `MemoryOwner<T>`, and `Ref<T>` for scenarios where allocation pressure matters.

```csharp
using System;
using System.Buffers;
using CommunityToolkit.HighPerformance;
using CommunityToolkit.HighPerformance.Buffers;

public class DataProcessor
{
    private static readonly StringPool _pool = new StringPool();

    public string InternString(ReadOnlySpan<char> input)
    {
        // Returns a cached string instance, reducing allocations
        return _pool.GetOrAdd(input);
    }

    public void ProcessLargeBuffer(int size)
    {
        // Rent a buffer from the pool and return it on dispose
        using var owner = MemoryOwner<byte>.Allocate(size);
        Span<byte> span = owner.Span;

        // Fill and process the span without allocating a new array
        span.Fill(0xFF);
        ProcessSpan(span);
    }

    public void TwoDimensionalAccess(int[] flat, int rows, int cols)
    {
        // View a flat array as a 2D span without copying
        var span2D = new Span2D<int>(flat, rows, cols);
        for (int r = 0; r < span2D.Height; r++)
        {
            for (int c = 0; c < span2D.Width; c++)
            {
                span2D[r, c] = r * cols + c;
            }
        }
    }

    private void ProcessSpan(Span<byte> data) { }
}
```

## Observable Validator

For view models that need validation, inherit from `ObservableValidator` to integrate `System.ComponentModel.DataAnnotations` with MVVM property change notification.

```csharp
using System.ComponentModel.DataAnnotations;
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;

public partial class RegistrationViewModel : ObservableValidator
{
    [ObservableProperty]
    [NotifyDataErrorInfo]
    [Required(ErrorMessage = "Email is required")]
    [EmailAddress(ErrorMessage = "Invalid email format")]
    private string _email = string.Empty;

    [ObservableProperty]
    [NotifyDataErrorInfo]
    [Required]
    [MinLength(8, ErrorMessage = "Password must be at least 8 characters")]
    private string _password = string.Empty;

    [RelayCommand]
    private void Submit()
    {
        ValidateAllProperties();

        if (!HasErrors)
        {
            // Proceed with registration
        }
    }
}
```

## Package Comparison

| Package | Purpose | Key Types |
|---------|---------|-----------|
| `CommunityToolkit.Mvvm` | MVVM infrastructure | `ObservableObject`, `RelayCommand`, `WeakReferenceMessenger` |
| `CommunityToolkit.Diagnostics` | Guard clauses, validation | `Guard`, `ThrowHelper` |
| `CommunityToolkit.HighPerformance` | Memory-efficient types | `StringPool`, `MemoryOwner<T>`, `Span2D<T>` |

## Best Practices

1. **Mark view model classes as `partial`** -- the source generators require partial classes to emit generated code alongside your declarations.
2. **Use `[NotifyPropertyChangedFor]` on fields** to trigger dependent property change notifications (e.g., a `FullName` computed from `FirstName` and `LastName`).
3. **Use `[NotifyCanExecuteChangedFor]` on fields** that affect command availability so the UI automatically re-evaluates `CanExecute` when those fields change.
4. **Prefer `WeakReferenceMessenger` over `StrongReferenceMessenger`** to avoid memory leaks from subscribers that are never explicitly unregistered.
5. **Use `Guard` methods at public API boundaries** and inside type constructors rather than scattering null checks throughout call sites.
6. **Activate `ObservableRecipient` via `IsActive = true`** to begin receiving messages -- forgetting this causes silent message loss.
7. **Use `ObservableValidator` instead of `ObservableObject`** when the view model needs input validation with `DataAnnotations` support.
8. **Pool strings with `StringPool`** in parsing or deserialization code where the same string values recur frequently to reduce GC pressure.
9. **Use `MemoryOwner<T>` instead of `ArrayPool<T>` directly** because it implements `IDisposable` and automatically returns the buffer on dispose, preventing pool exhaustion.
10. **Keep all generated code inspection in IDE** -- use "Go to Definition" on generated properties and commands to verify the emitted code matches your intent.
