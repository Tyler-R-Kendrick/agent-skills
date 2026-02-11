# SSH

## Overview

SSH (Secure Shell) is the standard protocol for secure remote access to servers, containers, and cloud instances. It also handles secure file transfer and network tunneling.

## Key Generation

Generate a new SSH key pair (Ed25519 recommended):

```bash
ssh-keygen -t ed25519 -C "email@example.com"
```

For systems that don't support Ed25519, use RSA 4096 as a fallback:

```bash
ssh-keygen -t rsa -b 4096 -C "email@example.com"
```

### Key Types Comparison

| Key Type | Strength | Speed | Compatibility | Recommendation |
|----------|----------|-------|---------------|----------------|
| Ed25519 | Excellent | Fastest | Modern systems | **Recommended** |
| RSA 4096 | Excellent | Slower | Universal | Fallback |
| ECDSA | Good | Fast | Most systems | Acceptable |
| DSA | Weak | Fast | Legacy only | **Avoid** |

Always protect your private key with a passphrase. This adds a layer of defense if the key file is compromised.

## SSH Config

The SSH config file (`~/.ssh/config`) lets you define shortcuts and defaults for your connections:

```
Host dev
  HostName dev.example.com
  User deploy
  IdentityFile ~/.ssh/id_ed25519
  Port 22

Host prod
  HostName prod.example.com
  User deploy
  ProxyJump bastion

Host bastion
  HostName bastion.example.com
  User admin
```

With this config, `ssh dev` connects to dev.example.com as deploy, and `ssh prod` automatically jumps through the bastion host.

## Common Operations

| Command | Purpose | Example |
|---------|---------|---------|
| `ssh` | Remote shell | `ssh user@host` |
| `scp` | Copy files | `scp file.txt user@host:/path/` |
| `sftp` | Interactive transfer | `sftp user@host` |
| `ssh-copy-id` | Install public key | `ssh-copy-id user@host` |
| `ssh-add` | Add key to agent | `ssh-add ~/.ssh/id_ed25519` |
| `ssh-agent` | Key agent | `eval "$(ssh-agent -s)"` |

## Port Forwarding

### Local Forwarding (-L)

Access a remote service locally. Forward local port 8080 to remote port 80:

```bash
ssh -L 8080:localhost:80 user@remote-host
```

Use case: Access a database or web app running on a remote server as if it were local.

### Remote Forwarding (-R)

Expose a local service remotely. Forward remote port 9090 to local port 3000:

```bash
ssh -R 9090:localhost:3000 user@remote-host
```

Use case: Let a remote server access a service running on your local machine.

### Dynamic Forwarding (-D)

Create a SOCKS proxy through the SSH connection:

```bash
ssh -D 1080 user@remote-host
```

Use case: Route all traffic through the remote host (e.g., browsing as if from the remote network).

## ProxyJump / Jump Hosts

Connect through an intermediate bastion host:

```bash
ssh -J bastion prod
```

Or configure it in `~/.ssh/config`:

```
Host prod
  HostName prod.example.com
  ProxyJump bastion
```

Chain multiple jumps:

```bash
ssh -J bastion1,bastion2 target-host
```

## Agent Forwarding

Agent forwarding (`ssh -A`) lets you use your local SSH keys on a remote server without copying them there. The remote server requests signatures from your local agent.

```bash
ssh -A bastion
# Now on bastion, you can ssh to other hosts using your local keys
ssh prod-server
```

**Risks:** Any user with root access on the remote server can use your forwarded agent to authenticate as you. **Do NOT use agent forwarding on untrusted servers.** Prefer ProxyJump as a safer alternative — it keeps your keys entirely on your local machine.

## File Transfer

### scp Examples

Local to remote:
```bash
scp file.txt user@host:/remote/path/
```

Remote to local:
```bash
scp user@host:/remote/file.txt ./local/path/
```

Remote to remote:
```bash
scp user@host1:/path/file.txt user@host2:/path/
```

### sftp Interactive Commands

```bash
sftp user@host
sftp> ls
sftp> cd /remote/dir
sftp> get remote-file.txt
sftp> put local-file.txt
sftp> exit
```

### rsync over SSH

For incremental transfers (only sends changes):

```bash
rsync -avz -e ssh ./local-dir/ user@host:/remote-dir/
```

## Security Hardening

Key server-side hardening steps in `/etc/ssh/sshd_config`:

```
# Disable password authentication
PasswordAuthentication no

# Disable root login
PermitRootLogin no

# Change default port
Port 2222

# Restrict to specific users
AllowUsers deploy admin
AllowGroups sshusers
```

Additional measures:
- Use **fail2ban** to block brute-force attempts
- Rotate SSH keys periodically and audit `~/.ssh/authorized_keys`
- Use certificate-based authentication for large fleets

## Best Practices

- Use Ed25519 keys — they are shorter, faster, and more secure than RSA
- Always protect private keys with a passphrase
- Use SSH config (`~/.ssh/config`) for convenience and consistency across connections
- Prefer ProxyJump over agent forwarding — it is safer and keeps keys local
- Disable password authentication on all servers
- Rotate SSH keys on a regular schedule and remove unused keys
- Use `ssh-add` to load keys into the agent for the session instead of typing passphrases repeatedly
- Audit `authorized_keys` files regularly to remove stale or unknown keys
