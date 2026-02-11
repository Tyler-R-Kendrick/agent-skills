# Logging

## Overview
Use `ILogger` with source-generated `LoggerMessage` patterns for fast, structured logs.

## Example
```csharp
public static partial class Log
{
	[LoggerMessage(EventId = 1001, Level = LogLevel.Information, Message = "Processed order {OrderId}")]
	public static partial void OrderProcessed(ILogger logger, string orderId);
}
```

## Guidance
- Use event IDs and structured properties.
- Configure all log levels via configuration.