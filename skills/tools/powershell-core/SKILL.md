---
name: powershell-core
description: |
    Use when writing PowerShell scripts or automating tasks with PowerShell 7+ (the cross-platform edition). Covers cmdlet patterns, pipeline, objects vs text, modules, error handling, remoting, and differences from Windows PowerShell 5.1.
    USE FOR: PowerShell 7, PowerShell Core, pwsh, cmdlets, PowerShell pipeline, PowerShell modules, PowerShell remoting, cross-platform scripting, PowerShell profiles, PSReadLine, PowerShell error handling
    DO NOT USE FOR: Bash/Zsh scripting (use bash), Windows-only legacy PowerShell 5.1 (still relevant but this skill focuses on 7+), system administration deep dives (use platform-specific skills)
license: MIT
metadata:
  displayName: "PowerShell Core"
  author: "Tyler-R-Kendrick"
compatibility: claude, copilot, cursor
references:
  - title: "PowerShell Documentation (Microsoft)"
    url: "https://learn.microsoft.com/en-us/powershell/"
  - title: "PowerShell GitHub Repository"
    url: "https://github.com/PowerShell/PowerShell"
---

# PowerShell Core

## Overview

PowerShell 7+ is a cross-platform shell and scripting language that runs on Windows, macOS, and Linux. Unlike traditional shells that pass text between commands, PowerShell passes structured .NET objects through the pipeline. This means you can filter, sort, and transform data without parsing strings — the properties and types are preserved end-to-end. It is the only shell that works identically across all three major OS platforms while providing rich object-oriented capabilities built on the .NET runtime.

## Installation

| Platform | Command |
|----------|---------|
| Windows | `winget install Microsoft.PowerShell` |
| macOS | `brew install powershell/tap/powershell` |
| Linux (Ubuntu/Debian) | `apt install powershell` |
| Linux (Fedora) | `dnf install powershell` |

After installation, launch with `pwsh` (not `powershell`, which starts legacy 5.1 on Windows).

## PowerShell vs Bash

| Feature | PowerShell | Bash |
|---------|-----------|------|
| Pipeline passes | Structured .NET objects | Plain text strings |
| Output type | Rich objects with properties and methods | Strings (lines of text) |
| Parsing structured data | Built-in (`ConvertFrom-Json`, `Select-Object`) | Requires `awk`, `sed`, `grep`, `jq` |
| Cross-platform | Yes, natively (Windows, macOS, Linux) | Yes, natively (macOS, Linux; WSL/Git Bash on Windows) |
| Discoverability | `Get-Command`, `Get-Help`, `Get-Member` | `man`, `--help`, `apropos` |
| Package manager | PowerShell Gallery / `Install-Module` | Varies by OS (`apt`, `brew`, `dnf`) |
| Error handling | `try`/`catch`/`finally` with typed exceptions | Exit codes, `trap`, `set -e` |
| Scripting syntax | C#-like, verbose, self-documenting | Terse, symbol-heavy |

## Core Concepts

### Verb-Noun Cmdlet Pattern

Every built-in command follows a `Verb-Noun` naming convention, making commands discoverable and predictable:

```powershell
Get-Process          # Retrieve running processes
Set-Content          # Write content to a file
New-Item             # Create a file, directory, or registry key
Remove-Item          # Delete files, directories, or registry keys
Invoke-WebRequest    # Make an HTTP request
Get-Service          # List system services
Start-Job            # Run a command as a background job
```

Discover commands with:

```powershell
Get-Command -Verb Get              # All "Get" commands
Get-Command -Noun Process          # All commands related to processes
Get-Command *network*              # Wildcard search
```

### Pipeline with Objects

The pipeline (`|`) passes full .NET objects, not text. Each object retains its properties:

```powershell
# Find the top 5 processes by CPU usage
Get-Process | Where-Object CPU -gt 100 | Sort-Object CPU -Descending | Select-Object -First 5 Name, CPU, Id

# Get services that are running and start with "Win"
Get-Service | Where-Object { $_.Status -eq 'Running' -and $_.Name -like 'Win*' }

# Explore what properties an object has
Get-Process | Get-Member
```

