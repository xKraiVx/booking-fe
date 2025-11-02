# OpenAPI Type Generation Setup

## Overview

This project uses **openapi-typescript** and **openapi-fetch** to automatically generate TypeScript types and API client code from the backend's OpenAPI/Swagger specification. This ensures type safety between the frontend and backend APIs.

## Setup

### Dependencies

The following packages have been installed:

**Frontend (booking-fe):**

- `openapi-typescript` - Generates TypeScript types from OpenAPI schemas
- `openapi-fetch` - Type-safe fetch client for OpenAPI schemas

**Backend (booking-be):**

- `cross-env` - Cross-platform environment variable support

## Workflow

### Method 1: Generate from Running Backend (Recommended)

1. **Start the backend** (in `booking-be` directory):

   ```bash
   cd booking-be
   pnpm start:dev
   ```

2. **Generate types** (in `booking-fe` directory):

   ```bash
   cd booking-fe
   pnpm generate:api
   ```

   This fetches the OpenAPI spec from `http://localhost:1337/api-json` and generates `src/lib/api-schema.d.ts`.

### Method 2: Generate from Exported JSON File

1. **Export OpenAPI spec** (in `booking-be` directory):

   ```bash
   cd booking-be
   pnpm export:swagger
   ```

   This creates `booking-fe/src/lib/api-schema.json`.

2. **Generate types from file** (in `booking-fe` directory):
   ```bash
   cd booking-fe
   pnpm generate:api:local
   ```

## Generated Files

### `booking-fe/src/lib/api-schema.d.ts`

- Auto-generated TypeScript definitions
- Contains all API paths, request/response types, and schemas
- **DO NOT EDIT MANUALLY** - Will be overwritten on next generation

### `booking-fe/src/lib/api-client.ts`

- Type-safe API client using `openapi-fetch`
- Pre-configured with:
  - Base URL from config
  - JWT token authentication
  - 401 error handling
  - Cookie management

## Usage in Repositories

### Example: Auth Repository

The new type-safe repository (`auth-generated.repo.ts`) demonstrates the pattern:

```typescript
import apiClient from "@/lib/api-client";
import type { paths } from "@/lib/api-schema";

// Extract types from the OpenAPI schema
type AuthLoginRequest =
  paths["/auth/login"]["post"]["requestBody"]["content"]["application/json"];
type AuthLoginResponse =
  paths["/auth/login"]["post"]["responses"]["200"]["content"]["application/json"];

// Use the typed client
export const login = async (
  data: AuthLoginRequest
): Promise<AuthLoginResponse> => {
  const { data: response, error } = await apiClient.POST("/auth/login", {
    body: data,
  });

  if (error) {
    throw new Error(error.message || "Login failed");
  }

  return response;
};
```

### Benefits

1. **Type Safety**: TypeScript validates request/response shapes at compile time
2. **Auto-completion**: Full IDE support for API endpoints and payloads
3. **Error Prevention**: Catch API mismatches before runtime
4. **Documentation**: Types serve as living documentation
5. **Refactoring**: Breaking changes are immediately visible

## Migration Guide

### Migrating Existing Repositories

To migrate from manual types to generated types:

1. **Run type generation**:

   ```bash
   pnpm generate:api
   ```

2. **Update imports**:

   ```typescript
   // Before
   import type { User } from "@/repos/user.repo";

   // After
   import type { paths } from "@/lib/api-schema";
   type User =
     paths["/auth/profile"]["get"]["responses"]["200"]["content"]["application/json"];
   ```

3. **Replace axios with apiClient**:

   ```typescript
   // Before
   const response = await api.post<AuthResponse>("/auth/login", data);
   return response.data;

   // After
   const { data: response, error } = await apiClient.POST("/auth/login", {
     body: data,
   });
   if (error) throw new Error(error.message);
   return response;
   ```

4. **Remove manual type definitions** that duplicate backend types

### Comparison: Old vs New

**Old Approach (Manual Types):**

```typescript
// Manually defined, can drift from backend
export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  user: User;
}

// No compile-time validation
const response = await api.post<AuthResponse>("/auth/login", data);
```

**New Approach (Generated Types):**

```typescript
// Auto-generated from backend, always in sync
type LoginData =
  paths["/auth/login"]["post"]["requestBody"]["content"]["application/json"];
type AuthResponse =
  paths["/auth/login"]["post"]["responses"]["200"]["content"]["application/json"];

// Full type safety and validation
const { data, error } = await apiClient.POST("/auth/login", {
  body: data, // Type-checked
});
```

## NPM Scripts

### Frontend (booking-fe)

- `pnpm generate:api` - Generate types from running backend
- `pnpm generate:api:local` - Generate types from local JSON file

