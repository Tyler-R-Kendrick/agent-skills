---
name: cli
description: |
  Guidance for building command-line interfaces and terminal applications in Python.
  USE FOR: building CLI tools with argparse/click/typer, rich terminal output, TUI applications with textual, CLI testing strategies, output formatting, exit codes
  DO NOT USE FOR: Python project setup or packaging (use project-system), installing CLI tools (use package-management)
license: MIT
metadata:
  displayName: "Python CLI Development"
  author: "Tyler-R-Kendrick"
  version: "1.0.0"
  tags:
    - python
    - cli
    - argparse
    - click
    - typer
    - rich
    - textual
    - tui
compatibility: claude, copilot, cursor
---

# Python CLI Development

## Overview

Python is one of the most popular languages for building command-line tools, from simple scripts to complex multi-command applications. The ecosystem ranges from the standard library's `argparse` to high-level frameworks like `typer` that generate CLIs from type hints, and rich output libraries like `rich` and `textual` for beautiful terminal interfaces.

## Tool Comparison

| Feature | argparse | click | typer | fire | cement |
|---------|----------|-------|-------|------|--------|
| **Stdlib** | Yes | No | No | No | No |
| **Approach** | Imperative | Decorator-based | Type-hint-based | Introspection | Full framework |
| **Subcommands** | Yes (subparsers) | Yes (groups) | Yes (app + commands) | Automatic | Yes |
| **Auto-completion** | No (add-on) | Yes (plugin) | Yes (built-in) | No | Yes |
| **Testing** | Manual | `CliRunner` | `CliRunner` (via click) | Manual | Built-in |
| **Rich output** | Manual | Plugin ecosystem | Built-in (via rich) | No | Yes |
| **Learning curve** | Low | Medium | Low | Very low | High |
| **Dependencies** | None | click | typer, click, rich | fire | cement |
| **Best for** | Simple tools, no-dependency scripts | Medium-to-large CLIs | Modern CLIs with type safety | Quick prototypes | Enterprise CLIs |

**Recommendation**: Use **typer** for new CLI projects -- it provides the best developer experience with type hints, auto-completion, and rich integration. Use **argparse** when you cannot add dependencies. Use **click** for maximum flexibility and a large plugin ecosystem.

## argparse Patterns

argparse is Python's built-in argument parsing library. It requires no external dependencies.

### Basic Usage

```python
import argparse
import sys


def main() -> int:
    parser = argparse.ArgumentParser(
        prog="mytool",
        description="A tool that does useful things",
        epilog="Example: mytool process --input data.csv --format json",
    )
    parser.add_argument("input", help="Input file path")
    parser.add_argument("-o", "--output", default="-", help="Output file (default: stdout)")
    parser.add_argument("-v", "--verbose", action="store_true", help="Enable verbose output")
    parser.add_argument("--count", type=int, default=1, help="Number of repetitions")

    args = parser.parse_args()

    if args.verbose:
        print(f"Processing {args.input}...")

    return 0


if __name__ == "__main__":
    sys.exit(main())
```

### Subcommands

```python
import argparse


def cmd_init(args: argparse.Namespace) -> int:
    print(f"Initializing project: {args.name}")
    return 0


def cmd_build(args: argparse.Namespace) -> int:
    print(f"Building with config: {args.config}")
    return 0


def main() -> int:
    parser = argparse.ArgumentParser(prog="mytool")
    subparsers = parser.add_subparsers(dest="command", required=True)

    # init subcommand
    init_parser = subparsers.add_parser("init", help="Initialize a new project")
    init_parser.add_argument("name", help="Project name")
    init_parser.set_defaults(func=cmd_init)

    # build subcommand
    build_parser = subparsers.add_parser("build", help="Build the project")
    build_parser.add_argument("-c", "--config", default="release", help="Build config")
    build_parser.set_defaults(func=cmd_build)

    args = parser.parse_args()
    return args.func(args)
```

### Mutually Exclusive Groups

```python
parser = argparse.ArgumentParser()
group = parser.add_mutually_exclusive_group(required=True)
group.add_argument("--json", action="store_true", help="Output as JSON")
group.add_argument("--csv", action="store_true", help="Output as CSV")
group.add_argument("--table", action="store_true", help="Output as table")
```

### Custom Types

