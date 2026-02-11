# Mapperly

## Overview
Mapperly is a compile-time object mapper using source generators, providing performance similar to hand-written mapping code.

## Example
```csharp
using Riok.Mapperly.Abstractions;

[Mapper]
public partial class UserMapper
{
    public partial UserDto Map(User user);
    
    [MapProperty(nameof(User.FullName), nameof(UserDto.Name))]
    public partial UserDto MapWithCustomProperty(User user);
    
    public partial IEnumerable<UserDto> MapList(IEnumerable<User> users);
}

// Usage
var mapper = new UserMapper();
var dto = mapper.Map(user);
```

## Best Practices
- Use for high-performance mapping
- Prefer over AutoMapper when possible
- Review generated code
- Use attributes for custom mappings
- Test edge cases
