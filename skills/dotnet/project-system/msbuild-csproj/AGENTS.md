# MSBuild CSPROJ Structuring for Modern .NET/C#

## Overview
This skill provides explicit, step-by-step guidance for structuring MSBuild `.csproj` files for modern .NET using `Directory.Build.props`, Central Package Management (CPM), and the `dotnet` CLI. All scaffolding and all modifications to `.csproj` files MUST be performed with the `dotnet` CLI.

## Prerequisites
- .NET 10 SDK or later installed
- `dotnet` CLI available in PATH
- Basic understanding of MSBuild and NuGet

## Rules You Must Follow
- Use `dotnet` CLI for scaffolding projects and solutions.
- Use `dotnet` CLI for ALL `.csproj` changes (packages, references, frameworks, properties).
- Do NOT hand-edit `.csproj` files.
- It is OK to create or edit `Directory.Build.props`, `Directory.Packages.props`, `.editorconfig`, and `global.json` directly.
- Only create `.csproj` files for projects that cannot run as a single-file executable due to file references (for example, content files, shared source files, or other non-package inputs). If a project only needs package references, prefer a single-file app instead.
- Prefer the .NET Aspire / Aspire Framework for multi-project or distributed apps.
- Project names must be unique across the solution to avoid `slnx` conflicts.
- Use a templated format for assembly and namespace names based on folder structure. Set a namespace prefix at the repo root or source root, then append each folder level as additional prefixes.

## Required Repository Files
You should create these files at the repository root:
- `Directory.Build.props`
- `Directory.Packages.props`
- `global.json` (optional, but recommended)

## Step-by-Step Implementation

### Step 1: Create a solution and projects (CLI only)
```bash
dotnet new sln -n MySolution --format slnx

dotnet new classlib -n My.Library
# or
# dotnet new console -n My.App
# dotnet new webapi -n My.Api

dotnet sln MySolution.slnx add My.Library/My.Library.csproj
```

If you are building a multi-project or distributed system, start with Aspire:
```bash
dotnet workload install aspire
dotnet new aspire-starter -n MySolution
```

If a project only needs package references, prefer a single-file app instead of creating a `.csproj`:
```bash
dotnet run Program.cs
dotnet publish Program.cs -o ./out
```

### Step 2: Create `Directory.Build.props` with explicit properties
Create `Directory.Build.props` at the repo root with the following properties. These are intended to be the defaults for all projects. This file is where you set build properties instead of editing `.csproj` files.

```xml
<Project>
  <PropertyGroup>
    <!-- Target framework default for all projects -->
    <TargetFramework>net10.0</TargetFramework>

    <!-- Namespace and assembly naming -->
    <RootNamespace>App</RootNamespace>
    <AssemblyName>$(MSBuildProjectName)</AssemblyName>

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
    <ContinuousIntegrationBuild>true</ContinuousIntegrationBuild>

    <!-- Documentation and source linking -->
    <GenerateDocumentationFile>true</GenerateDocumentationFile>
    <DebugType>portable</DebugType>

    <!-- NuGet restore and lock files -->
    <RestorePackagesWithLockFile>true</RestorePackagesWithLockFile>

    <!-- Consistent versioning defaults (override per-project if needed) -->
    <VersionPrefix>0.1.0</VersionPrefix>
  </PropertyGroup>

  <!-- Recommended: packaging metadata for NuGet (packable projects only) -->
  <PropertyGroup Condition="'$(IsPackable)' == 'true'">
    <RepositoryUrl>https://example.com/your/repo</RepositoryUrl>
    <RepositoryType>git</RepositoryType>
    <PackageLicenseExpression>MIT</PackageLicenseExpression>
    <Authors>Your Team</Authors>
    <PackageProjectUrl>https://example.com/your/repo</PackageProjectUrl>
    <PackageDescription>Short, clear description.</PackageDescription>
    <PackageTags>dotnet;library</PackageTags>
    <PackageReadmeFile>README.md</PackageReadmeFile>
    <IncludeSymbols>true</IncludeSymbols>
    <SymbolPackageFormat>snupkg</SymbolPackageFormat>
    <IncludeSource>true</IncludeSource>
    <PublishRepositoryUrl>true</PublishRepositoryUrl>
    <EmbedUntrackedSources>true</EmbedUntrackedSources>
  </PropertyGroup>
</Project>
```

If you need per-project exceptions, override them in this file using MSBuild conditions. Do not edit `.csproj` files directly.

Example per-project overrides (still in `Directory.Build.props`):
```xml
  <PropertyGroup Condition="'$(MSBuildProjectName)' == 'My.Tests'">
    <IsPackable>false</IsPackable>
  </PropertyGroup>

  <PropertyGroup Condition="'$(MSBuildProjectName)' == 'My.Legacy'">
    <TargetFramework>net6.0</TargetFramework>
  </PropertyGroup>
```

Namespace and assembly naming template:
- Set a namespace prefix at the repo root (for example, `RootNamespace=App`).
- Append each folder level after the source root as additional prefixes.
- Keep project names unique to avoid `slnx` collisions.

