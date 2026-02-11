# CryptoNet

## Overview

CryptoNet is a simple, developer-friendly .NET cryptography library that wraps the complexity of RSA and AES encryption into a clean API. It supports asymmetric encryption using RSA key pairs, symmetric encryption using AES, and certificate-based encryption using X.509 certificates. CryptoNet is particularly useful when you need to encrypt configuration values, protect data at rest, or implement envelope encryption patterns without wrestling directly with `System.Security.Cryptography` primitives.

## RSA Asymmetric Encryption

Generate RSA key pairs and use them for asymmetric encrypt/decrypt operations.

```csharp
using System.Text;
using CryptoNetLib;

// Generate an RSA key pair
var cryptoNet = new CryptoNet(CryptoNetUtils.GenerateRsaKeyPair(2048));

// Export keys for storage
string publicKey = cryptoNet.ExportPublicKey();
string privateKey = cryptoNet.ExportPrivateKey();

// Encrypt with the public key
var encryptor = new CryptoNet(publicKey);
byte[] plainBytes = Encoding.UTF8.GetBytes("Sensitive account data");
byte[] encryptedBytes = encryptor.EncryptFromBytes(plainBytes);
string encryptedBase64 = Convert.ToBase64String(encryptedBytes);

// Decrypt with the private key
var decryptor = new CryptoNet(privateKey);
byte[] decryptedBytes = decryptor.DecryptToBytes(encryptedBytes);
string decryptedText = Encoding.UTF8.GetString(decryptedBytes);
```

## Symmetric AES Encryption

Use a shared symmetric key for faster encryption of larger payloads.

```csharp
using System.Text;
using CryptoNetLib;

// Create a symmetric key (store this securely)
string symmetricKey = CryptoNetUtils.GenerateSymmetricKey();

// Encrypt
var encryptor = new CryptoNet(symmetricKey, true);
byte[] plainBytes = Encoding.UTF8.GetBytes("Large payload to encrypt");
byte[] encrypted = encryptor.EncryptFromBytes(plainBytes);

// Decrypt
var decryptor = new CryptoNet(symmetricKey, true);
byte[] decrypted = decryptor.DecryptToBytes(encrypted);
string original = Encoding.UTF8.GetString(decrypted);
```

## X.509 Certificate-Based Encryption

Use existing X.509 certificates for encryption, useful in enterprise environments.

```csharp
using System.Security.Cryptography.X509Certificates;
using CryptoNetLib;

// Load certificate from file
var certificate = new X509Certificate2("mycert.pfx", "certPassword");

// Encrypt using the certificate's public key
var encryptor = new CryptoNet(certificate);
byte[] encrypted = encryptor.EncryptFromBytes(
    System.Text.Encoding.UTF8.GetBytes("Secret message"));

// Decrypt using the certificate's private key
var decryptor = new CryptoNet(certificate);
byte[] decrypted = decryptor.DecryptToBytes(encrypted);
```

## Self-Signed Certificate Generation

Generate self-signed certificates for development and testing scenarios.

```csharp
using System.Security.Cryptography;
using System.Security.Cryptography.X509Certificates;
using CryptoNetLib;

// Generate a self-signed certificate
var rsaKey = RSA.Create(2048);
var request = new CertificateRequest(
    "CN=MyApp Dev Certificate",
    rsaKey,
    HashAlgorithmName.SHA256,
    RSASignaturePadding.Pkcs1);

request.CertificateExtensions.Add(
    new X509KeyUsageExtension(
        X509KeyUsageFlags.DataEncipherment
        | X509KeyUsageFlags.KeyEncipherment
        | X509KeyUsageFlags.DigitalSignature,
        critical: false));

X509Certificate2 cert = request.CreateSelfSigned(
    DateTimeOffset.UtcNow,
    DateTimeOffset.UtcNow.AddYears(1));

// Use with CryptoNet
var cryptoNet = new CryptoNet(cert);
byte[] encrypted = cryptoNet.EncryptFromBytes(
    System.Text.Encoding.UTF8.GetBytes("Protected data"));
```

## Encryption Service Pattern

Wrap CryptoNet in a service for dependency injection.

```csharp
using CryptoNetLib;

public interface IEncryptionService
{
    string Encrypt(string plainText);
    string Decrypt(string cipherTextBase64);
}

public sealed class RsaEncryptionService : IEncryptionService
{
    private readonly string _publicKey;
    private readonly string _privateKey;

    public RsaEncryptionService(string publicKey, string privateKey)
    {
        _publicKey = publicKey;
        _privateKey = privateKey;
    }

    public string Encrypt(string plainText)
    {
        var encryptor = new CryptoNet(_publicKey);
        byte[] encrypted = encryptor.EncryptFromBytes(
            System.Text.Encoding.UTF8.GetBytes(plainText));
        return Convert.ToBase64String(encrypted);
    }

    public string Decrypt(string cipherTextBase64)
    {
        var decryptor = new CryptoNet(_privateKey);
        byte[] decrypted = decryptor.DecryptToBytes(
            Convert.FromBase64String(cipherTextBase64));
        return System.Text.Encoding.UTF8.GetString(decrypted);
    }
}

// Registration
builder.Services.AddSingleton<IEncryptionService>(sp =>
{
    var config = sp.GetRequiredService<IConfiguration>();
    return new RsaEncryptionService(
        config["Crypto:PublicKey"]!,
        config["Crypto:PrivateKey"]!);
});
```

## Algorithm Comparison

| Feature | RSA (Asymmetric) | AES (Symmetric) | X.509 Certificate |
|---------|-----------------|-----------------|-------------------|
| Key management | Public/private pair | Single shared key | Certificate store |
| Performance | Slower, small payloads | Fast, large payloads | Slower, certificate overhead |
| Max data size | ~214 bytes (2048-bit) | Unlimited (stream) | Same as RSA |
| Use case | Key exchange, signatures | Bulk data encryption | Enterprise, mutual TLS |
| Key distribution | Public key is safe to share | Key must be secret | PKI infrastructure |

## Best Practices

1. **Use RSA 2048-bit keys minimum**: always call `GenerateRsaKeyPair(2048)` or higher; 1024-bit keys are considered insecure and should never be used in production.
2. **Store private keys in a secrets manager**: use Azure Key Vault, AWS Secrets Manager, or `dotnet user-secrets` for development; never embed private keys in source code or `appsettings.json`.
3. **Prefer AES for large payloads**: RSA can only encrypt data smaller than its key size; use envelope encryption (AES for data, RSA for the AES key) for anything larger than 200 bytes.
4. **Rotate encryption keys periodically**: implement key versioning so you can decrypt data encrypted with old keys while encrypting new data with current keys.
5. **Use X.509 certificates in enterprise environments**: leverage existing PKI infrastructure and certificate stores rather than managing raw RSA keys manually.
6. **Wrap CryptoNet behind an interface**: create an `IEncryptionService` for dependency injection to keep business logic decoupled from the specific crypto library.
7. **Validate decryption results**: always handle `CryptographicException` during decryption to detect tampered or corrupted ciphertext instead of returning garbage data.
8. **Use separate key pairs per environment**: development, staging, and production should each have their own RSA keys to prevent cross-environment data leaks.
9. **Never log encrypted data alongside keys**: ensure logging middleware does not capture both the ciphertext and the decryption key in the same log entry.
10. **Benchmark against native `System.Security.Cryptography`**: for high-throughput scenarios, compare CryptoNet performance with direct .NET crypto APIs to ensure the abstraction overhead is acceptable.