```python
import argparse
from pathlib import Path


def existing_path(value: str) -> Path:
    path = Path(value)
    if not path.exists():
        raise argparse.ArgumentTypeError(f"Path does not exist: {value}")
    return path


def port_number(value: str) -> int:
    port = int(value)
    if not (1 <= port <= 65535):
        raise argparse.ArgumentTypeError(f"Invalid port: {value} (must be 1-65535)")
    return port


parser = argparse.ArgumentParser()
parser.add_argument("--config", type=existing_path, help="Config file path")
parser.add_argument("--port", type=port_number, default=8080, help="Server port")
```

## Click Deep Dive

Click is a mature, decorator-based framework for building CLIs. It emphasizes composability and testability.

### Installation

```bash
pip install click
```

### Basic Command

```python
import click


@click.command()
@click.argument("name")
@click.option("--greeting", "-g", default="Hello", help="The greeting to use")
@click.option("--count", "-c", default=1, type=int, help="Number of greetings")
@click.option("--verbose", "-v", is_flag=True, help="Enable verbose output")
def greet(name: str, greeting: str, count: int, verbose: bool) -> None:
    """Greet someone NAME times."""
    if verbose:
        click.echo(f"Greeting {name} {count} time(s)...")
    for _ in range(count):
        click.echo(f"{greeting}, {name}!")


if __name__ == "__main__":
    greet()
```

### Command Groups (Subcommands)

```python
import click


@click.group()
@click.option("--debug/--no-debug", default=False, help="Enable debug mode")
@click.pass_context
def cli(ctx: click.Context, debug: bool) -> None:
    """My multi-command CLI tool."""
    ctx.ensure_object(dict)
    ctx.obj["debug"] = debug


@cli.command()
@click.argument("name")
@click.pass_context
def init(ctx: click.Context, name: str) -> None:
    """Initialize a new project."""
    if ctx.obj["debug"]:
        click.echo("Debug mode is on")
    click.echo(f"Initializing {name}...")


@cli.command()
@click.option("--config", "-c", default="release", help="Build configuration")
@click.pass_context
def build(ctx: click.Context, config: str) -> None:
    """Build the project."""
    click.echo(f"Building with config: {config}")


if __name__ == "__main__":
    cli()
```

### Context and State Passing

```python
import click


class AppConfig:
    def __init__(self, debug: bool = False, output_format: str = "text"):
        self.debug = debug
        self.output_format = output_format


pass_config = click.make_pass_decorator(AppConfig, ensure=True)


@click.group()
@click.option("--debug/--no-debug", default=False)
@click.option("--format", "output_format", type=click.Choice(["text", "json", "csv"]))
@click.pass_context
def cli(ctx: click.Context, debug: bool, output_format: str) -> None:
    ctx.obj = AppConfig(debug=debug, output_format=output_format or "text")


@cli.command()
@pass_config
def status(config: AppConfig) -> None:
    """Show status."""
    if config.output_format == "json":
        click.echo('{"status": "ok"}')
    else:
        click.echo("Status: OK")
```

### File Handling

```python
import click


@click.command()
@click.argument("input_file", type=click.File("r"))
@click.argument("output_file", type=click.File("w"), default="-")  # default to stdout
def process(input_file, output_file) -> None:
    """Process INPUT_FILE and write to OUTPUT_FILE."""
    for line in input_file:
        output_file.write(line.upper())


@click.command()
@click.argument("directory", type=click.Path(exists=True, file_okay=False, resolve_path=True))
def scan(directory: str) -> None:
    """Scan a DIRECTORY for files."""
    click.echo(f"Scanning: {directory}")
```

### Testing with CliRunner

```python
from click.testing import CliRunner
from myapp.cli import cli


def test_init_command():
    runner = CliRunner()
    result = runner.invoke(cli, ["init", "myproject"])
    assert result.exit_code == 0
    assert "Initializing myproject" in result.output


def test_build_with_debug():
    runner = CliRunner()
    result = runner.invoke(cli, ["--debug", "build", "--config", "debug"])
    assert result.exit_code == 0


def test_file_processing():
    runner = CliRunner()
    with runner.isolated_filesystem():
        with open("input.txt", "w") as f:
            f.write("hello\nworld\n")
        result = runner.invoke(process, ["input.txt", "output.txt"])
        assert result.exit_code == 0
        with open("output.txt") as f:
            assert f.read() == "HELLO\nWORLD\n"
```

