# Fody

## Overview
Fody is an extensible tool for weaving .NET assemblies, allowing IL manipulation at build time.

## Example
```csharp
// PropertyChanged.Fody
public class Person : INotifyPropertyChanged
{
    public string Name { get; set; }  // Auto-implements INotifyPropertyChanged
    public event PropertyChangedEventHandler PropertyChanged;
}

// NullGuard.Fody - automatic null checks
public void ProcessUser([NotNull] User user)
{
    // Fody automatically adds null check
}

// FodyWeavers.xml
<Weavers>
  <PropertyChanged/>
  <NullGuard/>
</Weavers>
```

## Popular Add-ins
- PropertyChanged: INotifyPropertyChanged
- NullGuard: Null argument checks
- MethodTimer: Method timing
- Costura: Embed dependencies

## Best Practices
- Use for cross-cutting concerns
- Test woven assemblies
- Document weaving behavior
- Consider build time impact
