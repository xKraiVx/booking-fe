/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'
import { playwright } from '@vitest/browser-playwright'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    TanStackRouterVite({
      routesDirectory: 'src/ui/routes',
      generatedRouteTree: 'src/ui/routeTree.gen.ts',
    }),
    react(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: true,
    port: 5173,
    // Inside Docker the source is a bind mount, which does not emit fs events
    watch: process.env.CHOKIDAR_USEPOLLING
      ? { usePolling: true, interval: 300 }
      : undefined,
  },
  test: {
    projects: [
      {
        // Every story becomes a test case, rendered in a real Chromium via
        // Playwright. Run with `pnpm test:storybook`.
        // https://storybook.js.org/docs/writing-tests/integrations/vitest-addon
        extends: true,
        plugins: [
          storybookTest({
            configDir: path.join(__dirname, '.storybook'),
          }),
        ],
        // Pre-bundle the app dependencies the stories pull in. Without this
        // Vite discovers them mid-run, reloads the page and fails the tests.
        optimizeDeps: {
          include: [
            'axios',
            'js-cookie',
            'zustand',
            'zustand/middleware',
            'date-fns',
            '@tanstack/react-form',
            'react-i18next',
            'i18next',
            'i18next-browser-languagedetector',
          ],
        },
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: playwright(),
            instances: [{ browser: 'chromium' }],
          },
        },
      },
    ],
  },
})
