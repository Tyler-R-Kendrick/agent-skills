---
description: Guidance for Roslyn analyzers for custom code analysis.
metadata:
  displayName: Roslyn Analyzers
---

# Roslyn Analyzers

## Overview
Roslyn analyzers provide custom code analysis rules and code fixes for C# and VB.NET.

## Example
```csharp
[DiagnosticAnalyzer(LanguageNames.CSharp)]
public class AsyncMethodAnalyzer : DiagnosticAnalyzer
{
    public const string DiagnosticId = "ASYNC001";
    
    private static readonly DiagnosticDescriptor Rule = 
        new DiagnosticDescriptor(
            DiagnosticId,
            "Async method should end with 'Async'",
            "Method '{0}' returns Task but doesn't end with 'Async'",
            "Naming",
            DiagnosticSeverity.Warning,
            isEnabledByDefault: true);

    public override void Initialize(AnalysisContext context)
    {
        context.RegisterSymbolAction(AnalyzeMethod, SymbolKind.Method);
    }
    
    private void AnalyzeMethod(SymbolAnalysisContext context)
    {
        // Analyze method
    }
}
```

## Best Practices
- Provide clear diagnostic messages
- Implement code fixes where possible
- Configure severity appropriately
- Add documentation
- Test thoroughly
