---
title: "Validate decryption results"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: cryptonet, dotnet, security, rsa-encryptiondecryption, symmetric-aes-encryption, x509-certificate-based-crypto
---

## Validate decryption results

Validate decryption results: always handle `CryptographicException` during decryption to detect tampered or corrupted ciphertext instead of returning garbage data.
