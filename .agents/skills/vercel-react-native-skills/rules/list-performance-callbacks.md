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
const handleItemPress = useCallback((id: string) => {
  handlePress(id)
}, [handlePress])

return (
  <LegendList
    renderItem={({ item }) => (
      <Item key={item.id} item={item} onPress={() => handleItemPress(item.id)} />
    )}
  />
)
```

Reference: [Link to documentation or resource](https://example.com)
