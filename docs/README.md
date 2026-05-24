# CA Application - Project Overview

## Overview

The CA (Compliance Augmentation) application is a role-based web application designed to manage case
reviews, checklists, and assessments. The application provides different levels of access and
functionality based on user roles.

## User Roles

The application supports multiple user roles with varying levels of access:

- **Admin** - Full administrative access; can manage all users and system features
- **Manager** - Can manage reviewers and access all cases
- **Reviewer** - Access to assigned cases and case review functionality

## Architecture

The application follows a layered architecture pattern:

- **UI Layer** - React components, pages, hooks
- **Application Layer** - DTOs, service interfaces, mappers
- **Domain Layer** - Business entities, domain logic
- **Infrastructure Layer** - API clients, database, DI

See [architecture.md](./architecture.md) for detailed architectural guidelines.

## Documentation

### Features/API

- [API Documentation](./api/README.md) - HTTP and WS contracts for the application
- [Features Documentation](./features/README.md) - Business features of the application

### Technical

- [Architecture Guide](./architecture.md) - Detailed architectural guidelines
- [Abilities System](./abilities.md) - Authorization system for backend and frontend
- [API Documentation](./api/README.md) - Backend API endpoints

## Project Status

This document is maintained as new features and epics are implemented. It serves as a living
reference for the application's capabilities and structure.

---