Example:
- Path: `src/App/Abstractions/App.Abstractions.csproj`
- Resulting namespace: `App.Abstractions`
- Resulting assembly name: `App.Abstractions`

### Step 3: Enable Central Package Management (CPM)
Create `Directory.Packages.props` at the repo root with explicit CPM configuration, including global dependencies and default package versions:

```xml
<Project>
  <PropertyGroup>
    <ManagePackageVersionsCentrally>true</ManagePackageVersionsCentrally>
    <CentralPackageTransitivePinningEnabled>true</CentralPackageTransitivePinningEnabled>
  </PropertyGroup>

  <ItemGroup>
    <!-- Global dependency -->
    <PackageVersion Include="Nerdbank.GitVersioning" Version="3.6.133" />

    <!-- Default package references for .NET extensions -->
    <PackageVersion Include="Microsoft.Extensions.Compliance" Version="10.0.0" />
    <PackageVersion Include="Microsoft.Extensions.Compliance.Abstractions" Version="10.0.0" />
    <PackageVersion Include="Microsoft.Extensions.Configuration" Version="10.0.0" />
    <PackageVersion Include="Microsoft.Extensions.Configuration.Abstractions" Version="10.0.0" />
    <PackageVersion Include="Microsoft.Extensions.Configuration.Binder" Version="10.0.0" />
    <PackageVersion Include="Microsoft.Extensions.Configuration.CommandLine" Version="10.0.0" />
    <PackageVersion Include="Microsoft.Extensions.Configuration.EnvironmentVariables" Version="10.0.0" />
    <PackageVersion Include="Microsoft.Extensions.Configuration.Json" Version="10.0.0" />
    <PackageVersion Include="Microsoft.Extensions.DependencyInjection" Version="10.0.0" />
    <PackageVersion Include="Microsoft.Extensions.DependencyInjection.Abstractions" Version="10.0.0" />
    <PackageVersion Include="Microsoft.Extensions.Hosting" Version="10.0.0" />
    <PackageVersion Include="Microsoft.Extensions.Hosting.Abstractions" Version="10.0.0" />
    <PackageVersion Include="Microsoft.Extensions.Localization" Version="10.0.0" />
    <PackageVersion Include="Microsoft.Extensions.Localization.Abstractions" Version="10.0.0" />
    <PackageVersion Include="Microsoft.Extensions.Logging" Version="10.0.0" />
    <PackageVersion Include="Microsoft.Extensions.Logging.Abstractions" Version="10.0.0" />
    <PackageVersion Include="Microsoft.Extensions.Logging.Configuration" Version="10.0.0" />
    <PackageVersion Include="Microsoft.Extensions.Logging.Console" Version="10.0.0" />
    <PackageVersion Include="Microsoft.Extensions.Primitives" Version="10.0.0" />
    <PackageVersion Include="Microsoft.Extensions.Resilience" Version="10.0.0" />
    <PackageVersion Include="Microsoft.Extensions.Http.Resilience" Version="10.0.0" />
    <PackageVersion Include="Microsoft.Extensions.ServiceDiscovery" Version="10.0.0" />
    <PackageVersion Include="Microsoft.Extensions.ServiceDiscovery.Abstractions" Version="10.0.0" />
    <PackageVersion Include="Microsoft.Extensions.ServiceDiscovery.Http" Version="10.0.0" />
    <PackageVersion Include="Microsoft.Extensions.Caching.Abstractions" Version="10.0.0" />
    <PackageVersion Include="Microsoft.Extensions.Caching.Memory" Version="10.0.0" />
    <PackageVersion Include="Microsoft.Extensions.Caching.Distributed" Version="10.0.0" />
    <PackageVersion Include="System.IO.Abstractions" Version="21.0.0" />

    <!-- Testing and coverage -->
    <PackageVersion Include="MSTest.Sdk" Version="3.4.0" />
    <PackageVersion Include="MSTest.TestFramework" Version="3.4.0" />
    <PackageVersion Include="Microsoft.Testing.Platform" Version="1.4.0" />
    <PackageVersion Include="Microsoft.Testing.Extensions.CodeCoverage" Version="1.4.0" />
  </ItemGroup>

  <ItemGroup>
    <GlobalPackageReference Include="Nerdbank.GitVersioning" />
  </ItemGroup>
</Project>
```

### Step 4: Scaffold project references and packages (CLI only)
Add references and packages without touching `.csproj` directly:

```bash
# Project references
dotnet add My.App/My.App.csproj reference My.Library/My.Library.csproj

# Packages
# Version is omitted because CPM defines versions in Directory.Packages.props
dotnet add My.Library/My.Library.csproj package Microsoft.Extensions.Logging

# Add extension packages as needed (versions come from Directory.Packages.props)
dotnet add My.App/My.App.csproj package Microsoft.Extensions.Hosting
dotnet add My.App/My.App.csproj package Microsoft.Extensions.Configuration.Json
dotnet add My.App/My.App.csproj package Microsoft.Extensions.Logging.Console
```

