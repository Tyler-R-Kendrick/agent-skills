# Developer Tools

Use when working with fundamental CLI tools and utilities that are essential for software development across all languages and platforms. Covers shells, version control, system package managers, containers, remote access, HTTP clients, data processing, and build runners.

## Structure

| File | Purpose |
|------|---------|
| `SKILL.md` | Agent skill definition (frontmatter + instructions) |
| `metadata.json` | Machine-readable metadata and versioning |
| `AGENTS.md` | Agent-optimized quick reference (generated) |
| `README.md` | This file |
| `rules/` | 6 individual best practice rules |

## Sub-skills

| Skill | Description |
|-------|-------------|
| [`bash/`](bash/) | Use when writing shell scripts or working with Bash, Zsh, or POSIX-compatible shells on macOS and Linux. Covers scriptin... |
| [`curl/`](curl/) | Use when making HTTP requests from the command line for API testing, debugging, and automation. Covers curl, wget, and H... |
| [`docker/`](docker/) | Use when building, running, or managing containers with Docker or Podman. Covers Dockerfiles, multi-stage builds, Docker... |
| [`git/`](git/) | Use when working with Git version control — branching strategies, common workflows, conflict resolution, history manipul... |
| [`jq/`](jq/) | Use when processing JSON or YAML data from the command line. Covers jq for JSON and yq for YAML — filtering, transformin... |
| [`make/`](make/) | Use when automating build, test, and development tasks with language-agnostic task runners. Covers GNU Make, Just, and T... |
| [`package-managers/`](package-managers/) | Use when installing, managing, or automating system-level software with OS package managers. Covers Chocolatey, winget, ... |
| [`powershell-core/`](powershell-core/) | Use when writing PowerShell scripts or automating tasks with PowerShell 7+ (the cross-platform edition). Covers cmdlet p... |
| [`regex/`](regex/) | Use when writing or debugging regular expressions for pattern matching, validation, search, and text transformation. Cov... |
| [`ssh/`](ssh/) | Use when configuring or using SSH for remote access, secure file transfer, tunneling, and key management. Covers ssh, sc... |

## Usage

```bash
npx agentskills add Tyler-R-Kendrick/agent-skills/skills/tools
```

## License

MIT
