#!/bin/bash
set -e

###############################################################################
# install.sh — SSH install/configure helper
#
# Checks for openssh-client and installs it if missing. Generates an Ed25519
# key pair if none exists. Configures ssh-agent for the current session.
#
# Environment variables:
#   SSH_KEY_COMMENT    — comment for the generated key (default: user@hostname)
#   SSH_KEY_FILE       — key file path (default: ~/.ssh/id_ed25519)
#   SSH_SKIP_KEYGEN=1  — skip key generation
#   SSH_SKIP_AGENT=1   — skip ssh-agent setup
#
# Output: JSON result on stdout.  All progress messages go to stderr.
###############################################################################

TOOL_NAME="ssh"

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
# Install OpenSSH client
# ---------------------------------------------------------------------------
install_ssh_linux() {
    if command_exists apt-get; then
        info "Installing openssh-client via apt-get ..."
        sudo apt-get update -qq >&2
        sudo apt-get install -y -qq openssh-client >&2
    elif command_exists dnf; then
        info "Installing openssh-clients via dnf ..."
        sudo dnf install -y openssh-clients >&2
    elif command_exists yum; then
        info "Installing openssh-clients via yum ..."
        sudo yum install -y openssh-clients >&2
    elif command_exists apk; then
        info "Installing openssh-client via apk ..."
        sudo apk add --no-cache openssh-client >&2
    else
        fail "No supported package manager found."
    fi
}

install_ssh_macos() {
    # macOS always includes ssh
    info "ssh is included with macOS by default."
    if ! command_exists ssh; then
        info "Unexpectedly missing. Installing via Homebrew ..."
        if command_exists brew; then
            brew install openssh 2>&1 >&2 || true
        else
            fail "ssh not found and Homebrew not available."
        fi
    fi
}

install_ssh_windows() {
    info "On Windows, OpenSSH client can be enabled as an optional feature."
    info "  Settings > Apps > Optional features > Add OpenSSH Client"
    info ""
    if command_exists ssh; then
        info "ssh is already available in this environment."
    else
        # Try enabling via PowerShell
        if command_exists powershell; then
            info "Attempting to enable OpenSSH client via PowerShell ..."
            powershell -NoProfile -Command \
                "Add-WindowsCapability -Online -Name OpenSSH.Client~~~~0.0.1.0" >&2 2>/dev/null || {
                info "Could not auto-enable. Enable manually via Settings or use Git Bash's built-in ssh."
            }
        fi
        if command_exists choco; then
            info "Alternatively: choco install openssh -y"
        fi
    fi
}

# ---------------------------------------------------------------------------
# Generate Ed25519 key
# ---------------------------------------------------------------------------
generate_key() {
    local key_file="${SSH_KEY_FILE:-${HOME}/.ssh/id_ed25519}"
    local comment="${SSH_KEY_COMMENT:-${USER}@$(hostname)}"

    # Ensure .ssh directory exists with correct permissions
    local ssh_dir="${HOME}/.ssh"
    if [ ! -d "${ssh_dir}" ]; then
        info "Creating ${ssh_dir} ..."
        mkdir -p "${ssh_dir}"
        chmod 700 "${ssh_dir}"
    fi

    if [ -f "${key_file}" ]; then
        info "SSH key already exists: ${key_file}"
        info "Skipping key generation to avoid overwriting."
        echo "existing"
        return 0
    fi

    info "Generating Ed25519 SSH key ..."
    info "  File:    ${key_file}"
    info "  Comment: ${comment}"
    ssh-keygen -t ed25519 -C "${comment}" -f "${key_file}" -N "" >&2

    # Set permissions
    chmod 600 "${key_file}" 2>/dev/null || true
    chmod 644 "${key_file}.pub" 2>/dev/null || true

    info "Key generated successfully."
    info "Public key:"
    cat "${key_file}.pub" >&2

    echo "generated"
    return 0
}

