---
name: package-managers
description: |
    Use when installing, managing, or automating system-level software with OS package managers. Covers Chocolatey, winget, Homebrew, apt, dnf, pacman, snap, Flatpak, and Scoop — the non-language-specific package managers for installing developer tools and system dependencies.
    USE FOR: Chocolatey, choco, winget, Homebrew, brew, apt, apt-get, dnf, yum, pacman, snap, Flatpak, Scoop, system package management, developer environment setup, automated provisioning
    DO NOT USE FOR: language-specific package managers (npm, pip, cargo, NuGet, Maven — use language-specific skills), container image management (use docker), application deployment
license: MIT
metadata:
  displayName: "Package Managers"
  author: "Tyler-R-Kendrick"
compatibility: claude, copilot, cursor
---

# Package Managers

## Overview

System-level package managers install the tools developers need before they can write code — compilers, runtimes, CLIs, databases, editors, and utilities. Choosing the right one depends on your OS. Unlike language-specific package managers (npm, pip, cargo), these operate at the system level and manage binaries, libraries, and applications across your entire machine.

## Package Manager Landscape

| Manager    | Platform         | Type                 | Package Count (approx) | Key Strength                          |
|------------|------------------|----------------------|------------------------|---------------------------------------|
| Chocolatey | Windows          | Community + Commercial | 10,000+              | Windows ecosystem standard            |
| winget     | Windows 10/11    | Microsoft-maintained | 5,000+                 | Built into Windows                    |
| Scoop      | Windows          | Community            | 3,000+                 | Portable installs, no admin needed    |
| Homebrew   | macOS + Linux    | Community            | 8,000+ formulae        | macOS standard                        |
| apt        | Debian/Ubuntu    | Official             | 60,000+                | Largest Linux ecosystem               |
| dnf        | Fedora/RHEL      | Official             | 50,000+                | RPM ecosystem                         |
| pacman     | Arch             | Official             | 13,000+                | Bleeding-edge packages                |
| snap       | Ubuntu/cross-Linux | Canonical          | 7,000+                 | Sandboxed, auto-updating apps         |
| Flatpak    | Cross-Linux      | freedesktop.org      | 2,000+                 | Sandboxed desktop apps                |

---

## Windows

### Chocolatey

Chocolatey is the most established Windows package manager with the largest repository of Windows-specific packages.

**Installation:**

```powershell
Set-ExecutionPolicy Bypass -Scope Process -Force
[System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```

**Common Commands:**

```powershell
# Install packages (-y auto-confirms prompts)
choco install git nodejs python3 vscode docker-desktop -y

# Upgrade a package
choco upgrade nodejs -y

# Upgrade all packages
choco upgrade all -y

# List installed packages
choco list

# Uninstall a package
choco uninstall nodejs -y

# Search for packages
choco search terraform
```

**Pinning Versions:**

```powershell
# Install a specific version
choco install nodejs --version=20.11.0 -y

# Pin a package to prevent upgrades
choco pin add -n=nodejs

# Unpin a package
choco pin remove -n=nodejs
```

**packages.config for Reproducible Setups:**

Create a `packages.config` file for team-consistent environments:

```xml
<?xml version="1.0" encoding="utf-8"?>
<packages>
  <package id="git" />
  <package id="nodejs" version="20.11.0" />
  <package id="python3" />
  <package id="vscode" />
  <package id="docker-desktop" />
  <package id="terraform" version="1.7.0" />
</packages>
```

```powershell
# Install all packages from config
choco install packages.config -y
```

### winget

winget is Microsoft's official package manager, built into Windows 10 (1709+) and Windows 11.

**Common Commands:**

```powershell
# Install packages
winget install Git.Git
winget install Microsoft.VisualStudioCode
winget install Docker.DockerDesktop

# Upgrade a package
winget upgrade Git.Git

# Upgrade all packages
winget upgrade --all

# List installed packages
winget list

# Search for packages
winget search python

# Show package details
winget show Python.Python.3.12
```

**Machine Setup with Export/Import:**

