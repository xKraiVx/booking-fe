# Frontend API Type Generation - Quick Start

## 🚀 Quick Start

### Step 1: Generate API Types

Choose one of the following methods:

#### Method A: From Running Backend (Recommended for Development)

```bash
# Terminal 1: Start the backend
cd booking-be
pnpm start:dev

# Terminal 2: Generate types
cd booking-fe
pnpm generate:api
```

#### Method B: From Exported JSON File (Recommended for CI/CD)

```bash
# Export from backend
cd booking-be
pnpm export:swagger

# Generate in frontend
cd booking-fe
pnpm generate:api:local
```

### Step 2: Verify Generation

Check that `booking-fe/src/lib/api-schema.d.ts` has been created with TypeScript type definitions.

### Step 3: Use in Your Code

```typescript
import apiClient from "@/lib/api-client";
import type { RequestBody, ResponseData } from "@/lib/api-types";

// Extract types
type LoginRequest = RequestBody<"/auth/login", "post">;
type LoginResponse = ResponseData<"/auth/login", "post", 200>;

// Use typed client
export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const { data: response, error } = await apiClient.POST("/auth/login", {
    body: data,
  });

  if (error) throw new Error(error.message);
  return response;
};
```

## 📁 Files Created

### Frontend (booking-fe)

- **`src/lib/api-schema.d.ts`** - Auto-generated TypeScript types (DON'T EDIT MANUALLY)
- **`src/lib/api-client.ts`** - Configured API client with auth
- **`src/lib/api-types.ts`** - Helper utilities for type extraction
- **`src/repos/auth-example.repo.ts`** - Example repository using generated types
- **`OPENAPI_GENERATION.md`** - Comprehensive documentation

### Backend (booking-be)

- Modified **`src/main.ts`** - Added `/api-json` endpoint and export functionality
- Modified **`package.json`** - Added `export:swagger` script

## 🔄 Workflow

### During Development

1. **Make backend changes** (add/modify endpoints, DTOs)
2. **Ensure Swagger decorators** are added (`@ApiProperty`, `@ApiOperation`, etc.)
3. **Regenerate types**: `pnpm generate:api`
4. **Update frontend code** to use new types

### Before Committing

```bash
# In booking-fe
pnpm generate:api
pnpm lint
pnpm build

# Commit the generated api-schema.d.ts
git add src/lib/api-schema.d.ts
git commit -m "Update API types"
```

## 📝 Examples

### Example 1: Simple GET Request

```typescript
import apiClient from "@/lib/api-client";

export const getProfile = async () => {
  const { data, error } = await apiClient.GET("/auth/profile");

  if (error) throw new Error("Failed to fetch profile");

  return data; // Fully typed!
};
```

### Example 2: POST with Request Body

```typescript
import apiClient from "@/lib/api-client";
import type { RequestBody } from "@/lib/api-types";

type RegisterData = RequestBody<"/auth/register", "post">;

export const register = async (data: RegisterData) => {
  const { data: response, error } = await apiClient.POST("/auth/register", {
    body: data, // Type-checked!
  });

  if (error) throw new Error("Registration failed");

  return response; // Fully typed!
};
```

### Example 3: GET with Path Parameters

```typescript
import apiClient from "@/lib/api-client";

export const getUserById = async (id: string) => {
  const { data, error } = await apiClient.GET("/auth/users/{id}", {
    params: {
      path: { id }, // Type-checked!
    },
  });

  if (error) throw new Error("Failed to fetch user");

  return data; // Fully typed!
};
```

### Example 4: GET with Query Parameters

```typescript
import apiClient from "@/lib/api-client";
import type { QueryParams } from "@/lib/api-types";

type AuditLogsQuery = QueryParams<"/audit-logs", "get">;

export const getAuditLogs = async (query: AuditLogsQuery) => {
  const { data, error } = await apiClient.GET("/audit-logs", {
    params: {
      query, // Type-checked!
    },
  });

  if (error) throw new Error("Failed to fetch audit logs");

  return data; // Fully typed!
};
```

## 🛠️ NPM Scripts

### Frontend

| Script                    | Description                                                            |
| ------------------------- | ---------------------------------------------------------------------- |
| `pnpm generate:api`       | Generate types from running backend (`http://localhost:1337/api-json`) |
| `pnpm generate:api:local` | Generate types from local `api-schema.json` file                       |

### Backend

| Script                | Description                                             |
| --------------------- | ------------------------------------------------------- |
| `pnpm export:swagger` | Start backend with `EXPORT_SWAGGER=true` to export JSON |

## 🔍 Troubleshooting

### "Cannot find module './api-schema'"

**Solution**: Run `pnpm generate:api` to create the file.

### "Property does not exist on type 'paths'"

**Cause**: Types not generated yet or backend endpoint not documented.

**Solution**:

1. Ensure backend has `@ApiOperation`, `@ApiResponse`, `@ApiBody` decorators
2. Regenerate types: `pnpm generate:api`
3. Restart TypeScript server in VS Code

### Backend Not Exporting JSON

**Solution**: Make sure backend is running and visit `http://localhost:1337/api-json` in browser.

## 📚 More Information

For detailed documentation, see:

- **[OPENAPI_GENERATION.md](./OPENAPI_GENERATION.md)** - Complete guide
- **[openapi-typescript docs](https://openapi-ts.pages.dev/)** - Tool documentation
- **[openapi-fetch docs](https://openapi-ts.pages.dev/openapi-fetch/)** - Client documentation

## ✅ Benefits

- ✨ **Full Type Safety** - Compile-time validation of API calls
- 🔄 **Auto-Sync** - Types always match backend definition
- 📖 **Self-Documenting** - Types serve as documentation
- 🐛 **Error Prevention** - Catch API mismatches before runtime
- 🚀 **Better DX** - Full autocomplete in your IDE
- ♻️ **No Manual Work** - Types generated automatically

## 🎯 Next Steps

1. **Generate types**: `pnpm generate:api`
2. **Review examples**: Check `src/repos/auth-example.repo.ts`
3. **Migrate existing repos**: Update to use generated types
4. **Add to CI/CD**: Ensure types are generated in your pipeline
