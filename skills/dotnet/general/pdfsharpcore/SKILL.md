---
name: pdfsharpcore
description: >
  Guidance for PdfSharpCore PDF generation and modification library for .NET.
  USE FOR: creating PDF documents programmatically, drawing text/shapes/images on PDF pages, modifying existing PDFs, merging PDF files, generating reports and invoices as PDF, adding headers/footers/page numbers.
  DO NOT USE FOR: extracting text from PDFs (use PdfPig), PDF form filling with complex logic, high-volume HTML-to-PDF conversion (use a headless browser), PDF/A compliance.
license: MIT
metadata:
  displayName: PdfSharpCore
  author: "Tyler-R-Kendrick"
  version: "1.0.0"
compatibility:
  - claude
  - copilot
  - cursor
references:
  - title: "PdfSharpCore GitHub Repository"
    url: "https://github.com/ststeiger/PdfSharpCore"
  - title: "PdfSharpCore NuGet Package"
    url: "https://www.nuget.org/packages/PdfSharpCore"
---

# PdfSharpCore

## Overview

PdfSharpCore is a .NET Core port of the PdfSharp library for creating and modifying PDF documents. It provides a GDI+-style drawing API (`XGraphics`) for rendering text, shapes, images, and paths onto PDF pages. PdfSharpCore works entirely in managed code with no native dependencies, making it suitable for cross-platform and containerized environments.

PdfSharpCore is focused on PDF creation and modification. For reading/extracting text from existing PDFs, use PdfPig. For HTML-to-PDF conversion, consider a headless browser approach or QuestPDF for declarative document layout.

Install via NuGet:
```
dotnet add package PdfSharpCore
```

## Creating a Simple PDF

Create a new PDF document with text and basic formatting.

```csharp
using PdfSharpCore.Pdf;
using PdfSharpCore.Drawing;

var document = new PdfDocument();
document.Info.Title = "Sample Invoice";
document.Info.Author = "My Application";

var page = document.AddPage();
page.Size = PdfSharpCore.PageSize.A4;

var gfx = XGraphics.FromPdfPage(page);

// Title
var titleFont = new XFont("Arial", 24, XFontStyle.Bold);
gfx.DrawString("INVOICE",
    titleFont, XBrushes.DarkBlue,
    new XRect(0, 40, page.Width, 40),
    XStringFormats.Center);

// Company info
var normalFont = new XFont("Arial", 12);
gfx.DrawString("Acme Corporation", normalFont, XBrushes.Black, 50, 100);
gfx.DrawString("123 Business Ave, Suite 100", normalFont, XBrushes.Gray, 50, 118);
gfx.DrawString("New York, NY 10001", normalFont, XBrushes.Gray, 50, 136);

// Invoice details
var boldFont = new XFont("Arial", 12, XFontStyle.Bold);
gfx.DrawString("Invoice #: INV-2025-001", boldFont, XBrushes.Black, 350, 100);
gfx.DrawString("Date: January 15, 2025", normalFont, XBrushes.Black, 350, 118);
gfx.DrawString("Due: February 14, 2025", normalFont, XBrushes.Black, 350, 136);

document.Save("invoice.pdf");
```

## Drawing Tables

Draw structured tables with headers, rows, and alternating row colors.

