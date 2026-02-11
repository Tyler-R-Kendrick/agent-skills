# Source Generators

## Overview
Source generators analyze code and generate additional C# source files during compilation.

## Example
```csharp
[Generator]
public class AutoNotifyGenerator : IIncrementalGenerator
{
    public void Initialize(IncrementalGeneratorInitializationContext context)
    {
        var classDeclarations = context.SyntaxProvider
            .CreateSyntaxProvider(
                predicate: static (s, _) => IsSyntaxTargetForGeneration(s),
                transform: static (ctx, _) => GetSemanticTargetForGeneration(ctx))
            .Where(static m => m is not null);

        context.RegisterSourceOutput(classDeclarations, 
            (spc, source) => Execute(source, spc));
    }
    
    private void Execute(ClassDeclarationSyntax classDecl, 
        SourceProductionContext context)
    {
        // Generate code
    }
}
```

## Best Practices
- Use incremental generators
- Cache expensive operations
- Handle null and errors gracefully
- Emit diagnostic messages
- Test generated code
