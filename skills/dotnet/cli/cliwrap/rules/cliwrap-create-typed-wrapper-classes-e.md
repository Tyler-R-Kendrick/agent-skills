---
title: "Create typed wrapper classes (e"
impact: MEDIUM
impactDescription: "general best practice"
tags: cliwrap, dotnet, cli, executing-cli-tools-from-net-code, capturing-stdoutstderr-output, piping-between-processes
---

## Create typed wrapper classes (e

Create typed wrapper classes (e.g., `GitClient`, `DockerClient`) that expose domain-specific methods using a shared `BaseCommand` property to centralize working directory, validation, and environment configuration.
