---
description: Guidance for OpenAPI (Swagger) documentation.
metadata:
  displayName: OpenAPI
---

# OpenAPI

## Overview
OpenAPI (formerly Swagger) provides API documentation and client generation from API specifications.

## Example
```csharp
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "My API",
        Version = "v1"
    });
    
    var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    options.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, xmlFile));
});

app.UseSwagger();
app.UseSwaggerUI();

/// <summary>
/// Gets a user by ID
/// </summary>
[HttpGet("{id}")]
[ProducesResponseType<User>(StatusCodes.Status200OK)]
public async Task<IActionResult> GetUser(int id) { }
```

## Best Practices
- Include XML comments
- Use ProducesResponseType attributes
- Version your API
- Document security requirements
