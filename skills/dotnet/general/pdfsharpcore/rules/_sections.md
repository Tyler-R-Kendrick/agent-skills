# PdfSharpCore Rules

Best practices and rules for PdfSharpCore.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Dispose `XGraphics` objects | MEDIUM | [`pdfsharpcore-dispose-xgraphics-objects.md`](pdfsharpcore-dispose-xgraphics-objects.md) |
| 2 | Use `XRect` with `XStringFormats` for text alignment | MEDIUM | [`pdfsharpcore-use-xrect-with-xstringformats-for-text-alignment.md`](pdfsharpcore-use-xrect-with-xstringformats-for-text-alignment.md) |
| 3 | Calculate page overflow | MEDIUM | [`pdfsharpcore-calculate-page-overflow.md`](pdfsharpcore-calculate-page-overflow.md) |
| 4 | Pre-calculate table column widths | HIGH | [`pdfsharpcore-pre-calculate-table-column-widths.md`](pdfsharpcore-pre-calculate-table-column-widths.md) |
| 5 | Use consistent font instances | HIGH | [`pdfsharpcore-use-consistent-font-instances.md`](pdfsharpcore-use-consistent-font-instances.md) |
| 6 | Maintain aspect ratio when drawing images | MEDIUM | [`pdfsharpcore-maintain-aspect-ratio-when-drawing-images.md`](pdfsharpcore-maintain-aspect-ratio-when-drawing-images.md) |
| 7 | Open existing PDFs with `PdfDocumentOpenMode.Import` | MEDIUM | [`pdfsharpcore-open-existing-pdfs-with-pdfdocumentopenmode-import.md`](pdfsharpcore-open-existing-pdfs-with-pdfdocumentopenmode-import.md) |
| 8 | Save to a `MemoryStream` | MEDIUM | [`pdfsharpcore-save-to-a-memorystream.md`](pdfsharpcore-save-to-a-memorystream.md) |
| 9 | Use points (1/72 inch) for all measurements | MEDIUM | [`pdfsharpcore-use-points-1-72-inch-for-all-measurements.md`](pdfsharpcore-use-points-1-72-inch-for-all-measurements.md) |
| 10 | Test generated PDFs in multiple viewers | MEDIUM | [`pdfsharpcore-test-generated-pdfs-in-multiple-viewers.md`](pdfsharpcore-test-generated-pdfs-in-multiple-viewers.md) |
