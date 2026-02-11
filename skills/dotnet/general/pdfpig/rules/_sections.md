# PdfPig Rules

Best practices and rules for PdfPig.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Always wrap `PdfDocument` in a `using` statement | CRITICAL | [`pdfpig-always-wrap-pdfdocument-in-a-using-statement.md`](pdfpig-always-wrap-pdfdocument-in-a-using-statement.md) |
| 2 | Use `GetWords()` instead of `page.Text` | MEDIUM | [`pdfpig-use-getwords-instead-of-page-text.md`](pdfpig-use-getwords-instead-of-page-text.md) |
| 3 | Handle malformed PDFs gracefully | MEDIUM | [`pdfpig-handle-malformed-pdfs-gracefully.md`](pdfpig-handle-malformed-pdfs-gracefully.md) |
| 4 | Process large PDFs page-by-page | MEDIUM | [`pdfpig-process-large-pdfs-page-by-page.md`](pdfpig-process-large-pdfs-page-by-page.md) |
| 5 | Use bounding box coordinates for region-based extraction | MEDIUM | [`pdfpig-use-bounding-box-coordinates-for-region-based-extraction.md`](pdfpig-use-bounding-box-coordinates-for-region-based-extraction.md) |
| 6 | Normalize extracted text | MEDIUM | [`pdfpig-normalize-extracted-text.md`](pdfpig-normalize-extracted-text.md) |
| 7 | Group words into lines by Y-coordinate | MEDIUM | [`pdfpig-group-words-into-lines-by-y-coordinate.md`](pdfpig-group-words-into-lines-by-y-coordinate.md) |
| 8 | Open PDFs from streams | MEDIUM | [`pdfpig-open-pdfs-from-streams.md`](pdfpig-open-pdfs-from-streams.md) |
| 9 | Check `TryGetPng` before saving extracted images | MEDIUM | [`pdfpig-check-trygetpng-before-saving-extracted-images.md`](pdfpig-check-trygetpng-before-saving-extracted-images.md) |
| 10 | Validate PDF file headers | HIGH | [`pdfpig-validate-pdf-file-headers.md`](pdfpig-validate-pdf-file-headers.md) |
