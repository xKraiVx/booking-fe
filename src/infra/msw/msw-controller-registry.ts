import type { Injector } from "../di/injector";

export class MswControllerRegistry {
  static create(injector: Injector) {
    return new MswControllerRegistry(injector);
  }

  constructor(_injector: Injector) {}

  async setup() {
    // Setup MSW handlers
  }
}