Create `version.json` at the repo root for Nerdbank.GitVersioning:
```json
{
  "version": "0.1",
  "publicReleaseRefSpec": [
    "^refs/tags/v\\d+\\.\\d+"
  ]
}
```

### Step 5: Modify `.csproj` files using the `dotnet` CLI only
Use `dotnet` CLI commands to modify `.csproj` contents. Do not hand-edit `.csproj` files.

Common examples:
```bash
# Add/remove packages
dotnet add My.Library/My.Library.csproj package Microsoft.Extensions.Logging
dotnet remove My.Library/My.Library.csproj package Microsoft.Extensions.Logging

# Add/remove project references
dotnet add My.App/My.App.csproj reference My.Library/My.Library.csproj
dotnet remove My.App/My.App.csproj reference My.Library/My.Library.csproj

# List packages and references
dotnet list My.Library/My.Library.csproj package
dotnet list My.App/My.App.csproj reference

# Add/remove projects to a solution
dotnet sln MySolution.sln add My.Library/My.Library.csproj
dotnet sln MySolution.sln remove My.Library/My.Library.csproj
```

For property changes (frameworks, analyzers, warning settings, pack metadata), update `Directory.Build.props` instead of editing `.csproj`.

### Default packages for .NET extensions (NuGet only)
Only list and include the following packages by default for the linked extension areas:

- Isolated Storage: none (inbox)
- AppContext and opt-out features: none (inbox)
- Resources: `Microsoft.Extensions.Localization`, `Microsoft.Extensions.Localization.Abstractions`
- Primitives and change notifications: `Microsoft.Extensions.Primitives`
- Service discovery: `Microsoft.Extensions.ServiceDiscovery`, `Microsoft.Extensions.ServiceDiscovery.Abstractions`, `Microsoft.Extensions.ServiceDiscovery.Http`
- Resiliency: `Microsoft.Extensions.Resilience`, `Microsoft.Extensions.Http.Resilience`
- Generic host: `Microsoft.Extensions.Hosting`, `Microsoft.Extensions.Hosting.Abstractions`
- Logging: `Microsoft.Extensions.Logging`, `Microsoft.Extensions.Logging.Abstractions`, `Microsoft.Extensions.Logging.Configuration`, `Microsoft.Extensions.Logging.Console`
- Configuration: `Microsoft.Extensions.Configuration`, `Microsoft.Extensions.Configuration.Abstractions`, `Microsoft.Extensions.Configuration.Binder`, `Microsoft.Extensions.Configuration.Json`, `Microsoft.Extensions.Configuration.EnvironmentVariables`, `Microsoft.Extensions.Configuration.CommandLine`
- DI: `Microsoft.Extensions.DependencyInjection`, `Microsoft.Extensions.DependencyInjection.Abstractions`
- IO abstractions: `System.IO.Abstractions`
- Compliance: `Microsoft.Extensions.Compliance`, `Microsoft.Extensions.Compliance.Abstractions`
- Caching: `Microsoft.Extensions.Caching.Abstractions`, `Microsoft.Extensions.Caching.Memory`, `Microsoft.Extensions.Caching.Distributed`
- Globalization and localization: `Microsoft.Extensions.Localization`, `Microsoft.Extensions.Localization.Abstractions`

### Step 6: Test projects with Microsoft.Testing.Platform and MSTest
Create tests using the MTP + MSTest stack and configure code coverage.

Scaffold a test project:
```bash
dotnet new mstest -n My.Tests
dotnet sln MySolution.slnx add My.Tests/My.Tests.csproj
```

Add test packages (CLI only):
```bash
dotnet add My.Tests/My.Tests.csproj package MSTest.Sdk
dotnet add My.Tests/My.Tests.csproj package MSTest.TestFramework
dotnet add My.Tests/My.Tests.csproj package Microsoft.Testing.Platform
dotnet add My.Tests/My.Tests.csproj package Microsoft.Testing.Extensions.CodeCoverage
```

Run tests and collect coverage:
```bash
dotnet test My.Tests/My.Tests.csproj -- --coverage
```

Use coverage results to triage, diagnose, and debug issues with the app. Focus on uncovered paths tied to failing tests or production incidents.

### Step 7: Add a `global.json` (recommended)
Pin the SDK version for consistent builds:

```json
{
  "sdk": {
    "version": "10.0.100",
    "rollForward": "latestFeature"
  }
}
```

## Validation Commands
Run these commands to verify everything is wired correctly:
```bash
dotnet --info

dotnet restore

dotnet build
```

## Summary Checklist
- `Directory.Build.props` created with explicit defaults.
- `Directory.Packages.props` created with CPM enabled and versions centralized.
- Nerdbank.GitVersioning included as a global dependency.
- All project scaffolding done with `dotnet new`.
- All `.csproj` changes done with `dotnet` CLI only.
- Build succeeds with `dotnet build`.
