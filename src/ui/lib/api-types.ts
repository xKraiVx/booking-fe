import type { paths } from "./api-schema";

/**
 * Helper type to extract request body type from an API path
 * @example
 * type LoginRequest = RequestBody<'/auth/login', 'post'>;
 */
export type RequestBody<
  Path extends keyof paths,
  Method extends keyof paths[Path],
> = paths[Path][Method] extends {
  requestBody: { content: { "application/json": infer T } };
}
  ? T
  : never;

/**
 * Helper type to extract response data type from an API path
 * @example
 * type LoginResponse = ResponseData<'/auth/login', 'post', 200>;
 */
export type ResponseData<
  Path extends keyof paths,
  Method extends keyof paths[Path],
  Status extends number = 200,
> = paths[Path][Method] extends {
  responses: Record<Status, { content: { "application/json": infer T } }>;
}
  ? T
  : never;

/**
 * Helper type to extract path parameters type from an API path
 * @example
 * type UserIdParam = PathParams<'/auth/users/{id}', 'get'>;
 */
export type PathParams<
  Path extends keyof paths,
  Method extends keyof paths[Path],
> = paths[Path][Method] extends { parameters: { path: infer T } } ? T : never;

/**
 * Helper type to extract query parameters type from an API path
 * @example
 * type AuditLogsQuery = QueryParams<'/audit-logs', 'get'>;
 */
export type QueryParams<
  Path extends keyof paths,
  Method extends keyof paths[Path],
> = paths[Path][Method] extends { parameters: { query: infer T } } ? T : never;
