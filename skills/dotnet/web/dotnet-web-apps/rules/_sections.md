# .NET Web Apps Rules

Best practices and rules for .NET Web Apps.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Choose Razor Pages for page-centric web apps | MEDIUM | [`dotnet-web-apps-choose-razor-pages-for-page-centric-web-apps.md`](dotnet-web-apps-choose-razor-pages-for-page-centric-web-apps.md) |
| 2 | Organize minimal API endpoints into static extension methods | MEDIUM | [`dotnet-web-apps-organize-minimal-api-endpoints-into-static-extension-methods.md`](dotnet-web-apps-organize-minimal-api-endpoints-into-static-extension-methods.md) |
| 3 | Use `MapGroup()` to share route prefixes, tags, filters, and authorization policies | HIGH | [`dotnet-web-apps-use-mapgroup-to-share-route-prefixes-tags-filters-and.md`](dotnet-web-apps-use-mapgroup-to-share-route-prefixes-tags-filters-and.md) |
| 4 | Apply `[ValidateAntiForgeryToken]` on every MVC `[HttpPost]` action and Razor Page `OnPost` handler | HIGH | [`dotnet-web-apps-apply-validateantiforgerytoken-on-every-mvc-httppost-action.md`](dotnet-web-apps-apply-validateantiforgerytoken-on-every-mvc-httppost-action.md) |
| 5 | Use `TempData` for post-redirect-get (PRG) success messages | MEDIUM | [`dotnet-web-apps-use-tempdata-for-post-redirect-get-prg-success-messages.md`](dotnet-web-apps-use-tempdata-for-post-redirect-get-prg-success-messages.md) |
| 6 | Set `[BindProperty]` on Razor Page properties that receive form data | HIGH | [`dotnet-web-apps-set-bindproperty-on-razor-page-properties-that-receive-form.md`](dotnet-web-apps-set-bindproperty-on-razor-page-properties-that-receive-form.md) |
| 7 | Configure `AddControllersWithViews()` or `AddRazorPages()` with `AddJsonOptions(options => options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase)` | HIGH | [`dotnet-web-apps-configure-addcontrollerswithviews-or-addrazorpages-with.md`](dotnet-web-apps-configure-addcontrollerswithviews-or-addrazorpages-with.md) |
| 8 | Use the `IWebHostEnvironment.IsDevelopment()` check to conditionally enable Swagger, detailed error pages, and developer exception page | CRITICAL | [`dotnet-web-apps-use-the-iwebhostenvironment-isdevelopment-check-to.md`](dotnet-web-apps-use-the-iwebhostenvironment-isdevelopment-check-to.md) |
| 9 | Implement `IAsyncActionFilter` or endpoint filters for cross-cutting validation | MEDIUM | [`dotnet-web-apps-implement-iasyncactionfilter-or-endpoint-filters-for-cross.md`](dotnet-web-apps-implement-iasyncactionfilter-or-endpoint-filters-for-cross.md) |
| 10 | Deploy behind a reverse proxy (NGINX, Azure App Gateway, YARP) and configure `ForwardedHeaders` middleware | MEDIUM | [`dotnet-web-apps-deploy-behind-a-reverse-proxy-nginx-azure-app-gateway-yarp.md`](dotnet-web-apps-deploy-behind-a-reverse-proxy-nginx-azure-app-gateway-yarp.md) |
