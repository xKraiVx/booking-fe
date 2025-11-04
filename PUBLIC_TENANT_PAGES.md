# Public Tenant Pages

This feature provides public-facing pages for each tenant business, allowing them to showcase their services, team, and contact information to potential customers.

## Overview

The public tenant pages are implemented with **Server-Side Rendering (SSR)** using TanStack Router to ensure fast initial page loads and better SEO performance.

## Route Structure

- **Route**: `/tenant/$tenantId`
- **File**: `src/routes/tenant/$tenantId.tsx`
- **Page Component**: `src/pages/tenant/TenantPublicPage.tsx`

## Features

### 1. Hero Section

- Displays the business name (title)
- Shows the business description
- Eye-catching gradient background with decorative elements

### 2. Services Slider

- Interactive card slider showcasing all services/interventions
- Each service card displays:
  - Service image (or gradient placeholder)
  - Service name
  - Description
  - Duration in minutes
  - Price and currency
- Responsive design (3 cards on desktop, 2 on tablet, 1 on mobile)
- Navigation controls with prev/next buttons
- Dot indicators for slide position

### 3. Masters List

- Grid layout displaying all team members
- Each master card shows:
  - Photo (or user icon placeholder)
  - Name
  - Description/bio
- Responsive grid (3 columns on desktop, 2 on tablet, 1 on mobile)

### 4. Google Maps Location

- Displays business address
- Interactive link to open in Google Maps
- "Get Directions" functionality
- Fallback design when embedded map is not available

### 5. Contact Section

- Social media links with icons:
  - Facebook
  - Instagram
  - Twitter
  - LinkedIn
  - Website
- Only displays social links that are configured

## SSR Implementation

The route uses a `loader` function to fetch data server-side:

\`\`\`typescript
loader: async ({ params }) => {
const { tenantId } = params;

// Fetch business settings first
const businessSettings = await getPublicBusinessSettings(tenantId);

// Then fetch interventions and masters
const [interventions, masters] = await Promise.all([
getPublicInterventions(businessSettings.id),
getPublicMasters(businessSettings.id),
]);

return { businessSettings, interventions, masters };
}
\`\`\`

This ensures:

- Data is loaded before the page renders
- Faster perceived performance
- Better SEO as content is available in initial HTML

## API Endpoints

### Public Repository Functions (no authentication required)

Located in `src/repos/business.repo.ts`:

- `getPublicBusinessSettings(tenantId: string)` - Fetch business settings by tenant ID
- `getPublicInterventions(businessSettingsId: string)` - Fetch all interventions for a business
- `getPublicMasters(businessSettingsId: string)` - Fetch all masters for a business

## Business Settings Integration

The Business Settings page now includes a "Public Page" section that allows tenants to:

1. **View their public page URL** - Shows the full URL to their public page
2. **Copy the link** - One-click copy to clipboard
3. **Open the public page** - Opens in a new tab for preview

### Location in UI

The public page link is prominently displayed at the top of the Business Settings page, just below the page title.

## Component Structure

\`\`\`
src/pages/tenant/
├── TenantPublicPage.tsx # Main page component
└── components/
├── HeroSection.tsx # Hero banner with title and description
├── ContactSection.tsx # Social media links
├── ServicesSlider.tsx # Interactive services carousel
├── MapSection.tsx # Google Maps integration
└── MastersList.tsx # Team members grid
\`\`\`

## Styling

All components use:

- Tailwind CSS utility classes
- Responsive design principles
- Modern gradient backgrounds
- Smooth transitions and hover effects
- Shadow effects for depth

## Future Enhancements

Potential improvements:

1. **Google Maps API Integration**: Add an actual embedded map with API key
2. **Image Gallery**: Add a photo gallery for the business
3. **Booking Integration**: Allow customers to book appointments directly
4. **Custom Themes**: Let tenants customize colors and styling
5. **SEO Optimization**: Add meta tags, Open Graph tags, and structured data
6. **Working Hours Display**: Show business hours on the public page
7. **Reviews/Testimonials**: Add customer reviews section
8. **Multi-language Support**: Internationalization for public pages

## Usage Example

To access a tenant's public page:

\`\`\`
https://yourdomain.com/tenant/{businessSettingsId}
\`\`\`

Replace `{businessSettingsId}` with the actual business settings ID (UUID).

## Notes

- The tenant ID in the URL corresponds to the business settings ID
- All data is fetched server-side for optimal performance
- The page is publicly accessible (no authentication required)
- Components gracefully handle missing data (e.g., no photo, no social links)
