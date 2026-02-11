# MonoGame

## Overview

MonoGame is an open-source, cross-platform implementation of the Microsoft XNA 4 framework. It provides APIs for 2D and 3D rendering, audio, input, and content management. MonoGame targets Windows, macOS, Linux, iOS, Android, and various consoles. Unlike engines like Unity, MonoGame is a framework, not an editor -- developers write all game logic, rendering, and scene management in C# code. It uses a fixed-timestep game loop with `Update` and `Draw` methods and includes a Content Pipeline for asset preprocessing.

## Game Class and Lifecycle

Every MonoGame project centers on a class that inherits from `Game`. The lifecycle methods `Initialize`, `LoadContent`, `Update`, and `Draw` form the core loop.

```csharp
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework.Input;

namespace MyGame;

public class MainGame : Game
{
    private readonly GraphicsDeviceManager _graphics;
    private SpriteBatch _spriteBatch = null!;

    public MainGame()
    {
        _graphics = new GraphicsDeviceManager(this)
        {
            PreferredBackBufferWidth = 1280,
            PreferredBackBufferHeight = 720,
            IsFullScreen = false
        };
        Content.RootDirectory = "Content";
        IsMouseVisible = true;
        IsFixedTimeStep = true;
        TargetElapsedTime = TimeSpan.FromSeconds(1.0 / 60.0);
    }

    protected override void Initialize()
    {
        Window.Title = "My MonoGame Project";
        base.Initialize();
    }

    protected override void LoadContent()
    {
        _spriteBatch = new SpriteBatch(GraphicsDevice);
    }

    protected override void Update(GameTime gameTime)
    {
        if (GamePad.GetState(PlayerIndex.One).Buttons.Back == ButtonState.Pressed
            || Keyboard.GetState().IsKeyDown(Keys.Escape))
        {
            Exit();
        }

        base.Update(gameTime);
    }

    protected override void Draw(GameTime gameTime)
    {
        GraphicsDevice.Clear(Color.CornflowerBlue);

        _spriteBatch.Begin(SpriteSortMode.Deferred, BlendState.AlphaBlend);
        // Draw calls go here
        _spriteBatch.End();

        base.Draw(gameTime);
    }
}
```

## Sprite Rendering and Animation

Load textures via the Content Pipeline and render animated sprites using a sprite sheet.

```csharp
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;

namespace MyGame;

public class AnimatedSprite
{
    private readonly Texture2D _texture;
    private readonly int _frameWidth;
    private readonly int _frameHeight;
    private readonly int _frameCount;
    private readonly float _frameTime;

    private int _currentFrame;
    private float _elapsed;
    private Vector2 _position;

    public AnimatedSprite(Texture2D texture, int frameWidth, int frameHeight,
                          int frameCount, float frameTime, Vector2 startPosition)
    {
        _texture = texture;
        _frameWidth = frameWidth;
        _frameHeight = frameHeight;
        _frameCount = frameCount;
        _frameTime = frameTime;
        _position = startPosition;
    }

    public void Update(GameTime gameTime)
    {
        _elapsed += (float)gameTime.ElapsedGameTime.TotalSeconds;
        if (_elapsed >= _frameTime)
        {
            _currentFrame = (_currentFrame + 1) % _frameCount;
            _elapsed -= _frameTime;
        }
    }

    public void Draw(SpriteBatch spriteBatch)
    {
        var sourceRect = new Rectangle(
            _currentFrame * _frameWidth, 0,
            _frameWidth, _frameHeight);

        spriteBatch.Draw(_texture, _position, sourceRect,
            Color.White, 0f, Vector2.Zero, 1f, SpriteEffects.None, 0f);
    }
}
```

## Entity-Component Pattern

MonoGame does not include a built-in ECS, but you can implement a lightweight entity-component pattern for game objects.

```csharp
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;
using System.Collections.Generic;

namespace MyGame;

public abstract class Component
{
    public Entity Entity { get; internal set; } = null!;
    public virtual void Initialize() { }
    public virtual void Update(GameTime gameTime) { }
    public virtual void Draw(SpriteBatch spriteBatch) { }
}

public class Entity
{
    private readonly List<Component> _components = new();
    public Vector2 Position { get; set; }
    public bool IsActive { get; set; } = true;

    public T AddComponent<T>(T component) where T : Component
    {
        component.Entity = this;
        _components.Add(component);
        component.Initialize();
        return component;
    }

    public T? GetComponent<T>() where T : Component
        => _components.Find(c => c is T) as T;

    public void Update(GameTime gameTime)
    {
        if (!IsActive) return;
        foreach (var component in _components)
            component.Update(gameTime);
    }

    public void Draw(SpriteBatch spriteBatch)
    {
        if (!IsActive) return;
        foreach (var component in _components)
            component.Draw(spriteBatch);
    }
}

public class SpriteRenderer : Component
{
    private readonly Texture2D _texture;

    public SpriteRenderer(Texture2D texture)
    {
        _texture = texture;
    }

    public override void Draw(SpriteBatch spriteBatch)
    {
        spriteBatch.Draw(_texture, Entity.Position, Color.White);
    }
}

public class Velocity : Component
{
    public Vector2 Speed { get; set; }

    public override void Update(GameTime gameTime)
    {
        var delta = (float)gameTime.ElapsedGameTime.TotalSeconds;
        Entity.Position += Speed * delta;
    }
}
```

