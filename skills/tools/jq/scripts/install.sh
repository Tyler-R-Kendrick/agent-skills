#!/bin/bash
set -e

###############################################################################
# install.sh — jq (and optionally yq) install helper
#
# Installs jq (command-line JSON processor) and optionally yq (YAML/XML/TOML
# processor) via the platform package manager.
#
# Environment variables:
#   INSTALL_YQ=1  — also install yq (default: skip)
#
# Output: JSON result on stdout.  All progress messages go to stderr.
###############################################################################

TOOL_NAME="jq"

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

detect_arch() {
    local arch
    arch="$(uname -m)"
    case "${arch}" in
        x86_64|amd64)  echo "amd64" ;;
        aarch64|arm64) echo "arm64" ;;
        *)             echo "${arch}" ;;
    esac
}

OS=$(detect_os)
ARCH=$(detect_arch)
echo "[${TOOL_NAME}] Detected OS: ${OS} (${ARCH})" >&2

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
# Install jq
# ---------------------------------------------------------------------------
install_jq_linux() {
    if command_exists apt-get; then
        info "Installing jq via apt-get ..."
        sudo apt-get update -qq >&2
        sudo apt-get install -y -qq jq >&2
    elif command_exists dnf; then
        info "Installing jq via dnf ..."
        sudo dnf install -y jq >&2
    elif command_exists yum; then
        info "Installing jq via yum ..."
        sudo yum install -y jq >&2
    elif command_exists apk; then
        info "Installing jq via apk ..."
        sudo apk add --no-cache jq >&2
    else
        # Direct binary download as fallback
        info "No package manager found. Downloading jq binary directly ..."
        local url="https://github.com/jqlang/jq/releases/latest/download/jq-linux-${ARCH}"
        sudo curl -fsSL -o /usr/local/bin/jq "${url}" >&2
        sudo chmod +x /usr/local/bin/jq
    fi
}

install_jq_macos() {
    if command_exists brew; then
        info "Installing jq via Homebrew ..."
        brew install jq 2>&1 >&2 || brew upgrade jq 2>&1 >&2 || true
    else
        fail "Homebrew not found. Install Homebrew first: https://brew.sh"
    fi
}

install_jq_windows() {
    if command_exists choco; then
        info "Installing jq via Chocolatey ..."
        choco install jq -y >&2
    elif command_exists winget; then
        info "Installing jq via winget ..."
        winget install --id jqlang.jq --accept-source-agreements --accept-package-agreements >&2
    elif command_exists scoop; then
        info "Installing jq via scoop ..."
        scoop install jq >&2
    else
        fail "No package manager found (choco, winget, scoop)."
    fi
}

# ---------------------------------------------------------------------------
# Install yq (optional)
# ---------------------------------------------------------------------------
install_yq_linux() {
    if command_exists snap; then
        info "Installing yq via snap ..."
        sudo snap install yq >&2
    else
        info "Downloading yq binary ..."
        local yq_arch="${ARCH}"
        local url="https://github.com/mikefarah/yq/releases/latest/download/yq_linux_${yq_arch}"
        sudo curl -fsSL -o /usr/local/bin/yq "${url}" >&2
        sudo chmod +x /usr/local/bin/yq
    fi
}

install_yq_macos() {
    if command_exists brew; then
        info "Installing yq via Homebrew ..."
        brew install yq 2>&1 >&2 || brew upgrade yq 2>&1 >&2 || true
    else
        fail "Homebrew not found for yq install."
    fi
}

install_yq_windows() {
    if command_exists choco; then
        info "Installing yq via Chocolatey ..."
        choco install yq -y >&2
    elif command_exists winget; then
        info "Installing yq via winget ..."
        winget install --id MikeFarah.yq --accept-source-agreements --accept-package-agreements >&2
    else
        info "Skipping yq — no choco or winget."
        return 1
    fi
}

# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------
JQ_ACTION="already_installed"
JQ_VERSION=""
YQ_INSTALLED="false"
YQ_VERSION=""

# --- jq ---
if command_exists jq; then
    JQ_VERSION="$(jq --version 2>/dev/null | sed 's/jq-//')"
    info "jq ${JQ_VERSION} is already installed."
    JQ_ACTION="already_installed"
else
    info "jq not found. Installing ..."
    case "${OS}" in
        linux)   install_jq_linux   ;;
        macos)   install_jq_macos   ;;
        windows) install_jq_windows ;;
        *)       fail "Unsupported OS: ${OS}" ;;
    esac
    JQ_ACTION="installed"

    if command_exists jq; then
        JQ_VERSION="$(jq --version 2>/dev/null | sed 's/jq-//')"
        info "jq ${JQ_VERSION} installed successfully."
    else
        fail "jq installation failed."
    fi
fi

# --- yq (optional) ---
if [ "${INSTALL_YQ:-0}" = "1" ]; then
    if command_exists yq; then
        YQ_VERSION="$(yq --version 2>/dev/null | awk '{print $NF}')"
        info "yq ${YQ_VERSION} is already installed."
        YQ_INSTALLED="true"
    else
        info "Installing yq ..."
        case "${OS}" in
            linux)   install_yq_linux   ;;
            macos)   install_yq_macos   ;;
            windows) install_yq_windows ;;
        esac
        if command_exists yq; then
            YQ_INSTALLED="true"
            YQ_VERSION="$(yq --version 2>/dev/null | awk '{print $NF}')"
            info "yq ${YQ_VERSION} installed."
        else
            info "yq installation may require a shell restart."
        fi
    fi
else
    info "Skipping yq (set INSTALL_YQ=1 to include it)."
fi

info "Done."

cat <<EOJSON
{"status":"success","tool":"${TOOL_NAME}","os":"${OS}","action":"${JQ_ACTION}","version":"${JQ_VERSION}","extras":{"yq":{"installed":${YQ_INSTALLED},"version":"${YQ_VERSION}"}}}
EOJSON
