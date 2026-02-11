---
title: "Use `Option<T>` with strongly-typed generics..."
impact: MEDIUM
impactDescription: "general best practice"
tags: commandline-cheatsheet, dotnet, cli, building-cli-applications-with-typed-argument-parsing, creating-dotnet-tools-with-subcommands, systemcommandline-setup-and-configuration
---

## Use `Option<T>` with strongly-typed generics...

Use `Option<T>` with strongly-typed generics (`Option<int>`, `Option<FileInfo>`, `Option<Verbosity>`) instead of `Option<string>` with manual parsing to get automatic validation and help text.
