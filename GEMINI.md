# Gemini Context & Rules for booking-fe

## Technology Stack
- **Framework:** React with Vite
- **Routing:** TanStack Router (`@tanstack/react-router`)
- **State Management:** TanStack Query (React Query)
- **Language:** TypeScript
- **Package Manager:** pnpm
- **Validation:** Zod
- **Frontend Database:** Dexie (IndexedDB) for MSW and mock backends.

## Architecture (Layered)
This project adheres to a strict layered architecture:
- **`ui/`**: React components, pages, hooks, queries, mutations, routing. (Can import from `app/`, `domain/`, `infra/`).
- **`app/`**: Application layer with DTOs, service interfaces, mappers between layers. (Can import from `domain/`).
- **`domain/`**: Pure business logic, Entities, specifications, domain interfaces. (**Cannot import from any other layer**).
- **`infra/`**: Implementations (DB models, MSW services, custom DI, API clients). (Can import from `app/`, `domain/`).

### Import Rules & Path Aliases
- **Do not use relative imports** (e.g., `../../../`). Use absolute path aliases like `domain/`, `app/`, `infra/`, `ui/`.

### Dependency Injection
- Do **not** use React Context for services. The project uses custom Dependency Injection (DI) to allow services to work outside React (e.g., in plain TypeScript classes or tests).
- Inject dependencies via the custom `inject()` utility or register them in `ui/app-config.ts`.

### Dual Services & Data Flow
- Every service typically has two implementations: `Api*Service` (real backend) and `Backend*Service` (Dexie-powered frontend mock backend).
- `MSW` intercepts API requests to serve the Dexie `Backend*Service` models during local development.

### Data Types: Entities vs DTOs vs Models
- **Entity (`domain/`)**: Pure business logic, immutable. Strict validation.
- **DTO (`app/`)**: Data transfer between API and UI. Graceful/loose validation.
- **Model (`infra/`)**: Database persistence model.
- Use Mappers (e.g., `*DomainDtoMapper`, `*DbDomainMapper`) to transition between these layers.

## Schema Validation Strategy (Zod)
- **Response DTOs (Lenient)**: Must *never* crash the UI. Do not use `.strict()`. Use `safeStringIdSchema`, `safeStringSchema`, and use `.nullable().catch(null)` for unknown/invalid enums and fields.
- **Domain Schemas (Strict)**: Must fail fast. Enforce business rules. Always use `.strict()`. Reject unknown properties and do not use `.catch()` fallbacks.

## Development Workflows
- **Package Manager:** Always use `pnpm` (e.g., `pnpm install`, `pnpm add`).
- **Dev Console:** During dev, open the browser console and type `devConsole.help()` for tools (e.g., `devConsole.db.seed()`, `devConsole.auth.login.asAdmin()`).
- **Seeders:** Found in `infra/db/seeders/`. Implement the `Seeder` interface and register in `ui/app-config.ts`.
- **Code Generation:** Refer to `API_GENERATION_QUICKSTART.md` and `OPENAPI_GENERATION.md` for generating API clients.
- **Linting:** Run `pnpm run lint` or `oxlint` before finalizing changes.

## Documentation Guidelines
- Add feature docs to `docs/features/` and API docs to `docs/api/`.
- File naming: `kebab-case.md`.
- Use the provided templates: `docs/features/feature-template.md` and `docs/api/http-template.md`.
