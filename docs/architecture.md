# CA App Architecture Guide

A quick-start guide to understanding the architecture before contributing to the project.

---

## 🏗️ Layer Architecture

```text
┌─────────────────────────────────────────────────────────────┐
│                         UI Layer                            │
│  (React components, pages, hooks, queries, mutations)       │
│                                                             │
│  • Can import from: app, domain, infra                      │
│  • Contains: Components, pages, routing, React-specific     │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                    Application Layer                        │
│        (DTOs, service interfaces, mappers)                  │
│                                                             │
│  • Can import from: domain                                  │
│  • Contains: Service contracts, DTOs for API/UI,            │
│    mappers between layers                                   │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                      Domain Layer                           │
│    (Entities, value objects, repo interfaces, schemas)      │
│                                                             │
│  • Can import from: NOTHING (pure domain logic)             │
│  • Contains: Business entities, domain rules,               │
│    repository interfaces, specifications                    │
└─────────────────────────────────────────────────────────────┘
                              ↑
┌─────────────────────────────────────────────────────────────┐
│                   Infrastructure Layer                      │
│   (DI, DB, API clients, MSW, crypto, error handling)        │
│                                                             │
│  • Can import from: app, domain                             │
│  • Contains: All implementations - database repos,          │
│    API services, dependency injection, mocks                │
└─────────────────────────────────────────────────────────────┘
```

### Import Rules

| Layer     | Can Import From             | Purpose                                                |
| --------- | --------------------------- | ------------------------------------------------------ |
| `domain/` | **Nothing**                 | Pure business logic, no external dependencies          |
| `app/`    | `domain/`                   | Application-specific contracts and data transformation |
| `infra/`  | `app/`, `domain/`           | Real-world implementations (API, DB, DI, etc.)         |
| `ui/`     | `app/`, `domain/`, `infra/` | React components and user interface                    |

---

## 🔄 Data Flow: Reading Data (Query)

When you want to **fetch data** (e.g., get a list of users):

```text
┌──────────────────────────────────────────────────────────────────┐
│ 1. UI Layer                                                      │
│    Component calls: useInfiniteQuery(getInfiniteUsersQueryOptions)│
└────────────────────────────┬─────────────────────────────────────┘
                             ↓
┌──────────────────────────────────────────────────────────────────┐
│ 2. Query Definition (ui/queries)                                 │
│    Resolves service from injector:                               │
│    injector.get("api-user-service")                              │
└────────────────────────────┬─────────────────────────────────────┘
                             ↓
┌──────────────────────────────────────────────────────────────────┐
│ 3. MSW Intercepts Request                                        │
│    MswUserController catches HTTP request                        │
│    Routes to: BackendUserService                                 │
└────────────────────────────┬─────────────────────────────────────┘
                             ↓
┌──────────────────────────────────────────────────────────────────┐
│ 4. Backend Mock Service (infra/db/services)                      │
│    BackendUserService.getAll()                                   │
│    • Validates request (DTOs)                                    │
│    • Calls BackendUserRepo                                       │
└────────────────────────────┬─────────────────────────────────────┘
                             ↓
┌──────────────────────────────────────────────────────────────────┐
│ 5. Repository (infra/db/repos)                                   │
│    BackendUserRepo.getAll()                                      │
│    • Queries Dexie (IndexedDB)                                   │
│    • Maps UserModel → UserEntity                                 │
└────────────────────────────┬─────────────────────────────────────┘
                             ↓
┌──────────────────────────────────────────────────────────────────┐
│ 6. Response Transformation                                       │
│    • UserEntity → UserDto (via mapper)                           │
│    • Returns to UI as PaginatedUserListResponse                  │
└──────────────────────────────────────────────────────────────────┘
```

**Key Points:**

- MSW intercepts API calls in development/storybook
- Backend services simulate real backend behavior with full business logic
- Repository handles database operations with Dexie (IndexedDB)
- Mappers transform data between layers

---

## 📝 Data Flow: Writing Data (Mutation)

When you want to **create or update data** (e.g., create a new user):

