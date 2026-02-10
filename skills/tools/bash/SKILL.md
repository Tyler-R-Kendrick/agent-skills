---
name: bash
description: |
    Use when writing shell scripts or working with Bash, Zsh, or POSIX-compatible shells on macOS and Linux. Covers scripting fundamentals, variables, control flow, functions, pipes, process management, and common patterns for automation and developer tooling.
    USE FOR: Bash, Zsh, shell scripting, POSIX shell, pipes, redirection, process substitution, shell functions, shell variables, .bashrc, .zshrc, shebang, here documents, command substitution, shell arithmetic
    DO NOT USE FOR: PowerShell scripting (use powershell-core), Windows batch files, complex data processing beyond text (consider Python or jq)
license: MIT
metadata:
  displayName: "Bash & Shell Scripting"
  author: "Tyler-R-Kendrick"
compatibility: claude, copilot, cursor
---

# Bash & Shell Scripting

## Overview

Bash is the default shell on most Linux distributions and was the macOS default until Catalina (now Zsh). Shell scripting is the glue that connects CLI tools together and automates repetitive tasks. Most CI/CD pipelines, Docker entrypoints, and deployment scripts are Bash. Understanding shell scripting is a foundational skill for every developer working in Unix-like environments.

## Bash vs Zsh vs Fish

| Feature          | Bash                | Zsh                      | Fish                  |
|------------------|---------------------|--------------------------|----------------------|
| Compatibility    | POSIX               | Mostly POSIX             | Not POSIX            |
| Default On       | Most Linux distros  | macOS (Catalina+)        | —                    |
| Plugin Ecosystem | Minimal             | Oh My Zsh / Starship     | Built-in             |
| Auto-complete    | Basic               | Extensive                | Excellent, built-in  |
| Scripting        | Standard            | Bash-compatible + extras | Unique syntax        |

> **Tip:** Write portable scripts in Bash (or POSIX sh) for maximum compatibility. Use Zsh/Fish features interactively but avoid them in shared scripts.

---

## Fundamentals

### Shebang

Every script should start with a shebang line that tells the OS which interpreter to use:

```bash
#!/usr/bin/env bash    # Portable — finds bash in PATH
#!/bin/bash            # Absolute path — less portable
#!/bin/sh              # POSIX shell — most compatible, fewest features
```

### Variables

```bash
# Assignment (no spaces around =)
name="world"
count=42
readonly PI=3.14159    # Constant — cannot be reassigned

# Usage (always quote to handle spaces/special chars)
echo "Hello, ${name}"
echo "Count is: $count"

# Environment vs local
export GLOBAL_VAR="visible to child processes"
local_var="only in this shell"

# Default values
echo "${MISSING_VAR:-default_value}"    # Use default if unset
echo "${MISSING_VAR:=default_value}"    # Set and use default if unset
```

### Special Variables

| Variable | Meaning                                  |
|----------|------------------------------------------|
| `$0`     | Script name                              |
| `$1`-`$9`| Positional arguments                    |
| `${10}`  | Positional args beyond 9                 |
| `$#`     | Number of arguments                      |
| `$@`     | All arguments (as separate words)        |
| `$*`     | All arguments (as single string)         |
| `$?`     | Exit code of last command                |
| `$$`     | PID of current shell                     |
| `$!`     | PID of last background process           |
| `$_`     | Last argument of previous command        |

### Quoting

```bash
name="world"

# Single quotes — literal, no expansion
echo 'Hello, $name'          # Output: Hello, $name

# Double quotes — variable expansion, preserves spaces
echo "Hello, $name"          # Output: Hello, world

# Command substitution
today=$(date +%Y-%m-%d)      # Preferred — $() syntax
today=`date +%Y-%m-%d`       # Legacy — backticks (avoid nesting)

# Arithmetic
result=$((5 + 3))
echo "Sum: $result"          # Output: Sum: 8
```

---

## Control Flow

### if / elif / else / fi

```bash
# String comparison
if [[ "$name" == "world" ]]; then
    echo "Hello, world!"
elif [[ "$name" == "bash" ]]; then
    echo "Hello, bash!"
else
    echo "Hello, stranger!"
fi

# Numeric comparison
if [[ $count -gt 10 ]]; then
    echo "Count is greater than 10"
fi

# File tests
if [[ -f "$file" ]]; then
    echo "File exists"
elif [[ -d "$dir" ]]; then
    echo "Directory exists"
fi
```

