# Frontend Architecture

Frontend architecture approaches — from Multi-Page Apps through Single Page Apps, Server-Side Rendering, Islands Architecture, and Micro-Frontends. Covers the full spectrum of client-side concerns: routing, state management, data fetching, code splitting, and hydration.

## Structure

| File | Purpose |
|------|---------|
| `SKILL.md` | Agent skill definition (frontmatter + instructions) |
| `metadata.json` | Machine-readable metadata and versioning |
| `AGENTS.md` | Agent-optimized quick reference (generated) |
| `README.md` | This file |
| `rules/` | 6 individual best practice rules |

## Sub-skills

| Skill | Description |
|-------|-------------|
| [`micro-frontends/`](micro-frontends/) | Micro-frontend architecture — composition approaches, Module Federation, single-spa, web components, shared state, and i... |
| [`pwa/`](pwa/) | Progressive Web App architecture — service workers, web app manifest, caching strategies, offline support, push notifica... |
| [`spa/`](spa/) | Single Page Application architecture — client-side routing, state management, data fetching, bundle optimization, and th... |
| [`ssr/`](ssr/) | Server-Side Rendering, Static Site Generation, Incremental Static Regeneration, Islands Architecture, Streaming SSR, and... |

## Usage

```bash
npx agentskills add Tyler-R-Kendrick/agent-skills/skills/dev/frontend
```

## License

MIT