```text
┌──────────────────────────────────────────────────────────────────┐
│ 1. UI Layer                                                      │
│    Component calls: createUserMutation.mutate(formData)          │
└────────────────────────────┬─────────────────────────────────────┘
                             ↓
┌──────────────────────────────────────────────────────────────────┐
│ 2. Mutation Hook (ui/mutations)                                  │
│    Resolves service: injector.get("api-user-service")            │
│    Calls: service.create(data)                                   │
└────────────────────────────┬─────────────────────────────────────┘
                             ↓
┌──────────────────────────────────────────────────────────────────┐
│ 3. MSW Intercepts POST Request                                   │
│    MswUserController.#createUser()                               │
│    • Validates auth token (via BackendAuthGuard)                 │
│    • Validates request body (CreateUserRequest schema)           │
│    • Routes to: BackendUserService.create()                      │
└────────────────────────────┬─────────────────────────────────────┘
                             ↓
┌──────────────────────────────────────────────────────────────────┐
│ 4. Backend Mock Service                                          │
│    BackendUserService.create()                                   │
│    • Creates UserEntity (domain logic + validation)              │
│    • Calls BackendUserRepo.add(entity)                           │
└────────────────────────────┬─────────────────────────────────────┘
                             ↓
┌──────────────────────────────────────────────────────────────────┐
│ 5. Repository Persistence                                        │
│    BackendUserRepo.add()                                         │
│    • Maps UserEntity → UserModel                                 │
│    • Saves to Dexie (IndexedDB)                                  │
└────────────────────────────┬─────────────────────────────────────┘
                             ↓
┌──────────────────────────────────────────────────────────────────┐
│ 6. Response & Cache Invalidation                                 │
│    • Returns UserDto to UI                                       │
│    • React Query invalidates related queries                     │
│    • UI updates automatically                                    │
└──────────────────────────────────────────────────────────────────┘
```

**Key Points:**

- Mutations go through the same MSW mock layer
- Domain entities enforce business rules (validation, immutability)
- Repository handles persistence mapping
- React Query automatically updates UI via cache invalidation

---

## 🎯 Key Concepts

### 1. **Why Custom Dependency Injection?**

React Context forces everything into React components. Our DI allows:

- ✅ Using services in plain TypeScript classes
- ✅ Testing with mock dependencies
- ✅ Flexible service resolution outside React tree

```typescript
class MyService {
  readonly #userRepo = inject("backend-user-repo");

  // Can be used anywhere, not just in React components
}
```

### 2. **Why Frontend Database (Dexie)?**

The frontend database serves multiple purposes:

- **During Development:** Backend is delayed, we need rich mocks
- **For Testing:** Storybook interaction tests work with real data
- **Domain Logic:** Business rules stay in frontend, clear for all devs
- **Client State:** Manage auth tokens and local state

**Tables:**

- `authTokens` - Client-side auth state
- `users`, `auth`, `passwordHashes` - Backend mocks

### 3. **Dual Service Implementations**

Every service has **two implementations** of the same interface:

```typescript
interface UserService {
  getAll(): Promise<UserDto[]>;
  // ... other methods
}

// Real backend (for production)
class ApiUserService implements UserService {
  // Calls real HTTP API
}

// Mock backend (for development/testing)
class BackendUserService implements UserService {
  // Uses Dexie database with full business logic
}
```

**Currently active:** `BackendUserService` (mocks) **Future:** Switch to `ApiUserService` when
backend is ready

### 4. **Entities vs DTOs vs Models**

| Type       | Layer     | Purpose                   | Example      |
| ---------- | --------- | ------------------------- | ------------ |
| **Entity** | `domain/` | Business logic, immutable | `UserEntity` |
| **DTO**    | `app/`    | Data transfer (API ↔ UI) | `UserDto`    |
| **Model**  | `infra/`  | Database persistence      | `UserModel`  |

**Mappers** transform between types:

- `UserDbDomainMapper`: Model ↔ Entity
- `UserDomainDtoMapper`: Entity ↔ DTO

---

## 📋 Schema Validation Strategy

The application uses **Zod** for runtime type validation with different validation strategies for
different layers.

### Core Principles

1. **Response DTOs should be graceful** - Never crash the UI due to unexpected API response data
2. **Domain schemas should be strict** - Enforce business rules and data integrity at domain
   boundaries
3. **UI should handle missing/invalid data** - Display fallbacks or partial information when data is
   incomplete

### Response DTO Schemas (Non-Strict)

DTOs for API responses should be **lenient** and handle unexpected or invalid data gracefully.

**Rules:**

- **Do NOT use `.strict()`** - Allow unknown fields to pass through
- **Use `safeStringIdSchema`** for ID fields (handles string/number coercion)
- **Use `safeStringSchema`** for all string fields (including email, etc.)
- **Use `.nullable().catch(null)`** for all fields that might be missing or invalid
- **Enums MUST use `.nullable().catch(null)`** pattern

