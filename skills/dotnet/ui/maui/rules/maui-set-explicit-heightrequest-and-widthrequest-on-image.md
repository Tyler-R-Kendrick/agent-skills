---
title: "Set explicit `HeightRequest` and `WidthRequest` on `Image` controls inside `CollectionView` item templates"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: maui, dotnet, ui, building-cross-platform-native-mobile-and-desktop-applications-with-net-maui-targeting-ios, android, windows
---

## Set explicit `HeightRequest` and `WidthRequest` on `Image` controls inside `CollectionView` item templates

Set explicit `HeightRequest` and `WidthRequest` on `Image` controls inside `CollectionView` item templates: and use `Aspect="AspectFill"` to prevent layout thrashing; images without explicit dimensions cause the layout engine to recalculate on every frame as the image loads asynchronously.
