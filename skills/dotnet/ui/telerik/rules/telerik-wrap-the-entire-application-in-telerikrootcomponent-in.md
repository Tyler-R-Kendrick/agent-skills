---
title: "Wrap the entire application in `<TelerikRootComponent>` in `MainLayout.razor`"
impact: MEDIUM
impactDescription: "general best practice"
tags: telerik, dotnet, ui, building-enterprise-net-applications-using-telerik-ui-components-for-blazor, wpf, winforms
---

## Wrap the entire application in `<TelerikRootComponent>` in `MainLayout.razor`

Wrap the entire application in `<TelerikRootComponent>` in `MainLayout.razor`: rather than placing it on individual pages, because Telerik dialogs, context menus, and tooltips render at the root level and fail to display if the root component is missing or nested incorrectly.
