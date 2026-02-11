# TypeScript CLI Development

## Overview

TypeScript is an excellent choice for building CLI tools thanks to its type safety, rich ecosystem of argument-parsing and terminal-UI libraries, and multiple packaging options. This skill covers the major frameworks for building CLIs, terminal styling and interaction libraries, and strategies for testing and distributing CLI applications.

## Tool Comparison

| Framework | Approach | Subcommands | Plugins | TypeScript DX | Best For |
|-----------|----------|-------------|---------|---------------|----------|
| **Commander** | Fluent API | Yes (nested) | No | Good (built-in types) | Simple to mid-complexity CLIs |
| **Yargs** | Builder/chaining | Yes | No (middleware) | Good (`@types/yargs`) | Complex option parsing, interactive |
| **oclif** | Class-based (OOP) | Yes (topics) | Yes (first-class) | Excellent (decorators) | Large, extensible CLIs (Heroku, Salesforce) |
| **Clipanion** | Class-based | Yes | No | Excellent (Yarn Berry's parser) | Type-safe, validation-heavy CLIs |
| **Citty** | Functional | Yes (nested) | No | Excellent (unjs ecosystem) | Lightweight, modern CLIs |

## Commander Deep Dive

Commander is the most popular Node.js CLI framework, with a fluent chainable API.

### Installation

```bash
npm install commander
```

### Basic Structure

```typescript
import { Command } from "commander";

const program = new Command();

program
  .name("my-cli")
  .description("A CLI tool built with Commander")
  .version("1.0.0");

// Simple command with options
program
  .command("greet")
  .description("Greet a user")
  .argument("<name>", "Name to greet")
  .option("-l, --loud", "Shout the greeting")
  .option("-t, --times <count>", "Number of times to greet", "1")
  .action((name: string, options: { loud?: boolean; times: string }) => {
    const greeting = options.loud ? `HELLO ${name.toUpperCase()}!` : `Hello, ${name}!`;
    const count = parseInt(options.times, 10);
    for (let i = 0; i < count; i++) {
      console.log(greeting);
    }
  });

program.parse();
```

### Subcommands

```typescript
// Nested subcommands
const deploy = program
  .command("deploy")
  .description("Deployment commands");

deploy
  .command("staging")
  .description("Deploy to staging")
  .option("--dry-run", "Preview without deploying")
  .action((options) => {
    console.log(options.dryRun ? "Dry run..." : "Deploying to staging...");
  });

deploy
  .command("production")
  .description("Deploy to production")
  .option("--force", "Skip confirmation")
  .action((options) => {
    if (!options.force) {
      console.log("Use --force to deploy to production");
      return;
    }
    console.log("Deploying to production...");
  });
```

### Option Types

```typescript
program
  .option("-d, --debug", "Enable debug mode")                    // boolean
  .option("-p, --port <number>", "Port number", "3000")          // string with default
  .option("-c, --config <path>", "Config file path")             // required value
  .option("-e, --env <values...>", "Environment variables")      // variadic
  .option("--no-color", "Disable color output")                  // negatable boolean
  .option("-v, --verbose", "Increase verbosity", (_, prev) => prev + 1, 0); // incremental
```

### Help and Version

```typescript
program
  .version("1.0.0", "-v, --version", "Show version number")
  .helpOption("-h, --help", "Show help")
  .addHelpText("after", "\nExamples:\n  $ my-cli greet Alice\n  $ my-cli deploy staging --dry-run");
```

## Yargs Deep Dive

Yargs provides a powerful builder pattern for complex CLIs with middleware and auto-completion.

### Installation

```bash
npm install yargs
npm install -D @types/yargs
```

### Basic Structure

```typescript
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

const argv = yargs(hideBin(process.argv))
  .scriptName("my-cli")
  .usage("$0 <command> [options]")
  .command(
    "greet <name>",
    "Greet a user",
    (yargs) => {
      return yargs
        .positional("name", {
          describe: "Name to greet",
          type: "string",
          demandOption: true,
        })
        .option("loud", {
          alias: "l",
          type: "boolean",
          describe: "Shout the greeting",
        });
    },
    (argv) => {
      const greeting = argv.loud
        ? `HELLO ${argv.name.toUpperCase()}!`
        : `Hello, ${argv.name}!`;
      console.log(greeting);
    }
  )
  .strict()                    // fail on unknown options
  .demandCommand(1)            // require at least one command
  .help()
  .alias("h", "help")
  .version()
  .alias("v", "version")
  .parse();
```

### Middleware

```typescript
yargs(hideBin(process.argv))
  .middleware([
    // Load config file before any command runs
    async (argv) => {
      if (argv.config) {
        const config = JSON.parse(await fs.readFile(argv.config, "utf-8"));
        Object.assign(argv, config);
      }
    },
    // Set up logging
    (argv) => {
      if (argv.verbose) {
        console.log("Verbose mode enabled");
      }
    },
  ])
  .option("config", { type: "string", describe: "Path to config file" })
  .option("verbose", { type: "boolean", default: false })
  .command(/* ... */)
  .parse();
```

### Shell Completion

```typescript
yargs(hideBin(process.argv))
  .completion("completion", "Generate shell completion script")
  .parse();
```

```bash
# Generate and install completion
my-cli completion >> ~/.bashrc
my-cli completion >> ~/.zshrc
```

### Strict Mode

```typescript
yargs(hideBin(process.argv))
  .strict()                        // error on unknown options
  .strictCommands()                // error on unknown commands
  .strictOptions()                 // error on unknown options (even in commands)
  .parse();
```

## oclif Deep Dive

oclif (Open CLI Framework) is Salesforce's framework for building large, production CLIs with a class-based, plugin-extensible architecture.

### Installation

```bash
npx oclif generate my-cli
cd my-cli
npm install
```

### Class-Based Commands

```typescript
import { Command, Flags, Args } from "@oclif/core";

export default class Greet extends Command {
  static description = "Greet a user";

  static examples = [
    "<%= config.bin %> greet Alice",
    "<%= config.bin %> greet Alice --loud",
  ];

  static args = {
    name: Args.string({
      description: "Name to greet",
      required: true,
    }),
  };

  static flags = {
    loud: Flags.boolean({
      char: "l",
      description: "Shout the greeting",
      default: false,
    }),
    times: Flags.integer({
      char: "t",
      description: "Number of times to greet",
      default: 1,
    }),
  };

  async run(): Promise<void> {
    const { args, flags } = await this.parse(Greet);
    const greeting = flags.loud
      ? `HELLO ${args.name.toUpperCase()}!`
      : `Hello, ${args.name}!`;

    for (let i = 0; i < flags.times; i++) {
      this.log(greeting);
    }
  }
}
```

### Plugins and Hooks

```jsonc
// package.json
{
  "oclif": {
    "plugins": [
      "@oclif/plugin-help",
      "@oclif/plugin-autocomplete",
      "@oclif/plugin-not-found",
      "@oclif/plugin-warn-if-update-available"
    ],
    "hooks": {
      "init": "./dist/hooks/init"
    },
    "topics": {
      "deploy": {
        "description": "Deployment commands"
      }
    }
  }
}
```

### Hook Implementation

```typescript
import { Hook } from "@oclif/core";

const hook: Hook<"init"> = async function (options) {
  // Runs before every command
  this.log(`Running ${options.id}`);
};

export default hook;
```

### Topics (Subcommand Groups)

oclif uses directory structure for subcommand grouping:

```
src/commands/
├── deploy/
│   ├── staging.ts      # my-cli deploy staging
│   └── production.ts   # my-cli deploy production
├── config/
│   ├── get.ts          # my-cli config get
│   └── set.ts          # my-cli config set
└── greet.ts            # my-cli greet
```

## Ink for React-Based TUI

Ink lets you build terminal UIs using React components.

### Installation

```bash
npm install ink react
npm install -D @types/react
```

### Basic App

```tsx
import React, { useState, useEffect } from "react";
import { render, Box, Text, useInput, useApp } from "ink";

function App() {
  const [counter, setCounter] = useState(0);
  const { exit } = useApp();

  useInput((input, key) => {
    if (input === "q") exit();
    if (key.upArrow) setCounter((c) => c + 1);
    if (key.downArrow) setCounter((c) => Math.max(0, c - 1));
  });

  return (
    <Box flexDirection="column" padding={1}>
      <Text bold color="green">
        Counter: {counter}
      </Text>
      <Text dimColor>
        Press Up/Down arrows to change, q to quit
      </Text>
    </Box>
  );
}

render(<App />);
```

### Ink Components

| Component | Purpose |
|-----------|---------|
| `<Box>` | Flexbox container (like `div`). Supports `flexDirection`, `padding`, `margin`, `borderStyle`. |
| `<Text>` | Styled text. Supports `bold`, `italic`, `underline`, `color`, `backgroundColor`, `dimColor`. |
| `<Newline>` | Renders a blank line. |
| `<Spacer>` | Flexible spacer that fills available space (like `flex: 1`). |
| `<Static>` | Renders items that should not be re-rendered (log output). |

### Ink Hooks

| Hook | Purpose |
|------|---------|
| `useInput(handler)` | Listen for keyboard input. Handler receives `(input, key)`. |
| `useApp()` | Access `{ exit }` to quit the app programmatically. |
| `useStdin()` | Read raw stdin data. |
| `useStdout()` | Access stdout dimensions and `write()`. |
| `useFocus()` | Manage focus for interactive elements. |
| `useFocusManager()` | Control focus programmatically. |

### Ink Spinner

```tsx
import Spinner from "ink-spinner";

function Loading() {
  return (
    <Text>
      <Text color="green"><Spinner type="dots" /></Text>
      {" Loading..."}
    </Text>
  );
}
```

## Chalk for Terminal Styling

Chalk provides chainable terminal color and styling.

### Installation

```bash
npm install chalk
```

### Usage

```typescript
import chalk from "chalk";

// Colors
console.log(chalk.red("Error!"));
console.log(chalk.green("Success!"));
console.log(chalk.blue.bold("Info"));
console.log(chalk.hex("#FFA500")("Orange text"));
console.log(chalk.rgb(255, 165, 0)("Also orange"));

// Backgrounds
console.log(chalk.bgRed.white(" ERROR "));
console.log(chalk.bgGreen.black(" PASS "));

// Modifiers
console.log(chalk.bold("Bold"));
console.log(chalk.dim("Dimmed"));
console.log(chalk.italic("Italic"));
console.log(chalk.underline("Underlined"));
console.log(chalk.strikethrough("Struck through"));

// Template literals (tagged template)
console.log(chalk`{red Error}: {green.bold Fixed} in {blue ${file}}`);

// Nesting
console.log(chalk.red("Red", chalk.bold("and bold"), "and red again"));

// Level detection
// chalk.level: 0 = no color, 1 = basic, 2 = 256 colors, 3 = truecolor
```

## Ora for Spinners

```typescript
import ora from "ora";

const spinner = ora("Loading...").start();

try {
  await doSomething();
  spinner.succeed("Done!");
} catch (error) {
  spinner.fail("Failed!");
}

// Spinner variants
spinner.text = "Still working...";     // update text
spinner.color = "yellow";              // change color
spinner.spinner = "dots";              // change style (dots, line, arc, etc.)
spinner.warn("Warning");              // yellow warning
spinner.info("Information");           // blue info
```

## Listr2 for Task Lists

```typescript
import { Listr } from "listr2";

const tasks = new Listr([
  {
    title: "Installing dependencies",
    task: async () => {
      await execAsync("npm install");
    },
  },
  {
    title: "Building project",
    task: async (ctx, task) => {
      task.output = "Compiling TypeScript...";
      await execAsync("npm run build");
    },
  },
  {
    title: "Running tests",
    task: async () => {
      await execAsync("npm test");
    },
    skip: (ctx) => ctx.skipTests && "Tests skipped by user",
  },
  {
    title: "Deploying",
    task: () => {
      return new Listr([
        { title: "Upload assets", task: async () => { /* ... */ } },
        { title: "Invalidate cache", task: async () => { /* ... */ } },
      ], { concurrent: true });    // nested tasks run in parallel
    },
  },
]);

await tasks.run({ skipTests: false });
```

## Inquirer / Prompts for Interactive Input

### @inquirer/prompts (modern, modular)

```typescript
import { input, select, confirm, checkbox, password } from "@inquirer/prompts";

const name = await input({ message: "What is your name?" });

const framework = await select({
  message: "Pick a framework",
  choices: [
    { name: "React", value: "react" },
    { name: "Vue", value: "vue" },
    { name: "Svelte", value: "svelte" },
  ],
});

const features = await checkbox({
  message: "Select features",
  choices: [
    { name: "TypeScript", value: "ts", checked: true },
    { name: "ESLint", value: "eslint" },
    { name: "Prettier", value: "prettier" },
  ],
});

const proceed = await confirm({ message: "Continue?" });

const secret = await password({ message: "Enter API key:", mask: "*" });
```

### prompts (lightweight alternative)

```typescript
import prompts from "prompts";

const response = await prompts([
  { type: "text", name: "name", message: "Project name?" },
  { type: "select", name: "lang", message: "Language?",
    choices: [
      { title: "TypeScript", value: "ts" },
      { title: "JavaScript", value: "js" },
    ],
  },
  { type: "confirm", name: "git", message: "Initialize git?" },
]);

console.log(response); // { name: "my-app", lang: "ts", git: true }
```

## Output Formatting

### JSON Mode

Provide a `--json` flag for machine-readable output:

```typescript
interface Result {
  status: string;
  items: string[];
}

function output(result: Result, json: boolean): void {
  if (json) {
    console.log(JSON.stringify(result, null, 2));
  } else {
    console.log(`Status: ${result.status}`);
    result.items.forEach((item) => console.log(`  - ${item}`));
  }
}
```

### Table Output with cli-table3

```typescript
import Table from "cli-table3";

const table = new Table({
  head: ["Name", "Version", "Status"],
  colWidths: [20, 10, 15],
  style: { head: ["cyan"] },
});

table.push(
  ["express", "4.18.2", "up to date"],
  ["typescript", "5.4.5", "outdated"],
  ["vitest", "1.6.0", "up to date"]
);

console.log(table.toString());
```

### Progress Bars with cli-progress

```typescript
import cliProgress from "cli-progress";

const bar = new cliProgress.SingleBar({
  format: "Progress |{bar}| {percentage}% | {value}/{total}",
  barCompleteChar: "\u2588",
  barIncompleteChar: "\u2591",
});

bar.start(100, 0);
for (let i = 0; i <= 100; i++) {
  bar.update(i);
  await sleep(50);
}
bar.stop();
```

## Exit Codes and Error Handling

### Standard Exit Codes

| Code | Meaning |
|------|---------|
| `0` | Success |
| `1` | General error |
| `2` | Misuse of command (invalid arguments) |
| `126` | Command found but not executable |
| `127` | Command not found |
| `130` | Terminated by Ctrl+C (SIGINT) |

### Error Handling Pattern

```typescript
class CLIError extends Error {
  constructor(
    message: string,
    public exitCode: number = 1,
    public showHelp: boolean = false
  ) {
    super(message);
    this.name = "CLIError";
  }
}

async function main(): Promise<void> {
  try {
    program.parse();
  } catch (error) {
    if (error instanceof CLIError) {
      console.error(chalk.red(`Error: ${error.message}`));
      if (error.showHelp) program.help();
      process.exit(error.exitCode);
    }
    // Unexpected errors
    console.error(chalk.red("Unexpected error:"), error);
    process.exit(1);
  }
}

// Handle SIGINT gracefully
process.on("SIGINT", () => {
  console.log(chalk.yellow("\nInterrupted. Cleaning up..."));
  // Perform cleanup
  process.exit(130);
});

// Handle unhandled rejections
process.on("unhandledRejection", (reason) => {
  console.error(chalk.red("Unhandled rejection:"), reason);
  process.exit(1);
});

main();
```

## CLI Testing Strategies

### Mock stdin/stdout

```typescript
import { describe, it, expect, vi } from "vitest";

describe("CLI", () => {
  it("should output greeting", async () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    // Simulate CLI invocation
    process.argv = ["node", "cli", "greet", "Alice"];
    await import("./cli.js");

    expect(consoleSpy).toHaveBeenCalledWith("Hello, Alice!");
    consoleSpy.mockRestore();
  });
});
```

### Snapshot Testing with execa

```typescript
import { describe, it, expect } from "vitest";
import { execa } from "execa";

describe("CLI integration", () => {
  it("should show help", async () => {
    const result = await execa("node", ["./dist/cli.js", "--help"]);
    expect(result.stdout).toMatchSnapshot();
    expect(result.exitCode).toBe(0);
  });

  it("should fail on invalid command", async () => {
    try {
      await execa("node", ["./dist/cli.js", "invalid"]);
    } catch (error: any) {
      expect(error.exitCode).toBe(1);
      expect(error.stderr).toContain("Unknown command");
    }
  });

  it("should greet user", async () => {
    const result = await execa("node", ["./dist/cli.js", "greet", "Alice"]);
    expect(result.stdout).toBe("Hello, Alice!");
  });
});
```

### Testing oclif Commands

```typescript
import { expect, test } from "@oclif/test";

describe("greet", () => {
  test
    .stdout()
    .command(["greet", "Alice"])
    .it("greets Alice", (ctx) => {
      expect(ctx.stdout).toContain("Hello, Alice!");
    });

  test
    .stdout()
    .command(["greet", "Alice", "--loud"])
    .it("greets Alice loudly", (ctx) => {
      expect(ctx.stdout).toContain("HELLO ALICE!");
    });
});
```

### Testing Ink Components

```typescript
import { describe, it, expect } from "vitest";
import { render } from "ink-testing-library";
import React from "react";
import { App } from "./App.js";

describe("App", () => {
  it("should render counter", () => {
    const { lastFrame } = render(<App />);
    expect(lastFrame()).toContain("Counter: 0");
  });

  it("should increment on up arrow", () => {
    const { lastFrame, stdin } = render(<App />);
    stdin.write("\u001B[A"); // up arrow
    expect(lastFrame()).toContain("Counter: 1");
  });
});
```

## Packaging CLIs

### npm bin (Standard)

The simplest distribution method. Add a `"bin"` field to `package.json`:

```jsonc
{
  "name": "my-cli",
  "bin": {
    "my-cli": "./dist/cli.js"
  },
  "files": ["dist"]
}
```

Ensure the entry file has a shebang:

```typescript
#!/usr/bin/env node
// dist/cli.js
import { program } from "./program.js";
program.parse();
```

Users install globally: `npm install -g my-cli`.

### Bun Compile (Single Binary)

```bash
# Compile to a standalone executable
bun build ./src/cli.ts --compile --outfile my-cli

# Cross-compile for other platforms
bun build ./src/cli.ts --compile --target=bun-linux-x64 --outfile my-cli-linux
bun build ./src/cli.ts --compile --target=bun-darwin-arm64 --outfile my-cli-macos
bun build ./src/cli.ts --compile --target=bun-windows-x64 --outfile my-cli.exe
```

### pkg (Node.js to Binary)

```bash
npm install -D @yao-pkg/pkg

# Compile for all platforms
npx pkg dist/cli.js --targets node18-linux-x64,node18-macos-arm64,node18-win-x64
```

### nexe (Node.js to Binary)

```bash
npm install -g nexe

nexe dist/cli.js -o my-cli --target linux-x64-18.0.0
```

### Docker Distribution

```dockerfile
FROM node:20-slim
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --production
COPY dist/ ./dist/
ENTRYPOINT ["node", "dist/cli.js"]
```

```bash
docker build -t my-cli .
docker run --rm my-cli greet Alice
```

## Best Practices

1. **Always provide `--help` and `--version` flags.** Users expect them and they cost nothing to implement.

2. **Use exit codes correctly.** Return `0` for success, `1` for general errors, and `2` for usage errors. Never `process.exit(0)` on failure.

3. **Support `--json` output** for machine-readable output alongside human-friendly defaults.

4. **Handle SIGINT gracefully.** Clean up temporary files and in-progress operations when the user presses Ctrl+C.

5. **Use stderr for errors and diagnostics, stdout for data.** This allows piping output without mixing in error messages: `my-cli list 2>/dev/null | jq .`.

6. **Respect `NO_COLOR` environment variable.** Check `process.env.NO_COLOR` and disable colors when set (chalk does this automatically).

7. **Validate input early.** Fail fast with clear error messages rather than crashing deep in business logic.

8. **Provide shell completion.** Use yargs `completion()` or oclif's `@oclif/plugin-autocomplete` to generate completion scripts.

9. **Test your CLI as a black box.** Use `execa` or similar to invoke the compiled binary and assert on stdout, stderr, and exit codes.

10. **Use `commander` for simple CLIs, `yargs` for complex option parsing, and `oclif` for large extensible tools.** Match the framework to the complexity of your project.