### Common Test Operators

| Operator | Type    | Meaning                |
|----------|---------|------------------------|
| `-f`     | File    | File exists            |
| `-d`     | File    | Directory exists       |
| `-e`     | File    | Path exists            |
| `-r`     | File    | Readable               |
| `-w`     | File    | Writable               |
| `-x`     | File    | Executable             |
| `-s`     | File    | File is non-empty      |
| `-z`     | String  | String is empty        |
| `-n`     | String  | String is non-empty    |
| `==`     | String  | Strings are equal      |
| `!=`     | String  | Strings are not equal  |
| `-eq`    | Numeric | Equal                  |
| `-ne`    | Numeric | Not equal              |
| `-lt`    | Numeric | Less than              |
| `-gt`    | Numeric | Greater than           |
| `-le`    | Numeric | Less than or equal     |
| `-ge`    | Numeric | Greater than or equal  |

### for Loops

```bash
# Iterate over a list
for item in apple banana cherry; do
    echo "Fruit: $item"
done

# Iterate over files
for file in *.txt; do
    echo "Processing: $file"
done

# C-style for loop
for ((i = 0; i < 10; i++)); do
    echo "Index: $i"
done

# Iterate over command output
for user in $(cut -d: -f1 /etc/passwd); do
    echo "User: $user"
done
```

### while / until Loops

```bash
# while loop
count=0
while [[ $count -lt 5 ]]; do
    echo "Count: $count"
    ((count++))
done

# until loop (runs until condition is true)
until [[ $count -eq 0 ]]; do
    echo "Countdown: $count"
    ((count--))
done

# Read lines from a file
while IFS= read -r line; do
    echo "Line: $line"
done < input.txt
```

### case Statements

```bash
case "$1" in
    start)
        echo "Starting service..."
        ;;
    stop)
        echo "Stopping service..."
        ;;
    restart)
        echo "Restarting service..."
        ;;
    status|info)
        echo "Checking status..."
        ;;
    *)
        echo "Usage: $0 {start|stop|restart|status}"
        exit 1
        ;;
esac
```

---

## Functions

```bash
# Function declaration
greet() {
    local name="${1:-World}"    # Local variable with default
    echo "Hello, ${name}!"
}

# Call the function
greet "Bash"    # Output: Hello, Bash!
greet           # Output: Hello, World!

# Return values (0 = success, 1-255 = error)
is_even() {
    local num=$1
    if (( num % 2 == 0 )); then
        return 0    # Success / true
    else
        return 1    # Failure / false
    fi
}

if is_even 4; then
    echo "4 is even"
fi

# Capture output instead of using return for data
get_timestamp() {
    date +%Y%m%d_%H%M%S
}
ts=$(get_timestamp)
echo "Timestamp: $ts"
```

---

## Pipes and Redirection

```bash
# Pipe — send stdout of one command to stdin of another
ls -la | grep ".txt" | sort -k5 -n

# Redirect stdout to file (overwrite)
echo "Hello" > output.txt

# Redirect stdout to file (append)
echo "World" >> output.txt

# Redirect stderr to file
command 2> errors.log

# Redirect both stdout and stderr to file
command > output.log 2>&1
command &> output.log          # Bash shorthand

# Discard output
command > /dev/null 2>&1

# Redirect stdin from file
sort < unsorted.txt

# Here document
cat <<EOF
Hello, $name!
Today is $(date).
EOF

# Here document (no variable expansion)
cat <<'EOF'
This is literal: $name
No expansion here.
EOF

# Here string
grep "pattern" <<< "$variable"

# Process substitution
diff <(sort file1.txt) <(sort file2.txt)
```

---

## Common Patterns

### Script Template

