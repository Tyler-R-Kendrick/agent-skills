#!/bin/bash
set -e

###############################################################################
# install.sh — Bash shell install/configure helper
#
# Checks if bash is available and at a reasonable version. Installs or upgrades
# via the platform package manager when needed. On Windows (MINGW/MSYS/Cygwin)
# it cannot install natively and suggests Git Bash or WSL instead.
#
# Output: JSON result on stdout.  All progress messages go to stderr.
###############################################################################

TOOL_NAME="bash"

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
# Version check — we want bash >= 4 for associative arrays, etc.
# ---------------------------------------------------------------------------
check_bash_version() {
    if command_exists bash; then
        local ver
        ver="$(bash --version | head -n1 | grep -oP '\d+\.\d+\.\d+' | head -1 2>/dev/null || bash --version | head -n1 | sed 's/.*version \([0-9]*\.[0-9]*\.[0-9]*\).*/\1/' )"
        local major="${ver%%.*}"
        echo "${ver}"
        if [ "${major}" -ge 4 ] 2>/dev/null; then
            return 0
        fi
        return 1
    fi
    return 2
}

# ---------------------------------------------------------------------------
# Install logic per OS
# ---------------------------------------------------------------------------
install_linux() {
    if command_exists apt-get; then
        info "Installing bash via apt-get ..."
        sudo apt-get update -qq >&2
        sudo apt-get install -y -qq bash >&2
    elif command_exists dnf; then
        info "Installing bash via dnf ..."
        sudo dnf install -y bash >&2
    elif command_exists yum; then
        info "Installing bash via yum ..."
        sudo yum install -y bash >&2
    elif command_exists apk; then
        info "Installing bash via apk ..."
        sudo apk add --no-cache bash >&2
    else
        fail "No supported package manager found (apt, dnf, yum, apk)."
    fi
}

install_macos() {
    if command_exists brew; then
        info "Installing/upgrading bash via Homebrew ..."
        brew install bash 2>&1 >&2 || brew upgrade bash 2>&1 >&2 || true
        # Add Homebrew bash to allowed shells if not already there
        local brew_bash
        brew_bash="$(brew --prefix)/bin/bash"
        if [ -x "${brew_bash}" ]; then
            if ! grep -qF "${brew_bash}" /etc/shells 2>/dev/null; then
                info "Adding ${brew_bash} to /etc/shells (requires sudo) ..."
                echo "${brew_bash}" | sudo tee -a /etc/shells >/dev/null
            fi
            info "Homebrew bash installed at ${brew_bash}"
            info "To use it as your default shell: chsh -s ${brew_bash}"
        fi
    else
        fail "Homebrew not found. Install Homebrew first: https://brew.sh"
    fi
}

install_windows() {
    info "Native bash installation is not supported on Windows."
    info ""
    info "Recommended options:"
    info "  1. Git Bash  — included with Git for Windows"
    info "     https://gitforwindows.org"
    info "  2. WSL       — Windows Subsystem for Linux"
    info "     wsl --install  (from an elevated PowerShell)"
    info "  3. MSYS2     — https://www.msys2.org"
    info ""
    # If we got here we are already running inside some bash-like shell
    if command_exists bash; then
        info "A bash shell is already available in this environment."
    else
        fail "bash is not available. Please install Git Bash or enable WSL."
    fi
}

# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------
INSTALLED_VERSION=""
ALREADY_INSTALLED="false"
ACTION="installed"

if ver=$(check_bash_version); then
    INSTALLED_VERSION="${ver}"
    info "bash ${INSTALLED_VERSION} is already installed and is version 4+."
    ALREADY_INSTALLED="true"
    ACTION="already_installed"
else
    ret=$?
    if [ "${ret}" -eq 1 ]; then
        INSTALLED_VERSION="$(check_bash_version || true)"
        info "bash ${INSTALLED_VERSION} found but is below version 4. Attempting upgrade ..."
        ACTION="upgraded"
    else
        info "bash not found. Attempting install ..."
        ACTION="installed"
    fi

    case "${OS}" in
        linux)   install_linux   ;;
        macos)   install_macos   ;;
        windows) install_windows ;;
        *)       fail "Unsupported OS: ${OS}" ;;
    esac

    # Re-check
    if command_exists bash; then
        INSTALLED_VERSION="$(bash --version | head -n1 | grep -oP '\d+\.\d+\.\d+' | head -1 2>/dev/null || bash --version | head -n1 | sed 's/.*version \([0-9]*\.[0-9]*\.[0-9]*\).*/\1/')"
    fi
fi

info "Done."

cat <<EOJSON
{"status":"success","tool":"${TOOL_NAME}","os":"${OS}","action":"${ACTION}","version":"${INSTALLED_VERSION}"}
EOJSON
