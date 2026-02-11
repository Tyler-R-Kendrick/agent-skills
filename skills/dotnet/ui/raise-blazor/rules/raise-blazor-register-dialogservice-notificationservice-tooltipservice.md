---
title: "Register `DialogService`, `NotificationService`, `TooltipService`, and `ContextMenuService` as `Scoped` in `Program.cs`"
impact: MEDIUM
impactDescription: "general best practice"
tags: raise-blazor, dotnet, ui, building-blazor-applications-with-radzen-blazor-components, including-datagrid, form
---

## Register `DialogService`, `NotificationService`, `TooltipService`, and `ContextMenuService` as `Scoped` in `Program.cs`

Register `DialogService`, `NotificationService`, `TooltipService`, and `ContextMenuService` as `Scoped` in `Program.cs`: and add the corresponding `<RadzenDialog />`, `<RadzenNotification />`, `<RadzenTooltip />`, and `<RadzenContextMenu />` components in `MainLayout.razor`, not in individual pages; missing these root components causes silent failures when services are injected.