```bash
#!/usr/bin/env bash
set -euo pipefail    # Exit on error, undefined vars, pipe failures
IFS=$'\n\t'          # Safer word splitting

# Cleanup trap
cleanup() {
    echo "Cleaning up..."
    rm -f "$tmp_file"
}
trap cleanup EXIT

# Constants
readonly SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
readonly SCRIPT_NAME="$(basename "$0")"

# Temporary file
tmp_file=$(mktemp)

# Main logic
main() {
    echo "Running ${SCRIPT_NAME} from ${SCRIPT_DIR}"
    # Your code here
}

main "$@"
```

### Parsing Command-Line Arguments

```bash
# Using while/case
usage() {
    echo "Usage: $0 [-v] [-o output] [-n count] input_file"
    exit 1
}

verbose=false
output=""
count=1

while [[ $# -gt 0 ]]; do
    case "$1" in
        -v|--verbose)
            verbose=true
            shift
            ;;
        -o|--output)
            output="$2"
            shift 2
            ;;
        -n|--count)
            count="$2"
            shift 2
            ;;
        -h|--help)
            usage
            ;;
        -*)
            echo "Unknown option: $1"
            usage
            ;;
        *)
            input_file="$1"
            shift
            ;;
    esac
done

[[ -z "${input_file:-}" ]] && usage
```

### Reading Files Line by Line

```bash
while IFS= read -r line; do
    # Process each line
    echo "Processing: $line"
done < "$input_file"

# Skip blank lines and comments
while IFS= read -r line; do
    [[ -z "$line" || "$line" == \#* ]] && continue
    echo "$line"
done < config.txt
```

### Finding and Processing Files

```bash
# find + xargs (handles spaces in filenames)
find . -name "*.log" -print0 | xargs -0 rm -f

# find -exec
find . -name "*.sh" -exec chmod +x {} \;

# find with multiple actions
find /tmp -type f -name "*.tmp" -mtime +7 -delete
```

### Checking Command Existence

```bash
if command -v docker &>/dev/null; then
    echo "Docker is installed"
else
    echo "Docker is not installed"
    exit 1
fi
```

### Conditional Execution

```bash
# AND — run second command only if first succeeds
mkdir -p build && cd build

# OR — run second command only if first fails
command -v git &>/dev/null || sudo apt install git -y

# Combined
test -f config.yml && echo "Config found" || echo "Config missing"
```

---

## Text Processing

### grep — Search for Patterns

```bash
grep "error" logfile.txt              # Lines containing "error"
grep -i "error" logfile.txt           # Case-insensitive
grep -r "TODO" src/                   # Recursive search
grep -n "function" script.sh          # Show line numbers
grep -c "error" logfile.txt           # Count matches
grep -v "debug" logfile.txt           # Invert match (exclude)
grep -E "error|warning" logfile.txt   # Extended regex (OR)
grep -l "pattern" *.txt              # List filenames only
```

### sed — Stream Editor (Find/Replace)

```bash
sed 's/old/new/' file.txt             # Replace first occurrence per line
sed 's/old/new/g' file.txt            # Replace all occurrences
sed -i 's/old/new/g' file.txt         # Edit file in place
sed -n '10,20p' file.txt              # Print lines 10-20
sed '/^#/d' file.txt                  # Delete comment lines
sed -i.bak 's/old/new/g' file.txt    # In-place with backup
```

### awk — Columnar Data Processing

```bash
awk '{print $1}' file.txt             # Print first column
awk '{print $1, $3}' file.txt         # Print columns 1 and 3
awk -F: '{print $1}' /etc/passwd      # Custom delimiter
awk '$3 > 100' data.txt               # Filter rows
awk '{sum += $1} END {print sum}'     # Sum a column
awk 'NR==1 || $2 > 50' data.txt      # Header + filtered rows
```

### Other Text Tools

```bash
cut -d',' -f1,3 data.csv             # Extract CSV columns 1 and 3
sort file.txt                         # Sort lines alphabetically
sort -n file.txt                      # Sort numerically
sort -u file.txt                      # Sort and remove duplicates
uniq file.txt                         # Remove adjacent duplicates
uniq -c file.txt                      # Count adjacent duplicates
wc -l file.txt                        # Count lines
wc -w file.txt                        # Count words
tr 'a-z' 'A-Z' < file.txt           # Convert to uppercase
tr -d '\r' < dos.txt > unix.txt      # Remove carriage returns
head -20 file.txt                     # First 20 lines
tail -20 file.txt                     # Last 20 lines
tail -f logfile.txt                   # Follow file (live updates)
```