# ---------------------------------------------------------------------------
# Configure ssh-agent
# ---------------------------------------------------------------------------
setup_agent() {
    local key_file="${SSH_KEY_FILE:-${HOME}/.ssh/id_ed25519}"

    case "${OS}" in
        macos)
            info "Configuring ssh-agent (macOS Keychain integration) ..."

            # Ensure config uses Keychain
            local ssh_config="${HOME}/.ssh/config"
            if [ ! -f "${ssh_config}" ] || ! grep -q "AddKeysToAgent" "${ssh_config}" 2>/dev/null; then
                info "Adding Keychain directives to ${ssh_config} ..."
                mkdir -p "${HOME}/.ssh"
                {
                    echo ""
                    echo "Host *"
                    echo "  AddKeysToAgent yes"
                    echo "  UseKeychain yes"
                    echo "  IdentityFile ${key_file}"
                } >> "${ssh_config}"
                chmod 600 "${ssh_config}"
            fi

            # Add key to agent
            if [ -f "${key_file}" ]; then
                ssh-add --apple-use-keychain "${key_file}" 2>&1 >&2 || ssh-add "${key_file}" 2>&1 >&2 || true
            fi
            ;;

        linux)
            info "Configuring ssh-agent ..."

            # Start agent if not running
            if [ -z "${SSH_AUTH_SOCK:-}" ]; then
                info "Starting ssh-agent ..."
                eval "$(ssh-agent -s)" >&2 || true
            fi

            # Add key
            if [ -f "${key_file}" ]; then
                ssh-add "${key_file}" 2>&1 >&2 || true
            fi

            info "NOTE: To persist ssh-agent across sessions, add to your shell profile:"
            info '  eval "$(ssh-agent -s)"'
            info "  ssh-add ${key_file}"

            # Ensure config has sensible defaults
            local ssh_config="${HOME}/.ssh/config"
            if [ ! -f "${ssh_config}" ]; then
                info "Creating default ${ssh_config} ..."
                {
                    echo "Host *"
                    echo "  AddKeysToAgent yes"
                    echo "  IdentityFile ${key_file}"
                } > "${ssh_config}"
                chmod 600 "${ssh_config}"
            fi
            ;;

        windows)
            info "ssh-agent on Windows:"
            info "  - Git Bash: eval \$(ssh-agent -s) && ssh-add ${key_file}"
            info "  - Windows native: Start the 'OpenSSH Authentication Agent' service"
            info "    (Services > OpenSSH Authentication Agent > Start)"
            if command_exists ssh-agent; then
                eval "$(ssh-agent -s)" 2>&1 >&2 || true
                if [ -f "${key_file}" ]; then
                    ssh-add "${key_file}" 2>&1 >&2 || true
                fi
            fi
            ;;
    esac
}

# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------
SSH_ACTION="already_installed"
SSH_VERSION=""
KEY_STATUS="skipped"
AGENT_STATUS="skipped"
KEY_FILE="${SSH_KEY_FILE:-${HOME}/.ssh/id_ed25519}"

# --- Install ---
if command_exists ssh; then
    SSH_VERSION="$(ssh -V 2>&1 | head -n1)"
    info "SSH is already installed: ${SSH_VERSION}"
    SSH_ACTION="already_installed"
else
    info "ssh not found. Installing ..."
    case "${OS}" in
        linux)   install_ssh_linux   ;;
        macos)   install_ssh_macos   ;;
        windows) install_ssh_windows ;;
        *)       fail "Unsupported OS: ${OS}" ;;
    esac
    SSH_ACTION="installed"

    if command_exists ssh; then
        SSH_VERSION="$(ssh -V 2>&1 | head -n1)"
        info "SSH installed: ${SSH_VERSION}"
    else
        info "ssh may not be on PATH yet. Restart your shell."
    fi
fi

# --- Key generation ---
if [ "${SSH_SKIP_KEYGEN:-0}" != "1" ]; then
    KEY_STATUS="$(generate_key)"
else
    info "Skipping key generation (SSH_SKIP_KEYGEN=1)."
fi

# --- ssh-agent ---
if [ "${SSH_SKIP_AGENT:-0}" != "1" ]; then
    setup_agent
    AGENT_STATUS="configured"
else
    info "Skipping ssh-agent setup (SSH_SKIP_AGENT=1)."
fi

# Determine public key fingerprint for JSON output
KEY_FINGERPRINT=""
if [ -f "${KEY_FILE}.pub" ]; then
    KEY_FINGERPRINT="$(ssh-keygen -lf "${KEY_FILE}.pub" 2>/dev/null | awk '{print $2}')"
fi

info "Done."

# Escape any special chars in SSH_VERSION for JSON safety
SSH_VERSION_SAFE="$(echo "${SSH_VERSION}" | tr '"' "'")"

cat <<EOJSON
{"status":"success","tool":"${TOOL_NAME}","os":"${OS}","action":"${SSH_ACTION}","version":"${SSH_VERSION_SAFE}","key":{"status":"${KEY_STATUS}","file":"${KEY_FILE}","fingerprint":"${KEY_FINGERPRINT}"},"agent":"${AGENT_STATUS}"}
EOJSON
