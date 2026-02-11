---
name: maui
description: |
  USE FOR: Building cross-platform native mobile and desktop applications with .NET MAUI targeting iOS, Android, Windows, and macOS from a single C# and XAML codebase. Use when you need native platform APIs, device hardware access, and native UI controls.
  DO NOT USE FOR: Web applications (use Blazor or ASP.NET Core), Linux desktop targets (use Avalonia), or game development (use Unity or MonoGame).
license: MIT
metadata:
  displayName: .NET MAUI
  author: "Tyler-R-Kendrick"
  version: "1.0.0"
compatibility:
  - claude
  - copilot
  - cursor
references:
  - title: ".NET MAUI Documentation"
    url: "https://learn.microsoft.com/en-us/dotnet/maui/"
  - title: ".NET MAUI GitHub Repository"
    url: "https://github.com/dotnet/maui"
---

# .NET MAUI

## Overview

.NET Multi-platform App UI (MAUI) is Microsoft's framework for building native cross-platform applications for iOS, Android, macOS, and Windows from a single codebase. MAUI is the evolution of Xamarin.Forms and uses a single-project architecture with platform-specific code organized in the `Platforms` folder. It supports XAML and C# markup for UI, the MVVM pattern via data binding, native platform API access through platform-specific code and handlers, and dependency injection via `Microsoft.Extensions.DependencyInjection`.

## Application Startup and Service Registration

The `MauiProgram.cs` file configures the application, registers services, and sets up platform-specific behavior.

```csharp
using Microsoft.Extensions.Logging;
using CommunityToolkit.Maui;

namespace MyMauiApp;

public static class MauiProgram
{
    public static MauiApp CreateMauiApp()
    {
        var builder = MauiApp.CreateBuilder();
        builder
            .UseMauiApp<App>()
            .UseMauiCommunityToolkit()
            .ConfigureFonts(fonts =>
            {
                fonts.AddFont("OpenSans-Regular.ttf", "OpenSansRegular");
                fonts.AddFont("OpenSans-SemiBold.ttf", "OpenSansSemiBold");
                fonts.AddFont("FluentSystemIcons-Regular.ttf", "FluentIcons");
            });

        // Register services
        builder.Services.AddSingleton<IConnectivity>(Connectivity.Current);
        builder.Services.AddSingleton<IGeolocation>(Geolocation.Default);
        builder.Services.AddSingleton<IApiService, ApiService>();

        // Register HttpClient with base address
        builder.Services.AddHttpClient<IApiService, ApiService>(client =>
        {
            client.BaseAddress = new Uri("https://api.example.com/");
        });

        // Register pages and view models
        builder.Services.AddTransient<MainPage>();
        builder.Services.AddTransient<MainViewModel>();
        builder.Services.AddTransient<DetailPage>();
        builder.Services.AddTransient<DetailViewModel>();

#if DEBUG
        builder.Logging.AddDebug();
#endif

        return builder.Build();
    }
}
```

## MVVM with CommunityToolkit.Mvvm

Use the MVVM Community Toolkit for source-generated view models with commands, observable properties, and async operations.

```csharp
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using System.Collections.ObjectModel;

namespace MyMauiApp.ViewModels;

public partial class ProductListViewModel : ObservableObject
{
    private readonly IProductService _productService;
    private readonly IConnectivity _connectivity;

    public ProductListViewModel(IProductService productService, IConnectivity connectivity)
    {
        _productService = productService;
        _connectivity = connectivity;
    }

    [ObservableProperty]
    private ObservableCollection<Product> _products = new();

    [ObservableProperty]
    private bool _isRefreshing;

    [ObservableProperty]
    [NotifyCanExecuteChangedFor(nameof(LoadProductsCommand))]
    private bool _isBusy;

    [RelayCommand(CanExecute = nameof(IsNotBusy))]
    private async Task LoadProductsAsync()
    {
        if (_connectivity.NetworkAccess != NetworkAccess.Internet)
        {
            await Shell.Current.DisplayAlert("Connection Error",
                "No internet connection available.", "OK");
            return;
        }

        try
        {
            IsBusy = true;
            var items = await _productService.GetProductsAsync();

            Products.Clear();
            foreach (var item in items)
            {
                Products.Add(item);
            }
        }
        catch (Exception ex)
        {
            await Shell.Current.DisplayAlert("Error",
                $"Unable to load products: {ex.Message}", "OK");
        }
        finally
        {
            IsBusy = false;
            IsRefreshing = false;
        }
    }

    private bool IsNotBusy => !IsBusy;

    [RelayCommand]
    private async Task GoToDetailAsync(Product product)
    {
        await Shell.Current.GoToAsync(nameof(DetailPage), new Dictionary<string, object>
        {
            { "Product", product }
        });
    }
}
```