---

## Process Management

```bash
# Run a command in the background
long_running_task &

# List background jobs
jobs

# Bring job to foreground
fg %1

# Send job to background
bg %1

# Wait for background processes
wait          # Wait for all
wait $pid     # Wait for specific PID

# Kill a process
kill $pid          # Send SIGTERM (graceful)
kill -9 $pid       # Send SIGKILL (force)
kill %1            # Kill job number 1

# Run immune to hangups
nohup long_task &> output.log &

# Trap signals for cleanup
trap 'echo "Caught SIGINT"; exit 1' INT
trap 'cleanup' EXIT TERM
```

---

## Shell Configuration

### File Loading Order

**Bash:**
- Login shell: `/etc/profile` -> `~/.bash_profile` -> `~/.bash_login` -> `~/.profile`
- Interactive non-login: `~/.bashrc`
- Non-interactive: `$BASH_ENV`

**Zsh:**
- All: `~/.zshenv`
- Login: `~/.zprofile` -> `~/.zshrc` -> `~/.zlogin`
- Interactive: `~/.zshrc`

### Common Configuration

```bash
# ~/.bashrc or ~/.zshrc

# PATH management
export PATH="$HOME/.local/bin:$HOME/bin:$PATH"

# Aliases
alias ll='ls -lah'
alias gs='git status'
alias gd='git diff'
alias dc='docker compose'
alias k='kubectl'

# Functions
mkcd() {
    mkdir -p "$1" && cd "$1"
}

# Prompt customization (Bash)
export PS1='\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\w\[\033[00m\]\$ '

# History settings
export HISTSIZE=10000
export HISTFILESIZE=20000
export HISTCONTROL=ignoredups:erasedups
shopt -s histappend    # Bash-specific
```

---

## Shellcheck

[ShellCheck](https://www.shellcheck.net/) is a static analysis tool for shell scripts that catches common bugs and pitfalls.

### Installation

```bash
# macOS
brew install shellcheck

# Ubuntu/Debian
sudo apt install shellcheck

# Arch
sudo pacman -S shellcheck
```

### Usage

```bash
# Check a script
shellcheck myscript.sh

# Check with specific shell
shellcheck --shell=bash myscript.sh

# Exclude specific warnings
shellcheck --exclude=SC2034 myscript.sh
```

### Common ShellCheck Warnings

| Code   | Issue                                    | Fix                              |
|--------|------------------------------------------|----------------------------------|
| SC2086 | Double quote to prevent globbing         | Use `"$var"` instead of `$var`   |
| SC2046 | Quote to prevent word splitting          | Use `"$(command)"`               |
| SC2034 | Variable appears unused                  | Remove or export it              |
| SC2155 | Declare and assign separately            | `local var; var=$(cmd)`          |
| SC2162 | read without -r mangles backslashes      | Use `read -r`                    |

### CI Integration

```yaml
# GitHub Actions example
- name: Run ShellCheck
  uses: ludeeus/action-shellcheck@master
  with:
    scandir: './scripts'
```

---

## Best Practices

1. **Always use `set -euo pipefail`** — Exit on errors (`-e`), treat undefined variables as errors (`-u`), and fail on any command in a pipeline (`-o pipefail`).
2. **Quote your variables** — Always use `"$var"` instead of `$var` to prevent word splitting and globbing issues.
3. **Use ShellCheck** — Run shellcheck on every script to catch common bugs before they cause problems in production.
4. **Prefer `[[ ]]` over `[ ]`** — Double brackets are a Bash/Zsh built-in with better syntax, regex support, and no word splitting issues.
5. **Use functions for reusability** — Break scripts into functions with `local` variables to avoid polluting the global namespace.
6. **Add `#!/usr/bin/env bash` shebang** — The `env` form is more portable across systems where Bash may not be at `/bin/bash`.
7. **Trap for cleanup** — Use `trap cleanup EXIT` to ensure temporary files are removed and resources are released, even on errors.
8. **Avoid parsing `ls` output** — Use globs (`for f in *.txt`) or `find` instead of parsing `ls`, which breaks on filenames with spaces or special characters.
