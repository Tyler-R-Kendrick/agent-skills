---
title: "Prefer `ObservableCollection<T>` and `[ObservableProperty]` from CommunityToolkit.Mvvm"
impact: LOW
impactDescription: "recommended but situational"
tags: avalonia, dotnet, ui, building-cross-platform-desktop-and-mobile-applications-with-xaml-based-ui-using-avalonia-on-net-use-when-targeting-windows, macos, linux
---

## Prefer `ObservableCollection<T>` and `[ObservableProperty]` from CommunityToolkit.Mvvm

Prefer `ObservableCollection<T>` and `[ObservableProperty]` from CommunityToolkit.Mvvm: over manual `INotifyPropertyChanged` implementations; the source generator eliminates boilerplate and guarantees correct property-change notification naming.
