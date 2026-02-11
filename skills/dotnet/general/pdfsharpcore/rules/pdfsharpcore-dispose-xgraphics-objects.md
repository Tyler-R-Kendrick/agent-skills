---
title: "Dispose `XGraphics` objects"
impact: MEDIUM
impactDescription: "general best practice"
tags: pdfsharpcore, dotnet, general, creating-pdf-documents-programmatically, drawing-textshapesimages-on-pdf-pages, modifying-existing-pdfs
---

## Dispose `XGraphics` objects

Dispose `XGraphics` objects: or use them within the scope of a single page -- create a new `XGraphics` for each page rather than reusing across pages.
