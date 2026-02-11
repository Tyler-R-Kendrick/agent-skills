---
title: "Set `IsRequired = true` on mandatory options and provide..."
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: commandline-cheatsheet, dotnet, cli, building-cli-applications-with-typed-argument-parsing, creating-dotnet-tools-with-subcommands, systemcommandline-setup-and-configuration
---

## Set `IsRequired = true` on mandatory options and provide...

Set `IsRequired = true` on mandatory options and provide `getDefaultValue` factories on optional ones so the help text accurately reflects what is required vs. optional.
