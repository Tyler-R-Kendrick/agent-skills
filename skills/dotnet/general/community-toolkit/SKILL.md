---
description: Guidance for .NET Community Toolkit libraries.
metadata:
  displayName: Community Toolkit
---

# .NET Community Toolkit

## Overview
The .NET Community Toolkit provides MVVM helpers, diagnostics, and high-performance utilities.

## Example
```csharp
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;

public partial class UserViewModel : ObservableObject
{
    [ObservableProperty]
    private string _name;
    
    [ObservableProperty]
    private string _email;
    
    [RelayCommand]
    private async Task SaveAsync()
    {
        await _userService.SaveAsync(new User 
        { 
            Name = Name, 
            Email = Email 
        });
    }
}
```

## Best Practices
- Use source generators for MVVM
- Leverage ObservableProperty
- Use RelayCommand for commands
- Utilize messenger for communication
- Use high-performance APIs
