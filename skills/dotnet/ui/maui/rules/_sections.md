# .NET MAUI Rules

Best practices and rules for .NET MAUI.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Register pages and view models as `Transient` in `MauiProgram.cs` and use constructor injection | CRITICAL | [`maui-register-pages-and-view-models-as-transient-in-mauiprogram.md`](maui-register-pages-and-view-models-as-transient-in-mauiprogram.md) |
| 2 | Set `x:DataType` on every `ContentPage` and `DataTemplate` | HIGH | [`maui-set-x-datatype-on-every-contentpage-and-datatemplate.md`](maui-set-x-datatype-on-every-contentpage-and-datatemplate.md) |
| 3 | Use `CollectionView` instead of `ListView` for all scrollable list UIs | HIGH | [`maui-use-collectionview-instead-of-listview-for-all-scrollable.md`](maui-use-collectionview-instead-of-listview-for-all-scrollable.md) |
| 4 | Check `IConnectivity.NetworkAccess` before every HTTP call in view model commands | MEDIUM | [`maui-check-iconnectivity-networkaccess-before-every-http-call-in.md`](maui-check-iconnectivity-networkaccess-before-every-http-call-in.md) |
| 5 | Implement `Shell` navigation with `QueryProperty` or `IQueryAttributable` for page parameters | MEDIUM | [`maui-implement-shell-navigation-with-queryproperty-or.md`](maui-implement-shell-navigation-with-queryproperty-or.md) |
| 6 | Place platform-specific service implementations in `Platforms/{OS}/` folders using partial classes | MEDIUM | [`maui-place-platform-specific-service-implementations-in.md`](maui-place-platform-specific-service-implementations-in.md) |
| 7 | Use `SecureStorage` for tokens and credentials instead of `Preferences` | CRITICAL | [`maui-use-securestorage-for-tokens-and-credentials-instead-of.md`](maui-use-securestorage-for-tokens-and-credentials-instead-of.md) |
| 8 | Set explicit `HeightRequest` and `WidthRequest` on `Image` controls inside `CollectionView` item templates | HIGH | [`maui-set-explicit-heightrequest-and-widthrequest-on-image.md`](maui-set-explicit-heightrequest-and-widthrequest-on-image.md) |
| 9 | Handle the `App.OnResume()` and `App.OnSleep()` lifecycle events | MEDIUM | [`maui-handle-the-app-onresume-and-app-onsleep-lifecycle-events.md`](maui-handle-the-app-onresume-and-app-onsleep-lifecycle-events.md) |
| 10 | Configure Android `<uses-permission>` entries in `Platforms/Android/AndroidManifest.xml` for every platform API used | MEDIUM | [`maui-configure-android-uses-permission-entries-in-platforms.md`](maui-configure-android-uses-permission-entries-in-platforms.md) |
