# Jot

## Overview

Jot is a .NET library for automatically persisting and restoring application state in desktop applications. It tracks properties on objects and saves their values to a configurable storage backend (JSON files by default) when the application closes, then restores them when the application starts. This eliminates the boilerplate of manually saving and loading window positions, user preferences, splitter locations, and other UI state.

Jot works with any .NET object and is not tied to a specific UI framework. It supports WPF, WinForms, Avalonia, and MAUI. The library uses a fluent API to declare which properties to track, how to identify objects, and when to persist and restore state.

Install via NuGet: `dotnet add package Jot`

## Basic Tracker Setup

Create a `Tracker` instance with a storage backend and configure it to track properties on your objects.

```csharp
using Jot;
using Jot.Storage;

public static class AppTracker
{
    public static Tracker Tracker { get; } = new Tracker(
        new JsonFileStore(
            Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData)
            + "/MyApp/state"));
}
```

## Tracking Window State in WPF

Track window position, size, and state so the window reopens exactly where the user left it.

```csharp
using System.Windows;
using Jot;
using Jot.Storage;

public partial class MainWindow : Window
{
    public MainWindow()
    {
        InitializeComponent();

        AppTracker.Tracker
            .Configure<MainWindow>()
            .Id(w => "MainWindow")
            .Property(w => w.Top)
            .Property(w => w.Left)
            .Property(w => w.Width, 800)   // Default value if no saved state
            .Property(w => w.Height, 600)
            .Property(w => w.WindowState, WindowState.Normal)
            .PersistOn(nameof(Closing))
            .StopTrackingOn(nameof(Closing));

        AppTracker.Tracker.Track(this);
    }
}
```

## Tracking User Preferences

Define a settings class and track its properties for automatic persistence.

```csharp
public sealed class UserPreferences
{
    public string Theme { get; set; } = "Light";
    public string Language { get; set; } = "en-US";
    public int FontSize { get; set; } = 14;
    public bool ShowLineNumbers { get; set; } = true;
    public bool AutoSave { get; set; } = true;
    public string LastOpenedFile { get; set; } = string.Empty;
    public List<string> RecentFiles { get; set; } = new();
}
```

```csharp
using Jot;

public sealed class PreferencesManager
{
    private readonly Tracker _tracker;

    public UserPreferences Preferences { get; } = new();

    public PreferencesManager(Tracker tracker)
    {
        _tracker = tracker;

        _tracker.Configure<UserPreferences>()
            .Id(p => "UserPreferences")
            .Property(p => p.Theme, "Light")
            .Property(p => p.Language, "en-US")
            .Property(p => p.FontSize, 14)
            .Property(p => p.ShowLineNumbers, true)
            .Property(p => p.AutoSave, true)
            .Property(p => p.LastOpenedFile, string.Empty)
            .Property(p => p.RecentFiles);

        _tracker.Track(Preferences);
    }

    public void Save()
    {
        _tracker.Persist(Preferences);
    }

    public void ResetToDefaults()
    {
        Preferences.Theme = "Light";
        Preferences.Language = "en-US";
        Preferences.FontSize = 14;
        Preferences.ShowLineNumbers = true;
        Preferences.AutoSave = true;
        Preferences.LastOpenedFile = string.Empty;
        Preferences.RecentFiles.Clear();
        Save();
    }
}
```

## Tracking Multiple Windows

When tracking multiple instances of the same type, provide a unique identifier for each.

```csharp
using System.Windows;
using Jot;

public partial class DocumentWindow : Window
{
    public string DocumentId { get; }

    public DocumentWindow(string documentId, Tracker tracker)
    {
        DocumentId = documentId;
        InitializeComponent();

        tracker.Configure<DocumentWindow>()
            .Id(w => w.DocumentId)        // Unique per document
            .Property(w => w.Top)
            .Property(w => w.Left)
            .Property(w => w.Width, 600)
            .Property(w => w.Height, 400)
            .PersistOn(nameof(Closing))
            .StopTrackingOn(nameof(Closing));

        tracker.Track(this);
    }
}
```

