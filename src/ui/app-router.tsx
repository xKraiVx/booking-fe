/* eslint-disable react-refresh/only-export-components */
import React from "react";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import { createRouter, Link } from "@tanstack/react-router";

import { routeTree } from "./routeTree.gen";

const ErrorComponent = ({ error, reset }: { error: Error; reset: () => void }) => {
  const queryErrorResetBoundary = useQueryErrorResetBoundary();

  React.useEffect(() => {
    queryErrorResetBoundary.reset();
  }, [queryErrorResetBoundary]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Something went wrong!</h2>
      <pre style={{ color: "red" }}>{error.message}</pre>
      <button onClick={reset}>Try again</button>
    </div>
  );
};

/**
 * Router instance defined outside of app-config and injector context.
 *
 * This router can be imported as a type for type safety purposes.
 * However, importing it as a value is not recommended. Instead, it should be
 * injected via Injector or consumed through React context.
 */
export const appRouter = createRouter({
  routeTree,
  context: {
    injector: undefined!,
  },
  scrollRestoration: true,
  defaultErrorComponent: ErrorComponent,
  defaultPendingComponent: () => (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <div>Loading...</div>
    </div>
  ),
  defaultNotFoundComponent: () => (
   <div style={{ padding: "20px", textAlign: "center" }}>
     <h2>404 - Not Found</h2>
     <p>The page you are looking for does not exist.</p>
     <Link to="/">Back Home</Link>
   </div>
  ),
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof appRouter;
  }
}

export type AppRouter = typeof appRouter;
