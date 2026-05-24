# Contributing to Documentation

Guidelines for adding and maintaining documentation in this project.

## Structure Overview

```text
docs/
├── README.md
├── architecture.md
├── contributing.md
│
├── features/
│   ├── README.md
│   └── feature-template.md
│
└── api/
    ├── README.md
    └── http-template.md
```

## Adding a New Feature Documentation

1. Copy the template from `features/feature-template.md`.
2. Create a new file in `features/` or a subfolder if the feature is complex.
3. Update `features/README.md` with a link to the new feature.
4. If the feature involves new API endpoints, update `api/README.md`.

## Naming Conventions

- Folders: `kebab-case` (e.g., `booking/`).
- Files: `kebab-case.md` (e.g., `booking-flow.md`).

## Writing Guidelines

### Features Documentation

Focus on **what the system does**:

- Describe functionality and user capabilities.
- Document role-based access and permissions (Admin, Tenant, Client).
- Explain business rules (e.g., booking 5-minute reservation expiry).

### API Documentation

Focus on the **technical contract**:

- Document all endpoints with HTTP methods and paths.
- Specify request/response types.
- Document error responses and status codes.
- Note role-based access restrictions for endpoints.

## Templates

- [Feature Template](./features/feature-template.md)
- [HTTP API Template](./api/http-template.md)
