#!/bin/bash
set -e

###############################################################################
# install.sh — Platform package manager bootstrap helper
#
# Ensures the primary package manager is available for the current platform:
#   - macOS:   Homebrew (brew)
#   - Windows: Chocolatey (choco) and/or winget
#   - Linux:   Checks for apt / dnf / yum / apk / zypper
#
# This script bootstraps the *manager itself*, not individual packages.
#
# Environment variables:
#   INSTALL_CHOCO=1   — force Chocolatey install on Windows even if winget exists
#
# Output: JSON result on stdout.  All progress messages go to stderr.
###############################################################################

TOOL_NAME="package-managers"

# ---------------------------------------------------------------------------
# OS detection
# ---------------------------------------------------------------------------
detect_os() {
    case "$(uname -s)" in
        Linux*)             echo "linux" ;;
        Darwin*)            echo "macos" ;;
        MINGW*|MSYS*|CYGWIN*) echo "windows" ;;
        *)                  echo "unknown" ;;
    esac
}

OS=$(detect_os)
echo "[${TOOL_NAME}] Detected OS: ${OS}" >&2

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------
command_exists() { command -v "$1" >/dev/null 2>&1; }

fail() {
    echo "[${TOOL_NAME}] ERROR: $1" >&2
    echo "{\"status\":\"error\",\"tool\":\"${TOOL_NAME}\",\"os\":\"${OS}\",\"message\":\"$1\"}"
    exit 1
}

info() { echo "[${TOOL_NAME}] $1" >&2; }

# ---------------------------------------------------------------------------
# macOS — Homebrew
# ---------------------------------------------------------------------------
bootstrap_macos() {
    local brew_installed="false"
    local brew_version=""

    if command_exists brew; then
        brew_version="$(brew --version 2>/dev/null | head -n1 | awk '{print $2}')"
        info "Homebrew ${brew_version} is already installed."
        brew_installed="true"

        # Update Homebrew itself
        info "Updating Homebrew ..."
        brew update 2>&1 >&2 || true
    else
        info "Homebrew not found. Installing ..."
        /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)" >&2

        # Add to PATH for Apple Silicon Macs
        if [ -f /opt/homebrew/bin/brew ]; then
            eval "$(/opt/homebrew/bin/brew shellenv)"
            info "NOTE: Add the following to your shell profile:"
            info '  eval "$(/opt/homebrew/bin/brew shellenv)"'
        fi

        if command_exists brew; then
            brew_version="$(brew --version 2>/dev/null | head -n1 | awk '{print $2}')"
            info "Homebrew ${brew_version} installed successfully."
            brew_installed="true"
        else
            fail "Homebrew installation failed."
        fi
    fi

    echo "{\"brew\":{\"installed\":${brew_installed},\"version\":\"${brew_version}\"}}"
}

# ---------------------------------------------------------------------------
# Linux — check existing package managers
# ---------------------------------------------------------------------------
bootstrap_linux() {
    local managers_found=""
    local primary=""

    for mgr in apt-get dnf yum apk zypper pacman; do
        if command_exists "${mgr}"; then
            local display_name="${mgr}"
            [ "${mgr}" = "apt-get" ] && display_name="apt"
            managers_found="${managers_found:+${managers_found},}\"${display_name}\""
            [ -z "${primary}" ] && primary="${display_name}"
            info "Found: ${display_name}"
        fi
    done

    # Also check for snap and flatpak as secondary managers
    for mgr in snap flatpak; do
        if command_exists "${mgr}"; then
            managers_found="${managers_found:+${managers_found},}\"${mgr}\""
            info "Found (secondary): ${mgr}"
        fi
    done

    if [ -z "${primary}" ]; then
        fail "No package manager found. This is unusual — check your Linux distribution."
    fi

    # Refresh package index
    info "Refreshing package index for ${primary} ..."
    case "${primary}" in
        apt)    sudo apt-get update -qq >&2 ;;
        dnf)    sudo dnf check-update >&2 || true ;;
        yum)    sudo yum check-update >&2 || true ;;
        apk)    sudo apk update >&2 ;;
        zypper) sudo zypper refresh >&2 ;;
        pacman) sudo pacman -Sy >&2 ;;
    esac

    # Check if Homebrew for Linux (linuxbrew) is also available
    local brew_installed="false"
    if command_exists brew; then
        brew_installed="true"
        info "Homebrew (linuxbrew) is also available."
    else
        info "TIP: You can also install Homebrew on Linux: https://brew.sh"
    fi

    echo "{\"primary\":\"${primary}\",\"available\":[${managers_found}],\"linuxbrew\":${brew_installed}}"
}

# ---------------------------------------------------------------------------
# Windows — Chocolatey / winget
# ---------------------------------------------------------------------------
bootstrap_windows() {
    local choco_installed="false"
    local choco_version=""
    local winget_installed="false"
    local winget_version=""
    local scoop_installed="false"

    # --- winget ---
    if command_exists winget; then
        winget_version="$(winget --version 2>/dev/null | tr -d 'v')"
        info "winget ${winget_version} is already installed."
        winget_installed="true"
    else
        info "winget not found."
        info "winget is included in Windows 10 1709+ and Windows 11."
        info "Install App Installer from the Microsoft Store to get winget."
    fi

    # --- Chocolatey ---
    if command_exists choco; then
        choco_version="$(choco --version 2>/dev/null)"
        info "Chocolatey ${choco_version} is already installed."
        choco_installed="true"
    elif [ "${INSTALL_CHOCO:-0}" = "1" ] || [ "${winget_installed}" = "false" ]; then
        info "Installing Chocolatey ..."
        info "NOTE: This requires an elevated (Administrator) shell."
        # The official install is a PowerShell one-liner
        if command_exists powershell; then
            powershell -NoProfile -ExecutionPolicy Bypass -Command \
                "Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))" >&2 || {
                info "Chocolatey install failed. Run from an elevated PowerShell."
                info "See: https://chocolatey.org/install"
            }
        elif command_exists pwsh; then
            pwsh -NoProfile -ExecutionPolicy Bypass -Command \
                "Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))" >&2 || {
                info "Chocolatey install failed."
            }
        else
            info "Cannot install Chocolatey — no PowerShell found."
        fi

        if command_exists choco; then
            choco_version="$(choco --version 2>/dev/null)"
            info "Chocolatey ${choco_version} installed successfully."
            choco_installed="true"
        fi
    else
        info "Skipping Chocolatey (winget is available; set INSTALL_CHOCO=1 to force)."
    fi

    # --- Scoop ---
    if command_exists scoop; then
        info "Scoop is also available."
        scoop_installed="true"
    fi

    echo "{\"winget\":{\"installed\":${winget_installed},\"version\":\"${winget_version}\"},\"choco\":{\"installed\":${choco_installed},\"version\":\"${choco_version}\"},\"scoop\":{\"installed\":${scoop_installed}}}"
}

# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------
info "Bootstrapping package manager(s) ..."

MANAGERS_JSON=""
case "${OS}" in
    macos)   MANAGERS_JSON="$(bootstrap_macos)"   ;;
    linux)   MANAGERS_JSON="$(bootstrap_linux)"    ;;
    windows) MANAGERS_JSON="$(bootstrap_windows)"  ;;
    *)       fail "Unsupported OS: ${OS}" ;;
esac

info "Done."

cat <<EOJSON
{"status":"success","tool":"${TOOL_NAME}","os":"${OS}","managers":${MANAGERS_JSON}}
EOJSON
