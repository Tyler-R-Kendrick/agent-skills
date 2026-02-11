# MSBuild CSPROJ Structuring for Modern .NET

## Overview

This skill provides explicit, step-by-step guidance for structuring MSBuild `.csproj` files for modern .NET using `Directory.Build.props`, Central Package Management (CPM), and the `dotnet` CLI. All scaffolding and all modifications to `.csproj` files MUST be performed with the `dotnet` CLI. The goal is to keep individual `.csproj` files minimal while centralizing build properties, package versions, and shared configuration at the repository root.

Modern .NET SDK-style projects use a declarative XML format that is dramatically simpler than the legacy verbose format. Combined with `Directory.Build.props` for shared properties and `Directory.Packages.props` for centralized version management, a well-structured repository eliminates redundancy and version drift across projects.

## Prerequisites

- .NET 9+ SDK installed
- `dotnet` CLI available in PATH
- Basic understanding of MSBuild and NuGet

## Rules You Must Follow

- Use `dotnet` CLI for scaffolding projects and solutions.
- Use `dotnet` CLI for ALL `.csproj` changes (packages, references, frameworks, properties).
- Do NOT hand-edit `.csproj` files.
- It is OK to create or edit `Directory.Build.props`, `Directory.Packages.props`, `.editorconfig`, and `global.json` directly.
- Prefer the .NET Aspire framework for multi-project or distributed apps.
- Project names must be unique across the solution to avoid `slnx` conflicts.

## Step 1: Create a Solution and Projects

```bash
# Create a solution
dotnet new sln -n MySolution --format slnx

# Create projects
dotnet new classlib -n MyApp.Core
dotnet new webapi -n MyApp.Api
dotnet new mstest -n MyApp.Core.Tests

# Add projects to solution
dotnet sln MySolution.slnx add MyApp.Core/MyApp.Core.csproj
dotnet sln MySolution.slnx add MyApp.Api/MyApp.Api.csproj
dotnet sln MySolution.slnx add MyApp.Core.Tests/MyApp.Core.Tests.csproj

# Add project references
dotnet add MyApp.Api/MyApp.Api.csproj reference MyApp.Core/MyApp.Core.csproj
dotnet add MyApp.Core.Tests/MyApp.Core.Tests.csproj reference MyApp.Core/MyApp.Core.csproj
```

## Step 2: Create Directory.Build.props

Create `Directory.Build.props` at the repo root with shared properties for all projects.

```xml
<Project>
  <PropertyGroup>
    <!-- Target framework default for all projects -->
    <TargetFramework>net9.0</TargetFramework>

    <!-- Language and compiler behavior -->
    <LangVersion>latest</LangVersion>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>

    <!-- Analyzers and build quality -->
    <EnableNETAnalyzers>true</EnableNETAnalyzers>
    <AnalysisLevel>latest</AnalysisLevel>
    <EnforceCodeStyleInBuild>true</EnforceCodeStyleInBuild>
    <TreatWarningsAsErrors>true</TreatWarningsAsErrors>

    <!-- Deterministic and CI-friendly builds -->
    <Deterministic>true</Deterministic>
    <ContinuousIntegrationBuild Condition="'$(CI)' == 'true'">true</ContinuousIntegrationBuild>

    <!-- Documentation -->
    <GenerateDocumentationFile>true</GenerateDocumentationFile>

    <!-- NuGet lock files -->
    <RestorePackagesWithLockFile>true</RestorePackagesWithLockFile>

    <!-- Versioning defaults -->
    <VersionPrefix>0.1.0</VersionPrefix>
  </PropertyGroup>

  <!-- Packaging metadata for NuGet-packable projects -->
  <PropertyGroup Condition="'$(IsPackable)' == 'true'">
    <RepositoryUrl>https://github.com/your-org/your-repo</RepositoryUrl>
    <RepositoryType>git</RepositoryType>
    <PackageLicenseExpression>MIT</PackageLicenseExpression>
    <Authors>Your Team</Authors>
    <IncludeSymbols>true</IncludeSymbols>
    <SymbolPackageFormat>snupkg</SymbolPackageFormat>
    <PublishRepositoryUrl>true</PublishRepositoryUrl>
    <EmbedUntrackedSources>true</EmbedUntrackedSources>
  </PropertyGroup>

  <!-- Per-project overrides -->
  <PropertyGroup Condition="$(MSBuildProjectName.EndsWith('.Tests'))">
    <IsPackable>false</IsPackable>
    <TreatWarningsAsErrors>false</TreatWarningsAsErrors>
  </PropertyGroup>
</Project>
```

