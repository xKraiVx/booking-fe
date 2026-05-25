export const MAIN_AUTH_KEY = "auth";

export const authKeys = {
  query: {
    all: () => [MAIN_AUTH_KEY] as const,
    state: () => [MAIN_AUTH_KEY, "state"] as const,
    currentUser: () => [MAIN_AUTH_KEY, "current-user"] as const,
  },
  mutation: {
    login: () => [MAIN_AUTH_KEY, "login"] as const,
    logout: () => [MAIN_AUTH_KEY, "logout"] as const,
  },
} as const;
