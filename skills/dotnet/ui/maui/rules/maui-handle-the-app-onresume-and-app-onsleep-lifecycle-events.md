---
title: "Handle the `App.OnResume()` and `App.OnSleep()` lifecycle events"
impact: MEDIUM
impactDescription: "general best practice"
tags: maui, dotnet, ui, building-cross-platform-native-mobile-and-desktop-applications-with-net-maui-targeting-ios, android, windows
---

## Handle the `App.OnResume()` and `App.OnSleep()` lifecycle events

Handle the `App.OnResume()` and `App.OnSleep()` lifecycle events: to pause background work (timers, location tracking, Bluetooth scanning) and persist unsaved state, because iOS will terminate suspended apps that consume CPU in the background without user consent.
