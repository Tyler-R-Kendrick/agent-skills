---
name: dynamic-programming
description: |
    Use when solving optimization problems with overlapping subproblems and optimal substructure. Covers memoization (top-down) vs tabulation (bottom-up), classic DP problems (Knapsack, LCS, LIS, Edit Distance, Coin Change, Matrix Chain, Rod Cutting), and the DP framework. Based on Knuth's TAOCP.
    USE FOR: optimization problems with overlapping subproblems, memoization strategies, tabulation approaches, recognizing DP problem patterns, state definition and recurrence formulation
    DO NOT USE FOR: graph shortest paths (use graph-algorithms), sorting (use sorting-searching)
license: MIT
metadata:
  displayName: "Dynamic Programming"
  author: "Tyler-R-Kendrick"
compatibility: claude, copilot, cursor
references:
  - title: "The Art of Computer Programming — Donald Knuth"
    url: "https://www-cs-faculty.stanford.edu/~knuth/taocp.html"
  - title: "Dynamic Programming — Wikipedia"
    url: "https://en.wikipedia.org/wiki/Dynamic_programming"
---

# Dynamic Programming

## Overview
Dynamic programming (DP) is a method for solving problems by breaking them into overlapping subproblems, solving each subproblem once, and storing the results to avoid redundant computation. Knuth discusses dynamic programming techniques throughout *The Art of Computer Programming*, particularly in the context of optimization, sequence analysis, and combinatorial problems. The term was coined by Richard Bellman in the 1950s.

## Core Principles

### Optimal Substructure
A problem exhibits optimal substructure if an optimal solution to the problem contains optimal solutions to its subproblems. This property allows us to build the global optimum from local optima.

**Example**: The shortest path from A to C through B consists of the shortest path from A to B plus the shortest path from B to C.

### Overlapping Subproblems
A problem has overlapping subproblems when the same subproblems are solved repeatedly in a naive recursive approach. DP eliminates this redundancy by storing results.

**Example**: Computing Fibonacci(n) recursively recomputes Fibonacci(k) for each k < n exponentially many times.

## Two Approaches

### Memoization (Top-Down)
Start with the original problem, recurse into subproblems, and cache results as they are computed.

```
FIB_MEMO(n, cache):
    if n <= 1: return n
    if n in cache: return cache[n]
    cache[n] = FIB_MEMO(n - 1, cache) + FIB_MEMO(n - 2, cache)
    return cache[n]
```

**Advantages**: Natural to write (follows recursive structure), computes only the subproblems actually needed.
**Disadvantages**: Recursion overhead, potential stack overflow for deep recursion.

### Tabulation (Bottom-Up)
Build a table from the smallest subproblems up to the desired result, iterating in a careful order.

```
FIB_TABLE(n):
    if n <= 1: return n
    dp[0] = 0, dp[1] = 1
    for i = 2 to n:
        dp[i] = dp[i - 1] + dp[i - 2]
    return dp[n]
```

**Advantages**: No recursion overhead, easier to optimize space (often only need the last few entries).
**Disadvantages**: May compute subproblems that are never needed, ordering can be less intuitive.

## The DP Framework

When facing a potential DP problem, follow these steps:

### 1. Define the State
Identify what information is needed to describe a subproblem. This becomes the index/key for your DP table.

**Example** (Knapsack): `dp[i][w]` = maximum value using items 1..i with capacity w.

### 2. Write the Recurrence
Express the solution to a subproblem in terms of smaller subproblems.

**Example** (Knapsack):
```
dp[i][w] = max(
    dp[i-1][w],                          // skip item i
    dp[i-1][w - weight[i]] + value[i]    // take item i (if weight[i] <= w)
)
```

### 3. Identify the Base Case
Define the values for the smallest subproblems that cannot be decomposed further.

**Example** (Knapsack): `dp[0][w] = 0` for all w (no items means no value).

### 4. Determine the Build Order
For tabulation, compute subproblems in an order such that all dependencies are resolved before they are needed.

**Example** (Knapsack): Process items from i = 1 to n, capacities from w = 0 to W.

### 5. Extract the Answer
The answer to the original problem is at a specific location in the DP table.

**Example** (Knapsack): `dp[n][W]`.

### 6. (Optional) Optimize Space
If the recurrence only depends on the previous row or a fixed number of prior entries, reduce the table accordingly.

**Example** (Fibonacci): Only need dp[i-1] and dp[i-2], so use two variables instead of an array.

## Classic Problems

### Fibonacci Sequence

| Approach | Time | Space |
|----------|------|-------|
| Naive recursion | O(2^n) | O(n) stack |
| Memoization | O(n) | O(n) |
| Tabulation | O(n) | O(n) or O(1) optimized |

### 0/1 Knapsack
Given n items with weights and values, and a knapsack of capacity W, maximize the total value without exceeding the capacity. Each item can be taken at most once.

- **State**: `dp[i][w]` = max value using first i items with capacity w
- **Recurrence**: `dp[i][w] = max(dp[i-1][w], dp[i-1][w-wt[i]] + val[i])`
- **Time**: O(n * W)
- **Space**: O(n * W), or O(W) with rolling array

### Unbounded Knapsack
Same as 0/1 Knapsack, but each item can be taken unlimited times.

