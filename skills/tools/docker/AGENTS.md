# Docker & Containers

## Overview

Containers package an application with all its dependencies into a portable, reproducible unit. Docker is the dominant container runtime; Podman is a daemonless, rootless alternative with Docker CLI compatibility. Containers are the foundation of modern deployment workflows, enabling consistent environments from development through production.

## Docker vs Podman

| Feature              | Docker                     | Podman                              |
|----------------------|----------------------------|--------------------------------------|
| Daemon               | dockerd required           | Daemonless                           |
| Rootless             | Supported                  | Default                              |
| CLI Compatibility    | `docker`                   | `podman` / `alias docker=podman`     |
| Compose              | docker compose v2          | podman-compose                       |
| OCI Compliant        | Yes                        | Yes                                  |
| Systemd Integration  | Limited                    | Native with quadlets                 |
| Build Tool           | BuildKit                   | Buildah (integrated)                 |

---

## Dockerfile

### Common Instructions

| Instruction    | Purpose                                    | Example                                          |
|----------------|--------------------------------------------|--------------------------------------------------|
| `FROM`         | Set base image                             | `FROM node:22-alpine`                            |
| `RUN`          | Execute command during build               | `RUN npm ci`                                     |
| `COPY`         | Copy files from host to image              | `COPY package.json ./`                           |
| `ADD`          | Copy files (supports URLs, tar extraction) | `ADD app.tar.gz /app`                            |
| `WORKDIR`      | Set working directory                      | `WORKDIR /app`                                   |
| `ENV`          | Set environment variable                   | `ENV NODE_ENV=production`                        |
| `ARG`          | Build-time variable                        | `ARG VERSION=latest`                             |
| `EXPOSE`       | Document container port                    | `EXPOSE 3000`                                    |
| `CMD`          | Default command (overridable)              | `CMD ["node", "server.js"]`                      |
| `ENTRYPOINT`   | Main executable (not easily overridden)    | `ENTRYPOINT ["python", "app.py"]`                |
| `USER`         | Set runtime user                           | `USER node`                                      |
| `HEALTHCHECK`  | Container health check                     | `HEALTHCHECK CMD curl -f http://localhost:3000/` |
| `LABEL`        | Add metadata                               | `LABEL maintainer="team@example.com"`            |

### Example: Node.js Application

```dockerfile
FROM node:22-alpine

WORKDIR /app

# Copy dependency files first (better layer caching)
COPY package.json package-lock.json ./
RUN npm ci --only=production

# Copy application code
COPY src/ ./src/

# Create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
    CMD wget -qO- http://localhost:3000/health || exit 1

CMD ["node", "src/server.js"]
```

### Example: Python Application

```dockerfile
FROM python:3.12-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy application
COPY . .

# Non-root user
RUN useradd --create-home appuser
USER appuser

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

---

## Multi-Stage Builds

Multi-stage builds produce smaller production images by separating the build environment from the runtime environment. Build tools, source code, and intermediate artifacts are left behind in the build stage.

```dockerfile
# Stage 1: Build
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Production
FROM node:22-alpine
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./

USER node
EXPOSE 3000
CMD ["node", "dist/index.js"]
```

### Go Application (Scratch Base)

```dockerfile
FROM golang:1.22-alpine AS build
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o server .

