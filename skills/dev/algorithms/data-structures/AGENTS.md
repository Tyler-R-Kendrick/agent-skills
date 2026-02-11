# Data Structures

## Overview
Data structures are the foundation of efficient software. The choice of data structure determines the complexity of every operation your program performs. Knuth's *The Art of Computer Programming, Volume 1: Fundamental Algorithms* provides the definitive treatment of information structures -- from linear lists through trees and multilinked structures. This skill covers the major data structures, their operation complexities, and guidance on when to use each.

## Arrays

A contiguous block of memory storing elements of the same type, accessed by index.

| Operation | Time |
|-----------|------|
| Access by index | O(1) |
| Search (unsorted) | O(n) |
| Search (sorted) | O(log n) |
| Insert at end | O(1) amortized (dynamic array) |
| Insert at position | O(n) |
| Delete at position | O(n) |

**Use when**: Random access is frequent, data size is known or grows by appending, cache locality matters.

## Linked Lists

Elements (nodes) are stored non-contiguously; each node contains data and a pointer to the next (and optionally previous) node.

### Variants
- **Singly linked**: Each node points to the next. Traversal is forward only.
- **Doubly linked**: Each node points to both next and previous. Traversal in both directions.
- **Circular**: The last node points back to the first, forming a cycle.

| Operation | Singly | Doubly |
|-----------|--------|--------|
| Access by index | O(n) | O(n) |
| Search | O(n) | O(n) |
| Insert at head | O(1) | O(1) |
| Insert at tail (with tail pointer) | O(1) | O(1) |
| Insert at position (given pointer) | O(1) | O(1) |
| Delete at head | O(1) | O(1) |
| Delete at position (given pointer) | O(n) for singly, O(1) for doubly | O(1) |

**Use when**: Frequent insertions/deletions at arbitrary positions, no need for random access, implementing stacks/queues.

## Stacks

Last-In, First-Out (LIFO) structure.

| Operation | Time |
|-----------|------|
| Push | O(1) |
| Pop | O(1) |
| Peek/Top | O(1) |
| Search | O(n) |

**Implementations**: Array-based (dynamic array) or linked-list-based.

**Use when**: Undo operations, expression evaluation/parsing, DFS traversal, call stack simulation, balanced parentheses checking.

## Queues

### Standard Queue (FIFO)
First-In, First-Out structure.

| Operation | Time |
|-----------|------|
| Enqueue | O(1) |
| Dequeue | O(1) |
| Peek/Front | O(1) |
| Search | O(n) |

### Deque (Double-Ended Queue)
Insert and remove from both ends.

| Operation | Time |
|-----------|------|
| Insert front/back | O(1) |
| Remove front/back | O(1) |
| Peek front/back | O(1) |

### Priority Queue
Elements are dequeued by priority, not insertion order. Typically implemented with a heap.

| Operation | Time (binary heap) |
|-----------|--------------------|
| Insert | O(log n) |
| Extract-min/max | O(log n) |
| Peek min/max | O(1) |
| Decrease key | O(log n) |

**Use when**: BFS traversal (standard queue), scheduling (priority queue), sliding window problems (deque).

## Hash Tables

Store key-value pairs with near-constant-time access by hashing keys to array indices.

### Collision Handling

- **Chaining**: Each bucket holds a linked list (or other collection) of entries that hash to the same index.
  - Simple to implement. Performance degrades to O(n/k) with poor hash distribution.
- **Open Addressing**: All entries stored in the array itself. On collision, probe for the next open slot.
  - **Linear probing**: Check the next slot sequentially. Simple but suffers from clustering.
  - **Quadratic probing**: Check slots at quadratic intervals. Reduces clustering.
  - **Double hashing**: Use a second hash function to determine probe step. Best distribution.

| Operation | Average | Worst |
|-----------|---------|-------|
| Insert | O(1) | O(n) |
| Search | O(1) | O(n) |
| Delete | O(1) | O(n) |

**Load factor**: Ratio of stored elements to table size. Keep below 0.7-0.75 for good performance; resize (rehash) when exceeded.

**Use when**: Fast key-based lookup is critical, keys are hashable, order does not matter.

## Trees

### Binary Search Tree (BST)
Each node has at most two children; left child < parent < right child.

| Operation | Average | Worst (degenerate) |
|-----------|---------|---------------------|
| Search | O(log n) | O(n) |
| Insert | O(log n) | O(n) |
| Delete | O(log n) | O(n) |

### AVL Tree
Self-balancing BST where the height difference between left and right subtrees of any node is at most 1.

