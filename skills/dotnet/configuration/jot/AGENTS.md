# Jot

## Overview
Jot is a library for persisting and restoring application state (window size, user preferences, etc.).

## Example
```csharp
using Jot;
using Jot.Storage;

var tracker = new Tracker(new JsonFileStore("app-state"));

// Track window
tracker.Track(window)
    .Property(w => w.Height)
    .Property(w => w.Width)
    .Property(w => w.Left)
    .Property(w => w.Top)
    .Property(w => w.WindowState);

// Track settings
tracker.Track(settings)
    .Property(s => s.Theme)
    .Property(s => s.Language);

// Persist manually
tracker.Persist(window);
```

## Best Practices
- Track user preferences
- Handle migration of settings
- Use appropriate storage
- Respect user privacy
- Provide reset functionality
