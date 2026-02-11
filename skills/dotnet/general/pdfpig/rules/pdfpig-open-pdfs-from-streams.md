---
title: "Open PDFs from streams"
impact: MEDIUM
impactDescription: "general best practice"
tags: pdfpig, dotnet, general, extracting-text-from-pdfs, reading-pdf-metadata, extracting-images-from-pdf-pages
---

## Open PDFs from streams

(`PdfDocument.Open(stream)`) in web applications rather than writing to temporary files, to reduce disk I/O and cleanup overhead.
