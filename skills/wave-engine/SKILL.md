---
description: Guidance for Wave Engine game development platform.
metadata:
  displayName: Wave Engine
---

# Wave Engine

## Overview
Wave Engine is a cross-platform game engine for creating 2D and 3D games using C#.

## Example
```csharp
public class MyScene : Scene
{
    protected override void CreateScene()
    {
        // Create entity
        var entity = new Entity()
            .AddComponent(new Transform3D())
            .AddComponent(new Model("Content/Models/cube.fbx"))
            .AddComponent(new MaterialComponent())
            .AddComponent(new MeshRenderer());
            
        EntityManager.Add(entity);
        
        // Add camera
        var camera = new Entity()
            .AddComponent(new Transform3D { Position = new Vector3(0, 5, 10) })
            .AddComponent(new Camera3D());
            
        EntityManager.Add(camera);
    }
}
```

## Best Practices
- Use component-based architecture
- Optimize assets
- Leverage visual editor
- Test on target platforms
