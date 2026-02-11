---
title: "Install Cake as a local dotnet tool with a tool manifest"
impact: MEDIUM
impactDescription: "general best practice"
tags: make-cake, dotnet, project-system, writing-cross-platform-build-automation-scripts-in-c-using-cake-c-make-for-compiling, testing, packaging
---

## Install Cake as a local dotnet tool with a tool manifest

Install Cake as a local dotnet tool with a tool manifest: by running `dotnet new tool-manifest && dotnet tool install Cake.Tool` so that the exact Cake version is pinned in `.config/dotnet-tools.json` and reproducible across machines.
