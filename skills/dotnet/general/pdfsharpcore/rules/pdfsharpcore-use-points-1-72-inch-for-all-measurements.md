---
title: "Use points (1/72 inch) for all measurements"
impact: MEDIUM
impactDescription: "general best practice"
tags: pdfsharpcore, dotnet, general, creating-pdf-documents-programmatically, drawing-textshapesimages-on-pdf-pages, modifying-existing-pdfs
---

## Use points (1/72 inch) for all measurements

Use points (1/72 inch) for all measurements: since PdfSharp uses points as its coordinate system -- convert from millimeters by multiplying by `72/25.4`.