## Content Page with Data Binding

Build the UI in XAML with data binding to the view model. Use `CollectionView` for performant scrollable lists.

```xml
<?xml version="1.0" encoding="utf-8" ?>
<ContentPage xmlns="http://schemas.microsoft.com/dotnet/2021/maui"
             xmlns:x="http://schemas.microsoft.com/winfx/2009/xaml"
             xmlns:vm="clr-namespace:MyMauiApp.ViewModels"
             xmlns:model="clr-namespace:MyMauiApp.Models"
             x:Class="MyMauiApp.Views.ProductListPage"
             x:DataType="vm:ProductListViewModel"
             Title="Products">

    <RefreshView IsRefreshing="{Binding IsRefreshing}"
                 Command="{Binding LoadProductsCommand}">
        <CollectionView ItemsSource="{Binding Products}"
                        SelectionMode="None"
                        EmptyView="No products found.">
            <CollectionView.ItemTemplate>
                <DataTemplate x:DataType="model:Product">
                    <SwipeView>
                        <SwipeView.RightItems>
                            <SwipeItems>
                                <SwipeItem Text="Delete"
                                           BackgroundColor="Red"
                                           Command="{Binding Source={RelativeSource AncestorType={x:Type vm:ProductListViewModel}}, Path=DeleteCommand}"
                                           CommandParameter="{Binding}" />
                            </SwipeItems>
                        </SwipeView.RightItems>
                        <Grid Padding="12" ColumnDefinitions="80,*" RowDefinitions="Auto,Auto"
                              ColumnSpacing="12">
                            <Image Source="{Binding ImageUrl}" Aspect="AspectFill"
                                   HeightRequest="80" WidthRequest="80"
                                   Grid.RowSpan="2" />
                            <Label Text="{Binding Name}" FontSize="16" FontAttributes="Bold"
                                   Grid.Column="1" />
                            <Label Text="{Binding Price, StringFormat='{0:C2}'}"
                                   FontSize="14" TextColor="Gray"
                                   Grid.Column="1" Grid.Row="1" />
                        </Grid>
                        <SwipeView.GestureRecognizers>
                            <TapGestureRecognizer
                                Command="{Binding Source={RelativeSource AncestorType={x:Type vm:ProductListViewModel}}, Path=GoToDetailCommand}"
                                CommandParameter="{Binding}" />
                        </SwipeView.GestureRecognizers>
                    </SwipeView>
                </DataTemplate>
            </CollectionView.ItemTemplate>
        </CollectionView>
    </RefreshView>
</ContentPage>
```

## Platform-Specific Code with Partial Classes

Access platform-specific APIs using partial classes and conditional compilation.