### Backend (booking-be)

- `pnpm export:swagger` - Export OpenAPI spec and run backend with export enabled

## Configuration

### Backend Configuration (`booking-be/src/main.ts`)

The backend exposes the OpenAPI spec at:

- `/api` - Swagger UI documentation
- `/api-json` - Raw JSON OpenAPI specification

When `EXPORT_SWAGGER=true`, the spec is also written to:

- `../booking-fe/src/lib/api-schema.json`

### Frontend Configuration

The `openapi-typescript` command can be customized in `package.json`:

```json
{
  "scripts": {
    "generate:api": "openapi-typescript http://localhost:1337/api-json -o src/lib/api-schema.d.ts"
  }
}
```

Options:

- Change the URL if backend runs on a different port
- Add `--alphabetize` to sort types alphabetically
- Add `--export-type` to use `export type` instead of `export interface`

## Troubleshooting

### Types Not Generating

1. **Check backend is running**: `http://localhost:1337/api-json` should return JSON
2. **Verify endpoint**: Make sure `/api-json` is accessible
3. **Check CORS**: Ensure backend allows requests from localhost

### Type Errors After Generation

1. **Restart TypeScript server**: In VS Code, press `Ctrl+Shift+P` → "TypeScript: Restart TS Server"
2. **Check generated file**: Open `api-schema.d.ts` to verify types exist
3. **Verify backend decorators**: Ensure all DTOs have `@ApiProperty` decorators

### API Client Errors

1. **Check authentication**: Ensure JWT token is in cookies
2. **Verify base URL**: Check `API_URL` in `src/lib/config.ts`
3. **Check network**: Use browser DevTools to inspect requests

## Best Practices

### 1. Regenerate After Backend Changes

After modifying backend API:

```bash
# In booking-fe
pnpm generate:api
```

### 2. Type Extraction Pattern

Create type aliases for readability:

```typescript
// Good: Clear, reusable type names
type CreateUserRequest =
  paths["/auth/users"]["post"]["requestBody"]["content"]["application/json"];
type UserResponse =
  paths["/auth/users/{id}"]["get"]["responses"]["200"]["content"]["application/json"];

// Use the types
export const createUser = async (
  data: CreateUserRequest
): Promise<UserResponse> => {
  // ...
};
```

### 3. Error Handling

Always handle errors from the API client:

```typescript
const { data, error } = await apiClient.POST("/auth/login", {
  body: credentials,
});

if (error) {
  // Error is typed based on OpenAPI error responses
  throw new Error(error.message || "Request failed");
}

// data is typed based on OpenAPI success response
return data;
```

### 4. Version Control

- **Commit** `api-schema.d.ts` - So team members have types without generating
- **Ignore** `api-schema.json` (optional) - It's a build artifact
- **Regenerate** regularly to stay in sync with backend

### 5. CI/CD Integration

Add to your CI pipeline:

```yaml
# .github/workflows/ci.yml
- name: Generate API Types
  run: |
    cd booking-fe
    pnpm generate:api:local

- name: Type Check
  run: pnpm tsc --noEmit
```

## Advanced Usage

### Custom Error Handling

Extend the API client with custom error handlers:

```typescript
// src/lib/api-client.ts
apiClient.use({
  async onResponse({ response }) {
    if (response.status === 401) {
      Cookies.remove("auth_token");
      window.location.href = "/login";
    }

    if (response.status >= 500) {
      console.error("Server error:", response);
      // Show error toast, etc.
    }

    return response;
  },
});
```

### Type Utilities

Create helper utilities for common patterns:

```typescript
// src/lib/api-types.ts
import type { paths } from "./api-schema";

// Extract request body type
export type RequestBody<
  Path extends keyof paths,
  Method extends keyof paths[Path]
> = paths[Path][Method] extends {
  requestBody: { content: { "application/json": infer T } };
}
  ? T
  : never;

// Extract response type
export type ResponseData<
  Path extends keyof paths,
  Method extends keyof paths[Path],
  Status extends number = 200
> = paths[Path][Method] extends {
  responses: { [K in Status]: { content: { "application/json": infer T } } };
}
  ? paths[Path][Method]["responses"][Status]["content"]["application/json"]
  : never;

// Usage
type LoginRequest = RequestBody<"/auth/login", "post">;
type LoginResponse = ResponseData<"/auth/login", "post", 200>;
```

## Resources

- [openapi-typescript Documentation](https://openapi-ts.pages.dev/)
- [openapi-fetch Documentation](https://openapi-ts.pages.dev/openapi-fetch/)
- [NestJS Swagger Documentation](https://docs.nestjs.com/openapi/introduction)
- [OpenAPI Specification](https://swagger.io/specification/)
