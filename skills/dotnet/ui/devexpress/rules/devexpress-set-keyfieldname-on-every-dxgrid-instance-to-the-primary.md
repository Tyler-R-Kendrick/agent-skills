---
title: "Set `KeyFieldName` on every `DxGrid` instance to the primary key property"
impact: MEDIUM
impactDescription: "general best practice"
tags: devexpress, dotnet, ui, building-enterprise-net-applications-using-devexpress-ui-components-for-blazor, winforms, wpf
---

## Set `KeyFieldName` on every `DxGrid` instance to the primary key property

Set `KeyFieldName` on every `DxGrid` instance to the primary key property: because DevExpress uses this field to track row identity during editing, selection, and focus operations; omitting it causes unpredictable behavior when rows are added or reordered.