```csharp
using PdfSharpCore.Pdf;
using PdfSharpCore.Drawing;

var document = new PdfDocument();
var page = document.AddPage();
var gfx = XGraphics.FromPdfPage(page);

var headerFont = new XFont("Arial", 11, XFontStyle.Bold);
var cellFont = new XFont("Arial", 10);

// Table configuration
double startX = 50;
double startY = 200;
double[] columnWidths = { 200, 80, 80, 100 };
double rowHeight = 25;
string[] headers = { "Description", "Quantity", "Unit Price", "Total" };

// Draw header row
var headerBrush = new XSolidBrush(XColor.FromArgb(40, 80, 120));
gfx.DrawRectangle(headerBrush,
    startX, startY,
    columnWidths.Sum(), rowHeight);

double x = startX;
for (int i = 0; i < headers.Length; i++)
{
    gfx.DrawString(headers[i], headerFont, XBrushes.White,
        new XRect(x + 5, startY + 5, columnWidths[i] - 10, rowHeight),
        XStringFormats.CenterLeft);
    x += columnWidths[i];
}

// Draw data rows
var data = new[]
{
    new { Description = "Web Development", Qty = "40 hrs", Price = "$150.00", Total = "$6,000.00" },
    new { Description = "UI Design", Qty = "20 hrs", Price = "$120.00", Total = "$2,400.00" },
    new { Description = "Server Hosting", Qty = "1 mo", Price = "$200.00", Total = "$200.00" }
};

for (int row = 0; row < data.Length; row++)
{
    double y = startY + rowHeight * (row + 1);

    // Alternating row background
    if (row % 2 == 0)
    {
        gfx.DrawRectangle(new XSolidBrush(XColor.FromArgb(240, 240, 240)),
            startX, y, columnWidths.Sum(), rowHeight);
    }

    // Row border
    gfx.DrawRectangle(XPens.LightGray,
        startX, y, columnWidths.Sum(), rowHeight);

    // Cell values
    var values = new[] { data[row].Description, data[row].Qty, data[row].Price, data[row].Total };
    x = startX;
    for (int col = 0; col < values.Length; col++)
    {
        gfx.DrawString(values[col], cellFont, XBrushes.Black,
            new XRect(x + 5, y + 5, columnWidths[col] - 10, rowHeight),
            XStringFormats.CenterLeft);
        x += columnWidths[col];
    }
}

document.Save("table-report.pdf");
```

## Drawing Shapes and Lines

Use `XGraphics` to draw lines, rectangles, ellipses, and paths.

```csharp
using PdfSharpCore.Pdf;
using PdfSharpCore.Drawing;

var document = new PdfDocument();
var page = document.AddPage();
var gfx = XGraphics.FromPdfPage(page);

// Horizontal rule
gfx.DrawLine(new XPen(XColors.DarkGray, 1), 50, 180, page.Width - 50, 180);

// Filled rectangle with rounded corners
gfx.DrawRoundedRectangle(
    new XPen(XColors.Navy, 2),
    new XSolidBrush(XColor.FromArgb(230, 240, 250)),
    50, 400, 200, 100, 10, 10);

// Circle
gfx.DrawEllipse(XPens.Red, XBrushes.LightPink, 300, 400, 100, 100);

// Dashed line
var dashedPen = new XPen(XColors.Gray, 1)
{
    DashStyle = XDashStyle.Dash
};
gfx.DrawLine(dashedPen, 50, 550, page.Width - 50, 550);

document.Save("shapes.pdf");
```

## Adding Images

Embed images into PDF documents from files or streams.

```csharp
using System.IO;
using PdfSharpCore.Pdf;
using PdfSharpCore.Drawing;

var document = new PdfDocument();
var page = document.AddPage();
var gfx = XGraphics.FromPdfPage(page);

// Load image from file
var logo = XImage.FromFile("logo.png");

// Draw at specific position and size (maintaining aspect ratio)
double targetWidth = 150;
double aspectRatio = (double)logo.PixelHeight / logo.PixelWidth;
double targetHeight = targetWidth * aspectRatio;
gfx.DrawImage(logo, 50, 30, targetWidth, targetHeight);

// Draw from a stream
using var imageStream = File.OpenRead("photo.jpg");
var photo = XImage.FromStream(() => imageStream);
gfx.DrawImage(photo, 50, 200, 400, 300);

document.Save("with-images.pdf");
```

## Multi-Page Documents with Headers and Footers

Generate multi-page documents with consistent headers, footers, and page numbers.

