---
title: "Inject `ITwilioRestClient`"
impact: MEDIUM
impactDescription: "general best practice"
tags: twilio, dotnet, networking, sending-sms-and-mms, making-voice-calls, twilio-verify-for-phone-verification
---

## Inject `ITwilioRestClient`

Inject `ITwilioRestClient`: rather than calling `TwilioClient.Init()` globally, so services are testable and multiple Twilio accounts can coexist in the same application.
