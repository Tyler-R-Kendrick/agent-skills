#!/bin/bash
set -e

###############################################################################
# install.sh — Docker install/configure helper
#
# Installs Docker Engine (Linux) or Docker Desktop (macOS/Windows).
# Checks for an existing installation first. Offers Podman as a lightweight
# alternative when INSTALL_PODMAN=1 is set.
#
# Environment variables:
#   INSTALL_PODMAN=1  — also install Podman (default: skip)
#   DOCKER_USER       — Linux user to add to the docker group (default: $USER)
#
# Output: JSON result on stdout.  All progress messages go to stderr.
###############################################################################

TOOL_NAME="docker"

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
# Install Docker Engine — Linux
# ---------------------------------------------------------------------------
install_docker_linux() {
    # Prefer the official convenience script for broad distro support
    if command_exists apt-get; then
        info "Installing Docker Engine via official apt repository ..."
        sudo apt-get update -qq >&2
        sudo apt-get install -y -qq ca-certificates curl gnupg >&2

        # Add Docker GPG key
        sudo install -m 0755 -d /etc/apt/keyrings
        if [ ! -f /etc/apt/keyrings/docker.gpg ]; then
            curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg >&2
            sudo chmod a+r /etc/apt/keyrings/docker.gpg
        fi

        # Determine distro
        local distro
        distro="$(. /etc/os-release && echo "${ID}")"
        local codename
        codename="$(. /etc/os-release && echo "${VERSION_CODENAME}")"

        echo "deb [arch=${ARCH} signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/${distro} ${codename} stable" | \
            sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

        sudo apt-get update -qq >&2
        sudo apt-get install -y -qq docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin >&2
    elif command_exists dnf; then
        info "Installing Docker Engine via dnf ..."
        sudo dnf -y install dnf-plugins-core >&2
        sudo dnf config-manager --add-repo https://download.docker.com/linux/fedora/docker-ce.repo >&2 || true
        sudo dnf install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin >&2
    else
        info "Falling back to Docker convenience script ..."
        curl -fsSL https://get.docker.com | sudo sh >&2
    fi

    # Add user to docker group
    local docker_user="${DOCKER_USER:-${USER}}"
    if id "${docker_user}" >/dev/null 2>&1; then
        if ! groups "${docker_user}" 2>/dev/null | grep -q docker; then
            info "Adding ${docker_user} to the docker group ..."
            sudo usermod -aG docker "${docker_user}" >&2
            info "NOTE: Log out and back in for group changes to take effect."
        fi
    fi

    # Enable and start
    if command_exists systemctl; then
        sudo systemctl enable docker >&2 || true
        sudo systemctl start docker >&2 || true
    fi
}

# ---------------------------------------------------------------------------
# Install Docker Desktop — macOS
# ---------------------------------------------------------------------------
install_docker_macos() {
    if command_exists brew; then
        info "Installing Docker Desktop via Homebrew cask ..."
        brew install --cask docker 2>&1 >&2 || true
        info "Docker Desktop installed. Open it from Applications to complete setup."
    else
        info "Homebrew not found."
        info "Download Docker Desktop manually from: https://www.docker.com/products/docker-desktop/"
        fail "Cannot auto-install without Homebrew."
    fi
}

# ---------------------------------------------------------------------------
# Install Docker Desktop — Windows
# ---------------------------------------------------------------------------
install_docker_windows() {
    if command_exists choco; then
        info "Installing Docker Desktop via Chocolatey ..."
        choco install docker-desktop -y >&2
    elif command_exists winget; then
        info "Installing Docker Desktop via winget ..."
        winget install --id Docker.DockerDesktop --accept-source-agreements --accept-package-agreements >&2
    else
        info "Download Docker Desktop from: https://www.docker.com/products/docker-desktop/"
        fail "Cannot auto-install — no choco or winget found."
    fi
    info "Docker Desktop installed. A reboot may be required."
}

# ---------------------------------------------------------------------------
# Install Podman (optional alternative)
# ---------------------------------------------------------------------------
install_podman() {
    info "Installing Podman ..."
    case "${OS}" in
        linux)
            if command_exists apt-get; then
                sudo apt-get install -y -qq podman >&2
            elif command_exists dnf; then
                sudo dnf install -y podman >&2
            else
                info "Skipping Podman — no apt or dnf."
                return 1
            fi
            ;;
        macos)
            if command_exists brew; then
                brew install podman 2>&1 >&2 || true
            else
                info "Skipping Podman — Homebrew not available."
                return 1
            fi
            ;;
        windows)
            if command_exists choco; then
                choco install podman-desktop -y >&2
            elif command_exists winget; then
                winget install --id RedHat.Podman --accept-source-agreements --accept-package-agreements >&2
            else
                info "Skipping Podman — no choco or winget."
                return 1
            fi
            ;;
    esac
}

# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------
DOCKER_ACTION="already_installed"
DOCKER_VERSION=""
PODMAN_INSTALLED="false"
PODMAN_VERSION=""

# --- Docker ---
if command_exists docker; then
    DOCKER_VERSION="$(docker --version 2>/dev/null | sed 's/Docker version \([^,]*\).*/\1/')"
    info "Docker ${DOCKER_VERSION} is already installed."
    DOCKER_ACTION="already_installed"

    # Quick daemon check
    if docker info >/dev/null 2>&1; then
        info "Docker daemon is running."
    else
        info "WARNING: Docker is installed but the daemon is not running."
        info "Start Docker Desktop or run: sudo systemctl start docker"
    fi
else
    info "Docker not found. Installing ..."
    case "${OS}" in
        linux)   install_docker_linux   ;;
        macos)   install_docker_macos   ;;
        windows) install_docker_windows ;;
        *)       fail "Unsupported OS: ${OS}" ;;
    esac
    DOCKER_ACTION="installed"

    if command_exists docker; then
        DOCKER_VERSION="$(docker --version 2>/dev/null | sed 's/Docker version \([^,]*\).*/\1/')"
        info "Docker ${DOCKER_VERSION} installed successfully."
    else
        info "Docker binary not yet on PATH. You may need to restart your shell or start Docker Desktop."
    fi
fi

# --- Podman (optional) ---
if [ "${INSTALL_PODMAN:-0}" = "1" ]; then
    if command_exists podman; then
        PODMAN_VERSION="$(podman --version 2>/dev/null | awk '{print $NF}')"
        info "Podman ${PODMAN_VERSION} is already installed."
        PODMAN_INSTALLED="true"
    else
        if install_podman; then
            PODMAN_INSTALLED="true"
            PODMAN_VERSION="$(podman --version 2>/dev/null | awk '{print $NF}')"
            info "Podman ${PODMAN_VERSION} installed."
        fi
    fi
else
    info "Skipping Podman (set INSTALL_PODMAN=1 to include it)."
fi

info "Done."

cat <<EOJSON
{"status":"success","tool":"${TOOL_NAME}","os":"${OS}","arch":"${ARCH}","action":"${DOCKER_ACTION}","version":"${DOCKER_VERSION}","extras":{"podman":{"installed":${PODMAN_INSTALLED},"version":"${PODMAN_VERSION}"}}}
EOJSON
