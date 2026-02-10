---
name: graph-algorithms
description: |
    Use when working with graph problems including traversal, shortest paths, minimum spanning trees, topological sorting, and connectivity analysis. Covers BFS, DFS, Dijkstra, Bellman-Ford, Floyd-Warshall, Prim, Kruskal, Tarjan, Kosaraju, A*, and Union-Find. Based on Knuth's TAOCP.
    USE FOR: graph traversal, shortest path computation, minimum spanning tree construction, topological sorting, strongly connected components, pathfinding, union-find operations
    DO NOT USE FOR: basic data structure operations (use data-structures), optimization problems (use dynamic-programming)
license: MIT
metadata:
  displayName: "Graph Algorithms"
  author: "Tyler-R-Kendrick"
compatibility: claude, copilot, cursor
---

# Graph Algorithms

## Overview
Graph algorithms solve problems on structures composed of vertices (nodes) and edges (connections). They are central to network analysis, scheduling, routing, social networks, compilers, and countless other domains. Knuth addresses graph algorithms across *The Art of Computer Programming*, particularly in Volumes 1, 4A, and 4B, covering everything from basic traversal to combinatorial graph problems.

## Graph Types

| Type | Description |
|------|-------------|
| **Directed** (digraph) | Edges have direction: (u, v) does not imply (v, u) |
| **Undirected** | Edges are bidirectional: {u, v} connects both ways |
| **Weighted** | Edges carry numeric weights (costs, distances) |
| **Unweighted** | All edges are equivalent (or weight = 1) |
| **Cyclic** | Contains at least one cycle |
| **Acyclic** | Contains no cycles. A directed acyclic graph is a DAG |
| **Connected** | Every vertex is reachable from every other (undirected) |
| **Strongly connected** | Every vertex reachable from every other via directed paths |

## Traversal Algorithms

### Breadth-First Search (BFS)
Explores vertices level by level, visiting all neighbors before moving deeper. Uses a queue.

- **Time**: O(V + E)
- **Space**: O(V)
- **Use for**: Shortest path in unweighted graphs, level-order traversal, checking bipartiteness, finding connected components.

```
BFS(G, source):
    create queue Q
    mark source as visited
    Q.enqueue(source)
    while Q is not empty:
        u = Q.dequeue()
        for each neighbor v of u:
            if v is not visited:
                mark v as visited
                Q.enqueue(v)
```

### Depth-First Search (DFS)
Explores as deep as possible along each branch before backtracking. Uses a stack (or recursion).

- **Time**: O(V + E)
- **Space**: O(V)
- **Use for**: Cycle detection, topological sort, finding connected/strongly connected components, path finding, maze solving.

```
DFS(G, source):
    mark source as visited
    for each neighbor v of source:
        if v is not visited:
            DFS(G, v)
```

**Iterative version** (using explicit stack):
```
DFS_ITERATIVE(G, source):
    create stack S
    S.push(source)
    while S is not empty:
        u = S.pop()
        if u is not visited:
            mark u as visited
            for each neighbor v of u:
                if v is not visited:
                    S.push(v)
```

## Shortest Path Algorithms

### Dijkstra's Algorithm
Finds the shortest path from a source to all other vertices in a graph with non-negative edge weights.

- **Time**: O((V + E) log V) with a binary heap; O(V^2) with a simple array
- **Space**: O(V)
- **Precondition**: No negative edge weights.

```
DIJKSTRA(G, source):
    dist[v] = infinity for all v
    dist[source] = 0
    create min-priority queue Q with all vertices
    while Q is not empty:
        u = Q.extract_min()
        for each neighbor v of u:
            alt = dist[u] + weight(u, v)
            if alt < dist[v]:
                dist[v] = alt
                Q.decrease_key(v, alt)
    return dist
```

### Bellman-Ford Algorithm
Finds shortest paths from a source vertex, handling negative edge weights. Can detect negative-weight cycles.

- **Time**: O(V * E)
- **Space**: O(V)
- **Advantage over Dijkstra**: Handles negative weights. Detects negative cycles.

### Floyd-Warshall Algorithm
Finds shortest paths between all pairs of vertices.

- **Time**: O(V^3)
- **Space**: O(V^2)
- **Use for**: Dense graphs where all-pairs shortest paths are needed, detecting negative cycles, transitive closure.

## Minimum Spanning Tree (MST)

A minimum spanning tree connects all vertices with the minimum total edge weight (for undirected, connected, weighted graphs).

### Prim's Algorithm
Grows the MST from a starting vertex, always adding the cheapest edge that connects a new vertex.

- **Time**: O((V + E) log V) with a binary heap; O(V^2) with an adjacency matrix
- **Space**: O(V)
- **Best for**: Dense graphs (adjacency matrix implementation).

### Kruskal's Algorithm
Sorts all edges by weight, then adds edges in order, skipping those that would create a cycle (using Union-Find).

- **Time**: O(E log E) (dominated by sorting)
- **Space**: O(V) for Union-Find
- **Best for**: Sparse graphs, when edges are already sorted or easy to sort.

