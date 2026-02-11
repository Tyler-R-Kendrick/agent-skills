---
name: handlebars-net
description: >
  Guidance for Handlebars.NET template engine for .NET.
  USE FOR: logic-less HTML templating, email template rendering, code generation templates, report formatting, Mustache-compatible templates with helpers and partials.
  DO NOT USE FOR: sandboxed user-generated templates (use DotLiquid), full C# expression templates (use Razor), complex data transformations, server-side view rendering in ASP.NET.
license: MIT
metadata:
  displayName: Handlebars.NET
  author: "Tyler-R-Kendrick"
  version: "1.0.0"
compatibility:
  - claude
  - copilot
  - cursor
references:
  - title: "Handlebars.Net GitHub Repository"
    url: "https://github.com/Handlebars-Net/Handlebars.Net"
  - title: "Handlebars.Net NuGet Package"
    url: "https://www.nuget.org/packages/Handlebars.Net"
---

# Handlebars.NET

## Overview

Handlebars.NET is a .NET implementation of the Handlebars.js templating engine. It provides a logic-less template syntax with `{{expression}}` for output and `{{#helper}}` for block constructs. Templates are compiled into delegates for fast repeated rendering.

Handlebars.NET supports helpers (custom functions callable from templates), partials (reusable template fragments), and block helpers (custom block-level constructs). It is compatible with Mustache templates and extends them with helpers and more expressive iteration.

Install via NuGet:
```
dotnet add package Handlebars.Net
```

## Basic Template Compilation and Rendering

Compile a template string into a reusable delegate, then invoke it with a data object.

```csharp
using HandlebarsDotNet;

// Compile once, render many times
var template = Handlebars.Compile("Hello, {{name}}! You have {{count}} notifications.");

var result = template(new { name = "Alice", count = 7 });
// result: "Hello, Alice! You have 7 notifications."

// With nested objects
var orderTemplate = Handlebars.Compile(
    "Order #{{order.id}} placed by {{order.customer.name}} on {{order.date}}");

var output = orderTemplate(new
{
    order = new
    {
        id = 1042,
        customer = new { name = "Bob Smith" },
        date = "2025-01-15"
    }
});
```

## Iteration and Conditionals

Use `{{#each}}` for collections and `{{#if}}`/`{{#unless}}` for conditionals.

```csharp
using HandlebarsDotNet;

var reportTemplate = Handlebars.Compile(@"
<h1>{{title}}</h1>
{{#if hasItems}}
<table>
  <tr><th>Product</th><th>Price</th><th>Qty</th></tr>
  {{#each items}}
  <tr>
    <td>{{this.name}}</td>
    <td>${{this.price}}</td>
    <td>{{this.quantity}}</td>
  </tr>
  {{/each}}
</table>
{{else}}
<p>No items found.</p>
{{/if}}
<p>Generated: {{generatedAt}}</p>
");

var html = reportTemplate(new
{
    title = "Inventory Report",
    hasItems = true,
    items = new[]
    {
        new { name = "Widget A", price = 12.50, quantity = 100 },
        new { name = "Widget B", price = 8.75, quantity = 250 },
        new { name = "Gadget C", price = 45.00, quantity = 30 }
    },
    generatedAt = DateTime.UtcNow.ToString("yyyy-MM-dd HH:mm:ss")
});
```

## Custom Helpers

Register helper functions that can be called from templates. Helpers receive the writer, context, and parameters.

```csharp
using System;
using System.IO;
using HandlebarsDotNet;

// Inline helper (returns a value)
Handlebars.RegisterHelper("uppercase", (writer, context, parameters) =>
{
    writer.WriteSafeString(parameters[0]?.ToString()?.ToUpperInvariant() ?? string.Empty);
});

// Formatting helper
Handlebars.RegisterHelper("currency", (writer, context, parameters) =>
{
    if (parameters.Length > 0 && decimal.TryParse(parameters[0]?.ToString(), out var amount))
    {
        var symbol = parameters.Length > 1 ? parameters[1]?.ToString() : "$";
        writer.WriteSafeString($"{symbol}{amount:N2}");
    }
});

// Date formatting helper
Handlebars.RegisterHelper("formatDate", (writer, context, parameters) =>
{
    if (parameters.Length > 0 && DateTime.TryParse(parameters[0]?.ToString(), out var date))
    {
        var format = parameters.Length > 1 ? parameters[1]?.ToString() : "yyyy-MM-dd";
        writer.WriteSafeString(date.ToString(format));
    }
});

var template = Handlebars.Compile(
    "{{uppercase name}} owes {{currency balance}} as of {{formatDate dueDate \"MMMM dd, yyyy\"}}");

var output = template(new { name = "alice", balance = 1234.50m, dueDate = "2025-06-15" });
// Output: "ALICE owes $1,234.50 as of June 15, 2025"
```

