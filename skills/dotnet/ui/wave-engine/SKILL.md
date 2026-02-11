---
name: wave-engine
description: |
  USE FOR: Building 2D and 3D games, simulations, and interactive 3D applications using the Wave Engine (Evergine) with C#. Use when you need a component-based game engine with .NET integration, PBR rendering, and cross-platform support.
  DO NOT USE FOR: Business applications or web UIs (use Blazor or ASP.NET Core), simple 2D-only games where MonoGame is sufficient, or projects requiring the largest community and asset ecosystem (use Unity).
license: MIT
metadata:
  displayName: Wave Engine (Evergine)
  author: "Tyler-R-Kendrick"
  version: "1.0.0"
compatibility:
  - claude
  - copilot
  - cursor
references:
  - title: "Evergine Official Site"
    url: "https://evergine.com/"
  - title: "Evergine GitHub Organization"
    url: "https://github.com/EvergineTeam"
  - title: "Evergine.Framework NuGet Package"
    url: "https://www.nuget.org/packages/Evergine.Framework"
---

# Wave Engine (Evergine)

## Overview

Wave Engine, now known as Evergine, is a component-based game engine for .NET that supports 2D and 3D rendering, physics, audio, and cross-platform deployment. It uses an Entity-Component-System (ECS) architecture where entities are composed of components that define their behavior, appearance, and physics properties. Evergine targets Windows, Linux, macOS, iOS, Android, and WebAssembly. It provides a visual editor (Evergine Studio), PBR (Physically Based Rendering) pipeline, Vulkan/DirectX/OpenGL/Metal backends, and integration with standard .NET libraries.

## Scene Setup and Entity Creation

Scenes in Evergine contain entities organized in a hierarchy. Create entities programmatically by adding components.

```csharp
using Evergine.Common.Graphics;
using Evergine.Components.Graphics3D;
using Evergine.Framework;
using Evergine.Framework.Graphics;
using Evergine.Framework.Services;
using Evergine.Mathematics;

namespace MyGame.Scenes;

public class MainScene : Scene
{
    protected override void CreateScene()
    {
        // Create a ground plane
        var ground = new Entity("Ground")
            .AddComponent(new Transform3D
            {
                Position = Vector3.Zero,
                Scale = new Vector3(20f, 0.1f, 20f)
            })
            .AddComponent(new MaterialComponent())
            .AddComponent(new PlaneMesh())
            .AddComponent(new MeshRenderer());

        EntityManager.Add(ground);

        // Create a cube
        var cube = new Entity("PlayerCube")
            .AddComponent(new Transform3D
            {
                Position = new Vector3(0f, 1f, 0f)
            })
            .AddComponent(new MaterialComponent())
            .AddComponent(new CubeMesh { Size = 1f })
            .AddComponent(new MeshRenderer())
            .AddComponent(new PlayerMovement());

        EntityManager.Add(cube);

        // Create a camera
        var camera = new Entity("MainCamera")
            .AddComponent(new Transform3D
            {
                Position = new Vector3(0f, 8f, 12f),
                Rotation = new Vector3(-30f, 0f, 0f)
            })
            .AddComponent(new Camera3D())
            .AddComponent(new FreeCamera3D());

        EntityManager.Add(camera);

        // Create a directional light
        var light = new Entity("Sun")
            .AddComponent(new Transform3D
            {
                Rotation = new Vector3(-45f, 30f, 0f)
            })
            .AddComponent(new DirectionalLight
            {
                Color = Color.White,
                Intensity = 1.5f
            });

        EntityManager.Add(light);
    }
}
```

## Custom Component with Lifecycle

Components define behavior by overriding lifecycle methods: `OnAttached`, `Start`, `Update`, `OnDetach`.

```csharp
using Evergine.Common.Input.Keyboard;
using Evergine.Framework;
using Evergine.Framework.Graphics;
using Evergine.Mathematics;

namespace MyGame.Components;

public class PlayerMovement : Component
{
    [BindComponent]
    private Transform3D _transform = null!;

    private float _moveSpeed = 5f;
    private float _rotationSpeed = 90f;

    private KeyboardDispatcher _keyboard = null!;

    protected override bool OnAttached()
    {
        if (!base.OnAttached()) return false;

        var display = Owner.Scene.Managers.RenderManager?.ActiveCamera3D?.Display;
        if (display != null)
        {
            _keyboard = display.KeyboardDispatcher;
        }

        return true;
    }

    protected override void Update(TimeSpan gameTime)
    {
        float deltaTime = (float)gameTime.TotalSeconds;
        var movement = Vector3.Zero;

        if (_keyboard.IsKeyDown(Keys.W)) movement += Vector3.Forward;
        if (_keyboard.IsKeyDown(Keys.S)) movement += Vector3.Backward;
        if (_keyboard.IsKeyDown(Keys.A)) movement += Vector3.Left;
        if (_keyboard.IsKeyDown(Keys.D)) movement += Vector3.Right;

        if (movement != Vector3.Zero)
        {
            movement = Vector3.Normalize(movement) * _moveSpeed * deltaTime;
            _transform.LocalPosition += movement;
        }

        if (_keyboard.IsKeyDown(Keys.Q))
            _transform.LocalRotation *= Quaternion.CreateFromYawPitchRoll(
                _rotationSpeed * deltaTime * MathHelper.DegreesToRadians, 0, 0);
    }
}
```

## Material and Rendering

Configure materials with PBR properties for realistic rendering.

