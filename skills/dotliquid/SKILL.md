---
description: Guidance for DotLiquid template engine.
metadata:
  displayName: DotLiquid
---

# DotLiquid

## Overview
DotLiquid is a .NET port of the Liquid template engine, providing safe user-generated templates.

## Example
```csharp
using DotLiquid;

// Template
var template = Template.Parse("Hello {{ name }}!");
var output = template.Render(Hash.FromAnonymousObject(new { name = "World" }));

// Complex template
var orderTemplate = Template.Parse(@"
Order #{{ order.id }}
{% for item in order.items %}
  - {{ item.name }}: ${{ item.price }}
{% endfor %}
Total: ${{ order.total }}
");

var result = orderTemplate.Render(Hash.FromAnonymousObject(new
{
    order = new
    {
        id = 123,
        items = new[] {
            new { name = "Item 1", price = 10.00 },
            new { name = "Item 2", price = 20.00 }
        },
        total = 30.00
    }
}));
```

## Best Practices
- Register custom filters
- Use for user-generated templates
- Validate template syntax
- Cache compiled templates
