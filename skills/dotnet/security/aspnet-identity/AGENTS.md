# ASP.NET Core Identity

## Overview
Use Identity API endpoints with `UserManager` and `SignInManager` for modern auth flows.

## Example
```csharp
builder.Services
	.AddIdentityCore<AppUser>()
	.AddEntityFrameworkStores<AppDbContext>()
	.AddApiEndpoints();

var app = builder.Build();
app.MapIdentityApi<AppUser>();
```

## Guidance
- Avoid custom password hashing.
- Prefer token providers built into Identity.