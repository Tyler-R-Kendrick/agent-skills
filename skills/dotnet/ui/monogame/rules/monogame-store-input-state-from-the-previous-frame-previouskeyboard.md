---
title: "Store input state from the previous frame (`_previousKeyboard`, `_previousMouse`) and compare with the current frame"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: monogame, dotnet, ui, building-2d-and-3d-games-with-c-using-the-monogame-framework-use-when-creating-cross-platform-games-for-windows, macos, linux
---

## Store input state from the previous frame (`_previousKeyboard`, `_previousMouse`) and compare with the current frame

Store input state from the previous frame (`_previousKeyboard`, `_previousMouse`) and compare with the current frame: to detect single-press events via `currentState.IsKeyDown(key) && !previousState.IsKeyDown(key)`, preventing continuous-fire behavior from held keys.
