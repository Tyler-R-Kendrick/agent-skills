---
title: "Place platform-specific service implementations in `Platforms/{OS}/` folders using partial classes"
impact: MEDIUM
impactDescription: "general best practice"
tags: maui, dotnet, ui, building-cross-platform-native-mobile-and-desktop-applications-with-net-maui-targeting-ios, android, windows
---

## Place platform-specific service implementations in `Platforms/{OS}/` folders using partial classes

Place platform-specific service implementations in `Platforms/{OS}/` folders using partial classes: registered with `#if ANDROID` / `#if IOS` guards in `MauiProgram.cs`, rather than scattering `Device.RuntimePlatform` checks throughout view models.