### Useful Click Decorators and Features

```python
import click

# Password prompt (hidden input)
@click.command()
@click.option("--password", prompt=True, hide_input=True, confirmation_prompt=True)
def set_password(password: str) -> None:
    click.echo("Password set.")

# Choice type
@click.command()
@click.option("--color", type=click.Choice(["red", "green", "blue"], case_sensitive=False))
def paint(color: str) -> None:
    click.echo(f"Painting {color}")

# Range type
@click.command()
@click.option("--count", type=click.IntRange(1, 100), default=10)
def repeat(count: int) -> None:
    click.echo(f"Repeating {count} times")

# Progress bar
@click.command()
def download() -> None:
    items = range(1000)
    with click.progressbar(items, label="Downloading") as bar:
        for item in bar:
            pass  # do work

# Confirmation
@click.command()
@click.confirmation_option(prompt="Are you sure you want to delete everything?")
def delete_all() -> None:
    click.echo("Deleted everything.")
```

## Typer Deep Dive

Typer builds on click but uses Python type hints to define CLI interfaces. It produces beautiful help text and integrates with rich out of the box.

### Installation

```bash
pip install typer

# With all optional dependencies (rich, shellingham)
pip install "typer[all]"
```

### Basic Command

```python
import typer


def main(
    name: str,
    greeting: str = "Hello",
    count: int = 1,
    verbose: bool = False,
) -> None:
    """Greet someone by NAME."""
    if verbose:
        typer.echo(f"Greeting {name} {count} time(s)...")
    for _ in range(count):
        typer.echo(f"{greeting}, {name}!")


if __name__ == "__main__":
    typer.run(main)
```

### Multi-Command Application

```python
import typer
from typing import Annotated, Optional
from enum import Enum
from pathlib import Path

app = typer.Typer(help="My awesome CLI tool.")


class OutputFormat(str, Enum):
    text = "text"
    json = "json"
    csv = "csv"


@app.command()
def init(
    name: Annotated[str, typer.Argument(help="Project name")],
    template: Annotated[str, typer.Option("--template", "-t", help="Template to use")] = "default",
    force: Annotated[bool, typer.Option("--force", "-f", help="Overwrite existing")] = False,
) -> None:
    """Initialize a new project."""
    if force:
        typer.echo(f"Force-creating {name} with template {template}")
    else:
        typer.echo(f"Creating {name} with template {template}")


@app.command()
def build(
    config: Annotated[str, typer.Option(help="Build configuration")] = "release",
    output_dir: Annotated[Path, typer.Option("--output", "-o", help="Output directory")] = Path("dist"),
    format: Annotated[OutputFormat, typer.Option(help="Output format")] = OutputFormat.text,
) -> None:
    """Build the project."""
    typer.echo(f"Building [{config}] -> {output_dir} (format: {format.value})")


@app.command()
def clean(
    all: Annotated[bool, typer.Option("--all", help="Remove all artifacts")] = False,
) -> None:
    """Clean build artifacts."""
    if all:
        confirmed = typer.confirm("Remove ALL artifacts including caches?")
        if not confirmed:
            raise typer.Abort()
    typer.echo("Cleaned.")


if __name__ == "__main__":
    app()
```

### Annotated Parameters (Recommended Pattern)

```python
from typing import Annotated
import typer

app = typer.Typer()


@app.command()
def deploy(
    # Required argument
    environment: Annotated[str, typer.Argument(help="Target environment")],
    # Optional with short flag
    tag: Annotated[str, typer.Option("--tag", "-t", help="Image tag")] = "latest",
    # Boolean flag
    dry_run: Annotated[bool, typer.Option("--dry-run", help="Preview without deploying")] = False,
    # Prompt for input
    token: Annotated[str, typer.Option(prompt=True, hide_input=True, help="Auth token")] = ...,
    # Enum choice
    region: Annotated[
        str,
        typer.Option(help="Cloud region", click_type=typer.Choice(["us-east-1", "eu-west-1", "ap-south-1"]))
    ] = "us-east-1",
) -> None:
    """Deploy the application to a target environment."""
    if dry_run:
        typer.echo(f"[DRY RUN] Would deploy {tag} to {environment} in {region}")
    else:
        typer.echo(f"Deploying {tag} to {environment} in {region}...")
```

