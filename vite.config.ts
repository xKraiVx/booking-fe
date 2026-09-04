import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
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
})
