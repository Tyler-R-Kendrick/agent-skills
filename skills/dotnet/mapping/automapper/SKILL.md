---
description: Guidance for AutoMapper object mapping library.
metadata:
  displayName: AutoMapper
---

# AutoMapper

## Overview
AutoMapper is a convention-based object-to-object mapper that eliminates tedious mapping code.

## Example
```csharp
// Profile
public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<User, UserDto>();
        CreateMap<Order, OrderDto>()
            .ForMember(d => d.CustomerName, 
                opt => opt.MapFrom(s => s.Customer.Name));
    }
}

// Usage
var config = new MapperConfiguration(cfg => 
    cfg.AddProfile<MappingProfile>());
var mapper = config.CreateMapper();

var dto = mapper.Map<UserDto>(user);
```

## Best Practices
- Use profiles to organize mappings
- Validate configuration on startup
- Use ProjectTo for IQueryable
- Avoid mapping business logic
- Consider Mapperly for source generation alternative