## Topological Sort

Produces a linear ordering of vertices in a DAG such that for every directed edge (u, v), u comes before v.

- **Algorithms**: Kahn's algorithm (BFS-based, using in-degree tracking) or DFS-based (reverse post-order).
- **Time**: O(V + E)
- **Space**: O(V)
- **Use for**: Build systems, task scheduling, dependency resolution, course prerequisites.

## Strongly Connected Components (SCC)

A strongly connected component is a maximal set of vertices such that there is a directed path from each vertex to every other vertex in the set.

### Tarjan's Algorithm
Single DFS pass using a stack and low-link values.
- **Time**: O(V + E)
- **Space**: O(V)

### Kosaraju's Algorithm
Two DFS passes: first on the original graph (to determine finish order), then on the transposed graph.
- **Time**: O(V + E)
- **Space**: O(V)

**Use for**: Analyzing strongly connected regions in directed graphs, 2-SAT problem solving, condensing a directed graph into its DAG of components.

## Pathfinding

### A* Search
Informed search algorithm that uses a heuristic to guide exploration toward the goal. Combines Dijkstra's actual cost with a heuristic estimate of remaining cost.

- **Time**: Depends on heuristic quality; O(E) in the best case with a perfect heuristic, exponential in the worst case
- **Space**: O(V)
- **Precondition**: Heuristic must be admissible (never overestimates) for optimality. If also consistent (monotone), A* is both optimal and efficient.
- **Use for**: Game pathfinding, map routing, robotics navigation, any problem with a good distance heuristic.

## Union-Find (Disjoint Set Union)

A data structure that tracks elements partitioned into disjoint sets. Supports near-constant-time union and find operations.

| Operation | Time (amortized with path compression + union by rank) |
|-----------|-------------------------------------------------------|
| Find | O(alpha(n)) -- effectively O(1) |
| Union | O(alpha(n)) -- effectively O(1) |
| Space | O(n) |

Where alpha is the inverse Ackermann function, which grows extremely slowly.

**Use for**: Kruskal's MST, detecting cycles in undirected graphs, dynamic connectivity, network connectivity queries.

## Complexity Comparison

| Algorithm | Time | Space | Graph Type |
|-----------|------|-------|------------|
| BFS | O(V + E) | O(V) | Any |
| DFS | O(V + E) | O(V) | Any |
| Dijkstra (binary heap) | O((V + E) log V) | O(V) | Non-negative weights |
| Bellman-Ford | O(V * E) | O(V) | Any (detects negative cycles) |
| Floyd-Warshall | O(V^3) | O(V^2) | All-pairs, any weights |
| Prim (binary heap) | O((V + E) log V) | O(V) | Undirected, weighted |
| Kruskal | O(E log E) | O(V) | Undirected, weighted |
| Topological Sort | O(V + E) | O(V) | DAG |
| Tarjan's SCC | O(V + E) | O(V) | Directed |
| Kosaraju's SCC | O(V + E) | O(V) | Directed |
| A* | O(E) to O(b^d) | O(V) | Weighted, with heuristic |
| Union-Find | O(alpha(n)) per op | O(n) | Disjoint sets |

## Directed vs Undirected: Algorithm Applicability

| Algorithm | Directed | Undirected |
|-----------|----------|------------|
| BFS / DFS | Yes | Yes |
| Dijkstra | Yes | Yes |
| Bellman-Ford | Yes | Yes (treat as bidirectional) |
| Floyd-Warshall | Yes | Yes |
| Topological Sort | Yes (DAG only) | No |
| Tarjan / Kosaraju SCC | Yes | N/A (use connected components) |
| Prim / Kruskal MST | No | Yes |
| A* | Yes | Yes |

## Weighted vs Unweighted: Algorithm Selection

| Scenario | Recommended Algorithm |
|----------|----------------------|
| Shortest path, unweighted | BFS |
| Shortest path, non-negative weights | Dijkstra |
| Shortest path, negative weights possible | Bellman-Ford |
| All-pairs shortest paths | Floyd-Warshall |
| Minimum spanning tree | Prim (dense) or Kruskal (sparse) |
| Reachability / connectivity | BFS or DFS |

## Best Practices

- Always choose the simplest algorithm that handles your constraints: BFS for unweighted shortest paths, Dijkstra for non-negative weights, Bellman-Ford only when negative weights are present.
- For sparse graphs, adjacency list representation is almost always preferred. Use adjacency matrices only for dense graphs or when edge-existence queries dominate.
- When implementing Kruskal's, always use Union-Find with path compression and union by rank for near-constant-time operations.
- For A*, invest time in designing a good heuristic -- the quality of the heuristic determines practical performance.
- Consider whether the graph is a DAG -- many problems simplify dramatically on acyclic graphs (shortest paths become linear time via topological order relaxation).
- Reference Knuth's TAOCP for rigorous mathematical analysis of graph traversal, network flows, and combinatorial graph structures.
