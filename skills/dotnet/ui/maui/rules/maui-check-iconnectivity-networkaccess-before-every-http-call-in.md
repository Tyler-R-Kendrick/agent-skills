---
title: "Check `IConnectivity.NetworkAccess` before every HTTP call in view model commands"
impact: MEDIUM
impactDescription: "general best practice"
tags: maui, dotnet, ui, building-cross-platform-native-mobile-and-desktop-applications-with-net-maui-targeting-ios, android, windows
---

## Check `IConnectivity.NetworkAccess` before every HTTP call in view model commands

Check `IConnectivity.NetworkAccess` before every HTTP call in view model commands: and display a user-facing alert on failure rather than catching `HttpRequestException` generically, because mobile networks transition between states frequently and users expect clear feedback.
