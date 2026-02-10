---
description: Guidance for SignalR usage.
metadata:
  displayName: SignalR
---

# SignalR

## Overview
Use SignalR for realtime messaging to web and desktop clients.

## Setup
```csharp
builder.Services.AddSignalR();
```

## Example
```csharp
var app = builder.Build();
app.MapHub<ChatHub>("/hubs/chat");
```

## Guidance
- Keep hub methods small and side-effect focused.
- Use groups for targeted broadcasts.
