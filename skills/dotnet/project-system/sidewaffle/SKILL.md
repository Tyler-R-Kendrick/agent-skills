---
name: sidewaffle
description: >
  USE FOR: Creating, packaging, and distributing custom dotnet new project and item templates using
  the template engine, template.json configuration, and NuGet template packs for team standardization.
  DO NOT USE FOR: Visual Studio VSIX extensions, runtime code scaffolding, or T4 text templates
  that generate code during build rather than during project creation.
license: MIT
metadata:
  displayName: SideWaffle / dotnet new Templates
  author: "Tyler-R-Kendrick"
  version: "1.0.0"
compatibility:
  - claude
  - copilot
  - cursor
---

# SideWaffle / dotnet new Templates

## Overview

SideWaffle originated as a Visual Studio extension providing a collection of project and item templates. The modern equivalent is the `dotnet new` template engine, which allows you to create, install, and distribute custom templates as NuGet packages. Templates can scaffold entire project structures, individual files, or solution-level configurations with parameter substitution, conditional content, and computed values.

The `dotnet new` template engine uses a `.template.config/template.json` manifest file to define template metadata, parameters, sources, and post-creation actions. Templates are packaged as NuGet packages (`.nupkg`) and installed with `dotnet new install`.

## Template Directory Structure

A template is a directory containing the output files and a `.template.config/template.json` manifest.

```
MyServiceTemplate/
  .template.config/
    template.json
  src/
    MyService/
      MyService.csproj
      Program.cs
      Services/
        GreeterService.cs
      appsettings.json
  tests/
    MyService.Tests/
      MyService.Tests.csproj
      GreeterServiceTests.cs
  Directory.Build.props
  .editorconfig
```

## Template Manifest (template.json)

```json
{
  "$schema": "http://json.schemastore.org/template",
  "author": "Your Team",
  "classifications": ["Web", "API", "Microservice"],
  "identity": "MyOrg.Templates.WebApiService",
  "name": "My Org Web API Service",
  "shortName": "myorg-webapi",
  "tags": {
    "language": "C#",
    "type": "project"
  },
  "sourceName": "MyService",
  "preferNameDirectory": true,
  "symbols": {
    "useSwagger": {
      "type": "parameter",
      "datatype": "bool",
      "defaultValue": "true",
      "description": "Include Swagger/OpenAPI support"
    },
    "includeDocker": {
      "type": "parameter",
      "datatype": "bool",
      "defaultValue": "false",
      "description": "Include Dockerfile"
    },
    "dbProvider": {
      "type": "parameter",
      "datatype": "choice",
      "choices": [
        { "choice": "none", "description": "No database" },
        { "choice": "postgres", "description": "PostgreSQL with EF Core" },
        { "choice": "sqlserver", "description": "SQL Server with EF Core" }
      ],
      "defaultValue": "none",
      "description": "Database provider"
    },
    "copyrightYear": {
      "type": "generated",
      "generator": "now",
      "parameters": {
        "format": "yyyy"
      },
      "replaces": "2024"
    }
  },
  "sources": [
    {
      "modifiers": [
        {
          "condition": "(!includeDocker)",
          "exclude": ["**/Dockerfile", "**/.dockerignore"]
        },
        {
          "condition": "(dbProvider == 'none')",
          "exclude": ["**/Data/**", "**/Migrations/**"]
        }
      ]
    }
  ],
  "postActions": [
    {
      "actionId": "210D431B-A78B-4D2F-B762-4ED3E3EA9025",
      "condition": "(dbProvider != 'none')",
      "continueOnError": true,
      "description": "Restore NuGet packages",
      "manualInstructions": [
        { "text": "Run 'dotnet restore'" }
      ]
    }
  ]
}
```

## Template Source Files

Template files use parameter substitution. The `sourceName` value (`MyService`) is replaced with the project name provided by the user.

```csharp
// src/MyService/Program.cs
using MyService.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddScoped<IGreeterService, GreeterService>();

//#if (useSwagger)
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
//#endif

//#if (dbProvider == "postgres")
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));
//#endif

//#if (dbProvider == "sqlserver")
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
//#endif

var app = builder.Build();

//#if (useSwagger)
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
//#endif

app.UseHttpsRedirection();
app.MapControllers();
app.Run();
```

```csharp
// src/MyService/Services/GreeterService.cs
namespace MyService.Services;

public interface IGreeterService
{
    string Greet(string name);
}

public class GreeterService : IGreeterService
{
    public string Greet(string name)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(name);
        return $"Hello, {name}! Welcome to MyService.";
    }
}
```

```csharp
// tests/MyService.Tests/GreeterServiceTests.cs
using Microsoft.VisualStudio.TestTools.UnitTesting;
using MyService.Services;

namespace MyService.Tests;

[TestClass]
public class GreeterServiceTests
{
    private readonly IGreeterService _service = new GreeterService();

    [TestMethod]
    public void Greet_WithValidName_ReturnsGreeting()
    {
        string result = _service.Greet("Alice");
        Assert.AreEqual("Hello, Alice! Welcome to MyService.", result);
    }

    [TestMethod]
    [ExpectedException(typeof(ArgumentException))]
    public void Greet_WithEmptyName_ThrowsArgumentException()
    {
        _service.Greet("");
    }
}
```