### Variables and Type System

```powershell
# Variables start with $
$name = "PowerShell"
$count = 42
$today = Get-Date

# Environment variables
$env:PATH
$env:HOME

# Explicit types
[string]$greeting = "Hello"
[int]$port = 8080
[datetime]$deadline = "2025-12-31"
[hashtable]$config = @{ Key = "Value"; Port = 8080 }
[PSCustomObject]$person = @{ Name = "Alice"; Age = 30 }

# Arrays
[string[]]$fruits = @("apple", "banana", "cherry")

# Type checking
$name -is [string]    # True
$count.GetType().Name # Int32
```

## Common Operations

### File Operations

```powershell
# Read a file
$content = Get-Content -Path ./config.json
$lines = Get-Content -Path ./log.txt -Tail 20       # Last 20 lines
$raw = Get-Content -Path ./data.bin -AsByteStream    # Binary read

# Write to a file
"Hello, World!" | Set-Content -Path ./output.txt
"Appended line" | Add-Content -Path ./output.txt

# List files and directories
Get-ChildItem -Path ./src -Recurse -Filter *.ps1
Get-ChildItem -Path . -Directory                     # Directories only
Get-ChildItem -Path . -File -Hidden                  # Hidden files

# Create files and directories
New-Item -Path ./logs -ItemType Directory
New-Item -Path ./logs/app.log -ItemType File

# Copy, move, remove
Copy-Item -Path ./source.txt -Destination ./backup/
Move-Item -Path ./old.txt -Destination ./archive/old.txt
Remove-Item -Path ./temp -Recurse -Force

# Check existence
Test-Path -Path ./config.json                        # Returns True/False
```

### String Operations

```powershell
# Pattern matching with regex
"Error: file not found" -match "Error:\s+(.+)"    # True; $Matches[1] = "file not found"

# Replace
"Hello World" -replace "World", "PowerShell"       # "Hello PowerShell"

# Split
"one,two,three" -split ","                         # @("one", "two", "three")

# grep equivalent — search file contents
Select-String -Path ./logs/*.log -Pattern "ERROR"
Select-String -Path ./src/**/*.ps1 -Pattern "TODO" -Recurse
```

### JSON Handling

```powershell
# Parse JSON from a file
$config = Get-Content -Path ./config.json | ConvertFrom-Json
$config.database.host

# Parse JSON from a string
$data = '{"name":"Alice","age":30}' | ConvertFrom-Json
$data.name    # "Alice"

# Convert object to JSON
$obj = @{ status = "ok"; count = 42 }
$obj | ConvertTo-Json -Depth 5

# Round-trip: read, modify, write
$pkg = Get-Content ./package.json | ConvertFrom-Json
$pkg.version = "2.0.0"
$pkg | ConvertTo-Json -Depth 10 | Set-Content ./package.json
```

### HTTP Requests

```powershell
# Simple GET — returns parsed content (JSON auto-deserialized)
$response = Invoke-RestMethod -Uri "https://api.github.com/repos/PowerShell/PowerShell"
$response.stargazers_count

# GET with headers
$headers = @{ Authorization = "Bearer $token" }
$data = Invoke-RestMethod -Uri "https://api.example.com/items" -Headers $headers

# POST with JSON body
$body = @{ name = "New Item"; value = 42 } | ConvertTo-Json
Invoke-RestMethod -Uri "https://api.example.com/items" -Method Post -Body $body -ContentType "application/json"

# Full response details (status code, headers)
$response = Invoke-WebRequest -Uri "https://example.com"
$response.StatusCode
$response.Headers
$response.Content
```

### Process Management

```powershell
# List processes
Get-Process | Where-Object CPU -gt 50

# Find a specific process
Get-Process -Name "node" -ErrorAction SilentlyContinue

# Stop a process
Stop-Process -Name "node" -Force
Stop-Process -Id 12345

# Start a process
Start-Process -FilePath "notepad.exe" -ArgumentList "./file.txt"
Start-Process -FilePath "pwsh" -ArgumentList "-File", "./script.ps1" -Wait
```

