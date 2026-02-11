# Cake Build (C# Make)

## Overview

Cake (C# Make) is a cross-platform build automation system that uses a C# DSL to define build tasks, dependencies, and orchestration logic. Build scripts are written in `.cake` files using Cake's scripting dialect or in regular C# console projects using the Cake.Frosting hosting model. Cake provides built-in aliases for common operations (compiling, testing, NuGet packaging, file operations) and supports extensibility through addins and modules.

Cake runs on .NET and works on Windows, macOS, and Linux. It can be bootstrapped with `dotnet tool` as a local or global tool, ensuring reproducible builds without external dependencies.

## Installation

```bash
# Install as a local tool (recommended)
dotnet new tool-manifest
dotnet tool install Cake.Tool

# Run the build script
dotnet cake build.cake

# Or with Cake.Frosting (console app model)
dotnet new console -n Build
cd Build
dotnet add package Cake.Frosting
```

## Cake Script DSL (build.cake)

The scripting model uses a `.cake` file with Cake's C# DSL.

```csharp
// build.cake
#addin nuget:?package=Cake.Coverlet&version=3.0.4
#tool nuget:?package=ReportGenerator&version=5.2.0

var target = Argument("target", "Default");
var configuration = Argument("configuration", "Release");
var solutionPath = "./MyApp.sln";
var artifactsDir = Directory("./artifacts");
var coverageDir = Directory("./coverage");

Task("Clean")
    .Does(() =>
{
    CleanDirectory(artifactsDir);
    CleanDirectory(coverageDir);
    DotNetClean(solutionPath, new DotNetCleanSettings
    {
        Configuration = configuration
    });
});

Task("Restore")
    .IsDependentOn("Clean")
    .Does(() =>
{
    DotNetRestore(solutionPath, new DotNetRestoreSettings
    {
        Locked = true  // Enforce lock file
    });
});

Task("Build")
    .IsDependentOn("Restore")
    .Does(() =>
{
    DotNetBuild(solutionPath, new DotNetBuildSettings
    {
        Configuration = configuration,
        NoRestore = true,
        MSBuildSettings = new DotNetMSBuildSettings()
            .SetVersion("1.0.0")
            .WithProperty("ContinuousIntegrationBuild", "true")
    });
});

Task("Test")
    .IsDependentOn("Build")
    .Does(() =>
{
    var testSettings = new DotNetTestSettings
    {
        Configuration = configuration,
        NoRestore = true,
        NoBuild = true,
        ResultsDirectory = coverageDir,
        Loggers = new[] { "trx" },
        ArgumentCustomization = args => args
            .Append("--collect:\"XPlat Code Coverage\"")
    };

    var testProjects = GetFiles("./tests/**/*.csproj");
    foreach (var project in testProjects)
    {
        DotNetTest(project.FullPath, testSettings);
    }
});

Task("Pack")
    .IsDependentOn("Test")
    .Does(() =>
{
    DotNetPack(solutionPath, new DotNetPackSettings
    {
        Configuration = configuration,
        NoRestore = true,
        NoBuild = true,
        OutputDirectory = artifactsDir,
        MSBuildSettings = new DotNetMSBuildSettings()
            .SetVersion("1.0.0")
    });
});

Task("Publish")
    .IsDependentOn("Test")
    .Does(() =>
{
    DotNetPublish("./src/MyApp.Api/MyApp.Api.csproj", new DotNetPublishSettings
    {
        Configuration = configuration,
        OutputDirectory = artifactsDir + Directory("publish"),
        SelfContained = false,
        Runtime = "linux-x64"
    });
});

Task("Default")
    .IsDependentOn("Test");

RunTarget(target);
```

## Cake Frosting (Console App Model)

Cake.Frosting is a strongly-typed alternative that uses regular C# classes in a console project.

```csharp
// Program.cs
using Cake.Frosting;

return new CakeHost()
    .UseContext<BuildContext>()
    .Run(args);

public class BuildContext : FrostingContext
{
    public string Configuration { get; }
    public string SolutionPath { get; }
    public string ArtifactsDir { get; }

    public BuildContext(ICakeContext context) : base(context)
    {
        Configuration = context.Argument("configuration", "Release");
        SolutionPath = "./MyApp.sln";
        ArtifactsDir = "./artifacts";
    }
}
```

```csharp
// Tasks/CleanTask.cs
using Cake.Common.IO;
using Cake.Common.Tools.DotNet;
using Cake.Common.Tools.DotNet.Clean;
using Cake.Frosting;

[TaskName("Clean")]
public sealed class CleanTask : FrostingTask<BuildContext>
{
    public override void Run(BuildContext context)
    {
        context.CleanDirectory(context.ArtifactsDir);
        context.DotNetClean(context.SolutionPath, new DotNetCleanSettings
        {
            Configuration = context.Configuration
        });
    }
}
```

```csharp
// Tasks/BuildTask.cs
using Cake.Common.Tools.DotNet;
using Cake.Common.Tools.DotNet.Build;
using Cake.Frosting;

[TaskName("Build")]
[IsDependentOn(typeof(CleanTask))]
public sealed class BuildTask : FrostingTask<BuildContext>
{
    public override void Run(BuildContext context)
    {
        context.DotNetBuild(context.SolutionPath, new DotNetBuildSettings
        {
            Configuration = context.Configuration,
            NoRestore = false
        });
    }
}
```

```csharp
// Tasks/TestTask.cs
using Cake.Common.Tools.DotNet;
using Cake.Common.Tools.DotNet.Test;
using Cake.Frosting;

[TaskName("Test")]
[IsDependentOn(typeof(BuildTask))]
public sealed class TestTask : FrostingTask<BuildContext>
{
    public override void Run(BuildContext context)
    {
        context.DotNetTest(context.SolutionPath, new DotNetTestSettings
        {
            Configuration = context.Configuration,
            NoBuild = true,
            NoRestore = true
        });
    }
}
```

```csharp
// Tasks/DefaultTask.cs
using Cake.Frosting;

[TaskName("Default")]
[IsDependentOn(typeof(TestTask))]
public sealed class DefaultTask : FrostingTask<BuildContext>
{
}
```

## Cake Script vs. Cake Frosting

| Feature               | Cake Script (`.cake`)             | Cake Frosting (Console App)        |
|-----------------------|-----------------------------------|------------------------------------|
| File type             | `.cake` script file               | Regular `.cs` files in a project   |
| IntelliSense          | Limited (editor extensions)       | Full IDE support                   |
| Debugging             | Attach to process                 | Standard F5 debugging              |
| Dependency injection  | Not available                     | Supported via `CakeHost`           |
| NuGet addins          | `#addin` directive                | `PackageReference` in `.csproj`    |
| Compilation           | JIT-compiled at runtime           | Pre-compiled at build time         |
| Learning curve        | Lower (single file)               | Higher (project structure)         |
| CI integration        | `dotnet cake build.cake`          | `dotnet run --project Build`       |

## Error Handling and Conditional Tasks

```csharp
// build.cake
Task("Deploy")
    .IsDependentOn("Pack")
    .WithCriteria(() => BuildSystem.IsRunningOnGitHubActions)
    .WithCriteria(() => EnvironmentVariable("DEPLOY_KEY") != null)
    .Does(() =>
{
    var apiKey = EnvironmentVariable("NUGET_API_KEY");
    var packages = GetFiles("./artifacts/*.nupkg");

    foreach (var package in packages)
    {
        DotNetNuGetPush(package.FullPath, new DotNetNuGetPushSettings
        {
            ApiKey = apiKey,
            Source = "https://api.nuget.org/v3/index.json",
            SkipDuplicate = true
        });
    }
})
.OnError(exception =>
{
    Error($"Deploy failed: {exception.Message}");
    throw; // Re-throw to fail the build
});

Task("CI")
    .IsDependentOn("Test")
    .IsDependentOn("Pack")
    .IsDependentOn("Deploy");
```

## CI/CD Integration

### GitHub Actions

```yaml
# .github/workflows/build.yml
name: Build
on: [push, pull_request]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-dotnet@v4
        with:
          dotnet-version: '9.0.x'
      - name: Restore tools
        run: dotnet tool restore
      - name: Run Cake
        run: dotnet cake build.cake --target=CI
        env:
          NUGET_API_KEY: ${{ secrets.NUGET_API_KEY }}
```

## Best Practices

1. **Use Cake.Frosting for new projects instead of `.cake` scripts** because Frosting provides full IDE IntelliSense, standard debugging, and NuGet package references without the limitations of the scripting host.

2. **Install Cake as a local dotnet tool with a tool manifest** by running `dotnet new tool-manifest && dotnet tool install Cake.Tool` so that the exact Cake version is pinned in `.config/dotnet-tools.json` and reproducible across machines.

3. **Define a linear task dependency chain (Clean -> Restore -> Build -> Test -> Pack -> Deploy)** to ensure each step can assume the previous step completed successfully; use `IsDependentOn` to declare the graph explicitly.

4. **Use `WithCriteria` to conditionally skip tasks instead of wrapping task bodies in if-statements** so that Cake's task runner reports skipped tasks in the output log and the dependency graph remains clear.

5. **Pass build parameters via `Argument("name", defaultValue)` rather than hardcoding values** so that CI pipelines and developers can override configuration, target framework, and version from the command line.

6. **Set `NoRestore = true` and `NoBuild = true` on downstream tasks** after the Restore and Build tasks have run to avoid redundant restore and compilation passes that slow down the build pipeline.

7. **Use `GetFiles("./tests/**/*.csproj")` with glob patterns to discover test projects dynamically** rather than listing each project path manually, so that new test projects are automatically included without script changes.

8. **Store artifacts in a dedicated `./artifacts` directory and clean it in the Clean task** to ensure every build starts from a known state and published packages or binaries are easy to locate and upload.

9. **Use `OnError` handlers on deployment tasks to log failure details and re-throw** to prevent silent deployment failures; combine with `WithCriteria` to skip deployment on pull request builds.

10. **Pin addin versions in `#addin` directives or `PackageReference` elements** using exact version numbers (not floating ranges) to prevent build-time resolution surprises when a new addin version introduces breaking changes.