```csharp
using Evergine.Common.Graphics;
using Evergine.Components.Graphics3D;
using Evergine.Framework;
using Evergine.Framework.Graphics;
using Evergine.Framework.Graphics.Materials;

namespace MyGame.Components;

public class MaterialSetup : Component
{
    [BindComponent]
    private MaterialComponent _materialComponent = null!;

    protected override void Start()
    {
        base.Start();

        var assetsService = Application.Current.Container.Resolve<AssetsService>();

        var material = new StandardMaterial
        {
            BaseColor = Color.SteelBlue,
            Metallic = 0.3f,
            Roughness = 0.6f,
            EmissiveColor = Color.Black
        };

        _materialComponent.Material = material;
    }
}
```

## Collision Detection and Physics

Evergine integrates with physics engines for rigid body simulation and collision detection.

```csharp
using Evergine.Bullet;
using Evergine.Framework;
using Evergine.Framework.Graphics;
using Evergine.Framework.Physics3D;
using Evergine.Mathematics;

namespace MyGame.Components;

public class PhysicsCube : Component
{
    protected override void Start()
    {
        base.Start();

        // Create a physics-enabled cube entity
        var physicsCube = new Entity("FallingCube")
            .AddComponent(new Transform3D
            {
                Position = new Vector3(0f, 10f, 0f)
            })
            .AddComponent(new CubeMesh { Size = 0.5f })
            .AddComponent(new MeshRenderer())
            .AddComponent(new MaterialComponent())
            .AddComponent(new BoxCollider3D { Size = new Vector3(0.5f) })
            .AddComponent(new RigidBody3D
            {
                Mass = 1f,
                LinearFactor = Vector3.One,
                Restitution = 0.5f
            });

        Owner.Scene.Managers.EntityManager.Add(physicsCube);
    }
}

public class CollisionHandler : Component
{
    [BindComponent]
    private RigidBody3D _rigidBody = null!;

    protected override void Start()
    {
        base.Start();
        _rigidBody.BeginCollision += OnBeginCollision;
        _rigidBody.EndCollision += OnEndCollision;
    }

    private void OnBeginCollision(object sender, CollisionInfo3D info)
    {
        var otherEntity = info.OtherBody.Owner;
        System.Diagnostics.Debug.WriteLine(
            $"Collision started with: {otherEntity.Name}");
    }

    private void OnEndCollision(object sender, CollisionInfo3D info)
    {
        System.Diagnostics.Debug.WriteLine(
            $"Collision ended with: {info.OtherBody.Owner.Name}");
    }

    protected override void OnDetach()
    {
        _rigidBody.BeginCollision -= OnBeginCollision;
        _rigidBody.EndCollision -= OnEndCollision;
        base.OnDetach();
    }
}
```

## Evergine vs Other Game Engines

| Feature | Evergine | Unity | MonoGame | Stride |
|---|---|---|---|---|
| Language | C# | C# | C# | C# |
| Editor | Evergine Studio | Unity Editor | None | Stride Editor |
| Rendering | PBR, Vulkan/DX/Metal | PBR, multiple | SpriteBatch | PBR, Vulkan/DX |
| ECS | Native ECS | Hybrid (DOTS optional) | None (manual) | Native ECS |
| Physics | Bullet integration | PhysX | None (manual) | Bullet |
| WebAssembly | Yes | No (WebGL) | Limited | No |
| License | Free (commercial) | Free (revenue caps) | MIT | MIT |

## Best Practices

1. **Use the `[BindComponent]` attribute to declare component dependencies** rather than calling `Owner.FindComponent<T>()` at runtime, because `[BindComponent]` is resolved during entity attachment and throws a clear error if the dependency is missing, preventing null reference exceptions during `Update`.

2. **Override `OnAttached()` for one-time initialization that depends on the entity hierarchy** and `Start()` for logic that requires the scene to be fully loaded; code in the constructor runs before the entity is added to the scene and cannot access `Owner`, `Transform3D`, or other components.

3. **Unsubscribe from events (collision, input, custom events) in `OnDetach()`** to prevent memory leaks and callback invocations on destroyed components; Evergine does not automatically unsubscribe event handlers when entities are removed from the scene.

4. **Use `Vector3.Normalize()` on movement direction vectors before multiplying by speed** to ensure diagonal movement (W+D) does not produce faster movement than cardinal directions; unnormalized diagonal vectors have magnitude ~1.414, resulting in 41% faster diagonal speed.

5. **Apply delta time (`(float)gameTime.TotalSeconds`) to all frame-dependent calculations** (movement, rotation, timer countdowns) in `Update()`, so behavior remains consistent across different frame rates and hardware; hardcoding per-frame increments causes gameplay speed to vary with FPS.

6. **Organize entities into named hierarchies using parent-child relationships** (e.g., `Player > Body > Weapon > MuzzlePoint`) so that child transforms inherit parent transforms automatically, enabling complex multi-part objects without manual position synchronization.

7. **Use `AssetsService` to load textures, models, and audio assets by asset ID** rather than file paths, because asset IDs are stable across content pipeline rebuilds and support platform-specific asset variants; file-path loading bypasses the content pipeline and may fail on non-desktop platforms.

8. **Keep `Update()` methods lightweight by offloading expensive computations** (pathfinding, AI decision trees, procedural generation) to background tasks or spread them across multiple frames using state machines, because `Update()` runs on the main thread and blocks rendering.

9. **Set `RigidBody3D.Mass` to physically plausible values** (e.g., 1-100 kg for game objects) and configure `Restitution` and `Friction` per material rather than per object, because unrealistic mass ratios (0.001 vs 10000) cause physics solver instability, tunneling, and jittering.

10. **Test WASM builds with reduced asset resolution and polygon counts** because WebAssembly does not support multithreaded rendering; high-poly scenes that run at 60 FPS on desktop may drop below 15 FPS in the browser, requiring LOD (Level of Detail) strategies specific to the WASM target.