## Error Handling

```powershell
# try / catch / finally
try {
    $result = Get-Content -Path ./missing.txt -ErrorAction Stop
    Write-Host "File content: $result"
}
catch [System.IO.FileNotFoundException] {
    Write-Warning "File was not found: $($_.Exception.Message)"
}
catch {
    Write-Error "Unexpected error: $($_.Exception.Message)"
    Write-Error "Stack trace: $($_.ScriptStackTrace)"
}
finally {
    Write-Host "Cleanup runs regardless of success or failure."
}

# ErrorActionPreference — controls default behavior for non-terminating errors
$ErrorActionPreference = "Stop"          # Treat all errors as terminating
$ErrorActionPreference = "Continue"      # Show error, keep going (default)
$ErrorActionPreference = "SilentlyContinue"  # Suppress error display

# Per-command error action
Get-Item -Path ./nope -ErrorAction SilentlyContinue
Get-Item -Path ./nope -ErrorAction Stop
```

## Functions and Scripts

### Basic Function

```powershell
function Get-Greeting {
    param(
        [Parameter(Mandatory)]
        [string]$Name,

        [ValidateSet("Morning", "Afternoon", "Evening")]
        [string]$TimeOfDay = "Morning"
    )

    return "Good $TimeOfDay, $Name!"
}

Get-Greeting -Name "Alice" -TimeOfDay "Evening"
# Output: Good Evening, Alice!
```

### Advanced Function with CmdletBinding

```powershell
function Get-LargeFiles {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory, Position = 0)]
        [string]$Path,

        [Parameter()]
        [int]$MinSizeMB = 100,

        [Parameter(ValueFromPipeline)]
        [string]$InputPath
    )

    begin {
        Write-Verbose "Searching for files larger than ${MinSizeMB}MB"
    }

    process {
        $searchPath = if ($InputPath) { $InputPath } else { $Path }
        Get-ChildItem -Path $searchPath -Recurse -File |
            Where-Object { $_.Length -gt ($MinSizeMB * 1MB) } |
            Select-Object FullName, @{Name='SizeMB'; Expression={[math]::Round($_.Length / 1MB, 2)}}
    }

    end {
        Write-Verbose "Search complete."
    }
}

# Usage
Get-LargeFiles -Path "C:\Users" -MinSizeMB 50 -Verbose

# Pipeline input
@("./src", "./build") | Get-LargeFiles -MinSizeMB 10
```

## Modules

```powershell
# Install a module from the PowerShell Gallery
Install-Module -Name Az -Scope CurrentUser          # Azure module
Install-Module -Name Pester -Scope CurrentUser       # Testing framework
Install-Module -Name PSScriptAnalyzer -Scope CurrentUser  # Linter

# Import a module (usually automatic after install)
Import-Module -Name Az.Accounts

# List installed modules
Get-Module -ListAvailable

# Update a module
Update-Module -Name Az

# Find modules in the gallery
Find-Module -Name *docker*
```

### Creating a Module

A module consists of a `.psm1` script file and a `.psd1` manifest:

```powershell
# MyModule.psm1 — the module code
function Get-Greeting { param([string]$Name) "Hello, $Name!" }
function Get-Farewell { param([string]$Name) "Goodbye, $Name!" }

Export-ModuleMember -Function Get-Greeting, Get-Farewell
```

```powershell
# Generate the manifest
New-ModuleManifest -Path ./MyModule.psd1 `
    -RootModule "MyModule.psm1" `
    -ModuleVersion "1.0.0" `
    -Author "Your Name" `
    -Description "A sample module"
```

## Profile

The PowerShell profile is a script that runs automatically when a new session starts.

```powershell
# Show profile path(s)
$PROFILE                              # Current user, current host
$PROFILE.AllUsersAllHosts             # All users, all hosts
$PROFILE.CurrentUserAllHosts          # Current user, all hosts

# Create profile if it doesn't exist
if (-not (Test-Path $PROFILE)) {
    New-Item -Path $PROFILE -ItemType File -Force
}

# Edit your profile
code $PROFILE    # or: notepad $PROFILE
```

