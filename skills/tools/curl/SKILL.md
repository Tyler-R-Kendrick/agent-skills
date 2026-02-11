---
name: curl
description: |
    Use when making HTTP requests from the command line for API testing, debugging, and automation. Covers curl, wget, and HTTPie with common patterns for REST APIs, authentication, file uploads, and response inspection.
    USE FOR: curl, wget, HTTPie, HTTP from CLI, API testing from terminal, REST API debugging, request headers, response inspection, file download, form submission, bearer tokens, basic auth from CLI
    DO NOT USE FOR: API testing frameworks (use testing/api-testing), load testing (use testing/performance-testing), browser automation (use testing/e2e-testing)
license: MIT
metadata:
  displayName: "curl & HTTP Clients"
  author: "Tyler-R-Kendrick"
compatibility: claude, copilot, cursor
references:
  - title: "curl Documentation"
    url: "https://curl.se/docs/"
  - title: "HTTPie Documentation"
    url: "https://httpie.io/docs/cli"
  - title: "GNU Wget Manual"
    url: "https://www.gnu.org/software/wget/manual/"
---

# curl & HTTP Clients

## Overview

curl is the Swiss Army knife for HTTP from the terminal — installed on virtually every Unix system and available on Windows. It's indispensable for testing APIs, debugging requests, and scripting HTTP interactions.

## curl vs wget vs HTTPie

| Feature | curl | wget | HTTPie |
|---------|------|------|--------|
| Primary use | Flexible HTTP client | File download | Human-friendly HTTP |
| Protocols | HTTP/S, FTP, SCP, SSH, SMTP, etc. | HTTP/S + FTP | HTTP/S only |
| Output | stdout by default | File by default | Formatted + colored |
| JSON | Manual `-H` + `-d` | Not built-in | Native with `:=` syntax |
| Install | Pre-installed on most systems | Pre-installed on most Linux | `pip install httpie` |

## curl Essentials

### GET

```bash
curl https://api.example.com/users
```

### GET with headers

```bash
curl -H "Authorization: Bearer TOKEN" https://api.example.com/users
```

### POST JSON

```bash
curl -X POST -H "Content-Type: application/json" \
  -d '{"name":"Alice"}' https://api.example.com/users
```

### PUT

```bash
curl -X PUT -H "Content-Type: application/json" \
  -d '{"name":"Bob"}' https://api.example.com/users/1
```

### DELETE

```bash
curl -X DELETE https://api.example.com/users/1
```

### Show response headers

```bash
curl -i https://api.example.com/users      # Headers + body
curl -I https://api.example.com/users      # HEAD only (headers only)
```

### Follow redirects

```bash
curl -L https://api.example.com/old-endpoint
```

### Verbose output

```bash
curl -v https://api.example.com/users
```

### Save to file

```bash
curl -o file.json https://api.example.com/users       # Custom filename
curl -O https://example.com/report.pdf                 # Use remote filename
```

### Basic auth

```bash
curl -u user:password https://api.example.com/admin
```

### Form upload

```bash
curl -F "file=@photo.jpg" https://api.example.com/upload
```

### Timeout

```bash
curl --connect-timeout 5 --max-time 30 https://api.example.com/slow-endpoint
```

### Silent mode (for scripting)

```bash
curl -s https://api.example.com/users | jq .
```

## HTTPie

HTTPie provides the same capabilities with a more readable syntax:

### GET

```bash
http GET api.example.com/users
```

### POST JSON

```bash
http POST api.example.com/users name=Alice email=alice@example.com
```

### Bearer auth

```bash
http GET api.example.com/users "Authorization:Bearer TOKEN"
```

### Form upload

```bash
http -f POST api.example.com/upload file@photo.jpg
```

## Common Patterns

### Piping to jq

```bash
curl -s https://api.example.com/users | jq '.[].name'
```

### Testing response codes

```bash
curl -s -o /dev/null -w "%{http_code}" https://api.example.com/health
```

### Downloading files with progress

```bash
curl -# -O https://example.com/file.zip
```

### Sending data from file

```bash
curl -d @data.json -H "Content-Type: application/json" https://api.example.com/import
```

### Cookie handling

```bash
curl -c cookies.txt -b cookies.txt https://example.com/login
```

## wget

wget excels at file downloading where curl excels at HTTP flexibility.

### Recursive download

```bash
wget -r https://example.com/docs/
```

### Mirror a site

```bash
wget --mirror --convert-links --adjust-extension --page-requisites https://example.com
```

### Resume broken downloads

```bash
wget -c https://example.com/large-file.iso
```

### When to prefer wget over curl

- Downloading large files (automatic retry, resume support)
- Mirroring or recursive download of websites
- Downloading when you want file output by default
- Situations where simplicity of `wget URL` is sufficient

## Best Practices

- Use `-s` and pipe to `jq` for scripted API calls — avoid parsing raw output with grep
- Always set timeouts (`--connect-timeout` and `--max-time`) in scripts to prevent hanging
- Use HTTPie for interactive API exploration — its colored, formatted output is easier to read
- Prefer curl for scripting and CI — it is more universally available and predictable
- Use `-w` format strings for response inspection in scripts (status codes, timing, sizes)
- Store auth tokens in environment variables, not directly on the command line (avoid shell history exposure)
