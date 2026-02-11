# Parakeet

## Overview
Parakeet is a parser library for .NET focused on simplicity and performance.

## Example
```csharp
// Note: Example syntax - verify with actual library
var intParser = from digits in Digit.Many1()
                select int.Parse(new string(digits));

var listParser = from open in Char('[')
                 from items in intParser.SepBy(Char(','))
                 from close in Char(']')
                 select items;

var result = listParser.Parse("[1,2,3]");
```

## Best Practices
- Build parsers compositionally
- Handle errors gracefully
- Test thoroughly
- Document grammar
