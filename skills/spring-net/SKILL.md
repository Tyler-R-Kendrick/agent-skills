---
description: Guidance for Spring.NET dependency injection and AOP framework.
metadata:
  displayName: Spring.NET
---

# Spring.NET

## Overview
Spring.NET is a port of the Java Spring Framework, providing dependency injection, AOP, and enterprise features for .NET.

## Example
```xml
<!-- objects.xml -->
<objects xmlns="http://www.springframework.net">
  <object id="userService" type="MyApp.UserService">
    <property name="Repository" ref="userRepository"/>
  </object>
  
  <object id="userRepository" type="MyApp.UserRepository">
    <property name="ConnectionString" value="${db.connection}"/>
  </object>
</objects>
```

```csharp
var ctx = new XmlApplicationContext("objects.xml");
var service = ctx.GetObject<IUserService>("userService");
```

## Best Practices
- Prefer constructor injection
- Use interfaces for dependencies
- Configure AOP for cross-cutting concerns
- Externalize configuration
