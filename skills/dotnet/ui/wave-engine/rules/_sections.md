# Wave Engine (Evergine) Rules

Best practices and rules for Wave Engine (Evergine).

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Use the `[BindComponent]` attribute to declare component dependencies | HIGH | [`wave-engine-use-the-bindcomponent-attribute-to-declare-component.md`](wave-engine-use-the-bindcomponent-attribute-to-declare-component.md) |
| 2 | Override `OnAttached()` for one-time initialization that depends on the entity hierarchy | HIGH | [`wave-engine-override-onattached-for-one-time-initialization-that.md`](wave-engine-override-onattached-for-one-time-initialization-that.md) |
| 3 | Unsubscribe from events (collision, input, custom events) in `OnDetach()` | HIGH | [`wave-engine-unsubscribe-from-events-collision-input-custom-events-in.md`](wave-engine-unsubscribe-from-events-collision-input-custom-events-in.md) |
| 4 | Use `Vector3.Normalize()` on movement direction vectors before multiplying by speed | HIGH | [`wave-engine-use-vector3-normalize-on-movement-direction-vectors-before.md`](wave-engine-use-vector3-normalize-on-movement-direction-vectors-before.md) |
| 5 | Apply delta time (`(float)gameTime.TotalSeconds`) to all frame-dependent calculations | MEDIUM | [`wave-engine-apply-delta-time-float-gametime-totalseconds-to-all-frame.md`](wave-engine-apply-delta-time-float-gametime-totalseconds-to-all-frame.md) |
| 6 | Organize entities into named hierarchies using parent-child relationships | MEDIUM | [`wave-engine-organize-entities-into-named-hierarchies-using-parent-child.md`](wave-engine-organize-entities-into-named-hierarchies-using-parent-child.md) |
| 7 | Use `AssetsService` to load textures, models, and audio assets by asset ID | MEDIUM | [`wave-engine-use-assetsservice-to-load-textures-models-and-audio-assets.md`](wave-engine-use-assetsservice-to-load-textures-models-and-audio-assets.md) |
| 8 | Keep `Update()` methods lightweight by offloading expensive computations | MEDIUM | [`wave-engine-keep-update-methods-lightweight-by-offloading-expensive.md`](wave-engine-keep-update-methods-lightweight-by-offloading-expensive.md) |
| 9 | Set `RigidBody3D.Mass` to physically plausible values | MEDIUM | [`wave-engine-set-rigidbody3d-mass-to-physically-plausible-values.md`](wave-engine-set-rigidbody3d-mass-to-physically-plausible-values.md) |
| 10 | Test WASM builds with reduced asset resolution and polygon counts | MEDIUM | [`wave-engine-test-wasm-builds-with-reduced-asset-resolution-and-polygon.md`](wave-engine-test-wasm-builds-with-reduced-asset-resolution-and-polygon.md) |
