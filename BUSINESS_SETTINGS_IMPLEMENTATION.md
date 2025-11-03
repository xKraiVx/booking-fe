# Business Settings Frontend Implementation

## Overview

This document describes the frontend implementation for business settings, interventions (services), and masters (staff) management for tenants.

## Architecture

### Repository Layer (`src/repos/business.repo.ts`)

Contains typed API functions for all three resources:

- **Business Settings**: CRUD operations for tenant business configuration
- **Interventions**: CRUD operations for services/treatments
- **Masters**: CRUD operations for staff members

All functions use TypeScript types generated from the OpenAPI schema.

### Use Cases / React Query Hooks

#### `src/use-cases/business-settings/useBusinessSettings.ts`

- `useGetAllBusinessSettings()` - Fetch all business settings (tenant sees only their own)
- `useGetBusinessSettingsById(id)` - Fetch specific business settings
- `useCreateBusinessSettings()` - Create new business settings
- `useUpdateBusinessSettings()` - Update existing business settings
- `useDeleteBusinessSettings()` - Delete business settings

#### `src/use-cases/interventions/useInterventions.ts`

- `useGetAllInterventions()` - Fetch all interventions
- `useGetInterventionById(id)` - Fetch specific intervention
- `useCreateIntervention()` - Create new intervention with master associations
- `useUpdateIntervention()` - Update existing intervention
- `useDeleteIntervention()` - Delete intervention

#### `src/use-cases/masters/useMasters.ts`

- `useGetAllMasters()` - Fetch all masters
- `useGetMasterById(id)` - Fetch specific master
- `useCreateMaster()` - Create new master
- `useUpdateMaster()` - Update existing master
- `useDeleteMaster()` - Delete master

All hooks include automatic cache invalidation via React Query.

## Pages & Components

### Main Page: `src/pages/business-settings/BusinessSettingsPage.tsx`

The main tenant dashboard for managing business configuration. Features:

- Business information form section
- Masters (staff) management section with grid layout
- Services (interventions) management section with list layout
- Modals for adding/editing masters and services

### Business Settings Form: `src/pages/business-settings/components/BusinessSettingsForm.tsx`

Form for creating/updating business settings:

- **Fields**:
  - Title (required)
  - Description
  - Address
  - Google Calendar ID
  - Social media links (Facebook, Instagram, Twitter, LinkedIn, Website)
- **Working Hours**: Uses default hours (Mon-Fri 9-18, Sat 10-16, Sun closed)
- **Auto-save**: Detects create vs update mode based on existing data

### Master Modal: `src/pages/business-settings/components/MasterModal.tsx`

Dialog for creating/editing staff members:

- **Fields**:
  - Name (required)
  - Date of Birth
  - Photo URL
  - Description/Bio
- **Features**:
  - Create new master
  - Edit existing master with pre-populated data
  - Delete master (with confirmation)
  - Automatically associates with tenant's business settings

### Intervention Modal: `src/pages/business-settings/components/InterventionModal.tsx`

Dialog for creating/editing services:

- **Fields**:
  - Service Name (required)
  - Price (required)
  - Currency (PLN, USD, EUR, GBP)
  - Duration in minutes (required)
  - Description
  - Image URLs (comma-separated)
  - Master selection (checkboxes for multi-select)
- **Features**:
  - Create new service
  - Edit existing service
  - Delete service (with confirmation)
  - Associate multiple masters with the service

## Routing

### Route: `src/routes/business-settings.lazy.tsx`

- **Path**: `/business-settings`
- **Protection**: Only accessible to users with `tenant` role
- **Uses**: `ProtectedRoute` component wrapper

### Navigation

Added to `src/layouts/root-layout/components/RootLayoutNavigation.tsx`:

- "Business Settings" button appears for tenants in the main navigation
- Styled to match existing navigation pattern

## Data Flow

1. **Tenant logs in** → JWT contains user ID and role
2. **Navigates to /business-settings** → Protected route checks role
3. **Page loads** → Fetches:
   - Business settings (filtered by user ID on backend)
   - All interventions for this business
   - All masters for this business
4. **User interacts**:
   - Fill business form → Creates/updates settings
   - Click "Add Master" → Modal opens → Submit → Master created with businessSettingsId from backend
   - Click "Add Service" → Modal opens → Select masters → Submit → Service created with selected master IDs
5. **React Query** → Auto-invalidates caches → UI updates

## Backend Integration

### Access Control (Implemented on Backend)

- **Admin**: Can see all resources across all tenants
- **Tenant**: Can only see and manage their own resources
- **Client**: No access to these endpoints

### Automatic Associations

The backend automatically handles:

- `businessSettingsId` - Derived from authenticated user's business settings
- Tenant isolation - Controllers fetch user from JWT and pass to services
- Master-Intervention relationships - Many-to-many join table

## Type Safety

All components use TypeScript types generated from the OpenAPI schema:

- `CreateBusinessSettingsBody`
- `UpdateBusinessSettingsBody`
- `CreateInterventionBody`
- `UpdateInterventionBody`
- `CreateMasterBody`
- `UpdateMasterBody`

Types are automatically regenerated via `pnpm generate:api` when backend schema changes.

## UI Components Used

From `shadcn/ui`:

- Button
- Card (with CardHeader, CardTitle, CardDescription, CardContent)
- Dialog (with DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter)
- Input
- Label
- Textarea
- Select (with SelectTrigger, SelectValue, SelectContent, SelectItem)
- Checkbox
- Separator

Icons from `lucide-react`:

- Plus (add buttons)
- Users (masters icon)
- Scissors (services icon)

## Future Enhancements

1. **Working Hours Editor**: Currently uses default hours; could add UI to customize per-day schedule
2. **Image Upload**: Replace URL input with actual file upload
3. **Master Availability**: Add calendar/schedule for master working hours
4. **Service Categories**: Group services by type
5. **Pricing Tiers**: Multiple pricing levels based on master experience
6. **Booking Integration**: Link to appointment scheduling system
7. **Analytics**: Show popular services, master utilization, revenue stats
8. **Multi-language**: Internationalize service names and descriptions

## Testing the Implementation

1. **Start Backend**: Ensure backend is running on `http://localhost:1337`
2. **Login as Tenant**: Use a user account with role `tenant`
3. **Navigate**: Click "Business Settings" in the navigation
4. **Create Business Settings**:
   - Fill in title (required)
   - Add description, address, social links
   - Click "Create Settings"
5. **Add Masters**:
   - Click "Add Master"
   - Enter name, optional photo URL and bio
   - Click "Create"
6. **Add Services**:
   - Click "Add Service"
   - Enter name, price, currency, duration
   - Select which masters can perform this service
   - Click "Create"
7. **Edit/Delete**: Click on any master or service card to edit or delete

## Notes

- Business Settings must be created first before masters/services can be added
- Masters appear in a responsive grid (1 column mobile, 2 tablet, 3 desktop)
- Services appear in a vertical list with price and duration displayed
- All forms validate required fields
- Delete actions require confirmation
- Loading states shown during API calls
- Cache automatically updates after mutations
