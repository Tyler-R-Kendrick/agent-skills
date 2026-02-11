---
name: restsharp
description: Guidance for RestSharp REST client library.
metadata:
  displayName: RestSharp
---

# RestSharp

## Overview
RestSharp is a simple REST and HTTP API client library for .NET with automatic serialization.

## Example
```csharp
using RestSharp;

var client = new RestClient("https://api.example.com");

// GET request
var request = new RestRequest("users/{id}", Method.Get);
request.AddUrlSegment("id", 123);

var response = await client.ExecuteAsync<User>(request);
var user = response.Data;

// POST request
var postRequest = new RestRequest("users", Method.Post);
postRequest.AddJsonBody(new User { Name = "John" });

var postResponse = await client.ExecuteAsync<User>(postRequest);
```

## Best Practices
- Reuse RestClient instances
- Configure timeout appropriately
- Handle errors properly
- Use authenticators for auth
- Consider HttpClient for new projects
- Add retry policies with Polly
