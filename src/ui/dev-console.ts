import type { UserRole } from "@/domain/users/schemas/user-role.schema";
import { TestingLoginService } from "@/infra/api/services/auth/testing-login.service";
import { inject } from "@/infra/di/inject";
import { authKeys } from "./keys/auth.keys";

/**
 * Symbol to mark methods as commands
 */
const COMMAND_SYMBOL = Symbol("command");

/**
 * Map to store command descriptions
 */
const commandDescriptions = new Map<(...args: unknown[]) => unknown, string>();

/**
 * Command decorator function
 */
function command<T extends (...args: unknown[]) => unknown>(fn: T, description: string): T {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (fn as any)[COMMAND_SYMBOL] = true;
  commandDescriptions.set(fn, description);
  return fn;
}

/**
 * Developer Console - A utility for browser console commands in DEV mode
 */
export class DevConsole {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly #injector = inject<any>("injector");
  readonly #loginService = new TestingLoginService();
  readonly #router = this.#injector.get("router");
  readonly #database = this.#injector.get("database");
  readonly #authStateRepo = this.#injector.get("auth-state-repo");
  readonly #queryClient = this.#injector.get("query-client");

  /**
   * Display help information with all available commands
   */
  help = command(() => {
    const commands = this.#discoverCommands();

    console.group("🛠️  Developer Console - Available Commands");
    console.table(commands);
    console.groupEnd();

    return "Use any command above to interact with the app";
  }, "Show this help message");

  /**
   * Discovers all available commands
   */
  #discoverCommands(): Array<{ command: string; description: string }> {
    const commands: Array<{ command: string; description: string }> = [];

    // Check root level
    this.#collectCommands(this, "devConsole", commands);

    // Check db namespace
    this.#collectCommands(this.db, "devConsole.db", commands);

    // Check auth namespace
    this.#collectCommands(this.auth, "devConsole.auth", commands);

    // Check auth.login namespace
    this.#collectCommands(this.auth.login, "devConsole.auth.login", commands);

    return commands.sort((a, b) => a.command.localeCompare(b.command));
  }

  /**
   * Collect commands from an object
   */
  #collectCommands(
    obj: Record<string, unknown>,
    prefix: string,
    commands: Array<{ command: string; description: string }>,
  ): void {
    for (const key of Object.keys(obj)) {
      // Skip private properties and special methods
      if (key.startsWith("#") || key.startsWith("_") || key === "register") {
        continue;
      }

      const value = obj[key];

      // Check if this is a command (has our symbol)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (typeof value === "function" && (value as any)[COMMAND_SYMBOL]) {
        const description = commandDescriptions.get(value as (...args: unknown[]) => unknown) || "No description available";
        const params = this.#extractParams(value as (...args: unknown[]) => unknown);
        const signature = params.length > 0 ? `(${params.join(", ")})` : "()";

        commands.push({
          command: `${prefix}.${key}${signature}`,
          description,
        });
      }
    }
  }

  /**
   * Extract parameter names from a function
   */
  #extractParams(fn: (...args: unknown[]) => unknown): string[] {
    const fnStr = fn.toString();

    // Handle arrow functions: (param1, param2) => or param =>
    const arrowMatch = fnStr.match(/^\s*(?:async\s+)?\(([^)]*)\)\s*=>/);
    if (arrowMatch && arrowMatch[1] !== undefined) {
      return arrowMatch[1]
        .split(",")
        .map((p) => p.trim())
        .filter((p) => p.length > 0);
    }

    // Handle single param arrow function without parens: param =>
    const singleArrowMatch = fnStr.match(/^\s*(?:async\s+)?(\w+)\s*=>/);
    if (singleArrowMatch && singleArrowMatch[1] !== undefined) {
      return [singleArrowMatch[1]];
    }

    // Handle regular functions: function name(param1, param2)
    const funcMatch = fnStr.match(/function\s*\w*\s*\(([^)]*)\)/);
    if (funcMatch && funcMatch[1] !== undefined) {
      return funcMatch[1]
        .split(",")
        .map((p) => p.trim())
        .filter((p) => p.length > 0);
    }

    return [];
  }

  /**
   * Database-related commands
   */
  db = {
    /**
     * Clear database
     */
    clear: command(async () => {
      try {
        console.log("🗑️  Clearing database...");
        await this.#database.transaction("rw", this.#database.tables, async () => {
          await Promise.all(this.#database.tables.map((table) => (table as { clear: () => Promise<void> }).clear()));
        });
        console.log("✅ Database cleared");
        return "Database cleared successfully";
      } catch (error) {
        console.error("❌ Failed to clear database:", error);
        return `Error: ${error}`;
      }
    }, "Clear the frontend database"),
  };

  /**
   * Authentication-related commands
   */
  auth = {
    /**
     * Get current authentication state
     */
    getState: command(async () => {
      try {
        const authState = await this.#authStateRepo.get();

        if (!authState) {
          console.log("ℹ️  No authentication state found");
          return null;
        }

        console.log("🔐 Current auth state:", authState);
        return authState;
      } catch (error) {
        console.error("❌ Failed to get auth state:", error);
        return `Error: ${error}`;
      }
    }, "Get current authentication state"),

    /**
     * Login commands for different user roles
     */
    login: {
      /**
       * Login as admin user
       */
      asAdmin: command(async () => {
        return await this.#loginAs("admin");
      }, "Login as admin user"),

      /**
       * Login as tenant user
       */
      asTenant: command(async () => {
        return await this.#loginAs("tenant");
      }, "Login as tenant user"),

      /**
       * Login as client user
       */
      asClient: command(async () => {
        return await this.#loginAs("client");
      }, "Login as client user"),
    },
  };

  /**
   * Helper method to login as a specific role
   */
  async #loginAs(role: UserRole): Promise<string> {
    try {
      console.log(`🔐 Logging in as ${role}...`);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { user } = await (this.#loginService.loginAsRole(role) as any);

      await this.#queryClient.invalidateQueries({ queryKey: authKeys.query.all() });

      await this.#router.navigate({
        to: "/",
      });

      console.log(`✅ Logged in as ${role}: ${user.email}`);
      console.log(`   User ID: ${user.id}`);

      return `Logged in as ${role} (${user.email})`;
    } catch (error) {
      console.error(`❌ Failed to login as ${role}:`, error);
      return `Error: ${error}`;
    }
  }
}