**Rationale:**

- API responses can evolve over time (new fields added, deprecated fields removed)
- Third-party data sources may have inconsistencies
- Network issues or partial data shouldn't crash the UI
- The frontend should degrade gracefully and show what it can

**Example:**

```typescript
import { safeStringIdSchema, safeStringSchema } from "nmp-common/zod-schemas";

const UserDtoSchema = z.object({
  id: safeStringIdSchema, // Handles UUIDs and numeric IDs safely
  firstName: safeStringSchema,
  lastName: safeStringSchema,
  email: safeStringSchema, // Even email - UI just renders it
  status: z.enum(UserStatus).nullable().catch(null), // Unknown status becomes null
  role: z.enum(UserRole).nullable().catch(null),
  avatarUrl: z.string().url().nullable().catch(null),
  createdAt: z.string().datetime().nullable().catch(null),
});

// UI handles null values with fallbacks
function UserCard({ user }: { user: UserDto }) {
  return (
    <div>
      <h3>{user.firstName} {user.lastName}</h3>
      <p>Status: {user.status ?? "Unknown"}</p>
      <p>Email: {user.email || "Not provided"}</p>
    </div>
  );
}
```

### Domain Schemas (Strict)

Domain layer schemas enforce **business rules** and should fail fast on invalid data.

**Rules:**

- **SHOULD use `.strict()`** - Reject unknown properties
- **No `.catch()` fallbacks** - Let validation errors surface
- **Enforce constraints** - Required fields, value ranges, formats

**Used for:**

- Request body validation (POST/PUT/PATCH)
- Form validation
- Entity creation/mutation
- Business rule enforcement

**Rationale:**

- User input must meet business requirements
- Domain entities must maintain invariants
- Validation errors should be shown to users to correct their input
- Strict validation prevents corrupted state

**Example:**

```typescript
const CreateUserInputsSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email format"),
    role: z.enum(UserRole), // No catch - must be valid
  })
  .strict(); // Reject unknown fields

class CreateUserService {
  static readonly INPUTS_SCHEMA = CreateUserInputsSchema;

  create(input: unknown): UserEntity {
    // Will throw ZodError if invalid - this is intentional
    const parsed = CreateUserInputsSchema.parse(input);
    // ... create entity
  }
}
```

### Enum Handling

Enums require special handling based on context:

**Response DTOs:** Use domain enums with safety mechanism

```typescript
// DTO can import domain enum for type-safety
import { UserStatus } from "domain/users/schemas/user-status.schema";

const UserDtoSchema = z.object({
  // Trade-off: Type-safety + graceful degradation
  status: z.enum(UserStatus).nullable().catch(null),
});

// Unknown status values become null instead of throwing
```

**Domain Schemas:** Use domain enums strictly

```typescript
const UpdateUserInputsSchema = z.object({
  status: z.enum(UserStatus), // No catch - must be valid
});
```

### Safe Schema Utilities

The `nmp-common/zod-schemas` package provides reusable safe schemas:

```typescript
import {
  safeStringIdSchema, // ID with safe parsing (string/number coercion)
  safeStringSchema, // string with safe parsing
  safeDatetimeSchema, // ISO datetime | null
  safeNumberSchema, // number | null
} from "nmp-common/zod-schemas";

// Example usage
const ArticleDtoSchema = z.object({
  id: safeStringIdSchema,
  authorId: safeStringIdSchema,
  title: safeStringSchema,
  body: safeStringSchema,
  publishedAt: safeDatetimeSchema,
  viewCount: safeNumberSchema,
});
```

### Guidelines Summary

| Aspect              | Response DTOs               | Domain Schemas                          |
| ------------------- | --------------------------- | --------------------------------------- |
| **Strictness**      | Non-strict (no `.strict()`) | Strict (use `.strict()`)                |
| **ID fields**       | `safeStringIdSchema`        | `z.string().uuid()` or branded types    |
| **String fields**   | `safeStringSchema`          | `z.string()` with constraints           |
| **Enums**           | `.nullable().catch(null)`   | No catch, must be valid                 |
| **Nullable fields** | `.nullable().catch(null)`   | `.nullable()` only when business allows |
| **Unknown fields**  | Allowed (passthrough)       | Rejected (strict mode)                  |
| **Error handling**  | Graceful (fallbacks in UI)  | Fail fast (show validation errors)      |
| **Purpose**         | Parse external data safely  | Enforce business rules                  |

---

