---
name: resources-localization
description: Guidance for resources and localization. Use when working with resources localization.
license: MIT
metadata:
  displayName: "Resources and Localization"
  author: "Tyler-R-Kendrick"
---

# Resources and Localization

## Overview
Use `.resx` files with `IStringLocalizer` to localize UI and messages.

## Setup
```csharp
builder.Services.AddLocalization(options => options.ResourcesPath = "Resources");
```

## Example
```csharp
public sealed class GreetingService(IStringLocalizer<GreetingService> localizer)
{
	public string Message() => localizer["WelcomeMessage"];
}
```

## Guidance
- Keep resource keys stable and descriptive.
- Use `IStringLocalizer<T>` to align resources with types.