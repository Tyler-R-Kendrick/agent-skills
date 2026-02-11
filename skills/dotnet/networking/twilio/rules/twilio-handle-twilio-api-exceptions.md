---
title: "Handle Twilio API exceptions"
impact: MEDIUM
impactDescription: "general best practice"
tags: twilio, dotnet, networking, sending-sms-and-mms, making-voice-calls, twilio-verify-for-phone-verification
---

## Handle Twilio API exceptions

Handle Twilio API exceptions: by catching `Twilio.Exceptions.ApiException` and inspecting the `Code` and `MoreInfo` properties for actionable error details.
