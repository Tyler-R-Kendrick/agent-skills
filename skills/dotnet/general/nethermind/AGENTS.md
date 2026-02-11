# Nethermind

## Overview
Nethermind is a high-performance Ethereum client written in .NET, supporting full and archive nodes.

## Features
- Full Ethereum node
- Archive node support
- JSON-RPC API
- Plugins system
- Metrics and monitoring

## Example Configuration
```json
{
  "Init": {
    "ChainSpecPath": "chainspec/mainnet.json",
    "BaseDbPath": "nethermind_db/mainnet"
  },
  "Network": {
    "DiscoveryPort": 30303,
    "P2PPort": 30303
  },
  "JsonRpc": {
    "Enabled": true,
    "Port": 8545
  }
}
```

## Best Practices
- Configure appropriate database
- Enable metrics for monitoring
- Use appropriate sync mode
- Secure JSON-RPC endpoints
