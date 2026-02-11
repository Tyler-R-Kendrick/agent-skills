# MonoGame Rules

Best practices and rules for MonoGame.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Use the Content Pipeline (MGCB Editor) to preprocess all assets | HIGH | [`monogame-use-the-content-pipeline-mgcb-editor-to-preprocess-all.md`](monogame-use-the-content-pipeline-mgcb-editor-to-preprocess-all.md) |
| 2 | Separate game state updates from rendering by keeping all mutation in `Update` and all draw calls in `Draw` | CRITICAL | [`monogame-separate-game-state-updates-from-rendering-by-keeping-all.md`](monogame-separate-game-state-updates-from-rendering-by-keeping-all.md) |
| 3 | Cache frequently used objects like `Vector2`, `Rectangle`, and `Color` as struct fields | MEDIUM | [`monogame-cache-frequently-used-objects-like-vector2-rectangle-and.md`](monogame-cache-frequently-used-objects-like-vector2-rectangle-and.md) |
| 4 | Implement object pooling for bullets, particles, and other short-lived entities | MEDIUM | [`monogame-implement-object-pooling-for-bullets-particles-and-other.md`](monogame-implement-object-pooling-for-bullets-particles-and-other.md) |
| 5 | Batch all `SpriteBatch.Draw` calls between a single `Begin`/`End` pair sorted by texture | MEDIUM | [`monogame-batch-all-spritebatch-draw-calls-between-a-single-begin-end.md`](monogame-batch-all-spritebatch-draw-calls-between-a-single-begin-end.md) |
| 6 | Use `gameTime.ElapsedGameTime.TotalSeconds` as a delta-time multiplier for all movement and animation | MEDIUM | [`monogame-use-gametime-elapsedgametime-totalseconds-as-a-delta-time.md`](monogame-use-gametime-elapsedgametime-totalseconds-as-a-delta-time.md) |
| 7 | Store input state from the previous frame (`_previousKeyboard`, `_previousMouse`) and compare with the current frame | HIGH | [`monogame-store-input-state-from-the-previous-frame-previouskeyboard.md`](monogame-store-input-state-from-the-previous-frame-previouskeyboard.md) |
| 8 | Load large assets (level data, audio banks) asynchronously using `Task.Run` with a loading screen | MEDIUM | [`monogame-load-large-assets-level-data-audio-banks-asynchronously.md`](monogame-load-large-assets-level-data-audio-banks-asynchronously.md) |
| 9 | Define game constants (screen dimensions, physics gravity, spawn rates) in a static `GameConfig` class or load from JSON | MEDIUM | [`monogame-define-game-constants-screen-dimensions-physics-gravity.md`](monogame-define-game-constants-screen-dimensions-physics-gravity.md) |
| 10 | Run the game at a target of 60 FPS using `TargetElapsedTime = TimeSpan.FromSeconds(1.0 / 60.0)` with `IsFixedTimeStep = true` | MEDIUM | [`monogame-run-the-game-at-a-target-of-60-fps-using-targetelapsedtime.md`](monogame-run-the-game-at-a-target-of-60-fps-using-targetelapsedtime.md) |
