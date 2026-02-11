---
name: gitversion
description: >
  USE FOR: Deriving semantic version numbers from Git history, branch names, tags, and commit
  messages to automate versioning in CI/CD pipelines and NuGet package publishing.
  DO NOT USE FOR: Manual version bumping in .csproj files, runtime version display logic,
  or changelog generation (use tools like versionize or conventional-changelog for that).
license: MIT
metadata:
  displayName: GitVersion
  author: "Tyler-R-Kendrick"
  version: "1.0.0"
compatibility:
  - claude
  - copilot
  - cursor
references:
  - title: "GitVersion Documentation"
    url: "https://gitversion.net/docs/"
  - title: "GitVersion GitHub Repository"
    url: "https://github.com/GitTools/GitVersion"
  - title: "GitVersion.Tool NuGet Package"
    url: "https://www.nuget.org/packages/GitVersion.Tool"
---

# GitVersion

## Overview

GitVersion is a tool that calculates semantic version numbers (SemVer) from Git repository history. It inspects branches, tags, merge commits, and commit messages to determine the current version without requiring developers to manually update version strings. GitVersion outputs version variables (`Major`, `Minor`, `Patch`, `PreReleaseTag`, `SemVer`, `NuGetVersionV2`, `InformationalVersion`, and more) that can be consumed by MSBuild, CI/CD systems, and NuGet packaging.

GitVersion supports multiple versioning modes, branching strategies (GitFlow, GitHubFlow, trunk-based), and can be installed as a .NET global tool, a CLI, or a CI/CD action.

## Installation

```bash
# Install as a .NET global tool
dotnet tool install --global GitVersion.Tool

# Or as a local tool (recommended for CI reproducibility)
dotnet new tool-manifest
dotnet tool install GitVersion.Tool

# Verify installation
dotnet gitversion /version
```

## Configuration

GitVersion is configured via a `GitVersion.yml` file at the repository root.

```yaml
# GitVersion.yml
mode: ContinuousDelivery
assembly-versioning-scheme: MajorMinorPatch
assembly-file-versioning-scheme: MajorMinorPatch
tag-prefix: 'v'
major-version-bump-message: '\+semver:\s?(breaking|major)'
minor-version-bump-message: '\+semver:\s?(feature|minor)'
patch-version-bump-message: '\+semver:\s?(fix|patch)'
commit-message-incrementing: Enabled

branches:
  main:
    regex: ^main$
    tag: ''
    increment: Patch
    prevent-increment-of-merged-branch-version: true
    is-release-branch: true

  develop:
    regex: ^develop$
    tag: alpha
    increment: Minor
    is-main-branch: false

  feature:
    regex: ^feature[/-]
    tag: feature.{BranchName}
    increment: Inherit

  release:
    regex: ^release[/-]
    tag: rc
    increment: None
    is-release-branch: true

  hotfix:
    regex: ^hotfix[/-]
    tag: hotfix
    increment: Patch

  pull-request:
    regex: ^(pull|pr)[/-]
    tag: pr.{BranchName}
    increment: Inherit
```

## Versioning Modes

GitVersion provides three modes that differ in how they calculate pre-release numbers.

### ContinuousDelivery Mode

The default mode. Versions are bumped based on tags on the main branch. Pre-release labels include commit height.

```yaml
mode: ContinuousDelivery

# Tag v1.2.0 on main, then 3 commits later:
# SemVer: 1.2.1-alpha.3
# On main after merge:
# SemVer: 1.2.1 (after tagging)
```

### ContinuousDeployment Mode

Every commit gets a unique version. No tagging is required. The commit count since the last version bump is the pre-release number.

```yaml
mode: ContinuousDeployment

# After 5 commits since last bump:
# On main: 1.3.0-ci.5
# On develop: 1.3.0-alpha.5
```

### Mainline Mode

Designed for trunk-based development. Every merge to main increments the version. No pre-release labels on main.

```yaml
mode: Mainline

# Each merge to main increments patch:
# Commit 1: 1.0.0
# Commit 2: 1.0.1
# Commit 3: 1.0.2
# Feature branch: 1.0.3-feature-xyz.1
```

## Mode Comparison

| Feature                | ContinuousDelivery       | ContinuousDeployment     | Mainline                 |
|------------------------|--------------------------|--------------------------|--------------------------|
| Tagging required       | Yes, for releases        | No                       | No                       |
| Pre-release on main    | Only if untagged         | Always (ci label)        | Never                    |
| Commit height          | In pre-release label     | In pre-release label     | Increments patch         |
| Best for               | GitFlow, release trains  | CI/CD every commit       | Trunk-based development  |
| NuGet pre-release      | `1.2.1-alpha.3`          | `1.3.0-ci.5`             | Feature branches only    |

## MSBuild Integration

GitVersion can set MSBuild properties that flow into `AssemblyVersion`, `FileVersion`, and `InformationalVersion`.

```xml
<!-- Directory.Build.props -->
<Project>
  <PropertyGroup>
    <!-- GitVersion sets these automatically when using the MSBuild task -->
    <GenerateAssemblyInfo>true</GenerateAssemblyInfo>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="GitVersion.MsBuild" Version="5.12.0">
      <PrivateAssets>all</PrivateAssets>
      <IncludeAssets>runtime; build; native; contentfiles; analyzers</IncludeAssets>
    </PackageReference>
  </ItemGroup>
</Project>
```

