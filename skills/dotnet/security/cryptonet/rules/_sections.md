# CryptoNet Rules

Best practices and rules for CryptoNet.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Use RSA 2048-bit keys minimum | CRITICAL | [`cryptonet-use-rsa-2048-bit-keys-minimum.md`](cryptonet-use-rsa-2048-bit-keys-minimum.md) |
| 2 | Store private keys in a secrets manager | CRITICAL | [`cryptonet-store-private-keys-in-a-secrets-manager.md`](cryptonet-store-private-keys-in-a-secrets-manager.md) |
| 3 | Prefer AES for large payloads | LOW | [`cryptonet-prefer-aes-for-large-payloads.md`](cryptonet-prefer-aes-for-large-payloads.md) |
| 4 | Rotate encryption keys periodically | MEDIUM | [`cryptonet-rotate-encryption-keys-periodically.md`](cryptonet-rotate-encryption-keys-periodically.md) |
| 5 | Use X.509 certificates in enterprise environments | MEDIUM | [`cryptonet-use-x-509-certificates-in-enterprise-environments.md`](cryptonet-use-x-509-certificates-in-enterprise-environments.md) |
| 6 | Wrap CryptoNet behind an interface | CRITICAL | [`cryptonet-wrap-cryptonet-behind-an-interface.md`](cryptonet-wrap-cryptonet-behind-an-interface.md) |
| 7 | Validate decryption results | CRITICAL | [`cryptonet-validate-decryption-results.md`](cryptonet-validate-decryption-results.md) |
| 8 | Use separate key pairs per environment | CRITICAL | [`cryptonet-use-separate-key-pairs-per-environment.md`](cryptonet-use-separate-key-pairs-per-environment.md) |
| 9 | Never log encrypted data alongside keys | CRITICAL | [`cryptonet-never-log-encrypted-data-alongside-keys.md`](cryptonet-never-log-encrypted-data-alongside-keys.md) |
| 10 | Benchmark against native `System.Security.Cryptography` | CRITICAL | [`cryptonet-benchmark-against-native-system-security-cryptography.md`](cryptonet-benchmark-against-native-system-security-cryptography.md) |
