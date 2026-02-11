---
name: pdfpig
description: >
  Guidance for PdfPig PDF reading and content extraction library for .NET.
  USE FOR: extracting text from PDFs, reading PDF metadata, extracting images from PDF pages, word-level and letter-level text extraction, searching PDF content, analyzing PDF document structure.
  DO NOT USE FOR: creating or generating PDFs (use PdfSharpCore or QuestPDF), editing existing PDFs, PDF form filling, rendering PDFs to images.
license: MIT
metadata:
  displayName: PdfPig
  author: "Tyler-R-Kendrick"
  version: "1.0.0"
compatibility:
  - claude
  - copilot
  - cursor
---

# PdfPig

## Overview

PdfPig is a fully managed .NET library for reading and extracting content from PDF documents. It provides access to text (at page, word, and letter levels), images, annotations, and document metadata. PdfPig does not depend on native libraries or external tools, making it fully cross-platform.

PdfPig is read-only -- it parses and extracts content from existing PDFs but does not create or modify them. For PDF generation, use PdfSharpCore or QuestPDF. PdfPig is particularly useful for document processing pipelines, search indexing, data extraction, and PDF content analysis.

Install via NuGet:
```
dotnet add package PdfPig
```

## Basic Text Extraction

Open a PDF and extract text from each page.

```csharp
using UglyToad.PdfPig;

using var document = PdfDocument.Open("report.pdf");

Console.WriteLine($"Pages: {document.NumberOfPages}");

foreach (var page in document.GetPages())
{
    Console.WriteLine($"--- Page {page.Number} ---");
    Console.WriteLine($"Size: {page.Width:F0}x{page.Height:F0}");
    Console.WriteLine(page.Text);
    Console.WriteLine();
}
```

## Word-Level Extraction

Extract individual words with their positions for structured text analysis.

```csharp
using System.Linq;
using UglyToad.PdfPig;
using UglyToad.PdfPig.Content;

using var document = PdfDocument.Open("invoice.pdf");
var page = document.GetPage(1);

// Get all words on the page
var words = page.GetWords().ToList();

Console.WriteLine($"Word count: {words.Count}");

foreach (var word in words.Take(20))
{
    Console.WriteLine(
        $"  \"{word.Text}\" at ({word.BoundingBox.Left:F1}, {word.BoundingBox.Bottom:F1}) " +
        $"font: {word.FontName}, size: {word.Letters.First().PointSize:F1}pt");
}

// Find words in a specific region (e.g., top-right for invoice number)
var topRightWords = words
    .Where(w => w.BoundingBox.Left > page.Width * 0.6
             && w.BoundingBox.Top > page.Height * 0.8)
    .OrderByDescending(w => w.BoundingBox.Top)
    .ThenBy(w => w.BoundingBox.Left);

Console.WriteLine("\nTop-right region:");
foreach (var word in topRightWords)
{
    Console.Write($"{word.Text} ");
}
```

## Extracting Text by Region

Extract text from specific rectangular regions of a page for structured document parsing.

```csharp
using System.Linq;
using UglyToad.PdfPig;
using UglyToad.PdfPig.Core;

using var document = PdfDocument.Open("form.pdf");
var page = document.GetPage(1);

// Define a region of interest (coordinates from bottom-left)
var region = new PdfRectangle(50, 700, 300, 750); // left, bottom, right, top

var wordsInRegion = page.GetWords()
    .Where(w => region.Contains(w.BoundingBox.BottomLeft))
    .OrderBy(w => w.BoundingBox.Left);

string regionText = string.Join(" ", wordsInRegion.Select(w => w.Text));
Console.WriteLine($"Text in region: {regionText}");

// Extract table-like data by defining column boundaries
double[] columnBoundaries = { 50, 200, 350, 500 };
var rows = page.GetWords()
    .GroupBy(w => Math.Round(w.BoundingBox.Bottom / 15) * 15) // group by line
    .OrderByDescending(g => g.Key)
    .Select(row => columnBoundaries
        .Select((colStart, i) =>
        {
            var colEnd = i < columnBoundaries.Length - 1
                ? columnBoundaries[i + 1]
                : page.Width;
            return string.Join(" ", row
                .Where(w => w.BoundingBox.Left >= colStart && w.BoundingBox.Left < colEnd)
                .OrderBy(w => w.BoundingBox.Left)
                .Select(w => w.Text));
        })
        .ToArray());

foreach (var row in rows)
{
    Console.WriteLine(string.Join(" | ", row));
}
```

## Searching PDF Content

Search for specific text across all pages of a PDF.

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using UglyToad.PdfPig;

public class PdfSearcher
{
    public IReadOnlyList<SearchResult> Search(string filePath, string searchTerm)
    {
        var results = new List<SearchResult>();

        using var document = PdfDocument.Open(filePath);
        foreach (var page in document.GetPages())
        {
            // Full-text search
            if (page.Text.Contains(searchTerm, StringComparison.OrdinalIgnoreCase))
            {
                // Find the specific words matching
                var matchingWords = page.GetWords()
                    .Where(w => w.Text.Contains(searchTerm, StringComparison.OrdinalIgnoreCase))
                    .Select(w => new SearchResult(
                        page.Number,
                        w.Text,
                        w.BoundingBox.Left,
                        w.BoundingBox.Bottom))
                    .ToList();

                results.AddRange(matchingWords);
            }
        }

        return results;
    }
}

