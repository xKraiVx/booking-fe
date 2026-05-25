import { ApiClient } from "@/app/core/api-client";
import { AppQueryClient } from "@/app/core/app-query-client";
import { Database } from "@/infra/db/core/database";
import { ClientAuthStateRepo } from "@/infra/db/repos/auth/client-auth-state.repo";
import { ClientAuthStateService } from "@/infra/db/services/auth/client-auth-state.service";
import { InjectorImpl } from "@/infra/di/injector.impl";
import { MswControllerRegistry } from "@/infra/msw/msw-controller-registry";
import { appRouter } from "./app-router";

export class AppConfig {
  static #instance: AppConfig | null = null;
  static #useRealApi: boolean = import.meta.env.VITE_USE_REAL_API === "true";

  static async getInstance() {
    if (!this.#instance) {
      this.#instance = new AppConfig();

      if (!AppConfig.#useRealApi) {
        await this.#instance.#initMsw();
      }
    }
    return this.#instance;
  }

  readonly injector = new InjectorImpl();

  constructor() {
    this.injector.provide([
      { token: "database", useClass: Database, singleton: true },
      { token: "router", useFactory: () => appRouter, singleton: true },
      { token: "api-base-url", useValue: import.meta.env.VITE_APP_API_URL },
      { token: "api-client", useClass: ApiClient, singleton: true },
      { token: "query-client", useClass: AppQueryClient, singleton: true },
      // Client Repos
      { token: "auth-state-repo", useClass: ClientAuthStateRepo, singleton: true },
      // Client Services
      { token: "auth-state-service", useClass: ClientAuthStateService, singleton: true },
    ]);

    // Initialize developer console in development mode
    this.#initDevConsole();
  }

  async #initMsw() {
    await MswControllerRegistry.create(this.injector).setup();
  }

  async #initDevConsole() {
    if (import.meta.env.MODE !== "development") {
      return;
    }

    try {
      const { DevConsole } = await import("./dev-console");
      const devConsole = this.injector.resolve(DevConsole);

      // Expose to window
      (window as { appConfig?: AppConfig }).appConfig = this;
      (window as { devConsole?: unknown }).devConsole = devConsole;

      console.log("%c🛠️  Developer Console Loaded", "color: #00d4ff; font-size: 14px; font-weight: bold;");
      console.log("%cType 'devConsole.help()' to see available commands", "color: #888; font-size: 12px;");
    } catch (error) {
      console.error("Failed to load developer console:", error);
    }
  }
}