```csharp
// Services/IDeviceOrientationService.cs
namespace MyMauiApp.Services;

public interface IDeviceOrientationService
{
    DeviceOrientation GetOrientation();
}

// Platforms/Android/Services/DeviceOrientationService.cs
using Android.Content;
using Android.Views;
using Android.Runtime;

namespace MyMauiApp.Services;

public partial class DeviceOrientationService : IDeviceOrientationService
{
    public DeviceOrientation GetOrientation()
    {
        var windowManager = Android.App.Application.Context
            .GetSystemService(Context.WindowService)?
            .JavaCast<IWindowManager>();

        var rotation = windowManager?.DefaultDisplay?.Rotation;

        return rotation switch
        {
            SurfaceOrientation.Rotation0 or SurfaceOrientation.Rotation180
                => DeviceOrientation.Portrait,
            _ => DeviceOrientation.Landscape
        };
    }
}

// Platforms/iOS/Services/DeviceOrientationService.cs
using UIKit;

namespace MyMauiApp.Services;

public partial class DeviceOrientationService : IDeviceOrientationService
{
    public DeviceOrientation GetOrientation()
    {
        var orientation = UIDevice.CurrentDevice.Orientation;

        return orientation switch
        {
            UIDeviceOrientation.Portrait or UIDeviceOrientation.PortraitUpsideDown
                => DeviceOrientation.Portrait,
            _ => DeviceOrientation.Landscape
        };
    }
}
```

## MAUI vs Other Cross-Platform Frameworks

| Feature | .NET MAUI | Avalonia | Flutter | React Native |
|---|---|---|---|---|
| Language | C# / XAML | C# / AXAML | Dart | JavaScript/TypeScript |
| iOS | Native controls | Skia-rendered | Skia-rendered | Native controls |
| Android | Native controls | Skia-rendered | Skia-rendered | Native controls |
| Windows | WinUI 3 | Win32/Skia | Win32 | Windows (community) |
| macOS | Mac Catalyst | Native/Skia | Desktop (beta) | macOS (community) |
| Linux | No | Yes | Yes | No |
| Hot Reload | XAML + C# | XAML | Full | Full |
| App size | ~15MB | ~10MB | ~5MB | ~8MB |

## Best Practices

1. **Register pages and view models as `Transient` in `MauiProgram.cs` and use constructor injection** rather than `BindingContext = new ViewModel()` in code-behind, because transient registration ensures each page navigation creates a fresh view model with properly initialized dependencies.

2. **Set `x:DataType` on every `ContentPage` and `DataTemplate`** to enable compiled bindings, which provide compile-time type checking and avoid the `BindingBase.EnableCollectionSynchronization` warnings that appear when bindings fall back to reflection.

3. **Use `CollectionView` instead of `ListView` for all scrollable list UIs** because `CollectionView` supports virtualization by default, handles empty states via `EmptyView`, and does not require `ViewCell` wrappers that add layout overhead on iOS.

4. **Check `IConnectivity.NetworkAccess` before every HTTP call in view model commands** and display a user-facing alert on failure rather than catching `HttpRequestException` generically, because mobile networks transition between states frequently and users expect clear feedback.

5. **Implement `Shell` navigation with `QueryProperty` or `IQueryAttributable` for page parameters** instead of passing data through constructors or static properties; `Shell.GoToAsync` with a dictionary parameter bag supports deep linking, back-stack management, and URI-based routing.

6. **Place platform-specific service implementations in `Platforms/{OS}/` folders using partial classes** registered with `#if ANDROID` / `#if IOS` guards in `MauiProgram.cs`, rather than scattering `Device.RuntimePlatform` checks throughout view models.

7. **Use `SecureStorage` for tokens and credentials instead of `Preferences`**, because `Preferences` stores values in plaintext SharedPreferences (Android) or UserDefaults (iOS); `SecureStorage` uses Android Keystore and iOS Keychain, which are encrypted at the OS level.

8. **Set explicit `HeightRequest` and `WidthRequest` on `Image` controls inside `CollectionView` item templates** and use `Aspect="AspectFill"` to prevent layout thrashing; images without explicit dimensions cause the layout engine to recalculate on every frame as the image loads asynchronously.

9. **Handle the `App.OnResume()` and `App.OnSleep()` lifecycle events** to pause background work (timers, location tracking, Bluetooth scanning) and persist unsaved state, because iOS will terminate suspended apps that consume CPU in the background without user consent.

10. **Configure Android `<uses-permission>` entries in `Platforms/Android/AndroidManifest.xml` for every platform API used** (camera, location, contacts) and request runtime permissions via `Permissions.RequestAsync<T>()` before accessing the API; missing runtime permission requests cause silent failures on Android 13+.
