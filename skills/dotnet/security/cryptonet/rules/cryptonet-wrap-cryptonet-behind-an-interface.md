---
title: "Wrap CryptoNet behind an interface"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: cryptonet, dotnet, security, rsa-encryptiondecryption, symmetric-aes-encryption, x509-certificate-based-crypto
---

## Wrap CryptoNet behind an interface

Wrap CryptoNet behind an interface: create an `IEncryptionService` for dependency injection to keep business logic decoupled from the specific crypto library.