### Common Profile Customizations

```powershell
# Aliases
Set-Alias -Name g -Value git
Set-Alias -Name ll -Value Get-ChildItem
Set-Alias -Name which -Value Get-Command

# Custom prompt
function prompt {
    $location = (Get-Location).Path | Split-Path -Leaf
    "$location> "
}

# PSReadLine configuration (tab completion, history search)
Set-PSReadLineOption -PredictionSource History
Set-PSReadLineOption -PredictionViewStyle ListView
Set-PSReadLineKeyHandler -Key Tab -Function MenuComplete
Set-PSReadLineKeyHandler -Key UpArrow -Function HistorySearchBackward
Set-PSReadLineKeyHandler -Key DownArrow -Function HistorySearchForward

# Import commonly used modules
Import-Module posh-git          # Git status in prompt
Import-Module Terminal-Icons     # File icons in terminal
```

## Useful One-Liners

```powershell
# Find files larger than 100MB in the current directory tree
Get-ChildItem -Recurse -File | Where-Object Length -gt 100MB | Select-Object FullName, @{N='MB';E={[math]::Round($_.Length/1MB,1)}}

# Check which ports are in use
Get-NetTCPConnection -State Listen | Select-Object LocalPort, OwningProcess, @{N='Process';E={(Get-Process -Id $_.OwningProcess).ProcessName}} | Sort-Object LocalPort

# Monitor a process's memory usage every 2 seconds
while ($true) { Get-Process -Name "node" -ErrorAction SilentlyContinue | Select-Object Name, @{N='MB';E={[math]::Round($_.WorkingSet64/1MB)}}; Start-Sleep 2 }

# Parse a CSV and filter rows
Import-Csv ./data.csv | Where-Object { [int]$_.Age -gt 30 } | Export-Csv ./filtered.csv -NoTypeInformation

# Query a REST API and format as a table
Invoke-RestMethod "https://jsonplaceholder.typicode.com/users" | Format-Table Name, Email, @{N='City';E={$_.address.city}}

# Format directory listing as a sorted table by size
Get-ChildItem -File | Sort-Object Length -Descending | Format-Table Name, @{N='Size';E={"{0:N2} KB" -f ($_.Length/1KB)}}, LastWriteTime

# Find duplicate files by hash
Get-ChildItem -Recurse -File | Get-FileHash | Group-Object Hash | Where-Object Count -gt 1 | ForEach-Object { $_.Group | Select-Object Path, Hash }

# Recursively search for a string across source files
Get-ChildItem -Recurse -Include *.ps1,*.psm1 | Select-String -Pattern "TODO" | Format-Table Path, LineNumber, Line -AutoSize
```

## Best Practices

- **Use `pwsh` not `powershell`.** The `pwsh` command launches PowerShell 7+, while `powershell` launches the legacy 5.1 on Windows. Always be explicit about which version you target.
- **Use approved verbs for function names.** Run `Get-Verb` to see the list. Following the Verb-Noun convention makes your functions discoverable and consistent with the ecosystem.
- **Prefer `-ErrorAction Stop` in scripts.** Non-terminating errors are silent by default. Using `-ErrorAction Stop` or setting `$ErrorActionPreference = "Stop"` ensures errors are caught by `try`/`catch`.
- **Use `[CmdletBinding()]` on all functions.** It enables `-Verbose`, `-Debug`, `-ErrorAction`, and other standard parameters at zero cost.
- **Avoid aliases in scripts.** Aliases like `%`, `?`, `gci`, and `sls` are convenient interactively but make scripts hard to read. Use full cmdlet names in committed code.
- **Use splatting for long parameter lists.** Instead of one-liners with many parameters, build a `$params` hashtable and call with `@params` for readability.
- **Leverage the pipeline instead of `foreach` loops.** PowerShell's pipeline streams objects and uses less memory than collecting everything into an array first.
- **Test with Pester.** Pester is the standard testing framework for PowerShell. Write tests for any module or script that will be reused or shared.
