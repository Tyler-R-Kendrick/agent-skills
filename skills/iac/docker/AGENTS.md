# Docker

## Overview
Docker packages applications into containers — lightweight, portable, and reproducible environments. Dockerfiles define how images are built, and Docker Compose orchestrates multi-container applications for local development.

## Multi-Stage Dockerfile
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
EXPOSE 3000
USER node
CMD ["node", "dist/index.js"]
```

## .NET Dockerfile
```dockerfile
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY *.csproj ./
RUN dotnet restore
COPY . .
RUN dotnet publish -c Release -o /app

FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app
COPY --from=build /app .
EXPOSE 8080
USER $APP_UID
ENTRYPOINT ["dotnet", "MyApp.dll"]
```

## Python Dockerfile
```dockerfile
FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 8000
USER nobody
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

## Docker Compose
```yaml
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://dev:devpass@db:5432/myapp
    depends_on:
      db:
        condition: service_healthy

  db:
    image: postgres:16
    environment:
      POSTGRES_USER: dev
      POSTGRES_PASSWORD: devpass
      POSTGRES_DB: myapp
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U dev"]
      interval: 5s
      timeout: 3s
      retries: 5

volumes:
  pgdata:
```

## Layer Caching
Order instructions from least to most frequently changing:
```dockerfile
# 1. Base image (rarely changes)
FROM node:22-alpine

# 2. System dependencies (rarely changes)
RUN apk add --no-cache curl

# 3. Package manifests (changes when deps change)
COPY package*.json ./
RUN npm ci

# 4. Application code (changes frequently)
COPY . .
RUN npm run build
```

## Key Commands
```bash
# Build an image
docker build -t my-app:latest .

# Run a container
docker run -p 3000:3000 my-app:latest

# Start Compose services
docker compose up -d

# View logs
docker compose logs -f app

# Stop and remove
docker compose down -v
```

## Best Practices
- Use multi-stage builds to keep production images small (build deps stay in build stage).
- Use specific version tags (`node:22-alpine`) not `latest` for reproducibility.
- Run as a non-root user (`USER node`, `USER nobody`, `USER $APP_UID`).
- Use `.dockerignore` to exclude `node_modules/`, `.git/`, and other unnecessary files.
- Copy dependency manifests before source code to leverage layer caching.
- Use `--no-cache-dir` for pip installs to reduce image size.
- Use `depends_on` with `condition: service_healthy` in Compose for startup ordering.
- Use named volumes for persistent data (databases) and bind mounts for development source code.