```powershell
# Export installed packages to JSON
winget export -o packages.json

# Import and install on a new machine
winget import -i packages.json --accept-package-agreements --accept-source-agreements
```

### Scoop

Scoop installs programs to your user directory by default — no admin rights needed, no PATH pollution, easy cleanup.

**Installation:**

```powershell
irm get.scoop.sh | iex
```

**Buckets (Repositories):**

```powershell
# Add additional buckets
scoop bucket add extras    # GUI apps, developer tools
scoop bucket add versions  # Alternative versions of packages
scoop bucket add java      # JDKs and JREs

# List known buckets
scoop bucket known
```

**Common Commands:**

```powershell
# Install packages
scoop install git python nodejs

# Update scoop and all packages
scoop update *

# List installed packages
scoop list

# Uninstall a package
scoop uninstall nodejs

# Search for packages
scoop search terraform
```

**Why Scoop:**
- No administrator privileges required
- No PATH pollution (uses shims)
- Easy cleanup: `scoop cleanup *`
- Portable — all installs go to `~/scoop`
- Simple uninstall leaves no registry entries behind

---

## macOS

### Homebrew

Homebrew is the de facto standard package manager for macOS and also works on Linux.

**Installation:**

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

**Formulae vs Casks:**
- **Formulae** — command-line tools and libraries (`brew install git`)
- **Casks** — GUI applications (`brew install --cask visual-studio-code`)

**Common Commands:**

```bash
# Install CLI tools and GUI apps
brew install git node python docker
brew install --cask visual-studio-code iterm2 firefox

# Update Homebrew and all formulae definitions
brew update

# Upgrade installed packages
brew upgrade

# List installed packages
brew list

# Search for packages
brew search terraform

# Show package info
brew info node

# Remove old versions
brew cleanup

# Check for issues
brew doctor
```

**Taps (Third-Party Repositories):**

```bash
# Add a tap
brew tap hashicorp/tap
brew install hashicorp/tap/terraform

# List taps
brew tap
```

**Brewfile for Reproducible Setups:**

```ruby
# Brewfile
tap "hashicorp/tap"

brew "git"
brew "node"
brew "python"
brew "docker"
brew "jq"
brew "terraform"

cask "visual-studio-code"
cask "iterm2"
cask "docker"
```

```bash
# Generate Brewfile from currently installed packages
brew bundle dump

# Install everything from Brewfile
brew bundle install

# Check what would be installed
brew bundle check
```

---

## Linux

### apt (Debian/Ubuntu)

apt is the standard package manager for Debian-based distributions including Ubuntu, Linux Mint, and Pop!_OS.

```bash
# Update package index (always do this first)
sudo apt update

# Install packages
sudo apt install git nodejs python3 curl wget -y

# Upgrade all installed packages
sudo apt upgrade -y

# Full distribution upgrade
sudo apt full-upgrade -y

# Remove a package
sudo apt remove nodejs

# Remove a package and its config files
sudo apt purge nodejs

# Search for packages
apt search terraform

# Show package info
apt show nodejs

# Clean up unused packages
sudo apt autoremove -y
```

**Adding PPAs (Personal Package Archives):**

```bash
# Add a PPA for newer package versions
sudo add-apt-repository ppa:deadsnakes/ppa
sudo apt update
sudo apt install python3.12
```

**Pinning Packages:**

```bash
# Hold a package at its current version
sudo apt-mark hold nodejs

# Unhold a package
sudo apt-mark unhold nodejs

# List held packages
apt-mark showhold
```

### dnf (Fedora/RHEL)

dnf is the package manager for Fedora, RHEL 8+, CentOS Stream, and Rocky Linux.

```bash
# Install packages
sudo dnf install git nodejs python3 -y

# Upgrade all packages
sudo dnf upgrade -y

# Search for packages
dnf search terraform

# Remove a package
sudo dnf remove nodejs

# Show package info
dnf info nodejs

# List installed packages
dnf list installed

# Clean cache
sudo dnf clean all
```

**Enabling Repositories:**

