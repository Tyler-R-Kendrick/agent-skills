# OTLP Logging

## Overview
OpenTelemetry Protocol (OTLP) provides standardized telemetry data collection for logs, metrics, and traces.

## Example
```csharp
using OpenTelemetry.Logs;
using OpenTelemetry.Resources;

builder.Logging.AddOpenTelemetry(options =>
{
    options
        .SetResourceBuilder(ResourceBuilder.CreateDefault()
            .AddService("MyService"))
        .AddOtlpExporter(otlp =>
        {
            otlp.Endpoint = new Uri("http://collector:4317");
        });
});

// Usage
logger.LogInformation("Order {OrderId} processed", orderId);
```

## Best Practices
- Use structured logging
- Include trace context
- Configure appropriate sampling
- Use semantic conventions
- Export to OTLP collector
- Correlate logs with traces