### Auto-Completion

```bash
# Generate completion script
my-cli --install-completion bash
my-cli --install-completion zsh
my-cli --install-completion fish

# Show completion script without installing
my-cli --show-completion bash
```

### Typer Testing

Typer uses Click's `CliRunner` under the hood:

```python
from typer.testing import CliRunner
from myapp.cli import app

runner = CliRunner()


def test_init():
    result = runner.invoke(app, ["init", "myproject"])
    assert result.exit_code == 0
    assert "Creating myproject" in result.output


def test_init_with_force():
    result = runner.invoke(app, ["init", "myproject", "--force"])
    assert result.exit_code == 0
    assert "Force-creating" in result.output


def test_build_json_format():
    result = runner.invoke(app, ["build", "--format", "json"])
    assert result.exit_code == 0
    assert "json" in result.output


def test_clean_aborted():
    result = runner.invoke(app, ["clean", "--all"], input="n\n")
    assert result.exit_code == 1  # Aborted
```

### Nested Command Groups (Sub-Applications)

```python
import typer

app = typer.Typer()
users_app = typer.Typer(help="User management commands.")
app.add_typer(users_app, name="users")


@users_app.command("list")
def list_users() -> None:
    """List all users."""
    typer.echo("user1\nuser2\nuser3")


@users_app.command("create")
def create_user(name: str, email: str) -> None:
    """Create a new user."""
    typer.echo(f"Created user {name} ({email})")


# Usage: mycli users list
#        mycli users create "Jane" "jane@example.com"
```

## Rich Library

Rich is a library for beautiful terminal output: colors, tables, progress bars, syntax highlighting, markdown rendering, and more.

### Installation

```bash
pip install rich
```

### Console Markup

```python
from rich.console import Console

console = Console()

# Styled text
console.print("[bold red]Error:[/bold red] Something went wrong")
console.print("[green]Success![/green] Operation completed.")
console.print("[dim italic]This is dimmed and italic[/dim italic]")

# Emoji
console.print(":rocket: Launching...")

# Links
console.print("Visit [link=https://example.com]our website[/link]")

# Print with highlight (auto-detects and highlights numbers, strings, etc.)
console.print({"name": "Alice", "age": 30, "active": True})
```

### Tables

```python
from rich.console import Console
from rich.table import Table

console = Console()

table = Table(title="Deployment Status")
table.add_column("Service", style="cyan", no_wrap=True)
table.add_column("Version", style="magenta")
table.add_column("Status", justify="center")
table.add_column("Uptime", justify="right", style="green")

table.add_row("api-gateway", "2.3.1", "[green]Healthy[/green]", "14d 3h")
table.add_row("auth-service", "1.8.0", "[green]Healthy[/green]", "14d 3h")
table.add_row("worker", "3.0.2", "[red]Degraded[/red]", "2h 15m")
table.add_row("database", "16.1", "[green]Healthy[/green]", "30d 12h")

console.print(table)
```

### Progress Bars

```python
import time
from rich.progress import Progress, SpinnerColumn, TextColumn, BarColumn, TaskProgressColumn

# Simple progress bar
from rich.progress import track

for item in track(range(100), description="Processing..."):
    time.sleep(0.02)

# Advanced multi-task progress
with Progress(
    SpinnerColumn(),
    TextColumn("[progress.description]{task.description}"),
    BarColumn(),
    TaskProgressColumn(),
) as progress:
    download_task = progress.add_task("Downloading...", total=1000)
    install_task = progress.add_task("Installing...", total=500)

    while not progress.finished:
        progress.update(download_task, advance=5)
        progress.update(install_task, advance=2)
        time.sleep(0.01)
```

### Panels, Trees, and Columns

```python
from rich.console import Console
from rich.panel import Panel
from rich.tree import Tree
from rich.columns import Columns

console = Console()

# Panel
console.print(Panel("This is important information", title="Notice", border_style="yellow"))

# Tree
tree = Tree("[bold]Project Structure[/bold]")
src = tree.add("[folder]src/")
src.add("[file]main.py")
src.add("[file]config.py")
utils = src.add("[folder]utils/")
utils.add("[file]helpers.py")
tests = tree.add("[folder]tests/")
tests.add("[file]test_main.py")
console.print(tree)

# Columns
data = [Panel(f"Item {i}", expand=True) for i in range(12)]
console.print(Columns(data))
```

