---
name: globalization-localization
description: Guidance for globalization and localization in .NET. Use when working with globalization localization.
license: MIT
metadata:
  displayName: "Globalization and Localization"
  author: "Tyler-R-Kendrick"
---

# Globalization and Localization

## Overview
Use culture-aware formatting and localization middleware for user-facing apps.

## Example
```csharp
builder.Services.AddLocalization();

var app = builder.Build();
var supportedCultures = new[] { "en-US", "fr-FR" };

var options = new RequestLocalizationOptions()
	.SetDefaultCulture(supportedCultures[0])
	.AddSupportedCultures(supportedCultures)
	.AddSupportedUICultures(supportedCultures);

app.UseRequestLocalization(options);
```

## Guidance
- Store neutral resource strings and format with culture.
- Use `CultureInfo` for parsing and formatting user input.