Alternatively, use the CLI to produce variables and inject them:

```bash
# Output all version variables as JSON
dotnet gitversion /output json

# Output specific variable
dotnet gitversion /showvariable SemVer

# Set environment variables for CI (GitHub Actions)
dotnet gitversion /output buildserver
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
        with:
          fetch-depth: 0  # GitVersion needs full history

      - name: Install GitVersion
        uses: gittools/actions/gitversion/setup@v1
        with:
          versionSpec: '5.x'

      - name: Determine Version
        id: gitversion
        uses: gittools/actions/gitversion/execute@v1

      - name: Build
        run: dotnet build -p:Version=${{ steps.gitversion.outputs.semVer }}

      - name: Pack
        run: dotnet pack -p:PackageVersion=${{ steps.gitversion.outputs.nuGetVersionV2 }}
```

### Azure DevOps

```yaml
# azure-pipelines.yml
steps:
  - task: gitversion/setup@0
    inputs:
      versionSpec: '5.x'

  - task: gitversion/execute@0
    displayName: 'Calculate version'

  - script: dotnet build -p:Version=$(GitVersion.SemVer)
    displayName: 'Build'
```

## Commit Message Bumping

GitVersion can increment major, minor, or patch based on commit message conventions.

```bash
# Patch bump (default for most branches)
git commit -m "fix: resolve null reference in OrderService"

# Minor bump
git commit -m "feat: add customer search endpoint +semver: minor"

# Major bump (breaking change)
git commit -m "refactor: remove deprecated API methods +semver: major"
```

## Accessing Version at Runtime

```csharp
using System;
using System.Reflection;

public static class AppVersion
{
    /// <summary>
    /// Returns the informational version set by GitVersion during build.
    /// Example: "1.2.3-alpha.4+Branch.develop.Sha.abc1234"
    /// </summary>
    public static string GetVersion()
    {
        return typeof(AppVersion).Assembly
            .GetCustomAttribute<AssemblyInformationalVersionAttribute>()
            ?.InformationalVersion ?? "0.0.0";
    }

    /// <summary>
    /// Returns just the SemVer portion without build metadata.
    /// Example: "1.2.3-alpha.4"
    /// </summary>
    public static string GetSemVer()
    {
        string version = GetVersion();
        int plusIndex = version.IndexOf('+');
        return plusIndex >= 0 ? version[..plusIndex] : version;
    }
}
```

## GitVersion vs. Nerdbank.GitVersioning

| Aspect                   | GitVersion                     | Nerdbank.GitVersioning (NBGV) |
|--------------------------|--------------------------------|-------------------------------|
| Configuration            | YAML file                      | `version.json` file           |
| Version source           | Branches, tags, commit messages| `version.json` + commit height|
| SemVer pre-release       | Derived from branch config     | Derived from height           |
| Branching strategy       | GitFlow, GitHubFlow, Mainline  | Any (branch-agnostic)         |
| MSBuild integration      | NuGet package or CLI           | NuGet package (built-in)      |
| Complexity               | More configuration options     | Simpler, fewer knobs          |
| Best for                 | Teams with branching strategies| Trunk-based, simpler needs    |

## Best Practices

1. **Always use `fetch-depth: 0` in CI checkout steps** because GitVersion needs the full Git history and all tags to calculate versions correctly; shallow clones produce incorrect or zero versions.

2. **Choose Mainline mode for trunk-based development and ContinuousDelivery mode for GitFlow** to align version semantics with your branching strategy; mismatched modes produce confusing pre-release labels.

3. **Pin the `tag-prefix` to `v` and use consistent tag formats like `v1.2.3`** so that GitVersion can reliably parse version tags and distinguish them from other tags in the repository.

4. **Use `+semver: major` or `+semver: minor` in commit messages for intentional version bumps** rather than relying solely on branch-based incrementing, especially when a patch-level branch contains a breaking change.

5. **Install GitVersion as a local tool via `dotnet tool install` with a tool manifest** so that the version of GitVersion itself is tracked in source control and all developers and CI agents use the same version.

6. **Set `prevent-increment-of-merged-branch-version: true` on main branch configuration** to prevent version jumps when merging feature branches that have accumulated high commit counts.

7. **Pass `SemVer` to MSBuild's `Version` property and `NuGetVersionV2` to `PackageVersion`** because NuGet has specific pre-release label rules (no dots in some contexts) and `NuGetVersionV2` handles those constraints.

8. **Do not use `AssemblyVersion` for NuGet package versioning** because `AssemblyVersion` changes break binding redirects; use `AssemblyFileVersion` and `InformationalVersion` for the full SemVer string.

9. **Test version calculation locally with `dotnet gitversion` before pushing** to verify that your branch name, commit messages, and tags produce the expected version without waiting for CI.

10. **Configure `assembly-versioning-scheme: MajorMinorPatch` explicitly** rather than relying on defaults to ensure the `AssemblyVersion` attribute contains the full three-part version and not just `Major.0.0.0`.
