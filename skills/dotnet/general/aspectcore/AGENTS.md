# AspectCore

## Overview
AspectCore is an AOP (Aspect-Oriented Programming) framework for .NET Core, providing cross-cutting concern implementation.

## Example
```csharp
public class LoggingInterceptor : AbstractInterceptor
{
    public override async Task Invoke(AspectContext context, AspectDelegate next)
    {
        Console.WriteLine($"Before: {context.ServiceMethod.Name}");
        await next(context);
        Console.WriteLine($"After: {context.ServiceMethod.Name}");
    }
}

[Intercept(typeof(LoggingInterceptor))]
public interface IUserService
{
    Task<User> GetUserAsync(int id);
}

// Startup
services.ConfigureDynamicProxy(config =>
{
    config.Interceptors.AddTyped<LoggingInterceptor>();
});
```

## Best Practices
- Use for logging, caching, transactions
- Keep interceptors focused
- Consider performance impact
- Use attributes for selective application
