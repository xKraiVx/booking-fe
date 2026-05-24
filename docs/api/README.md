# API Documentation

This folder contains technical API documentation for the Booking System backend endpoints.

## Core API Conventions

- **Authentication**: Bearer JWT token in the `Authorization` header.
- **Content-Type**: `application/json` for both requests and responses.
- **ID Format**: UUIDs are used for all resource identifiers.
- **Date/Time**: ISO 8601 format (UTC).

## API Endpoints

### Auth (`/auth`)

- `POST /auth/register` - Register a new user.
- `POST /auth/login` - Login with email and password.
- `POST /auth/logout` - Logout the current user.
- `GET /auth/profile` - Get the current user's profile.
- `POST /auth/forgot-password` - Request a password reset.
- `POST /auth/reset-password` - Reset password with a token.
- `POST /auth/change-password` - Change password (authenticated).
- `GET /auth/users` - Get all users (Admin only).
- `GET /auth/users/:id` - Get user by ID (Admin only).
- `POST /auth/users` - Create a new user (Admin only).
- `PUT /auth/users/:id` - Update user by ID (Admin only).
- `DELETE /auth/users/:id` - Delete user by ID (Admin only).

### Booking (`/booking`)

- `GET /booking` - Get all bookings (Admin: all, Tenant: own business, Client: own).
- `GET /booking/:id` - Get booking by ID.
- `POST /booking` - Create a new booking.
- `PUT /booking/:id` - Update a booking (Admin/Tenant).
- `GET /booking/availability/check` - Check availability for a service (Public).
- `POST /booking/reservation` - Create a temporary reservation (Public, 5m validity).

### Business Settings (`/business-settings`)

- `GET /business-settings` - Get all business settings (Admin: all, Tenant: own).
- `POST /business-settings` - Create business settings (Admin/Tenant).
- `GET /business-settings/my-settings` - Get business settings for the current user.
- `GET /business-settings/slug/:slug` - Get business settings by slug (Public).
- `PUT /business-settings/:id` - Update business settings.
- `DELETE /business-settings/:id` - Delete business settings.

### Interventions (`/interventions`)

- `GET /interventions` - Get all interventions.
- `GET /interventions/:id` - Get intervention by ID.
- `POST /interventions` - Create a new intervention (Tenant/Admin).
- `PUT /interventions/:id` - Update an intervention (Tenant/Admin).
- `DELETE /interventions/:id` - Delete an intervention (Tenant/Admin).

### Masters (`/masters`)

- `GET /masters` - Get all masters.
- `GET /masters/:id` - Get master by ID.
- `POST /masters` - Create a new master (Tenant/Admin).
- `PUT /masters/:id` - Update a master (Tenant/Admin).
- `DELETE /masters/:id` - Delete a master (Tenant/Admin).

### Audit Logs (`/audit-logs`)

- `GET /audit-logs` - Get audit logs (Admin only).
- `GET /audit-logs/:id` - Get audit log by ID (Admin only).
