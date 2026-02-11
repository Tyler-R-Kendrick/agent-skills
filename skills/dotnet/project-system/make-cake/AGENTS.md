# CAKE Build

## Overview
CAKE is a cross-platform build automation system with a C# DSL for tasks like compiling, testing, and packaging.

## Example
```csharp
// build.cake
var target = Argument("target", "Default");
var configuration = Argument("configuration", "Release");

Task("Clean")
    .Does(() =>
{
    CleanDirectory("./artifacts");
});

Task("Build")
    .IsDependentOn("Clean")
    .Does(() =>
{
    DotNetBuild("./MyProject.sln", new DotNetBuildSettings
    {
        Configuration = configuration
    });
});

Task("Test")
    .IsDependentOn("Build")
    .Does(() =>
{
    DotNetTest("./MyProject.sln");
});

Task("Default")
    .IsDependentOn("Test");

RunTarget(target);
```

## Best Practices
- Define clear task dependencies
- Use arguments for configurability
- Leverage built-in aliases
- Keep scripts maintainable
