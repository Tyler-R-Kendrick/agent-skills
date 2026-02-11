# CryptoNet

## Overview
CryptoNet is a .NET library providing simplified cryptographic operations for encryption, hashing, and signatures.

## Example
```csharp
using CryptoNet;

// Symmetric encryption
var crypto = new SymmetricCrypto();
var encrypted = crypto.Encrypt("sensitive data", "password");
var decrypted = crypto.Decrypt(encrypted, "password");

// Hashing
var hash = HashHelper.ComputeSha256Hash("data");

// Asymmetric encryption
var asymmetric = new AsymmetricCrypto();
var (publicKey, privateKey) = asymmetric.GenerateKeyPair();
var encryptedData = asymmetric.Encrypt(data, publicKey);
var decryptedData = asymmetric.Decrypt(encryptedData, privateKey);
```

## Best Practices
- Use strong encryption algorithms
- Store keys securely
- Never hardcode passwords
- Use asymmetric encryption for key exchange
- Validate decryption results
