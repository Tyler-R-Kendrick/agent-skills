# Nethermind

## Overview

Nethermind is a high-performance Ethereum execution client written entirely in C#/.NET. It supports running full nodes, archive nodes, and validator nodes for Ethereum mainnet and testnets, as well as various EVM-compatible chains (Gnosis Chain, Optimism, etc.). Nethermind provides a JSON-RPC API for blockchain interaction and a plugin system for extending functionality.

Beyond the node itself, Nethermind offers .NET libraries for Ethereum interaction including ABI encoding, RLP serialization, transaction signing, and JSON-RPC client utilities. This makes it the primary choice for .NET developers building Ethereum-connected applications.

Running Nethermind:
```
dotnet tool install -g Nethermind.Runner
nethermind --config mainnet
```

For .NET SDK integration:
```
dotnet add package Nethermind.Core
dotnet add package Nethermind.JsonRpc
dotnet add package Nethereum.Web3
```

## Interacting with Ethereum via JSON-RPC

Use Nethereum (the .NET Ethereum integration library commonly paired with Nethermind nodes) to interact with Ethereum nodes via JSON-RPC.

```csharp
using System;
using System.Numerics;
using System.Threading.Tasks;
using Nethereum.Web3;
using Nethereum.Hex.HexTypes;
using Nethereum.Util;

// Connect to a Nethermind node
var web3 = new Web3("http://localhost:8545");

// Get the latest block number
var blockNumber = await web3.Eth.Blocks.GetBlockNumber.SendRequestAsync();
Console.WriteLine($"Latest block: {blockNumber.Value}");

// Get account balance
var balance = await web3.Eth.GetBalance.SendRequestAsync("0x742d35Cc6634C0532925a3b844Bc9e7595f2bD05");
var etherBalance = Web3.Convert.FromWei(balance.Value);
Console.WriteLine($"Balance: {etherBalance} ETH");

// Get block details
var block = await web3.Eth.Blocks.GetBlockWithTransactionsByNumber
    .SendRequestAsync(new HexBigInteger(blockNumber));
Console.WriteLine($"Block hash: {block.BlockHash}");
Console.WriteLine($"Transactions: {block.Transactions.Length}");
Console.WriteLine($"Gas used: {block.GasUsed.Value}");
Console.WriteLine($"Timestamp: {DateTimeOffset.FromUnixTimeSeconds((long)block.Timestamp.Value)}");
```

## Sending Transactions

Sign and send Ether transfers and contract interactions.

```csharp
using System.Threading.Tasks;
using Nethereum.Web3;
using Nethereum.Web3.Accounts;

// Create an account from a private key (use secure key management in production)
var privateKey = "0xYOUR_PRIVATE_KEY_HERE";
var account = new Account(privateKey, chainId: 1);
var web3 = new Web3(account, "http://localhost:8545");

// Send Ether
var transaction = await web3.Eth.GetEtherTransferService()
    .TransferEtherAndWaitForReceiptAsync(
        toAddress: "0xRecipientAddress",
        etherAmount: 0.1m,
        gasPriceGwei: 20m);

Console.WriteLine($"TX Hash: {transaction.TransactionHash}");
Console.WriteLine($"Status: {(transaction.Succeeded() ? "Success" : "Failed")}");
Console.WriteLine($"Gas used: {transaction.GasUsed.Value}");
Console.WriteLine($"Block: {transaction.BlockNumber.Value}");
```

## Smart Contract Interaction

Call smart contract functions and decode return values.

```csharp
using System.Numerics;
using System.Threading.Tasks;
using Nethereum.ABI.FunctionEncoding.Attributes;
using Nethereum.Contracts;
using Nethereum.Web3;

// Define contract function DTOs
[Function("balanceOf", "uint256")]
public class BalanceOfFunction : FunctionMessage
{
    [Parameter("address", "account", 1)]
    public string Account { get; set; } = string.Empty;
}

[Function("transfer", "bool")]
public class TransferFunction : FunctionMessage
{
    [Parameter("address", "to", 1)]
    public string To { get; set; } = string.Empty;

    [Parameter("uint256", "amount", 2)]
    public BigInteger Amount { get; set; }
}

[Event("Transfer")]
public class TransferEventDTO : IEventDTO
{
    [Parameter("address", "from", 1, true)]
    public string From { get; set; } = string.Empty;

    [Parameter("address", "to", 2, true)]
    public string To { get; set; } = string.Empty;

    [Parameter("uint256", "value", 3)]
    public BigInteger Value { get; set; }
}

// Query ERC-20 token balance
var web3 = new Web3("http://localhost:8545");
var contractAddress = "0xTokenContractAddress";

var balanceHandler = web3.Eth.GetContractQueryHandler<BalanceOfFunction>();
var balance = await balanceHandler.QueryAsync<BigInteger>(
    contractAddress,
    new BalanceOfFunction { Account = "0xHolderAddress" });

Console.WriteLine($"Token balance: {Web3.Convert.FromWei(balance)}");
```

