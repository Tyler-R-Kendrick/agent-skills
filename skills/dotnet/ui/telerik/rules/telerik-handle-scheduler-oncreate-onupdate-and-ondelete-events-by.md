---
title: "Handle Scheduler `OnCreate`, `OnUpdate`, and `OnDelete` events by mutating the bound collection and persisting to the database in the same handler"
impact: MEDIUM
impactDescription: "general best practice"
tags: telerik, dotnet, ui, building-enterprise-net-applications-using-telerik-ui-components-for-blazor, wpf, winforms
---

## Handle Scheduler `OnCreate`, `OnUpdate`, and `OnDelete` events by mutating the bound collection and persisting to the database in the same handler

, because the Scheduler does not automatically add/update items in the data source; if you persist but forget to update the in-memory list, the appointment disappears until the next data refresh.
