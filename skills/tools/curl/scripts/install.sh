#!/bin/bash
set -e

###############################################################################
# install.sh — curl (and optionally HTTPie) install/configure helper
#
# Installs curl via the platform package manager. Optionally installs HTTPie
# as a friendlier alternative for interactive API work.
#
# Environment variables:
#   INSTALL_HTTPIE=1   — also install HTTPie (default: skip)
#
# Output: JSON result on stdout.  All progress messages go to stderr.
###############################################################################

TOOL_NAME="curl"

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

get_version() {
    local tool="$1"
    case "${tool}" in
        curl)  curl --version 2>/dev/null | head -n1 | awk '{print $2}' ;;
        httpie) http --version 2>/dev/null ;;
    esac
}

# ---------------------------------------------------------------------------
# Install curl
# ---------------------------------------------------------------------------
install_curl_linux() {
    if command_exists apt-get; then
        info "Installing curl via apt-get ..."
        sudo apt-get update -qq >&2
        sudo apt-get install -y -qq curl ca-certificates >&2
    elif command_exists dnf; then
        info "Installing curl via dnf ..."
        sudo dnf install -y curl >&2
    elif command_exists yum; then
        info "Installing curl via yum ..."
        sudo yum install -y curl >&2
    elif command_exists apk; then
        info "Installing curl via apk ..."
        sudo apk add --no-cache curl >&2
    else
        fail "No supported package manager found."
    fi
}

install_curl_macos() {
    # macOS ships curl, but Homebrew version is often newer
    if command_exists brew; then
        info "Installing/upgrading curl via Homebrew ..."
        brew install curl 2>&1 >&2 || brew upgrade curl 2>&1 >&2 || true
    else
        info "Using system curl (Homebrew not available for upgrade)."
    fi
}

install_curl_windows() {
    if command_exists choco; then
        info "Installing curl via Chocolatey ..."
        choco install curl -y >&2
    elif command_exists winget; then
        info "Installing curl via winget ..."
        winget install --id cURL.cURL --accept-source-agreements --accept-package-agreements >&2
    else
        info "curl is typically included with Windows 10+."
        info "If missing, install via: choco install curl  OR  winget install cURL.cURL"
    fi
}

# ---------------------------------------------------------------------------
# Install HTTPie (optional)
# ---------------------------------------------------------------------------
install_httpie() {
    info "Installing HTTPie ..."
    case "${OS}" in
        linux)
            if command_exists apt-get; then
                sudo apt-get install -y -qq httpie >&2
            elif command_exists pip3; then
                pip3 install --user httpie >&2
            else
                info "Skipping HTTPie — no apt or pip3 available."
                return 1
            fi
            ;;
        macos)
            if command_exists brew; then
                brew install httpie 2>&1 >&2 || true
            else
                pip3 install --user httpie >&2 || true
            fi
            ;;
        windows)
            if command_exists choco; then
                choco install httpie -y >&2
            elif command_exists pip3; then
                pip3 install httpie >&2
            else
                info "Skipping HTTPie — no choco or pip3 available."
                return 1
            fi
            ;;
    esac
}

# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------
CURL_ACTION="already_installed"
CURL_VERSION=""
HTTPIE_INSTALLED="false"
HTTPIE_VERSION=""

# --- curl ---
if command_exists curl; then
    CURL_VERSION="$(get_version curl)"
    info "curl ${CURL_VERSION} is already installed."
    CURL_ACTION="already_installed"
else
    info "curl not found. Installing ..."
    case "${OS}" in
        linux)   install_curl_linux   ;;
        macos)   install_curl_macos   ;;
        windows) install_curl_windows ;;
        *)       fail "Unsupported OS: ${OS}" ;;
    esac
    CURL_ACTION="installed"

    if command_exists curl; then
        CURL_VERSION="$(get_version curl)"
        info "curl ${CURL_VERSION} installed successfully."
    else
        fail "curl installation failed."
    fi
fi

# --- HTTPie (optional) ---
if [ "${INSTALL_HTTPIE:-0}" = "1" ]; then
    if command_exists http; then
        HTTPIE_VERSION="$(get_version httpie)"
        info "HTTPie ${HTTPIE_VERSION} is already installed."
        HTTPIE_INSTALLED="true"
    else
        if install_httpie; then
            HTTPIE_INSTALLED="true"
            HTTPIE_VERSION="$(get_version httpie)"
            info "HTTPie ${HTTPIE_VERSION} installed successfully."
        else
            info "HTTPie installation skipped or failed."
        fi
    fi
else
    info "Skipping HTTPie (set INSTALL_HTTPIE=1 to include it)."
fi

info "Done."

cat <<EOJSON
{"status":"success","tool":"${TOOL_NAME}","os":"${OS}","action":"${CURL_ACTION}","version":"${CURL_VERSION}","extras":{"httpie":{"installed":${HTTPIE_INSTALLED},"version":"${HTTPIE_VERSION}"}}}
EOJSON
