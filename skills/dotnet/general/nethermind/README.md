# Nethermind

Guidance for Nethermind Ethereum client and Ethereum development in .NET. USE FOR: running Ethereum full/archive nodes, interacting with Ethereum via JSON-RPC, building Ethereum plugins, blockchain data indexing, smart contract interaction from .NET, EVM chain development. DO NOT USE FOR: Solidity smart contract authoring (use Foundry/Hardhat), front-end dApp UI (use JavaScript/TypeScript), non-EVM blockchains, cryptocurrency trading bots.

## Structure

| File | Purpose |
|------|---------|
| `SKILL.md` | Agent skill definition (frontmatter + instructions) |
| `metadata.json` | Machine-readable metadata and versioning |
| `AGENTS.md` | Agent-optimized quick reference (generated) |
| `README.md` | This file |
| `rules/` | 14 individual best practice rules |

## Usage

```bash
npx agentskills add Tyler-R-Kendrick/agent-skills/skills/dotnet/general/nethermind
```

## License

MIT
