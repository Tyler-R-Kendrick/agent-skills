---
title: "Always wrap `PdfDocument` in a `using` statement"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: pdfpig, dotnet, general, extracting-text-from-pdfs, reading-pdf-metadata, extracting-images-from-pdf-pages
---

## Always wrap `PdfDocument` in a `using` statement

Always wrap `PdfDocument` in a `using` statement: because it holds file handles and internal buffers that must be released.
