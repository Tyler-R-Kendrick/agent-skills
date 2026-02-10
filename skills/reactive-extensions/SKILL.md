---
name: reactive-extensions
description: Guidance for Reactive Extensions usage. Use when working with reactive extensions.
license: MIT
metadata:
  displayName: "Reactive Extensions"
  author: "Tyler-R-Kendrick"
---

# Reactive Extensions

## Overview
Use Rx for event streams, UI events, and composition of asynchronous signals.

## Example
```csharp
IObservable<Event> stream = source
	.Where(evt => evt.IsValid)
	.Throttle(TimeSpan.FromMilliseconds(250))
	.DistinctUntilChanged()
	.Publish()
	.RefCount();
```

## Guidance
- Avoid unbounded subscriptions; dispose properly.
- Keep pipelines readable and well named.