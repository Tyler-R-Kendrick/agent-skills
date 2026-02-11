---
title: "Register DevExpress services before `builder.Build()` using `builder.Services.AddDevExpressBlazor()`"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: devexpress, dotnet, ui, building-enterprise-net-applications-using-devexpress-ui-components-for-blazor, winforms, wpf
---

## Register DevExpress services before `builder.Build()` using `builder.Services.AddDevExpressBlazor()`

Register DevExpress services before `builder.Build()` using `builder.Services.AddDevExpressBlazor()`: and add the `<DxResourceManager>` component in the `<head>` section of `App.razor` to ensure CSS and JavaScript resources are loaded before any DevExpress component renders.