## Step 3: Enable Central Package Management

Create `Directory.Packages.props` at the repo root.

```xml
<Project>
  <PropertyGroup>
    <ManagePackageVersionsCentrally>true</ManagePackageVersionsCentrally>
    <CentralPackageTransitivePinningEnabled>true</CentralPackageTransitivePinningEnabled>
  </PropertyGroup>

  <ItemGroup>
    <!-- Core extensions -->
    <PackageVersion Include="Microsoft.Extensions.DependencyInjection" Version="9.0.0" />
    <PackageVersion Include="Microsoft.Extensions.DependencyInjection.Abstractions" Version="9.0.0" />
    <PackageVersion Include="Microsoft.Extensions.Hosting" Version="9.0.0" />
    <PackageVersion Include="Microsoft.Extensions.Logging" Version="9.0.0" />
    <PackageVersion Include="Microsoft.Extensions.Logging.Abstractions" Version="9.0.0" />
    <PackageVersion Include="Microsoft.Extensions.Configuration" Version="9.0.0" />
    <PackageVersion Include="Microsoft.Extensions.Configuration.Json" Version="9.0.0" />
    <PackageVersion Include="Microsoft.Extensions.Options" Version="9.0.0" />
    <PackageVersion Include="Microsoft.Extensions.Http" Version="9.0.0" />

    <!-- Resilience -->
    <PackageVersion Include="Microsoft.Extensions.Resilience" Version="9.0.0" />
    <PackageVersion Include="Microsoft.Extensions.Http.Resilience" Version="9.0.0" />

    <!-- Testing -->
    <PackageVersion Include="MSTest.TestFramework" Version="3.4.0" />
    <PackageVersion Include="MSTest.Sdk" Version="3.4.0" />
    <PackageVersion Include="Microsoft.Testing.Platform" Version="1.4.0" />
    <PackageVersion Include="Microsoft.Testing.Extensions.CodeCoverage" Version="1.4.0" />

    <!-- Versioning -->
    <PackageVersion Include="Nerdbank.GitVersioning" Version="3.6.133" />
  </ItemGroup>

  <ItemGroup>
    <GlobalPackageReference Include="Nerdbank.GitVersioning" />
  </ItemGroup>
</Project>
```

## Step 4: Add Packages and References via CLI

```bash
# Add packages (version comes from Directory.Packages.props)
dotnet add MyApp.Core/MyApp.Core.csproj package Microsoft.Extensions.Logging.Abstractions
dotnet add MyApp.Api/MyApp.Api.csproj package Microsoft.Extensions.Hosting

# Remove packages
dotnet remove MyApp.Core/MyApp.Core.csproj package Microsoft.Extensions.Logging.Abstractions

# List packages and references
dotnet list MyApp.Core/MyApp.Core.csproj package
dotnet list MyApp.Api/MyApp.Api.csproj reference
```

## Step 5: Pin SDK Version with global.json

```json
{
  "sdk": {
    "version": "9.0.100",
    "rollForward": "latestFeature"
  }
}
```

## Resulting .csproj (Minimal)

After following these steps, individual `.csproj` files are minimal because properties come from `Directory.Build.props` and versions from `Directory.Packages.props`.

```xml
<!-- MyApp.Core/MyApp.Core.csproj -->
<Project Sdk="Microsoft.NET.Sdk">
  <ItemGroup>
    <PackageReference Include="Microsoft.Extensions.Logging.Abstractions" />
  </ItemGroup>
</Project>
```

```xml
<!-- MyApp.Api/MyApp.Api.csproj -->
<Project Sdk="Microsoft.NET.Sdk.Web">
  <ItemGroup>
    <PackageReference Include="Microsoft.Extensions.Hosting" />
    <ProjectReference Include="..\MyApp.Core\MyApp.Core.csproj" />
  </ItemGroup>
</Project>
```

