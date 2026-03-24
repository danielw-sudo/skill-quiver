---
name: fullstack-dev
type: execution
description: |
  Full-stack backend architecture and frontend-backend integration guide.
  TRIGGER when: building a full-stack app, creating REST API with frontend, scaffolding backend service,
  building todo app, building CRUD app, building real-time app, building chat app,
  Express + React, Next.js API, Node.js backend, Python backend, Go backend,
  designing service layers, implementing error handling, managing config/auth,
  setting up API clients, implementing auth flows, handling file uploads,
  adding real-time features (SSE/WebSocket), hardening for production.
  DO NOT TRIGGER when: pure frontend UI work, pure CSS/styling, database schema only.
license: MIT
metadata:
  category: full-stack
  version: "1.0.0"
  sources:
    - The Twelve-Factor App (12factor.net)
    - Clean Architecture (Robert C. Martin)
    - Domain-Driven Design (Eric Evans)
    - Patterns of Enterprise Application Architecture (Martin Fowler)
    - Martin Fowler (Testing Pyramid, Contract Tests)
    - Google SRE Handbook (Release Engineering)
    - ThoughtWorks Technology Radar
---

# Full-Stack Development Practices

## MANDATORY WORKFLOW

### Step 0: Gather Requirements
Clarify or infer: **Stack** (language/framework), **Service type** (API-only / monolith / microservice), **Database** (SQL / NoSQL), **Integration** (REST / GraphQL / tRPC / gRPC), **Real-time** (SSE / WebSocket / polling), **Auth** (JWT / session / OAuth / third-party). Skip if already specified.

### Step 1: Architectural Decisions
State decisions (1 sentence each): project structure, API client approach, auth strategy, real-time method, error handling.

### Step 2: Scaffold with Checklist (below)
### Step 3: Implement following patterns in this document
### Step 4: Build check, smoke test endpoints, verify CORS/auth, real-time sync
### Step 5: Handoff — what was built, how to run, what's next, key files

---

## Checklists

**Backend Service:**
- [ ] Feature-first structure, centralized config with env validation (fail fast)
- [ ] Typed error hierarchy + global error handler middleware
- [ ] Structured JSON logging with request ID propagation
- [ ] DB migrations, connection pooling, input validation on all endpoints
- [ ] Auth middleware, health checks (`/health`, `/ready`), graceful shutdown
- [ ] CORS (explicit origins), security headers, `.env.example` committed

**Frontend-Backend Integration:**
- [ ] Typed API client, base URL from env var, auth token auto-attached
- [ ] API errors mapped to user messages, loading states handled
- [ ] Type safety across boundary (shared types / OpenAPI / tRPC)
- [ ] Refresh token flow (httpOnly cookie + transparent 401 retry)

---

## Core Rules

1. Organize by FEATURE, not by technical layer
2. Controllers: no business logic. Services: no HTTP types. Repos: no business logic.
3. All config from env vars, validated at startup, fail fast
4. Every error is typed, logged, returns consistent format
5. All input validated at boundary — trust nothing from client
6. Structured JSON logging with request ID — not console.log

## 1. Project Structure

```
Feature-first (recommended):       NOT layer-first:
src/orders/                        src/controllers/order.controller.ts
  order.controller|service|repo    src/services/order.service.ts
src/users/...                      src/repositories/...
src/shared/database|middleware
```

**Three layers:** Controller (HTTP) -> Service (Business Logic) -> Repository (Data Access)

**DI:** Inject interfaces via constructor in all languages.

## 2. Configuration

Centralized, typed, fail-fast. Use `pydantic_settings.BaseSettings` (Python) or `requiredEnv()` helper (TS). Commit `.env.example`, never `.env`. No `process.env` / `os.environ` scattered in code.

## 3. Error Handling

Typed hierarchy: `AppError(message, code, statusCode)` -> `NotFoundError`, `ValidationError`, etc. Global handler: operational errors -> structured JSON response; programming errors -> log + generic 500. Never catch silently, never return stack traces, retry transient failures with backoff.

## 4. Database Access

- Schema changes via migrations only (Prisma/Alembic/golang-migrate). Must be reversible.
- Prevent N+1: use `include`/`select_related`/JOINs, not loops.
- Wrap multi-step writes in transactions.
- Pool size: `(cores x 2) + spindles`, start 10-20. Use PgBouncer for serverless.