## Tracking WinForms Controls

Jot works with WinForms forms and controls using the same pattern.

```csharp
using System.Windows.Forms;
using Jot;
using Jot.Storage;

public class MainForm : Form
{
    private readonly SplitContainer _splitContainer;
    private readonly Tracker _tracker;

    public MainForm()
    {
        _splitContainer = new SplitContainer { Dock = DockStyle.Fill };
        Controls.Add(_splitContainer);

        _tracker = new Tracker(new JsonFileStore("app-state"));

        _tracker.Configure<MainForm>()
            .Id(f => "MainForm")
            .Property(f => f.Top)
            .Property(f => f.Left)
            .Property(f => f.Width, 1024)
            .Property(f => f.Height, 768)
            .Property(f => f.WindowState, FormWindowState.Normal)
            .PersistOn(nameof(FormClosing))
            .StopTrackingOn(nameof(FormClosing));

        _tracker.Configure<SplitContainer>()
            .Id(s => "MainSplitter")
            .Property(s => s.SplitterDistance, 250)
            .PersistOn(nameof(SplitterMoved));

        _tracker.Track(this);
        _tracker.Track(_splitContainer);
    }
}
```

## DI-Friendly Setup

Register the tracker as a singleton so all components share the same instance.

```csharp
using Jot;
using Jot.Storage;
using Microsoft.Extensions.DependencyInjection;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddStateTracking(this IServiceCollection services)
    {
        services.AddSingleton<Tracker>(sp =>
        {
            string storagePath = Path.Combine(
                Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData),
                "MyApp", "state");

            var tracker = new Tracker(new JsonFileStore(storagePath));

            // Pre-configure tracking for known types
            tracker.Configure<UserPreferences>()
                .Id(p => "UserPreferences")
                .Property(p => p.Theme, "Light")
                .Property(p => p.Language, "en-US")
                .Property(p => p.FontSize, 14);

            return tracker;
        });

        services.AddSingleton<PreferencesManager>();
        return services;
    }
}
```

## Jot vs Other State Persistence Approaches

| Approach | Complexity | Scope | Automatic | Cross-Platform |
|---|---|---|---|---|
| Jot | Low | Any object property | Yes (event-based) | Yes |
| Settings.settings (WinForms) | Low | App/User settings | Manual save | Windows only |
| Preferences API (MAUI) | Low | Key-value pairs | Manual save | Yes |
| IsolatedStorage | Medium | File-based | Manual | Partial |
| SQLite / LiteDB | High | Structured data | Manual | Yes |

## Best Practices

1. Create a single `Tracker` instance shared across the entire application and register it as a singleton in your DI container to avoid conflicting file writes.
2. Always provide meaningful default values as the second argument to `.Property()` so that first-run experiences are well-defined without requiring an existing state file.
3. Use `.Id()` with a stable, unique identifier for each tracked object so that state is correctly associated when multiple instances of the same type exist.
4. Call `.PersistOn(nameof(Closing))` and `.StopTrackingOn(nameof(Closing))` for windows to ensure state is saved exactly once when the window closes.
5. Validate restored values before applying them to guard against corrupted state files; for example, clamp window coordinates to ensure they fall within current screen bounds.
6. Store the JSON state file in `Environment.SpecialFolder.ApplicationData` rather than the application directory so that state persists across updates and respects user permissions.
7. Provide a "Reset to Defaults" action in your application that clears tracked values and restores defaults, allowing users to recover from bad state.
8. Do not track security-sensitive values like passwords or tokens; Jot stores data as plain JSON and is not designed for secret management.
9. Keep the number of tracked properties reasonable; track UI layout and preferences, not large data sets or complex object graphs that belong in a database.
10. Test state persistence by verifying that property values survive an application restart, using integration tests that create a tracker, set values, dispose, and re-create.
