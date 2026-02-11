#!/bin/bash
set -e

###############################################################################
# install.sh — PowerShell 7+ (pwsh) install helper
#
# Installs PowerShell Core (pwsh) on Linux, macOS, and Windows. This is the
# cross-platform, open-source PowerShell — not the legacy Windows PowerShell 5.x.
#
# Output: JSON result on stdout.  All progress messages go to stderr.
###############################################################################

TOOL_NAME="powershell-core"

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

get_pwsh_version() {
    pwsh -NoProfile -Command '$PSVersionTable.PSVersion.ToString()' 2>/dev/null || echo ""
}

# ---------------------------------------------------------------------------
# Install PowerShell — Linux (Ubuntu/Debian)
# ---------------------------------------------------------------------------
install_pwsh_linux_apt() {
    info "Installing PowerShell via Microsoft APT repository ..."

    # Prerequisites
    sudo apt-get update -qq >&2
    sudo apt-get install -y -qq wget apt-transport-https software-properties-common >&2

    # Determine Ubuntu/Debian version
    local distro_id distro_version
    distro_id="$(. /etc/os-release && echo "${ID}")"
    distro_version="$(. /etc/os-release && echo "${VERSION_ID}")"

    # Register Microsoft repository
    local deb_url="https://packages.microsoft.com/config/${distro_id}/${distro_version}/packages-microsoft-prod.deb"
    info "Adding Microsoft repository for ${distro_id} ${distro_version} ..."
    wget -q "${deb_url}" -O /tmp/packages-microsoft-prod.deb >&2 || {
        info "Microsoft repo not available for ${distro_id} ${distro_version}."
        info "Falling back to snap ..."
        install_pwsh_linux_snap
        return
    }
    sudo dpkg -i /tmp/packages-microsoft-prod.deb >&2
    rm -f /tmp/packages-microsoft-prod.deb

    sudo apt-get update -qq >&2
    sudo apt-get install -y -qq powershell >&2
}

install_pwsh_linux_snap() {
    if command_exists snap; then
        info "Installing PowerShell via snap ..."
        sudo snap install powershell --classic >&2
    else
        fail "Neither apt nor snap available. See https://learn.microsoft.com/en-us/powershell/scripting/install/installing-powershell-on-linux"
    fi
}

install_pwsh_linux() {
    if command_exists apt-get; then
        install_pwsh_linux_apt
    elif command_exists dnf; then
        info "Installing PowerShell via dnf ..."
        # Register Microsoft repo for Fedora/RHEL
        sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc >&2
        local distro_version
        distro_version="$(. /etc/os-release && echo "${VERSION_ID}")"
        curl -sSL "https://packages.microsoft.com/config/rhel/${distro_version%%.*}/prod.repo" | sudo tee /etc/yum.repos.d/microsoft.repo >/dev/null >&2
        sudo dnf install -y powershell >&2
    elif command_exists snap; then
        install_pwsh_linux_snap
    else
        # Direct binary download
        info "No supported package manager. Attempting direct .tar.gz install ..."
        local arch
        arch="$(uname -m)"
        case "${arch}" in
            x86_64)  arch="x64" ;;
            aarch64) arch="arm64" ;;
        esac
        local tmp_dir
        tmp_dir="$(mktemp -d)"
        local url="https://aka.ms/install-powershell.sh"
        info "Downloading PowerShell install script ..."
        curl -fsSL "${url}" -o "${tmp_dir}/install-powershell.sh" >&2
        chmod +x "${tmp_dir}/install-powershell.sh"
        sudo "${tmp_dir}/install-powershell.sh" >&2
        rm -rf "${tmp_dir}"
    fi
}

# ---------------------------------------------------------------------------
# Install PowerShell — macOS
# ---------------------------------------------------------------------------
install_pwsh_macos() {
    if command_exists brew; then
        info "Installing PowerShell via Homebrew ..."
        brew install powershell --cask 2>&1 >&2 || brew upgrade powershell --cask 2>&1 >&2 || true
    else
        info "Homebrew not found."
        info "Download the .pkg installer from:"
        info "  https://github.com/PowerShell/PowerShell/releases/latest"
        fail "Cannot auto-install without Homebrew."
    fi
}

# ---------------------------------------------------------------------------
# Install PowerShell — Windows
# ---------------------------------------------------------------------------
install_pwsh_windows() {
    # Check if legacy PowerShell (5.x) exists but not pwsh (7+)
    if command_exists powershell && ! command_exists pwsh; then
        info "Legacy Windows PowerShell found, but PowerShell 7+ (pwsh) is not installed."
    fi

    if command_exists winget; then
        info "Installing PowerShell 7 via winget ..."
        winget install --id Microsoft.PowerShell --accept-source-agreements --accept-package-agreements >&2
    elif command_exists choco; then
        info "Installing PowerShell 7 via Chocolatey ..."
        choco install powershell-core -y >&2
    else
        info "Download PowerShell 7 from:"
        info "  https://github.com/PowerShell/PowerShell/releases/latest"
        info "Or run: winget install Microsoft.PowerShell"
        fail "Cannot auto-install — no winget or choco found."
    fi
}

# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------
PWSH_ACTION="already_installed"
PWSH_VERSION=""
LEGACY_VERSION=""

# Check for legacy PowerShell on Windows
if command_exists powershell; then
    LEGACY_VERSION="$(powershell -NoProfile -Command '$PSVersionTable.PSVersion.ToString()' 2>/dev/null || echo 'unknown')"
    info "Legacy PowerShell ${LEGACY_VERSION} detected."
fi

# Check for PowerShell 7+ (pwsh)
if command_exists pwsh; then
    PWSH_VERSION="$(get_pwsh_version)"
    info "PowerShell ${PWSH_VERSION} (pwsh) is already installed."
    PWSH_ACTION="already_installed"

    # Check if update is recommended
    local_major="${PWSH_VERSION%%.*}"
    if [ "${local_major}" -lt 7 ] 2>/dev/null; then
        info "PowerShell ${PWSH_VERSION} is below 7.x. Consider upgrading."
    fi
else
    info "PowerShell 7+ (pwsh) not found. Installing ..."
    case "${OS}" in
        linux)   install_pwsh_linux   ;;
        macos)   install_pwsh_macos   ;;
        windows) install_pwsh_windows ;;
        *)       fail "Unsupported OS: ${OS}" ;;
    esac
    PWSH_ACTION="installed"

    if command_exists pwsh; then
        PWSH_VERSION="$(get_pwsh_version)"
        info "PowerShell ${PWSH_VERSION} installed successfully."
    else
        info "pwsh may not be on PATH yet. Restart your shell and try: pwsh --version"
    fi
fi

info "Done."

cat <<EOJSON
{"status":"success","tool":"${TOOL_NAME}","os":"${OS}","action":"${PWSH_ACTION}","version":"${PWSH_VERSION}","legacy_version":"${LEGACY_VERSION}"}
EOJSON
