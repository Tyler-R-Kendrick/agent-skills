---
name: uno-platform
description: |
  USE FOR: Building cross-platform applications with WinUI/XAML and C# that target Web (WebAssembly), iOS, Android, macOS, Linux, and Windows from a single codebase using the Uno Platform. Use when you want WinUI API compatibility across all platforms.
  DO NOT USE FOR: Games (use Unity or MonoGame), server-side web APIs (use ASP.NET Core), or projects that only target Windows and do not need cross-platform reach (use WinUI 3 directly).
license: MIT
metadata:
  displayName: Uno Platform
  author: "Tyler-R-Kendrick"
  version: "1.0.0"
compatibility:
  - claude
  - copilot
  - cursor
references:
  - title: "Uno Platform Official Site"
    url: "https://platform.uno/"
  - title: "Uno Platform GitHub Repository"
    url: "https://github.com/unoplatform/uno"
  - title: "Uno.UI NuGet Package"
    url: "https://www.nuget.org/packages/Uno.UI"
---

# Uno Platform

## Overview

Uno Platform is an open-source framework that enables building native mobile, desktop, and WebAssembly applications using the WinUI API and XAML. It implements the WinUI and UWP APIs across iOS, Android, macOS, Linux, and WebAssembly, allowing developers to share UI and business logic with a Windows WinUI 3 application. Uno uses the standard .NET SDK, supports C# markup as an alternative to XAML, integrates with the MVUX (Model-View-Update eXtended) pattern, and provides platform-specific escape hatches when needed.

## Project Setup with Uno.Sdk

Create an Uno Platform project using the `dotnet new` template and configure the host builder.

```csharp
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.UI.Xaml;

namespace MyUnoApp;

public class App : Application
{
    protected IHost? Host { get; private set; }

    protected override void OnLaunched(LaunchActivatedEventArgs args)
    {
        var builder = this.CreateBuilder(args)
            .Configure(host => host
                .UseConfiguration(configure: configBuilder =>
                    configBuilder.EmbeddedSource<App>()
                )
                .ConfigureServices((context, services) =>
                {
                    services.AddSingleton<IWeatherService, WeatherService>();
                    services.AddSingleton<INavigationService, NavigationService>();
                    services.AddTransient<MainViewModel>();
                    services.AddTransient<DetailViewModel>();
                })
                .UseNavigation(RegisterRoutes)
            );

        Host = builder.Build();

        MainWindow = builder.Window;
        MainWindow.Activate();
    }

    private static void RegisterRoutes(IViewRegistry views, IRouteRegistry routes)
    {
        views.Register(
            new ViewMap<ShellPage, ShellViewModel>(),
            new ViewMap<MainPage, MainViewModel>(),
            new ViewMap<DetailPage, DetailViewModel>()
        );

        routes.Register(
            new RouteMap("", View: views.FindByViewModel<ShellViewModel>(),
                Nested: new[]
                {
                    new RouteMap("Main", View: views.FindByViewModel<MainViewModel>()),
                    new RouteMap("Detail", View: views.FindByViewModel<DetailViewModel>())
                })
        );
    }
}
```

## MVUX Pattern (Model-View-Update eXtended)

Uno's MVUX pattern uses reactive feeds and state management with source generators, providing immutable data flows.

```csharp
using Uno.Extensions.Reactive;

namespace MyUnoApp.Presentation;

public partial record MainModel
{
    private readonly IWeatherService _weatherService;

    public MainModel(IWeatherService weatherService)
    {
        _weatherService = weatherService;
    }

    public IListFeed<WeatherForecast> Forecasts =>
        ListFeed.Async(async ct => await _weatherService.GetForecastsAsync(ct));

    public IState<string> CityFilter => State<string>.Value(this, () => string.Empty);

    public IListFeed<WeatherForecast> FilteredForecasts =>
        CityFilter.SelectAsync(async (filter, ct) =>
        {
            var forecasts = await _weatherService.GetForecastsAsync(ct);
            return string.IsNullOrWhiteSpace(filter)
                ? forecasts
                : forecasts.Where(f => f.City.Contains(filter, StringComparison.OrdinalIgnoreCase));
        }).AsListFeed();
}

public record WeatherForecast(string City, double Temperature, string Summary, DateTime Date);
```

## XAML Page with Data Binding

Build the UI with standard WinUI XAML. Uno Platform implements WinUI controls cross-platform.

```xml
<Page x:Class="MyUnoApp.Views.MainPage"
      xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
      xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
      xmlns:uen="using:Uno.Extensions.Navigation.UI">

    <Grid Padding="16" RowDefinitions="Auto,*">
        <StackPanel Orientation="Horizontal" Spacing="8">
            <TextBox PlaceholderText="Filter by city..."
                     Text="{Binding CityFilter, Mode=TwoWay, UpdateSourceTrigger=PropertyChanged}"
                     Width="300" />
            <Button Content="Refresh" Command="{Binding RefreshCommand}" />
        </StackPanel>

        <ListView Grid.Row="1"
                  ItemsSource="{Binding FilteredForecasts}"
                  Margin="0,12,0,0"
                  SelectionMode="Single">
            <ListView.ItemTemplate>
                <DataTemplate>
                    <Grid ColumnDefinitions="*,Auto,Auto" Padding="12,8">
                        <TextBlock Text="{Binding City}" FontWeight="SemiBold"
                                   VerticalAlignment="Center" />
                        <TextBlock Grid.Column="1"
                                   Text="{Binding Temperature, Converter={StaticResource TempConverter}}"
                                   Margin="12,0" VerticalAlignment="Center" />
                        <TextBlock Grid.Column="2" Text="{Binding Summary}"
                                   Foreground="Gray" VerticalAlignment="Center" />
                    </Grid>
                </DataTemplate>
            </ListView.ItemTemplate>
        </ListView>
    </Grid>
</Page>
```

