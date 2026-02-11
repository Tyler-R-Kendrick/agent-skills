# NLog

## Overview
NLog is a flexible logging platform for .NET with support for multiple targets and advanced routing.

## Example
```csharp
// NLog.config
<nlog>
  <targets>
    <target name="file" xsi:type="File" fileName="logs/app.log" />
    <target name="console" xsi:type="Console" />
  </targets>
  <rules>
    <logger name="*" minlevel="Info" writeTo="console" />
    <logger name="*" minlevel="Debug" writeTo="file" />
  </rules>
</nlog>

// Code
private static readonly Logger Logger = LogManager.GetCurrentClassLogger();

Logger.Info("User {UserId} logged in", userId);
```

## Best Practices
- Use configuration files for flexibility
- Implement structured logging
- Use appropriate log levels
- Configure targets based on environment
- Enable async logging for performance
