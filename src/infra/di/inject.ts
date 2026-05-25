import type { Token } from "./injector";

export function inject<T>(token: Token): T {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const instance = (window as any).appConfig?.injector.get(token);
  if (!instance && token === "injector") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (window as any).appConfig?.injector;
  }
  return instance;
}
