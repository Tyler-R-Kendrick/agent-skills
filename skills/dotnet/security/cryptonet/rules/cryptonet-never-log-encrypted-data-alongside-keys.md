---
title: "Never log encrypted data alongside keys"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: cryptonet, dotnet, security, rsa-encryptiondecryption, symmetric-aes-encryption, x509-certificate-based-crypto
---

## Never log encrypted data alongside keys

Never log encrypted data alongside keys: ensure logging middleware does not capture both the ciphertext and the decryption key in the same log entry.
