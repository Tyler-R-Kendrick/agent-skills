# ReactiveUI

## Overview
ReactiveUI is a composable MVVM framework using Reactive Extensions (Rx) for .NET.

## Example
```csharp
using ReactiveUI;

public class UserViewModel : ReactiveObject
{
    private string _name;
    public string Name
    {
        get => _name;
        set => this.RaiseAndSetIfChanged(ref _name, value);
    }
    
    public ReactiveCommand<Unit, Unit> SaveCommand { get; }
    
    public UserViewModel()
    {
        var canSave = this.WhenAnyValue(
            x => x.Name,
            name => !string.IsNullOrEmpty(name));
            
        SaveCommand = ReactiveCommand.CreateFromTask(
            SaveAsync, 
            canSave);
    }
    
    private async Task SaveAsync()
    {
        await _service.SaveAsync(Name);
    }
}
```

## Best Practices
- Use WhenAnyValue for computed properties
- Leverage ReactiveCommand
- Handle command execution state
- Use observables for async operations
