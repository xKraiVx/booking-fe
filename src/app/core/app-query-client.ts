import { QueryClient } from "@tanstack/react-query";

export class AppQueryClient extends QueryClient {
  constructor() {
    super({
      defaultOptions: {
        queries: {
          staleTime: 1000 * 60 * 5,
          refetchOnWindowFocus: false,
        },
      },
    });
  }
}