| Operation | Time |
|-----------|------|
| Search | O(log n) |
| Insert | O(log n) |
| Delete | O(log n) |

**Tradeoff**: Strictly balanced, so faster lookups than Red-Black trees, but more rotations on insert/delete.

### Red-Black Tree
Self-balancing BST with color properties guaranteeing that the longest path is at most twice the shortest.

| Operation | Time |
|-----------|------|
| Search | O(log n) |
| Insert | O(log n) |
| Delete | O(log n) |

**Tradeoff**: Less strictly balanced than AVL, so fewer rotations on insert/delete but slightly slower lookups. Used in most standard library map/set implementations (C++ std::map, Java TreeMap).

### B-Tree
Generalized self-balancing tree where each node can have many children. Designed for systems that read/write large blocks of data.

| Operation | Time |
|-----------|------|
| Search | O(log n) |
| Insert | O(log n) |
| Delete | O(log n) |

**Use when**: Databases and file systems -- minimizes disk I/O by maximizing keys per node.

### Trie (Prefix Tree)
Tree where each node represents a character; paths from root to leaves represent strings.

| Operation | Time |
|-----------|------|
| Search | O(m) where m = key length |
| Insert | O(m) |
| Delete | O(m) |
| Prefix search | O(m) |

**Use when**: Autocomplete, spell checking, IP routing tables, prefix-based searching.

## Heaps

A complete binary tree satisfying the heap property.

### Min-Heap
Parent <= children. Root is the minimum element.

### Max-Heap
Parent >= children. Root is the maximum element.

| Operation | Time |
|-----------|------|
| Insert | O(log n) |
| Extract min/max | O(log n) |
| Peek min/max | O(1) |
| Build heap | O(n) |
| Decrease/increase key | O(log n) |

**Implementations**: Typically a binary heap backed by an array. For better amortized performance, consider Fibonacci heaps (O(1) amortized insert and decrease-key).

**Use when**: Priority queues, heap sort, finding k-th largest/smallest, median maintenance.

## Graphs

A graph G = (V, E) consists of vertices V and edges E connecting pairs of vertices.

### Representations

#### Adjacency List
Each vertex stores a list of its neighbors.

| Operation | Time |
|-----------|------|
| Add vertex | O(1) |
| Add edge | O(1) |
| Remove edge | O(degree) |
| Check edge exists | O(degree) |
| Space | O(V + E) |

**Best for**: Sparse graphs (E << V^2). Most graph algorithms prefer this representation.

#### Adjacency Matrix
A V x V matrix where entry (i, j) indicates whether an edge exists between vertices i and j.

| Operation | Time |
|-----------|------|
| Add vertex | O(V^2) -- resize |
| Add edge | O(1) |
| Remove edge | O(1) |
| Check edge exists | O(1) |
| Space | O(V^2) |

**Best for**: Dense graphs (E close to V^2), when fast edge existence checks are needed, small graphs.

## Choosing the Right Data Structure

| Need | Data Structure | Why |
|------|---------------|-----|
| Fast index-based access | Array | O(1) random access |
| Fast insertions/deletions anywhere | Linked List | O(1) with pointer |
| LIFO behavior | Stack | Push/pop O(1) |
| FIFO behavior | Queue | Enqueue/dequeue O(1) |
| Fast key-value lookup | Hash Table | O(1) average |
| Ordered key-value storage | BST / Red-Black Tree | O(log n) with ordering |
| Fast lookup with frequent reads | AVL Tree | Strict balance |
| Fast lookup with frequent writes | Red-Black Tree | Fewer rotations |
| Disk-based storage / databases | B-Tree | Minimizes I/O |
| String prefix operations | Trie | O(m) prefix search |
| Priority-based processing | Heap / Priority Queue | O(log n) extract-min/max |
| Modeling relationships | Graph (adjacency list) | Flexible structure |

## Best Practices

- Choose the data structure based on the dominant operation pattern: read-heavy, write-heavy, or balanced.
- Prefer standard library implementations -- they are well-tested and optimized for real-world usage.
- Consider cache locality: arrays and array-backed structures (heaps, hash tables with open addressing) are more cache-friendly than pointer-based structures.
- For concurrent access, consider concurrent variants (ConcurrentHashMap, lock-free queues).
- Remember that theoretical complexity is not the full story -- constant factors, memory allocation patterns, and cache behavior matter in practice.
- Reference Knuth's TAOCP Vol. 1, Chapter 2 (Information Structures) for rigorous treatment of linked structures, trees, and multilinked representations.
