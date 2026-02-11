# Optional Pattern

## Overview
The Optional (or Maybe) pattern represents values that may or may not exist, avoiding null reference exceptions.

## Example
```csharp
public readonly struct Optional<T>
{
    private readonly T _value;
    private readonly bool _hasValue;

    public static Optional<T> Some(T value) => 
        new Optional<T>(value, true);
    
    public static Optional<T> None() => 
        new Optional<T>(default!, false);
    
    public TResult Match<TResult>(
        Func<T, TResult> some,
        Func<TResult> none) =>
        _hasValue ? some(_value) : none();
}
```

## Best Practices
- Use instead of null for optional values
- Provide Match or Map methods
- Consider using language-ext or similar libraries
- Make intent explicit in APIs
