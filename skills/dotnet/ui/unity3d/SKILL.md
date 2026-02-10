---
description: Guidance for Unity3D game development using C#.
metadata:
  displayName: Unity3D
---

# Unity3D

## Overview
Unity is a cross-platform game engine with C# scripting support for 2D and 3D game development.

## Example
```csharp
using UnityEngine;

public class PlayerController : MonoBehaviour
{
    public float speed = 5f;
    private Rigidbody _rb;
    
    void Start()
    {
        _rb = GetComponent<Rigidbody>();
    }
    
    void Update()
    {
        float h = Input.GetAxis("Horizontal");
        float v = Input.GetAxis("Vertical");
        
        Vector3 movement = new Vector3(h, 0, v);
        _rb.AddForce(movement * speed);
    }
}
```

## Best Practices
- Use MonoBehaviour lifecycle correctly
- Optimize for target platform
- Use object pooling
- Leverage coroutines
- Profile performance
- Follow Unity naming conventions
