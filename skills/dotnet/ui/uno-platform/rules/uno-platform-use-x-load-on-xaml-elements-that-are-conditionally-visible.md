---
title: "Use `x:Load` on XAML elements that are conditionally visible"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: uno-platform, dotnet, ui, building-cross-platform-applications-with-winuixaml-and-c-that-target-web-webassembly, ios, android
---

## Use `x:Load` on XAML elements that are conditionally visible

(panels, dialogs, secondary tabs) instead of `Visibility="Collapsed"`, because `x:Load="False"` prevents the element from being created in the visual tree entirely, reducing initial layout cost and memory on mobile and WASM.