## 5. API Client Decision

| Approach | When | Type Safety | Effort |
|----------|------|-------------|--------|
| Typed fetch wrapper | Simple apps, small teams | Manual | Low |
| React Query + fetch | React apps, server state | Manual | Medium |
| tRPC | Same team, TS both sides | Automatic | Low |
| OpenAPI generated | Public API, multi-consumer | Automatic | Medium |
| GraphQL codegen | GraphQL APIs | Automatic | Medium |

## 6. Auth & Middleware

**Middleware order:** RequestID -> Logging -> CORS -> RateLimit -> BodyParse -> Auth -> Authz -> Validation -> Handler -> ErrorHandler

**JWT rules:** Short expiry access (15min) + server-stored refresh. Minimal claims. Rotate keys. Never localStorage (XSS). Never in URL params. RBAC via `authorize(...roles)` middleware.

**Token refresh:** Catch 401 -> POST `/api/auth/refresh` (credentials: include) -> set new token -> retry original request.

## 7. Logging

Structured JSON. Request ID in every entry. Log at layer boundaries. Levels: error/warn/info (production), debug (dev only). Never log passwords, tokens, PII.

## 8. Background Jobs

All jobs IDEMPOTENT. Failed -> retry (max 3) -> dead letter queue -> alert. Workers as separate processes. Never long tasks in request handlers.

## 9. Caching

Cache-aside: check cache -> miss -> query DB -> set with TTL -> return. ALWAYS set TTL. Invalidate on write. Never cache authoritative state.

| Data Type | TTL |
|-----------|-----|
| User profile | 5-15 min |
| Product catalog | 1-5 min |
| Config / flags | 30-60 sec |

## 10. File Uploads

| Method | File Size | Server Load | Complexity |
|--------|-----------|-------------|------------|
| Presigned URL (recommended) | Any (> 5MB) | None (direct to storage) | Medium |
| Multipart | < 10MB | High | Low |
| Chunked / Resumable | > 100MB | Medium | High |

Presigned flow: GET presign URL -> PUT direct to S3 -> POST reference to API.

## 11. Real-Time

| Method | Direction | Complexity | When |
|--------|-----------|------------|------|
| Polling | Client -> Server | Low | Simple status, < 10 clients |
| SSE | Server -> Client | Medium | Notifications, feeds, AI streaming |
| WebSocket | Bidirectional | High | Chat, collaboration, gaming |

## 12. Cross-Boundary Errors

Map API status to user messages (401: "Please log in", 403: "No permission", 404: "Not found", 422: field errors, 429: "Too many requests"). Auto-retry 5xx (max 3, backoff), never 4xx. Redirect to login when refresh fails. Show offline banner on TypeError.

## Anti-Patterns

| Don't | Do Instead |
|-------|------------|
| Business logic in controllers | Service layer |
| `process.env` everywhere | Centralized typed config |
| `console.log` | Structured JSON logger |
| Generic `Error('oops')` | Typed error hierarchy |
| DB calls in controllers | Repository pattern |
| No input validation | Validate at boundary |
| Hardcoded API URL | Environment variable |
| JWT in localStorage | Memory + httpOnly refresh cookie |
| Raw API errors to users | Human-readable messages |
| Retry 4xx | Only retry 5xx |
| Large files through API | Presigned URL -> S3 |
| Poll for real-time | SSE or WebSocket |

## References

| Topic | File |
|-------|------|
| Testing strategy | [references/testing-strategy.md](references/testing-strategy.md) |
| Release checklist | [references/release-checklist.md](references/release-checklist.md) |
| Tech stack selection | [references/technology-selection.md](references/technology-selection.md) |
| Django/DRF patterns | [references/django-best-practices.md](references/django-best-practices.md) |
| API design (REST/GraphQL/gRPC) | [references/api-design.md](references/api-design.md) |
| DB schema & migrations | [references/db-schema.md](references/db-schema.md) |
| Auth flow (JWT/refresh/RBAC) | [references/auth-flow.md](references/auth-flow.md) |
| CORS & env management | [references/environment-management.md](references/environment-management.md) |
