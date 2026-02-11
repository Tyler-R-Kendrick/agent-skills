---
title: "Use `ManifestEmbeddedFileProvider` with `GenerateEmbeddedFilesManifest`"
impact: MEDIUM
impactDescription: "general best practice"
tags: file-provider, dotnet, general, abstracting-file-access-over-physical-files, embedded-resources, and-composite-sources
---

## Use `ManifestEmbeddedFileProvider` with `GenerateEmbeddedFilesManifest`

Use `ManifestEmbeddedFileProvider` with `GenerateEmbeddedFilesManifest`: in the `.csproj` to preserve directory structure; without the manifest, directory listings are not supported.
