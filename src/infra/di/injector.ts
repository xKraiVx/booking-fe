export type Token = string | symbol;

export interface Provider {
  token: Token;
  useClass?: new (...args: unknown[]) => unknown;
  useValue?: unknown;
  useFactory?: (injector: Injector) => unknown;
  singleton?: boolean;
}

export interface Injector {
  get<T>(token: Token): T;
  resolve<T>(constructor: new (...args: unknown[]) => T): T;
  provide(providers: Provider[]): void;
}
