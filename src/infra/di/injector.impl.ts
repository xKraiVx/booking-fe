import type { Injector, Provider, Token } from "./injector";

export class InjectorImpl implements Injector {
  private readonly providers = new Map<Token, Provider>();
  private readonly instances = new Map<Token, unknown>();

  provide(providers: Provider[]): void {
    for (const provider of providers) {
      this.providers.set(provider.token, provider);
    }
  }

  get<T>(token: Token): T {
    const provider = this.providers.get(token);
    if (!provider) {
      throw new Error(`No provider for token: ${String(token)}`);
    }

    if (provider.singleton && this.instances.has(token)) {
      return this.instances.get(token) as T;
    }

    let instance: unknown;
    if (provider.useValue !== undefined) {
      instance = provider.useValue;
    } else if (provider.useFactory) {
      instance = provider.useFactory(this);
    } else if (provider.useClass) {
      instance = new provider.useClass();
    }

    if (provider.singleton) {
      this.instances.set(token, instance);
    }

    return instance as T;
  }

  resolve<T>(constructor: new (...args: unknown[]) => T): T {
    return new constructor();
  }
}
