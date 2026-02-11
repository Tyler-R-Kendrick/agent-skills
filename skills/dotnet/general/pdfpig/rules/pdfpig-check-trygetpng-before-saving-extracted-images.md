---
title: "Check `TryGetPng` before saving extracted images"
impact: MEDIUM
impactDescription: "general best practice"
tags: pdfpig, dotnet, general, extracting-text-from-pdfs, reading-pdf-metadata, extracting-images-from-pdf-pages
---

## Check `TryGetPng` before saving extracted images

Check `TryGetPng` before saving extracted images: because not all PDF image encodings can be converted to PNG; fall back to raw bytes for unsupported formats.