## Nethermind Node Configuration

Configure a Nethermind node for different scenarios using JSON configuration.

```csharp
// Programmatic configuration for embedded scenarios
using System.Collections.Generic;

public class NethermindConfig
{
    public static Dictionary<string, object> CreateArchiveNodeConfig()
    {
        return new Dictionary<string, object>
        {
            ["Init.ChainSpecPath"] = "chainspec/mainnet.json",
            ["Init.BaseDbPath"] = "nethermind_db/mainnet",
            ["Init.EnableUnsecuredDevWallet"] = false,
            ["Sync.FastSync"] = false, // archive mode
            ["Sync.DownloadBodiesInFastSync"] = true,
            ["Sync.DownloadReceiptsInFastSync"] = true,
            ["JsonRpc.Enabled"] = true,
            ["JsonRpc.Host"] = "127.0.0.1",
            ["JsonRpc.Port"] = 8545,
            ["JsonRpc.EnabledModules"] = new[] { "eth", "net", "web3", "trace", "debug" },
            ["Network.DiscoveryPort"] = 30303,
            ["Network.P2PPort"] = 30303,
            ["Metrics.Enabled"] = true,
            ["Metrics.ExposePort"] = 9090,
            ["HealthChecks.Enabled"] = true
        };
    }
}
```

## Listening for Events

Subscribe to smart contract events and process them in real-time.

```csharp
using System;
using System.Threading;
using System.Threading.Tasks;
using Nethereum.Web3;
using Nethereum.Contracts;
using Nethereum.RPC.Eth.DTOs;

public class TransferEventListener
{
    private readonly Web3 _web3;
    private readonly string _contractAddress;

    public TransferEventListener(string rpcUrl, string contractAddress)
    {
        _web3 = new Web3(rpcUrl);
        _contractAddress = contractAddress;
    }

    public async Task ListenAsync(CancellationToken token)
    {
        var transferEvent = _web3.Eth.GetEvent<TransferEventDTO>(_contractAddress);
        var fromBlock = await _web3.Eth.Blocks.GetBlockNumber.SendRequestAsync();

        while (!token.IsCancellationRequested)
        {
            var filter = transferEvent.CreateFilterInput(
                new BlockParameter(fromBlock),
                BlockParameter.CreateLatest());

            var events = await transferEvent.GetAllChangesAsync(filter);

            foreach (var evt in events)
            {
                Console.WriteLine(
                    $"Transfer: {evt.Event.From} -> {evt.Event.To}, " +
                    $"Amount: {Web3.Convert.FromWei(evt.Event.Value)} tokens");
            }

            fromBlock = await _web3.Eth.Blocks.GetBlockNumber.SendRequestAsync();
            await Task.Delay(TimeSpan.FromSeconds(12), token); // ~1 block time
        }
    }
}
```

## Deployment Modes Comparison

| Mode | Storage | Sync Time | RPC Capabilities | Use Case |
|------|---------|-----------|-----------------|----------|
| Full (snap sync) | ~500 GB | Hours | Current state queries | Standard node |
| Archive | ~15 TB | Days | Historical state, traces | Block explorers, analytics |
| Light | Minimal | Minutes | Limited queries | Mobile, lightweight |
| Validator | ~500 GB | Hours | Consensus duties | Staking |

## Best Practices

1. **Run your own Nethermind node** for production applications instead of relying on third-party RPC providers to avoid rate limits, downtime, and data trust issues.
2. **Use snap sync mode** for full nodes unless you specifically need historical state queries that require archive mode.
3. **Secure the JSON-RPC endpoint** by binding to `127.0.0.1` (not `0.0.0.0`), using authentication, and placing it behind a reverse proxy with rate limiting.
4. **Use strongly-typed contract DTOs** with `[Function]` and `[Event]` attributes from Nethereum rather than raw ABI encoding to catch type errors at compile time.
5. **Handle chain reorganizations** in event listeners by tracking confirmed blocks and re-processing events when the canonical chain changes.
6. **Enable Prometheus metrics** via `Metrics.Enabled = true` and scrape them with Grafana for monitoring node health, sync status, and peer count.
7. **Use `WaitForReceiptAsync`** after sending transactions to confirm inclusion and check the status field, since transactions can be mined but revert at the EVM level.
8. **Store private keys in secure key vaults** (Azure Key Vault, AWS KMS) rather than in configuration files or environment variables.
9. **Configure appropriate gas estimation** by calling `EstimateGasAsync` before sending transactions and adding a buffer (10-20%) to avoid out-of-gas failures.
10. **Use the health check endpoint** (`HealthChecks.Enabled = true`) to integrate Nethermind node status into your application's health monitoring system.