## Common MSBuild Properties Reference

| Property                      | Purpose                                    | Typical Value        |
|-------------------------------|--------------------------------------------|----------------------|
| `TargetFramework`             | Target .NET version                        | `net9.0`             |
| `LangVersion`                 | C# language version                        | `latest`             |
| `Nullable`                    | Nullable reference types                   | `enable`             |
| `ImplicitUsings`              | Auto-import common namespaces              | `enable`             |
| `TreatWarningsAsErrors`       | Fail build on any warning                  | `true`               |
| `Deterministic`               | Reproducible builds                        | `true`               |
| `IsPackable`                  | Whether project produces a NuGet package   | `true` / `false`     |
| `GenerateDocumentationFile`   | Produce XML doc file                       | `true`               |
| `RestorePackagesWithLockFile` | Generate packages.lock.json                | `true`               |
| `ManagePackageVersionsCentrally` | Enable CPM                              | `true`               |
| `CentralPackageTransitivePinningEnabled` | Pin transitive dependency versions | `true`             |

## Testing with Microsoft Testing Platform

```bash
# Create test project
dotnet new mstest -n MyApp.Core.Tests
dotnet sln MySolution.slnx add MyApp.Core.Tests/MyApp.Core.Tests.csproj
dotnet add MyApp.Core.Tests/MyApp.Core.Tests.csproj reference MyApp.Core/MyApp.Core.csproj

# Add test packages
dotnet add MyApp.Core.Tests/MyApp.Core.Tests.csproj package MSTest.TestFramework
dotnet add MyApp.Core.Tests/MyApp.Core.Tests.csproj package Microsoft.Testing.Platform
dotnet add MyApp.Core.Tests/MyApp.Core.Tests.csproj package Microsoft.Testing.Extensions.CodeCoverage

# Run tests with coverage
dotnet test MyApp.Core.Tests/MyApp.Core.Tests.csproj -- --coverage
```

## Validation Commands

```bash
dotnet restore     # Verify packages resolve
dotnet build       # Verify compilation
dotnet test        # Verify tests pass
dotnet pack        # Verify NuGet packages
```

## Best Practices

1. **Never hand-edit `.csproj` files -- use `dotnet add package`, `dotnet add reference`, and `dotnet remove` commands exclusively** to prevent malformed XML, merge conflicts, and divergence from CPM version definitions.

2. **Centralize all shared build properties in `Directory.Build.props` at the repository root** and use MSBuild conditions (`Condition="$(MSBuildProjectName.EndsWith('.Tests'))"`) for per-project overrides instead of duplicating properties across `.csproj` files.

3. **Enable Central Package Management by setting `ManagePackageVersionsCentrally` to `true` in `Directory.Packages.props`** and define every package version there; individual `.csproj` files should reference packages without version attributes.

4. **Enable `CentralPackageTransitivePinningEnabled` to pin transitive dependency versions** so that all projects in the solution resolve the same version of shared transitive packages, preventing diamond dependency conflicts.

5. **Set `RestorePackagesWithLockFile` to `true` and commit `packages.lock.json` files** to ensure deterministic restores; CI builds should use `dotnet restore --locked-mode` to fail on any version drift.

6. **Use `ContinuousIntegrationBuild` conditionally with `Condition="'$(CI)' == 'true'"`** so that deterministic build metadata (source link, path mapping) is only applied in CI where it is needed, not during local development.

7. **Keep individual `.csproj` files to fewer than 20 lines** by moving all `PropertyGroup` settings to `Directory.Build.props`; a well-configured project file should contain only `PackageReference` and `ProjectReference` items.

8. **Use `global.json` with `rollForward: latestFeature` to pin the SDK major.minor version** while allowing patch updates, ensuring all developers and CI agents use a compatible SDK without requiring exact version matches.

9. **Add `<IsPackable>false</IsPackable>` for test projects using MSBuild conditions** to prevent accidental NuGet package creation from test assemblies during `dotnet pack` operations.

10. **Run `dotnet restore`, `dotnet build`, and `dotnet test` as separate validation steps** rather than relying on implicit restore in `dotnet build`, so that restore failures are reported clearly and cached restore results are used efficiently.
