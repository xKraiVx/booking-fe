import { createLazyFileRoute } from "@tanstack/react-router";
import AuthCallbackPage from "@/pages/auth-callback/AuthCallbackPage";

export const Route = createLazyFileRoute("/auth/callback")({
  component: AuthCallbackPage,
});
