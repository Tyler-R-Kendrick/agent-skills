# Avalonia Rules

Best practices and rules for Avalonia.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Always set `x:DataType` on views and data templates | CRITICAL | [`avalonia-always-set-x-datatype-on-views-and-data-templates.md`](avalonia-always-set-x-datatype-on-views-and-data-templates.md) |
| 2 | Separate platform-specific code behind `IPlatformService` abstractions | MEDIUM | [`avalonia-separate-platform-specific-code-behind-iplatformservice.md`](avalonia-separate-platform-specific-code-behind-iplatformservice.md) |
| 3 | Use `AvaloniaProperty.Register` with explicit default values | MEDIUM | [`avalonia-use-avaloniaproperty-register-with-explicit-default-values.md`](avalonia-use-avaloniaproperty-register-with-explicit-default-values.md) |
| 4 | Prefer `ObservableCollection<T>` and `[ObservableProperty]` from CommunityToolkit.Mvvm | LOW | [`avalonia-prefer-observablecollection-t-and-observableproperty-from.md`](avalonia-prefer-observablecollection-t-and-observableproperty-from.md) |
| 5 | Apply the `Selector` specificity rules intentionally | MEDIUM | [`avalonia-apply-the-selector-specificity-rules-intentionally.md`](avalonia-apply-the-selector-specificity-rules-intentionally.md) |
| 6 | Test view models independently of the UI thread | MEDIUM | [`avalonia-test-view-models-independently-of-the-ui-thread.md`](avalonia-test-view-models-independently-of-the-ui-thread.md) |
| 7 | Configure `AppBuilder.UsePlatformDetect()` explicitly per target | MEDIUM | [`avalonia-configure-appbuilder-useplatformdetect-explicitly-per-target.md`](avalonia-configure-appbuilder-useplatformdetect-explicitly-per-target.md) |
| 8 | Use `KeyFrame` animations sparingly on mobile and WASM | MEDIUM | [`avalonia-use-keyframe-animations-sparingly-on-mobile-and-wasm.md`](avalonia-use-keyframe-animations-sparingly-on-mobile-and-wasm.md) |
| 9 | Implement `IAsyncDisposable` on view models that hold subscriptions or open connections | HIGH | [`avalonia-implement-iasyncdisposable-on-view-models-that-hold.md`](avalonia-implement-iasyncdisposable-on-view-models-that-hold.md) |
| 10 | Pin the Avalonia NuGet package versions across all projects using a `Directory.Packages.props` file | HIGH | [`avalonia-pin-the-avalonia-nuget-package-versions-across-all-projects.md`](avalonia-pin-the-avalonia-nuget-package-versions-across-all-projects.md) |
