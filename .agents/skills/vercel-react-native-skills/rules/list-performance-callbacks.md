---
title: Hoist callbacks to the root of lists
impact: MEDIUM
impactDescription: Fewer re-renders and faster lists
tags: tag1, tag2
---

## Hoist callbacks to the root of lists

When passing callback functions to list items, create a single instance of the
callback at the root of the list. Items should then call it with a unique
identifier.

**Incorrect (creates a new callback on each render):**

```typescript
return (
  <LegendList
    renderItem={({ item }) => {
      // bad: creates a new callback on each render
      const onPress = () => handlePress(item.id)
      return <Item key={item.id} item={item} onPress={onPress} />
    }}
  />
)
```

**Correct (a single function instance passed to each item):**

```typescript
// Create a stable callback that accepts an id parameter
const handleItemPress = useCallback((id: string) => {
  handlePress(id)
}, [handlePress])

return (
  <LegendList
    renderItem={({ item }) => (
      // Pass both the callback and the item's id as separate props
      // The Item component calls onPress(itemId) internally
      <Item key={item.id} item={item} itemId={item.id} onPress={handleItemPress} />
    )}
  />
)
```

Note: The `Item` component should be implemented to call `onPress(itemId)` when pressed.
