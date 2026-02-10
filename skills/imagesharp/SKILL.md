---
description: Guidance for ImageSharp image processing library.
metadata:
  displayName: ImageSharp
---

# ImageSharp

## Overview
ImageSharp is a cross-platform library for image processing in .NET.

## Example
```csharp
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Processing;

// Load and resize
using var image = Image.Load("input.jpg");
image.Mutate(x => x.Resize(800, 600));
await image.SaveAsync("output.jpg");

// Apply effects
image.Mutate(x => x
    .Grayscale()
    .GaussianBlur(5)
    .Rotate(45));

// Watermark
using var watermark = Image.Load("logo.png");
image.Mutate(x => x.DrawImage(watermark, new Point(10, 10), 0.5f));
```

## Best Practices
- Dispose images properly
- Use async methods
- Configure memory limits
- Optimize for performance
- Validate inputs
