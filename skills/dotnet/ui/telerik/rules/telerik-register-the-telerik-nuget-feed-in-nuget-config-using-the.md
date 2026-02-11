---
title: "Register the Telerik NuGet feed in `nuget.config` using the private feed URL and API key stored in CI secrets"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: telerik, dotnet, ui, building-enterprise-net-applications-using-telerik-ui-components-for-blazor, wpf, winforms
---

## Register the Telerik NuGet feed in `nuget.config` using the private feed URL and API key stored in CI secrets

(`https://nuget.telerik.com/v3/index.json`), and never commit the API key to source control; the feed requires an active Telerik license.
