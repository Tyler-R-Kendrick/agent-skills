---
name: olive
description: >
  Guidance for Olive productivity framework for .NET.
  USE FOR: common string extensions (null-safe operations, validation), collection utilities, date/time helpers, file name sanitization, fluent API helpers, reducing boilerplate in business applications.
  DO NOT USE FOR: full web frameworks (use ASP.NET Core), ORM functionality (use EF Core), UI frameworks, large-scale enterprise architecture.
license: MIT
metadata:
  displayName: Olive
  author: "Tyler-R-Kendrick"
  version: "1.0.0"
compatibility:
  - claude
  - copilot
  - cursor
---

# Olive

## Overview

Olive is a productivity framework for .NET developed by Geeks Ltd. It provides a comprehensive set of extension methods and utility classes that reduce boilerplate in business application development. The framework covers string manipulation, collection operations, date/time helpers, validation utilities, file handling, and more.

Olive's philosophy is to make common operations fluent and null-safe through extension methods. Instead of writing defensive null checks and multi-line utility methods, Olive provides concise, chainable operations that handle edge cases like null or empty inputs gracefully.

Install via NuGet:
```
dotnet add package Olive
```

## String Extensions

Olive provides null-safe string operations that eliminate defensive coding patterns.

```csharp
using Olive;

// Null-safe operations
string? nullStr = null;
string result = nullStr.OrEmpty();                // ""
string trimmed = nullStr.TrimOrNull();            // null
string defaulted = nullStr.Or("default");         // "default"

// String validation
bool isEmail = "user@example.com".IsValidEmail(); // true
bool isUrl = "https://example.com".IsValidUrl();  // true
bool hasValue = "hello".HasValue();               // true
bool isEmpty = "".IsEmpty();                      // true

// Transformations
string safe = "my file (1).txt".ToSafeFileName(); // sanitized for filesystem
string pascal = "hello world".ToPascalCase();      // "HelloWorld"
string camel = "hello world".ToCamelCase();        // "helloWorld"

// Truncation and wrapping
string truncated = "A very long string that needs truncating".Summarize(20);
string wrapped = "content".WithWrappers("<b>", "</b>"); // "<b>content</b>"

// Contains and comparison
bool contains = "Hello World".Contains("world", caseSensitive: false); // true
string removed = "Hello World".Remove("World");   // "Hello "
string replaced = "foo-bar-baz".RemoveFrom("-");   // "foo"
```

## Collection Extensions

Fluent collection operations with null safety and LINQ enhancements.

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using Olive;

var items = new List<string> { "apple", "banana", "cherry", "date" };

// Null-safe enumeration
List<string>? nullList = null;
var safe = nullList.OrEmpty(); // returns empty enumerable, not null

// Fluent operations
string joined = items.ToString(", ");             // "apple, banana, cherry, date"
bool hasAny = items.HasAny();                     // true
bool none = items.None();                         // false

// Batch processing
var batches = items.ChunkBy(2); // [[apple, banana], [cherry, date]]

// Distinct by selector
var people = new[]
{
    new { Name = "Alice", Dept = "IT" },
    new { Name = "Bob", Dept = "IT" },
    new { Name = "Carol", Dept = "HR" }
};
var distinctByDept = people.DistinctBy(p => p.Dept);

// Add/remove fluently
var extended = items.Concat("elderberry").ToList();
var without = items.Except("banana").ToList();

// Safe indexing
var firstOrNull = items.FirstOrDefault();
```

## Date and Time Helpers

Simplified date arithmetic and formatting extensions.

```csharp
using System;
using Olive;

var now = DateTime.Now;

// Relative dates
var tomorrow = now.AddDays(1);
var nextWeek = now.AddDays(7);

// Fluent date construction
var specificDate = 15.June(2025);   // June 15, 2025
var christmas = 25.December(2025);

// Time rounding
var rounded = now.RoundToNearest(TimeSpan.FromMinutes(15));

// Date checks
bool isWeekend = now.IsWeekend();
bool isWeekday = now.IsWeekday();
bool isToday = specificDate.IsToday();

// Range operations
bool isBetween = now.IsBetween(
    new DateTime(2025, 1, 1),
    new DateTime(2025, 12, 31));

// Formatting
string relative = tomorrow.ToTimeDifferenceString(); // "tomorrow"
string friendly = now.ToFriendlyDateString();
```

## Type Conversion Extensions

Safe type conversion utilities that handle parsing with fallbacks.

```csharp
using Olive;

// Safe parsing with defaults
int number = "42".To<int>();              // 42
int fallback = "not-a-number".To<int>();  // 0 (default)
double price = "19.99".To<double>();      // 19.99

