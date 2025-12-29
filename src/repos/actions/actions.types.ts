export interface AuditLogUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface AuditLogItem {
  id: string;
  action: string;
  statusCode: number;
  createdAt: string;
  user: AuditLogUser | null;
  entity?: string;
  entityId?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  changes?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
}

export interface ActionsResponse {
  data: AuditLogItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