FROM scratch
COPY --from=build /app/server /server
COPY --from=build /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
EXPOSE 8080
ENTRYPOINT ["/server"]
```

---

## Image Optimization

| Technique                           | Impact                                                |
|-------------------------------------|-------------------------------------------------------|
| Use alpine/slim base images         | 5-10x smaller than full images                        |
| Multi-stage builds                  | Remove build dependencies from production image       |
| Order layers for cache              | COPY package.json before source code                  |
| Combine RUN commands                | Fewer layers, smaller image                           |
| Use .dockerignore                   | Exclude unnecessary files from build context          |
| Use specific tags, not `:latest`    | Reproducible builds, predictable behavior             |
| Clean up in the same RUN layer      | `RUN apt install -y pkg && rm -rf /var/lib/apt/lists/*` |
| Pin base image by SHA digest        | Immutable, tamper-proof base images                   |

### Layer Caching Example

```dockerfile
# GOOD: Dependencies change less often than source code
COPY package.json package-lock.json ./
RUN npm ci
COPY . .

# BAD: Any source change invalidates the npm ci cache
COPY . .
RUN npm ci
```

---

## Docker Compose

Docker Compose defines multi-container applications in a single YAML file.

### Example: Web App + Database + Redis

```yaml
# docker-compose.yml
services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://user:pass@db:5432/myapp
      - REDIS_URL=redis://redis:6379
    depends_on:
      db:
        condition: service_healthy
      redis:
        condition: service_started
    volumes:
      - ./src:/app/src    # Dev: mount source for hot reload
    networks:
      - app-network
    restart: unless-stopped

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: myapp
    volumes:
      - postgres-data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U user -d myapp"]
      interval: 10s
      timeout: 5s
      retries: 5
    networks:
      - app-network

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis-data:/data
    networks:
      - app-network

volumes:
  postgres-data:
  redis-data:

networks:
  app-network:
    driver: bridge
```

### Common Compose Commands

```bash
# Start all services in detached mode
docker compose up -d

# Stop and remove containers
docker compose down

# Stop, remove containers, and delete volumes
docker compose down -v

# View logs
docker compose logs
docker compose logs -f web    # Follow logs for specific service

# Rebuild images
docker compose build
docker compose up -d --build

# Scale a service
docker compose up -d --scale web=3

# Run a one-off command
docker compose exec web sh
docker compose run --rm web npm test

# List running services
docker compose ps
```

---

## Common Commands

### Images

```bash
# Build an image
docker build -t myapp:1.0 .
docker build -t myapp:1.0 -f Dockerfile.prod .

# Build with BuildKit (recommended)
DOCKER_BUILDKIT=1 docker build -t myapp:1.0 .

# Pull an image
docker pull nginx:alpine

# Push to a registry
docker tag myapp:1.0 registry.example.com/myapp:1.0
docker push registry.example.com/myapp:1.0

# List images
docker images

# Remove an image
docker rmi myapp:1.0

# Inspect image details
docker inspect myapp:1.0

# View image history (layers)
docker history myapp:1.0
```

### Containers

```bash
# Run a container
docker run -d --name web -p 3000:3000 myapp:1.0

# Run interactively
docker run -it --rm ubuntu:22.04 bash

# Run with environment variables
docker run -d --name web -e NODE_ENV=production -p 3000:3000 myapp:1.0

# Execute a command in a running container
docker exec -it web sh
docker exec web cat /etc/os-release

# Stop / start / restart
docker stop web
docker start web
docker restart web

# Remove a container
docker rm web
docker rm -f web    # Force remove running container

# List containers
docker ps           # Running only
docker ps -a        # All (including stopped)

# View logs
docker logs web
docker logs -f web          # Follow
docker logs --tail 100 web  # Last 100 lines

# Copy files to/from container
docker cp web:/app/data.json ./data.json
docker cp ./config.yml web:/app/config.yml
```

### Volumes

```bash
# Create a named volume
docker volume create mydata

# List volumes
docker volume ls

# Remove a volume
docker volume rm mydata

# Run with a named volume
docker run -d -v mydata:/app/data myapp:1.0

# Run with a bind mount
docker run -d -v $(pwd)/src:/app/src myapp:1.0

# Run with a read-only bind mount
docker run -d -v $(pwd)/config:/app/config:ro myapp:1.0
```

**Named Volumes vs Bind Mounts:**
- **Named volumes** — managed by Docker, persist across container restarts, portable, use for databases and persistent data
- **Bind mounts** — map a host directory into the container, use for development (hot reloading source code)

### Networks

```bash
# Create a network
docker network create mynet

# List networks
docker network ls

# Run container on a specific network
docker run -d --name web --network mynet myapp:1.0

# Connect a running container to a network
docker network connect mynet web

# Inspect a network
docker network inspect mynet
```

**Network Drivers:**
- **bridge** — default, isolated network for containers on a single host
- **host** — share host network stack (no isolation, best performance)
- **none** — no networking

### System Maintenance

```bash
# Remove unused data (stopped containers, dangling images, unused networks)
docker system prune

# Also remove unused volumes
docker system prune --volumes

# Show disk usage
docker system df

# Remove build cache
docker builder prune

# Remove all unused images (not just dangling)
docker image prune -a
```

---

## Container Security

### Run as Non-Root User

```dockerfile
# Create a non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser
```

### Read-Only File System

```bash
docker run --read-only --tmpfs /tmp myapp:1.0
```

### Drop Capabilities

```bash
docker run --cap-drop ALL --cap-add NET_BIND_SERVICE myapp:1.0
```

### No Privileged Mode

```bash
# NEVER use --privileged in production
# Instead, add only the specific capabilities needed
docker run --cap-add SYS_PTRACE myapp:1.0
```

### Scan Images

```bash
# Trivy — open-source vulnerability scanner
trivy image myapp:1.0

# Docker Scout (built into Docker Desktop)
docker scout cves myapp:1.0

# Scan during CI
trivy image --exit-code 1 --severity HIGH,CRITICAL myapp:1.0
```

### Use Distroless or Scratch Base Images

```dockerfile
# Distroless — minimal base with no shell, no package manager
FROM gcr.io/distroless/static-debian12
COPY --from=build /app/server /server
CMD ["/server"]

# Scratch — empty base image (for statically compiled binaries)
FROM scratch
COPY --from=build /app/server /server
CMD ["/server"]
```

### Secrets Handling

```bash
# Docker secrets (Swarm mode)
echo "my-secret-value" | docker secret create db_password -

# BuildKit secrets (build-time only, not stored in image layers)
docker build --secret id=mysecret,src=./secret.txt .
```

```dockerfile
# Use secret during build (not persisted in image)
RUN --mount=type=secret,id=mysecret cat /run/secrets/mysecret
```

**Never use ENV for secrets** — environment variables are visible in `docker inspect` and image history.

---

## Registries

| Registry                          | Provider        | Key Feature                         |
|-----------------------------------|-----------------|-------------------------------------|
| Docker Hub                        | Docker          | Default public registry             |
| GitHub Container Registry (ghcr.io) | GitHub        | Integrated with GitHub Actions      |
| AWS ECR                           | Amazon          | Integrated with AWS IAM             |
| Azure ACR                         | Microsoft       | Integrated with Azure AD            |
| GCP Artifact Registry             | Google          | Multi-format (Docker, npm, Maven)   |
| Harbor                            | CNCF / self-hosted | Enterprise self-hosted registry  |

### Pushing to a Registry

```bash
# Docker Hub
docker login
docker tag myapp:1.0 username/myapp:1.0
docker push username/myapp:1.0

# GitHub Container Registry
echo $GITHUB_TOKEN | docker login ghcr.io -u USERNAME --password-stdin
docker tag myapp:1.0 ghcr.io/username/myapp:1.0
docker push ghcr.io/username/myapp:1.0

# AWS ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 123456789.dkr.ecr.us-east-1.amazonaws.com
docker tag myapp:1.0 123456789.dkr.ecr.us-east-1.amazonaws.com/myapp:1.0
docker push 123456789.dkr.ecr.us-east-1.amazonaws.com/myapp:1.0
```

---

## .dockerignore

A `.dockerignore` file excludes files from the build context, reducing build time and image size.

```
# Version control
.git
.gitignore

# Dependencies (rebuilt in container)
node_modules
vendor
__pycache__
*.pyc
bin/
obj/

# Environment and secrets
.env
.env.*
*.pem
*.key

# IDE and OS files
.vscode
.idea
*.swp
.DS_Store
Thumbs.db

# Documentation
*.md
LICENSE
docs/

# Docker files (not needed inside the image)
docker-compose*.yml
Dockerfile*
.dockerignore

# Build artifacts
dist/
build/
coverage/
.nyc_output/

# Tests (if not running tests in container)
test/
tests/
*.test.js
*.spec.js
```

---

## Best Practices

1. **Use multi-stage builds** — Separate build and runtime stages to keep production images small and free of build tools and source code.
2. **Pin base image versions with SHA** — Use `FROM node:22-alpine@sha256:abc123...` for immutable, reproducible builds that cannot be affected by upstream tag changes.
3. **Run as non-root** — Always add a `USER` instruction to run the container process as a non-root user for defense in depth.
4. **Use .dockerignore** — Exclude unnecessary files from the build context to speed up builds and avoid leaking secrets into images.
5. **Scan images in CI** — Integrate Trivy or Docker Scout into your CI pipeline to catch vulnerabilities before deployment.
6. **Use health checks** — Add `HEALTHCHECK` instructions so orchestrators can detect and replace unhealthy containers automatically.
7. **Prefer COPY over ADD** — `COPY` is explicit and predictable; `ADD` has implicit behaviors (URL fetching, tar extraction) that can surprise you.
8. **Keep images small** — Use alpine/slim bases, clean up package manager caches in the same `RUN` layer, and avoid installing unnecessary packages.
