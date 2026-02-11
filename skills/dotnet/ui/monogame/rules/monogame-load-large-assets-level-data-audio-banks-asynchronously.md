---
title: "Load large assets (level data, audio banks) asynchronously using `Task.Run` with a loading screen"
impact: MEDIUM
impactDescription: "general best practice"
tags: monogame, dotnet, ui, building-2d-and-3d-games-with-c-using-the-monogame-framework-use-when-creating-cross-platform-games-for-windows, macos, linux
---

## Load large assets (level data, audio banks) asynchronously using `Task.Run` with a loading screen

Load large assets (level data, audio banks) asynchronously using `Task.Run` with a loading screen: rather than blocking in `LoadContent`, because synchronous loads exceeding 2 seconds trigger ANR (Application Not Responding) dialogs on Android and watchdog kills on iOS.
