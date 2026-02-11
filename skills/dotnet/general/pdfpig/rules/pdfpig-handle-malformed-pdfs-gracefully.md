---
title: "Handle malformed PDFs gracefully"
impact: MEDIUM
impactDescription: "general best practice"
tags: pdfpig, dotnet, general, extracting-text-from-pdfs, reading-pdf-metadata, extracting-images-from-pdf-pages
---

## Handle malformed PDFs gracefully

Handle malformed PDFs gracefully: by wrapping `PdfDocument.Open` in a try/catch, since real-world PDFs often violate the specification.