## Block Helpers

Block helpers wrap a section of template content and can conditionally render the block or iterate over it.

```csharp
using HandlebarsDotNet;

// Conditional block helper
Handlebars.RegisterHelper("ifEqual", (output, options, context, arguments) =>
{
    if (arguments.Length >= 2 &&
        arguments[0]?.ToString() == arguments[1]?.ToString())
    {
        options.Template(output, context);
    }
    else
    {
        options.Inverse(output, context);
    }
});

var template = Handlebars.Compile(@"
{{#ifEqual status ""active""}}
  <span class=""badge-success"">Active</span>
{{else}}
  <span class=""badge-danger"">Inactive</span>
{{/ifEqual}}
");

var html = template(new { status = "active" });
```

## Partials (Reusable Fragments)

Register reusable template fragments as partials and include them with `{{> partialName}}`.

```csharp
using HandlebarsDotNet;

// Register partials
Handlebars.RegisterTemplate("header", @"
<header>
  <h1>{{title}}</h1>
  <nav>{{#each navItems}}<a href=""{{url}}"">{{label}}</a>{{/each}}</nav>
</header>");

Handlebars.RegisterTemplate("userCard", @"
<div class=""user-card"">
  <strong>{{name}}</strong>
  <span>{{email}}</span>
</div>");

// Use partials in a page template
var pageTemplate = Handlebars.Compile(@"
<!DOCTYPE html>
<html>
{{> header}}
<body>
  <h2>Team Members</h2>
  {{#each members}}
  {{> userCard}}
  {{/each}}
</body>
</html>");

var page = pageTemplate(new
{
    title = "Team Directory",
    navItems = new[]
    {
        new { url = "/", label = "Home" },
        new { url = "/team", label = "Team" }
    },
    members = new[]
    {
        new { name = "Alice", email = "alice@example.com" },
        new { name = "Bob", email = "bob@example.com" }
    }
});
```

## Using IHandlebars for Isolated Environments

Create isolated Handlebars environments with their own helpers and partials instead of using the global static instance.

```csharp
using HandlebarsDotNet;

public class EmailRenderer
{
    private readonly IHandlebars _handlebars;

    public EmailRenderer()
    {
        _handlebars = Handlebars.Create();

        _handlebars.RegisterHelper("nl2br", (writer, context, parameters) =>
        {
            var text = parameters[0]?.ToString() ?? string.Empty;
            writer.WriteSafeString(text.Replace("\n", "<br/>"));
        });

        _handlebars.RegisterTemplate("emailFooter", @"
<footer>
  <p>This email was sent by {{companyName}}</p>
  <p><a href=""{{unsubscribeUrl}}"">Unsubscribe</a></p>
</footer>");
    }

    public string Render(string templateSource, object data)
    {
        var compiled = _handlebars.Compile(templateSource);
        return compiled(data);
    }
}
```

## Handlebars.NET vs Other Template Engines

| Feature | Handlebars.NET | DotLiquid | Scriban | Razor |
|---------|---------------|-----------|---------|-------|
| Syntax origin | Handlebars.js | Shopify Liquid | Custom | C#/HTML |
| Logic-less | Yes (helpers extend) | Yes | No | No |
| Sandboxed | No | Yes | Optional | No |
| Compiled delegates | Yes | No | Yes | Yes |
| Custom helpers | Yes | Filters only | Yes | Tag helpers |
| Partials | Yes | Includes | Yes | Partial views |

## Best Practices

1. **Compile templates once and cache the resulting delegate** -- `Handlebars.Compile` parses and compiles the template, so repeated compilation wastes CPU.
2. **Use `Handlebars.Create()` for isolated environments** instead of the global `Handlebars` static when different parts of your application need different helpers or partials.
3. **Register helpers at application startup** rather than per-request, since helper registration modifies shared state.
4. **Use `WriteSafeString` in helpers for pre-escaped HTML** to avoid double-encoding; use `Write` for values that should be HTML-escaped.
5. **Extract repeated template fragments into partials** with `RegisterTemplate` to keep templates DRY and maintainable.
6. **Prefer block helpers over complex conditional nesting** to keep template logic readable and testable.
7. **Validate template syntax at startup** by compiling all templates during initialization and failing fast if any template has syntax errors.
8. **Use strongly-typed models** instead of anonymous objects for production code so that property name refactoring does not silently break templates.
9. **Avoid deeply nested context paths** like `{{../../parent.child.value}}` -- flatten the data model or use helpers to simplify access.
10. **Test templates with representative data** including empty collections, null values, and missing properties to ensure graceful degradation.
