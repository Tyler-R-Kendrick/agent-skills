---
title: "Store `AccountSid` and `AuthToken` in secure configuration"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: twilio, dotnet, networking, sending-sms-and-mms, making-voice-calls, twilio-verify-for-phone-verification
---

## Store `AccountSid` and `AuthToken` in secure configuration

(environment variables, Azure Key Vault, or user secrets) and inject via the options pattern; never hard-code credentials.
