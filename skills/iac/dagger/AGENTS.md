# Dagger

## Overview
Dagger is an open-source runtime for composable software workflows. It lets you write CI/CD pipelines in real programming languages (TypeScript, Python, Go) that run in containers, providing automatic caching, reproducibility, and portability across local dev and CI environments.

## Core Concepts
- **Functions** — typed, cacheable units of work that run in containers
- **Modules** — collections of related functions, shareable and composable
- **Dagger Engine** — runs functions in containers with automatic caching

## TypeScript Example
```typescript
import { dag, Container, Directory, object, func } from "@dagger.io/dagger";

@object()
class MyPipeline {
  @func()
  async build(source: Directory): Promise<Container> {
    return dag
      .container()
      .from("node:22")
      .withDirectory("/app", source)
      .withWorkdir("/app")
      .withExec(["npm", "ci"])
      .withExec(["npm", "run", "build"]);
  }

  @func()
  async test(source: Directory): Promise<string> {
    return this.build(source)
      .then(ctr => ctr.withExec(["npm", "test"]).stdout());
  }

  @func()
  async publish(source: Directory, tag: string): Promise<string> {
    const built = await this.build(source);
    return built
      .withEntrypoint(["node", "dist/index.js"])
      .publish(`ttl.sh/my-app:${tag}`);
  }
}
```

## Python Example
```python
import dagger
from dagger import dag, function, object_type

@object_type
class MyPipeline:
    @function
    async def build(self, source: dagger.Directory) -> dagger.Container:
        return (
            dag.container()
            .from_("python:3.12")
            .with_directory("/app", source)
            .with_workdir("/app")
            .with_exec(["pip", "install", "-r", "requirements.txt"])
        )

    @function
    async def test(self, source: dagger.Directory) -> str:
        return await (
            (await self.build(source))
            .with_exec(["pytest"])
            .stdout()
        )
```

## CLI Usage
```bash
# Initialize a new Dagger module
dagger init --sdk=typescript

# Call a function
dagger call build --source=.

# Run tests
dagger call test --source=.

# Publish a container
dagger call publish --source=. --tag=latest
```

## Key Features
| Feature | Description |
|---------|-------------|
| **Automatic caching** | Every function result is cached by inputs; unchanged steps are skipped |
| **Container isolation** | Functions run in containers, ensuring reproducibility |
| **Type safety** | Full type checking from your language's SDK |
| **Composability** | Call functions from other modules |
| **Local + CI parity** | Same pipeline runs identically on your laptop and in CI |

## Using Existing Modules
```bash
# Use a community module
dagger call -m github.com/dagger/dagger/modules/wolfi container --packages=curl,git
```

## Best Practices
- Write functions as small, composable units — each function should do one thing.
- Use `withDirectory` to pass source code into containers rather than bind-mounting.
- Leverage automatic caching — structure functions so unchanged inputs skip work.
- Use `dagger call` locally to test pipelines before pushing to CI.
- Use Dagger modules from the community instead of reimplementing common tasks (linting, testing, publishing).
- Keep secrets out of function arguments — use Dagger's `Secret` type for sensitive values.
