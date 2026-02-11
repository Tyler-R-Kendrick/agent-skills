---
title: "Validate image dimensions before processing"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: imagesharp, dotnet, general, image-resizing, cropping, format-conversion
---

## Validate image dimensions before processing

Validate image dimensions before processing: by checking `image.Width` and `image.Height` against application-specific maximums to reject absurdly large uploads.