### Live Display

```python
import time
from rich.live import Live
from rich.table import Table


def generate_table(step: int) -> Table:
    table = Table()
    table.add_column("Step")
    table.add_column("Status")
    for i in range(step + 1):
        table.add_row(f"Step {i}", "[green]Complete[/green]")
    if step < 5:
        table.add_row(f"Step {step + 1}", "[yellow]Running...[/yellow]")
    return table


with Live(generate_table(0), refresh_per_second=4) as live:
    for step in range(6):
        time.sleep(0.5)
        live.update(generate_table(step))
```

### Syntax Highlighting and Logging

```python
from rich.console import Console
from rich.syntax import Syntax
import logging
from rich.logging import RichHandler

console = Console()

# Syntax highlighting
code = '''
def fibonacci(n: int) -> int:
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)
'''
syntax = Syntax(code, "python", theme="monokai", line_numbers=True)
console.print(syntax)

# Rich logging handler
logging.basicConfig(
    level=logging.DEBUG,
    format="%(message)s",
    handlers=[RichHandler(rich_tracebacks=True)],
)
log = logging.getLogger("myapp")
log.info("Application started")
log.warning("Low disk space")
log.error("Connection failed")
```

## Textual for TUI Applications

Textual is a framework for building terminal user interfaces (TUIs) with a CSS-like styling system and reactive widget model.

### Installation

```bash
pip install textual

# With dev tools (for live CSS editing)
pip install "textual[dev]"
```

### Basic Application

```python
from textual.app import App, ComposeResult
from textual.containers import Horizontal, Vertical
from textual.widgets import Header, Footer, Static, Button, Input, DataTable


class MyApp(App):
    """A simple Textual application."""

    CSS = """
    Screen {
        layout: vertical;
    }
    #sidebar {
        width: 30;
        background: $surface;
        padding: 1;
    }
    #main {
        width: 1fr;
        padding: 1;
    }
    Button {
        margin: 1 0;
    }
    """

    BINDINGS = [
        ("q", "quit", "Quit"),
        ("d", "toggle_dark", "Toggle Dark Mode"),
    ]

    def compose(self) -> ComposeResult:
        yield Header()
        with Horizontal():
            with Vertical(id="sidebar"):
                yield Static("Navigation", classes="title")
                yield Button("Dashboard", id="btn-dashboard", variant="primary")
                yield Button("Settings", id="btn-settings")
                yield Button("Logs", id="btn-logs")
            with Vertical(id="main"):
                yield Static("Welcome to MyApp", id="content")
        yield Footer()

    def on_button_pressed(self, event: Button.Pressed) -> None:
        content = self.query_one("#content", Static)
        content.update(f"You clicked: {event.button.id}")

    def action_toggle_dark(self) -> None:
        self.dark = not self.dark


if __name__ == "__main__":
    MyApp().run()
```

### Widgets

```python
from textual.app import App, ComposeResult
from textual.widgets import DataTable, Input, ListView, ListItem, Label, RichLog


class DataApp(App):
    def compose(self) -> ComposeResult:
        yield Input(placeholder="Search...", id="search")
        yield DataTable()
        yield RichLog(id="log")

    def on_mount(self) -> None:
        table = self.query_one(DataTable)
        table.add_columns("Name", "Role", "Status")
        table.add_rows([
            ("Alice", "Engineer", "Active"),
            ("Bob", "Designer", "Away"),
            ("Carol", "Manager", "Active"),
        ])

    def on_input_changed(self, event: Input.Changed) -> None:
        log = self.query_one("#log", RichLog)
        log.write(f"Search: {event.value}")
```

### Reactive Attributes

```python
from textual.app import App, ComposeResult
from textual.reactive import reactive
from textual.widgets import Static


class Counter(Static):
    count: reactive[int] = reactive(0)

    def render(self) -> str:
        return f"Count: {self.count}"

    def watch_count(self, new_value: int) -> None:
        if new_value > 10:
            self.styles.color = "red"

    def on_click(self) -> None:
        self.count += 1
```

