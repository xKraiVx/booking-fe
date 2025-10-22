# Booking Frontend

A modern React application built with:

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **TanStack Router** - Type-safe routing
- **i18next** - Internationalization (English & Ukrainian)
- **shadcn/ui** - UI component library
- **Tailwind CSS** - Utility-first CSS framework

## Getting Started

### Prerequisites

- Node.js 20.19+ or 22.12+
- pnpm (recommended) or npm

### Installation

```bash
cd booking-fe
pnpm install
```

### Development

Start the development server:

```bash
pnpm dev
```

The application will be available at `http://localhost:5173`

### Building for Production

```bash
pnpm build
```

### Preview Production Build

```bash
pnpm preview
```

## Project Structure

```
booking-fe/
├── src/
│   ├── routes/          # TanStack Router routes
│   │   ├── __root.tsx   # Root layout
│   │   ├── index.lazy.tsx
│   │   └── about.lazy.tsx
│   ├── i18n/            # Internationalization
│   │   ├── config.ts
│   │   └── locales/
│   │       ├── en/
│   │       └── uk/
│   ├── lib/             # Utility functions
│   │   └── utils.ts
│   ├── main.tsx         # Application entry point
│   └── index.css        # Global styles
├── public/              # Static assets
└── vite.config.ts       # Vite configuration
```

## Features

- ✅ Type-safe routing with TanStack Router
- ✅ Automatic route code-splitting
- ✅ Multi-language support (EN/UK)
- ✅ Modern UI components with shadcn/ui
- ✅ Tailwind CSS for styling
- ✅ Development tools and hot reload
- ✅ Fully responsive design
- ✅ Accessible components with Radix UI primitives

## shadcn/ui Components Included

The following shadcn/ui components are already set up and ready to use:

- **Button** - Multiple variants (default, secondary, outline, ghost, link, destructive) and sizes
- **Card** - Container with header, title, description, content, and footer
- **Dialog** - Modal dialogs with overlay and animations
- **Input** - Text input field with full styling
- **Label** - Form labels with accessibility support
- **Textarea** - Multi-line text input
- **Checkbox** - Checkboxes with custom styling
- **Select** - Dropdown select component
- **Dropdown Menu** - Context menus with submenus and separators
- **Separator** - Horizontal and vertical dividers

All components are located in `src/components/ui/` and can be imported directly:

```tsx
import { Button, Card, Dialog, Input } from "@/components/ui";
```

### Adding More Components

To add additional shadcn/ui components, copy them from [ui.shadcn.com](https://ui.shadcn.com/) into the `src/components/ui/` directory.

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint

## Adding shadcn/ui Components

To add components from shadcn/ui, you can manually copy them from [ui.shadcn.com](https://ui.shadcn.com/) or use the CLI.

## Language Switching

The app supports English and Ukrainian. Language can be switched using the buttons on the home page, or it will auto-detect based on browser settings.

---

## React + TypeScript + Vite Technical Notes

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```
