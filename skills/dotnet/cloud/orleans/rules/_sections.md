# Orleans Rules

Best practices and rules for Orleans.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Design grains around natural entity boundaries (one grain... | HIGH | [`orleans-design-grains-around-natural-entity-boundaries-one-grain.md`](orleans-design-grains-around-natural-entity-boundaries-one-grain.md) |
| 2 | Use `[PersistentState("name", "storage")]` constructor... | CRITICAL | [`orleans-use-persistentstate-name-storage-constructor.md`](orleans-use-persistentstate-name-storage-constructor.md) |
| 3 | Mark all state classes and DTOs with `[GenerateSerializer]`... | HIGH | [`orleans-mark-all-state-classes-and-dtos-with-generateserializer.md`](orleans-mark-all-state-classes-and-dtos-with-generateserializer.md) |
| 4 | Use `GrainFactory | MEDIUM | [`orleans-use-grainfactory.md`](orleans-use-grainfactory.md) |
| 5 | Use reminders (persistent, survive restarts) for important... | HIGH | [`orleans-use-reminders-persistent-survive-restarts-for-important.md`](orleans-use-reminders-persistent-survive-restarts-for-important.md) |
| 6 | Avoid blocking calls or `Task | HIGH | [`orleans-avoid-blocking-calls-or-task.md`](orleans-avoid-blocking-calls-or-task.md) |
| 7 | Use `UseLocalhostClustering()` and... | CRITICAL | [`orleans-use-uselocalhostclustering-and.md`](orleans-use-uselocalhostclustering-and.md) |
| 8 | Co-host Orleans silos with ASP | CRITICAL | [`orleans-co-host-orleans-silos-with-asp.md`](orleans-co-host-orleans-silos-with-asp.md) |
| 9 | Call `WriteStateAsync()` after every state mutation rather... | MEDIUM | [`orleans-call-writestateasync-after-every-state-mutation-rather.md`](orleans-call-writestateasync-after-every-state-mutation-rather.md) |
| 10 | Use Orleans Streams for event-driven communication between... | MEDIUM | [`orleans-use-orleans-streams-for-event-driven-communication-between.md`](orleans-use-orleans-streams-for-event-driven-communication-between.md) |
