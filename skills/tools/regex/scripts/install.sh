#!/bin/bash
set -e

###############################################################################
# install.sh — Regex tools install helper (ripgrep + optionally sd)
#
# Installs ripgrep (rg) — a blazing-fast recursive grep — and optionally
# sd (a friendlier sed alternative). Both are written in Rust.
#
# Environment variables:
#   INSTALL_SD=1  — also install sd (default: skip)
#
# Output: JSON result on stdout.  All progress messages go to stderr.
###############################################################################

TOOL_NAME="regex"

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
# Install ripgrep
# ---------------------------------------------------------------------------
install_rg_linux() {
    if command_exists apt-get; then
        info "Installing ripgrep via apt-get ..."
        sudo apt-get update -qq >&2
        sudo apt-get install -y -qq ripgrep >&2
    elif command_exists dnf; then
        info "Installing ripgrep via dnf ..."
        sudo dnf install -y ripgrep >&2
    elif command_exists cargo; then
        info "Installing ripgrep via cargo ..."
        cargo install ripgrep >&2
    else
        # Direct binary download
        info "Downloading ripgrep binary ..."
        local rg_arch="x86_64"
        [ "${ARCH}" = "arm64" ] && rg_arch="aarch64"
        local tmp_dir
        tmp_dir="$(mktemp -d)"
        local latest
        latest="$(curl -fsSL https://api.github.com/repos/BurntSushi/ripgrep/releases/latest | grep -oP '"tag_name":\s*"\K[^"]+' 2>/dev/null || echo '14.1.1')"
        local url="https://github.com/BurntSushi/ripgrep/releases/download/${latest}/ripgrep-${latest}-${rg_arch}-unknown-linux-musl.tar.gz"
        curl -fsSL "${url}" -o "${tmp_dir}/rg.tar.gz" >&2
        tar -xzf "${tmp_dir}/rg.tar.gz" -C "${tmp_dir}" >&2
        sudo cp "${tmp_dir}"/ripgrep-*/rg /usr/local/bin/ >&2
        sudo chmod +x /usr/local/bin/rg
        rm -rf "${tmp_dir}"
    fi
}

install_rg_macos() {
    if command_exists brew; then
        info "Installing ripgrep via Homebrew ..."
        brew install ripgrep 2>&1 >&2 || brew upgrade ripgrep 2>&1 >&2 || true
    elif command_exists cargo; then
        info "Installing ripgrep via cargo ..."
        cargo install ripgrep >&2
    else
        fail "No Homebrew or cargo available. Install one first."
    fi
}

install_rg_windows() {
    if command_exists choco; then
        info "Installing ripgrep via Chocolatey ..."
        choco install ripgrep -y >&2
    elif command_exists winget; then
        info "Installing ripgrep via winget ..."
        winget install --id BurntSushi.ripgrep.MSVC --accept-source-agreements --accept-package-agreements >&2
    elif command_exists scoop; then
        info "Installing ripgrep via scoop ..."
        scoop install ripgrep >&2
    elif command_exists cargo; then
        info "Installing ripgrep via cargo ..."
        cargo install ripgrep >&2
    else
        fail "No package manager found (choco, winget, scoop, cargo)."
    fi
}

# ---------------------------------------------------------------------------
# Install sd (optional — sed alternative)
# ---------------------------------------------------------------------------
install_sd() {
    info "Installing sd ..."
    case "${OS}" in
        linux)
            if command_exists cargo; then
                cargo install sd >&2
            elif command_exists apt-get; then
                # sd may be available in newer Ubuntu
                sudo apt-get install -y -qq sd >&2 2>/dev/null || {
                    info "sd not in apt. Install Rust (rustup.rs) and run: cargo install sd"
                    return 1
                }
            else
                info "Install Rust (rustup.rs) and run: cargo install sd"
                return 1
            fi
            ;;
        macos)
            if command_exists brew; then
                brew install sd 2>&1 >&2 || true
            elif command_exists cargo; then
                cargo install sd >&2
            else
                info "Skipping sd — no brew or cargo."
                return 1
            fi
            ;;
        windows)
            if command_exists cargo; then
                cargo install sd >&2
            elif command_exists choco; then
                choco install sd-cli -y >&2 || {
                    info "sd not available via choco. Use: cargo install sd"
                    return 1
                }
            elif command_exists scoop; then
                scoop install sd >&2 || {
                    info "sd not available via scoop. Use: cargo install sd"
                    return 1
                }
            else
                info "Skipping sd — no cargo, choco, or scoop."
                return 1
            fi
            ;;
    esac
}

# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------
RG_ACTION="already_installed"
RG_VERSION=""
SD_INSTALLED="false"
SD_VERSION=""

# --- ripgrep ---
if command_exists rg; then
    RG_VERSION="$(rg --version 2>/dev/null | head -n1 | awk '{print $2}')"
    info "ripgrep ${RG_VERSION} is already installed."
    RG_ACTION="already_installed"
else
    info "ripgrep (rg) not found. Installing ..."
    case "${OS}" in
        linux)   install_rg_linux   ;;
        macos)   install_rg_macos   ;;
        windows) install_rg_windows ;;
        *)       fail "Unsupported OS: ${OS}" ;;
    esac
    RG_ACTION="installed"

    if command_exists rg; then
        RG_VERSION="$(rg --version 2>/dev/null | head -n1 | awk '{print $2}')"
        info "ripgrep ${RG_VERSION} installed successfully."
    else
        fail "ripgrep installation failed."
    fi
fi

# --- sd (optional) ---
if [ "${INSTALL_SD:-0}" = "1" ]; then
    if command_exists sd; then
        SD_VERSION="$(sd --version 2>/dev/null | awk '{print $2}')"
        info "sd ${SD_VERSION} is already installed."
        SD_INSTALLED="true"
    else
        if install_sd; then
            SD_INSTALLED="true"
            SD_VERSION="$(sd --version 2>/dev/null | awk '{print $2}')"
            info "sd ${SD_VERSION} installed."
        fi
    fi
else
    info "Skipping sd (set INSTALL_SD=1 to include it)."
fi

info "Done."

cat <<EOJSON
{"status":"success","tool":"${TOOL_NAME}","os":"${OS}","action":"${RG_ACTION}","ripgrep_version":"${RG_VERSION}","extras":{"sd":{"installed":${SD_INSTALLED},"version":"${SD_VERSION}"}}}
EOJSON
