---
title: "Use `CollectionView` instead of `ListView` for all scrollable list UIs"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: maui, dotnet, ui, building-cross-platform-native-mobile-and-desktop-applications-with-net-maui-targeting-ios, android, windows
---

## Use `CollectionView` instead of `ListView` for all scrollable list UIs

Use `CollectionView` instead of `ListView` for all scrollable list UIs: because `CollectionView` supports virtualization by default, handles empty states via `EmptyView`, and does not require `ViewCell` wrappers that add layout overhead on iOS.
