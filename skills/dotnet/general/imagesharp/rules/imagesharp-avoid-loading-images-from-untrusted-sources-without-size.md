---
title: "Avoid loading images from untrusted sources without size limits"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: imagesharp, dotnet, general, image-resizing, cropping, format-conversion
---

## Avoid loading images from untrusted sources without size limits

Avoid loading images from untrusted sources without size limits: malicious files can declare enormous dimensions in headers while being small on disk.
