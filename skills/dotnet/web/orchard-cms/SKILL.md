---
name: orchard-cms
description: Guidance for Orchard CMS content management system.
metadata:
  displayName: Orchard CMS
---

# Orchard CMS

## Overview
Orchard Core is a modular, multi-tenant ASP.NET Core CMS and application framework.

## Example
```csharp
// Creating a content type
public class Migrations : DataMigration
{
    public int Create()
    {
        _contentDefinitionManager.AlterTypeDefinition("BlogPost", type => type
            .WithPart("TitlePart")
            .WithPart("MarkdownBodyPart")
            .WithPart("PublishLaterPart")
            .Creatable()
            .Listable());
            
        return 1;
    }
}

// Custom module startup
public class Startup : StartupBase
{
    public override void ConfigureServices(IServiceCollection services)
    {
        services.AddScoped<IMyService, MyService>();
    }
}
```

## Best Practices
- Create custom modules for features
- Use content types for structured content
- Leverage workflows for automation
- Implement proper permissions
- Use theming system
