import { Navigate } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useGetProfile } from "@/use-cases/auth/useGetProfile";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: ("admin" | "tenant" | "client")[];
}

export function ProtectedRoute({
  children,
  allowedRoles,
}: ProtectedRouteProps) {
  const { profile } = useGetProfile();

  if (!profile) {
    return <Navigate to="/" />;
  }

  if (allowedRoles && profile && !allowedRoles.includes(profile.role)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
          <p className="text-gray-600">
            You don't have permission to access this page.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
