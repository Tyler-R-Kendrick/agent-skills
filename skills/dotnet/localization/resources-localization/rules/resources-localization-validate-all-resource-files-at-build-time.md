---
title: "Validate all resource files at build time"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: resources-localization, dotnet, localization, resx-resource-file-management, istringlocalizer-and-istringlocalizerfactory-usage, strongly-typed-resource-access
---

## Validate all resource files at build time

Validate all resource files at build time: by enabling `MissingManifestResourceException` detection in tests or CI to catch `.resx` files that were not embedded correctly.
