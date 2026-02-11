---
title: "Process large PDFs page-by-page"
impact: MEDIUM
impactDescription: "general best practice"
tags: pdfpig, dotnet, general, extracting-text-from-pdfs, reading-pdf-metadata, extracting-images-from-pdf-pages
---

## Process large PDFs page-by-page

Process large PDFs page-by-page: rather than loading all text at once -- iterate with `document.GetPages()` and process each page independently.
