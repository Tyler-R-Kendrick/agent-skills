#!/bin/bash
set -e

###############################################################################
# install.sh — Git install/configure helper
#
# Installs git via the platform package manager and applies sensible defaults:
#   - default branch name: main
#   - credential helper: platform-appropriate
#   - pull strategy: rebase (reduces merge commits)
#   - core.autocrlf: input (Linux/macOS) or true (Windows)
#   - init.defaultBranch: main
#
# Environment variables:
#   GIT_SKIP_CONFIG=1  — skip the configuration step
#   GIT_USER_NAME      — set user.name  (optional)
#   GIT_USER_EMAIL     — set user.email (optional)
#
# Output: JSON result on stdout.  All progress messages go to stderr.
###############################################################################

TOOL_NAME="git"

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
# Install
# ---------------------------------------------------------------------------
install_git_linux() {
    if command_exists apt-get; then
        info "Installing git via apt-get ..."
        sudo apt-get update -qq >&2
        sudo apt-get install -y -qq git >&2
    elif command_exists dnf; then
        info "Installing git via dnf ..."
        sudo dnf install -y git >&2
    elif command_exists yum; then
        info "Installing git via yum ..."
        sudo yum install -y git >&2
    elif command_exists apk; then
        info "Installing git via apk ..."
        sudo apk add --no-cache git >&2
    else
        fail "No supported package manager found (apt, dnf, yum, apk)."
    fi
}

install_git_macos() {
    if command_exists brew; then
        info "Installing git via Homebrew ..."
        brew install git 2>&1 >&2 || brew upgrade git 2>&1 >&2 || true
    else
        # Trigger Xcode CLT install which includes git
        info "Homebrew not found. Triggering Xcode Command Line Tools install ..."
        xcode-select --install 2>&1 >&2 || true
        info "Follow the dialog to complete CLT installation, then re-run this script."
    fi
}

install_git_windows() {
    if command_exists choco; then
        info "Installing git via Chocolatey ..."
        choco install git -y >&2
    elif command_exists winget; then
        info "Installing git via winget ..."
        winget install --id Git.Git --accept-source-agreements --accept-package-agreements >&2
    else
        info "Download Git for Windows from: https://gitforwindows.org"
        fail "Cannot auto-install — no choco or winget found."
    fi
}

# ---------------------------------------------------------------------------
# Configure recommended defaults
# ---------------------------------------------------------------------------
configure_git() {
    info "Applying recommended git configuration ..."

    # Default branch
    git config --global init.defaultBranch main >&2
    info "  init.defaultBranch = main"

    # Pull strategy
    git config --global pull.rebase true >&2
    info "  pull.rebase = true"

    # Credential helper
    case "${OS}" in
        macos)
            git config --global credential.helper osxkeychain >&2
            info "  credential.helper = osxkeychain"
            ;;
        linux)
            # Use cache with 1-hour timeout as a safe default
            git config --global credential.helper 'cache --timeout=3600' >&2
            info "  credential.helper = cache (1 hour)"
            ;;
        windows)
            git config --global credential.helper manager >&2
            info "  credential.helper = manager"
            ;;
    esac

    # Line endings
    case "${OS}" in
        windows)
            git config --global core.autocrlf true >&2
            info "  core.autocrlf = true"
            ;;
        *)
            git config --global core.autocrlf input >&2
            info "  core.autocrlf = input"
            ;;
    esac

    # Diff and merge improvements
    git config --global merge.conflictstyle diff3 >&2
    info "  merge.conflictstyle = diff3"

    git config --global diff.algorithm histogram >&2
    info "  diff.algorithm = histogram"

    # Optional user identity
    if [ -n "${GIT_USER_NAME:-}" ]; then
        git config --global user.name "${GIT_USER_NAME}" >&2
        info "  user.name = ${GIT_USER_NAME}"
    fi
    if [ -n "${GIT_USER_EMAIL:-}" ]; then
        git config --global user.email "${GIT_USER_EMAIL}" >&2
        info "  user.email = ${GIT_USER_EMAIL}"
    fi

    # Warn if identity is still unset
    if [ -z "$(git config --global user.name 2>/dev/null)" ]; then
        info "  WARNING: user.name is not set. Run: git config --global user.name \"Your Name\""
    fi
    if [ -z "$(git config --global user.email 2>/dev/null)" ]; then
        info "  WARNING: user.email is not set. Run: git config --global user.email \"you@example.com\""
    fi
}

# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------
GIT_ACTION="already_installed"
GIT_VERSION=""
CONFIGURED="false"

# --- Install ---
if command_exists git; then
    GIT_VERSION="$(git --version | awk '{print $3}')"
    info "git ${GIT_VERSION} is already installed."
    GIT_ACTION="already_installed"
else
    info "git not found. Installing ..."
    case "${OS}" in
        linux)   install_git_linux   ;;
        macos)   install_git_macos   ;;
        windows) install_git_windows ;;
        *)       fail "Unsupported OS: ${OS}" ;;
    esac
    GIT_ACTION="installed"

    if command_exists git; then
        GIT_VERSION="$(git --version | awk '{print $3}')"
        info "git ${GIT_VERSION} installed successfully."
    else
        fail "git installation failed or is not on PATH yet."
    fi
fi

# --- Configure ---
if [ "${GIT_SKIP_CONFIG:-0}" != "1" ]; then
    configure_git
    CONFIGURED="true"
else
    info "Skipping configuration (GIT_SKIP_CONFIG=1)."
fi

info "Done."

cat <<EOJSON
{"status":"success","tool":"${TOOL_NAME}","os":"${OS}","action":"${GIT_ACTION}","version":"${GIT_VERSION}","configured":${CONFIGURED}}
EOJSON
