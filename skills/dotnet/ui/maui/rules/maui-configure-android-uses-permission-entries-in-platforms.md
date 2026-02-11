---
title: "Configure Android `<uses-permission>` entries in `Platforms/Android/AndroidManifest.xml` for every platform API used"
impact: MEDIUM
impactDescription: "general best practice"
tags: maui, dotnet, ui, building-cross-platform-native-mobile-and-desktop-applications-with-net-maui-targeting-ios, android, windows
---

## Configure Android `<uses-permission>` entries in `Platforms/Android/AndroidManifest.xml` for every platform API used

(camera, location, contacts) and request runtime permissions via `Permissions.RequestAsync<T>()` before accessing the API; missing runtime permission requests cause silent failures on Android 13+.
