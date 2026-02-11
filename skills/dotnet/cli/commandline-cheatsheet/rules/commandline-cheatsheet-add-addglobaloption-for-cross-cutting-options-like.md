---
title: "Add `AddGlobalOption` for cross-cutting options like..."
impact: MEDIUM
impactDescription: "general best practice"
tags: commandline-cheatsheet, dotnet, cli, building-cli-applications-with-typed-argument-parsing, creating-dotnet-tools-with-subcommands, systemcommandline-setup-and-configuration
---

## Add `AddGlobalOption` for cross-cutting options like...

Add `AddGlobalOption` for cross-cutting options like `--verbose`, `--output-format`, or `--no-color` that apply to all subcommands without repeating them.
