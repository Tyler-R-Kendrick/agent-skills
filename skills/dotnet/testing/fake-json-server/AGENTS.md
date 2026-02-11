# Fake JSON Server

## Overview
Tools and patterns for creating fake REST API servers for testing and development.

## Example with json-server
```json
// db.json
{
  "users": [
    { "id": 1, "name": "Alice", "email": "alice@example.com" },
    { "id": 2, "name": "Bob", "email": "bob@example.com" }
  ],
  "posts": [
    { "id": 1, "title": "Hello", "userId": 1 }
  ]
}
```

```bash
# Start server
npx json-server --watch db.json --port 3000
```

## .NET Alternative
```csharp
app.MapGet("/api/users", () => new[]
{
    new { Id = 1, Name = "Alice" },
    new { Id = 2, Name = "Bob" }
});
```

## Best Practices
- Use for frontend development
- Mock external APIs
- Generate realistic data
- Version your mock data
