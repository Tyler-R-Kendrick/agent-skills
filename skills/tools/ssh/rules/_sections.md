# SSH Rules

Best practices and rules for SSH.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Use Ed25519 keys | MEDIUM | [`ssh-use-ed25519-keys.md`](ssh-use-ed25519-keys.md) |
| 2 | Always protect private keys with a passphrase | CRITICAL | [`ssh-always-protect-private-keys-with-a-passphrase.md`](ssh-always-protect-private-keys-with-a-passphrase.md) |
| 3 | Use SSH config (`~/ | MEDIUM | [`ssh-use-ssh-config.md`](ssh-use-ssh-config.md) |
| 4 | Prefer ProxyJump over agent forwarding | LOW | [`ssh-prefer-proxyjump-over-agent-forwarding.md`](ssh-prefer-proxyjump-over-agent-forwarding.md) |
| 5 | Disable password authentication on all servers | MEDIUM | [`ssh-disable-password-authentication-on-all-servers.md`](ssh-disable-password-authentication-on-all-servers.md) |
| 6 | Rotate SSH keys on a regular schedule and remove unused keys | MEDIUM | [`ssh-rotate-ssh-keys-on-a-regular-schedule-and-remove-unused-keys.md`](ssh-rotate-ssh-keys-on-a-regular-schedule-and-remove-unused-keys.md) |
| 7 | Use `ssh-add` to load keys into the agent for the session... | MEDIUM | [`ssh-use-ssh-add-to-load-keys-into-the-agent-for-the-session.md`](ssh-use-ssh-add-to-load-keys-into-the-agent-for-the-session.md) |
| 8 | Audit `authorized_keys` files regularly to remove stale or... | MEDIUM | [`ssh-audit-authorized-keys-files-regularly-to-remove-stale-or.md`](ssh-audit-authorized-keys-files-regularly-to-remove-stale-or.md) |