## Collision Detection

Implement axis-aligned bounding box (AABB) collision detection for 2D game objects.

```csharp
using Microsoft.Xna.Framework;
using System.Collections.Generic;

namespace MyGame;

public struct BoundingBox2D
{
    public Rectangle Bounds { get; }

    public BoundingBox2D(Vector2 position, int width, int height)
    {
        Bounds = new Rectangle((int)position.X, (int)position.Y, width, height);
    }

    public bool Intersects(BoundingBox2D other) => Bounds.Intersects(other.Bounds);
}

public class CollisionSystem
{
    private readonly List<Entity> _entities;

    public CollisionSystem(List<Entity> entities)
    {
        _entities = entities;
    }

    public void CheckCollisions()
    {
        for (int i = 0; i < _entities.Count; i++)
        {
            for (int j = i + 1; j < _entities.Count; j++)
            {
                var a = _entities[i].GetComponent<BoxCollider>();
                var b = _entities[j].GetComponent<BoxCollider>();

                if (a is not null && b is not null && a.GetBounds().Intersects(b.GetBounds()))
                {
                    a.OnCollision?.Invoke(_entities[j]);
                    b.OnCollision?.Invoke(_entities[i]);
                }
            }
        }
    }
}

public class BoxCollider : Component
{
    public int Width { get; set; }
    public int Height { get; set; }
    public Action<Entity>? OnCollision { get; set; }

    public BoundingBox2D GetBounds() => new(Entity.Position, Width, Height);
}
```

## MonoGame vs Other Game Frameworks

| Feature | MonoGame | Unity | Godot | FNA |
|---|---|---|---|---|
| Language | C# | C# / C++ | GDScript / C# | C# |
| Editor | None (code-only) | Full visual editor | Full visual editor | None (code-only) |
| 2D support | Excellent | Good | Excellent | Excellent |
| 3D support | Manual | Full engine | Good | Manual |
| Asset pipeline | Content Pipeline tool | Built-in | Built-in | Content Pipeline |
| Console support | Yes (licensed) | Yes (licensed) | Limited | Yes (licensed) |
| License | MIT | Proprietary | MIT | MIT |
| Learning curve | Steep (no editor) | Moderate | Moderate | Steep |

## Best Practices

1. **Use the Content Pipeline (MGCB Editor) to preprocess all assets** (textures, audio, fonts, effects) into `.xnb` format at build time rather than loading raw files at runtime; the pipeline compresses textures into GPU-native formats and validates assets during the build, catching missing or corrupt files before deployment.

2. **Separate game state updates from rendering by keeping all mutation in `Update` and all draw calls in `Draw`**, never modifying entity positions or game state inside `Draw`; MonoGame may skip `Draw` calls under heavy load but always calls `Update` at the fixed timestep rate.

3. **Cache frequently used objects like `Vector2`, `Rectangle`, and `Color` as struct fields** rather than allocating them per frame inside `Update` or `Draw`; allocating reference types every frame increases garbage collection pressure, which causes frame-rate hitches on mobile platforms.

4. **Implement object pooling for bullets, particles, and other short-lived entities** using a `Queue<T>` or `Stack<T>` of pre-allocated instances, calling `Reset()` instead of `new`; `List.Add`/`Remove` patterns for hundreds of projectiles cause GC spikes visible in the frame-time profiler.

5. **Batch all `SpriteBatch.Draw` calls between a single `Begin`/`End` pair sorted by texture** using `SpriteSortMode.Texture` to minimize GPU state changes; each `Begin`/`End` pair submits a separate draw call, and exceeding 100 draw calls per frame degrades performance on integrated GPUs.

6. **Use `gameTime.ElapsedGameTime.TotalSeconds` as a delta-time multiplier for all movement and animation** instead of assuming a fixed 1/60th-second tick, so that gameplay remains consistent even when `IsFixedTimeStep` is `false` or the game runs on a 120Hz display.

7. **Store input state from the previous frame (`_previousKeyboard`, `_previousMouse`) and compare with the current frame** to detect single-press events via `currentState.IsKeyDown(key) && !previousState.IsKeyDown(key)`, preventing continuous-fire behavior from held keys.

8. **Load large assets (level data, audio banks) asynchronously using `Task.Run` with a loading screen** rather than blocking in `LoadContent`, because synchronous loads exceeding 2 seconds trigger ANR (Application Not Responding) dialogs on Android and watchdog kills on iOS.

9. **Define game constants (screen dimensions, physics gravity, spawn rates) in a static `GameConfig` class or load from JSON** rather than scattering magic numbers through `Update` and `Draw` methods, enabling runtime tuning during development without recompilation.

10. **Run the game at a target of 60 FPS using `TargetElapsedTime = TimeSpan.FromSeconds(1.0 / 60.0)` with `IsFixedTimeStep = true`** and measure frame time with `gameTime.IsRunningSlowly` to detect performance regressions; when `IsRunningSlowly` is true, reduce particle counts or skip non-essential visual effects to maintain a stable frame rate.
