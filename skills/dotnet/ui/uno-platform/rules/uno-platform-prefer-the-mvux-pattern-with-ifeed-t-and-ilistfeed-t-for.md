---
title: "Prefer the MVUX pattern with `IFeed<T>` and `IListFeed<T>` for reactive data flows"
impact: LOW
impactDescription: "recommended but situational"
tags: uno-platform, dotnet, ui, building-cross-platform-applications-with-winuixaml-and-c-that-target-web-webassembly, ios, android
---

## Prefer the MVUX pattern with `IFeed<T>` and `IListFeed<T>` for reactive data flows

Prefer the MVUX pattern with `IFeed<T>` and `IListFeed<T>` for reactive data flows: instead of manually implementing `INotifyPropertyChanged`, because MVUX feeds handle loading states, error states, and empty states declaratively via `FeedView`, reducing boilerplate error-handling UI code.