// Nullable parsing
int? nullable = "42".ToIntOrNull();       // 42
int? nullResult = "abc".ToIntOrNull();    // null
double? dbl = "3.14".ToDoubleOrNull();    // 3.14

// Boolean parsing
bool yes = "yes".ToBoolean();             // true
bool one = "1".ToBoolean();               // true
bool trueStr = "true".ToBoolean();        // true

// Enum parsing
var status = "Active".To<Status>();

public enum Status { Active, Inactive, Pending }
```

## IO and File Utilities

File system operations with safety and convenience methods.

```csharp
using System.IO;
using Olive;

// Safe file name generation
string safeName = "Report (Q1/2025).pdf".ToSafeFileName();
// Removes or replaces invalid characters

// File extension checking
bool isPdf = "document.pdf".HasExtension(".pdf"); // true
string noExt = "document.pdf".TrimEnd(".pdf");

// Directory operations
var tempDir = Path.GetTempPath();
var appDir = Path.Combine(tempDir, "MyApp");

// Ensure directory exists
Directory.CreateDirectory(appDir);

// Path combination (null-safe)
string fullPath = new[] { tempDir, "MyApp", "data", "file.json" }
    .Where(p => p.HasValue())
    .Aggregate(Path.Combine);
```

## Building Services with Olive Extensions

Integrate Olive utilities into service classes for cleaner business logic.

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using Olive;

public class CustomerService
{
    public IReadOnlyList<Customer> Search(string? query, string? department)
    {
        var customers = GetAllCustomers();

        return customers
            .Where(c => query.IsEmpty() || c.Name.Contains(query, caseSensitive: false))
            .Where(c => department.IsEmpty() || c.Department.OrEmpty() == department)
            .OrderBy(c => c.Name)
            .ToList();
    }

    public string FormatCustomerSummary(Customer customer)
    {
        var parts = new[]
        {
            customer.Name,
            customer.Email.HasValue() ? $"({customer.Email})" : null,
            customer.Department.Or("Unassigned")
        };

        return parts.Where(p => p.HasValue()).ToString(" ");
    }

    public ValidationResult Validate(CustomerInput input)
    {
        var errors = new List<string>();

        if (input.Name.IsEmpty())
            errors.Add("Name is required");

        if (input.Email.HasValue() && !input.Email.IsValidEmail())
            errors.Add("Invalid email format");

        return new ValidationResult(errors.None(), errors);
    }

    private IEnumerable<Customer> GetAllCustomers() => Enumerable.Empty<Customer>();
}

public record Customer(string Name, string? Email, string? Department);
public record CustomerInput(string? Name, string? Email);
public record ValidationResult(bool IsValid, IReadOnlyList<string> Errors);
```

## Olive vs Standard .NET

| Operation | Standard .NET | Olive |
|-----------|--------------|-------|
| Null-safe string | `str ?? string.Empty` | `str.OrEmpty()` |
| Email validation | Regex or MailAddress parse | `str.IsValidEmail()` |
| Safe file name | Manual char replacement | `str.ToSafeFileName()` |
| Collection join | `string.Join(", ", list)` | `list.ToString(", ")` |
| Null-safe enumeration | `list ?? Enumerable.Empty<T>()` | `list.OrEmpty()` |
| Type conversion | `int.TryParse(str, out var n)` | `str.To<int>()` |
| Date check | `date.DayOfWeek == ...` | `date.IsWeekend()` |

## Best Practices

1. **Use `OrEmpty()` and `Or("default")` at API boundaries** to convert nullable strings into safe values immediately, eliminating null-check boilerplate in downstream code.
2. **Prefer `.HasValue()` over `!string.IsNullOrWhiteSpace()`** for readability and consistency with Olive's fluent style throughout your codebase.
3. **Use `.IsValidEmail()` for quick input validation** but supplement with actual email delivery verification for critical flows, since format validation alone is insufficient.
4. **Apply `.ToSafeFileName()` on all user-provided file names** before writing to disk to prevent path traversal and invalid character errors.
5. **Use `.To<T>()` for configuration parsing** where missing or invalid values should silently default, and `.ToIntOrNull()` when you need to detect and report invalid input.
6. **Avoid mixing Olive extensions with standard LINQ carelessly** -- pick a consistent style within each service class so the code reads uniformly.
7. **Use `.OrEmpty()` on collection parameters** at the start of methods to avoid null-reference exceptions when callers pass null collections.
8. **Prefer Olive's `.ToString(separator)` on collections** over `string.Join()` for consistency with the fluent extension method style.
9. **Keep Olive usage in application/service layers** rather than in domain entities, since domain types should be self-validating and not depend on utility extensions.
10. **Pin the Olive NuGet version** in your project to avoid breaking changes across minor versions, since the library evolves its API surface actively.