## Platform-Specific Code

Use partial classes and conditional compilation to access platform-specific APIs while sharing the bulk of your code.

```csharp
// Shared interface
namespace MyUnoApp.Services;

public interface IDeviceInfoService
{
    string GetDeviceModel();
    string GetOperatingSystem();
}

// Platforms/Android/Services/DeviceInfoService.Android.cs
#if __ANDROID__
using Android.OS;

namespace MyUnoApp.Services;

public partial class DeviceInfoService : IDeviceInfoService
{
    public string GetDeviceModel() => $"{Build.Manufacturer} {Build.Model}";
    public string GetOperatingSystem() => $"Android {Build.VERSION.Release}";
}
#endif

// Platforms/iOS/Services/DeviceInfoService.iOS.cs
#if __IOS__
using UIKit;

namespace MyUnoApp.Services;

public partial class DeviceInfoService : IDeviceInfoService
{
    public string GetDeviceModel() => UIDevice.CurrentDevice.Model;
    public string GetOperatingSystem() =>
        $"iOS {UIDevice.CurrentDevice.SystemVersion}";
}
#endif

// Platforms/WebAssembly/Services/DeviceInfoService.Wasm.cs
#if HAS_UNO_WASM
namespace MyUnoApp.Services;

public partial class DeviceInfoService : IDeviceInfoService
{
    public string GetDeviceModel() => "Browser";
    public string GetOperatingSystem() => "WebAssembly";
}
#endif
```

## Uno Platform vs Other Cross-Platform Frameworks

| Feature | Uno Platform | .NET MAUI | Avalonia | Flutter |
|---|---|---|---|---|
| UI API | WinUI / UWP | .NET MAUI | Custom AXAML | Material Widgets |
| WebAssembly | Yes (first-class) | Experimental | Yes | Yes |
| Windows | WinUI 3 native | WinUI 3 | Win32/Skia | Win32 |
| Linux | Yes (Skia/GTK) | No | Yes | Yes |
| iOS/Android | Yes | Yes | Yes | Yes |
| macOS | Yes | Mac Catalyst | Yes | Beta |
| Figma integration | Yes (Uno Figma Plugin) | No | No | No |
| C# markup | Yes | Community | No | N/A (Dart) |

## Best Practices

1. **Use `Uno.Sdk.Private` in the project file and target via `net8.0-*` target frameworks** (e.g., `net8.0-android`, `net8.0-ios`, `net8.0-browserwasm`) to leverage the single-project structure, which ensures all platform targets build from one `.csproj` and share the same NuGet dependencies.

2. **Prefer the MVUX pattern with `IFeed<T>` and `IListFeed<T>` for reactive data flows** instead of manually implementing `INotifyPropertyChanged`, because MVUX feeds handle loading states, error states, and empty states declaratively via `FeedView`, reducing boilerplate error-handling UI code.

3. **Use conditional compilation constants (`__ANDROID__`, `__IOS__`, `HAS_UNO_WASM`, `__SKIA__`) in partial class files** organized in `Platforms/` subfolders rather than inline `#if` blocks within shared code, keeping platform abstractions isolated and testable.

4. **Test WASM builds early and continuously in CI** because certain .NET APIs (file system, threading, sockets) are unavailable or restricted in the browser sandbox; discovering API incompatibilities late causes costly rewrites of data-access and background-processing layers.

5. **Use `x:Load` on XAML elements that are conditionally visible** (panels, dialogs, secondary tabs) instead of `Visibility="Collapsed"`, because `x:Load="False"` prevents the element from being created in the visual tree entirely, reducing initial layout cost and memory on mobile and WASM.

6. **Register Uno extensions (`UseNavigation`, `UseConfiguration`, `UseLocalization`) via the `IHostBuilder` in `App.xaml.cs`** and inject services through constructor injection in view models; avoid using `ServiceLocator` or `Application.Current.Resources` to resolve dependencies, as these patterns defeat testability.

7. **Implement responsive layouts using `VisualStateManager` with `AdaptiveTrigger` breakpoints** (e.g., `MinWindowWidth="720"`) rather than checking `Window.Current.Bounds` in code-behind, because visual states are declarative, designer-visible, and work consistently across WASM, mobile, and desktop.

8. **Use the Uno Figma plugin to export design tokens and page layouts directly into XAML** rather than manually translating mockups; this eliminates pixel-level discrepancies and generates styles, colors, and typography resources that match the design system exactly.

9. **Set `<WasmShellMonoRuntimeExecutionMode>InterpreterAndAOT</WasmShellMonoRuntimeExecutionMode>` for WASM release builds** to enable AOT compilation of hot paths; pure interpreter mode is 5-10x slower than AOT on compute-intensive operations like list filtering and JSON deserialization.

10. **Pin Uno Platform NuGet packages using central package management (`Directory.Packages.props`)** because Uno packages (`Uno.WinUI`, `Uno.Extensions.Navigation`, `Uno.Toolkit.UI`) share internal contracts; mixing versions causes `TypeLoadException` or missing method errors at runtime on specific platform targets.
