# Unity3D Rules

Best practices and rules for Unity3D.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Use `[SerializeField] private` instead of `public` fields for Inspector-exposed values | HIGH | [`unity3d-use-serializefield-private-instead-of-public-fields-for.md`](unity3d-use-serializefield-private-instead-of-public-fields-for.md) |
| 2 | Cache `GetComponent<T>()` results in `Awake()` and store them in private fields | MEDIUM | [`unity3d-cache-getcomponent-t-results-in-awake-and-store-them-in.md`](unity3d-cache-getcomponent-t-results-in-awake-and-store-them-in.md) |
| 3 | Use `FixedUpdate()` for all physics-related code | MEDIUM | [`unity3d-use-fixedupdate-for-all-physics-related-code.md`](unity3d-use-fixedupdate-for-all-physics-related-code.md) |
| 4 | Implement object pooling for frequently instantiated/destroyed objects | MEDIUM | [`unity3d-implement-object-pooling-for-frequently-instantiated.md`](unity3d-implement-object-pooling-for-frequently-instantiated.md) |
| 5 | Use `ScriptableObject` assets for shared game data | CRITICAL | [`unity3d-use-scriptableobject-assets-for-shared-game-data.md`](unity3d-use-scriptableobject-assets-for-shared-game-data.md) |
| 6 | Cancel `CancellationTokenSource` in `OnDisable()` or `OnDestroy()` for all async operations | CRITICAL | [`unity3d-cancel-cancellationtokensource-in-ondisable-or-ondestroy.md`](unity3d-cancel-cancellationtokensource-in-ondisable-or-ondestroy.md) |
| 7 | Use `[RequireComponent(typeof(T))]` attribute on MonoBehaviours that depend on specific components | HIGH | [`unity3d-use-requirecomponent-typeof-t-attribute-on-monobehaviours.md`](unity3d-use-requirecomponent-typeof-t-attribute-on-monobehaviours.md) |
| 8 | Avoid string-based APIs like `GameObject.Find("PlayerObject")` and `SendMessage("TakeDamage")` | HIGH | [`unity3d-avoid-string-based-apis-like-gameobject-find-playerobject.md`](unity3d-avoid-string-based-apis-like-gameobject-find-playerobject.md) |
| 9 | Separate game logic from MonoBehaviour by writing plain C# classes for state machines, AI, and calculations | MEDIUM | [`unity3d-separate-game-logic-from-monobehaviour-by-writing-plain-c.md`](unity3d-separate-game-logic-from-monobehaviour-by-writing-plain-c.md) |
| 10 | Profile with the Unity Profiler (`Window > Analysis > Profiler`) before optimizing | MEDIUM | [`unity3d-profile-with-the-unity-profiler-window-analysis-profiler.md`](unity3d-profile-with-the-unity-profiler-window-analysis-profiler.md) |
