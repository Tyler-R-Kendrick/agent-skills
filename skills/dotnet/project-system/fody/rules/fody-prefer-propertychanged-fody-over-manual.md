---
title: "Prefer PropertyChanged.Fody over manual `INotifyPropertyChanged` implementation in MVVM projects"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: fody, dotnet, project-system, il-weaving-at-build-time-to-inject-cross-cutting-concerns-such-as-inotifypropertychanged-implementation, null-guard-checks, method-timing
---

## Prefer PropertyChanged.Fody over manual `INotifyPropertyChanged` implementation in MVVM projects

Prefer PropertyChanged.Fody over manual `INotifyPropertyChanged` implementation in MVVM projects: to eliminate hundreds of lines of boilerplate, but always verify that computed property dependencies (like `FullName` depending on `FirstName`) are detected correctly.
