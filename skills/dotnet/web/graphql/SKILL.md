---
description: Guidance for GraphQL API development in .NET.
metadata:
  displayName: GraphQL
---

# GraphQL

## Overview
GraphQL is a query language for APIs that allows clients to request exactly the data they need.

## Example with HotChocolate
```csharp
public class Query
{
    public async Task<User> GetUser(
        [Service] IUserRepository repo, 
        int id)
    {
        return await repo.GetByIdAsync(id);
    }
    
    public async Task<IEnumerable<Product>> GetProducts(
        [Service] IProductRepository repo)
    {
        return await repo.GetAllAsync();
    }
}

// Startup
services
    .AddGraphQLServer()
    .AddQueryType<Query>()
    .AddMutationType<Mutation>();
```

## Best Practices
- Design schema-first
- Implement DataLoader for N+1 prevention
- Use proper authorization
- Handle errors appropriately
- Version through schema evolution
