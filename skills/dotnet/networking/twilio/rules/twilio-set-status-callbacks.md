---
title: "Set status callbacks"
impact: MEDIUM
impactDescription: "general best practice"
tags: twilio, dotnet, networking, sending-sms-and-mms, making-voice-calls, twilio-verify-for-phone-verification
---

## Set status callbacks

Set status callbacks: on `MessageResource.CreateAsync` via the `statusCallback` parameter to receive delivery receipts and update message status in your database.
