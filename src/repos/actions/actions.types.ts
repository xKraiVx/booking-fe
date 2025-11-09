import type { ResponseData } from "@/lib/api-types";

export type ActionsResponse = ResponseData<"/audit-logs", "get", 200>;
