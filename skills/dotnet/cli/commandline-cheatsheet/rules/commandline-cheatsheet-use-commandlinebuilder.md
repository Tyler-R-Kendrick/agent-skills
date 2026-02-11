---
title: "Use `CommandLineBuilder"
impact: MEDIUM
impactDescription: "general best practice"
tags: commandline-cheatsheet, dotnet, cli, building-cli-applications-with-typed-argument-parsing, creating-dotnet-tools-with-subcommands, systemcommandline-setup-and-configuration
---

## Use `CommandLineBuilder

Use `CommandLineBuilder.UseDefaults()` to enable automatic help (`--help`), version (`--version`), parse error reporting, and suggest-typo features without manual configuration.