## 🛠️ Development Tools

### DevConsole

Open browser console and type `devConsole.help()` for commands:

```javascript
// Seed database with test data
devConsole.db.seed();

// Login as different user roles
devConsole.auth.login.asAdmin();
devConsole.auth.login.asManager();
devConsole.auth.login.asReviewer();

// Debug auth state
devConsole.auth.getState();
```

### Seeders

Seeders populate the frontend database (Dexie) with test data for development.

**Location**: `infra/db/seeders/`

**Interface**: Implement `Seeder` interface with a `seed()` method.

```typescript
// infra/db/seeders/user.seeder.ts
export class UserSeeder implements Seeder {
  readonly #db = inject("database");

  async seed(db: Database = this.#db): Promise<void> {
    const users = [
      /* create test users */
    ];
    await db.users.bulkAdd(users);
  }
}
```

**Registration**: Register seeders in `ui/app-config.ts`:

```typescript
devConsole.registerSeeder("user-seeder", UserSeeder);
devConsole.registerSeeder("password-hash-seeder", PasswordHashSeeder);
```

**Usage**:

- Run all: `devConsole.db.seed()`
- Run specific: `devConsole.db.seed("user-seeder")`
- List: `devConsole.db.list()`

**Best Practices**:

- Check for existing data to avoid duplicates
- Use `@faker-js/faker` for realistic test data
- Maintain seeder dependencies (e.g., PasswordHashSeeder runs after UserSeeder)

### Path Aliases

```typescript
import { UserEntity } from "domain/users/entities/user.entity";
import { UserDto } from "app/dtos/users/user.dto";
import { inject } from "infra/di/inject";
import { UsersTable } from "ui/features/users/users-table";
```

No relative imports like `../../../`!

---

## 📁 Adding a New Feature

When adding a new feature (e.g., "Products"):

### 1. Domain Layer (`domain/products/`)

```text
entities/       → ProductEntity with business logic
ids/            → ProductId branded type
repos/          → ProductRepo interface
schemas/        → Zod schemas for validation
specifications/ → Business rule specifications (optional)
```

### 2. Application Layer (`app/`)

```text
dtos/products/  → ProductDto, CreateProductRequest, etc.
services/       → ProductService interface
mappers/        → ProductDomainDtoMapper
```

### 3. Infrastructure Layer (`infra/`)

```text
db/models/products/   → ProductModel (database schema)
db/repos/products/    → BackendProductRepo (Dexie implementation)
db/services/products/ → BackendProductService + MswProductController
db/mappers/products/  → ProductDbDomainMapper
api/services/products/ → ApiProductService (future real backend)
```

### 4. UI Layer (`ui/`)

```text
features/products/ → Reusable product components
pages/products/    → Full page components
queries/           → getProductsQuery, getProductByIdQuery
mutations/         → useCreateProduct, useUpdateProduct
```

### 5. Register in DI (`ui/app-config.ts`)

```typescript
this.injector.provide([
  { token: "backend-product-repo", useClass: BackendProductRepo, singleton: true },
  { token: "backend-product-service", useClass: BackendProductService, singleton: true },
  { token: "api-product-service", useClass: ApiProductService, singleton: true },
]);
```

### 6. Add MSW Controller (`infra/msw/msw-controller-registry.ts`)

```typescript
this.#controllers = [
  this.#injector.resolve(MswAuthController),
  this.#injector.resolve(MswUserController),
  this.#injector.resolve(MswProductController), // ← Add this
];
```

---

## ❓ Common Questions

**Q: Why not just use React Context for DI?** A: React Context only works in React components. Our
services need to work in plain classes, tests, and Storybook.

**Q: Why mock the entire backend in the frontend?** A: Backend is delayed. This lets us develop with
full business logic, not just static JSON. Plus, it's useful for tests even after backend is ready.

**Q: When do we switch to the real backend?** A: Change the DI registration in `app-config.ts` from
`backend-*-service` to `api-*-service`. The rest stays the same.

**Q: Where do I put complex business logic?** A: In domain entities or specifications. Keep services
thin - they orchestrate, entities contain logic.

**Q: How do I test a component?** A: Use the real injector with mock services, or use Storybook with
MSW handlers. No need to mock everything manually.

---

## 📚 Further Reading

- [DI System README](../src/infra/di/README.md) - Deep dive into dependency injection
- [DevConsole](../src/ui/dev-console.md) - Developer tools documentation

---

**Questions?** Ask the team or check existing code for patterns!
