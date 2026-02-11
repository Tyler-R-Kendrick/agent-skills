# Handlebars.NET

## Overview
Handlebars.NET is a .NET port of the Handlebars.js templating engine.

## Example
```csharp
using HandlebarsDotNet;

// Compile template
var template = Handlebars.Compile("Hello {{name}}!");
var result = template(new { name = "World" });

// With helpers
Handlebars.RegisterHelper("loud", (writer, context, parameters) =>
{
    writer.WriteSafeString(parameters[0].ToString().ToUpper());
});

var helperTemplate = Handlebars.Compile("{{loud message}}");
var output = helperTemplate(new { message = "hello" });  // "HELLO"

// Block helpers
var listTemplate = Handlebars.Compile(@"
<ul>
{{#each items}}
  <li>{{this}}</li>
{{/each}}
</ul>");
```

## Best Practices
- Register custom helpers
- Use partials for reusability
- Compile templates once
- Escape HTML by default
