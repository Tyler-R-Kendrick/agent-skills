# Message Construction Rules

Best practices and rules for Message Construction.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Give every message a unique `messageId` -- it is the... | MEDIUM | [`message-construction-give-every-message-a-unique-messageid-it-is-the.md`](message-construction-give-every-message-a-unique-messageid-it-is-the.md) |
| 2 | Prefer Event Messages for cross-service communication; they... | LOW | [`message-construction-prefer-event-messages-for-cross-service-communication-they.md`](message-construction-prefer-event-messages-for-cross-service-communication-they.md) |
| 3 | Use Command Messages only when you intend exactly one... | MEDIUM | [`message-construction-use-command-messages-only-when-you-intend-exactly-one.md`](message-construction-use-command-messages-only-when-you-intend-exactly-one.md) |
| 4 | Always include a `correlationId` in replies so requestors... | CRITICAL | [`message-construction-always-include-a-correlationid-in-replies-so-requestors.md`](message-construction-always-include-a-correlationid-in-replies-so-requestors.md) |
| 5 | Set `expiration` on time-sensitive messages rather than... | MEDIUM | [`message-construction-set-expiration-on-time-sensitive-messages-rather-than.md`](message-construction-set-expiration-on-time-sensitive-messages-rather-than.md) |
| 6 | Version your message schemas from day one using Format... | MEDIUM | [`message-construction-version-your-message-schemas-from-day-one-using-format.md`](message-construction-version-your-message-schemas-from-day-one-using-format.md) |
| 7 | Keep message bodies lean -- carry references (IDs, URIs)... | MEDIUM | [`message-construction-keep-message-bodies-lean-carry-references-ids-uris.md`](message-construction-keep-message-bodies-lean-carry-references-ids-uris.md) |
| 8 | Include `timestamp` and `source` in every message for... | MEDIUM | [`message-construction-include-timestamp-and-source-in-every-message-for.md`](message-construction-include-timestamp-and-source-in-every-message-for.md) |
