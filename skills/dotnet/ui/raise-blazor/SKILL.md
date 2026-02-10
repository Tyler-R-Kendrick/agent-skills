---
description: Guidance for Radzen Blazor components library.
metadata:
  displayName: Radzen Blazor Components
---

# Radzen Blazor Components

## Overview
Radzen Blazor is a set of 70+ free and premium Blazor components for building rich web applications.

## Example
```razor
@using Radzen
@using Radzen.Blazor

<RadzenCard>
    <RadzenDataGrid Data="@users" TItem="User">
        <Columns>
            <RadzenDataGridColumn TItem="User" Property="Name" Title="Name" />
            <RadzenDataGridColumn TItem="User" Property="Email" Title="Email" />
        </Columns>
    </RadzenDataGrid>
</RadzenCard>

<RadzenButton Text="Save" Click="@OnSave" ButtonStyle="ButtonStyle.Primary" />

@code {
    List<User> users;
    void OnSave() { /* ... */ }
}
```

## Best Practices
- Use RadzenDataGrid for complex tables
- Leverage built-in themes
- Implement validation with RadzenRequiredValidator
- Use dialogs for modals
