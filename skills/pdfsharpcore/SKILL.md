---
description: Guidance for PdfSharpCore PDF generation library.
metadata:
  displayName: PdfSharpCore
---

# PdfSharpCore

## Overview
PdfSharpCore is a .NET Core port of PdfSharp for creating and modifying PDF documents.

## Example
```csharp
using PdfSharpCore.Pdf;
using PdfSharpCore.Drawing;

var document = new PdfDocument();
var page = document.AddPage();
var gfx = XGraphics.FromPdfPage(page);

var font = new XFont("Arial", 20);
gfx.DrawString("Hello PDF!", font, XBrushes.Black,
    new XRect(0, 0, page.Width, page.Height),
    XStringFormats.Center);

document.Save("output.pdf");
```

## Best Practices
- Dispose graphics objects
- Use appropriate page sizes
- Optimize images before adding
- Handle fonts properly
- Test PDF output