## Packaging Templates as NuGet

Create a `.csproj` to pack templates into a NuGet package.

```xml
<!-- MyOrg.Templates.csproj -->
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <PackageType>Template</PackageType>
    <PackageVersion>1.0.0</PackageVersion>
    <PackageId>MyOrg.Templates</PackageId>
    <Authors>Your Team</Authors>
    <Description>Project templates for MyOrg services</Description>
    <PackageTags>dotnet-new;template;webapi</PackageTags>
    <TargetFramework>netstandard2.0</TargetFramework>

    <IncludeContentInPack>true</IncludeContentInPack>
    <IncludeBuildOutput>false</IncludeBuildOutput>
    <ContentTargetFolders>content</ContentTargetFolders>
    <NoDefaultExcludes>true</NoDefaultExcludes>
    <NoWarn>$(NoWarn);NU5128</NoWarn>
  </PropertyGroup>

  <ItemGroup>
    <Content Include="templates\**\*" Exclude="templates\**\bin\**;templates\**\obj\**" />
    <Compile Remove="**\*" />
  </ItemGroup>
</Project>
```

```bash
# Pack the template
dotnet pack MyOrg.Templates.csproj -o ./nupkgs

# Install locally for testing
dotnet new install ./nupkgs/MyOrg.Templates.1.0.0.nupkg

# Use the template
dotnet new myorg-webapi -n OrderService --useSwagger --dbProvider postgres

# List installed templates
dotnet new list myorg

# Uninstall
dotnet new uninstall MyOrg.Templates
```

## Conditional Content Directives

Templates support C-style preprocessor directives for conditional file content.

```csharp
// Conditional compilation directives in template files
public class Startup
{
//#if (useSwagger)
    public void ConfigureSwagger(IServiceCollection services)
    {
        services.AddSwaggerGen(c =>
        {
            c.SwaggerDoc("v1", new() { Title = "MyService", Version = "v1" });
        });
    }
//#endif

//#if (dbProvider != "none")
    public void ConfigureDatabase(IServiceCollection services, IConfiguration config)
    {
//#if (dbProvider == "postgres")
        services.AddDbContext<AppDbContext>(options =>
            options.UseNpgsql(config.GetConnectionString("DefaultConnection")));
//#elif (dbProvider == "sqlserver")
        services.AddDbContext<AppDbContext>(options =>
            options.UseSqlServer(config.GetConnectionString("DefaultConnection")));
//#endif
    }
//#endif
}
```

## Template Parameter Types

| Type         | Description                         | Example                                     |
|--------------|-------------------------------------|---------------------------------------------|
| `parameter`  | User-provided value                 | `--useSwagger true`                         |
| `generated`  | Auto-computed value                 | Current year, GUID, hostname                |
| `computed`   | Derived from other symbols          | `useDatabase = dbProvider != 'none'`        |
| `derived`    | Transformed from another symbol     | lowercase version of project name           |
| `bind`       | Bound to host parameters            | Target framework from environment           |

## Best Practices

1. **Use `sourceName` in `template.json` set to a meaningful placeholder name** (e.g., `MyService`) that appears in all namespaces, filenames, and `.csproj` references so that `dotnet new -n ActualName` performs a complete rename across all files.

2. **Include a working test project in the template with at least one passing test** so that developers can run `dotnet test` immediately after scaffolding to verify the template produces a buildable, testable project.

3. **Use `choice` parameter types for mutually exclusive options like database providers** instead of multiple boolean flags, because choice parameters prevent invalid combinations and generate clearer help text.

4. **Exclude build artifacts with source modifiers** (`"exclude": ["**/bin/**", "**/obj/**"]`) in `template.json` to prevent compiled output from being included in the template package.

5. **Use C-style preprocessor directives (`//#if`, `//#endif`) for conditional C# content** rather than omitting entire files, because partial file content control provides finer granularity and keeps the template structure consistent across configurations.

6. **Test templates by installing them locally with `dotnet new install ./path`** and creating projects with every parameter combination before publishing to a NuGet feed.

7. **Set `PackageType` to `Template` in the packaging `.csproj`** so that NuGet.org and `dotnet new` recognize the package as a template pack rather than a library dependency.

8. **Use the `generated` symbol type with `"generator": "now"` for copyright years and `"generator": "guid"` for correlation IDs** to inject dynamic values that are computed at template instantiation time.

9. **Include `Directory.Build.props`, `.editorconfig`, and `global.json` in the template** so that scaffolded projects come pre-configured with the team's build settings, coding standards, and SDK version pinning.

10. **Version template packages with semantic versioning and publish to an internal NuGet feed** so that teams can update templates centrally and developers receive new template versions via `dotnet new update`.
