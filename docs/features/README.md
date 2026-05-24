# Features

This folder contains documentation for the business features of the Booking System.

## Core Features

- **Authentication** - User registration, login (including Google/Facebook OAuth), and profile management.
- **Business Management** - Tenants can configure their business profile, address, working hours, and Google Calendar integration.
- **Service Management (Interventions)** - Tenants can define services they offer, including duration, price, and description.
- **Staff Management (Masters)** - Tenants can manage their staff members who perform the services.
- **Booking Flow** - The process for clients to find available slots and book appointments.
- **Availability & Reservations** - Real-time availability checking and temporary reservations to prevent double-booking.
- **Audit Logs** - System-wide tracking of important actions for administrative oversight.

## Role-Based Capabilities

### Admin
- Manage all users in the system.
- View and manage all business settings and bookings.
- Access system audit logs.

### Tenant (Business Owner)
- Configure their own business settings.
- Manage their services (interventions) and staff (masters).
- View and manage bookings for their business.

### Client
- Browse public business profiles using slugs.
- Check availability for specific services.
- Make reservations and bookings.
- Manage their own profile and view their booking history.
