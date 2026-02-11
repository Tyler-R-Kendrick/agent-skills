# Algorithms & Data Structures

Use when selecting algorithms, analyzing complexity, or reasoning about data structure choices. Covers Big-O notation, space vs time tradeoffs, amortized analysis, and algorithmic problem-solving strategy based on Knuth's "The Art of Computer Programming."

## Structure

| File | Purpose |
|------|---------|
| `SKILL.md` | Agent skill definition (frontmatter + instructions) |
| `metadata.json` | Machine-readable metadata and versioning |
| `AGENTS.md` | Agent-optimized quick reference (generated) |
| `README.md` | This file |
| `rules/` | 5 individual best practice rules |

## Sub-skills

| Skill | Description |
|-------|-------------|
| [`combinatorial/`](combinatorial/) | Use when solving problems involving permutations, combinations, backtracking, branch and bound, subset generation, and c... |
| [`data-structures/`](data-structures/) | Use when selecting, implementing, or reasoning about data structures. Covers arrays, linked lists, stacks, queues, hash ... |
| [`dynamic-programming/`](dynamic-programming/) | Use when solving optimization problems with overlapping subproblems and optimal substructure. Covers memoization (top-do... |
| [`graph-algorithms/`](graph-algorithms/) | Use when working with graph problems including traversal, shortest paths, minimum spanning trees, topological sorting, a... |
| [`sorting-searching/`](sorting-searching/) | Use when implementing or selecting sorting and searching algorithms. Covers comparison sorts (Quicksort, Mergesort, Heap... |

## Usage

```bash
npx agentskills add Tyler-R-Kendrick/agent-skills/skills/dev/algorithms
```

## License

MIT
