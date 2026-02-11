# Uno Platform Rules

Best practices and rules for Uno Platform.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Use `Uno.Sdk.Private` in the project file and target via `net8.0-*` target frameworks | HIGH | [`uno-platform-use-uno-sdk-private-in-the-project-file-and-target-via-net8.md`](uno-platform-use-uno-sdk-private-in-the-project-file-and-target-via-net8.md) |
| 2 | Prefer the MVUX pattern with `IFeed<T>` and `IListFeed<T>` for reactive data flows | LOW | [`uno-platform-prefer-the-mvux-pattern-with-ifeed-t-and-ilistfeed-t-for.md`](uno-platform-prefer-the-mvux-pattern-with-ifeed-t-and-ilistfeed-t-for.md) |
| 3 | Use conditional compilation constants (`__ANDROID__`, `__IOS__`, `HAS_UNO_WASM`, `__SKIA__`) in partial class files | MEDIUM | [`uno-platform-use-conditional-compilation-constants-android-ios-has-uno.md`](uno-platform-use-conditional-compilation-constants-android-ios-has-uno.md) |
| 4 | Test WASM builds early and continuously in CI | MEDIUM | [`uno-platform-test-wasm-builds-early-and-continuously-in-ci.md`](uno-platform-test-wasm-builds-early-and-continuously-in-ci.md) |
| 5 | Use `x:Load` on XAML elements that are conditionally visible | HIGH | [`uno-platform-use-x-load-on-xaml-elements-that-are-conditionally-visible.md`](uno-platform-use-x-load-on-xaml-elements-that-are-conditionally-visible.md) |
| 6 | Register Uno extensions (`UseNavigation`, `UseConfiguration`, `UseLocalization`) via the `IHostBuilder` in `App.xaml.cs` | CRITICAL | [`uno-platform-register-uno-extensions-usenavigation-useconfiguration.md`](uno-platform-register-uno-extensions-usenavigation-useconfiguration.md) |
| 7 | Implement responsive layouts using `VisualStateManager` with `AdaptiveTrigger` breakpoints | MEDIUM | [`uno-platform-implement-responsive-layouts-using-visualstatemanager-with.md`](uno-platform-implement-responsive-layouts-using-visualstatemanager-with.md) |
| 8 | Use the Uno Figma plugin to export design tokens and page layouts directly into XAML | MEDIUM | [`uno-platform-use-the-uno-figma-plugin-to-export-design-tokens-and-page.md`](uno-platform-use-the-uno-figma-plugin-to-export-design-tokens-and-page.md) |
| 9 | Set `<WasmShellMonoRuntimeExecutionMode>InterpreterAndAOT</WasmShellMonoRuntimeExecutionMode>` for WASM release builds | MEDIUM | [`uno-platform-set-wasmshellmonoruntimeexecutionmode-interpreterandaot.md`](uno-platform-set-wasmshellmonoruntimeexecutionmode-interpreterandaot.md) |
| 10 | Pin Uno Platform NuGet packages using central package management (`Directory.Packages.props`) | MEDIUM | [`uno-platform-pin-uno-platform-nuget-packages-using-central-package.md`](uno-platform-pin-uno-platform-nuget-packages-using-central-package.md) |