- **State**: `dp[w]` = max value with capacity w
- **Recurrence**: `dp[w] = max(dp[w], dp[w-wt[i]] + val[i])` for each item i
- **Time**: O(n * W)
- **Space**: O(W)

### Longest Common Subsequence (LCS)
Find the longest subsequence common to two sequences.

- **State**: `dp[i][j]` = length of LCS of first i characters of X and first j characters of Y
- **Recurrence**:
  ```
  if X[i] == Y[j]: dp[i][j] = dp[i-1][j-1] + 1
  else:             dp[i][j] = max(dp[i-1][j], dp[i][j-1])
  ```
- **Time**: O(m * n)
- **Space**: O(m * n), or O(min(m, n)) optimized

### Longest Increasing Subsequence (LIS)
Find the length of the longest strictly increasing subsequence.

- **State**: `dp[i]` = length of LIS ending at index i
- **Recurrence**: `dp[i] = max(dp[j] + 1)` for all j < i where A[j] < A[i]
- **Time**: O(n^2), or O(n log n) with patience sorting (binary search on tails)
- **Space**: O(n)

### Edit Distance (Levenshtein Distance)
Minimum number of operations (insert, delete, replace) to transform one string into another.

- **State**: `dp[i][j]` = edit distance between first i characters of X and first j characters of Y
- **Recurrence**:
  ```
  if X[i] == Y[j]: dp[i][j] = dp[i-1][j-1]
  else:             dp[i][j] = 1 + min(dp[i-1][j],      // delete
                                        dp[i][j-1],      // insert
                                        dp[i-1][j-1])    // replace
  ```
- **Time**: O(m * n)
- **Space**: O(m * n), or O(min(m, n)) optimized

### Coin Change
Given coin denominations and a target amount, find the minimum number of coins needed (or the number of ways to make change).

**Minimum coins:**
- **State**: `dp[a]` = minimum coins to make amount a
- **Recurrence**: `dp[a] = min(dp[a - coin] + 1)` for each coin denomination
- **Base case**: `dp[0] = 0`
- **Time**: O(amount * number_of_coins)
- **Space**: O(amount)

### Matrix Chain Multiplication
Find the optimal way to parenthesize a sequence of matrices to minimize total scalar multiplications.

- **State**: `dp[i][j]` = minimum cost to multiply matrices i through j
- **Recurrence**: `dp[i][j] = min(dp[i][k] + dp[k+1][j] + p[i-1]*p[k]*p[j])` for i <= k < j
- **Base case**: `dp[i][i] = 0`
- **Time**: O(n^3)
- **Space**: O(n^2)

### Rod Cutting
Given a rod of length n and prices for each length, find the maximum revenue from cutting the rod.

- **State**: `dp[l]` = maximum revenue for rod of length l
- **Recurrence**: `dp[l] = max(price[k] + dp[l - k])` for 1 <= k <= l
- **Base case**: `dp[0] = 0`
- **Time**: O(n^2)
- **Space**: O(n)

## DP Problem Complexity Summary

| Problem | Time | Space |
|---------|------|-------|
| Fibonacci | O(n) | O(1) optimized |
| 0/1 Knapsack | O(n * W) | O(W) optimized |
| Unbounded Knapsack | O(n * W) | O(W) |
| LCS | O(m * n) | O(min(m, n)) optimized |
| LIS | O(n log n) | O(n) |
| Edit Distance | O(m * n) | O(min(m, n)) optimized |
| Coin Change | O(amount * coins) | O(amount) |
| Matrix Chain Mult. | O(n^3) | O(n^2) |
| Rod Cutting | O(n^2) | O(n) |

## Memoization vs Tabulation: When to Use Which

| Factor | Memoization (Top-Down) | Tabulation (Bottom-Up) |
|--------|----------------------|----------------------|
| Implementation style | Recursive + cache | Iterative + table |
| Subproblem computation | Only those needed | All subproblems |
| Stack overflow risk | Yes (deep recursion) | No |
| Space optimization | Harder | Easier (rolling arrays) |
| Code clarity | Often more intuitive | Requires careful ordering |
| Performance | Function call overhead | Usually faster in practice |

**Guideline**: Start with memoization for clarity and correctness, then convert to tabulation if performance or space optimization is needed.

## Recognizing DP Problems

A problem is likely solvable with DP if:
1. It asks for an **optimal value** (min, max, count) or the **number of ways** to achieve something.
2. It has **overlapping subproblems** -- naive recursion recomputes the same states.
3. It has **optimal substructure** -- the optimal solution builds on optimal sub-solutions.
4. The problem can be parameterized by a **small set of variables** (the state space is manageable).

## Best Practices

- Always verify optimal substructure before applying DP -- not all optimization problems have it (greedy or exhaustive search may be required instead).
- Define your state precisely and minimally -- extra state dimensions explode the table size.
- Validate your recurrence with small examples before coding.
- Consider whether the problem admits a greedy solution (simpler) before committing to DP.
- For interview/competition settings, practice identifying the state and recurrence quickly -- the implementation follows mechanically.
- Reference Knuth's TAOCP for mathematical rigor on sequence problems, optimal search trees, and combinatorial optimization where DP techniques apply.
