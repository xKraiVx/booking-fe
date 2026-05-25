export const UserRole = ["admin", "tenant", "client"] as const;
export type UserRole = (typeof UserRole)[number];