public record SearchResult(int PageNumber, string MatchedText, double X, double Y);

// Usage
var searcher = new PdfSearcher();
var matches = searcher.Search("contract.pdf", "payment");
foreach (var match in matches)
{
    Console.WriteLine($"Page {match.PageNumber}: \"{match.MatchedText}\" at ({match.X:F0}, {match.Y:F0})");
}
```

## Extracting Images

Extract images embedded in PDF pages.

```csharp
using System.IO;
using System.Linq;
using UglyToad.PdfPig;

using var document = PdfDocument.Open("brochure.pdf");

int imageCount = 0;
foreach (var page in document.GetPages())
{
    var images = page.GetImages().ToList();
    Console.WriteLine($"Page {page.Number}: {images.Count} images");

    foreach (var image in images)
    {
        imageCount++;
        Console.WriteLine(
            $"  Image {imageCount}: {image.WidthInSamples}x{image.HeightInSamples}, " +
            $"Bounds: ({image.Bounds.Left:F0}, {image.Bounds.Bottom:F0})");

        // Save raw image bytes
        if (image.TryGetPng(out var pngBytes))
        {
            File.WriteAllBytes($"image_{imageCount}.png", pngBytes);
        }
        else
        {
            File.WriteAllBytes($"image_{imageCount}.raw", image.RawBytes.ToArray());
        }
    }
}
```

## Reading Document Metadata

Access PDF document properties and metadata.

```csharp
using UglyToad.PdfPig;

using var document = PdfDocument.Open("document.pdf");
var info = document.Information;

Console.WriteLine($"Title: {info.Title}");
Console.WriteLine($"Author: {info.Author}");
Console.WriteLine($"Subject: {info.Subject}");
Console.WriteLine($"Creator: {info.Creator}");
Console.WriteLine($"Producer: {info.Producer}");
Console.WriteLine($"Created: {info.CreatedDate}");
Console.WriteLine($"Modified: {info.ModifiedDate}");
Console.WriteLine($"Pages: {document.NumberOfPages}");
Console.WriteLine($"PDF Version: {document.Version}");
```

## Processing PDFs as a Service

Wrap PdfPig in a DI-friendly service for document processing pipelines.

```csharp
using System.Collections.Generic;
using System.IO;
using System.Linq;
using UglyToad.PdfPig;

public interface IPdfExtractor
{
    PdfContent Extract(Stream pdfStream);
    PdfContent Extract(string filePath);
}

public record PdfContent(
    string FullText,
    IReadOnlyList<PageContent> Pages,
    DocumentInfo Metadata);

public record PageContent(int Number, string Text, int WordCount);
public record DocumentInfo(string? Title, string? Author, int PageCount);

public class PdfPigExtractor : IPdfExtractor
{
    public PdfContent Extract(string filePath)
    {
        using var stream = File.OpenRead(filePath);
        return Extract(stream);
    }

    public PdfContent Extract(Stream pdfStream)
    {
        using var document = PdfDocument.Open(pdfStream);

        var pages = document.GetPages()
            .Select(p => new PageContent(
                p.Number,
                p.Text,
                p.GetWords().Count()))
            .ToList();

        var fullText = string.Join("\n\n", pages.Select(p => p.Text));

        var metadata = new DocumentInfo(
            document.Information.Title,
            document.Information.Author,
            document.NumberOfPages);

        return new PdfContent(fullText, pages, metadata);
    }
}

// DI registration
// builder.Services.AddTransient<IPdfExtractor, PdfPigExtractor>();
```

## PdfPig vs Other PDF Libraries

| Feature | PdfPig | iTextSharp | PdfSharpCore | QuestPDF |
|---------|--------|------------|--------------|---------|
| Read text | Yes | Yes | Limited | No |
| Read images | Yes | Yes | No | No |
| Create PDFs | No | Yes | Yes | Yes |
| Edit PDFs | No | Yes | Yes | No |
| Managed only | Yes | Yes | Yes | Yes |
| License | Apache 2.0 | AGPL/Commercial | MIT | MIT |

## Best Practices

1. **Always wrap `PdfDocument` in a `using` statement** because it holds file handles and internal buffers that must be released.
2. **Use `GetWords()` instead of `page.Text`** when you need structured text with positions, font information, or region-based extraction.
3. **Handle malformed PDFs gracefully** by wrapping `PdfDocument.Open` in a try/catch, since real-world PDFs often violate the specification.
4. **Process large PDFs page-by-page** rather than loading all text at once -- iterate with `document.GetPages()` and process each page independently.
5. **Use bounding box coordinates for region-based extraction** when parsing structured documents (invoices, forms) where text position determines meaning.
6. **Normalize extracted text** by trimming whitespace, collapsing multiple spaces, and handling line breaks, since PDF text extraction often produces inconsistent spacing.
7. **Group words into lines by Y-coordinate** using rounding or binning to reconstruct readable text from position-based word extraction.
8. **Open PDFs from streams** (`PdfDocument.Open(stream)`) in web applications rather than writing to temporary files, to reduce disk I/O and cleanup overhead.
9. **Check `TryGetPng` before saving extracted images** because not all PDF image encodings can be converted to PNG; fall back to raw bytes for unsupported formats.
10. **Validate PDF file headers** before processing by checking the first bytes for `%PDF-` to reject non-PDF files early and avoid cryptic parsing errors.
