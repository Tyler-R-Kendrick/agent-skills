# Avalonia

## Overview
Avalonia is a cross-platform UI framework for .NET that runs on Windows, macOS, Linux, iOS, Android, and WebAssembly.

## Example
```xml
<Window xmlns="https://github.com/avaloniaui"
        Title="My App">
  <StackPanel>
    <TextBlock Text="Hello Avalonia!"/>
    <Button Content="Click Me" Click="OnButtonClick"/>
  </StackPanel>
</Window>
```

```csharp
public partial class MainWindow : Window
{
    public MainWindow()
    {
        InitializeComponent();
    }
    
    private void OnButtonClick(object sender, RoutedEventArgs e)
    {
        // Handle click
    }
}
```

## Best Practices
- Use MVVM pattern
- Leverage data binding
- Use ReactiveUI for complex UIs
- Test on all target platforms
- Optimize for mobile when targeting mobile
