#!/bin/bash
set -e

###############################################################################
# install.sh — GNU Make (and optionally Just / go-task) install helper
#
# Installs GNU Make via the platform package manager. Optionally also installs:
#   - Just  (modern command runner, https://just.systems)
#   - Task  (go-task, https://taskfile.dev)
#
# Environment variables:
#   INSTALL_JUST=1  — also install Just  (default: skip)
#   INSTALL_TASK=1  — also install Task  (default: skip)
#
# Output: JSON result on stdout.  All progress messages go to stderr.
###############################################################################

TOOL_NAME="make"

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
# Install GNU Make
# ---------------------------------------------------------------------------
install_make_linux() {
    if command_exists apt-get; then
        info "Installing GNU Make via apt-get ..."
        sudo apt-get update -qq >&2
        sudo apt-get install -y -qq make build-essential >&2
    elif command_exists dnf; then
        info "Installing GNU Make via dnf ..."
        sudo dnf install -y make >&2
    elif command_exists yum; then
        info "Installing GNU Make via yum ..."
        sudo yum install -y make >&2
    elif command_exists apk; then
        info "Installing GNU Make via apk ..."
        sudo apk add --no-cache make >&2
    else
        fail "No supported package manager found."
    fi
}

install_make_macos() {
    if command_exists brew; then
        info "Installing GNU Make via Homebrew ..."
        brew install make 2>&1 >&2 || brew upgrade make 2>&1 >&2 || true
        info "NOTE: Homebrew installs GNU Make as 'gmake'."
        info "  To use it as 'make', add $(brew --prefix)/opt/make/libexec/gnubin to PATH."
    else
        # Xcode CLT includes make
        info "Triggering Xcode Command Line Tools (includes make) ..."
        xcode-select --install 2>&1 >&2 || true
    fi
}

install_make_windows() {
    if command_exists choco; then
        info "Installing GNU Make via Chocolatey ..."
        choco install make -y >&2
    elif command_exists winget; then
        info "Installing GNU Make via winget ..."
        winget install --id GnuWin32.Make --accept-source-agreements --accept-package-agreements >&2 || true
        info "If winget fails, try: choco install make"
    else
        info "Download GNU Make from: https://gnuwin32.sourceforge.net/packages/make.htm"
        info "Or install via: choco install make"
        fail "Cannot auto-install — no choco or winget found."
    fi
}

# ---------------------------------------------------------------------------
# Install Just (optional)
# ---------------------------------------------------------------------------
install_just() {
    info "Installing Just ..."
    case "${OS}" in
        linux)
            if command_exists cargo; then
                cargo install just >&2
            elif command_exists curl; then
                info "Using Just install script ..."
                curl --proto '=https' --tlsv1.2 -sSf https://just.systems/install.sh | sudo bash -s -- --to /usr/local/bin >&2
            elif command_exists apt-get; then
                # just is in some newer Ubuntu repos
                sudo apt-get install -y -qq just >&2 || {
                    info "just not in apt. Install Rust and run: cargo install just"
                    return 1
                }
            else
                info "Skipping Just — no cargo or curl available."
                return 1
            fi
            ;;
        macos)
            if command_exists brew; then
                brew install just 2>&1 >&2 || true
            else
                info "Skipping Just — Homebrew not available."
                return 1
            fi
            ;;
        windows)
            if command_exists choco; then
                choco install just -y >&2
            elif command_exists cargo; then
                cargo install just >&2
            else
                info "Skipping Just — no choco or cargo."
                return 1
            fi
            ;;
    esac
}

# ---------------------------------------------------------------------------
# Install Task / go-task (optional)
# ---------------------------------------------------------------------------
install_task() {
    info "Installing Task (go-task) ..."
    case "${OS}" in
        linux)
            if command_exists snap; then
                sudo snap install task --classic >&2
            elif command_exists curl; then
                sh -c "$(curl --location https://taskfile.dev/install.sh)" -- -d -b /usr/local/bin >&2
            elif command_exists apt-get; then
                sudo apt-get install -y -qq task-spooler >&2 || {
                    info "task not in apt. Use the install script: https://taskfile.dev/installation/"
                    return 1
                }
            else
                info "Skipping Task — no install method available."
                return 1
            fi
            ;;
        macos)
            if command_exists brew; then
                brew install go-task 2>&1 >&2 || true
            else
                info "Skipping Task — Homebrew not available."
                return 1
            fi
            ;;
        windows)
            if command_exists choco; then
                choco install go-task -y >&2
            elif command_exists scoop; then
                scoop install task >&2
            else
                info "Skipping Task — no choco or scoop."
                return 1
            fi
            ;;
    esac
}

# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------
MAKE_ACTION="already_installed"
MAKE_VERSION=""
JUST_INSTALLED="false"
JUST_VERSION=""
TASK_INSTALLED="false"
TASK_VERSION=""

# --- GNU Make ---
if command_exists make; then
    MAKE_VERSION="$(make --version 2>/dev/null | head -n1 | grep -oE '[0-9]+\.[0-9]+(\.[0-9]+)?' | head -1)"
    info "GNU Make ${MAKE_VERSION} is already installed."
    MAKE_ACTION="already_installed"
elif command_exists gmake; then
    MAKE_VERSION="$(gmake --version 2>/dev/null | head -n1 | grep -oE '[0-9]+\.[0-9]+(\.[0-9]+)?' | head -1)"
    info "GNU Make ${MAKE_VERSION} is installed as 'gmake'."
    MAKE_ACTION="already_installed"
else
    info "GNU Make not found. Installing ..."
    case "${OS}" in
        linux)   install_make_linux   ;;
        macos)   install_make_macos   ;;
        windows) install_make_windows ;;
        *)       fail "Unsupported OS: ${OS}" ;;
    esac
    MAKE_ACTION="installed"

    if command_exists make; then
        MAKE_VERSION="$(make --version 2>/dev/null | head -n1 | grep -oE '[0-9]+\.[0-9]+(\.[0-9]+)?' | head -1)"
        info "GNU Make ${MAKE_VERSION} installed successfully."
    elif command_exists gmake; then
        MAKE_VERSION="$(gmake --version 2>/dev/null | head -n1 | grep -oE '[0-9]+\.[0-9]+(\.[0-9]+)?' | head -1)"
        info "GNU Make ${MAKE_VERSION} installed as 'gmake'."
    else
        fail "GNU Make installation failed."
    fi
fi

# --- Just (optional) ---
if [ "${INSTALL_JUST:-0}" = "1" ]; then
    if command_exists just; then
        JUST_VERSION="$(just --version 2>/dev/null | awk '{print $2}')"
        info "Just ${JUST_VERSION} is already installed."
        JUST_INSTALLED="true"
    else
        if install_just; then
            JUST_INSTALLED="true"
            JUST_VERSION="$(just --version 2>/dev/null | awk '{print $2}')"
            info "Just ${JUST_VERSION} installed."
        fi
    fi
else
    info "Skipping Just (set INSTALL_JUST=1 to include it)."
fi

# --- Task (optional) ---
if [ "${INSTALL_TASK:-0}" = "1" ]; then
    if command_exists task; then
        TASK_VERSION="$(task --version 2>/dev/null | grep -oE '[0-9]+\.[0-9]+\.[0-9]+' | head -1)"
        info "Task ${TASK_VERSION} is already installed."
        TASK_INSTALLED="true"
    else
        if install_task; then
            TASK_INSTALLED="true"
            TASK_VERSION="$(task --version 2>/dev/null | grep -oE '[0-9]+\.[0-9]+\.[0-9]+' | head -1)"
            info "Task ${TASK_VERSION} installed."
        fi
    fi
else
    info "Skipping Task (set INSTALL_TASK=1 to include it)."
fi

info "Done."

cat <<EOJSON
{"status":"success","tool":"${TOOL_NAME}","os":"${OS}","action":"${MAKE_ACTION}","version":"${MAKE_VERSION}","extras":{"just":{"installed":${JUST_INSTALLED},"version":"${JUST_VERSION}"},"task":{"installed":${TASK_INSTALLED},"version":"${TASK_VERSION}"}}}
EOJSON
