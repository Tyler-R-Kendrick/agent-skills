---
title: "Validate PDF file headers"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: pdfpig, dotnet, general, extracting-text-from-pdfs, reading-pdf-metadata, extracting-images-from-pdf-pages
---

## Validate PDF file headers

Validate PDF file headers: before processing by checking the first bytes for `%PDF-` to reject non-PDF files early and avoid cryptic parsing errors.
