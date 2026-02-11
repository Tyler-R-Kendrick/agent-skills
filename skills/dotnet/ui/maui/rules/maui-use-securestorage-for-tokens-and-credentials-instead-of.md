---
title: "Use `SecureStorage` for tokens and credentials instead of `Preferences`"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: maui, dotnet, ui, building-cross-platform-native-mobile-and-desktop-applications-with-net-maui-targeting-ios, android, windows
---

## Use `SecureStorage` for tokens and credentials instead of `Preferences`

, because `Preferences` stores values in plaintext SharedPreferences (Android) or UserDefaults (iOS); `SecureStorage` uses Android Keystore and iOS Keychain, which are encrypted at the OS level.
