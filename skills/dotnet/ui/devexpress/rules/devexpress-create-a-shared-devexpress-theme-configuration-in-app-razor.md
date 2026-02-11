---
title: "Create a shared DevExpress theme configuration in `App.razor` using `<DxResourceManager>` and set the global size mode"
impact: MEDIUM
impactDescription: "general best practice"
tags: devexpress, dotnet, ui, building-enterprise-net-applications-using-devexpress-ui-components-for-blazor, winforms, wpf
---

## Create a shared DevExpress theme configuration in `App.razor` using `<DxResourceManager>` and set the global size mode

(`SizeMode.Small`, `Medium`, or `Large`) once, rather than setting `SizeMode` on individual components, which leads to inconsistent density across pages.