```bash
# Enable EPEL (Extra Packages for Enterprise Linux)
sudo dnf install epel-release -y

# Enable a specific repo
sudo dnf config-manager --set-enabled crb

# List repos
dnf repolist
```

### pacman (Arch)

pacman is the package manager for Arch Linux and its derivatives (Manjaro, EndeavourOS).

```bash
# Sync database and install a package
sudo pacman -S git nodejs python

# Full system upgrade
sudo pacman -Syu

# Search for packages
pacman -Ss terraform

# Remove a package
sudo pacman -R nodejs

# Remove a package and its unused dependencies
sudo pacman -Rs nodejs

# List installed packages
pacman -Q

# Show package info
pacman -Si nodejs
```

**AUR Helpers (yay, paru):**

The Arch User Repository (AUR) contains community-maintained packages not in the official repos.

```bash
# Install yay (AUR helper)
sudo pacman -S --needed git base-devel
git clone https://aur.archlinux.org/yay.git
cd yay && makepkg -si

# Use yay like pacman (searches AUR too)
yay -S visual-studio-code-bin
yay -Syu  # upgrade everything including AUR packages

# paru is another popular AUR helper
```

### snap

snap is a universal package format developed by Canonical, primarily used on Ubuntu but available on most Linux distributions.

```bash
# Install a snap
sudo snap install code --classic
sudo snap install firefox

# Refresh (update) snaps
sudo snap refresh

# List installed snaps
snap list

# Remove a snap
sudo snap remove firefox

# Show snap info
snap info code
```

**Confinement Levels:**
- **strict** — fully sandboxed, limited system access (default)
- **classic** — full system access, like traditional packages (e.g., IDEs, compilers)
- **devmode** — developer mode, warnings instead of denials

**When to Use snap vs apt:**
- Use snap for: sandboxed applications, apps that need auto-updates, cross-distro installs
- Use apt for: system libraries, CLI tools, packages that need deep system integration

---

## Reproducible Environment Setup

### Shell Script Bootstrap

Create a bootstrap script that detects the OS and installs packages accordingly:

```bash
#!/usr/bin/env bash
set -euo pipefail

install_macos() {
    command -v brew &>/dev/null || /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    brew bundle install --file=Brewfile
}

install_ubuntu() {
    sudo apt update
    sudo apt install -y git curl wget build-essential
    # Add more packages as needed
}

install_fedora() {
    sudo dnf install -y git curl wget
}

case "$(uname -s)" in
    Darwin) install_macos ;;
    Linux)
        if command -v apt &>/dev/null; then install_ubuntu
        elif command -v dnf &>/dev/null; then install_fedora
        fi
        ;;
esac
```

### Export/Import Features

| Manager    | Export Command                  | Import Command                    |
|------------|--------------------------------|-----------------------------------|
| Chocolatey | (use packages.config manually) | `choco install packages.config`   |
| winget     | `winget export -o pkgs.json`   | `winget import -i pkgs.json`      |
| Homebrew   | `brew bundle dump`             | `brew bundle install`             |
| apt        | `dpkg --get-selections`        | `dpkg --set-selections && apt dselect-upgrade` |

---

## Best Practices

1. **Automate your dev setup** — Script your environment setup so you can rebuild your machine in minutes, not hours.
2. **Pin critical tool versions** — Use version pinning for tools where version consistency matters across the team (e.g., Terraform, Node.js).
3. **Keep package managers updated** — Run update commands regularly to get security patches and new packages.
4. **Prefer official repositories** — Only add third-party repos (PPAs, taps) when necessary; they may lag on security updates.
5. **Use Brewfile/packages.config for team consistency** — Check your package manifest into version control so every team member gets the same toolset.
6. **Don't mix system and language package managers** — Install Python with apt/brew, but install Python packages with pip/pipx. Install Node with brew/apt, but install Node packages with npm.
7. **Use `--cask` for GUI apps on macOS** — Homebrew casks manage GUI applications separately from CLI formulae and handle updates cleanly.
8. **Prefer user-level installs when possible** — Tools like Scoop and Homebrew avoid requiring admin/root privileges, reducing risk and simplifying management.
