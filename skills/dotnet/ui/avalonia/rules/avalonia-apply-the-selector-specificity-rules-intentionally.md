---
title: "Apply the `Selector` specificity rules intentionally"
impact: MEDIUM
impactDescription: "general best practice"
tags: avalonia, dotnet, ui, building-cross-platform-desktop-and-mobile-applications-with-xaml-based-ui-using-avalonia-on-net-use-when-targeting-windows, macos, linux
---

## Apply the `Selector` specificity rules intentionally

Apply the `Selector` specificity rules intentionally: place global theme styles in `App.axaml`, page-level overrides in the view's `<UserControl.Styles>` block, and inline setters only for one-off adjustments, mirroring CSS specificity best practices.
