---
name: algorithms
description: |
    Use when selecting algorithms, analyzing complexity, or reasoning about data structure choices. Covers Big-O notation, space vs time tradeoffs, amortized analysis, and algorithmic problem-solving strategy based on Knuth's "The Art of Computer Programming."
    USE FOR: algorithm selection, Big-O analysis, complexity comparison, choosing data structures, algorithmic problem-solving strategy
    DO NOT USE FOR: specific algorithm implementations (use sub-skills), system architecture (use dev/architecture), design patterns (use dev/design-patterns)
license: MIT
metadata:
  displayName: "Algorithms & Data Structures"
  author: "Tyler-R-Kendrick"
compatibility: claude, copilot, cursor
---

# Algorithms & Data Structures

## Overview
This skill covers the foundational principles of algorithmic thinking, drawn primarily from Donald Knuth's *The Art of Computer Programming* (TAOCP). It provides guidance on analyzing algorithm efficiency, understanding complexity classes, and choosing the right algorithmic approach for a given problem.

## Canonical Reference

| Volume | Title | Covers |
|--------|-------|--------|
| TAOCP Vol. 1 | *Fundamental Algorithms* | Data structures, mathematical foundations, information structures |
| TAOCP Vol. 2 | *Seminumerical Algorithms* | Random numbers, arithmetic, floating-point |
| TAOCP Vol. 3 | *Sorting and Searching* | Sorting, searching, comparison of methods |
| TAOCP Vol. 4A | *Combinatorial Algorithms, Part 1* | Combinatorial generation, backtracking, constraint satisfaction |
| TAOCP Vol. 4B | *Combinatorial Algorithms, Part 2* | Satisfiability, graph algorithms |

## Big-O Notation

Big-O describes the upper bound of an algorithm's growth rate as input size increases. It characterizes the worst-case behavior and allows comparison between algorithms independent of hardware.

### Common Complexity Classes

| Notation | Name | Example |
|----------|------|---------|
| O(1) | Constant | Hash table lookup, array index access |
| O(log n) | Logarithmic | Binary search, balanced BST lookup |
| O(n) | Linear | Linear search, single array traversal |
| O(n log n) | Linearithmic | Mergesort, Heapsort, efficient comparison sorts |
| O(n^2) | Quadratic | Bubble sort, insertion sort (worst case), nested loops |
| O(2^n) | Exponential | Recursive Fibonacci (naive), subset enumeration |

### Growth Rate Comparison

```
n        O(1)   O(log n)  O(n)     O(n log n)  O(n^2)      O(2^n)
1        1      0         1        0           1           2
10       1      3.3       10       33          100         1,024
100      1      6.6       100      664         10,000      ~1.27 x 10^30
1,000    1      10        1,000    10,000      1,000,000   ~1.07 x 10^301
10,000   1      13.3      10,000   133,000     100,000,000 (infeasible)
```

## Space vs Time Tradeoffs

Every algorithm makes a tradeoff between how much memory it uses and how fast it runs. Key principles:

- **Caching / Memoization**: Use extra space to store computed results and avoid redundant work (trades space for time).
- **In-place algorithms**: Minimize space usage at the cost of potentially more complex logic or slower execution (trades time for space).
- **Lookup tables**: Precompute results and store them for O(1) access (trades space for time).
- **Compression**: Reduce space at the cost of encoding/decoding time (trades time for space).

| Strategy | Space | Time | Example |
|----------|-------|------|---------|
| Memoized recursion | O(n) extra | Avoids recomputation | DP Fibonacci |
| In-place sort | O(1) extra | May be slower | Heapsort vs Mergesort |
| Hash table | O(n) extra | O(1) average lookup | Two-sum problem |
| Bit manipulation | O(1) extra | Constant factor overhead | Flags, compact sets |

## Amortized Analysis

Amortized analysis averages the cost of operations over a sequence, even when individual operations may be expensive. It provides a tighter bound than worst-case analysis for data structures that occasionally restructure.

- **Aggregate method**: Total cost of n operations divided by n.
- **Accounting method**: Assign different charges to different operations; overcharges on cheap operations "pay" for expensive ones.
- **Potential method**: Define a potential function on the data structure state; amortized cost = actual cost + change in potential.

**Example**: Dynamic array (ArrayList) doubling. Individual insertions are O(1) amortized even though resizing copies all elements, because resizing happens infrequently (the cost of copying is spread across the insertions that preceded it).

## Choosing Algorithms by Problem Type

| Problem Type | Recommended Approach | Sub-Skill |
|--------------|---------------------|-----------|
| Ordering elements | Comparison sort (Quicksort, Mergesort) or linear sort (Radix) | sorting-searching |
| Finding elements | Binary search, hash-based lookup | sorting-searching |
| Storing/retrieving structured data | Choose appropriate data structure by access pattern | data-structures |
| Shortest path / connectivity | Graph algorithms (BFS, DFS, Dijkstra) | graph-algorithms |
| Optimization with overlapping subproblems | Dynamic programming | dynamic-programming |
| Enumerating configurations / constraint solving | Backtracking, branch and bound | combinatorial |
| String matching | KMP, Rabin-Karp, suffix structures | sorting-searching |
| Scheduling / ordering dependencies | Topological sort | graph-algorithms |
| Minimum spanning tree | Prim's, Kruskal's | graph-algorithms |
| Subset/permutation generation | Combinatorial generation | combinatorial |

## Algorithm Analysis Checklist

When evaluating or selecting an algorithm:

1. **Identify the problem class** -- Is it a searching, sorting, graph, optimization, or enumeration problem?
2. **Determine input constraints** -- What is the expected input size? Are there special properties (sorted, sparse, bounded range)?
3. **Analyze time complexity** -- What is the worst-case, average-case, and best-case behavior?
4. **Analyze space complexity** -- How much auxiliary memory is required?
5. **Consider stability and determinism** -- Does order preservation matter? Is randomness acceptable?
6. **Evaluate practical constants** -- Two O(n log n) algorithms may differ significantly in constant factors and cache behavior.
7. **Benchmark with real data** -- Asymptotic analysis is a starting point; real-world performance depends on data distribution and hardware.

## Best Practices

- Start with the simplest correct algorithm, then optimize if profiling shows a bottleneck.
- Know the standard library -- most languages provide well-optimized sorting, searching, and data structure implementations.
- Prefer algorithms with good average-case behavior for general use; consider worst-case guarantees for safety-critical systems.
- Understand amortized costs before concluding that an operation is "slow" based on a single invocation.
- Reference Knuth's TAOCP for rigorous analysis and historical context on any fundamental algorithm.
