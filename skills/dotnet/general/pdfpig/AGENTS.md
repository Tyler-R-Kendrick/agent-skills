# PdfPig

## Overview
PdfPig is a library for reading and extracting text and other content from PDF documents.

## Example
```csharp
using UglyToad.PdfPig;

using var pdf = PdfDocument.Open("document.pdf");

foreach (var page in pdf.GetPages())
{
    var text = page.Text;
    Console.WriteLine($"Page {page.Number}: {text}");
    
    // Get words
    var words = page.GetWords();
    
    // Get images
    var images = page.GetImages();
}

// Search for text
var searchTerm = "invoice";
var results = pdf.GetPages()
    .Where(p => p.Text.Contains(searchTerm));
```

## Best Practices
- Handle malformed PDFs gracefully
- Extract text by region when needed
- Process large PDFs efficiently
- Validate extracted data