```csharp
using PdfSharpCore.Pdf;
using PdfSharpCore.Drawing;

var document = new PdfDocument();
var headerFont = new XFont("Arial", 9, XFontStyle.Italic);
var bodyFont = new XFont("Arial", 11);
var footerFont = new XFont("Arial", 8);

string[] paragraphs = GetReportParagraphs(); // your content source
int totalPages = 3;

for (int pageNum = 1; pageNum <= totalPages; pageNum++)
{
    var page = document.AddPage();
    page.Size = PdfSharpCore.PageSize.A4;
    var gfx = XGraphics.FromPdfPage(page);

    // Header
    gfx.DrawString("Acme Corp - Annual Report 2025",
        headerFont, XBrushes.Gray,
        new XRect(50, 20, page.Width - 100, 20),
        XStringFormats.CenterLeft);
    gfx.DrawLine(XPens.LightGray, 50, 40, page.Width - 50, 40);

    // Body content area
    double yPos = 60;
    // ... render content starting at yPos ...

    // Footer
    gfx.DrawLine(XPens.LightGray, 50, page.Height - 50, page.Width - 50, page.Height - 50);
    gfx.DrawString($"Page {pageNum} of {totalPages}",
        footerFont, XBrushes.Gray,
        new XRect(0, page.Height - 40, page.Width, 20),
        XStringFormats.Center);
    gfx.DrawString("Confidential",
        footerFont, XBrushes.Gray,
        new XRect(50, page.Height - 40, 200, 20),
        XStringFormats.CenterLeft);
}

document.Save("multi-page-report.pdf");

string[] GetReportParagraphs() => new[] { "Content goes here." };
```

## Merging PDF Documents

Combine multiple PDF files into a single document.

```csharp
using System.Collections.Generic;
using PdfSharpCore.Pdf;
using PdfSharpCore.Pdf.IO;

public class PdfMerger
{
    public void Merge(IEnumerable<string> inputFiles, string outputFile)
    {
        var outputDocument = new PdfDocument();

        foreach (var file in inputFiles)
        {
            var inputDocument = PdfReader.Open(file, PdfDocumentOpenMode.Import);

            for (int i = 0; i < inputDocument.PageCount; i++)
            {
                var page = inputDocument.Pages[i];
                outputDocument.AddPage(page);
            }
        }

        outputDocument.Save(outputFile);
    }
}

// Usage
var merger = new PdfMerger();
merger.Merge(
    new[] { "cover.pdf", "report.pdf", "appendix.pdf" },
    "combined.pdf");
```

## PdfSharpCore vs Other PDF Generators

| Feature | PdfSharpCore | QuestPDF | iTextSharp | Puppeteer/Playwright |
|---------|-------------|---------|------------|---------------------|
| API style | Low-level drawing | Fluent layout | Mixed | HTML-to-PDF |
| Layout engine | Manual positioning | Auto-layout | Manual/auto | Browser engine |
| Learning curve | Medium | Low | High | Low |
| Cross-platform | Yes | Yes | Yes | Needs browser |
| Fine control | Excellent | Good | Excellent | Limited |
| License | MIT | Community/Paid | AGPL/Commercial | Apache 2.0 |

## Best Practices

1. **Dispose `XGraphics` objects** or use them within the scope of a single page -- create a new `XGraphics` for each page rather than reusing across pages.
2. **Use `XRect` with `XStringFormats` for text alignment** instead of manually calculating text positions, which is error-prone and breaks with different font sizes.
3. **Calculate page overflow** by tracking the Y position of drawn content and adding new pages when content exceeds the page height minus margins.
4. **Pre-calculate table column widths** based on content or fixed proportions before rendering to avoid text overflow and misaligned columns.
5. **Use consistent font instances** by creating fonts once and reusing them across pages to reduce object creation and ensure visual consistency.
6. **Maintain aspect ratio when drawing images** by calculating target dimensions from the original `PixelWidth` and `PixelHeight` ratios.
7. **Open existing PDFs with `PdfDocumentOpenMode.Import`** when merging, and `PdfDocumentOpenMode.Modify` when editing in place.
8. **Save to a `MemoryStream`** in web applications and return the stream as a file download rather than writing to temporary disk files.
9. **Use points (1/72 inch) for all measurements** since PdfSharp uses points as its coordinate system -- convert from millimeters by multiplying by `72/25.4`.
10. **Test generated PDFs in multiple viewers** (Adobe Acrobat, Chrome, macOS Preview) since different renderers handle fonts and transparency differently.