### CSS Styling

Textual uses a CSS-like language for styling. Styles can be defined inline, in the `CSS` class variable, or in external `.tcss` files.

```python
class MyApp(App):
    CSS_PATH = "styles.tcss"  # Load from external file
```

```css
/* styles.tcss */
Screen {
    layout: horizontal;
}

#sidebar {
    width: 25%;
    background: $surface;
    border-right: solid $primary;
    padding: 1 2;
}

#main {
    width: 75%;
    padding: 1 2;
}

Button {
    width: 100%;
    margin: 1 0;
}

Button:hover {
    background: $primary-lighten-2;
}

DataTable > .datatable--header {
    background: $primary;
    color: $text;
}
```

## Output Formatting

### JSON Output Mode

Provide a `--json` flag for machine-readable output:

```python
import json
import typer
from typing import Annotated

app = typer.Typer()


@app.command()
def status(
    json_output: Annotated[bool, typer.Option("--json", help="Output as JSON")] = False,
) -> None:
    """Show system status."""
    data = {
        "status": "healthy",
        "services": [
            {"name": "api", "status": "up", "latency_ms": 42},
            {"name": "db", "status": "up", "latency_ms": 5},
        ],
        "version": "1.2.0",
    }

    if json_output:
        typer.echo(json.dumps(data, indent=2))
    else:
        from rich.console import Console
        from rich.table import Table

        console = Console()
        console.print(f"[bold]Status:[/bold] {data['status']}")
        table = Table()
        table.add_column("Service")
        table.add_column("Status")
        table.add_column("Latency")
        for svc in data["services"]:
            table.add_row(svc["name"], svc["status"], f"{svc['latency_ms']}ms")
        console.print(table)
```

### Color/No-Color Support

