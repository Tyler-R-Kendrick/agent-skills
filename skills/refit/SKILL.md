---
description: Guidance for Refit type-safe REST library.
metadata:
  displayName: Refit
---

# Refit

## Overview
Refit turns REST APIs into live interfaces using attributes and source generators.

## Example
```csharp
public interface IGitHubApi
{
    [Get("/users/{user}")]
    Task<User> GetUserAsync(string user);
    
    [Post("/users")]
    Task<User> CreateUserAsync([Body] User user);
    
    [Get("/users/{user}/repos")]
    Task<List<Repository>> GetRepositoriesAsync(
        string user, 
        [Query] int page = 1);
}

// Usage
var api = RestService.For<IGitHubApi>("https://api.github.com");
var user = await api.GetUserAsync("octocat");
```

## Best Practices
- Define clear interfaces
- Use proper HTTP verbs
- Handle errors with try-catch
- Configure HttpClient with policies
- Use dependency injection
