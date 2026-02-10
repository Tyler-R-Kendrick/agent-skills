---
description: Guidance for Uno Platform cross-platform UI framework.
metadata:
  displayName: Uno Platform
---

# Uno Platform

## Overview
Uno Platform enables building single-codebase apps for Web, Mobile, Desktop, and Embedded using C# and XAML/WinUI.

## Example
```xml
<Page x:Class="MyApp.MainPage"
      xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation">
  <StackPanel>
    <TextBlock Text="Hello Uno Platform!"/>
    <Button Content="Click Me" Click="OnClick"/>
  </StackPanel>
</Page>
```

```csharp
public sealed partial class MainPage : Page
{
    public MainPage()
    {
        this.InitializeComponent();
    }
    
    private void OnClick(object sender, RoutedEventArgs e)
    {
        // Cross-platform code
    }
}
```

## Platforms
- WebAssembly
- iOS/Android
- Windows
- macOS/Linux

## Best Practices
- Use responsive design
- Test on all target platforms
- Leverage platform-specific code when needed
- Use MVVM pattern