Respect the `NO_COLOR` environment variable (see https://no-color.org):

```python
import os
from rich.console import Console

# Rich automatically respects NO_COLOR
console = Console(no_color=os.environ.get("NO_COLOR") is not None)

# Or force no color via CLI flag
import typer

app = typer.Typer()

@app.callback()
def main(no_color: bool = False) -> None:
    if no_color:
        os.environ["NO_COLOR"] = "1"
```

### Table Formatting with tabulate

```python
from tabulate import tabulate

data = [
    ["api-gateway", "2.3.1", "Healthy"],
    ["auth-service", "1.8.0", "Healthy"],
    ["worker", "3.0.2", "Degraded"],
]
headers = ["Service", "Version", "Status"]

# Multiple output formats
print(tabulate(data, headers=headers, tablefmt="grid"))
print(tabulate(data, headers=headers, tablefmt="github"))
print(tabulate(data, headers=headers, tablefmt="plain"))
```

## Exit Codes and Error Handling

### Standard Exit Codes

```python
import sys

EXIT_SUCCESS = 0
EXIT_GENERAL_ERROR = 1
EXIT_USAGE_ERROR = 2        # Invalid arguments
EXIT_NOT_FOUND = 3          # Resource not found
EXIT_PERMISSION_DENIED = 4  # Insufficient permissions


def main() -> int:
    try:
        result = do_work()
        return EXIT_SUCCESS
    except FileNotFoundError as e:
        print(f"Error: {e}", file=sys.stderr)
        return EXIT_NOT_FOUND
    except PermissionError as e:
        print(f"Error: {e}", file=sys.stderr)
        return EXIT_PERMISSION_DENIED
    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        return EXIT_GENERAL_ERROR


if __name__ == "__main__":
    sys.exit(main())
```

### Error Handling in Typer

```python
import typer
from rich.console import Console

app = typer.Typer()
err_console = Console(stderr=True)


@app.command()
def deploy(environment: str) -> None:
    """Deploy to an environment."""
    valid_envs = {"dev", "staging", "production"}
    if environment not in valid_envs:
        err_console.print(f"[red]Error:[/red] Unknown environment '{environment}'")
        err_console.print(f"Valid environments: {', '.join(sorted(valid_envs))}")
        raise typer.Exit(code=2)

    if environment == "production":
        confirmed = typer.confirm("Deploy to PRODUCTION?", abort=True)

    typer.echo(f"Deploying to {environment}...")
```

### Error Handling in Click

```python
import click
import sys


class AppError(click.ClickException):
    """Custom error with colored output."""

    def format_message(self) -> str:
        return f"Error: {self.message}"


@click.command()
@click.argument("config_path", type=click.Path(exists=True))
def run(config_path: str) -> None:
    try:
        load_config(config_path)
    except ValueError as e:
        raise AppError(str(e))
    except Exception as e:
        click.echo(f"Fatal: {e}", err=True)
        sys.exit(1)
```

## CLI Testing Strategies

### Testing with pytest and CliRunner

```python
import pytest
from typer.testing import CliRunner
from myapp.cli import app

runner = CliRunner()


class TestInitCommand:
    def test_basic_init(self):
        result = runner.invoke(app, ["init", "myproject"])
        assert result.exit_code == 0
        assert "myproject" in result.output

    def test_init_with_template(self):
        result = runner.invoke(app, ["init", "myproject", "--template", "fastapi"])
        assert result.exit_code == 0
        assert "fastapi" in result.output

    def test_init_invalid_name(self):
        result = runner.invoke(app, ["init", ""])
        assert result.exit_code != 0

    def test_help_text(self):
        result = runner.invoke(app, ["init", "--help"])
        assert result.exit_code == 0
        assert "Initialize" in result.output


class TestOutputFormats:
    def test_json_output(self):
        result = runner.invoke(app, ["status", "--json"])
        assert result.exit_code == 0
        import json
        data = json.loads(result.output)
        assert "status" in data

    def test_text_output(self):
        result = runner.invoke(app, ["status"])
        assert result.exit_code == 0
        assert "Status:" in result.output
```

### Testing with Filesystem Isolation

```python
from click.testing import CliRunner
from myapp.cli import app


def test_file_creation():
    runner = CliRunner()
    with runner.isolated_filesystem():
        result = runner.invoke(app, ["init", "testproject"])
        assert result.exit_code == 0

        # Verify files were created
        from pathlib import Path
        assert Path("testproject/pyproject.toml").exists()
        assert Path("testproject/src").is_dir()
```

### Testing with Environment Variables

```python
def test_respects_no_color():
    runner = CliRunner()
    result = runner.invoke(app, ["status"], env={"NO_COLOR": "1"})
    assert result.exit_code == 0
    # Verify no ANSI escape codes in output
    assert "\033[" not in result.output
```

### Snapshot Testing

```python
import pytest
from syrupy.assertion import SnapshotAssertion
from typer.testing import CliRunner
from myapp.cli import app

runner = CliRunner()


def test_help_output(snapshot: SnapshotAssertion):
    result = runner.invoke(app, ["--help"])
    assert result.output == snapshot
```

## Best Practices

1. **Write `--help` for everything**. Every command and option should have a clear help string. Users will read it before your docs.

2. **Support `--json` output**. Machine-readable output makes your CLI composable with other tools (`jq`, scripts, CI pipelines).

3. **Write to stderr for diagnostics**. Use `stderr` for progress, warnings, and errors. Reserve `stdout` for data output:
   ```python
   import sys
   print("data output")              # stdout -- pipeable
   print("Warning: ...", file=sys.stderr)  # stderr -- visible but not piped
   ```

4. **Use exit codes consistently**. Return 0 for success, non-zero for errors. Document your exit codes.

5. **Respect `NO_COLOR`**. Check the `NO_COLOR` environment variable and disable colors/formatting when set.

6. **Test with CliRunner**. Both Click and Typer provide `CliRunner` for testing without spawning subprocesses.

7. **Add shell completion**. Typer generates it for free. For Click, use `click-completion` or `click`'s built-in support.

8. **Use `Annotated` parameters in Typer** (not positional defaults) for clearer, more maintainable code.

9. **Provide `--verbose` and `--quiet` flags**. Let users control output verbosity. Consider using Python's `logging` module with configurable levels.

10. **Version flag**. Always provide `--version`:
    ```python
    from importlib.metadata import version

    app = typer.Typer()

    def version_callback(value: bool) -> None:
        if value:
            typer.echo(f"myapp {version('my-package')}")
            raise typer.Exit()

    @app.callback()
    def main(
        version: Annotated[
            bool, typer.Option("--version", callback=version_callback, is_eager=True)
        ] = False,
    ) -> None:
        pass
    ```
