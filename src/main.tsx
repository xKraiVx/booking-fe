import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { QueryClientProvider } from "@tanstack/react-query";
import "./ui/index.css";
import "./ui/i18n/config";
import { AppConfig } from "./ui/app-config";
import type { AppRouter } from "./ui/app-router";
import type { AppQueryClient } from "./app/core/app-query-client";

async function bootstrap() {
  // Initialize Application Configuration
  const appConfig = await AppConfig.getInstance();
  const injector = appConfig.injector;

  // Get instances from Injector
  const router = injector.get<AppRouter>("router");
  const queryClient = injector.get<AppQueryClient>("query-client");

  // Expose to window for debugging
  (window as { appConfig?: AppConfig }).appConfig = appConfig;

  const rootElement = document.querySelector("#root");

  if (rootElement) {
    createRoot(rootElement).render(
      <StrictMode>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} context={{ injector }} />
        </QueryClientProvider>
      </StrictMode>
    );
  }
}

bootstrap().catch((err) => {
  console.error("Failed to bootstrap application:", err);
});
