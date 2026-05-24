# HTTP API Template

> **Instructions:**
> - Remove this instruction block from your API document.
> - MUST use TypeScript syntax for all request/response structures.
> - MUST include all possible response codes for each endpoint.

---

# [Feature Name] API

API endpoints for [feature description].

---

## GET `/api/[resource]`

Description of what this endpoint does.

**Query Parameters:**

- `paramName` (type, optional/required) - Description

**Response (200 OK):**

```typescript
{
  id: string;
  name: string;
  createdAt: string; // ISO 8601 timestamp
}
```

**Response Codes:**

- **200 OK** - Successful request.
- **401 Unauthorized** - Missing or invalid authentication credentials.
- **404 Not Found** - Resource not found.

---

## POST `/api/[resource]`

Description of what this endpoint does.

**Request Body:**

```typescript
{
  name: string; // Required.
  description?: string; // Optional.
}
```

**Response (201 Created):**

```typescript
{
  id: string;
  name: string;
  createdAt: string;
}
```

**Response Codes:**

- **201 Created** - Resource created successfully.
- **400 Bad Request** - Invalid request body.
- **401 Unauthorized** - Missing or invalid authentication credentials.

---

## PUT `/api/[resource]/:id`

Description of what this endpoint does.

**Path Parameters:**

- `id` (string, required) - Resource identifier.

**Request Body:**

```typescript
{
  name?: string;
}
```

**Response (200 OK):**

```typescript
{
  id: string;
  name: string;
  updatedAt: string;
}
```

**Response Codes:**

- **200 OK** - Resource updated successfully.
- **400 Bad Request** - Invalid request body.
- **401 Unauthorized** - Missing or invalid authentication credentials.
- **404 Not Found** - Resource not found.

---

## DELETE `/api/[resource]/:id`

Description of what this endpoint does.

**Path Parameters:**

- `id` (string, required) - Resource identifier.

**Response (204 No Content):**

No content returned.

**Response Codes:**

- **204 No Content** - Resource deleted successfully.
- **401 Unauthorized** - Missing or invalid authentication credentials.
- **404 Not Found** - Resource not found.
